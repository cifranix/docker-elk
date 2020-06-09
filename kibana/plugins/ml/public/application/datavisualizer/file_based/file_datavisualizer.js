"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileDataVisualizerPage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _kibana = require("../../contexts/kibana");

var _navigation_menu = require("../../components/navigation_menu");

var _index_utils = require("../../util/index_utils");

var _index = require("./components/file_datavisualizer_view/index");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var FileDataVisualizerPage = function FileDataVisualizerPage(_ref) {
  var kibanaConfig = _ref.kibanaConfig;
  (0, _kibana.useTimefilter)({
    timeRangeSelector: false,
    autoRefreshSelector: false
  });
  var indexPatterns = (0, _index_utils.getIndexPatternsContract)();
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_navigation_menu.NavigationMenu, {
    tabId: "datavisualizer"
  }), _react.default.createElement(_index.FileDataVisualizerView, {
    indexPatterns: indexPatterns,
    kibanaConfig: kibanaConfig
  }));
};

exports.FileDataVisualizerPage = FileDataVisualizerPage;