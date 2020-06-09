"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _navigation_menu = require("../../../components/navigation_menu");

var _analytics_list = require("./components/analytics_list");

var _use_refresh_interval = require("./components/analytics_list/use_refresh_interval");

var _use_create_analytics_form = require("./hooks/use_create_analytics_form");

var _node_available_warning = require("../../../components/node_available_warning");

var _upgrade = require("../../../components/upgrade");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Page = function Page() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      blockRefresh = _useState2[0],
      setBlockRefresh = _useState2[1];

  (0, _use_refresh_interval.useRefreshInterval)(setBlockRefresh);
  var createAnalyticsForm = (0, _use_create_analytics_form.useCreateAnalyticsForm)();
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_navigation_menu.NavigationMenu, {
    tabId: "data_frame_analytics"
  }), _react.default.createElement(_eui.EuiPage, {
    "data-test-subj": "mlPageDataFrameAnalytics"
  }, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageHeader, null, _react.default.createElement(_eui.EuiPageHeaderSection, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.dataframe.analyticsList.title",
    defaultMessage: "Analytics jobs"
  }), _react.default.createElement("span", null, "\xA0"), _react.default.createElement(_eui.EuiBetaBadge, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.experimentalBadgeLabel', {
      defaultMessage: 'Experimental'
    }),
    tooltipContent: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.experimentalBadgeTooltipContent', {
      defaultMessage: "Data frame analytics are an experimental feature. We'd love to hear your feedback."
    })
  }))))), _react.default.createElement(_node_available_warning.NodeAvailableWarning, null), _react.default.createElement(_upgrade.UpgradeWarning, null), _react.default.createElement(_analytics_list.DataFrameAnalyticsList, {
    blockRefresh: blockRefresh,
    createAnalyticsForm: createAnalyticsForm
  }))));
};

exports.Page = Page;