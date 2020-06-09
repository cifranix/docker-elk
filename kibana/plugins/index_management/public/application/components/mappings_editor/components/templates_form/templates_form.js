"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplatesForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _shared_imports = require("../../shared_imports");

var _mappings_state = require("../../mappings_state");

var _templates_form_schema = require("./templates_form_schema");

var _documentation = require("../../../../services/documentation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var stringifyJson = function stringifyJson(json) {
  return Array.isArray(json) ? JSON.stringify(json, null, 2) : '[\n\n]';
};

var formSerializer = function formSerializer(formData) {
  var dynamicTemplates = formData.dynamicTemplates;
  var parsedTemplates;

  try {
    parsedTemplates = JSON.parse(dynamicTemplates);

    if (!Array.isArray(parsedTemplates)) {
      // User provided an object, but we need an array of objects
      parsedTemplates = [parsedTemplates];
    }
  } catch (_unused) {
    parsedTemplates = [];
  }

  return {
    dynamic_templates: parsedTemplates
  };
};

var formDeserializer = function formDeserializer(formData) {
  var dynamic_templates = formData.dynamic_templates;
  return {
    dynamicTemplates: stringifyJson(dynamic_templates)
  };
};

var TemplatesForm = _react.default.memo(function (_ref) {
  var _euiCodeEditorProps;

  var defaultValue = _ref.defaultValue;
  var didMountRef = (0, _react.useRef)(false);

  var _useForm = (0, _shared_imports.useForm)({
    schema: _templates_form_schema.templatesFormSchema,
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
        type: 'templates.update',
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
        type: 'templates.save'
      });
    };
  }, [dispatch]);
  return _react.default.createElement("div", {
    "data-test-subj": "dynamicTemplates"
  }, _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.mappingsEditor.dynamicTemplatesDescription",
    defaultMessage: "Use dynamic templates to define custom mappings that can be applied to dynamically added fields. {docsLink}",
    values: {
      docsLink: _react.default.createElement(_eui.EuiLink, {
        href: _documentation.documentationService.getDynamicTemplatesLink(),
        target: "_blank"
      }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dynamicTemplatesDocumentationLink', {
        defaultMessage: 'Learn more.'
      }))
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_shared_imports.Form, {
    form: form,
    isInvalid: form.isSubmitted && !form.isValid,
    error: form.getErrors()
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "dynamicTemplates",
    component: _shared_imports.JsonEditorField,
    componentProps: {
      euiCodeEditorProps: (_euiCodeEditorProps = {}, _defineProperty(_euiCodeEditorProps, 'data-test-subj', 'dynamicTemplatesEditor'), _defineProperty(_euiCodeEditorProps, "height", '600px'), _defineProperty(_euiCodeEditorProps, 'aria-label', _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dynamicTemplatesEditorAriaLabel', {
        defaultMessage: 'Dynamic templates editor'
      })), _euiCodeEditorProps)
    }
  })));
});

exports.TemplatesForm = TemplatesForm;