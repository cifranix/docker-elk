"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextType = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _documentation = require("../../../../../../services/documentation");

var _shared_imports = require("../../../../shared_imports");

var _lib = require("../../../../lib");

var _field_parameters = require("../../field_parameters");

var _edit_field = require("../edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getDefaultToggleValue = function getDefaultToggleValue(param, field) {
  switch (param) {
    case 'boost':
    case 'position_increment_gap':
    case 'similarity':
    case 'term_vector':
      {
        return field[param] !== undefined && field[param] !== (0, _lib.getFieldConfig)(param).defaultValue;
      }

    case 'analyzers':
      {
        return field.search_analyzer !== undefined && field.search_analyzer !== field.analyzer;
      }

    case 'copy_to':
      {
        return field.null_value !== undefined && field.null_value !== '';
      }

    case 'indexPrefixes':
      {
        if (field.index_prefixes === undefined) {
          return false;
        }

        var minCharsValue = field.index_prefixes.min_chars;
        var defaultMinCharsValue = (0, _lib.getFieldConfig)('index_prefixes', 'min_chars').defaultValue;
        var maxCharsValue = field.index_prefixes.max_chars;
        var defaultMaxCharsValue = (0, _lib.getFieldConfig)('index_prefixes', 'min_chars').defaultValue;
        return minCharsValue !== defaultMinCharsValue || maxCharsValue !== defaultMaxCharsValue;
      }

    case 'fielddata':
      {
        return field.fielddata === true ? true : field.fielddata_frequency_filter !== undefined;
      }

    default:
      return false;
  }
};

var TextType = _react.default.memo(function (_ref) {
  var field = _ref.field;

  var onIndexPrefixesChanage = function onIndexPrefixesChanage(minField, maxField) {
    return function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          min = _ref3[0],
          max = _ref3[1];

      minField.setValue(min);
      maxField.setValue(max);
    };
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_field_parameters.IndexParameter, null)), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_field_parameters.AnalyzersParameter, {
    field: field,
    withSearchQuoteAnalyzer: true
  }), _react.default.createElement(_field_parameters.EagerGlobalOrdinalsParameter, null), _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.indexPhrasesFieldTitle', {
      defaultMessage: 'Index phrases'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.indexPhrasesFieldDescription', {
      defaultMessage: 'Whether to index two-term word combinations into a separate field. Activating this will speed up phrase queries, but could slow down indexing.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.indexPhrasesDocLinkText', {
        defaultMessage: 'Index phrases documentation'
      }),
      href: _documentation.documentationService.getIndexPhrasesLink()
    },
    formFieldPath: "index_phrases"
  }), _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.indexPrefixesFieldTitle', {
      defaultMessage: 'Set index prefixes'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.indexPrefixesFieldDescription', {
      defaultMessage: 'Whether to index prefixes of 2 and 5 characters into a separate field. Activating this will speed up prefix queries, but could slow down indexing.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.indexPrefixesDocLinkText', {
        defaultMessage: 'Index prefixes documentation'
      }),
      href: _documentation.documentationService.getIndexPrefixesLink()
    },
    defaultToggleValue: getDefaultToggleValue('indexPrefixes', field.source)
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.indexPrefixesRangeFieldLabel', {
      defaultMessage: 'Min/max prefix length'
    }),
    fullWidth: true
  }, _react.default.createElement(_shared_imports.UseMultiFields, {
    fields: {
      min: {
        path: 'index_prefixes.min_chars',
        config: (0, _lib.getFieldConfig)('index_prefixes', 'min_chars')
      },
      max: {
        path: 'index_prefixes.max_chars',
        config: (0, _lib.getFieldConfig)('index_prefixes', 'max_chars')
      }
    }
  }, function (_ref4) {
    var min = _ref4.min,
        max = _ref4.max;
    return _react.default.createElement(_eui.EuiDualRange, {
      min: 0,
      max: 20,
      value: [min.value, max.value],
      onChange: onIndexPrefixesChanage(min, max),
      showInput: true,
      fullWidth: true
    });
  }))), _react.default.createElement(_field_parameters.NormsParameter, null), _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.positionIncrementGapFieldTitle', {
      defaultMessage: 'Set position increment gap'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.positionIncrementGapFieldDescription', {
      defaultMessage: 'The number of fake term positions which should be inserted between each element of an array of strings.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.positionIncrementGapDocLinkText', {
        defaultMessage: 'Position increment gap documentation'
      }),
      href: _documentation.documentationService.getPositionIncrementGapLink()
    },
    defaultToggleValue: getDefaultToggleValue('position_increment_gap', field.source)
  }, _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: "index_options"
  }, function (formData) {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_shared_imports.UseField, {
      path: "position_increment_gap",
      config: (0, _lib.getFieldConfig)('position_increment_gap'),
      component: _shared_imports.RangeField,
      componentProps: {
        euiFieldProps: {
          min: 0,
          max: 200,
          showInput: true,
          fullWidth: true
        }
      }
    }), formData.index_options !== 'positions' && formData.index_options !== 'offsets' && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.positionsErrorTitle', {
        defaultMessage: 'Positions not enabled.'
      }),
      color: "danger",
      iconType: "alert"
    }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.positionsErrorMessage', {
      defaultMessage: 'You need to set the index options (under the "Searchable" toggle) to "Positions" or "Offsets" in order to be able to change the position increment gap.'
    })))));
  })), _react.default.createElement(_field_parameters.SimilarityParameter, {
    defaultToggleValue: getDefaultToggleValue('similarity', field.source)
  }), _react.default.createElement(_field_parameters.TermVectorParameter, {
    field: field,
    defaultToggleValue: getDefaultToggleValue('term_vector', field.source)
  }), _react.default.createElement(_field_parameters.FieldDataParameter, {
    field: field,
    defaultToggleValue: getDefaultToggleValue('fielddata', field.source)
  }), _react.default.createElement(_field_parameters.CopyToParameter, {
    defaultToggleValue: getDefaultToggleValue('copy_to', field.source)
  }), _react.default.createElement(_field_parameters.StoreParameter, null), _react.default.createElement(_field_parameters.BoostParameter, {
    defaultToggleValue: getDefaultToggleValue('boost', field.source)
  })));
});

exports.TextType = TextType;