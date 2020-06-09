"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAppContext = exports.AppContextProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _constants = require("../../common/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AppContext = (0, _react.createContext)(null);

var generateDocLinks = function generateDocLinks(_ref) {
  var _watchActionsConfigur;

  var ELASTIC_WEBSITE_URL = _ref.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = _ref.DOC_LINK_VERSION;
  var elasticDocLinkBase = "".concat(ELASTIC_WEBSITE_URL, "guide/en/");
  var esBase = "".concat(elasticDocLinkBase, "elasticsearch/reference/").concat(DOC_LINK_VERSION);
  var kibanaBase = "".concat(elasticDocLinkBase, "kibana/").concat(DOC_LINK_VERSION);
  var putWatchApiUrl = "".concat(esBase, "/watcher-api-put-watch.html");
  var executeWatchApiUrl = "".concat(esBase, "/watcher-api-execute-watch.html#watcher-api-execute-watch-action-mode");
  var watcherGettingStartedUrl = "".concat(kibanaBase, "/watcher-ui.html");
  var watchActionsConfigurationMap = (_watchActionsConfigur = {}, _defineProperty(_watchActionsConfigur, _constants.ACTION_TYPES.SLACK, "".concat(esBase, "/actions-slack.html#configuring-slack")), _defineProperty(_watchActionsConfigur, _constants.ACTION_TYPES.PAGERDUTY, "".concat(esBase, "/actions-pagerduty.html#configuring-pagerduty")), _defineProperty(_watchActionsConfigur, _constants.ACTION_TYPES.JIRA, "".concat(esBase, "/actions-jira.html#configuring-jira")), _watchActionsConfigur);
  return {
    putWatchApiUrl: putWatchApiUrl,
    executeWatchApiUrl: executeWatchApiUrl,
    watcherGettingStartedUrl: watcherGettingStartedUrl,
    watchActionsConfigurationMap: watchActionsConfigurationMap
  };
};

var AppContextProvider = function AppContextProvider(_ref2) {
  var children = _ref2.children,
      value = _ref2.value;

  var docLinks = value.docLinks,
      rest = _objectWithoutProperties(value, ["docLinks"]);

  return _react.default.createElement(AppContext.Provider, {
    value: Object.freeze(_objectSpread({}, rest, {
      links: generateDocLinks(docLinks)
    }))
  }, children);
};

exports.AppContextProvider = AppContextProvider;

var useAppContext = function useAppContext() {
  var ctx = (0, _react.useContext)(AppContext);

  if (!ctx) {
    throw new Error('"useAppContext" can only be called inside of AppContext.Provider!');
  }

  return ctx;
};

exports.useAppContext = useAppContext;