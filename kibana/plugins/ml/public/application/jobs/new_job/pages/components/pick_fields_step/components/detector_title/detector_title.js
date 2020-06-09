"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectorTitle = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DetectorTitle = function DetectorTitle(_ref) {
  var index = _ref.index,
      agg = _ref.agg,
      field = _ref.field,
      byField = _ref.byField,
      deleteDetector = _ref.deleteDetector,
      children = _ref.children;
  var splitField = children === false && byField !== undefined ? byField.field : null;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement("span", {
    style: {
      fontSize: 'small'
    },
    "data-test-subj": "mlDetectorTitle"
  }, getTitle(agg, field, splitField))), children !== false && _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      width: '100%',
      maxWidth: '400px'
    }
  }, children), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, deleteDetector !== undefined && _react.default.createElement(_eui.EuiButtonIcon, {
    color: 'danger',
    onClick: function onClick() {
      return deleteDetector(index);
    },
    iconType: "cross",
    size: "s",
    "aria-label": "Next"
  })));
};

exports.DetectorTitle = DetectorTitle;

function getTitle(agg, field, splitField) {
  var title = "".concat(agg.title, "(").concat(field.name, ")");

  if (splitField === null) {
    return title;
  } else {
    return _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.detectorTitle.placeholder', {
      defaultMessage: '{title} split by {field}',
      values: {
        title: title,
        field: splitField.name
      }
    });
  }
}