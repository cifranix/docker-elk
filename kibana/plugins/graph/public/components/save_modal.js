"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaveModal = SaveModal;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../src/plugins/saved_objects/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function SaveModal(_ref) {
  var _onSave = _ref.onSave,
      onClose = _ref.onClose,
      title = _ref.title,
      description = _ref.description,
      showCopyOnSave = _ref.showCopyOnSave,
      savePolicy = _ref.savePolicy,
      hasData = _ref.hasData;

  var _useState = (0, _react.useState)(description),
      _useState2 = _slicedToArray(_useState, 2),
      newDescription = _useState2[0],
      setDescription = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      dataConsent = _useState4[0],
      setDataConsent = _useState4[1];

  return _react.default.createElement(_public.SavedObjectSaveModal, {
    onSave: function onSave(props) {
      _onSave(_objectSpread({}, props, {
        newDescription: newDescription,
        dataConsent: dataConsent
      }));
    },
    onClose: onClose,
    title: title,
    showCopyOnSave: showCopyOnSave,
    objectType: _i18n.i18n.translate('xpack.graph.topNavMenu.save.objectType', {
      defaultMessage: 'graph'
    }),
    showDescription: false,
    options: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: _i18n.i18n.translate('xpack.graph.topNavMenu.save.descriptionInputLabel', {
        defaultMessage: 'Description'
      })
    }, _react.default.createElement(_eui.EuiTextArea, {
      "data-test-subj": "dashboardDescription",
      value: newDescription,
      onChange: function onChange(e) {
        setDescription(e.target.value);
      },
      fullWidth: true,
      rows: 5
    })), savePolicy === 'configAndDataWithConsent' && hasData && _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "",
      helpText: _i18n.i18n.translate('xpack.graph.topNavMenu.save.saveConfigurationOnlyWarning', {
        defaultMessage: 'Without this setting, the data in this workspace will be cleared and only the configuration will be saved.'
      })
    }, _react.default.createElement(_eui.EuiSwitch, {
      id: "graphDataConsent",
      label: _i18n.i18n.translate('xpack.graph.topNavMenu.save.saveGraphContentCheckboxLabel', {
        defaultMessage: 'Save graph content'
      }),
      checked: dataConsent,
      onChange: function onChange(e) {
        setDataConsent(e.target.checked);
      }
    })), savePolicy === 'config' && hasData && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCallOut, {
      "data-test-subj": "graphNoDataSavedMsg"
    }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.graph.topNavMenu.save.saveConfigurationOnlyText', {
      defaultMessage: 'The data in this workspace will be cleared and only the configuration will be saved.'
    }))), _react.default.createElement(_eui.EuiSpacer, null)))
  });
}