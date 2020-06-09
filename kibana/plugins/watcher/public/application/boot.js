"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boot = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _app = require("./app");

var _api = require("./lib/api");

var _x_only = require("./7_x_only");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var boot = function boot(bootDeps) {
  var I18nContext = bootDeps.I18nContext,
      element = bootDeps.element,
      savedObjects = bootDeps.savedObjects,
      appDeps = _objectWithoutProperties(bootDeps, ["I18nContext", "element", "savedObjects"]);

  (0, _x_only.setDefaultEmailTo)(bootDeps.uiSettings.get('xPack:defaultAdminEmail'));
  (0, _api.setHttpClient)(appDeps.http);
  (0, _api.setSavedObjectsClient)(savedObjects);
  (0, _reactDom.render)(_react.default.createElement(I18nContext, null, _react.default.createElement(_app.App, appDeps)), element);
  return function () {
    (0, _reactDom.unmountComponentAtNode)(element);
  };
};

exports.boot = boot;