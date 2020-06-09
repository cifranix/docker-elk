"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileDatavisualizer = void 0;

var _http_service = require("../http_service");

var _index = require("./index");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var fileDatavisualizer = {
  analyzeFile: function analyzeFile(file) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var body = JSON.stringify(file);
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/file_data_visualizer/analyze_file"),
      method: 'POST',
      body: body,
      query: params
    });
  },
  import: function _import(_ref) {
    var id = _ref.id,
        index = _ref.index,
        data = _ref.data,
        settings = _ref.settings,
        mappings = _ref.mappings,
        ingestPipeline = _ref.ingestPipeline;
    var query = id !== undefined ? {
      id: id
    } : {};
    var body = JSON.stringify({
      index: index,
      data: data,
      settings: settings,
      mappings: mappings,
      ingestPipeline: ingestPipeline
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/file_data_visualizer/import"),
      method: 'POST',
      query: query,
      body: body
    });
  }
};
exports.fileDatavisualizer = fileDatavisualizer;