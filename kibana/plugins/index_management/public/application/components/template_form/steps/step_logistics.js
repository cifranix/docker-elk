"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepLogistics = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _shared_imports = require("../../../../shared_imports");

var _documentation = require("../../../services/documentation");

var _template_form_schemas = require("../template_form_schemas");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Create or Form components with partial props that are common to all instances
var UseField = (0, _shared_imports.getUseField)({
  component: _shared_imports.Field
});
var FormRow = (0, _shared_imports.getFormRow)({
  titleTag: 'h3'
});
var fieldsMeta = {
  name: {
    title: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepLogistics.nameTitle', {
      defaultMessage: 'Name'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepLogistics.nameDescription', {
      defaultMessage: 'A unique identifier for this template.'
    }),
    testSubject: 'nameField'
  },
  indexPatterns: {
    title: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepLogistics.indexPatternsTitle', {
      defaultMessage: 'Index patterns'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepLogistics.indexPatternsDescription', {
      defaultMessage: 'The index patterns to apply to the template.'
    }),
    testSubject: 'indexPatternsField'
  },
  order: {
    title: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepLogistics.orderTitle', {
      defaultMessage: 'Merge order'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepLogistics.orderDescription', {
      defaultMessage: 'The merge order when multiple templates match an index.'
    }),
    testSubject: 'orderField'
  },
  version: {
    title: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepLogistics.versionTitle', {
      defaultMessage: 'Version'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepLogistics.versionDescription', {
      defaultMessage: 'A number that identifies the template to external management systems.'
    }),
    testSubject: 'versionField'
  }
};

var StepLogistics = function StepLogistics(_ref) {
  var _ref2;

  var template = _ref.template,
      isEditing = _ref.isEditing,
      setDataGetter = _ref.setDataGetter,
      onStepValidityChange = _ref.onStepValidityChange;

  var _useForm = (0, _shared_imports.useForm)({
    schema: _template_form_schemas.schemas.logistics,
    defaultValue: template,
    options: {
      stripEmptyFields: false
    }
  }),
      form = _useForm.form;

  (0, _react.useEffect)(function () {
    onStepValidityChange(form.isValid);
  }, [form.isValid, onStepValidityChange]);
  (0, _react.useEffect)(function () {
    setDataGetter(form.submit);
  }, [form.submit, setDataGetter]);
  var name = fieldsMeta.name,
      indexPatterns = fieldsMeta.indexPatterns,
      order = fieldsMeta.order,
      version = fieldsMeta.version;
  return _react.default.createElement(_shared_imports.Form, {
    form: form,
    "data-test-subj": "stepLogistics"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepLogistics.stepTitle",
    defaultMessage: "Logistics"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "right",
    href: _documentation.documentationService.getTemplatesDocumentationLink(),
    target: "_blank",
    iconType: "help"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepLogistics.docsButtonLabel",
    defaultMessage: "Index Templates docs"
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(FormRow, {
    title: name.title,
    description: name.description
  }, _react.default.createElement(UseField, {
    path: "name",
    componentProps: (_ref2 = {}, _defineProperty(_ref2, 'data-test-subj', name.testSubject), _defineProperty(_ref2, "euiFieldProps", {
      disabled: isEditing
    }), _ref2),
    config: isEditing ? _template_form_schemas.nameConfigWithoutValidations : _template_form_schemas.nameConfig
  })), _react.default.createElement(FormRow, {
    title: indexPatterns.title,
    description: indexPatterns.description
  }, _react.default.createElement(UseField, {
    path: "indexPatterns",
    componentProps: _defineProperty({}, 'data-test-subj', indexPatterns.testSubject)
  })), _react.default.createElement(FormRow, {
    title: order.title,
    description: order.description
  }, _react.default.createElement(UseField, {
    path: "order",
    componentProps: _defineProperty({}, 'data-test-subj', order.testSubject)
  })), _react.default.createElement(FormRow, {
    title: version.title,
    description: version.description
  }, _react.default.createElement(UseField, {
    path: "version",
    componentProps: _defineProperty({}, 'data-test-subj', version.testSubject)
  })));
};

exports.StepLogistics = StepLogistics;