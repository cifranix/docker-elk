"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditField = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _documentation = require("../../../../../../services/documentation");

var _shared_imports = require("../../../../shared_imports");

var _constants = require("../../../../constants");

var _code_block = require("../../../code_block");

var _field_types = require("../field_types");

var _update_field_provider = require("./update_field_provider");

var _edit_field_header_form = require("./edit_field_header_form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var limitStringLength = function limitStringLength(text) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 18;

  if (text.length <= limit) {
    return text;
  }

  return "...".concat(text.substr(limit * -1));
};

var EditField = _react.default.memo(function (_ref) {
  var form = _ref.form,
      field = _ref.field,
      allFields = _ref.allFields,
      exitEdit = _ref.exitEdit;

  var getSubmitForm = function getSubmitForm(updateField) {
    return (
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(e) {
          var _ref3, isValid, data;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (e) {
                    e.preventDefault();
                  }

                  _context.next = 3;
                  return form.submit();

                case 3:
                  _ref3 = _context.sent;
                  isValid = _ref3.isValid;
                  data = _ref3.data;

                  if (isValid) {
                    updateField(_objectSpread({}, field, {
                      source: data
                    }));
                  }

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }()
    );
  };

  var cancel = function cancel() {
    exitEdit();
  };

  var isMultiField = field.isMultiField;
  return _react.default.createElement(_update_field_provider.UpdateFieldProvider, null, function (updateField) {
    return _react.default.createElement(_shared_imports.Form, {
      form: form,
      onSubmit: getSubmitForm(updateField)
    }, _react.default.createElement(_shared_imports.FormDataProvider, {
      pathsToWatch: ['type', 'subType']
    }, function (_ref4) {
      var type = _ref4.type,
          subType = _ref4.subType;
      var typeDefinition = _constants.TYPE_DEFINITION[type];
      var subTypeDefinition = _constants.TYPE_DEFINITION[subType];
      var ParametersForm = (0, _field_types.getParametersFormForType)(type, subType);

      if (typeDefinition === undefined) {
        return null;
      }

      var linkDocumentation = _documentation.documentationService.getTypeDocLink(subType) || _documentation.documentationService.getTypeDocLink(type);

      return _react.default.createElement(_eui.EuiFlyout, {
        "data-test-subj": "mappingsEditorFieldEdit",
        onClose: exitEdit,
        "aria-labelledby": "mappingsEditorFieldEditTitle",
        size: "m",
        className: "mappingsEditor__editField",
        maxWidth: 720
      }, _react.default.createElement(_eui.EuiFlyoutHeader, null, _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "xs"
      }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiTitle, {
        size: "m"
      }, _react.default.createElement("h2", null, isMultiField ? _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.editMultiFieldTitle', {
        defaultMessage: "Edit multi-field '{fieldName}'",
        values: {
          fieldName: limitStringLength(field.source.name)
        }
      }) : _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.editFieldTitle', {
        defaultMessage: "Edit field '{fieldName}'",
        values: {
          fieldName: limitStringLength(field.source.name)
        }
      }))))), linkDocumentation && _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        size: "s",
        flush: "right",
        href: linkDocumentation,
        target: "_blank",
        iconType: "help"
      }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.editField.typeDocumentation', {
        defaultMessage: '{type} documentation',
        values: {
          type: subTypeDefinition ? subTypeDefinition.label : typeDefinition.label
        }
      })))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_code_block.CodeBlock, {
        padding: "small"
      }, field.path.join(' > '))))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_edit_field_header_form.EditFieldHeaderForm, {
        type: type,
        defaultValue: field.source,
        isRootLevelField: field.parentId === undefined,
        isMultiField: isMultiField
      }), ParametersForm && _react.default.createElement(ParametersForm // As the component "ParametersForm" does not change when switching type, and all the props
      // also remain the same (===), adding a key give us *a new instance* each time we change the type or subType.
      // This will trigger an unmount of all the previous form fields and then mount the new ones.
      , {
        key: subType !== null && subType !== void 0 ? subType : type,
        field: field,
        allFields: allFields,
        isMultiField: isMultiField
      })), _react.default.createElement(_eui.EuiFlyoutFooter, null, form.isSubmitted && !form.isValid && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
        title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.editFieldFlyout.validationErrorTitle', {
          defaultMessage: 'Fix errors in form before continuing.'
        }),
        color: "danger",
        iconType: "cross",
        "data-test-subj": "formError"
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      })), _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "flexEnd"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: cancel
      }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.editFieldCancelButtonLabel', {
        defaultMessage: 'Cancel'
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        fill: true,
        onClick: getSubmitForm(updateField),
        type: "submit",
        disabled: form.isSubmitted && !form.isValid,
        "data-test-subj": "editFieldUpdateButton"
      }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.editFieldUpdateButtonLabel', {
        defaultMessage: 'Update'
      }))))));
    }));
  });
});

exports.EditField = EditField;