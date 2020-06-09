"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Main = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _ = require("../");

var _components = require("../../components");

var _app_context = require("../../contexts/app_context");

var _components2 = require("./components");

var _profiler_context = require("../../contexts/profiler_context");

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Main = function Main() {
  var _useAppContext = (0, _app_context.useAppContext)(),
      getLicenseStatus = _useAppContext.getLicenseStatus,
      notifications = _useAppContext.notifications;

  var _useProfilerReadConte = (0, _profiler_context.useProfilerReadContext)(),
      activeTab = _useProfilerReadConte.activeTab,
      currentResponse = _useProfilerReadConte.currentResponse,
      highlightDetails = _useProfilerReadConte.highlightDetails,
      pristine = _useProfilerReadConte.pristine,
      profiling = _useProfilerReadConte.profiling;

  var dispatch = (0, _profiler_context.useProfilerActionContext)();

  var handleProfileTreeError = function handleProfileTreeError(e) {
    notifications.addError(e, {
      title: _i18n.i18n.translate('xpack.searchProfiler.profileTreeErrorRenderTitle', {
        defaultMessage: 'Profile data cannot be parsed.'
      })
    });
  };

  var setActiveTab = (0, _react.useCallback)(function (target) {
    return dispatch({
      type: 'setActiveTab',
      value: target
    });
  }, [dispatch]);
  var onHighlight = (0, _react.useCallback)(function (value) {
    return dispatch({
      type: 'setHighlightDetails',
      value: value
    });
  }, [dispatch]);

  var renderLicenseWarning = function renderLicenseWarning() {
    return !getLicenseStatus().valid ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_components.LicenseWarningNotice, null), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    })) : null;
  };

  var renderProfileTreeArea = function renderProfileTreeArea() {
    if (profiling) {
      return _react.default.createElement(_components2.ProfileLoadingPlaceholder, null);
    }

    if (activeTab) {
      return _react.default.createElement("div", {
        className: "prfDevTool__main__profiletree"
      }, _react.default.createElement(_components.ProfileTree, {
        onDataInitError: handleProfileTreeError,
        onHighlight: onHighlight,
        target: activeTab,
        data: currentResponse
      }));
    }

    if (getLicenseStatus().valid && pristine) {
      return _react.default.createElement(_components2.EmptyTreePlaceHolder, null);
    }

    return null;
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPage, {
    className: "prfDevTool__page appRoot"
  }, _react.default.createElement(_eui.EuiPageBody, {
    className: "prfDevTool__page__pageBody"
  }, renderLicenseWarning(), _react.default.createElement(_eui.EuiPageContent, {
    className: "prfDevTool__page__pageBodyContent"
  }, _react.default.createElement(_eui.EuiPageContentBody, {
    className: "prfDevTool__page__pageBodyContentBody"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    responsive: false,
    gutterSize: "s",
    direction: "row",
    className: "prfDevTool__page__bodyGroup"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_.ProfileQueryEditor, null)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 3
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    className: "prfDevTool__main",
    gutterSize: "none",
    direction: "column"
  }, _react.default.createElement(_components.SearchProfilerTabs, {
    activeTab: activeTab,
    activateTab: setActiveTab,
    has: {
      aggregations: Boolean(currentResponse && (0, _utils.hasAggregations)(currentResponse)),
      searches: Boolean(currentResponse && (0, _utils.hasSearch)(currentResponse))
    }
  }), renderProfileTreeArea()))), highlightDetails ? _react.default.createElement(_components.HighlightDetailsFlyout, _extends({}, highlightDetails, {
    onClose: function onClose() {
      return dispatch({
        type: 'setHighlightDetails',
        value: null
      });
    }
  })) : null)))));
};

exports.Main = Main;