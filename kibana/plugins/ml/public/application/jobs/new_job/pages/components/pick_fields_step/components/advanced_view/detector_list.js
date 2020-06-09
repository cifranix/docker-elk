"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectorList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _job_creator_context = require("../../../job_creator_context");

var _string_utils = require("../../../../../../../util/string_utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DetectorList = function DetectorList(_ref) {
  var isActive = _ref.isActive,
      onEditJob = _ref.onEditJob,
      onDeleteJob = _ref.onDeleteJob;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      jobCreatorUpdated = _useContext.jobCreatorUpdated,
      jobValidator = _useContext.jobValidator,
      jobValidatorUpdated = _useContext.jobValidatorUpdated;

  var jobCreator = jc;

  var _useState = (0, _react.useState)(jobCreator.detectors),
      _useState2 = _slicedToArray(_useState, 2),
      detectors = _useState2[0],
      setDetectors = _useState2[1];

  var _useState3 = (0, _react.useState)(jobValidator.duplicateDetectors),
      _useState4 = _slicedToArray(_useState3, 2),
      validation = _useState4[0],
      setValidation = _useState4[1];

  (0, _react.useEffect)(function () {
    setDetectors(jobCreator.detectors);
  }, [jobCreatorUpdated]);
  (0, _react.useEffect)(function () {
    setValidation(jobValidator.duplicateDetectors);
  }, [jobValidatorUpdated]);

  var Buttons = function Buttons(_ref2) {
    var index = _ref2.index;
    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButtonIcon, {
      color: "primary",
      onClick: function onClick() {
        return onEditJob(index);
      },
      iconType: "pencil",
      "aria-label": _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorList.editButton', {
        defaultMessage: 'Edit'
      }),
      "data-test-subj": "mlAdvancedDetectorEditButton"
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButtonIcon, {
      color: "danger",
      onClick: function onClick() {
        return onDeleteJob(index);
      },
      iconType: "trash",
      "aria-label": _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorList.deleteButton', {
        defaultMessage: 'Delete'
      }),
      "data-test-subj": "mlAdvancedDetectorDeleteButton"
    })));
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorList.title",
    defaultMessage: "Detectors"
  }))), _react.default.createElement(NoDetectorsWarning, {
    show: detectors.length === 0
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGrid, {
    columns: 3
  }, detectors.map(function (d, i) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: i,
      "data-test-subj": "mlAdvancedDetector ".concat(i)
    }, _react.default.createElement(_eui.EuiPanel, {
      paddingSize: "m"
    }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, d.detector_description !== undefined ? _react.default.createElement("div", {
      style: {
        fontWeight: 'bold'
      },
      "data-test-subj": "mlDetectorDescription"
    }, d.detector_description) : _react.default.createElement(StringifiedDetector, {
      detector: d
    })), isActive && _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      style: {
        margin: '8px'
      }
    }, _react.default.createElement(Buttons, {
      index: i
    }))), d.detector_description !== undefined && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, {
      margin: "s"
    }), _react.default.createElement(StringifiedDetector, {
      detector: d
    }))));
  })), _react.default.createElement(DuplicateDetectorsWarning, {
    validation: validation
  }));
};

exports.DetectorList = DetectorList;

var NoDetectorsWarning = function NoDetectorsWarning(_ref3) {
  var show = _ref3.show;

  if (show === false) {
    return null;
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.noDetectorsCallout.title', {
      defaultMessage: 'No detectors'
    }),
    iconType: "alert",
    "data-test-subj": "mlAdvancedNoDetectorsMessage"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.noDetectorsCallout.message",
    defaultMessage: "At least one detector is needed to create a job."
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }));
};

var DuplicateDetectorsWarning = function DuplicateDetectorsWarning(_ref4) {
  var validation = _ref4.validation;

  if (validation.valid === true) {
    return null;
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    error: validation.message,
    isInvalid: validation.valid === false
  }, _react.default.createElement(_react.Fragment, null)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }));
};

var StringifiedDetector = function StringifiedDetector(_ref5) {
  var detector = _ref5.detector;
  return _react.default.createElement("div", {
    "data-test-subj": "mlDetectorIdentifier"
  }, (0, _string_utils.detectorToString)(detector));
};