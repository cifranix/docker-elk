"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyzerParameterSelects = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _shared_imports = require("../../../shared_imports");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var areOptionsSuperSelect = function areOptionsSuperSelect(options) {
  if (!options || !Boolean(options.length)) {
    return false;
  } // `Select` options have a "text" property, `SuperSelect` options don't have it.


  return {}.hasOwnProperty.call(options[0], 'text') === false;
};

var AnalyzerParameterSelects = function AnalyzerParameterSelects(_ref) {
  var onChange = _ref.onChange,
      mainDefaultValue = _ref.mainDefaultValue,
      subDefaultValue = _ref.subDefaultValue,
      config = _ref.config,
      options = _ref.options,
      mapOptionsToSubOptions = _ref.mapOptionsToSubOptions;

  var _useForm = (0, _shared_imports.useForm)({
    defaultValue: {
      main: mainDefaultValue,
      sub: subDefaultValue
    }
  }),
      form = _useForm.form;

  (0, _react.useEffect)(function () {
    var subscription = form.subscribe(function (updateData) {
      var formData = updateData.data.raw;
      var value = formData.sub ? formData.sub : formData.main;
      onChange(value);
    });
    return subscription.unsubscribe;
  }, [form, onChange]);
  var getSubOptionsMeta = (0, _react.useCallback)(function (mainValue) {
    return mapOptionsToSubOptions !== undefined ? mapOptionsToSubOptions[mainValue] : undefined;
  }, [mapOptionsToSubOptions]);
  var onMainValueChange = (0, _react.useCallback)(function (mainValue) {
    var subOptionsMeta = getSubOptionsMeta(mainValue);
    form.setFieldValue('sub', subOptionsMeta ? subOptionsMeta.options[0].value : undefined);
  }, [form, getSubOptionsMeta]);

  var renderSelect = function renderSelect(field, opts) {
    var isSuperSelect = areOptionsSuperSelect(opts);
    return isSuperSelect ? _react.default.createElement(_shared_imports.SuperSelectField, {
      field: field,
      euiFieldProps: {
        options: opts
      }
    }) : _react.default.createElement(_shared_imports.SelectField, {
      field: field,
      euiFieldProps: {
        options: opts,
        hasNoInitialSelection: false
      }
    });
  };

  return _react.default.createElement(_shared_imports.Form, {
    form: form
  }, _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: "main"
  }, function (_ref2) {
    var main = _ref2.main;
    var subOptions = getSubOptionsMeta(main);
    return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_shared_imports.UseField, {
      path: "main",
      config: config,
      onChange: onMainValueChange
    }, function (field) {
      return renderSelect(field, options);
    })), subOptions && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_shared_imports.UseField, {
      path: "sub",
      defaultValue: subOptions.options[0].value,
      config: _objectSpread({}, config, {
        label: subOptions.label
      })
    }, function (field) {
      return renderSelect(field, subOptions.options);
    })));
  }));
};

exports.AnalyzerParameterSelects = AnalyzerParameterSelects;