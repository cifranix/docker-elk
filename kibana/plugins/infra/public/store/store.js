"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;

var _redux = require("redux");

var _reduxObservable = require("redux-observable");

var _operators = require("rxjs/operators");

var _ = require(".");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createStore(_ref) {
  var apolloClient = _ref.apolloClient,
      observableApi = _ref.observableApi;
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
  var middlewareDependencies = {
    postToApi$: observableApi.pipe((0, _operators.map)(function (_ref2) {
      var post = _ref2.post;
      return post;
    })),
    apolloClient$: apolloClient,
    selectWaffleTimeUpdatePolicyInterval: _.waffleTimeSelectors.selectTimeUpdatePolicyInterval
  };
  var epicMiddleware = (0, _reduxObservable.createEpicMiddleware)({
    dependencies: middlewareDependencies
  });
  var store = (0, _redux.createStore)(_.reducer, _.initialState, composeEnhancers((0, _redux.applyMiddleware)(epicMiddleware)));
  epicMiddleware.run((0, _.createRootEpic)());
  return store;
}