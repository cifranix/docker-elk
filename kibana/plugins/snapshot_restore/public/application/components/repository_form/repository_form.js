"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _lib = require("../../../../common/lib");

var _validation = require("../../services/validation");

var _step_one = require("./step_one");

var _step_two = require("./step_two");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RepositoryForm = function RepositoryForm(_ref) {
  var originalRepository = _ref.repository,
      isManagedRepository = _ref.isManagedRepository,
      isEditing = _ref.isEditing,
      isSaving = _ref.isSaving,
      saveError = _ref.saveError,
      clearSaveError = _ref.clearSaveError,
      onSave = _ref.onSave;

  var _useState = (0, _react.useState)(isEditing ? 2 : 1),
      _useState2 = _slicedToArray(_useState, 2),
      currentStep = _useState2[0],
      setCurrentStep = _useState2[1]; // Repository state


  var _useState3 = (0, _react.useState)(_objectSpread({}, originalRepository, {
    settings: _objectSpread({}, originalRepository.settings)
  })),
      _useState4 = _slicedToArray(_useState3, 2),
      repository = _useState4[0],
      setRepository = _useState4[1]; // Repository validation state


  var _useState5 = (0, _react.useState)({
    isValid: true,
    errors: {}
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      validation = _useState6[0],
      setValidation = _useState6[1];

  var updateRepository = function updateRepository(updatedFields) {
    var newRepository = _objectSpread({}, repository, {}, updatedFields);

    setRepository(newRepository);
  };

  var saveRepository = function saveRepository() {
    var newValidation = (0, _validation.validateRepository)(repository, true);
    var isValid = newValidation.isValid;
    setValidation(newValidation);

    if (isValid) {
      onSave(repository);
    }
  };

  var goToNextStep = function goToNextStep() {
    var newValidation = (0, _validation.validateRepository)(repository, false);
    var isValid = newValidation.isValid;
    setValidation(newValidation);

    if (isValid) {
      setCurrentStep(2);
    }
  };

  var goToPreviousStep = function goToPreviousStep() {
    if (isEditing) {
      return;
    }

    setValidation({
      isValid: true,
      errors: {}
    });
    setCurrentStep(1);
    clearSaveError();
  };

  var hasValidationErrors = !validation.isValid;
  var validationErrors = Object.entries((0, _lib.flatten)(validation.errors)).reduce(function (acc, _ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    return [].concat(_toConsumableArray(acc), [value]);
  }, []);

  var renderStepOne = function renderStepOne() {
    return _react.default.createElement(_step_one.RepositoryFormStepOne, {
      repository: repository,
      onNext: function onNext() {
        return goToNextStep();
      },
      updateRepository: updateRepository,
      validation: validation
    });
  };

  var renderStepTwo = function renderStepTwo() {
    return _react.default.createElement(_step_two.RepositoryFormStepTwo, {
      repository: repository,
      isManagedRepository: isManagedRepository,
      isEditing: isEditing,
      isSaving: isSaving,
      onSave: saveRepository,
      updateRepository: updateRepository,
      validation: validation,
      saveError: saveError,
      onBack: function onBack() {
        return goToPreviousStep();
      }
    });
  };

  return _react.default.createElement(_eui.EuiForm, {
    isInvalid: hasValidationErrors,
    error: validationErrors,
    "data-test-subj": "repositoryForm"
  }, currentStep === 1 && !isEditing ? renderStepOne() : renderStepTwo());
};

exports.RepositoryForm = RepositoryForm;
RepositoryForm.defaultProps = {
  isEditing: false,
  isSaving: false
};