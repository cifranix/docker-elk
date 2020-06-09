"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewInApp = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _Option = require("fp-ts/lib/Option");

var _pipeable = require("fp-ts/lib/pipeable");

var _app_context = require("../../../app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var NO_NAVIGATION = false;

var ViewInApp = function ViewInApp(_ref) {
  var alert = _ref.alert;

  var _useAppDependencies = (0, _app_context.useAppDependencies)(),
      navigateToApp = _useAppDependencies.navigateToApp,
      maybeAlerting = _useAppDependencies.alerting;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      alertNavigation = _useState2[0],
      setAlertNavigation = _useState2[1];

  (0, _react.useEffect)(function () {
    (0, _pipeable.pipe)((0, _Option.fromNullable)(maybeAlerting), (0, _Option.fold)(
    /**
     * If the alerting plugin is disabled,
     * navigation isn't supported
     */
    function () {
      return setAlertNavigation(NO_NAVIGATION);
    }, function (alerting) {
      return alerting.getNavigation(alert.id).then(function (nav) {
        return nav ? setAlertNavigation(nav) : setAlertNavigation(NO_NAVIGATION);
      }).catch(function () {
        setAlertNavigation(NO_NAVIGATION);
      });
    }));
  }, [alert.id, maybeAlerting]);
  return _react.default.createElement(_eui.EuiButtonEmpty, _extends({
    "data-test-subj": "alertDetails-viewInApp",
    isLoading: alertNavigation === null,
    disabled: !hasNavigation(alertNavigation),
    iconType: "popout"
  }, getNavigationHandler(alertNavigation, alert, navigateToApp)), _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertDetails.viewAlertInAppButtonLabel",
    defaultMessage: "View in app"
  }));
};

exports.ViewInApp = ViewInApp;

function hasNavigation(alertNavigation) {
  return alertNavigation ? alertNavigation.hasOwnProperty('state') || alertNavigation.hasOwnProperty('path') : NO_NAVIGATION;
}

function getNavigationHandler(alertNavigation, alert, navigateToApp) {
  return hasNavigation(alertNavigation) ? {
    onClick: function onClick() {
      navigateToApp(alert.consumer, alertNavigation);
    }
  } : {};
}