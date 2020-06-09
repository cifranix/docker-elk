"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabs = getTabs;
exports.Tabs = void 0;

var _react = _interopRequireWildcard(require("react"));

var _risonNode = require("rison-node");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _url_state = require("../../util/url_state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getTabs(tabId, disableLinks) {
  var TAB_MAP = {
    overview: [],
    datavisualizer: [],
    data_frame_analytics: [],
    anomaly_detection: [{
      id: 'jobs',
      name: _i18n.i18n.translate('xpack.ml.navMenu.jobManagementTabLinkText', {
        defaultMessage: 'Job Management'
      }),
      disabled: disableLinks
    }, {
      id: 'explorer',
      name: _i18n.i18n.translate('xpack.ml.navMenu.anomalyExplorerTabLinkText', {
        defaultMessage: 'Anomaly Explorer'
      }),
      disabled: disableLinks
    }, {
      id: 'timeseriesexplorer',
      name: _i18n.i18n.translate('xpack.ml.navMenu.singleMetricViewerTabLinkText', {
        defaultMessage: 'Single Metric Viewer'
      }),
      disabled: disableLinks
    }, {
      id: 'settings',
      name: _i18n.i18n.translate('xpack.ml.navMenu.settingsTabLinkText', {
        defaultMessage: 'Settings'
      }),
      disabled: disableLinks
    }]
  };
  return TAB_MAP[tabId] || [];
}

var TAB_TEST_SUBJECT;

(function (TAB_TEST_SUBJECT) {
  TAB_TEST_SUBJECT["overview"] = "mlOverview";
  TAB_TEST_SUBJECT["jobs"] = "mlSubTab jobManagement";
  TAB_TEST_SUBJECT["explorer"] = "mlSubTab anomalyExplorer";
  TAB_TEST_SUBJECT["timeseriesexplorer"] = "mlSubTab singleMetricViewer";
  TAB_TEST_SUBJECT["settings"] = "mlSubTab settings";
})(TAB_TEST_SUBJECT || (TAB_TEST_SUBJECT = {}));

var Tabs = function Tabs(_ref) {
  var tabId = _ref.tabId,
      mainTabId = _ref.mainTabId,
      disableLinks = _ref.disableLinks;

  var _useUrlState = (0, _url_state.useUrlState)('_g'),
      _useUrlState2 = _slicedToArray(_useUrlState, 1),
      globalState = _useUrlState2[0];

  var _useState = (0, _react.useState)(tabId),
      _useState2 = _slicedToArray(_useState, 2),
      selectedTabId = _useState2[0],
      setSelectedTabId = _useState2[1];

  function onSelectedTabChanged(id) {
    setSelectedTabId(id);
  }

  var tabs = getTabs(mainTabId, disableLinks);
  if (tabs.length === 0) return null;
  return _react.default.createElement(_eui.EuiTabs, {
    size: "s",
    className: tabId === 'settings' ? 'mlSubTabs' : ''
  }, tabs.map(function (tab) {
    var id = tab.id; // globalState (e.g. selected jobs and time range) should be retained when changing pages.
    // appState will not be considered.

    var fullGlobalStateString = globalState !== undefined ? "?_g=".concat((0, _risonNode.encode)(globalState)) : '';
    return _react.default.createElement(_eui.EuiLink, {
      "data-test-subj": TAB_TEST_SUBJECT[id] + (id === selectedTabId ? ' selected' : ''),
      href: "#/".concat(id).concat(fullGlobalStateString),
      key: "".concat(id, "-key"),
      color: "text"
    }, _react.default.createElement(_eui.EuiTab, {
      className: "mlNavigationMenu__tab",
      onClick: function onClick() {
        return onSelectedTabChanged(id);
      },
      isSelected: id === selectedTabId,
      disabled: tab.disabled
    }, tab.name));
  }));
};

exports.Tabs = Tabs;