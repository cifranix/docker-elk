"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorCallout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ErrorCallout = function ErrorCallout(_ref) {
  var error = _ref.error;

  var errorCallout = _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.generalError', {
      defaultMessage: 'An error occurred loading the data.'
    }),
    color: "danger",
    iconType: "cross"
  }, _react.default.createElement("p", null, error)); // Job was created but not started so the destination index has not been created


  if (error.includes('index_not_found')) {
    errorCallout = _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.evaluateError', {
        defaultMessage: 'An error occurred loading the data.'
      }),
      color: "danger",
      iconType: "cross"
    }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.noIndexCalloutBody', {
      defaultMessage: 'The query for the index returned no results. Please make sure the destination index exists and contains documents.'
    })));
  } else if (error.includes('No documents found')) {
    // Job was started but no results have been written yet
    errorCallout = _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.noDataCalloutTitle', {
        defaultMessage: 'Empty index query result.'
      }),
      color: "primary"
    }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.noDataCalloutBody', {
      defaultMessage: 'The query for the index returned no results. Please make sure the job has completed and the index contains documents.'
    })));
  } else if (error.includes('userProvidedQueryBuilder')) {
    // query bar syntax is incorrect
    errorCallout = _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.queryParsingErrorMessage', {
        defaultMessage: 'Unable to parse query.'
      }),
      color: "primary"
    }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.queryParsingErrorBody', {
      defaultMessage: 'The query syntax is invalid and returned no results. Please check the query syntax and try again.'
    })));
  }

  return _react.default.createElement(_react.Fragment, null, errorCallout);
};

exports.ErrorCallout = ErrorCallout;