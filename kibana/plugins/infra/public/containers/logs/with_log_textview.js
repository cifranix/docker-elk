"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithLogTextviewUrlState = void 0;

var _react = _interopRequireWildcard(require("react"));

var _url_state = require("../../utils/url_state");

var _log_view_configuration = require("./log_view_configuration");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var WithLogTextviewUrlState = function WithLogTextviewUrlState() {
  var _useContext = (0, _react.useContext)(_log_view_configuration.LogViewConfiguration.Context),
      textScale = _useContext.textScale,
      textWrap = _useContext.textWrap,
      setTextScale = _useContext.setTextScale,
      setTextWrap = _useContext.setTextWrap;

  var urlState = (0, _react.useMemo)(function () {
    return {
      textScale: textScale,
      wrap: textWrap
    };
  }, [textScale, textWrap]);
  return _react.default.createElement(_url_state.UrlStateContainer, {
    urlState: urlState,
    urlStateKey: "logTextview",
    mapToUrlState: mapToUrlState,
    onChange: function onChange(newUrlState) {
      if (newUrlState && newUrlState.textScale) {
        setTextScale(newUrlState.textScale);
      }

      if (newUrlState && typeof newUrlState.wrap !== 'undefined') {
        setTextWrap(newUrlState.wrap);
      }
    },
    onInitialize: function onInitialize(newUrlState) {
      if (newUrlState && newUrlState.textScale) {
        setTextScale(newUrlState.textScale);
      }

      if (newUrlState && typeof newUrlState.wrap !== 'undefined') {
        setTextWrap(newUrlState.wrap);
      }
    }
  });
};

exports.WithLogTextviewUrlState = WithLogTextviewUrlState;

var mapToUrlState = function mapToUrlState(value) {
  return value ? {
    textScale: mapToTextScaleUrlState(value.textScale),
    wrap: mapToWrapUrlState(value.wrap)
  } : undefined;
};

var mapToTextScaleUrlState = function mapToTextScaleUrlState(value) {
  return _log_view_configuration.availableTextScales.includes(value) ? value : undefined;
};

var mapToWrapUrlState = function mapToWrapUrlState(value) {
  return typeof value === 'boolean' ? value : undefined;
};