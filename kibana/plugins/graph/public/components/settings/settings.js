"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsComponent = SettingsComponent;
exports.Settings = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _advanced_settings_form = require("./advanced_settings_form");

var _blacklist_form = require("./blacklist_form");

var _url_template_list = require("./url_template_list");

var _state_management = require("../../state_management");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var tabs = [{
  id: 'advancedSettings',
  title: _i18n.i18n.translate('xpack.graph.settings.advancedSettingsTitle', {
    defaultMessage: 'Advanced settings'
  }),
  component: _advanced_settings_form.AdvancedSettingsForm
}, {
  id: 'blacklist',
  title: _i18n.i18n.translate('xpack.graph.settings.blacklistTitle', {
    defaultMessage: 'Block list'
  }),
  component: _blacklist_form.BlacklistForm
}, {
  id: 'drillDowns',
  title: _i18n.i18n.translate('xpack.graph.settings.drillDownsTitle', {
    defaultMessage: 'Drilldowns'
  }),
  component: _url_template_list.UrlTemplateList
}];
/**
 * These props are wired in the angular scope and are passed in via observable
 * to catch update outside updates
 */

function SettingsComponent(_ref) {
  var observable = _ref.observable,
      props = _objectWithoutProperties(_ref, ["observable"]);

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      angularProps = _useState2[0],
      setAngularProps = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      activeTab = _useState4[0],
      setActiveTab = _useState4[1];

  (0, _react.useEffect)(function () {
    observable.subscribe(setAngularProps);
  }, [observable]);
  if (!angularProps) return null;
  var ActiveTabContent = tabs[activeTab].component;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.graph.settings.title', {
    defaultMessage: 'Settings'
  }))), _react.default.createElement(_eui.EuiTabs, {
    style: {
      margin: '0 -16px -25px'
    }
  }, tabs.filter(function (_ref2) {
    var id = _ref2.id;
    return id !== 'drillDowns' || angularProps.canEditDrillDownUrls;
  }).map(function (_ref3, index) {
    var title = _ref3.title;
    return _react.default.createElement(_eui.EuiTab, {
      key: title,
      isSelected: activeTab === index,
      onClick: function onClick() {
        setActiveTab(index);
      }
    }, title);
  }))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(ActiveTabContent, _extends({}, angularProps, props))));
}

var Settings = (0, _reactRedux.connect)(function (state) {
  return {
    advancedSettings: (0, _state_management.settingsSelector)(state),
    urlTemplates: (0, _state_management.templatesSelector)(state),
    allFields: (0, _state_management.fieldsSelector)(state)
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({
    updateSettings: _state_management.updateSettings,
    saveTemplate: _state_management.saveTemplate,
    removeTemplate: _state_management.removeTemplate
  }, dispatch);
})(SettingsComponent);
exports.Settings = Settings;