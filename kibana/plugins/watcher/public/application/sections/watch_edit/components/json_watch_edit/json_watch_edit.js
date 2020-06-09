"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonWatchEdit = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _execute_details = require("../../../../models/execute_details");

var _get_action_type = require("../../../../../../common/lib/get_action_type");

var _constants = require("../../../../../../common/constants");

var _json_watch_edit_form = require("./json_watch_edit_form");

var _json_watch_edit_simulate = require("./json_watch_edit_simulate");

var _watch_context = require("../../watch_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WATCH_EDIT_TAB = 'watchEditTab';
var WATCH_SIMULATE_TAB = 'watchSimulateTab';
var WATCH_TABS = [{
  id: WATCH_EDIT_TAB,
  name: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.editTabLabel', {
    defaultMessage: 'Edit'
  })
}, {
  id: WATCH_SIMULATE_TAB,
  name: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.simulateTabLabel', {
    defaultMessage: 'Simulate'
  })
}];
var EXECUTE_DETAILS_INITIAL_STATE = {
  triggeredTimeValue: 0,
  triggeredTimeUnit: _constants.TIME_UNITS.SECOND,
  scheduledTimeValue: 0,
  scheduledTimeUnit: _constants.TIME_UNITS.SECOND,
  ignoreCondition: false
};

function getActions(watch) {
  var actions = watch.watch && watch.watch.actions || {};
  return Object.keys(actions).map(function (actionKey) {
    return {
      actionId: actionKey,
      type: (0, _get_action_type.getActionType)(actions[actionKey]),
      actionMode: _constants.ACTION_MODES.SIMULATE
    };
  });
}

function getActionModes(items) {
  var result = items.reduce(function (itemsAccum, item) {
    if (item.actionId) {
      itemsAccum[item && item.actionId] = item.actionMode;
    }

    return itemsAccum;
  }, {});
  return result;
}

var JsonWatchEdit = function JsonWatchEdit(_ref) {
  var pageTitle = _ref.pageTitle;

  var _useContext = (0, _react.useContext)(_watch_context.WatchContext),
      watch = _useContext.watch;

  var watchActions = getActions(watch); // hooks

  var _useState = (0, _react.useState)(WATCH_EDIT_TAB),
      _useState2 = _slicedToArray(_useState, 2),
      selectedTab = _useState2[0],
      setSelectedTab = _useState2[1];

  var _useState3 = (0, _react.useState)(new _execute_details.ExecuteDetails(_objectSpread({}, EXECUTE_DETAILS_INITIAL_STATE, {
    actionModes: getActionModes(watchActions)
  }))),
      _useState4 = _slicedToArray(_useState3, 2),
      executeDetails = _useState4[0],
      _setExecuteDetails = _useState4[1];

  var executeWatchErrors = executeDetails.validate();
  var hasExecuteWatchErrors = !!Object.keys(executeWatchErrors).find(function (errorKey) {
    return executeWatchErrors[errorKey].length >= 1;
  });
  return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h1", {
    "data-test-subj": "pageTitle"
  }, pageTitle)))), _react.default.createElement(_eui.EuiTabs, null, WATCH_TABS.map(function (tab, index) {
    return _react.default.createElement(_eui.EuiTab, {
      onClick: function onClick() {
        setSelectedTab(tab.id);

        _setExecuteDetails(new _execute_details.ExecuteDetails(_objectSpread({}, executeDetails, {
          actionModes: getActionModes(watchActions)
        })));
      },
      isSelected: tab.id === selectedTab,
      key: index,
      "data-test-subj": "tab"
    }, tab.name);
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), selectedTab === WATCH_SIMULATE_TAB && _react.default.createElement(_json_watch_edit_simulate.JsonWatchEditSimulate, {
    executeDetails: executeDetails,
    setExecuteDetails: function setExecuteDetails(details) {
      return _setExecuteDetails(details);
    },
    executeWatchErrors: executeWatchErrors,
    hasExecuteWatchErrors: hasExecuteWatchErrors,
    watchActions: watchActions
  }), selectedTab === WATCH_EDIT_TAB && _react.default.createElement(_json_watch_edit_form.JsonWatchEditForm, null));
};

exports.JsonWatchEdit = JsonWatchEdit;