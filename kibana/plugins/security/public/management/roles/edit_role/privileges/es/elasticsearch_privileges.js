"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticsearchPrivileges = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _collapsible_panel = require("../../collapsible_panel");

var _cluster_privileges = require("./cluster_privileges");

var _index_privileges = require("./index_privileges");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var ElasticsearchPrivileges =
/*#__PURE__*/
function (_Component) {
  _inherits(ElasticsearchPrivileges, _Component);

  function ElasticsearchPrivileges() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ElasticsearchPrivileges);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ElasticsearchPrivileges)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getForm", function () {
      var _this$props = _this.props,
          role = _this$props.role,
          indicesAPIClient = _this$props.indicesAPIClient,
          docLinks = _this$props.docLinks,
          validator = _this$props.validator,
          onChange = _this$props.onChange,
          editable = _this$props.editable,
          indexPatterns = _this$props.indexPatterns,
          license = _this$props.license,
          builtinESPrivileges = _this$props.builtinESPrivileges;
      var indexProps = {
        role: role,
        indicesAPIClient: indicesAPIClient,
        validator: validator,
        indexPatterns: indexPatterns,
        license: license,
        onChange: onChange,
        availableIndexPrivileges: builtinESPrivileges.index
      };
      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiDescribedFormGroup, {
        title: _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.elasticSearchPrivileges.clusterPrivilegesTitle",
          defaultMessage: "Cluster privileges"
        })),
        description: _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.elasticSearchPrivileges.manageRoleActionsDescription",
          defaultMessage: "Manage the actions this role can perform against your cluster. "
        }), _this.learnMore(docLinks.getESClusterPrivilegesDocUrl()))
      }, _react2.default.createElement(_eui.EuiFormRow, {
        fullWidth: true,
        hasEmptyLabelSpace: true
      }, _react2.default.createElement(_cluster_privileges.ClusterPrivileges, {
        role: _this.props.role,
        onChange: _this.onClusterPrivilegesChange,
        builtinClusterPrivileges: builtinESPrivileges.cluster
      }))), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiDescribedFormGroup, {
        title: _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.elasticSearchPrivileges.runAsPrivilegesTitle",
          defaultMessage: "Run As privileges"
        })),
        description: _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.elasticSearchPrivileges.howToBeSubmittedOnBehalfOfOtherUsersDescription",
          defaultMessage: "Allow requests to be submitted on the behalf of other users. "
        }), _this.learnMore(docLinks.getESRunAsPrivilegesDocUrl()))
      }, _react2.default.createElement(_eui.EuiFormRow, {
        hasEmptyLabelSpace: true
      }, _react2.default.createElement(_eui.EuiComboBox, {
        placeholder: _this.props.editable ? _i18n.i18n.translate('xpack.security.management.editRole.elasticSearchPrivileges.addUserTitle', {
          defaultMessage: 'Add a user…'
        }) : undefined,
        options: _this.props.runAsUsers.map(function (username) {
          return {
            id: username,
            label: username,
            isGroupLabelOption: false
          };
        }),
        selectedOptions: _this.props.role.elasticsearch.run_as.map(function (u) {
          return {
            label: u
          };
        }),
        onCreateOption: _this.onCreateRunAsOption,
        onChange: _this.onRunAsUserChange,
        isDisabled: !editable
      }))), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiTitle, {
        size: 'xs'
      }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.elasticSearchPrivileges.indexPrivilegesTitle",
        defaultMessage: "Index privileges"
      }))), _react2.default.createElement(_eui.EuiSpacer, {
        size: 's'
      }), _react2.default.createElement(_eui.EuiText, {
        size: 's',
        color: 'subdued'
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.elasticSearchPrivileges.controlAccessToClusterDataDescription",
        defaultMessage: "Control access to the data in your cluster. "
      }), _this.learnMore(docLinks.getESIndicesPrivilegesDocUrl()))), _react2.default.createElement(_index_privileges.IndexPrivileges, indexProps), _react2.default.createElement(_eui.EuiHorizontalRule, null), _this.props.editable && _react2.default.createElement(_eui.EuiButton, {
        iconType: 'plusInCircleFilled',
        onClick: _this.addIndexPrivilege
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.elasticSearchPrivileges.addIndexPrivilegesButtonLabel",
        defaultMessage: "Add index privilege"
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "learnMore", function (href) {
      return _react2.default.createElement(_eui.EuiLink, {
        className: "editRole__learnMore",
        href: href,
        target: '_blank'
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.elasticSearchPrivileges.learnMoreLinkText",
        defaultMessage: "Learn more"
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "addIndexPrivilege", function () {
      var role = _this.props.role;
      var newIndices = [].concat(_toConsumableArray(role.elasticsearch.indices), [{
        names: [],
        privileges: [],
        field_security: {
          grant: ['*']
        }
      }]);

      _this.props.onChange(_objectSpread({}, _this.props.role, {
        elasticsearch: _objectSpread({}, _this.props.role.elasticsearch, {
          indices: newIndices
        })
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onClusterPrivilegesChange", function (cluster) {
      var role = _objectSpread({}, _this.props.role, {
        elasticsearch: _objectSpread({}, _this.props.role.elasticsearch, {
          cluster: cluster
        })
      });

      _this.props.onChange(role);
    });

    _defineProperty(_assertThisInitialized(_this), "onRunAsUserChange", function (users) {
      var role = _objectSpread({}, _this.props.role, {
        elasticsearch: _objectSpread({}, _this.props.role.elasticsearch, {
          run_as: users.map(function (u) {
            return u.label;
          })
        })
      });

      _this.props.onChange(role);
    });

    _defineProperty(_assertThisInitialized(_this), "onCreateRunAsOption", function (option) {
      var newRunAsUsers = _this.props.role.elasticsearch.run_as.concat(option);

      var role = _objectSpread({}, _this.props.role, {
        elasticsearch: _objectSpread({}, _this.props.role.elasticsearch, {
          run_as: newRunAsUsers
        })
      });

      _this.props.onChange(role);
    });

    return _this;
  }

  _createClass(ElasticsearchPrivileges, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_collapsible_panel.CollapsiblePanel, {
        iconType: 'logoElasticsearch',
        title: 'Elasticsearch'
      }, this.getForm());
    }
  }]);

  return ElasticsearchPrivileges;
}(_react2.Component);

exports.ElasticsearchPrivileges = ElasticsearchPrivileges;