"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wizard = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../common");

var _step_define = require("../step_define");

var _step_create = require("../step_create");

var _step_details = require("../step_details");

var _wizard_nav = require("../wizard_nav");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KBN_MANAGEMENT_PAGE_CLASSNAME;

(function (KBN_MANAGEMENT_PAGE_CLASSNAME) {
  KBN_MANAGEMENT_PAGE_CLASSNAME["DEFAULT_BODY"] = "mgtPage__body";
  KBN_MANAGEMENT_PAGE_CLASSNAME["TRANSFORM_BODY_MODIFIER"] = "mgtPage__body--transformWizard";
})(KBN_MANAGEMENT_PAGE_CLASSNAME || (KBN_MANAGEMENT_PAGE_CLASSNAME = {}));

var WIZARD_STEPS;

(function (WIZARD_STEPS) {
  WIZARD_STEPS[WIZARD_STEPS["DEFINE"] = 0] = "DEFINE";
  WIZARD_STEPS[WIZARD_STEPS["DETAILS"] = 1] = "DETAILS";
  WIZARD_STEPS[WIZARD_STEPS["CREATE"] = 2] = "CREATE";
})(WIZARD_STEPS || (WIZARD_STEPS = {}));

var StepDefine = function StepDefine(_ref) {
  var isCurrentStep = _ref.isCurrentStep,
      stepDefineState = _ref.stepDefineState,
      setCurrentStep = _ref.setCurrentStep,
      setStepDefineState = _ref.setStepDefineState,
      searchItems = _ref.searchItems;
  var definePivotRef = (0, _react.useRef)(null);
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
    ref: definePivotRef
  }), isCurrentStep && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_step_define.StepDefineForm, {
    onChange: setStepDefineState,
    overrides: _objectSpread({}, stepDefineState),
    searchItems: searchItems
  }), _react.default.createElement(_wizard_nav.WizardNav, {
    next: function next() {
      return setCurrentStep(WIZARD_STEPS.DETAILS);
    },
    nextActive: stepDefineState.valid
  })), !isCurrentStep && _react.default.createElement(_step_define.StepDefineSummary, {
    formState: _objectSpread({}, stepDefineState),
    searchItems: searchItems
  }));
};

var Wizard = _react.default.memo(function (_ref2) {
  var cloneConfig = _ref2.cloneConfig,
      searchItems = _ref2.searchItems;

  // The current WIZARD_STEP
  var _useState = (0, _react.useState)(WIZARD_STEPS.DEFINE),
      _useState2 = _slicedToArray(_useState, 2),
      currentStep = _useState2[0],
      setCurrentStep = _useState2[1]; // The DEFINE state


  var _useState3 = (0, _react.useState)((0, _step_define.applyTransformConfigToDefineState)((0, _step_define.getDefaultStepDefineState)(searchItems), cloneConfig)),
      _useState4 = _slicedToArray(_useState3, 2),
      stepDefineState = _useState4[0],
      setStepDefineState = _useState4[1]; // The DETAILS state


  var _useState5 = (0, _react.useState)((0, _step_details.applyTransformConfigToDetailsState)((0, _step_details.getDefaultStepDetailsState)(), cloneConfig)),
      _useState6 = _slicedToArray(_useState5, 2),
      stepDetailsState = _useState6[0],
      setStepDetailsState = _useState6[1];

  var stepDetails = currentStep === WIZARD_STEPS.DETAILS ? _react.default.createElement(_step_details.StepDetailsForm, {
    onChange: setStepDetailsState,
    overrides: stepDetailsState,
    searchItems: searchItems
  }) : _react.default.createElement(_step_details.StepDetailsSummary, stepDetailsState); // The CREATE state

  var _useState7 = (0, _react.useState)(_step_create.getDefaultStepCreateState),
      _useState8 = _slicedToArray(_useState7, 2),
      stepCreateState = _useState8[0],
      setStepCreateState = _useState8[1];

  (0, _react.useEffect)(function () {
    // The transform plugin doesn't control the wrapping management page via React
    // so we use plain JS to add and remove a custom CSS class to set the full
    // page width to 100% for the transform wizard. It's done to replicate the layout
    // as it was when transforms were part of the ML plugin. This will be revisited
    // to come up with an approach that's more in line with the overall layout
    // of the Kibana management section.
    var managementBody = document.getElementsByClassName(KBN_MANAGEMENT_PAGE_CLASSNAME.DEFAULT_BODY);

    if (managementBody.length > 0) {
      managementBody[0].classList.add(KBN_MANAGEMENT_PAGE_CLASSNAME.TRANSFORM_BODY_MODIFIER);
      return function () {
        managementBody[0].classList.remove(KBN_MANAGEMENT_PAGE_CLASSNAME.TRANSFORM_BODY_MODIFIER);
      };
    }
  }, []);
  var indexPattern = searchItems.indexPattern;
  var transformConfig = (0, _common.getCreateRequestBody)(indexPattern.title, stepDefineState, stepDetailsState);
  var stepCreate = currentStep === WIZARD_STEPS.CREATE ? _react.default.createElement(_step_create.StepCreateForm, {
    createIndexPattern: stepDetailsState.createIndexPattern,
    transformId: stepDetailsState.transformId,
    transformConfig: transformConfig,
    onChange: setStepCreateState,
    overrides: stepCreateState
  }) : _react.default.createElement(_step_create.StepCreateSummary, null);
  var stepsConfig = [{
    title: _i18n.i18n.translate('xpack.transform.transformsWizard.stepDefineTitle', {
      defaultMessage: 'Define pivot'
    }),
    children: _react.default.createElement(StepDefine, {
      isCurrentStep: currentStep === WIZARD_STEPS.DEFINE,
      stepDefineState: stepDefineState,
      setCurrentStep: setCurrentStep,
      setStepDefineState: setStepDefineState,
      searchItems: searchItems
    })
  }, {
    title: _i18n.i18n.translate('xpack.transform.transformsWizard.stepDetailsTitle', {
      defaultMessage: 'Transform details'
    }),
    children: _react.default.createElement(_react.Fragment, null, stepDetails, currentStep === WIZARD_STEPS.DETAILS && _react.default.createElement(_wizard_nav.WizardNav, {
      previous: function previous() {
        setCurrentStep(WIZARD_STEPS.DEFINE);
      },
      next: function next() {
        return setCurrentStep(WIZARD_STEPS.CREATE);
      },
      nextActive: stepDetailsState.valid
    })),
    status: currentStep >= WIZARD_STEPS.DETAILS ? undefined : 'incomplete'
  }, {
    title: _i18n.i18n.translate('xpack.transform.transformsWizard.stepCreateTitle', {
      defaultMessage: 'Create'
    }),
    children: _react.default.createElement(_react.Fragment, null, stepCreate, currentStep === WIZARD_STEPS.CREATE && !stepCreateState.created && _react.default.createElement(_wizard_nav.WizardNav, {
      previous: function previous() {
        return setCurrentStep(WIZARD_STEPS.DETAILS);
      }
    })),
    status: currentStep >= WIZARD_STEPS.CREATE ? undefined : 'incomplete'
  }];
  return _react.default.createElement(_eui.EuiSteps, {
    className: "transform__steps",
    steps: stepsConfig
  });
});

exports.Wizard = Wizard;