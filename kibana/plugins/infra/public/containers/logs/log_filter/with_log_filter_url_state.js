"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceLogFilterInQueryString = exports.WithLogFilterUrlState = void 0;

var _react = _interopRequireWildcard(require("react"));

var _log_filter_state = require("./log_filter_state");

var _url_state = require("../../../utils/url_state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var WithLogFilterUrlState = function WithLogFilterUrlState() {
  var _useContext = (0, _react.useContext)(_log_filter_state.LogFilterState.Context),
      filterQueryAsKuery = _useContext.filterQueryAsKuery,
      applyLogFilterQuery = _useContext.applyLogFilterQuery;

  return _react.default.createElement(_url_state.UrlStateContainer, {
    urlState: filterQueryAsKuery,
    urlStateKey: "logFilter",
    mapToUrlState: mapToFilterQuery,
    onChange: function onChange(urlState) {
      if (urlState) {
        applyLogFilterQuery(urlState.expression);
      }
    },
    onInitialize: function onInitialize(urlState) {
      if (urlState) {
        applyLogFilterQuery(urlState.expression);
      }
    }
  });
};

exports.WithLogFilterUrlState = WithLogFilterUrlState;

var mapToFilterQuery = function mapToFilterQuery(value) {
  return (value === null || value === void 0 ? void 0 : value.kind) === 'kuery' && typeof value.expression === 'string' ? {
    kind: value.kind,
    expression: value.expression
  } : undefined;
};

var replaceLogFilterInQueryString = function replaceLogFilterInQueryString(expression) {
  return (0, _url_state.replaceStateKeyInQueryString)('logFilter', {
    kind: 'kuery',
    expression: expression
  });
};

exports.replaceLogFilterInQueryString = replaceLogFilterInQueryString;