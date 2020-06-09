"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.annotations = void 0;

var _http_service = require("../http_service");

var _index = require("./index");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var annotations = {
  getAnnotations: function getAnnotations(obj) {
    var body = JSON.stringify(obj);
    return (0, _http_service.http$)({
      path: "".concat((0, _index.basePath)(), "/annotations"),
      method: 'POST',
      body: body
    });
  },
  indexAnnotation: function indexAnnotation(obj) {
    var body = JSON.stringify(obj);
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/annotations/index"),
      method: 'PUT',
      body: body
    });
  },
  deleteAnnotation: function deleteAnnotation(id) {
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/annotations/delete/").concat(id),
      method: 'DELETE'
    });
  }
};
exports.annotations = annotations;