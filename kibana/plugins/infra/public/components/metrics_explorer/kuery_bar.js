"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerKueryBar = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _with_kuery_autocompletion = require("../../containers/with_kuery_autocompletion");

var _autocomplete_field = require("../autocomplete_field");

var _public = require("../../../../../../src/plugins/data/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function validateQuery(query) {
  try {
    _public.esKuery.fromKueryExpression(query);
  } catch (err) {
    return false;
  }

  return true;
}

var MetricsExplorerKueryBar = function MetricsExplorerKueryBar(_ref) {
  var derivedIndexPattern = _ref.derivedIndexPattern,
      onSubmit = _ref.onSubmit,
      onChange = _ref.onChange,
      value = _ref.value,
      placeholder = _ref.placeholder;

  var _useState = (0, _react.useState)(value || ''),
      _useState2 = _slicedToArray(_useState, 2),
      draftQuery = _useState2[0],
      setDraftQuery = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isValid = _useState4[0],
      setValidation = _useState4[1]; // This ensures that if value changes out side this component it will update.


  (0, _react.useEffect)(function () {
    if (value) {
      setDraftQuery(value);
    }
  }, [value]);

  var handleChange = function handleChange(query) {
    setValidation(validateQuery(query));
    setDraftQuery(query);

    if (onChange) {
      onChange(query);
    }
  };

  var filteredDerivedIndexPattern = _objectSpread({}, derivedIndexPattern, {
    fields: derivedIndexPattern.fields
  });

  var defaultPlaceholder = _i18n.i18n.translate('xpack.infra.homePage.toolbar.kqlSearchFieldPlaceholder', {
    defaultMessage: 'Search for infrastructure data… (e.g. host.name:host-1)'
  });

  return _react.default.createElement(_with_kuery_autocompletion.WithKueryAutocompletion, {
    indexPattern: filteredDerivedIndexPattern
  }, function (_ref2) {
    var isLoadingSuggestions = _ref2.isLoadingSuggestions,
        loadSuggestions = _ref2.loadSuggestions,
        suggestions = _ref2.suggestions;
    return _react.default.createElement(_autocomplete_field.AutocompleteField, {
      "aria-label": placeholder,
      isLoadingSuggestions: isLoadingSuggestions,
      isValid: isValid,
      loadSuggestions: loadSuggestions,
      onChange: handleChange,
      onSubmit: onSubmit,
      placeholder: placeholder || defaultPlaceholder,
      suggestions: suggestions,
      value: draftQuery
    });
  });
};

exports.MetricsExplorerKueryBar = MetricsExplorerKueryBar;