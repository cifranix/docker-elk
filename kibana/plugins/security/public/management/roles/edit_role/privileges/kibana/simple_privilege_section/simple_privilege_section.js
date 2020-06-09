"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimplePrivilegeSection = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _model = require("../../../../../../../common/model");

var _privilege_utils = require("../../../privilege_utils");

var _constants = require("../constants");

var _feature_table = require("../feature_table");

var _unsupported_space_privileges_warning = require("./unsupported_space_privileges_warning");

var _privilege_form_calculator = require("../privilege_form_calculator");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SimplePrivilegeSection =
/*#__PURE__*/
function (_Component) {
  _inherits(SimplePrivilegeSection, _Component);

  function SimplePrivilegeSection(props) {
    var _this;

    _classCallCheck(this, SimplePrivilegeSection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SimplePrivilegeSection).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getDisplayedBasePrivilege", function () {
      if (_this.state.isCustomizingGlobalPrivilege) {
        return _constants.CUSTOM_PRIVILEGE_VALUE;
      }

      var role = _this.props.role;

      var form = _this.locateGlobalPrivilege(role);

      return form && form.base.length > 0 ? form.base[0] : _constants.NO_PRIVILEGE_VALUE;
    });

    _defineProperty(_assertThisInitialized(_this), "onKibanaPrivilegeChange", function (privilege) {
      var role = (0, _model.copyRole)(_this.props.role);

      var form = _this.locateGlobalPrivilege(role) || _this.createGlobalPrivilegeEntry(role);

      if (privilege === _constants.NO_PRIVILEGE_VALUE) {
        // Remove global entry if no privilege value
        role.kibana = role.kibana.filter(function (entry) {
          return !(0, _privilege_utils.isGlobalPrivilegeDefinition)(entry);
        });
      } else if (privilege === _constants.CUSTOM_PRIVILEGE_VALUE) {
        // Remove base privilege if customizing feature privileges
        form.base = [];
      } else {
        form.base = [privilege];
        form.feature = {};
      }

      _this.props.onChange(role);

      _this.setState({
        isCustomizingGlobalPrivilege: privilege === _constants.CUSTOM_PRIVILEGE_VALUE,
        globalPrivsIndex: role.kibana.indexOf(form)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFeaturePrivilegeChange", function (featureId, privileges) {
      var role = (0, _model.copyRole)(_this.props.role);

      var form = _this.locateGlobalPrivilege(role) || _this.createGlobalPrivilegeEntry(role);

      if (privileges.length > 0) {
        form.feature[featureId] = _toConsumableArray(privileges);
      } else {
        delete form.feature[featureId];
      }

      _this.props.onChange(role);
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeAllFeaturePrivileges", function (privileges) {
      var role = (0, _model.copyRole)(_this.props.role);

      var form = _this.locateGlobalPrivilege(role) || _this.createGlobalPrivilegeEntry(role);

      if (privileges.length > 0) {
        _this.props.kibanaPrivileges.getSecuredFeatures().forEach(function (feature) {
          form.feature[feature.id] = _toConsumableArray(privileges);
        });
      } else {
        form.feature = {};
      }

      _this.props.onChange(role);
    });

    _defineProperty(_assertThisInitialized(_this), "maybeRenderSpacePrivilegeWarning", function () {
      var kibanaPrivileges = _this.props.role.kibana;
      var hasSpacePrivileges = kibanaPrivileges.some(function (privilege) {
        return !(0, _privilege_utils.isGlobalPrivilegeDefinition)(privilege);
      });

      if (hasSpacePrivileges) {
        return _react2.default.createElement(_eui.EuiFormRow, {
          fullWidth: true
        }, _react2.default.createElement(_unsupported_space_privileges_warning.UnsupportedSpacePrivilegesWarning, null));
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "locateGlobalPrivilegeIndex", function (role) {
      return role.kibana.findIndex(function (privileges) {
        return (0, _privilege_utils.isGlobalPrivilegeDefinition)(privileges);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "locateGlobalPrivilege", function (role) {
      var spacePrivileges = role.kibana;
      return spacePrivileges.find(function (privileges) {
        return (0, _privilege_utils.isGlobalPrivilegeDefinition)(privileges);
      });
    });

    var globalPrivs = _this.locateGlobalPrivilege(props.role);

    var globalPrivsIndex = _this.locateGlobalPrivilegeIndex(props.role);

    _this.state = {
      isCustomizingGlobalPrivilege: Boolean(globalPrivs && Object.keys(globalPrivs.feature).length > 0),
      globalPrivsIndex: globalPrivsIndex
    };
    return _this;
  }

  _createClass(SimplePrivilegeSection, [{
    key: "render",
    value: function render() {
      var _ref, _this$props$role$kiba;

      var kibanaPrivilege = this.getDisplayedBasePrivilege();
      var reservedPrivileges = (_ref = (_this$props$role$kiba = this.props.role.kibana[this.state.globalPrivsIndex]) === null || _this$props$role$kiba === void 0 ? void 0 : _this$props$role$kiba._reserved) !== null && _ref !== void 0 ? _ref : [];

      var title = _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.simplePrivilegeForm.kibanaPrivilegesTitle",
        defaultMessage: "Kibana privileges"
      });

      var description = _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.simplePrivilegeForm.specifyPrivilegeForRoleDescription",
        defaultMessage: "Specifies the Kibana privilege for this role."
      }));

      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        direction: "column"
      }, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiText, {
        size: "s",
        color: "subdued"
      }, description)), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, {
        label: title
      }, reservedPrivileges.length > 0 ? _react2.default.createElement(_eui.EuiComboBox, {
        fullWidth: true,
        selectedOptions: reservedPrivileges.map(function (rp) {
          return {
            label: rp
          };
        }),
        isDisabled: true
      }) : _react2.default.createElement(_eui.EuiSuperSelect, {
        disabled: !this.props.editable,
        onChange: this.onKibanaPrivilegeChange,
        options: [{
          value: _constants.NO_PRIVILEGE_VALUE,
          inputDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.simplePrivilegeForm.noPrivilegeInput",
            defaultMessage: "None"
          })),
          dropdownDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("strong", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.simplePrivilegeForm.noPrivilegeDropdown",
            defaultMessage: "None"
          })), _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.simplePrivilegeForm.noPrivilegeDropdownDescription",
            defaultMessage: "No access to Kibana"
          })))
        }, {
          value: _constants.CUSTOM_PRIVILEGE_VALUE,
          inputDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.simplePrivilegeForm.customPrivilegeInput",
            defaultMessage: "Custom"
          })),
          dropdownDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("strong", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.simplePrivilegeForm.customPrivilegeDropdown",
            defaultMessage: "Custom"
          })), _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.simplePrivilegeForm.customPrivilegeDropdownDescription",
            defaultMessage: "Customize access to Kibana"
          })))
        }, {
          value: 'read',
          inputDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.simplePrivilegeForm.readPrivilegeInput",
            defaultMessage: "Read"
          })),
          dropdownDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("strong", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.simplePrivilegeForm.readPrivilegeDropdown",
            defaultMessage: "Read"
          })), _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.simplePrivilegeForm.readPrivilegeDropdownDescription",
            defaultMessage: "Grants read-only access to all of Kibana"
          })))
        }, {
          value: 'all',
          inputDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.simplePrivilegeForm.allPrivilegeInput",
            defaultMessage: "All"
          })),
          dropdownDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("strong", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.simplePrivilegeForm.allPrivilegeDropdown",
            defaultMessage: "All"
          })), _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.simplePrivilegeForm.allPrivilegeDropdownDescription",
            defaultMessage: "Grants full access to all of Kibana"
          })))
        }],
        hasDividers: true,
        valueOfSelected: kibanaPrivilege
      })), this.state.isCustomizingGlobalPrivilege && _react2.default.createElement(_eui.EuiFormRow, {
        fullWidth: true
      }, _react2.default.createElement(_feature_table.FeatureTable, {
        role: this.props.role,
        kibanaPrivileges: this.props.kibanaPrivileges,
        privilegeCalculator: new _privilege_form_calculator.PrivilegeFormCalculator(this.props.kibanaPrivileges, this.props.role),
        onChange: this.onFeaturePrivilegeChange,
        onChangeAll: this.onChangeAllFeaturePrivileges,
        privilegeIndex: this.props.role.kibana.findIndex(function (k) {
          return (0, _privilege_utils.isGlobalPrivilegeDefinition)(k);
        }),
        canCustomizeSubFeaturePrivileges: this.props.canCustomizeSubFeaturePrivileges
      })), this.maybeRenderSpacePrivilegeWarning())));
    }
  }, {
    key: "createGlobalPrivilegeEntry",
    value: function createGlobalPrivilegeEntry(role) {
      var newEntry = {
        spaces: ['*'],
        base: [],
        feature: {}
      };
      role.kibana.push(newEntry);
      return newEntry;
    }
  }]);

  return SimplePrivilegeSection;
}(_react2.Component);

exports.SimplePrivilegeSection = SimplePrivilegeSection;