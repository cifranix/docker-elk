"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _documentation = require("../../../../../../services/documentation");

var _shared_imports = require("../../../../shared_imports");

var _constants = require("../../../../constants");

var _mappings_state = require("../../../../mappings_state");

var _lib = require("../../../../lib");

var _field_parameters = require("../../field_parameters");

var _required_parameters_forms = require("./required_parameters_forms");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var formWrapper = function formWrapper(props) {
  return _react.default.createElement("form", props);
};

var CreateField = _react.default.memo(function CreateFieldComponent(_ref) {
  var allFields = _ref.allFields,
      isRootLevelField = _ref.isRootLevelField,
      isMultiField = _ref.isMultiField,
      paddingLeft = _ref.paddingLeft,
      isCancelable = _ref.isCancelable,
      maxNestedDepth = _ref.maxNestedDepth;
  var dispatch = (0, _mappings_state.useDispatch)();

  var _useForm = (0, _shared_imports.useForm)({
    serializer: _lib.fieldSerializer,
    options: {
      stripEmptyFields: false
    }
  }),
      form = _useForm.form;

  (0, _react.useEffect)(function () {
    var subscription = form.subscribe(function (updatedFieldForm) {
      dispatch({
        type: 'fieldForm.update',
        value: updatedFieldForm
      });
    });
    return subscription.unsubscribe;
  }, [form, dispatch]);

  var cancel = function cancel() {
    dispatch({
      type: 'documentField.changeStatus',
      value: 'idle'
    });
  };

  var submitForm =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(e) {
      var exitAfter,
          _ref3,
          isValid,
          data,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              exitAfter = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;

              if (e) {
                e.preventDefault();
              }

              _context.next = 4;
              return form.submit();

            case 4:
              _ref3 = _context.sent;
              isValid = _ref3.isValid;
              data = _ref3.data;

              if (isValid) {
                form.reset();
                dispatch({
                  type: 'field.add',
                  value: data
                });

                if (exitAfter) {
                  cancel();
                }
              }

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function submitForm(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var onClickOutside = function onClickOutside() {
    var name = form.getFields().name.value;

    if (name.trim() === '') {
      if (isCancelable !== false) {
        cancel();
      }
    } else {
      submitForm(undefined, true);
    }
  };
  /**
   * When we change the type, we need to check if there is a subType array to choose from.
   * If there is a subType array, we build the options list for the select (and in case the field is a multi-field
   * we also filter out blacklisted types).
   *
   * @param type The selected field type
   */


  var getSubTypeMeta = (0, _react.useCallback)(function (type) {
    var typeDefinition = _constants.TYPE_DEFINITION[type];
    var hasSubTypes = typeDefinition !== undefined && typeDefinition.subTypes;
    var subTypeOptions = hasSubTypes ? typeDefinition.subTypes.types.map(function (subType) {
      return _constants.TYPE_DEFINITION[subType];
    }).map(function (subType) {
      return {
        value: subType.value,
        label: subType.label
      };
    }) : undefined;

    if (hasSubTypes) {
      if (isMultiField) {
        // If it is a multi-field, we need to filter out non-allowed types
        subTypeOptions = (0, _lib.filterTypesForMultiField)(subTypeOptions);
      } else if (isRootLevelField === false) {
        subTypeOptions = (0, _lib.filterTypesForNonRootFields)(subTypeOptions);
      }
    }

    return {
      subTypeOptions: subTypeOptions,
      subTypeLabel: hasSubTypes ? typeDefinition.subTypes.label : undefined
    };
  }, [isMultiField, isRootLevelField]);
  var onTypeChange = (0, _react.useCallback)(function (nextType) {
    form.setFieldValue('type', nextType);

    if (nextType.length) {
      var _getSubTypeMeta = getSubTypeMeta(nextType[0].value),
          subTypeOptions = _getSubTypeMeta.subTypeOptions;

      form.setFieldValue('subType', subTypeOptions ? [subTypeOptions[0]] : undefined);
    }
  }, [form, getSubTypeMeta]);
  var renderFormFields = (0, _react.useCallback)(function (_ref4) {
    var type = _ref4.type;
    var isOtherType = type === 'other';

    var _getSubTypeMeta2 = getSubTypeMeta(type),
        subTypeOptions = _getSubTypeMeta2.subTypeOptions,
        subTypeLabel = _getSubTypeMeta2.subTypeLabel;

    var docLink = _documentation.documentationService.getTypeDocLink(type);

    return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_field_parameters.NameParameter, null)), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_field_parameters.TypeParameter, {
      isRootLevelField: isRootLevelField,
      isMultiField: isMultiField,
      onTypeChange: onTypeChange,
      docLink: docLink
    })), isOtherType && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_field_parameters.OtherTypeNameParameter, null)), subTypeOptions && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_shared_imports.UseField, {
      path: "subType",
      config: _objectSpread({}, (0, _lib.getFieldConfig)('type'), {
        label: subTypeLabel,
        defaultValue: subTypeOptions[0].value
      })
    }, function (subTypeField) {
      var error = subTypeField.getErrorsMessages();
      var isInvalid = error ? Boolean(error.length) : false;
      return _react.default.createElement(_eui.EuiFormRow, {
        label: subTypeField.label,
        error: error,
        isInvalid: isInvalid
      }, _react.default.createElement(_eui.EuiComboBox, {
        placeholder: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.createField.typePlaceholderLabel', {
          defaultMessage: 'Select a type'
        }),
        singleSelection: {
          asPlainText: true
        },
        options: subTypeOptions,
        selectedOptions: subTypeField.value,
        onChange: function onChange(newSubType) {
          return subTypeField.setValue(newSubType);
        },
        isClearable: false
      }));
    }))));
  }, [getSubTypeMeta, isMultiField, isRootLevelField, onTypeChange]);

  var renderFormActions = function renderFormActions() {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s",
      justifyContent: "flexEnd"
    }, isCancelable !== false && _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      onClick: cancel,
      "data-test-subj": "cancelButton"
    }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.createField.cancelButtonLabel', {
      defaultMessage: 'Cancel'
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButton, {
      color: "primary",
      fill: true,
      onClick: submitForm,
      type: "submit",
      "data-test-subj": "addButton"
    }, isMultiField ? _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.createField.addMultiFieldButtonLabel', {
      defaultMessage: 'Add multi-field'
    }) : _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.createField.addFieldButtonLabel', {
      defaultMessage: 'Add field'
    }))));
  };

  var renderParametersForm = (0, _react.useCallback)(function (_ref5) {
    var type = _ref5.type,
        subType = _ref5.subType;
    var ParametersForm = (0, _required_parameters_forms.getParametersFormForType)(type, subType);
    return ParametersForm ? _react.default.createElement("div", {
      className: "mappingsEditor__createFieldRequiredProps"
    }, _react.default.createElement(ParametersForm, {
      allFields: allFields
    })) : null;
  }, [allFields]);
  return _react.default.createElement(_eui.EuiOutsideClickDetector, {
    onOutsideClick: onClickOutside
  }, _react.default.createElement(_shared_imports.Form, {
    form: form,
    FormWrapper: formWrapper,
    onSubmit: submitForm,
    "data-test-subj": "createFieldForm"
  }, _react.default.createElement("div", {
    className: (0, _classnames.default)('mappingsEditor__createFieldWrapper', {
      'mappingsEditor__createFieldWrapper--toggle': Boolean(maxNestedDepth) && maxNestedDepth > 0,
      'mappingsEditor__createFieldWrapper--multiField': isMultiField
    }),
    style: {
      paddingLeft: "".concat(isMultiField ? paddingLeft - _constants.EUI_SIZE * 1.5 // As there are no "L" bullet list we need to substract some indent
      : paddingLeft, "px")
    }
  }, _react.default.createElement("div", {
    className: "mappingsEditor__createFieldContent"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    alignItems: "center"
  }, _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: "type"
  }, renderFormFields), _react.default.createElement(_eui.EuiFlexItem, null, renderFormActions())), _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: ['type', 'subType']
  }, renderParametersForm)))));
});

exports.CreateField = CreateField;