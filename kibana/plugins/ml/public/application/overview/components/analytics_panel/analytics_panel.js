"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyticsPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _table = require("./table");

var _analytics_service = require("../../../data_frame_analytics/pages/analytics_management/services/analytics_service");

var _stats_bar = require("../../../components/stats_bar");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AnalyticsPanel = function AnalyticsPanel(_ref) {
  var jobCreationDisabled = _ref.jobCreationDisabled;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      analytics = _useState2[0],
      setAnalytics = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      analyticsStats = _useState4[0],
      setAnalyticsStats = _useState4[1];

  var _useState5 = (0, _react.useState)(undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      errorMessage = _useState6[0],
      setErrorMessage = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isInitialized = _useState8[0],
      setIsInitialized = _useState8[1];

  var getAnalytics = (0, _analytics_service.getAnalyticsFactory)(setAnalytics, setAnalyticsStats, setErrorMessage, setIsInitialized, false);
  (0, _react.useEffect)(function () {
    getAnalytics(true);
  }, []);

  var onRefresh = function onRefresh() {
    getAnalytics(true);
  };

  var errorDisplay = _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.ml.overview.analyticsList.errorPromptTitle', {
      defaultMessage: 'An error occurred getting the data frame analytics list.'
    }),
    color: "danger",
    iconType: "alert"
  }, _react.default.createElement("pre", null, errorMessage && errorMessage.message !== undefined ? errorMessage.message : JSON.stringify(errorMessage)));

  var panelClass = isInitialized === false ? 'mlOverviewPanel__isLoading' : 'mlOverviewPanel';
  return _react.default.createElement(_eui.EuiPanel, {
    className: panelClass
  }, typeof errorMessage !== 'undefined' && errorDisplay, isInitialized === false && _react.default.createElement(_eui.EuiLoadingSpinner, {
    className: "mlOverviewPanel__spinner",
    size: "xl"
  }), "\xA0\xA0\xA0\xA0", errorMessage === undefined && isInitialized === true && analytics.length === 0 && _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "createAdvancedJob",
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.ml.overview.analyticsList.createFirstJobMessage', {
      defaultMessage: 'Create your first analytics job'
    })),
    body: _react.default.createElement("p", null, _i18n.i18n.translate('xpack.ml.overview.analyticsList.emptyPromptText', {
      defaultMessage: "Data frame analytics enable you to perform different analyses of your data and annotate it with the results. The analytics job stores the annotated data, as well as a copy of the source data, in a new index."
    })),
    actions: _react.default.createElement(_eui.EuiButton, {
      href: "#/data_frame_analytics?",
      color: "primary",
      fill: true,
      iconType: "plusInCircle",
      isDisabled: jobCreationDisabled
    }, _i18n.i18n.translate('xpack.ml.overview.analyticsList.createJobButtonText', {
      defaultMessage: 'Create job'
    }))
  }), isInitialized === true && analytics.length > 0 && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "m"
  }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.ml.overview.analyticsList.PanelTitle', {
    defaultMessage: 'Analytics'
  })))), analyticsStats !== undefined && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "mlOverviewPanel__statsBar"
  }, _react.default.createElement(_stats_bar.StatsBar, {
    stats: analyticsStats,
    dataTestSub: 'mlOverviewAnalyticsStatsBar'
  }))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_table.AnalyticsTable, {
    items: analytics
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement("div", {
    className: "mlOverviewPanel__buttons"
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    onClick: onRefresh,
    className: "mlOverviewPanel__refreshButton"
  }, _i18n.i18n.translate('xpack.ml.overview.analyticsList.refreshJobsButtonText', {
    defaultMessage: 'Refresh'
  })), _react.default.createElement(_eui.EuiButton, {
    size: "s",
    fill: true,
    href: "#/data_frame_analytics?"
  }, _i18n.i18n.translate('xpack.ml.overview.analyticsList.manageJobsButtonText', {
    defaultMessage: 'Manage jobs'
  })))));
};

exports.AnalyticsPanel = AnalyticsPanel;