"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useJsonStep = void 0;

var _react = require("react");

var _i18n = require("@kbn/i18n");

var _shared_imports = require("../../../../shared_imports");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var stringifyJson = function stringifyJson(json) {
  return Object.keys(json).length ? JSON.stringify(json, null, 2) : '{\n\n}';
};

var useJsonStep = function useJsonStep(_ref) {
  var prop = _ref.prop,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? {} : _ref$defaultValue,
      setDataGetter = _ref.setDataGetter,
      onStepValidityChange = _ref.onStepValidityChange;

  var _useState = (0, _react.useState)(stringifyJson(defaultValue)),
      _useState2 = _slicedToArray(_useState, 2),
      content = _useState2[0],
      setContent = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var validateContent = (0, _react.useCallback)(function () {
    // We allow empty string as it will be converted to "{}""
    var isValid = content.trim() === '' ? true : (0, _shared_imports.isJSON)(content);

    if (!isValid) {
      setError(_i18n.i18n.translate('xpack.idxMgmt.validators.string.invalidJSONError', {
        defaultMessage: 'Invalid JSON format.'
      }));
    } else {
      setError(null);
    }

    return isValid;
  }, [content]);
  var dataGetter = (0, _react.useCallback)(function () {
    var isValid = validateContent();
    var value = isValid && content.trim() !== '' ? JSON.parse(content) : {};

    var data = _defineProperty({}, prop, value);

    return Promise.resolve({
      isValid: isValid,
      data: data
    });
  }, [content, validateContent, prop]);
  (0, _react.useEffect)(function () {
    var isValid = validateContent();
    onStepValidityChange(isValid);
    setDataGetter(dataGetter);
  }, [content, dataGetter, onStepValidityChange, setDataGetter, validateContent]);
  return {
    content: content,
    setContent: setContent,
    error: error
  };
};

exports.useJsonStep = useJsonStep;