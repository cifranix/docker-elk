"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Demo = Demo;
exports.urlDrilldownActionFactory = exports.dashboardDrilldownActionFactory = exports.dashboards = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _action_wizard = require("./action_wizard");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dashboards = [{
  id: 'dashboard1',
  title: 'Dashboard 1'
}, {
  id: 'dashboard2',
  title: 'Dashboard 2'
}];
exports.dashboards = dashboards;
var dashboardDrilldownActionFactory = {
  type: 'Dashboard',
  displayName: 'Go to Dashboard',
  iconType: 'dashboardApp',
  createConfig: function createConfig() {
    return {
      dashboardId: undefined,
      useCurrentDashboardDataRange: true,
      useCurrentDashboardFilters: true
    };
  },
  isValid: function isValid(config) {
    if (!config.dashboardId) return false;
    return true;
  },
  wizard: function wizard(props) {
    var _props$config;

    var config = (_props$config = props.config) !== null && _props$config !== void 0 ? _props$config : {
      dashboardId: undefined,
      useCurrentDashboardDataRange: true,
      useCurrentDashboardFilters: true
    };
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
      label: "Choose destination dashboard:"
    }, _react.default.createElement(_eui.EuiSelect, {
      name: "selectDashboard",
      hasNoInitialSelection: true,
      options: dashboards.map(function (_ref) {
        var id = _ref.id,
            title = _ref.title;
        return {
          value: id,
          text: title
        };
      }),
      value: config.dashboardId,
      onChange: function onChange(e) {
        props.onConfig(_objectSpread({}, config, {
          dashboardId: e.target.value
        }));
      }
    })), _react.default.createElement(_eui.EuiFormRow, {
      hasChildLabel: false
    }, _react.default.createElement(_eui.EuiSwitch, {
      name: "useCurrentFilters",
      label: "Use current dashboard's filters",
      checked: config.useCurrentDashboardFilters,
      onChange: function onChange() {
        return props.onConfig(_objectSpread({}, config, {
          useCurrentDashboardFilters: !config.useCurrentDashboardFilters
        }));
      }
    })), _react.default.createElement(_eui.EuiFormRow, {
      hasChildLabel: false
    }, _react.default.createElement(_eui.EuiSwitch, {
      name: "useCurrentDateRange",
      label: "Use current dashboard's date range",
      checked: config.useCurrentDashboardDataRange,
      onChange: function onChange() {
        return props.onConfig(_objectSpread({}, config, {
          useCurrentDashboardDataRange: !config.useCurrentDashboardDataRange
        }));
      }
    })));
  }
};
exports.dashboardDrilldownActionFactory = dashboardDrilldownActionFactory;
var urlDrilldownActionFactory = {
  type: 'Url',
  displayName: 'Go to URL',
  iconType: 'link',
  createConfig: function createConfig() {
    return {
      url: '',
      openInNewTab: false
    };
  },
  isValid: function isValid(config) {
    if (!config.url) return false;
    return true;
  },
  wizard: function wizard(props) {
    var _props$config2;

    var config = (_props$config2 = props.config) !== null && _props$config2 !== void 0 ? _props$config2 : {
      url: '',
      openInNewTab: false
    };
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
      label: "Enter target URL"
    }, _react.default.createElement(_eui.EuiFieldText, {
      placeholder: "Enter URL",
      name: "url",
      value: config.url,
      onChange: function onChange(event) {
        return props.onConfig(_objectSpread({}, config, {
          url: event.target.value
        }));
      }
    })), _react.default.createElement(_eui.EuiFormRow, {
      hasChildLabel: false
    }, _react.default.createElement(_eui.EuiSwitch, {
      name: "openInNewTab",
      label: "Open in new tab?",
      checked: config.openInNewTab,
      onChange: function onChange() {
        return props.onConfig(_objectSpread({}, config, {
          openInNewTab: !config.openInNewTab
        }));
      }
    })));
  }
};
exports.urlDrilldownActionFactory = urlDrilldownActionFactory;

function Demo(_ref2) {
  var _state$currentActionF, _ref3, _state$currentActionF2;

  var actionFactories = _ref2.actionFactories;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  function changeActionFactory(newActionFactory) {
    if (!newActionFactory) {
      // removing action factory
      return setState({});
    }

    setState({
      currentActionFactory: newActionFactory,
      config: newActionFactory.createConfig()
    });
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_action_wizard.ActionWizard, {
    actionFactories: actionFactories,
    config: state.config,
    onConfigChange: function onConfigChange(newConfig) {
      setState(_objectSpread({}, state, {
        config: newConfig
      }));
    },
    onActionFactoryChange: function onActionFactoryChange(newActionFactory) {
      changeActionFactory(newActionFactory);
    },
    currentActionFactory: state.currentActionFactory
  }), _react.default.createElement("div", {
    style: {
      marginTop: '44px'
    }
  }), _react.default.createElement("hr", null), _react.default.createElement("div", null, "Action Factory Type: ", (_state$currentActionF = state.currentActionFactory) === null || _state$currentActionF === void 0 ? void 0 : _state$currentActionF.type), _react.default.createElement("div", null, "Action Factory Config: ", JSON.stringify(state.config)), _react.default.createElement("div", null, "Is config valid:", ' ', JSON.stringify((_ref3 = (_state$currentActionF2 = state.currentActionFactory) === null || _state$currentActionF2 === void 0 ? void 0 : _state$currentActionF2.isValid(state.config)) !== null && _ref3 !== void 0 ? _ref3 : false)));
}