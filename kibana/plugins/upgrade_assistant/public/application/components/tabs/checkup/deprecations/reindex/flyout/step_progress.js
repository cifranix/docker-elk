"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepProgress = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var StepStatus = function StepStatus(_ref) {
  var status = _ref.status,
      idx = _ref.idx;

  if (status === 'incomplete') {
    return _react.default.createElement("span", {
      className: "upgStepProgress__status"
    }, idx + 1, ".");
  } else if (status === 'inProgress') {
    return _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "m",
      className: "upgStepProgress__status"
    });
  } else if (status === 'complete') {
    return _react.default.createElement("span", {
      className: "upgStepProgress__status upgStepProgress__status--circle upgStepProgress__status--circle-complete"
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "check",
      size: "s"
    }));
  } else if (status === 'paused') {
    return _react.default.createElement("span", {
      className: "upgStepProgress__status upgStepProgress__status--circle upgStepProgress__status--circle-paused"
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "pause",
      size: "s"
    }));
  } else if (status === 'cancelled') {
    return _react.default.createElement("span", {
      className: "upgStepProgress__status upgStepProgress__status--circle upgStepProgress__status--circle-cancelled"
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "cross",
      size: "s"
    }));
  } else if (status === 'failed') {
    return _react.default.createElement("span", {
      className: "upgStepProgress__status upgStepProgress__status--circle upgStepProgress__status--circle-failed"
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "cross",
      size: "s"
    }));
  }

  throw new Error("Unsupported status: ".concat(status));
};

var Step = function Step(_ref2) {
  var title = _ref2.title,
      status = _ref2.status,
      children = _ref2.children,
      idx = _ref2.idx;
  var titleClassName = (0, _classnames.default)('upgStepProgress__title', {
    'upgStepProgress__title--currentStep': status === 'inProgress' || status === 'paused' || status === 'failed' || status === 'cancelled'
  });
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
    className: "upgStepProgress__step"
  }, _react.default.createElement(StepStatus, {
    status: status,
    idx: idx
  }), _react.default.createElement("p", {
    className: titleClassName
  }, title)), children && _react.default.createElement("div", {
    className: "upgStepProgress__content"
  }, children));
};

/**
 * A generic component that displays a series of automated steps and the system's progress.
 */
var StepProgress = function StepProgress(_ref3) {
  var steps = _ref3.steps;
  return _react.default.createElement("div", {
    className: "upgStepProgress__container"
  }, steps.map(function (step, idx) {
    return _react.default.createElement(Step, _extends({
      key: idx
    }, step, {
      idx: idx
    }));
  }));
};

exports.StepProgress = StepProgress;