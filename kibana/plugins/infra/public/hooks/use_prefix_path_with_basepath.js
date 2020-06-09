"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrefixPathWithBasepath = void 0;

var _react = require("react");

var _public = require("../../../../../src/plugins/kibana_react/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var usePrefixPathWithBasepath = function usePrefixPathWithBasepath() {
  var _useKibana$services$a;

  var getUrlForApp = (_useKibana$services$a = (0, _public.useKibana)().services.application) === null || _useKibana$services$a === void 0 ? void 0 : _useKibana$services$a.getUrlForApp;
  var prefixer = (0, _react.useMemo)(function () {
    if (!getUrlForApp) {
      throw new Error('Application core service is unavailable');
    }

    return function (app, path) {
      return getUrlForApp(app, {
        path: path
      });
    };
  }, [getUrlForApp]);
  return prefixer;
};

exports.usePrefixPathWithBasepath = usePrefixPathWithBasepath;