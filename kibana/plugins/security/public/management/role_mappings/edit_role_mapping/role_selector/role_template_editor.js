"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTemplateEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _role_template_type = require("../services/role_template_type");

var _role_template_type_select = require("./role_template_type_select");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RoleTemplateEditor = function RoleTemplateEditor(_ref) {
  var roleTemplate = _ref.roleTemplate,
      _onChange = _ref.onChange,
      onDelete = _ref.onDelete,
      canUseInlineScripts = _ref.canUseInlineScripts,
      canUseStoredScripts = _ref.canUseStoredScripts;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column",
    gutterSize: "s"
  }, getTemplateConfigurationFields(), getEditorForTemplate(), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "trash",
    color: "danger",
    size: "xs",
    onClick: function onClick() {
      return onDelete(roleTemplate);
    },
    "data-test-subj": "deleteRoleTemplateButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.editRoleMapping.deleteRoleTemplateButton",
    defaultMessage: "Delete template"
  }))))));

  function getTemplateFormatSwitch() {
    var returnsJsonLabel = _i18n.i18n.translate('xpack.security.management.editRoleMapping.roleTemplateReturnsJson', {
      defaultMessage: 'Returns JSON'
    });

    return _react.default.createElement(_eui.EuiFormRow, {
      label: returnsJsonLabel
    }, _react.default.createElement(_eui.EuiSwitch, {
      checked: roleTemplate.format === 'json',
      label: returnsJsonLabel,
      showLabel: false,
      onChange: function onChange(e) {
        _onChange(_objectSpread({}, roleTemplate, {
          format: e.target.checked ? 'json' : 'string'
        }));
      }
    }));
  }

  function getTemplateConfigurationFields() {
    var templateTypeComboBox = _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.roleTemplateType",
        defaultMessage: "Template type"
      })
    }, _react.default.createElement(_role_template_type_select.RoleTemplateTypeSelect, {
      roleTemplate: roleTemplate,
      canUseStoredScripts: canUseStoredScripts,
      canUseInlineScripts: canUseInlineScripts,
      onChange: _onChange
    })));

    var templateFormatSwitch = _react.default.createElement(_eui.EuiFlexItem, null, getTemplateFormatSwitch());

    return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "spaceBetween"
    }, templateTypeComboBox, templateFormatSwitch));
  }

  function getEditorForTemplate() {
    if ((0, _role_template_type.isInlineRoleTemplate)(roleTemplate)) {
      var extraProps = {};

      if (!canUseInlineScripts) {
        extraProps.isInvalid = true;
        extraProps.error = _react.default.createElement(_eui.EuiText, {
          size: "xs",
          color: "danger",
          "data-test-subj": "roleMappingInlineScriptsDisabled"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleTemplateInlineScriptsDisabled",
          defaultMessage: "Template uses inline scripts, which are disabled in Elasticsearch."
        }));
      }

      var example = '{{username}}_role';
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
        grow: 1,
        style: {
          maxWidth: '400px'
        }
      }, _react.default.createElement(_eui.EuiFormRow, _extends({
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleTemplateLabel",
          defaultMessage: "Template"
        }),
        helpText: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleTemplateHelpText",
          defaultMessage: "Mustache templates are allowed. Example: {example}",
          values: {
            example: example
          }
        })
      }, extraProps), _react.default.createElement(_eui.EuiFieldText, {
        "data-test-subj": "roleTemplateSourceEditor",
        value: roleTemplate.template.source,
        onChange: function onChange(e) {
          _onChange(_objectSpread({}, roleTemplate, {
            template: {
              source: e.target.value
            }
          }));
        }
      }))));
    }

    if ((0, _role_template_type.isStoredRoleTemplate)(roleTemplate)) {
      var _extraProps = {};

      if (!canUseStoredScripts) {
        _extraProps.isInvalid = true;
        _extraProps.error = _react.default.createElement(_eui.EuiText, {
          size: "xs",
          color: "danger",
          "data-test-subj": "roleMappingStoredScriptsDisabled"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleTemplateStoredScriptsDisabled",
          defaultMessage: "Template uses stored scripts, which are disabled in Elasticsearch."
        }));
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
        grow: 1,
        style: {
          maxWidth: '400px'
        }
      }, _react.default.createElement(_eui.EuiFormRow, _extends({
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.storedScriptLabel",
          defaultMessage: "Stored script ID"
        }),
        helpText: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.storedScriptHelpText",
          defaultMessage: "ID of a previously stored Painless or Mustache script."
        })
      }, _extraProps), _react.default.createElement(_eui.EuiFieldText, {
        "data-test-subj": "roleTemplateScriptIdEditor",
        value: roleTemplate.template.id,
        onChange: function onChange(e) {
          _onChange(_objectSpread({}, roleTemplate, {
            template: {
              id: e.target.value
            }
          }));
        }
      }))));
    }

    if ((0, _role_template_type.isInvalidRoleTemplate)(roleTemplate)) {
      return _react.default.createElement(_eui.EuiFlexItem, {
        grow: 1,
        "data-test-subj": "roleMappingInvalidRoleTemplate"
      }, _react.default.createElement(_eui.EuiCallOut, {
        color: "warning",
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.invalidRoleTemplateTitle",
          defaultMessage: "Invalid role template"
        })
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.invalidRoleTemplateMessage",
        defaultMessage: "Role template is invalid, and cannot be edited here. Please delete and recreate, or fix via the Role Mapping API."
      })));
    }

    throw new Error("Unable to determine role template type");
  }
};

exports.RoleTemplateEditor = RoleTemplateEditor;