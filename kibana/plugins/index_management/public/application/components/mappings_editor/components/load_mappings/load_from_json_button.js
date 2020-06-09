"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadMappingsFromJsonButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _load_mappings_provider = require("./load_mappings_provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LoadMappingsFromJsonButton = function LoadMappingsFromJsonButton(_ref) {
  var onJson = _ref.onJson;
  return _react.default.createElement(_load_mappings_provider.LoadMappingsProvider, {
    onJson: onJson
  }, function (openModal) {
    return _react.default.createElement(_eui.EuiButtonEmpty, {
      onClick: openModal,
      size: "s"
    }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.loadFromJsonButtonLabel', {
      defaultMessage: 'Load JSON'
    }));
  });
};

exports.LoadMappingsFromJsonButton = LoadMappingsFromJsonButton;