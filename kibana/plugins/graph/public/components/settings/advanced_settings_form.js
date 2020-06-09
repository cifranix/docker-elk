"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedSettingsForm = AdvancedSettingsForm;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function AdvancedSettingsForm(_ref) {
  var advancedSettings = _ref.advancedSettings,
      updateSettings = _ref.updateSettings,
      allFields = _ref.allFields;

  function updateSetting(key, value) {
    updateSettings(_objectSpread({}, advancedSettings, _defineProperty({}, key, value)));
  }

  function getNumberUpdater(key) {
    return function (_ref2) {
      var valueAsNumber = _ref2.target.valueAsNumber;
      updateSetting(key, Number.isNaN(valueAsNumber) ? 1 : valueAsNumber);
    };
  }

  return _react.default.createElement("form", null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    helpText: _i18n.i18n.translate('xpack.graph.settings.advancedSettings.sampleSizeInputHelpText', {
      defaultMessage: 'Terms are identified from samples of the most relevant documents. Bigger samples are not necessarily better—they can be slower and less relevant.'
    }),
    label: _i18n.i18n.translate('xpack.graph.settings.advancedSettings.sampleSizeInputLabel', {
      defaultMessage: 'Sample size'
    })
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    fullWidth: true,
    min: 1,
    step: 1,
    value: advancedSettings.sampleSize,
    onChange: getNumberUpdater('sampleSize')
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    helpText: _i18n.i18n.translate('xpack.graph.settings.advancedSettings.significantLinksCheckboxHelpText', {
      defaultMessage: 'Identify terms that are significant rather than popular.'
    }),
    label: ""
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: _i18n.i18n.translate('xpack.graph.settings.advancedSettings.significantLinksCheckboxLabel', {
      defaultMessage: 'Significant links'
    }),
    id: "graphSignificance",
    checked: advancedSettings.useSignificance,
    onChange: function onChange(_ref3) {
      var checked = _ref3.target.checked;
      return updateSetting('useSignificance', checked);
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    helpText: _i18n.i18n.translate('xpack.graph.settings.advancedSettings.certaintyInputHelpText', {
      defaultMessage: 'The minimum number of documents before introducing a related term.'
    }),
    label: _i18n.i18n.translate('xpack.graph.settings.advancedSettings.certaintyInputLabel', {
      defaultMessage: 'Certainty'
    })
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    fullWidth: true,
    min: 1,
    step: 1,
    value: advancedSettings.minDocCount,
    onChange: getNumberUpdater('minDocCount')
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    helpText: _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.graph.settings.advancedSettings.diversityFieldInputHelpText1', {
      defaultMessage: 'To avoid dominating samples with a single voice, select a field to help identify the source of bias.'
    }), ' ', _react.default.createElement("em", null, _i18n.i18n.translate('xpack.graph.settings.advancedSettings.diversityFieldInputHelpText2', {
      defaultMessage: 'This must be a single-term field, or searches will be rejected.'
    }))),
    label: _i18n.i18n.translate('xpack.graph.settings.advancedSettings.diversityFieldInputLabel', {
      defaultMessage: 'Diversity field'
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    fullWidth: true,
    placeholder: _i18n.i18n.translate('xpack.graph.settings.advancedSettings.diversityFieldInputOptionLabel', {
      defaultMessage: 'No diversification'
    }),
    singleSelection: {
      asPlainText: true
    },
    options: allFields.map(function (field) {
      return {
        label: field.name,
        value: field
      };
    }),
    selectedOptions: advancedSettings.sampleDiversityField ? [{
      label: advancedSettings.sampleDiversityField.name,
      value: advancedSettings.sampleDiversityField
    }] : [],
    onChange: function onChange(choices) {
      updateSetting('sampleDiversityField', choices.length === 1 ? choices[0].value : undefined);
    }
  })), advancedSettings.sampleDiversityField && _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    helpText: _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.graph.settings.advancedSettings.maxValuesInputHelpText', {
      defaultMessage: 'Max number of documents in a sample that can contain the same value for the'
    }), ' ', _react.default.createElement("em", null, advancedSettings.sampleDiversityField.name), ' ', _i18n.i18n.translate('xpack.graph.settings.advancedSettings.maxValuesInputHelpText.fieldText', {
      defaultMessage: 'field'
    })),
    label: _i18n.i18n.translate('xpack.graph.settings.advancedSettings.maxValuesInputLabel', {
      defaultMessage: 'Max docs per field'
    })
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    fullWidth: true,
    min: 1,
    step: 1,
    value: advancedSettings.maxValuesPerDoc,
    onChange: getNumberUpdater('maxValuesPerDoc')
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    helpText: _i18n.i18n.translate('xpack.graph.settings.advancedSettings.timeoutInputHelpText', {
      defaultMessage: 'The maximum number of milliseconds that a request can run.'
    }),
    label: _i18n.i18n.translate('xpack.graph.settings.advancedSettings.timeoutInputLabel', {
      defaultMessage: 'Timeout'
    })
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    fullWidth: true,
    min: 1,
    step: 1,
    value: advancedSettings.timeoutMillis,
    onChange: getNumberUpdater('timeoutMillis'),
    append: _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _react.default.createElement("strong", null, _i18n.i18n.translate('xpack.graph.settings.advancedSettings.timeoutUnit', {
      defaultMessage: 'ms'
    })))
  })));
}