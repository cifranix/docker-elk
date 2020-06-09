"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormatParameter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _edit_field = require("../fields/edit_field");

var _shared_imports = require("../../../shared_imports");

var _constants = require("../../../constants");

var _lib = require("../../../lib");

var _documentation = require("../../../../../services/documentation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FormatParameter = function FormatParameter(_ref) {
  var defaultValue = _ref.defaultValue,
      defaultToggleValue = _ref.defaultToggleValue;
  var defaultValueArray = defaultValue !== undefined ? defaultValue.split('||').map(function (value) {
    return {
      label: value
    };
  }) : [];
  var defaultValuesInOptions = defaultValueArray.filter(function (defaultFormat) {
    return _constants.ALL_DATE_FORMAT_OPTIONS.includes(defaultFormat);
  });

  var _useState = (0, _react.useState)([].concat(_toConsumableArray(_constants.ALL_DATE_FORMAT_OPTIONS), _toConsumableArray(defaultValuesInOptions))),
      _useState2 = _slicedToArray(_useState, 2),
      comboBoxOptions = _useState2[0],
      setComboBoxOptions = _useState2[1];

  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formatParameter.fieldTitle', {
      defaultMessage: 'Set format'
    }),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.formatParameter.fieldDescription",
      defaultMessage: "The date formats to parse. Most builit-ins use {strict} date formats, where YYYY is the year, MM is the month, and DD is the day. Example: 2020/11/01.",
      values: {
        strict: _react.default.createElement(_eui.EuiCode, null, "strict")
      }
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formatDocLinkText', {
        defaultMessage: 'Format documentation'
      }),
      href: _documentation.documentationService.getFormatLink()
    },
    defaultToggleValue: defaultToggleValue
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "format",
    config: (0, _lib.getFieldConfig)('format')
  }, function (formatField) {
    return _react.default.createElement(_eui.EuiFormRow, {
      label: formatField.label,
      helpText: formatField.helpText,
      fullWidth: true
    }, _react.default.createElement(_eui.EuiComboBox, {
      placeholder: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formatParameter.placeholderLabel', {
        defaultMessage: 'Select a format'
      }),
      options: comboBoxOptions,
      selectedOptions: formatField.value,
      onChange: function onChange(value) {
        formatField.setValue(value);
      },
      onCreateOption: function onCreateOption(searchValue) {
        var newOption = {
          label: searchValue
        };
        formatField.setValue([].concat(_toConsumableArray(formatField.value), [newOption]));
        setComboBoxOptions([].concat(_toConsumableArray(comboBoxOptions), [newOption]));
      },
      fullWidth: true
    }));
  }));
};

exports.FormatParameter = FormatParameter;