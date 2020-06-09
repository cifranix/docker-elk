"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DescriptionDescription = exports.ExcludeFrequentDescription = exports.PartitionFieldDescription = exports.OverFieldDescription = exports.ByFieldDescription = exports.FieldDescription = exports.AggDescription = void 0;

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
var AggDescription = (0, _react.memo)(function (_ref) {
  var children = _ref.children;

  var title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.aggSelect.title', {
    defaultMessage: 'Function'
  });

  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement("h3", null, title),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.aggSelect.description",
      defaultMessage: "Analysis functions to be performed e.g. sum, count."
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: title
  }, _react.default.createElement(_react.default.Fragment, null, children)));
});
exports.AggDescription = AggDescription;
var FieldDescription = (0, _react.memo)(function (_ref2) {
  var children = _ref2.children;

  var title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.fieldSelect.title', {
    defaultMessage: 'Field'
  });

  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement("h3", null, title),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.fieldSelect.description",
      defaultMessage: "Required for functions: sum, mean, median, max, min, info_content, distinct_count."
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: title
  }, _react.default.createElement(_react.default.Fragment, null, children)));
});
exports.FieldDescription = FieldDescription;
var ByFieldDescription = (0, _react.memo)(function (_ref3) {
  var children = _ref3.children;

  var title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.byFieldSelect.title', {
    defaultMessage: 'By field'
  });

  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement("h3", null, title),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.byFieldSelect.description",
      defaultMessage: "Required for individual analysis where anomalies are detected compared to an entity's own past behavior."
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: title
  }, _react.default.createElement(_react.default.Fragment, null, children)));
});
exports.ByFieldDescription = ByFieldDescription;
var OverFieldDescription = (0, _react.memo)(function (_ref4) {
  var children = _ref4.children;

  var title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.overFieldSelect.title', {
    defaultMessage: 'Over field'
  });

  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement("h3", null, title),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.overFieldSelect.description",
      defaultMessage: "Required for population analysis where anomalies are detected compared to the behavior of the population."
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: title
  }, _react.default.createElement(_react.default.Fragment, null, children)));
});
exports.OverFieldDescription = OverFieldDescription;
var PartitionFieldDescription = (0, _react.memo)(function (_ref5) {
  var children = _ref5.children;

  var title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.partitionFieldSelect.title', {
    defaultMessage: 'Partition field'
  });

  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement("h3", null, title),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.partitionFieldSelect.description",
      defaultMessage: "Allows segmentation of modeling into logical groups."
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: title
  }, _react.default.createElement(_react.default.Fragment, null, children)));
});
exports.PartitionFieldDescription = PartitionFieldDescription;
var ExcludeFrequentDescription = (0, _react.memo)(function (_ref6) {
  var children = _ref6.children;

  var title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.excludeFrequent.title', {
    defaultMessage: 'Exclude frequent'
  });

  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement("h3", null, title),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.excludeFrequent.description",
      defaultMessage: "If true will automatically identify and exclude frequently occurring entities which may otherwise have dominated results."
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: title
  }, _react.default.createElement(_react.default.Fragment, null, children)));
});
exports.ExcludeFrequentDescription = ExcludeFrequentDescription;
var DescriptionDescription = (0, _react.memo)(function (_ref7) {
  var children = _ref7.children;

  var title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.description.title', {
    defaultMessage: 'Description'
  });

  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    fullWidth: true,
    title: _react.default.createElement("h3", null, title),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.description.description",
      defaultMessage: "Override the default detector description with a meaningful description of what the detector is analyzing."
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: title,
    fullWidth: true
  }, _react.default.createElement(_react.default.Fragment, null, children)));
});
exports.DescriptionDescription = DescriptionDescription;