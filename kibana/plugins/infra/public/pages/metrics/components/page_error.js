"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageError = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _invalid_node = require("./invalid_node");

var _document_title = require("../../../components/document_title");

var _error = require("../../error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// import { GraphQLFormattedError } from 'graphql';
// import { InfraMetricsErrorCodes } from '../../../../common/errors';
var PageError = function PageError(_ref) {
  var error = _ref.error,
      name = _ref.name;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_document_title.DocumentTitle, {
    title: function title(previousTitle) {
      return _i18n.i18n.translate('xpack.infra.metricDetailPage.documentTitleError', {
        defaultMessage: '{previousTitle} | Uh oh',
        values: {
          previousTitle: previousTitle
        }
      });
    }
  }), error.body.statusCode = 404 ? _react.default.createElement(_invalid_node.InvalidNodeError, {
    nodeName: name
  }) : _react.default.createElement(_error.ErrorPageBody, {
    message: error.message
  }));
};

exports.PageError = PageError;