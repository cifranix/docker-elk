"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Description = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Description = (0, _react.memo)(function (_ref) {
  var children = _ref.children,
      isOptional = _ref.isOptional;

  var title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.categorizationField.title', {
    defaultMessage: 'Categorization field'
  });

  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement("h3", null, title),
    description: _react.default.createElement(_react.default.Fragment, null, isOptional ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.pickFieldsStep.categorizationFieldOptional.description",
      defaultMessage: "Optional, for use if analyzing unstructured log data. Using text data types is recommended."
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.pickFieldsStep.categorizationField.description",
      defaultMessage: "Specifies which field will be categorized. Using text data types is recommended. Categorization works best on machine written log messages, typically logging written by a developer for the purpose of system troubleshooting."
    }))
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: title
  }, _react.default.createElement(_react.default.Fragment, null, children)));
});
exports.Description = Description;