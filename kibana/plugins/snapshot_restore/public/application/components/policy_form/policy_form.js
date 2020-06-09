"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../common/constants");

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

var PolicyForm = function PolicyForm(_ref) {
  var originalPolicy = _ref.policy,
      indices = _ref.indices,
      currentUrl = _ref.currentUrl,
      isEditing = _ref.isEditing,
      isSaving = _ref.isSaving,
      saveError = _ref.saveError,
      clearSaveError = _ref.clearSaveError,
      onCancel = _ref.onCancel,
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
    1: _steps.PolicyStepLogistics,
    2: _steps.PolicyStepSettings,
    3: _steps.PolicyStepRetention,
    4: _steps.PolicyStepReview
  };
  var CurrentStepForm = stepMap[currentStep]; // Policy state

  var _useState5 = (0, _react.useState)(_objectSpread({}, originalPolicy, {
    config: _objectSpread({}, originalPolicy.config || {}),
    retention: _objectSpread({}, originalPolicy.retention || {
      expireAfterUnit: _constants.TIME_UNITS.DAY
    })
  })),
      _useState6 = _slicedToArray(_useState5, 2),
      policy = _useState6[0],
      setPolicy = _useState6[1]; // Policy validation state


  var _useState7 = (0, _react.useState)({
    isValid: true,
    errors: {}
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      validation = _useState8[0],
      setValidation = _useState8[1];

  var updatePolicy = function updatePolicy(updatedFields) {
    var validationHelperData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var newPolicy = _objectSpread({}, policy, {}, updatedFields);

    var newValidation = (0, _validation.validatePolicy)(newPolicy, validationHelperData);
    setPolicy(newPolicy);
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

  var savePolicy = function savePolicy() {
    if (validation.isValid) {
      onSave(policy);
    }
  };

  var lastStep = Object.keys(stepMap).length;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_navigation.PolicyNavigation, {
    currentStep: currentStep,
    maxCompletedStep: maxCompletedStep,
    updateCurrentStep: updateCurrentStep
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(CurrentStepForm, {
    policy: policy,
    indices: indices,
    updatePolicy: updatePolicy,
    isEditing: isEditing,
    currentUrl: currentUrl,
    errors: validation.errors,
    updateCurrentStep: updateCurrentStep
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), saveError ? _react.default.createElement(_react.Fragment, null, saveError, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  })) : null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, null, currentStep > 1 ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "arrowLeft",
    onClick: function onClick() {
      return onBack();
    },
    disabled: !validation.isValid
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.backButtonLabel",
    defaultMessage: "Back"
  }))) : null, currentStep < lastStep ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    iconType: "arrowRight",
    onClick: function onClick() {
      return onNext();
    },
    iconSide: "right",
    disabled: !validation.isValid,
    "data-test-subj": "nextButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.nextButtonLabel",
    defaultMessage: "Next"
  }))) : null, currentStep === lastStep ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: isEditing && policy.isManagedPolicy ? false : true,
    color: isEditing && policy.isManagedPolicy ? 'warning' : 'secondary',
    iconType: "check",
    onClick: function onClick() {
      return savePolicy();
    },
    isLoading: isSaving,
    "data-test-subj": "submitButton"
  }, isSaving ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.savingButtonLabel",
    defaultMessage: "Saving\u2026"
  }) : isEditing ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.saveButtonLabel",
    defaultMessage: "Save policy"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.createButtonLabel",
    defaultMessage: "Create policy"
  }))) : null)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: function onClick() {
      return onCancel();
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.cancelButtonLabel",
    defaultMessage: "Cancel"
  }))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
};

exports.PolicyForm = PolicyForm;