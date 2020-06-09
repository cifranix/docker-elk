"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithWaffleTimeUrlState = exports.WithWaffleTime = exports.withWaffleTime = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reselect = require("reselect");

var _store = require("../../store");

var _typed_react = require("../../utils/typed_react");

var _typed_redux = require("../../utils/typed_redux");

var _url_state = require("../../utils/url_state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var withWaffleTime = (0, _reactRedux.connect)(function (state) {
  return {
    currentTime: _store.waffleTimeSelectors.selectCurrentTime(state),
    currentTimeRange: _store.waffleTimeSelectors.selectCurrentTimeRange(state),
    isAutoReloading: _store.waffleTimeSelectors.selectIsAutoReloading(state),
    urlState: selectTimeUrlState(state)
  };
}, (0, _typed_redux.bindPlainActionCreators)({
  jumpToTime: _store.waffleTimeActions.jumpToTime,
  startAutoReload: _store.waffleTimeActions.startAutoReload,
  stopAutoReload: _store.waffleTimeActions.stopAutoReload
}));
exports.withWaffleTime = withWaffleTime;
var WithWaffleTime = (0, _typed_react.asChildFunctionRenderer)(withWaffleTime, {
  onCleanup: function onCleanup(_ref) {
    var stopAutoReload = _ref.stopAutoReload;
    return stopAutoReload();
  }
});
/**
 * Url State
 */

exports.WithWaffleTime = WithWaffleTime;

var WithWaffleTimeUrlState = function WithWaffleTimeUrlState() {
  return _react.default.createElement(WithWaffleTime, null, function (_ref2) {
    var jumpToTime = _ref2.jumpToTime,
        startAutoReload = _ref2.startAutoReload,
        stopAutoReload = _ref2.stopAutoReload,
        urlState = _ref2.urlState;
    return _react.default.createElement(_url_state.UrlStateContainer, {
      urlState: urlState,
      urlStateKey: "waffleTime",
      mapToUrlState: mapToUrlState,
      onChange: function onChange(newUrlState) {
        if (newUrlState && newUrlState.time) {
          jumpToTime(newUrlState.time);
        }

        if (newUrlState && newUrlState.autoReload) {
          startAutoReload();
        } else if (newUrlState && typeof newUrlState.autoReload !== 'undefined' && !newUrlState.autoReload) {
          stopAutoReload();
        }
      },
      onInitialize: function onInitialize(initialUrlState) {
        if (initialUrlState) {
          jumpToTime(initialUrlState.time ? initialUrlState.time : Date.now());
        }

        if (initialUrlState && initialUrlState.autoReload) {
          startAutoReload();
        }
      }
    });
  });
};

exports.WithWaffleTimeUrlState = WithWaffleTimeUrlState;
var selectTimeUrlState = (0, _reselect.createSelector)(_store.waffleTimeSelectors.selectCurrentTime, _store.waffleTimeSelectors.selectIsAutoReloading, function (time, autoReload) {
  return {
    time: time,
    autoReload: autoReload
  };
});

var mapToUrlState = function mapToUrlState(value) {
  return value ? {
    time: mapToTimeUrlState(value.time),
    autoReload: mapToAutoReloadUrlState(value.autoReload)
  } : undefined;
};

var mapToTimeUrlState = function mapToTimeUrlState(value) {
  return value && typeof value === 'number' ? value : undefined;
};

var mapToAutoReloadUrlState = function mapToAutoReloadUrlState(value) {
  return typeof value === 'boolean' ? value : undefined;
};