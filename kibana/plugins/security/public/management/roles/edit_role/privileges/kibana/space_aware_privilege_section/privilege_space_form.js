"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivilegeSpaceForm = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _model = require("../../../../../../../common/model");

var _space_selector = require("./space_selector");

var _feature_table = require("../feature_table");

var _constants = require("../constants");

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

var PrivilegeSpaceForm =
/*#__PURE__*/
function (_Component) {
  _inherits(PrivilegeSpaceForm, _Component);

  function PrivilegeSpaceForm(props) {
    var _this;

    _classCallCheck(this, PrivilegeSpaceForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PrivilegeSpaceForm).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getForm", function () {
      var spaces = _this.props.spaces;
      var hasSelectedSpaces = _this.state.selectedSpaceIds.length > 0;
      return _react2.default.createElement(_eui.EuiForm, null, _react2.default.createElement(_eui.EuiFormRow, {
        fullWidth: true,
        label: _i18n.i18n.translate('xpack.security.management.editRole.spacePrivilegeForm.spaceSelectorFormLabel', {
          defaultMessage: 'Spaces'
        })
      }, _react2.default.createElement(_space_selector.SpaceSelector, {
        selectedSpaceIds: _this.state.selectedSpaceIds,
        onChange: _this.onSelectedSpacesChange,
        spaces: spaces
      })), _this.getPrivilegeCallout(), _react2.default.createElement(_eui.EuiFormRow, {
        fullWidth: true,
        label: _i18n.i18n.translate('xpack.security.management.editRole.spacePrivilegeForm.privilegeSelectorFormLabel', {
          defaultMessage: 'Privilege'
        })
      }, _react2.default.createElement(_eui.EuiSuperSelect, {
        "data-test-subj": 'basePrivilegeComboBox',
        fullWidth: true,
        onChange: _this.onSpaceBasePrivilegeChange,
        options: [{
          value: 'basePrivilege_custom',
          inputDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.spacePrivilegeForm.customPrivilegeDisplay",
            defaultMessage: "Custom"
          })),
          dropdownDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("strong", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.spacePrivilegeForm.customPrivilegeDropdownDisplay",
            defaultMessage: "Custom"
          })), _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.spacePrivilegeForm.customPrivilegeDetails",
            defaultMessage: "Customize access by feature in selected spaces."
          })))
        }, {
          value: 'basePrivilege_read',
          inputDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.spacePrivilegeForm.readPrivilegeDisplay",
            defaultMessage: "Read"
          })),
          dropdownDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("strong", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.spacePrivilegeForm.readPrivilegeDropdownDisplay",
            defaultMessage: "Read"
          })), _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.spacePrivilegeForm.readPrivilegeDetails",
            defaultMessage: "Grant read-only access to all features in selected spaces."
          })))
        }, {
          value: 'basePrivilege_all',
          inputDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.spacePrivilegeForm.allPrivilegeDisplay",
            defaultMessage: "All"
          })),
          dropdownDisplay: _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("strong", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.spacePrivilegeForm.allPrivilegeDropdownDisplay",
            defaultMessage: "All"
          })), _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.spacePrivilegeForm.allPrivilegeDetails",
            defaultMessage: "Grant full access to all features in selected spaces."
          })))
        }],
        hasDividers: true,
        valueOfSelected: _this.getDisplayedBasePrivilege(),
        disabled: !hasSelectedSpaces
      })), _react2.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react2.default.createElement(_eui.EuiTitle, {
        size: "xxs"
      }, _react2.default.createElement("h3", null, _this.getFeatureListLabel(_this.state.selectedBasePrivilege.length > 0))), _react2.default.createElement(_eui.EuiSpacer, {
        size: "xs"
      }), _react2.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react2.default.createElement("p", null, _this.getFeatureListDescription(_this.state.selectedBasePrivilege.length > 0))), _react2.default.createElement(_eui.EuiSpacer, {
        size: "l"
      }), _react2.default.createElement(_feature_table.FeatureTable, {
        role: _this.state.role,
        privilegeCalculator: _this.state.privilegeCalculator,
        onChange: _this.onFeaturePrivilegesChange,
        onChangeAll: _this.onChangeAllFeaturePrivileges,
        kibanaPrivileges: _this.props.kibanaPrivileges,
        privilegeIndex: _this.state.privilegeIndex,
        canCustomizeSubFeaturePrivileges: _this.props.canCustomizeSubFeaturePrivileges,
        disabled: _this.state.selectedBasePrivilege.length > 0 || !hasSelectedSpaces
      }), _this.requiresGlobalPrivilegeWarning() && _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, {
        size: "l"
      }), _react2.default.createElement(_eui.EuiCallOut, {
        color: "warning",
        iconType: "alert",
        "data-test-subj": "globalPrivilegeWarning",
        title: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.spacePrivilegeForm.globalPrivilegeWarning",
          defaultMessage: "Creating a global privilege might impact your other space privileges."
        })
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "getSaveButton", function () {
      var mode = _this.state.mode;

      var isGlobal = _this.isDefiningGlobalPrivilege();

      var buttonText;

      switch (mode) {
        case 'create':
          if (isGlobal) {
            buttonText = _react2.default.createElement(_react.FormattedMessage, {
              id: "xpack.security.management.editRolespacePrivilegeForm.createGlobalPrivilegeButton",
              defaultMessage: "Create global privilege"
            });
          } else {
            buttonText = _react2.default.createElement(_react.FormattedMessage, {
              id: "xpack.security.management.editRolespacePrivilegeForm.createPrivilegeButton",
              defaultMessage: "Create space privilege"
            });
          }

          break;

        case 'update':
          if (isGlobal) {
            buttonText = _react2.default.createElement(_react.FormattedMessage, {
              id: "xpack.security.management.editRolespacePrivilegeForm.updateGlobalPrivilegeButton",
              defaultMessage: "Update global privilege"
            });
          } else {
            buttonText = _react2.default.createElement(_react.FormattedMessage, {
              id: "xpack.security.management.editRolespacePrivilegeForm.updatePrivilegeButton",
              defaultMessage: "Update space privilege"
            });
          }

          break;

        default:
          throw new Error("Unsupported mode: ".concat(mode));
      }

      var buttonColor = 'primary';

      if (_this.requiresGlobalPrivilegeWarning()) {
        buttonColor = 'warning';
      }

      return _react2.default.createElement(_eui.EuiButton, {
        onClick: _this.onSaveClick,
        fill: true,
        disabled: !_this.canSave(),
        color: buttonColor,
        "data-test-subj": 'createSpacePrivilegeButton'
      }, buttonText);
    });

    _defineProperty(_assertThisInitialized(_this), "getFeatureListLabel", function (disabled) {
      if (disabled) {
        return _i18n.i18n.translate('xpack.security.management.editRole.spacePrivilegeForm.summaryOfFeaturePrivileges', {
          defaultMessage: 'Summary of feature privileges'
        });
      } else {
        return _i18n.i18n.translate('xpack.security.management.editRole.spacePrivilegeForm.customizeFeaturePrivileges', {
          defaultMessage: 'Customize by feature'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getFeatureListDescription", function (disabled) {
      if (disabled) {
        return _i18n.i18n.translate('xpack.security.management.editRole.spacePrivilegeForm.featurePrivilegeSummaryDescription', {
          defaultMessage: 'Some features might be hidden by the space or affected by a global space privilege.'
        });
      } else {
        return _i18n.i18n.translate('xpack.security.management.editRole.spacePrivilegeForm.customizeFeaturePrivilegeDescription', {
          defaultMessage: 'Increase privilege levels on a per feature basis. Some features might be hidden by the space or affected by a global space privilege.'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getPrivilegeCallout", function () {
      if (_this.isDefiningGlobalPrivilege()) {
        return _react2.default.createElement(_eui.EuiFormRow, {
          fullWidth: true
        }, _react2.default.createElement(_eui.EuiCallOut, {
          color: "primary",
          iconType: "iInCircle",
          title: _i18n.i18n.translate('xpack.security.management.editRole.spacePrivilegeForm.globalPrivilegeNotice', {
            defaultMessage: 'These privileges will apply to all current and future spaces.'
          })
        }));
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "closeFlyout", function () {
      _this.props.onCancel();
    });

    _defineProperty(_assertThisInitialized(_this), "onSaveClick", function () {
      var role = (0, _model.copyRole)(_this.state.role);
      var form = role.kibana[_this.state.privilegeIndex]; // remove any spaces that no longer exist

      if (!_this.isDefiningGlobalPrivilege()) {
        form.spaces = form.spaces.filter(function (spaceId) {
          return _this.props.spaces.find(function (space) {
            return space.id === spaceId;
          });
        });
      }

      _this.props.onChange(role);
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectedSpacesChange", function (selectedSpaceIds) {
      var role = (0, _model.copyRole)(_this.state.role);
      var form = role.kibana[_this.state.privilegeIndex];
      form.spaces = _toConsumableArray(selectedSpaceIds);

      _this.setState({
        selectedSpaceIds: selectedSpaceIds,
        role: role,
        privilegeCalculator: new _privilege_form_calculator.PrivilegeFormCalculator(_this.props.kibanaPrivileges, role)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSpaceBasePrivilegeChange", function (basePrivilege) {
      var role = (0, _model.copyRole)(_this.state.role);
      var form = role.kibana[_this.state.privilegeIndex];
      var privilegeName = basePrivilege.split('basePrivilege_')[1];
      var isCustomizingFeaturePrivileges = false;

      if (privilegeName === _constants.CUSTOM_PRIVILEGE_VALUE) {
        form.base = [];
        isCustomizingFeaturePrivileges = true;
      } else {
        form.base = [privilegeName];
        form.feature = {};
      }

      _this.setState({
        selectedBasePrivilege: privilegeName === _constants.CUSTOM_PRIVILEGE_VALUE ? [] : [privilegeName],
        role: role,
        isCustomizingFeaturePrivileges: isCustomizingFeaturePrivileges,
        privilegeCalculator: new _privilege_form_calculator.PrivilegeFormCalculator(_this.props.kibanaPrivileges, role)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getDisplayedBasePrivilege", function () {
      var basePrivilege = _this.state.privilegeCalculator.getBasePrivilege(_this.state.privilegeIndex);

      if (basePrivilege) {
        return "basePrivilege_".concat(basePrivilege.id);
      }

      return "basePrivilege_".concat(_constants.CUSTOM_PRIVILEGE_VALUE);
    });

    _defineProperty(_assertThisInitialized(_this), "onFeaturePrivilegesChange", function (featureId, privileges) {
      var role = (0, _model.copyRole)(_this.state.role);
      var form = role.kibana[_this.state.privilegeIndex];

      if (privileges.length === 0) {
        delete form.feature[featureId];
      } else {
        form.feature[featureId] = _toConsumableArray(privileges);
      }

      _this.setState({
        role: role,
        privilegeCalculator: new _privilege_form_calculator.PrivilegeFormCalculator(_this.props.kibanaPrivileges, role)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeAllFeaturePrivileges", function (privileges) {
      var role = (0, _model.copyRole)(_this.state.role);
      var entry = role.kibana[_this.state.privilegeIndex];

      if (privileges.length === 0) {
        entry.feature = {};
      } else {
        _this.props.kibanaPrivileges.getSecuredFeatures().forEach(function (feature) {
          var nextFeaturePrivilege = feature.getPrimaryFeaturePrivileges().find(function (pfp) {
            return privileges.includes(pfp.id);
          });

          if (nextFeaturePrivilege) {
            entry.feature[feature.id] = [nextFeaturePrivilege.id];
          }
        });
      }

      _this.setState({
        role: role,
        privilegeCalculator: new _privilege_form_calculator.PrivilegeFormCalculator(_this.props.kibanaPrivileges, role)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "canSave", function () {
      if (_this.state.selectedSpaceIds.length === 0) {
        return false;
      }

      var form = _this.state.role.kibana[_this.state.privilegeIndex];

      if (form.base.length === 0 && Object.keys(form.feature).length === 0) {
        return false;
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "isDefiningGlobalPrivilege", function () {
      return _this.state.selectedSpaceIds.includes('*');
    });

    _defineProperty(_assertThisInitialized(_this), "requiresGlobalPrivilegeWarning", function () {
      var hasOtherSpacePrivilegesDefined = _this.props.role.kibana.length > 0;
      return _this.state.mode === 'create' && _this.isDefiningGlobalPrivilege() && hasOtherSpacePrivilegesDefined;
    });

    var _role = (0, _model.copyRole)(props.role);

    var privilegeIndex = props.privilegeIndex;

    if (privilegeIndex < 0) {
      // create new form
      privilegeIndex = _role.kibana.push({
        spaces: [],
        base: [],
        feature: {}
      }) - 1;
    }

    _this.state = {
      role: _role,
      privilegeIndex: privilegeIndex,
      selectedSpaceIds: _toConsumableArray(_role.kibana[privilegeIndex].spaces),
      selectedBasePrivilege: _toConsumableArray(_role.kibana[privilegeIndex].base || []),
      mode: props.privilegeIndex < 0 ? 'create' : 'update',
      isCustomizingFeaturePrivileges: false,
      privilegeCalculator: new _privilege_form_calculator.PrivilegeFormCalculator(props.kibanaPrivileges, _role)
    };
    return _this;
  }

  _createClass(PrivilegeSpaceForm, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_eui.EuiOverlayMask, null, _react2.default.createElement(_eui.EuiFlyout, {
        onClose: this.closeFlyout,
        size: "m",
        maxWidth: true
      }, _react2.default.createElement(_eui.EuiFlyoutHeader, {
        hasBorder: true
      }, _react2.default.createElement(_eui.EuiTitle, {
        size: "m"
      }, _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.spacePrivilegeForm.modalTitle",
        defaultMessage: "Space privileges"
      })))), _react2.default.createElement(_eui.EuiFlyoutBody, null, _react2.default.createElement(_eui.EuiErrorBoundary, null, this.getForm())), _react2.default.createElement(_eui.EuiFlyoutFooter, null, this.state.privilegeCalculator.hasSupersededInheritedPrivileges(this.state.privilegeIndex) && _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiCallOut, {
        color: "warning",
        iconType: "alert",
        "data-test-subj": "spaceFormGlobalPermissionsSupersedeWarning",
        title: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.spacePrivilegeForm.supersededWarningTitle",
          defaultMessage: "Superseded by global privileges"
        })
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.spacePrivilegeForm.supersededWarning",
        defaultMessage: "Declared privileges are less permissive than configured global privileges. View the privilege summary to see effective privileges."
      })), _react2.default.createElement(_eui.EuiSpacer, {
        size: "s"
      })), _react2.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButtonEmpty, {
        iconType: "cross",
        onClick: this.closeFlyout,
        flush: "left",
        "data-test-subj": 'cancelSpacePrivilegeButton'
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.spacePrivilegeForm.cancelButton",
        defaultMessage: "Cancel"
      }))), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, this.getSaveButton())))));
    }
  }]);

  return PrivilegeSpaceForm;
}(_react2.Component);

exports.PrivilegeSpaceForm = PrivilegeSpaceForm;

_defineProperty(PrivilegeSpaceForm, "defaultProps", {
  privilegeIndex: -1
});