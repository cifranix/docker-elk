"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Description = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _new_job = require("../../../../../../../../../common/constants/new_job");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Description = (0, _react.memo)(function (_ref) {
  var children = _ref.children,
      jobType = _ref.jobType;

  if (jobType === _new_job.JOB_TYPE.MULTI_METRIC) {
    var title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.splitField.title', {
      defaultMessage: 'Split field'
    });

    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement("h3", null, title),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.newJob.wizard.pickFieldsStep.splitField.description",
        defaultMessage: "Select a field to partition analysis by. Each value of this field will be modeled independently individually."
      })
    }, _react.default.createElement(_eui.EuiFormRow, {
      label: title
    }, _react.default.createElement(_react.default.Fragment, null, children)));
  } else if (jobType === _new_job.JOB_TYPE.POPULATION) {
    var _title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.populationField.title', {
      defaultMessage: 'Population field'
    });

    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement("h3", null, _title),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.newJob.wizard.pickFieldsStep.populationField.description",
        defaultMessage: "All values in the selected field will be modeled together as a population. This analysis type is recommended for high cardinality data."
      })
    }, _react.default.createElement(_eui.EuiFormRow, {
      label: _title
    }, _react.default.createElement(_react.default.Fragment, null, children)));
  } else {
    return null;
  }
});
exports.Description = Description;