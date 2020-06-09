"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyzerParameter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _shared_imports = require("../../../shared_imports");

var _lib = require("../../../lib");

var _constants = require("../../../constants");

var _index_settings_context = require("../../../index_settings_context");

var _analyzer_parameter_selects = require("./analyzer_parameter_selects");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ANALYZER_OPTIONS = _constants.PARAMETERS_OPTIONS.analyzer; // token_count requires a value for "analyzer", therefore, we cannot not allow "index_default"

var ANALYZER_OPTIONS_WITHOUT_DEFAULT = _constants.PARAMETERS_OPTIONS.analyzer.filter(function (_ref) {
  var value = _ref.value;
  return value !== _constants.INDEX_DEFAULT;
});

var getCustomAnalyzers = function getCustomAnalyzers(indexSettings) {
  var settings = {}.hasOwnProperty.call(indexSettings, 'index') ? indexSettings.index : indexSettings;

  if (!{}.hasOwnProperty.call(settings, 'analysis') || !{}.hasOwnProperty.call(settings.analysis, 'analyzer')) {
    return undefined;
  } // We wrap inside a try catch as the index settings are written in JSON
  // and who knows what the user has entered.


  try {
    return Object.keys(settings.analysis.analyzer).map(function (value) {
      return {
        value: value,
        text: value
      };
    });
  } catch (_unused) {
    return undefined;
  }
};

var AnalyzerParameter = function AnalyzerParameter(_ref2) {
  var path = _ref2.path,
      defaultValue = _ref2.defaultValue,
      label = _ref2.label,
      config = _ref2.config,
      _ref2$allowsIndexDefa = _ref2.allowsIndexDefaultOption,
      allowsIndexDefaultOption = _ref2$allowsIndexDefa === void 0 ? true : _ref2$allowsIndexDefa;
  var indexSettings = (0, _index_settings_context.useIndexSettings)();
  var customAnalyzers = getCustomAnalyzers(indexSettings);
  var analyzerOptions = allowsIndexDefaultOption ? ANALYZER_OPTIONS : ANALYZER_OPTIONS_WITHOUT_DEFAULT;

  var fieldOptions = _toConsumableArray(analyzerOptions);

  var mapOptionsToSubOptions = {
    language: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.analyzers.languageAnalyzerLabel', {
        defaultMessage: 'Language'
      }),
      options: _constants.PARAMETERS_OPTIONS.languageAnalyzer
    }
  };

  if (customAnalyzers) {
    var customOption = _objectSpread({
      value: 'custom'
    }, (0, _constants.getSuperSelectOption)(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.customTitle', {
      defaultMessage: 'Custom analyzer'
    }), _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formSelect.analyzer.customDescription', {
      defaultMessage: 'Choose one of your custom analyzers.'
    })));

    fieldOptions.push(customOption);
    mapOptionsToSubOptions.custom = {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.analyzers.customAnalyzerLabel', {
        defaultMessage: 'Custom'
      }),
      options: customAnalyzers
    };
  }

  var isDefaultValueInOptions = defaultValue === undefined || fieldOptions.some(function (option) {
    return option.value === defaultValue;
  });
  var mainValue = defaultValue;
  var subValue;
  var isDefaultValueInSubOptions = false;

  if (!isDefaultValueInOptions && mapOptionsToSubOptions !== undefined) {
    // Check if the default value is one of the subOptions
    for (var _i = 0, _Object$entries = Object.entries(mapOptionsToSubOptions); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          _key = _Object$entries$_i[0],
          subOptions = _Object$entries$_i[1];

      if (subOptions.options.some(function (option) {
        return option.value === defaultValue;
      })) {
        isDefaultValueInSubOptions = true;
        mainValue = _key;
        subValue = defaultValue;
        break;
      }
    }
  }

  var _useState = (0, _react.useState)(!isDefaultValueInOptions && !isDefaultValueInSubOptions),
      _useState2 = _slicedToArray(_useState, 2),
      isCustom = _useState2[0],
      setIsCustom = _useState2[1];

  var fieldConfig = config ? config : (0, _lib.getFieldConfig)('analyzer');
  var fieldConfigWithLabel = label !== undefined ? _objectSpread({}, fieldConfig, {
    label: label
  }) : fieldConfig;

  var toggleCustom = function toggleCustom(field) {
    return function () {
      if (isCustom) {
        field.setValue(fieldOptions[0].value);
      } else {
        field.setValue('');
      }

      field.reset({
        resetValue: false
      });
      setIsCustom(!isCustom);
    };
  };

  return _react.default.createElement(_shared_imports.UseField, {
    path: path,
    config: fieldConfigWithLabel
  }, function (field) {
    return _react.default.createElement("div", {
      className: "mappingsEditor__selectWithCustom"
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      size: "xs",
      onClick: toggleCustom(field),
      className: "mappingsEditor__selectWithCustom__button"
    }, isCustom ? _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.predefinedButtonLabel', {
      defaultMessage: 'Use built-in analyzer'
    }) : _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.customButtonLabel', {
      defaultMessage: 'Use custom analyzer'
    })), isCustom ? // Wrap inside a flex item to maintain the same padding
    // around the field.
    _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_shared_imports.TextField, {
      field: field
    }))) : _react.default.createElement(_analyzer_parameter_selects.AnalyzerParameterSelects, {
      onChange: field.setValue,
      mainDefaultValue: mainValue,
      subDefaultValue: subValue,
      config: fieldConfigWithLabel,
      options: fieldOptions,
      mapOptionsToSubOptions: mapOptionsToSubOptions
    }));
  });
};

exports.AnalyzerParameter = AnalyzerParameter;