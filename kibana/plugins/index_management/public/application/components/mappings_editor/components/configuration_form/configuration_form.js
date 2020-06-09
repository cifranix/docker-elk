"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigurationForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _shared_imports = require("../../shared_imports");

var _mappings_state = require("../../mappings_state");

var _dynamic_mapping_section = require("./dynamic_mapping_section");

var _source_field_section = require("./source_field_section");

var _meta_field_section = require("./meta_field_section");

var _routing_section = require("./routing_section");

var _configuration_form_schema = require("./configuration_form_schema");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var stringifyJson = function stringifyJson(json) {
  return Object.keys(json).length ? JSON.stringify(json, null, 2) : '{\n\n}';
};

var formSerializer = function formSerializer(formData) {
  var _formData$dynamicMapp = formData.dynamicMapping,
      dynamicMappingsEnabled = _formData$dynamicMapp.enabled,
      throwErrorsForUnmappedFields = _formData$dynamicMapp.throwErrorsForUnmappedFields,
      numeric_detection = _formData$dynamicMapp.numeric_detection,
      date_detection = _formData$dynamicMapp.date_detection,
      dynamic_date_formats = _formData$dynamicMapp.dynamic_date_formats,
      sourceField = formData.sourceField,
      metaField = formData.metaField,
      _routing = formData._routing;
  var dynamic = dynamicMappingsEnabled ? true : throwErrorsForUnmappedFields ? 'strict' : false;
  var parsedMeta;

  try {
    parsedMeta = JSON.parse(metaField);
  } catch (_unused) {
    parsedMeta = {};
  }

  return {
    dynamic: dynamic,
    numeric_detection: numeric_detection,
    date_detection: date_detection,
    dynamic_date_formats: dynamic_date_formats,
    _source: _objectSpread({}, sourceField),
    _meta: parsedMeta,
    _routing: _routing
  };
};

var formDeserializer = function formDeserializer(formData) {
  var dynamic = formData.dynamic,
      numeric_detection = formData.numeric_detection,
      date_detection = formData.date_detection,
      dynamic_date_formats = formData.dynamic_date_formats,
      _formData$_source = formData._source,
      enabled = _formData$_source.enabled,
      includes = _formData$_source.includes,
      excludes = _formData$_source.excludes,
      _meta = formData._meta,
      _routing = formData._routing;
  return {
    dynamicMapping: {
      enabled: dynamic === true || dynamic === undefined,
      throwErrorsForUnmappedFields: dynamic === 'strict',
      numeric_detection: numeric_detection,
      date_detection: date_detection,
      dynamic_date_formats: dynamic_date_formats
    },
    sourceField: {
      enabled: enabled === true || enabled === undefined,
      includes: includes,
      excludes: excludes
    },
    metaField: stringifyJson(_meta),
    _routing: _routing
  };
};

var ConfigurationForm = _react.default.memo(function (_ref) {
  var defaultValue = _ref.defaultValue;
  var didMountRef = (0, _react.useRef)(false);

  var _useForm = (0, _shared_imports.useForm)({
    schema: _configuration_form_schema.configurationFormSchema,
    serializer: formSerializer,
    deserializer: formDeserializer,
    defaultValue: defaultValue
  }),
      form = _useForm.form;

  var dispatch = (0, _mappings_state.useDispatch)();
  (0, _react.useEffect)(function () {
    var subscription = form.subscribe(function (_ref2) {
      var data = _ref2.data,
          isValid = _ref2.isValid,
          validate = _ref2.validate;
      dispatch({
        type: 'configuration.update',
        value: {
          data: data,
          isValid: isValid,
          validate: validate,
          submitForm: form.submit
        }
      });
    });
    return subscription.unsubscribe;
  }, [form, dispatch]);
  (0, _react.useEffect)(function () {
    if (didMountRef.current) {
      // If the defaultValue has changed (it probably means that we have loaded a new JSON)
      // we need to reset the form to update the fields values.
      form.reset({
        resetValues: true
      });
    } else {
      // Avoid reseting the form on component mount.
      didMountRef.current = true;
    }
  }, [defaultValue]); // eslint-disable-line react-hooks/exhaustive-deps

  (0, _react.useEffect)(function () {
    return function () {
      // On unmount => save in the state a snapshot of the current form data.
      dispatch({
        type: 'configuration.save'
      });
    };
  }, [dispatch]);
  return _react.default.createElement(_shared_imports.Form, {
    form: form,
    isInvalid: form.isSubmitted && !form.isValid,
    error: form.getErrors(),
    "data-test-subj": "advancedConfiguration"
  }, _react.default.createElement(_dynamic_mapping_section.DynamicMappingSection, null), _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }), _react.default.createElement(_meta_field_section.MetaFieldSection, null), _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }), _react.default.createElement(_source_field_section.SourceFieldSection, null), _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }), _react.default.createElement(_routing_section.RoutingSection, null));
});

exports.ConfigurationForm = ConfigurationForm;