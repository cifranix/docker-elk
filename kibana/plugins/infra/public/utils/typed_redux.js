"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindPlainActionCreators = exports.globalizeSelectors = exports.globalizeSelector = void 0;

var _redux = require("redux");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var globalizeSelector = function globalizeSelector(globalizer, selector) {
  return function (globalState) {
    return selector(globalizer(globalState));
  };
};

exports.globalizeSelector = globalizeSelector;

var globalizeSelectors = function globalizeSelectors(globalizer, selectors) {
  var globalSelectors = {};

  for (var s in selectors) {
    if (selectors.hasOwnProperty(s)) {
      globalSelectors[s] = globalizeSelector(globalizer, selectors[s]);
    }
  }

  return globalSelectors;
};
/**
 * Action Creators
 */


exports.globalizeSelectors = globalizeSelectors;

var bindPlainActionCreators = function bindPlainActionCreators(actionCreators) {
  return function (dispatch) {
    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
  };
};

exports.bindPlainActionCreators = bindPlainActionCreators;