"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonEditorFlyout = exports.EDITOR_MODE = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _shared_imports = require("../../../../../../../../shared_imports");

var _ml_job_editor = require("../../../../../jobs_list/components/ml_job_editor");

var _validation_utils = require("../../../../../../../../common/util/validation_utils");

var _job_creator_context = require("../../job_creator_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EDITOR_HEIGHT = '800px';
var EDITOR_MODE;
exports.EDITOR_MODE = EDITOR_MODE;

(function (EDITOR_MODE) {
  EDITOR_MODE[EDITOR_MODE["HIDDEN"] = 0] = "HIDDEN";
  EDITOR_MODE[EDITOR_MODE["READONLY"] = 1] = "READONLY";
  EDITOR_MODE[EDITOR_MODE["EDITABLE"] = 2] = "EDITABLE";
})(EDITOR_MODE || (exports.EDITOR_MODE = EDITOR_MODE = {}));

var JsonEditorFlyout = function JsonEditorFlyout(_ref) {
  var isDisabled = _ref.isDisabled,
      jobEditorMode = _ref.jobEditorMode,
      datafeedEditorMode = _ref.datafeedEditorMode;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobCreatorUpdated = _useContext.jobCreatorUpdated;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showJsonFlyout = _useState2[0],
      setShowJsonFlyout = _useState2[1];

  var _useState3 = (0, _react.useState)(jobCreator.formattedJobJson),
      _useState4 = _slicedToArray(_useState3, 2),
      jobConfigString = _useState4[0],
      setJobConfigString = _useState4[1];

  var _useState5 = (0, _react.useState)(jobCreator.formattedDatafeedJson),
      _useState6 = _slicedToArray(_useState5, 2),
      datafeedConfigString = _useState6[0],
      setDatafeedConfigString = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      saveable = _useState8[0],
      setSaveable = _useState8[1];

  (0, _react.useEffect)(function () {
    setJobConfigString(jobCreator.formattedJobJson);
    setDatafeedConfigString(jobCreator.formattedDatafeedJson);
  }, [jobCreatorUpdated]);
  var editJsonMode = jobEditorMode === EDITOR_MODE.HIDDEN || datafeedEditorMode === EDITOR_MODE.HIDDEN;
  var flyOutSize = editJsonMode ? 'm' : 'l';
  var readOnlyMode = jobEditorMode === EDITOR_MODE.READONLY && datafeedEditorMode === EDITOR_MODE.READONLY;

  function toggleJsonFlyout() {
    setSaveable(false);
    setShowJsonFlyout(!showJsonFlyout);
  }

  function onJobChange(json) {
    setJobConfigString(json);
    var valid = (0, _validation_utils.isValidJson)(json);
    setSaveable(valid);
  }

  function onDatafeedChange(json) {
    setDatafeedConfigString(json);
    var jsonValue = (0, _shared_imports.collapseLiteralStrings)(json);
    var valid = (0, _validation_utils.isValidJson)(jsonValue);

    if (valid) {
      // ensure that the user hasn't altered the indices list in the json.
      var _JSON$parse = JSON.parse(jsonValue),
          indices = _JSON$parse.indices;

      var originalIndices = jobCreator.indices.sort();
      valid = originalIndices.length === indices.length && originalIndices.every(function (value, index) {
        return value === indices[index];
      });
    }

    setSaveable(valid);
  }

  function onSave() {
    var jobConfig = JSON.parse(jobConfigString);
    var datafeedConfig = JSON.parse((0, _shared_imports.collapseLiteralStrings)(datafeedConfigString));
    jobCreator.cloneFromExistingJob(jobConfig, datafeedConfig);
    jobCreatorUpdate();
    setShowJsonFlyout(false);
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(FlyoutButton, {
    onClick: toggleJsonFlyout,
    isDisabled: isDisabled,
    editJsonMode: editJsonMode
  }), showJsonFlyout === true && isDisabled === false && _react.default.createElement(_eui.EuiFlyout, {
    onClose: function onClose() {
      return setShowJsonFlyout(false);
    },
    hideCloseButton: true,
    size: flyOutSize
  }, _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiFlexGroup, null, jobEditorMode !== EDITOR_MODE.HIDDEN && _react.default.createElement(Contents, {
    editJson: jobEditorMode === EDITOR_MODE.EDITABLE,
    onChange: onJobChange,
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.jsonFlyout.job.title', {
      defaultMessage: 'Job configuration JSON'
    }),
    value: jobConfigString
  }), datafeedEditorMode !== EDITOR_MODE.HIDDEN && _react.default.createElement(Contents, {
    editJson: datafeedEditorMode === EDITOR_MODE.EDITABLE,
    onChange: onDatafeedChange,
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.jsonFlyout.datafeed.title', {
      defaultMessage: 'Datafeed configuration JSON'
    }),
    value: datafeedConfigString
  }))), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
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
    id: "xpack.ml.newJob.wizard.jsonFlyout.closeButton",
    defaultMessage: "Close"
  }))), readOnlyMode === false && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    onClick: onSave,
    fill: true,
    isDisabled: saveable === false
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.jsonFlyout.saveButton",
    defaultMessage: "Save"
  })))))));
};

exports.JsonEditorFlyout = JsonEditorFlyout;

var FlyoutButton = function FlyoutButton(_ref2) {
  var isDisabled = _ref2.isDisabled,
      onClick = _ref2.onClick,
      editJsonMode = _ref2.editJsonMode;

  var previewJsonTitle = _i18n.i18n.translate('xpack.ml.newJob.wizard.previewJsonButton', {
    defaultMessage: 'Preview JSON'
  });

  var editJsonTitle = _i18n.i18n.translate('xpack.ml.newJob.wizard.editJsonButton', {
    defaultMessage: 'Edit JSON'
  });

  return _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: onClick,
    isDisabled: isDisabled,
    "data-test-subj": "mlJobWizardButtonPreviewJobJson"
  }, editJsonMode ? editJsonTitle : previewJsonTitle);
};

var Contents = function Contents(_ref3) {
  var title = _ref3.title,
      value = _ref3.value,
      editJson = _ref3.editJson,
      onChange = _ref3.onChange;
  return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h5", null, title)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_ml_job_editor.MLJobEditor, {
    value: value,
    height: EDITOR_HEIGHT,
    mode: _ml_job_editor.ML_EDITOR_MODE.XJSON,
    readOnly: editJson === false,
    onChange: onChange
  }));
};