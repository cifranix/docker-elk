"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCategorizationAnalyzerFlyout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _ml_job_editor = require("../../../../../jobs_list/components/ml_job_editor");

var _validation_utils = require("../../../../../../../../common/util/validation_utils");

var _job_creator_context = require("../../job_creator_context");

var _ml_server_info = require("../../../../../../services/ml_server_info");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EDITOR_HEIGHT = '800px';

var EditCategorizationAnalyzerFlyout = function EditCategorizationAnalyzerFlyout() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate;

  var jobCreator = jc;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showJsonFlyout = _useState2[0],
      setShowJsonFlyout = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      saveable = _useState4[0],
      setSaveable = _useState4[1];

  var _useState5 = (0, _react.useState)(JSON.stringify(jobCreator.categorizationAnalyzer, null, 2)),
      _useState6 = _slicedToArray(_useState5, 2),
      categorizationAnalyzerString = _useState6[0],
      setCategorizationAnalyzerString = _useState6[1];

  (0, _react.useEffect)(function () {
    if (showJsonFlyout === true) {
      setCategorizationAnalyzerString(JSON.stringify(jobCreator.categorizationAnalyzer, null, 2));
    }
  }, [showJsonFlyout]);

  function toggleJsonFlyout() {
    setSaveable(false);
    setShowJsonFlyout(!showJsonFlyout);
  }

  function onJSONChange(json) {
    setCategorizationAnalyzerString(json);
    var valid = (0, _validation_utils.isValidJson)(json);
    setSaveable(valid);
  }

  function onSave() {
    jobCreator.categorizationAnalyzer = JSON.parse(categorizationAnalyzerString);
    jobCreatorUpdate();
    setShowJsonFlyout(false);
  }

  function onUseDefault() {
    var _getNewJobDefaults = (0, _ml_server_info.getNewJobDefaults)(),
        anomalyDetectors = _getNewJobDefaults.anomaly_detectors;

    var analyzerString = JSON.stringify(anomalyDetectors.categorization_analyzer, null, 2);
    onJSONChange(analyzerString);
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(FlyoutButton, {
    onClick: toggleJsonFlyout
  }), showJsonFlyout === true && _react.default.createElement(_eui.EuiFlyout, {
    onClose: function onClose() {
      return setShowJsonFlyout(false);
    },
    hideCloseButton: true,
    size: "m"
  }, _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(Contents, {
    onChange: onJSONChange,
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.categorizationAnalyzerFlyout.title', {
      defaultMessage: 'Edit categorization analyzer JSON'
    }),
    value: categorizationAnalyzerString
  })), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "cross",
    onClick: function onClick() {
      return setShowJsonFlyout(false);
    },
    flush: "left"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.categorizationAnalyzerFlyout.closeButton",
    defaultMessage: "Close"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: onUseDefault
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.categorizationAnalyzerFlyout.useDefaultButton",
    defaultMessage: "Use default ML analyzer"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    onClick: onSave,
    fill: true,
    isDisabled: saveable === false
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.categorizationAnalyzerFlyout.saveButton",
    defaultMessage: "Save"
  })))))));
};

exports.EditCategorizationAnalyzerFlyout = EditCategorizationAnalyzerFlyout;

var FlyoutButton = function FlyoutButton(_ref) {
  var onClick = _ref.onClick;
  return _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: onClick,
    flush: "left",
    "data-test-subj": "mlJobWizardButtonPreviewJobJson"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.editCategorizationAnalyzerFlyoutButton",
    defaultMessage: "Edit categorization analyzer"
  }));
};

var Contents = function Contents(_ref2) {
  var title = _ref2.title,
      value = _ref2.value,
      onChange = _ref2.onChange;
  return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h5", null, title)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_ml_job_editor.MLJobEditor, {
    value: value,
    height: EDITOR_HEIGHT,
    readOnly: false,
    onChange: onChange
  }));
};