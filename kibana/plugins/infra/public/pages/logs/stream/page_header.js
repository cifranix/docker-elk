"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StreamPageHeader = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _document_title = require("../../../components/document_title");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StreamPageHeader = function StreamPageHeader() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_document_title.DocumentTitle, {
    title: function title(previousTitle) {
      return _i18n.i18n.translate('xpack.infra.logs.streamPage.documentTitle', {
        defaultMessage: '{previousTitle} | Stream',
        values: {
          previousTitle: previousTitle
        }
      });
    }
  }));
};

exports.StreamPageHeader = StreamPageHeader;