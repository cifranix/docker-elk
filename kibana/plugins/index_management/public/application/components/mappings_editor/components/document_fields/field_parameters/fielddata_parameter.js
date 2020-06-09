"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldDataParameter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _shared_imports = require("../../../shared_imports");

var _lib = require("../../../lib");

var _edit_field = require("../fields/edit_field");

var _documentation = require("../../../../../services/documentation");

var _fielddata_frequency_filter_percentage = require("./fielddata_frequency_filter_percentage");

var _fielddata_frequency_filter_absolute = require("./fielddata_frequency_filter_absolute");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FieldDataParameter = function FieldDataParameter(_ref) {
  var field = _ref.field,
      defaultToggleValue = _ref.defaultToggleValue;

  var _useState = (0, _react.useState)(field.source.fielddata_frequency_filter !== undefined ? field.source.fielddata_frequency_filter.max > 1 ? 'absolute' : 'percentage' : 'percentage'),
      _useState2 = _slicedToArray(_useState, 2),
      valueType = _useState2[0],
      setValueType = _useState2[1];

  var getConfig = function getConfig(fieldProp) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : valueType;
    return type === 'percentage' ? (0, _lib.getFieldConfig)('fielddata_frequency_filter_percentage', fieldProp) : (0, _lib.getFieldConfig)('fielddata_frequency_filter_absolute', fieldProp);
  };

  var switchType = function switchType(min, max) {
    return function () {
      var _ref2, _nextMinConfig$deseri, _ref3, _nextMaxConfig$deseri;

      var nextValueType = valueType === 'percentage' ? 'absolute' : 'percentage';
      var nextMinConfig = getConfig('min', nextValueType);
      var nextMaxConfig = getConfig('max', nextValueType);
      min.setValue((_ref2 = (_nextMinConfig$deseri = nextMinConfig.deserializer) === null || _nextMinConfig$deseri === void 0 ? void 0 : _nextMinConfig$deseri.call(nextMinConfig, nextMinConfig.defaultValue)) !== null && _ref2 !== void 0 ? _ref2 : nextMinConfig.defaultValue);
      max.setValue((_ref3 = (_nextMaxConfig$deseri = nextMaxConfig.deserializer) === null || _nextMaxConfig$deseri === void 0 ? void 0 : _nextMaxConfig$deseri.call(nextMaxConfig, nextMaxConfig.defaultValue)) !== null && _ref3 !== void 0 ? _ref3 : nextMaxConfig.defaultValue);
      setValueType(nextValueType);
    };
  };

  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.fielddata.fielddataFormRowTitle', {
      defaultMessage: 'Fielddata'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.fielddata.fielddataFormRowDescription', {
      defaultMessage: 'Whether to use in-memory fielddata for sorting, aggregations, or scripting.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.fielddata.fieldDataDocLinkText', {
        defaultMessage: 'Fielddata documentation'
      }),
      href: _documentation.documentationService.getFielddataLink()
    },
    formFieldPath: "fielddata",
    defaultToggleValue: defaultToggleValue
  }, _react.default.createElement(_shared_imports.UseMultiFields, {
    fields: {
      min: {
        path: 'fielddata_frequency_filter.min',
        config: getConfig('min')
      },
      max: {
        path: 'fielddata_frequency_filter.max',
        config: getConfig('max')
      }
    }
  }, function (_ref4) {
    var min = _ref4.min,
        max = _ref4.max;
    var FielddataFrequencyComponent = valueType === 'percentage' ? _fielddata_frequency_filter_percentage.FielddataFrequencyFilterPercentage : _fielddata_frequency_filter_absolute.FielddataFrequencyFilterAbsolute;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      color: "warning",
      iconType: "alert",
      size: "s",
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.fielddata.fielddataEnabledWarningTitle",
        defaultMessage: "Fielddata can consume significant memory. This is particularly likely when loading high-cardinality text fields. {docsLink}",
        values: {
          docsLink: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationService.getEnablingFielddataLink(),
            target: "_blank"
          }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.fielddata.fielddataEnabledDocumentationLink', {
            defaultMessage: 'Learn more.'
          }))
        }
      })
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiTitle, {
      size: "xxs"
    }, _react.default.createElement("h4", null, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.fielddata.fielddataDocumentFrequencyRangeTitle', {
      defaultMessage: 'Document frequency range'
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiText, {
      size: "s",
      color: "subdued"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.fielddata.fielddataFrequencyMessage",
      defaultMessage: "This range determines the terms loaded into memory. Frequency is calculated per segment. Exclude small segments based on their size, in number of documents. {docsLink}",
      values: {
        docsLink: _react.default.createElement(_eui.EuiLink, {
          href: _documentation.documentationService.getFielddataFrequencyLink(),
          target: "_blank"
        }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.fielddata.fielddataFrequencyDocumentationLink', {
          defaultMessage: 'Learn more.'
        }))
      }
    })), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(FielddataFrequencyComponent, {
      min: min,
      max: max
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_shared_imports.UseField, {
      path: "fielddata_frequency_filter.min_segment_size",
      config: (0, _lib.getFieldConfig)('fielddata_frequency_filter', 'min_segment_size'),
      component: _shared_imports.Field
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiSwitch, {
      compressed: true,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.fielddata.useAbsoluteValuesFieldLabel', {
        defaultMessage: 'Use absolute values'
      }),
      checked: valueType === 'absolute',
      onChange: switchType(min, max),
      "data-test-subj": "input"
    }));
  }));
};

exports.FieldDataParameter = FieldDataParameter;