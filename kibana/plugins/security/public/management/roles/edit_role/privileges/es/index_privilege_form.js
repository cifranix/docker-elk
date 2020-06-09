"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPrivilegeForm = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _lodash = _interopRequireDefault(require("lodash"));

var _react2 = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var fromOption = function fromOption(option) {
  return option.label;
};

var toOption = function toOption(value) {
  return {
    label: value
  };
};

var IndexPrivilegeForm =
/*#__PURE__*/
function (_Component) {
  _inherits(IndexPrivilegeForm, _Component);

  function IndexPrivilegeForm(props) {
    var _this;

    _classCallCheck(this, IndexPrivilegeForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IndexPrivilegeForm).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getPrivilegeForm", function () {
      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, _extends({
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.indexPrivilegeForm.indicesFormRowLabel",
          defaultMessage: "Indices"
        }),
        fullWidth: true
      }, _this.props.validator.validateIndexPrivilege(_this.props.indexPrivilege)), _react2.default.createElement(_eui.EuiComboBox, {
        "data-test-subj": "indicesInput".concat(_this.props.formIndex),
        options: _this.props.indexPatterns.map(toOption),
        selectedOptions: _this.props.indexPrivilege.names.map(toOption),
        onCreateOption: _this.onCreateIndexPatternOption,
        onChange: _this.onIndexPatternsChange,
        isDisabled: _this.props.isRoleReadOnly
      }))), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, {
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.indexPrivilegeForm.privilegesFormRowLabel",
          defaultMessage: "Privileges"
        }),
        fullWidth: true
      }, _react2.default.createElement(_eui.EuiComboBox, {
        "data-test-subj": "privilegesInput".concat(_this.props.formIndex),
        options: _this.props.availableIndexPrivileges.map(toOption),
        selectedOptions: _this.props.indexPrivilege.privileges.map(toOption),
        onChange: _this.onPrivilegeChange,
        isDisabled: _this.props.isRoleReadOnly
      })))), _react2.default.createElement(_eui.EuiSpacer, null), _this.getFieldLevelControls(), _this.getGrantedDocumentsControl());
    });

    _defineProperty(_assertThisInitialized(_this), "getFieldLevelControls", function () {
      var _this$props = _this.props,
          allowFieldLevelSecurity = _this$props.allowFieldLevelSecurity,
          allowDocumentLevelSecurity = _this$props.allowDocumentLevelSecurity,
          availableFields = _this$props.availableFields,
          indexPrivilege = _this$props.indexPrivilege,
          isRoleReadOnly = _this$props.isRoleReadOnly;

      if (!allowFieldLevelSecurity) {
        return null;
      }

      var _this$getFieldSecurit = _this.getFieldSecurity(indexPrivilege),
          grant = _this$getFieldSecurit.grant,
          except = _this$getFieldSecurit.except;

      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        direction: "column"
      }, !isRoleReadOnly && _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiSwitch, {
        "data-test-subj": "restrictFieldsQuery".concat(_this.props.formIndex),
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRoles.indexPrivilegeForm.grantFieldPrivilegesLabel",
          defaultMessage: "Grant access to specific fields"
        }),
        compressed: true,
        checked: _this.state.fieldSecurityExpanded,
        onChange: _this.toggleFieldSecurity
      })), _this.state.fieldSecurityExpanded && _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, {
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRoles.indexPrivilegeForm.grantedFieldsFormRowLabel",
          defaultMessage: "Granted fields"
        }),
        fullWidth: true,
        className: "indexPrivilegeForm__grantedFieldsRow",
        helpText: !isRoleReadOnly && grant.length === 0 ? _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRoles.indexPrivilegeForm.grantedFieldsFormRowHelpText",
          defaultMessage: "If no fields are granted, then users assigned to this role will not be able to see any data for this index."
        }) : undefined
      }, _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiComboBox, {
        "data-test-subj": "fieldInput".concat(_this.props.formIndex),
        options: availableFields ? availableFields.map(toOption) : [],
        selectedOptions: grant.map(toOption),
        onCreateOption: _this.onCreateGrantedField,
        onChange: _this.onGrantedFieldsChange,
        isDisabled: _this.props.isRoleReadOnly
      })))), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, {
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRoles.indexPrivilegeForm.deniedFieldsFormRowLabel",
          defaultMessage: "Denied fields"
        }),
        fullWidth: true,
        className: "indexPrivilegeForm__deniedFieldsRow"
      }, _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiComboBox, {
        "data-test-subj": "deniedFieldInput".concat(_this.props.formIndex),
        options: availableFields ? availableFields.map(toOption) : [],
        selectedOptions: except.map(toOption),
        onCreateOption: _this.onCreateDeniedField,
        onChange: _this.onDeniedFieldsChange,
        isDisabled: isRoleReadOnly
      }))))))), allowDocumentLevelSecurity && _react2.default.createElement(_eui.EuiSpacer, null));
    });

    _defineProperty(_assertThisInitialized(_this), "getGrantedDocumentsControl", function () {
      var _this$props2 = _this.props,
          allowDocumentLevelSecurity = _this$props2.allowDocumentLevelSecurity,
          indexPrivilege = _this$props2.indexPrivilege,
          isRoleReadOnly = _this$props2.isRoleReadOnly;

      if (!allowDocumentLevelSecurity) {
        return null;
      }

      return _react2.default.createElement(_eui.EuiFlexGroup, {
        direction: "column"
      }, !_this.props.isRoleReadOnly && _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiSwitch, {
        "data-test-subj": "restrictDocumentsQuery".concat(_this.props.formIndex),
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.indexPrivilegeForm.grantReadPrivilegesLabel",
          defaultMessage: "Grant read privileges to specific documents"
        }),
        compressed: true,
        checked: _this.state.queryExpanded,
        onChange: _this.toggleDocumentQuery,
        disabled: isRoleReadOnly
      })), _this.state.queryExpanded && _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, {
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.indexPrivilegeForm.grantedDocumentsQueryFormRowLabel",
          defaultMessage: "Granted documents query"
        }),
        fullWidth: true
      }, _react2.default.createElement(_eui.EuiTextArea, {
        "data-test-subj": "queryInput".concat(_this.props.formIndex),
        style: {
          resize: 'none'
        },
        fullWidth: true,
        value: indexPrivilege.query,
        onChange: _this.onQueryChange,
        readOnly: _this.props.isRoleReadOnly
      }))));
    });

    _defineProperty(_assertThisInitialized(_this), "toggleDocumentQuery", function () {
      var willToggleOff = _this.state.queryExpanded;
      var willToggleOn = !willToggleOff; // If turning off, then save the current query in state so that we can restore it if the user changes their mind.

      _this.setState({
        queryExpanded: !_this.state.queryExpanded,
        documentQuery: willToggleOff ? _this.props.indexPrivilege.query : _this.state.documentQuery
      }); // If turning off, then remove the query from the Index Privilege


      if (willToggleOff) {
        _this.props.onChange(_objectSpread({}, _this.props.indexPrivilege, {
          query: ''
        }));
      } // If turning on, then restore the saved query if available


      if (willToggleOn && !_this.props.indexPrivilege.query && _this.state.documentQuery) {
        _this.props.onChange(_objectSpread({}, _this.props.indexPrivilege, {
          query: _this.state.documentQuery
        }));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "toggleFieldSecurity", function () {
      var willToggleOff = _this.state.fieldSecurityExpanded;
      var willToggleOn = !willToggleOff;

      var _this$getFieldSecurit2 = _this.getFieldSecurity(_this.props.indexPrivilege),
          grant = _this$getFieldSecurit2.grant,
          except = _this$getFieldSecurit2.except; // If turning off, then save the current configuration in state so that we can restore it if the user changes their mind.


      _this.setState({
        fieldSecurityExpanded: !_this.state.fieldSecurityExpanded,
        grantedFields: willToggleOff ? grant : _this.state.grantedFields,
        exceptedFields: willToggleOff ? except : _this.state.exceptedFields
      }); // If turning off, then remove the field security from the Index Privilege


      if (willToggleOff) {
        _this.props.onChange(_objectSpread({}, _this.props.indexPrivilege, {
          field_security: {
            grant: ['*'],
            except: []
          }
        }));
      } // If turning on, then restore the saved field security if available


      var hasConfiguredFieldSecurity = _this.isFieldSecurityConfigured(_this.props.indexPrivilege);

      var hasSavedFieldSecurity = _this.state.exceptedFields.length > 0 || _this.state.grantedFields.length > 0;

      if (willToggleOn && !hasConfiguredFieldSecurity && hasSavedFieldSecurity) {
        _this.props.onChange(_objectSpread({}, _this.props.indexPrivilege, {
          field_security: {
            grant: _this.state.grantedFields,
            except: _this.state.exceptedFields
          }
        }));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onCreateIndexPatternOption", function (option) {
      var newIndexPatterns = _this.props.indexPrivilege.names.concat([option]);

      _this.props.onChange(_objectSpread({}, _this.props.indexPrivilege, {
        names: newIndexPatterns
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onIndexPatternsChange", function (newPatterns) {
      _this.props.onChange(_objectSpread({}, _this.props.indexPrivilege, {
        names: newPatterns.map(fromOption)
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onPrivilegeChange", function (newPrivileges) {
      _this.props.onChange(_objectSpread({}, _this.props.indexPrivilege, {
        privileges: newPrivileges.map(fromOption)
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onQueryChange", function (e) {
      _this.props.onChange(_objectSpread({}, _this.props.indexPrivilege, {
        query: e.target.value
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onCreateGrantedField", function (grant) {
      if (!_this.props.indexPrivilege.field_security || !_this.props.indexPrivilege.field_security.grant) {
        return;
      }

      var newGrants = _this.props.indexPrivilege.field_security.grant.concat([grant]);

      _this.props.onChange(_objectSpread({}, _this.props.indexPrivilege, {
        field_security: _objectSpread({}, _this.props.indexPrivilege.field_security, {
          grant: newGrants
        })
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onGrantedFieldsChange", function (grantedFields) {
      _this.props.onChange(_objectSpread({}, _this.props.indexPrivilege, {
        field_security: _objectSpread({}, _this.props.indexPrivilege.field_security, {
          grant: grantedFields.map(fromOption)
        })
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onCreateDeniedField", function (except) {
      if (!_this.props.indexPrivilege.field_security || !_this.props.indexPrivilege.field_security.except) {
        return;
      }

      var newExcepts = _this.props.indexPrivilege.field_security.except.concat([except]);

      _this.props.onChange(_objectSpread({}, _this.props.indexPrivilege, {
        field_security: _objectSpread({}, _this.props.indexPrivilege.field_security, {
          except: newExcepts
        })
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onDeniedFieldsChange", function (deniedFields) {
      _this.props.onChange(_objectSpread({}, _this.props.indexPrivilege, {
        field_security: _objectSpread({}, _this.props.indexPrivilege.field_security, {
          except: deniedFields.map(fromOption)
        })
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getFieldSecurity", function (indexPrivilege) {
      var _ref = indexPrivilege.field_security || {},
          _ref$grant = _ref.grant,
          grant = _ref$grant === void 0 ? [] : _ref$grant,
          _ref$except = _ref.except,
          except = _ref$except === void 0 ? [] : _ref$except;

      return {
        grant: grant,
        except: except
      };
    });

    _defineProperty(_assertThisInitialized(_this), "isFieldSecurityConfigured", function (indexPrivilege) {
      var _this$getFieldSecurit3 = _this.getFieldSecurity(indexPrivilege),
          grant = _this$getFieldSecurit3.grant,
          except = _this$getFieldSecurit3.except;

      return except.length > 0 || grant.length > 0 && !_lodash.default.isEqual(grant, ['*']);
    });

    var _this$getFieldSecurit4 = _this.getFieldSecurity(props.indexPrivilege),
        _grant = _this$getFieldSecurit4.grant,
        _except = _this$getFieldSecurit4.except;

    _this.state = {
      queryExpanded: !!props.indexPrivilege.query,
      fieldSecurityExpanded: _this.isFieldSecurityConfigured(props.indexPrivilege),
      grantedFields: _grant,
      exceptedFields: _except,
      documentQuery: props.indexPrivilege.query
    };
    return _this;
  }

  _createClass(IndexPrivilegeForm, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiHorizontalRule, null), _react2.default.createElement(_eui.EuiFlexGroup, {
        className: "index-privilege-form"
      }, _react2.default.createElement(_eui.EuiFlexItem, null, this.getPrivilegeForm()), !this.props.isRoleReadOnly && _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiFormRow, {
        hasEmptyLabelSpace: true
      }, _react2.default.createElement(_eui.EuiButtonIcon, {
        "aria-label": _i18n.i18n.translate('xpack.security.management.editRole.indexPrivilegeForm.deleteSpacePrivilegeAriaLabel', {
          defaultMessage: 'Delete index privilege'
        }),
        color: 'danger',
        onClick: this.props.onDelete,
        iconType: 'trash'
      })))));
    }
  }]);

  return IndexPrivilegeForm;
}(_react2.Component);

exports.IndexPrivilegeForm = IndexPrivilegeForm;