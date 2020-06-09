"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNodeLogsUrl = exports.RedirectToNodeLogs = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _loading_page = require("../../components/loading_page");

var _log_filter = require("../../containers/logs/log_filter");

var _log_position = require("../../containers/logs/log_position");

var _source_id = require("../../containers/source_id");

var _query_params = require("./query_params");

var _source = require("../../containers/source/source");

var _inventory_models = require("../../../common/inventory_models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getFieldByNodeType = function getFieldByNodeType(nodeType, fields) {
  var inventoryFields = (0, _inventory_models.findInventoryFields)(nodeType, fields);
  return inventoryFields.id;
};

var RedirectToNodeLogs = function RedirectToNodeLogs(_ref) {
  var _ref$match$params = _ref.match.params,
      nodeId = _ref$match$params.nodeId,
      nodeType = _ref$match$params.nodeType,
      _ref$match$params$sou = _ref$match$params.sourceId,
      sourceId = _ref$match$params$sou === void 0 ? 'default' : _ref$match$params$sou,
      location = _ref.location;

  var _useSource = (0, _source.useSource)({
    sourceId: sourceId
  }),
      source = _useSource.source,
      isLoading = _useSource.isLoading;

  var configuration = source && source.configuration;

  if (isLoading) {
    return _react.default.createElement(_loading_page.LoadingPage, {
      message: _i18n.i18n.translate('xpack.infra.redirectToNodeLogs.loadingNodeLogsMessage', {
        defaultMessage: 'Loading {nodeType} logs',
        values: {
          nodeType: nodeType
        }
      })
    });
  }

  if (!configuration) {
    return null;
  }

  var nodeFilter = "".concat(getFieldByNodeType(nodeType, configuration.fields), ": ").concat(nodeId);
  var userFilter = (0, _query_params.getFilterFromLocation)(location);
  var filter = userFilter ? "(".concat(nodeFilter, ") and (").concat(userFilter, ")") : nodeFilter;
  var searchString = (0, _lodash.compose)((0, _log_filter.replaceLogFilterInQueryString)(filter), (0, _log_position.replaceLogPositionInQueryString)((0, _query_params.getTimeFromLocation)(location)), (0, _source_id.replaceSourceIdInQueryString)(sourceId))('');
  return _react.default.createElement(_reactRouterDom.Redirect, {
    to: "/?".concat(searchString)
  });
};

exports.RedirectToNodeLogs = RedirectToNodeLogs;

var getNodeLogsUrl = function getNodeLogsUrl(_ref2) {
  var nodeId = _ref2.nodeId,
      nodeType = _ref2.nodeType,
      time = _ref2.time;
  return {
    app: 'logs',
    pathname: "link-to/".concat(nodeType, "-logs/").concat(nodeId),
    search: time ? {
      time: "".concat(time)
    } : undefined
  };
};

exports.getNodeLogsUrl = getNodeLogsUrl;