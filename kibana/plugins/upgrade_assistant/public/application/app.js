"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RootComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _version = require("../../common/version");

var _tabs = require("./components/tabs");

var _app_context = require("./app_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var RootComponent = function RootComponent(_ref) {
  var i18n = _ref.i18n,
      contexValue = _objectWithoutProperties(_ref, ["i18n"]);

  return _react.default.createElement(i18n.Context, null, _react.default.createElement(_app_context.AppContextProvider, {
    value: contexValue
  }, _react.default.createElement("div", {
    "data-test-subj": "upgradeAssistantRoot"
  }, _react.default.createElement(_eui.EuiPageHeader, null, _react.default.createElement(_eui.EuiPageHeaderSection, null, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.appTitle",
    defaultMessage: "{version} Upgrade Assistant",
    values: {
      version: "".concat(_version.NEXT_MAJOR_VERSION, ".0")
    }
  }))))), _react.default.createElement(_app_context.AppContext.Consumer, null, function (_ref2) {
    var http = _ref2.http;
    return _react.default.createElement(_tabs.UpgradeAssistantTabs, {
      http: http
    });
  }))));
};

exports.RootComponent = RootComponent;