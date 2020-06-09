"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionsConfigurationUtilities = getActionsConfigurationUtilities;
exports.EnabledActionTypes = exports.WhitelistedHosts = void 0;

var _i18n = require("@kbn/i18n");

var _Option = require("fp-ts/lib/Option");

var _url = require("url");

var _lodash = require("lodash");

var _pipeable = require("fp-ts/lib/pipeable");

var _lib = require("./lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
let WhitelistedHosts;
exports.WhitelistedHosts = WhitelistedHosts;

(function (WhitelistedHosts) {
  WhitelistedHosts["Any"] = "*";
})(WhitelistedHosts || (exports.WhitelistedHosts = WhitelistedHosts = {}));

let EnabledActionTypes;
exports.EnabledActionTypes = EnabledActionTypes;

(function (EnabledActionTypes) {
  EnabledActionTypes["Any"] = "*";
})(EnabledActionTypes || (exports.EnabledActionTypes = EnabledActionTypes = {}));

var WhitelistingField;

(function (WhitelistingField) {
  WhitelistingField["url"] = "url";
  WhitelistingField["hostname"] = "hostname";
})(WhitelistingField || (WhitelistingField = {}));

function whitelistingErrorMessage(field, value) {
  return _i18n.i18n.translate('xpack.actions.urlWhitelistConfigurationError', {
    defaultMessage: 'target {field} "{value}" is not whitelisted in the Kibana config xpack.actions.whitelistedHosts',
    values: {
      value,
      field
    }
  });
}

function disabledActionTypeErrorMessage(actionType) {
  return _i18n.i18n.translate('xpack.actions.disabledActionTypeError', {
    defaultMessage: 'action type "{actionType}" is not enabled in the Kibana config xpack.actions.enabledActionTypes',
    values: {
      actionType
    }
  });
}

function isWhitelisted({
  whitelistedHosts
}, hostname) {
  const whitelisted = new Set(whitelistedHosts);
  if (whitelisted.has(WhitelistedHosts.Any)) return true;
  if (whitelisted.has(hostname)) return true;
  return false;
}

function isWhitelistedHostnameInUri(config, uri) {
  return (0, _pipeable.pipe)((0, _Option.tryCatch)(() => new _url.URL(uri)), (0, _Option.map)(url => url.hostname), (0, _Option.mapNullable)(hostname => isWhitelisted(config, hostname)), (0, _Option.getOrElse)(() => false));
}

function isActionTypeEnabledInConfig({
  enabledActionTypes
}, actionType) {
  const enabled = new Set(enabledActionTypes);
  if (enabled.has(EnabledActionTypes.Any)) return true;
  if (enabled.has(actionType)) return true;
  return false;
}

function getActionsConfigurationUtilities(config) {
  const isWhitelistedHostname = (0, _lodash.curry)(isWhitelisted)(config);
  const isWhitelistedUri = (0, _lodash.curry)(isWhitelistedHostnameInUri)(config);
  const isActionTypeEnabled = (0, _lodash.curry)(isActionTypeEnabledInConfig)(config);
  return {
    isWhitelistedHostname,
    isWhitelistedUri,
    isActionTypeEnabled,

    ensureWhitelistedUri(uri) {
      if (!isWhitelistedUri(uri)) {
        throw new Error(whitelistingErrorMessage(WhitelistingField.url, uri));
      }
    },

    ensureWhitelistedHostname(hostname) {
      if (!isWhitelistedHostname(hostname)) {
        throw new Error(whitelistingErrorMessage(WhitelistingField.hostname, hostname));
      }
    },

    ensureActionTypeEnabled(actionType) {
      if (!isActionTypeEnabled(actionType)) {
        throw new _lib.ActionTypeDisabledError(disabledActionTypeErrorMessage(actionType), 'config');
      }
    }

  };
}