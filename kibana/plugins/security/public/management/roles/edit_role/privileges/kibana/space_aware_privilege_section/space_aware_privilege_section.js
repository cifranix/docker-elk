"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceAwarePrivilegeSection = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _lodash = _interopRequireDefault(require("lodash"));

var _react2 = _interopRequireWildcard(require("react"));

var _model = require("../../../../../../../common/model");

var _privilege_space_table = require("./privilege_space_table");

var _privilege_space_form = require("./privilege_space_form");

var _privilege_form_calculator = require("../privilege_form_calculator");

var _privilege_summary = require("../privilege_summary");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var SpaceAwarePrivilegeSection =
/*#__PURE__*/
function (_Component) {
  _inherits(SpaceAwarePrivilegeSection, _Component);

  function SpaceAwarePrivilegeSection(props) {
    var _this;

    _classCallCheck(this, SpaceAwarePrivilegeSection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpaceAwarePrivilegeSection).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "globalSpaceEntry", {
      id: '*',
      name: _i18n.i18n.translate('xpack.security.management.editRole.spaceAwarePrivilegeForm.globalSpacesName', {
        defaultMessage: '* Global (all spaces)'
      }),
      color: '#D3DAE6',
      initials: '*',
      disabledFeatures: []
    });

    _defineProperty(_assertThisInitialized(_this), "renderKibanaPrivileges", function () {
      var role = _this.props.role;
      var spacePrivileges = role.kibana;
      var hasAnyPrivileges = spacePrivileges.length > 0;

      if (hasAnyPrivileges) {
        var table = _react2.default.createElement(_privilege_space_table.PrivilegeSpaceTable, {
          role: _this.props.role,
          displaySpaces: _this.getDisplaySpaces(),
          privilegeCalculator: new _privilege_form_calculator.PrivilegeFormCalculator(_this.props.kibanaPrivileges, _this.props.role),
          onChange: _this.props.onChange,
          onEdit: _this.onEditSpacesPrivileges,
          disabled: !_this.props.editable
        });

        return _react2.default.createElement("div", null, table, _react2.default.createElement(_eui.EuiSpacer, null), _this.getAvailablePrivilegeButtons(true));
      }

      return _react2.default.createElement(_eui.EuiEmptyPrompt, {
        iconType: "lock",
        title: _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.spacePrivilegeSection.noAccessToKibanaTitle",
          defaultMessage: "This role does not grant access to Kibana"
        })),
        titleSize: 's',
        actions: _this.getAvailablePrivilegeButtons(false)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getAvailablePrivilegeButtons", function (hasPrivilegesAssigned) {
      var hasAvailableSpaces = _this.getAvailableSpaces().length > 0; // This shouldn't happen organically...

      if (!hasAvailableSpaces && !hasPrivilegesAssigned) {
        return null;
      }

      var addPrivilegeButton = _react2.default.createElement(_eui.EuiButton, {
        color: "primary",
        onClick: _this.addSpacePrivilege,
        iconType: 'plusInCircleFilled',
        "data-test-subj": 'addSpacePrivilegeButton',
        isDisabled: !hasAvailableSpaces || !_this.props.editable
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.spacePrivilegeSection.addSpacePrivilegeButton",
        defaultMessage: "Add space privilege"
      }));

      if (!hasPrivilegesAssigned) {
        return addPrivilegeButton;
      }

      var viewMatrixButton = _react2.default.createElement(_privilege_summary.PrivilegeSummary, {
        role: _this.props.role,
        spaces: _this.getDisplaySpaces(),
        kibanaPrivileges: _this.props.kibanaPrivileges,
        canCustomizeSubFeaturePrivileges: _this.props.canCustomizeSubFeaturePrivileges
      });

      return _react2.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, addPrivilegeButton), hasPrivilegesAssigned && !(0, _model.isRoleReserved)(_this.props.role) && _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, viewMatrixButton));
    });

    _defineProperty(_assertThisInitialized(_this), "getDisplaySpaces", function () {
      return [_this.globalSpaceEntry].concat(_toConsumableArray(_this.props.spaces));
    });

    _defineProperty(_assertThisInitialized(_this), "getAvailableSpaces", function () {
      var includeSpacesFromPrivilegeIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

      var spacesToExclude = _lodash.default.uniq(_lodash.default.flatten(_this.props.role.kibana.map(function (entry, index) {
        if (includeSpacesFromPrivilegeIndex === index) {
          return [];
        }

        return entry.spaces;
      })));

      return _this.getDisplaySpaces().filter(function (displaySpace) {
        return !spacesToExclude.includes(displaySpace.id);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addSpacePrivilege", function () {
      _this.setState({
        showSpacePrivilegeEditor: true,
        privilegeIndex: -1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSpacesPrivilegeChange", function (role) {
      _this.setState({
        showSpacePrivilegeEditor: false,
        privilegeIndex: -1
      });

      _this.props.onChange(role);
    });

    _defineProperty(_assertThisInitialized(_this), "onEditSpacesPrivileges", function (privilegeIndex) {
      _this.setState({
        privilegeIndex: privilegeIndex,
        showSpacePrivilegeEditor: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelEditPrivileges", function () {
      _this.setState({
        showSpacePrivilegeEditor: false
      });
    });

    _this.state = {
      showSpacePrivilegeEditor: false,
      showPrivilegeMatrix: false,
      role: null,
      privilegeIndex: -1
    };
    return _this;
  }

  _createClass(SpaceAwarePrivilegeSection, [{
    key: "render",
    value: function render() {
      var uiCapabilities = this.props.uiCapabilities;

      if (!uiCapabilities.spaces.manage) {
        return _react2.default.createElement(_eui.EuiCallOut, {
          title: _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.management.editRole.spaceAwarePrivilegeForm.insufficientPrivilegesDescription",
            defaultMessage: "Insufficient Privileges"
          })),
          iconType: "alert",
          color: "danger",
          "data-test-subj": "userCannotManageSpacesCallout"
        }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.spaceAwarePrivilegeForm.howToViewAllAvailableSpacesDescription",
          defaultMessage: "You are not authorized to view all available spaces."
        })), _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.spaceAwarePrivilegeForm.ensureAccountHasAllPrivilegesGrantedDescription",
          defaultMessage: "Please ensure your account has all privileges granted by the {kibanaAdmin} role, and try again.",
          values: {
            kibanaAdmin: _react2.default.createElement("strong", null, _react2.default.createElement(_react.FormattedMessage, {
              id: "xpack.security.management.editRole.spaceAwarePrivilegeForm.kibanaAdminTitle",
              defaultMessage: "kibana_admin"
            }))
          }
        })));
      }

      return _react2.default.createElement(_eui.EuiErrorBoundary, null, _react2.default.createElement(_react2.Fragment, null, this.renderKibanaPrivileges(), this.state.showSpacePrivilegeEditor && _react2.default.createElement(_privilege_space_form.PrivilegeSpaceForm, {
        role: this.props.role,
        kibanaPrivileges: this.props.kibanaPrivileges,
        onChange: this.onSpacesPrivilegeChange,
        onCancel: this.onCancelEditPrivileges,
        spaces: this.getAvailableSpaces(this.state.privilegeIndex),
        privilegeIndex: this.state.privilegeIndex,
        canCustomizeSubFeaturePrivileges: this.props.canCustomizeSubFeaturePrivileges
      })));
    }
  }]);

  return SpaceAwarePrivilegeSection;
}(_react2.Component);

exports.SpaceAwarePrivilegeSection = SpaceAwarePrivilegeSection;