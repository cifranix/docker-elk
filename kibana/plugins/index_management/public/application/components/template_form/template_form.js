"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _shared_imports = require("../../../shared_imports");

var _template_steps = require("./template_steps");

var _steps = require("./steps");

var _section_error = require("../section_error");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var stripEmptyFields = _shared_imports.serializers.stripEmptyFields;
var defaultValidation = {
  isValid: true
};
var stepComponentMap = {
  1: _steps.StepLogistics,
  2: _steps.StepSettings,
  3: _steps.StepMappings,
  4: _steps.StepAliases,
  5: _steps.StepReview
};

var TemplateForm = function TemplateForm(_ref) {
  var _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? {
    isManaged: false
  } : _ref$defaultValue,
      onSave = _ref.onSave,
      isSaving = _ref.isSaving,
      saveError = _ref.saveError,
      clearSaveError = _ref.clearSaveError,
      isEditing = _ref.isEditing;

  var _useState = (0, _react.useState)(1),
      _useState2 = _slicedToArray(_useState, 2),
      currentStep = _useState2[0],
      setCurrentStep = _useState2[1];

  var _useState3 = (0, _react.useState)({
    1: defaultValidation,
    2: defaultValidation,
    3: defaultValidation,
    4: defaultValidation,
    5: defaultValidation
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      validation = _useState4[0],
      setValidation = _useState4[1];

  var template = (0, _react.useRef)(defaultValue);
  var stepsDataGetters = (0, _react.useRef)({});
  var lastStep = Object.keys(stepComponentMap).length;
  var CurrentStepComponent = stepComponentMap[currentStep];
  var isStepValid = validation[currentStep].isValid;
  var setStepDataGetter = (0, _react.useCallback)(function (stepDataGetter) {
    stepsDataGetters.current[currentStep] = stepDataGetter;
  }, [currentStep]);
  var onStepValidityChange = (0, _react.useCallback)(function (isValid) {
    setValidation(function (prev) {
      return _objectSpread({}, prev, _defineProperty({}, currentStep, {
        isValid: isValid,
        errors: {}
      }));
    });
  }, [currentStep]);

  var validateAndGetDataFromCurrentStep =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var validateAndGetData, _ref3, isValid, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              validateAndGetData = stepsDataGetters.current[currentStep];

              if (validateAndGetData) {
                _context.next = 3;
                break;
              }

              throw new Error("No data getter has been set for step \"".concat(currentStep, "\""));

            case 3:
              _context.next = 5;
              return validateAndGetData();

            case 5:
              _ref3 = _context.sent;
              isValid = _ref3.isValid;
              data = _ref3.data;

              if (isValid) {
                // Update the template object
                template.current = _objectSpread({}, template.current, {}, data);
              }

              return _context.abrupt("return", {
                isValid: isValid,
                data: data
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function validateAndGetDataFromCurrentStep() {
      return _ref2.apply(this, arguments);
    };
  }();

  var updateCurrentStep =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(nextStep) {
      var shouldValidate, isValid;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // All steps needs validation, except for the last step
              shouldValidate = currentStep !== lastStep;
              isValid = isStepValid;

              if (!shouldValidate) {
                _context2.next = 13;
                break;
              }

              if (!(isValid === false)) {
                _context2.next = 7;
                break;
              }

              _context2.t0 = false;
              _context2.next = 10;
              break;

            case 7:
              _context2.next = 9;
              return validateAndGetDataFromCurrentStep();

            case 9:
              _context2.t0 = _context2.sent.isValid;

            case 10:
              isValid = _context2.t0;

              if (isValid) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("return");

            case 13:
              setCurrentStep(nextStep);
              clearSaveError();

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function updateCurrentStep(_x) {
      return _ref4.apply(this, arguments);
    };
  }();

  var onBack = function onBack() {
    var prevStep = currentStep - 1;
    updateCurrentStep(prevStep);
  };

  var onNext = function onNext() {
    var nextStep = currentStep + 1;
    updateCurrentStep(nextStep);
  };

  var saveButtonLabel = isEditing ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.saveButtonLabel",
    defaultMessage: "Save template"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.createButtonLabel",
    defaultMessage: "Create template"
  });
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_template_steps.TemplateSteps, {
    currentStep: currentStep,
    updateCurrentStep: updateCurrentStep,
    isCurrentStepValid: isStepValid
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), saveError ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_section_error.SectionError, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.saveTemplateError",
      defaultMessage: "Unable to create template"
    }),
    error: saveError,
    "data-test-subj": "saveTemplateError"
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  })) : null, _react.default.createElement(_eui.EuiForm, {
    "data-test-subj": "templateForm"
  }, _react.default.createElement(CurrentStepComponent, {
    key: currentStep,
    template: template.current,
    setDataGetter: setStepDataGetter,
    updateCurrentStep: updateCurrentStep,
    onStepValidityChange: onStepValidityChange,
    isEditing: isEditing
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, null, currentStep > 1 ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "arrowLeft",
    onClick: onBack,
    "data-test-subj": "backButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.backButtonLabel",
    defaultMessage: "Back"
  }))) : null, currentStep < lastStep ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    iconType: "arrowRight",
    onClick: onNext,
    iconSide: "right",
    disabled: isStepValid === false,
    "data-test-subj": "nextButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.nextButtonLabel",
    defaultMessage: "Next"
  }))) : null, currentStep === lastStep ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    color: "secondary",
    iconType: "check",
    onClick: onSave.bind(null, stripEmptyFields(template.current)),
    "data-test-subj": "submitButton",
    isLoading: isSaving
  }, isSaving ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.savingButtonLabel",
    defaultMessage: "Saving..."
  }) : saveButtonLabel)) : null)))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
};

exports.TemplateForm = TemplateForm;