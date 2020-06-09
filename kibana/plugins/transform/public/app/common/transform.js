"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTransformIdValid = isTransformIdValid;
exports.useRefreshTransformList = exports.refreshTransformList$ = exports.REFRESH_TRANSFORM_LIST_STATE = void 0;

var _react = require("react");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Transform name must contain lowercase alphanumeric (a-z and 0-9), hyphens or underscores;
// It must also start and end with an alphanumeric character.
function isTransformIdValid(transformId) {
  return /^[a-z0-9\-\_]+$/g.test(transformId) && !/^([_-].*)?(.*[_-])?$/g.test(transformId);
}

var REFRESH_TRANSFORM_LIST_STATE;
exports.REFRESH_TRANSFORM_LIST_STATE = REFRESH_TRANSFORM_LIST_STATE;

(function (REFRESH_TRANSFORM_LIST_STATE) {
  REFRESH_TRANSFORM_LIST_STATE["ERROR"] = "error";
  REFRESH_TRANSFORM_LIST_STATE["IDLE"] = "idle";
  REFRESH_TRANSFORM_LIST_STATE["LOADING"] = "loading";
  REFRESH_TRANSFORM_LIST_STATE["REFRESH"] = "refresh";
})(REFRESH_TRANSFORM_LIST_STATE || (exports.REFRESH_TRANSFORM_LIST_STATE = REFRESH_TRANSFORM_LIST_STATE = {}));

var refreshTransformList$ = new _rxjs.BehaviorSubject(REFRESH_TRANSFORM_LIST_STATE.IDLE);
exports.refreshTransformList$ = refreshTransformList$;

var useRefreshTransformList = function useRefreshTransformList() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _react.useEffect)(function () {
    var distinct$ = refreshTransformList$.pipe((0, _operators.distinctUntilChanged)());
    var subscriptions = [];

    if (typeof callback.onRefresh === 'function') {
      // initial call to refresh
      callback.onRefresh();
      subscriptions.push(distinct$.pipe((0, _operators.filter)(function (state) {
        return state === REFRESH_TRANSFORM_LIST_STATE.REFRESH;
      })).subscribe(function () {
        return typeof callback.onRefresh === 'function' && callback.onRefresh();
      }));
    }

    if (typeof callback.isLoading === 'function') {
      subscriptions.push(distinct$.subscribe(function (state) {
        return typeof callback.isLoading === 'function' && callback.isLoading(state === REFRESH_TRANSFORM_LIST_STATE.LOADING);
      }));
    }

    return function () {
      subscriptions.map(function (sub) {
        return sub.unsubscribe();
      });
    }; // The effect should only be called once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    refresh: function refresh() {
      // A refresh is followed immediately by setting the state to loading
      // to trigger data fetching and loading indicators in one go.
      refreshTransformList$.next(REFRESH_TRANSFORM_LIST_STATE.REFRESH);
      refreshTransformList$.next(REFRESH_TRANSFORM_LIST_STATE.LOADING);
    }
  };
};

exports.useRefreshTransformList = useRefreshTransformList;