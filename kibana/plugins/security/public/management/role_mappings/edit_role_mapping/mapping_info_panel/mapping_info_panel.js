"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MappingInfoPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _role_mapping_validation = require("../services/role_mapping_validation");

var _role_selector = require("../role_selector");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MappingInfoPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(MappingInfoPanel, _Component);

  function MappingInfoPanel(props) {
    var _this;

    _classCallCheck(this, MappingInfoPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MappingInfoPanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getRoleMappingName", function () {
      return _react.default.createElement(_eui.EuiDescribedFormGroup, {
        title: _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleMappingNameFormGroupTitle",
          defaultMessage: "Mapping name"
        })),
        description: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleMappingNameFormGroupHelpText",
          defaultMessage: "A unique name used to identify this role mapping."
        }),
        fullWidth: true
      }, _react.default.createElement(_eui.EuiFormRow, _extends({
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleMappingNameFormRowTitle",
          defaultMessage: "Name"
        }),
        fullWidth: true
      }, _this.props.validateForm && (0, _role_mapping_validation.validateRoleMappingName)(_this.props.roleMapping)), _react.default.createElement(_eui.EuiFieldText, {
        name: 'name',
        value: _this.props.roleMapping.name || '',
        onChange: _this.onNameChange,
        "data-test-subj": 'roleMappingFormNameInput',
        readOnly: _this.props.mode === 'edit'
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "getRolesOrRoleTemplatesSelector", function () {
      if (_this.state.rolesMode === 'roles') {
        return _this.getRolesSelector();
      }

      return _this.getRoleTemplatesSelector();
    });

    _defineProperty(_assertThisInitialized(_this), "getRolesSelector", function () {
      var validationFunction = function validationFunction() {
        if (!_this.props.validateForm) {
          return {};
        }

        return (0, _role_mapping_validation.validateRoleMappingRoles)(_this.props.roleMapping);
      };

      return _react.default.createElement(_eui.EuiDescribedFormGroup, {
        title: _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleMappingRolesFormRowTitle",
          defaultMessage: "Roles"
        })),
        description: _react.default.createElement(_eui.EuiText, {
          size: "s",
          color: "subdued"
        }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleMappingRolesFormRowHelpText",
          defaultMessage: "Assign roles to your users."
        })), _react.default.createElement(_eui.EuiSpacer, {
          size: "m"
        }), _react.default.createElement(_eui.EuiLink, {
          "data-test-subj": "switchToRoleTemplatesButton",
          onClick: function onClick() {
            _this.onRolesModeChange('templates');
          }
        }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.switchToRoleTemplates",
          defaultMessage: "Switch to role templates"
        }), ' ', _react.default.createElement(_eui.EuiIcon, {
          size: "s",
          type: "inputOutput"
        })))),
        fullWidth: true
      }, _react.default.createElement(_eui.EuiFormRow, _extends({
        fullWidth: true
      }, validationFunction()), _react.default.createElement(_role_selector.RoleSelector, {
        rolesAPIClient: _this.props.rolesAPIClient,
        roleMapping: _this.props.roleMapping,
        mode: _this.state.rolesMode,
        canUseInlineScripts: _this.props.canUseInlineScripts,
        canUseStoredScripts: _this.props.canUseStoredScripts,
        onChange: function onChange(roleMapping) {
          return _this.props.onChange(roleMapping);
        }
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "getRoleTemplatesSelector", function () {
      var validationFunction = function validationFunction() {
        if (!_this.props.validateForm) {
          return {};
        }

        return (0, _role_mapping_validation.validateRoleMappingRoleTemplates)(_this.props.roleMapping);
      };

      return _react.default.createElement(_eui.EuiDescribedFormGroup, {
        title: _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleMappingRoleTemplatesFormRowTitle",
          defaultMessage: "Role templates"
        })),
        description: _react.default.createElement(_eui.EuiText, {
          size: "s",
          color: "subdued"
        }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleMappingRoleTemplatesFormRowHelpText",
          defaultMessage: "Create templates that describe the roles to assign to your users."
        }), ' ', _react.default.createElement(_eui.EuiLink, {
          href: _this.props.docLinks.getRoleMappingTemplateDocUrl(),
          external: true,
          target: "_blank"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleMappingRoleTemplatesFormRowLearnMore",
          defaultMessage: "Learn about role templates"
        }))), _react.default.createElement(_eui.EuiSpacer, {
          size: "m"
        }), _react.default.createElement(_eui.EuiLink, {
          onClick: function onClick() {
            _this.onRolesModeChange('roles');
          },
          "data-test-subj": "switchToRolesButton"
        }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.switchToRoles",
          defaultMessage: "Switch to roles"
        }), ' ', _react.default.createElement(_eui.EuiIcon, {
          size: "s",
          type: "inputOutput"
        })))),
        fullWidth: true
      }, _react.default.createElement(_eui.EuiFormRow, _extends({
        fullWidth: true
      }, validationFunction()), _react.default.createElement(_role_selector.RoleSelector, {
        rolesAPIClient: _this.props.rolesAPIClient,
        roleMapping: _this.props.roleMapping,
        mode: _this.state.rolesMode,
        canUseInlineScripts: _this.props.canUseInlineScripts,
        canUseStoredScripts: _this.props.canUseStoredScripts,
        onChange: function onChange(roleMapping) {
          return _this.props.onChange(roleMapping);
        }
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "getEnabledSwitch", function () {
      return _react.default.createElement(_eui.EuiDescribedFormGroup, {
        title: _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleMappingEnabledFormRowTitle",
          defaultMessage: "Enable mapping"
        })),
        description: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleMappingEnabledFormRowHelpText",
          defaultMessage: "Map roles to users based on their username, groups, and other metadata. When false, ignore mappings."
        }),
        fullWidth: true
      }, _react.default.createElement(_eui.EuiFormRow, {
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.roleMappingEnabledFormRowLabel",
          defaultMessage: "Enable mapping"
        }),
        fullWidth: true
      }, _react.default.createElement(_eui.EuiSwitch, {
        name: 'enabled',
        label: _i18n.i18n.translate('xpack.security.management.editRoleMapping.roleMappingEnabledLabel', {
          defaultMessage: 'Enable mapping'
        }),
        showLabel: false,
        "data-test-subj": "roleMappingsEnabledSwitch",
        checked: _this.props.roleMapping.enabled,
        onChange: function onChange(e) {
          _this.props.onChange(_objectSpread({}, _this.props.roleMapping, {
            enabled: e.target.checked
          }));
        }
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "onNameChange", function (e) {
      var name = e.target.value;

      _this.props.onChange(_objectSpread({}, _this.props.roleMapping, {
        name: name
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onRolesModeChange", function (rolesMode) {
      var canUseTemplates = _this.props.canUseInlineScripts || _this.props.canUseStoredScripts;

      if (rolesMode === 'templates' && canUseTemplates) {
        // Create blank template as a starting point
        var defaultTemplate = _this.props.canUseInlineScripts ? {
          template: {
            source: ''
          }
        } : {
          template: {
            id: ''
          }
        };

        _this.props.onChange(_objectSpread({}, _this.props.roleMapping, {
          roles: [],
          role_templates: [defaultTemplate]
        }));
      }

      _this.setState({
        rolesMode: rolesMode
      });
    });

    _this.state = {
      rolesMode: props.roleMapping.role_templates && props.roleMapping.role_templates.length > 0 ? 'templates' : 'roles'
    };
    return _this;
  }

  _createClass(MappingInfoPanel, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.roleMappingTitle",
        defaultMessage: "Role mapping"
      }))), _react.default.createElement(_eui.EuiSpacer, null), this.getRoleMappingName(), this.getEnabledSwitch(), this.getRolesOrRoleTemplatesSelector());
    }
  }]);

  return MappingInfoPanel;
}(_react.Component);

exports.MappingInfoPanel = MappingInfoPanel;