"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestoreSnapshotForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _validation = require("../../services/validation");

var _steps = require("./steps");

var _navigation = require("./navigation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RestoreSnapshotForm = function RestoreSnapshotForm(_ref) {
  var snapshotDetails = _ref.snapshotDetails,
      isSaving = _ref.isSaving,
      saveError = _ref.saveError,
      clearSaveError = _ref.clearSaveError,
      onSave = _ref.onSave;

  // Step state
  var _useState = (0, _react.useState)(1),
      _useState2 = _slicedToArray(_useState, 2),
      currentStep = _useState2[0],
      setCurrentStep = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      maxCompletedStep = _useState4[0],
      setMaxCompletedStep = _useState4[1];

  var stepMap = {
    1: _steps.RestoreSnapshotStepLogistics,
    2: _steps.RestoreSnapshotStepSettings,
    3: _steps.RestoreSnapshotStepReview
  };
  var CurrentStepForm = stepMap[currentStep]; // Restore details state

  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      restoreSettings = _useState6[0],
      setRestoreSettings = _useState6[1]; // Restore validation state


  var _useState7 = (0, _react.useState)({
    isValid: true,
    errors: {}
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      validation = _useState8[0],
      setValidation = _useState8[1];

  var updateRestoreSettings = function updateRestoreSettings(updatedSettings) {
    var newRestoreSettings = _objectSpread({}, restoreSettings, {}, updatedSettings);

    var newValidation = (0, _validation.validateRestore)(newRestoreSettings);
    setRestoreSettings(newRestoreSettings);
    setValidation(newValidation);
  };

  var updateCurrentStep = function updateCurrentStep(step) {
    if (maxCompletedStep < step - 1) {
      return;
    }

    setCurrentStep(step);
    setMaxCompletedStep(step - 1);
    clearSaveError();
  };

  var onBack = function onBack() {
    var previousStep = currentStep - 1;
    setCurrentStep(previousStep);
    setMaxCompletedStep(previousStep - 1);
    clearSaveError();
  };

  var onNext = function onNext() {
    if (!validation.isValid) {
      return;
    }

    var nextStep = currentStep + 1;
    setMaxCompletedStep(Math.max(currentStep, maxCompletedStep));
    setCurrentStep(nextStep);
  };

  var executeRestore = function executeRestore() {
    if (validation.isValid) {
      onSave(restoreSettings);
    }
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_navigation.RestoreSnapshotNavigation, {
    currentStep: currentStep,
    maxCompletedStep: maxCompletedStep,
    updateCurrentStep: updateCurrentStep
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(CurrentStepForm, {
    snapshotDetails: snapshotDetails,
    restoreSettings: restoreSettings,
    updateRestoreSettings: updateRestoreSettings,
    errors: validation.errors,
    updateCurrentStep: updateCurrentStep
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), saveError ? _react.default.createElement(_react.Fragment, null, saveError, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  })) : null, _react.default.createElement(_eui.EuiFlexGroup, null, currentStep > 1 ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "arrowLeft",
    onClick: function onClick() {
      return onBack();
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.restoreForm.backButtonLabel",
    defaultMessage: "Back"
  }))) : null, currentStep < 3 ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    iconType: "arrowRight",
    onClick: function onClick() {
      return onNext();
    },
    disabled: !validation.isValid
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.restoreForm.nextButtonLabel",
    defaultMessage: "Next"
  }))) : null, currentStep === 3 ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    color: "secondary",
    iconType: "check",
    onClick: function onClick() {
      return executeRestore();
    },
    isLoading: isSaving
  }, isSaving ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.restoreForm.savingButtonLabel",
    defaultMessage: "Restoring\u2026"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.restoreForm.submitButtonLabel",
    defaultMessage: "Restore snapshot"
  }))) : null)), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
};

exports.RestoreSnapshotForm = RestoreSnapshotForm;