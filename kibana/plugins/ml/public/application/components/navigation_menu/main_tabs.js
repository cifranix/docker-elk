"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainTabs = void 0;

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

function getTabs(disableLinks) {
  return [{
    id: 'overview',
    name: _i18n.i18n.translate('xpack.ml.navMenu.overviewTabLinkText', {
      defaultMessage: 'Overview'
    }),
    disabled: disableLinks
  }, {
    id: 'anomaly_detection',
    name: _i18n.i18n.translate('xpack.ml.navMenu.anomalyDetectionTabLinkText', {
      defaultMessage: 'Anomaly Detection'
    }),
    disabled: disableLinks
  }, {
    id: 'data_frame_analytics',
    name: _i18n.i18n.translate('xpack.ml.navMenu.dataFrameAnalyticsTabLinkText', {
      defaultMessage: 'Data Frame Analytics'
    }),
    disabled: disableLinks
  }, {
    id: 'datavisualizer',
    name: _i18n.i18n.translate('xpack.ml.navMenu.dataVisualizerTabLinkText', {
      defaultMessage: 'Data Visualizer'
    }),
    disabled: false
  }];
}

var TAB_DATA = {
  overview: {
    testSubject: 'mlMainTab overview',
    pathId: 'overview'
  },
  anomaly_detection: {
    testSubject: 'mlMainTab anomalyDetection',
    pathId: 'jobs'
  },
  data_frame_analytics: {
    testSubject: 'mlMainTab dataFrameAnalytics'
  },
  datavisualizer: {
    testSubject: 'mlMainTab dataVisualizer'
  }
};

var MainTabs = function MainTabs(_ref) {
  var tabId = _ref.tabId,
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

  var tabs = getTabs(disableLinks);
  return _react.default.createElement(_eui.EuiTabs, {
    display: "condensed"
  }, tabs.map(function (tab) {
    var id = tab.id,
        disabled = tab.disabled;
    var testSubject = TAB_DATA[id].testSubject;
    var defaultPathId = TAB_DATA[id].pathId || id; // globalState (e.g. selected jobs and time range) should be retained when changing pages.
    // appState will not be considered.

    var fullGlobalStateString = globalState !== undefined ? "?_g=".concat((0, _risonNode.encode)(globalState)) : '';
    return disabled ? _react.default.createElement(_eui.EuiTab, {
      key: "".concat(id, "-key"),
      className: 'mlNavigationMenu__mainTab',
      disabled: true
    }, tab.name) : _react.default.createElement(_eui.EuiLink, {
      "data-test-subj": testSubject + (id === selectedTabId ? ' selected' : ''),
      href: "#/".concat(defaultPathId).concat(fullGlobalStateString),
      key: "".concat(id, "-key"),
      color: "text"
    }, _react.default.createElement(_eui.EuiTab, {
      className: 'mlNavigationMenu__mainTab',
      onClick: function onClick() {
        return onSelectedTabChanged(id);
      },
      isSelected: id === selectedTabId
    }, tab.name));
  }));
};

exports.MainTabs = MainTabs;