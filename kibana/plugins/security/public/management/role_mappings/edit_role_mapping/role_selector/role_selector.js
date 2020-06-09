"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSelector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _model = require("../../../../../common/model");

var _add_role_template_button = require("./add_role_template_button");

var _role_template_editor = require("./role_template_editor");

var _role_combo_box = require("../../../role_combo_box");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RoleSelector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RoleSelector, _React$Component);

  function RoleSelector(props) {
    var _this;

    _classCallCheck(this, RoleSelector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RoleSelector).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getRoleComboBox", function () {
      var _this$props$roleMappi = _this.props.roleMapping.roles,
          roles = _this$props$roleMappi === void 0 ? [] : _this$props$roleMappi;
      return _react.default.createElement(_role_combo_box.RoleComboBox, {
        placeholder: _i18n.i18n.translate('xpack.security.management.editRoleMapping.selectRolesPlaceholder', {
          defaultMessage: 'Select one or more roles'
        }),
        isLoading: _this.state.roles.length === 0,
        availableRoles: _this.state.roles,
        selectedRoleNames: roles,
        onChange: function onChange(selectedRoles) {
          _this.props.onChange(_objectSpread({}, _this.props.roleMapping, {
            roles: selectedRoles,
            role_templates: []
          }));
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getRoleTemplates", function () {
      var _this$props$roleMappi2 = _this.props.roleMapping.role_templates,
          roleTemplates = _this$props$roleMappi2 === void 0 ? [] : _this$props$roleMappi2;
      return _react.default.createElement("div", null, roleTemplates.map(function (rt, index) {
        return _react.default.createElement(_react.Fragment, {
          key: index
        }, _react.default.createElement(_role_template_editor.RoleTemplateEditor, {
          canUseStoredScripts: _this.props.canUseStoredScripts,
          canUseInlineScripts: _this.props.canUseInlineScripts,
          roleTemplate: rt,
          onChange: function onChange(updatedTemplate) {
            var templates = _toConsumableArray(_this.props.roleMapping.role_templates || []);

            templates.splice(index, 1, updatedTemplate);

            _this.props.onChange(_objectSpread({}, _this.props.roleMapping, {
              role_templates: templates
            }));
          },
          onDelete: function onDelete() {
            var templates = _toConsumableArray(_this.props.roleMapping.role_templates || []);

            templates.splice(index, 1);

            _this.props.onChange(_objectSpread({}, _this.props.roleMapping, {
              role_templates: templates
            }));
          }
        }), _react.default.createElement(_eui.EuiHorizontalRule, null));
      }), _react.default.createElement(_add_role_template_button.AddRoleTemplateButton, {
        canUseStoredScripts: _this.props.canUseStoredScripts,
        canUseInlineScripts: _this.props.canUseInlineScripts,
        onClick: function onClick(type) {
          switch (type) {
            case 'inline':
              {
                var templates = _this.props.roleMapping.role_templates || [];

                _this.props.onChange(_objectSpread({}, _this.props.roleMapping, {
                  roles: [],
                  role_templates: [].concat(_toConsumableArray(templates), [{
                    template: {
                      source: ''
                    }
                  }])
                }));

                break;
              }

            case 'stored':
              {
                var _templates = _this.props.roleMapping.role_templates || [];

                _this.props.onChange(_objectSpread({}, _this.props.roleMapping, {
                  roles: [],
                  role_templates: [].concat(_toConsumableArray(_templates), [{
                    template: {
                      id: ''
                    }
                  }])
                }));

                break;
              }

            default:
              throw new Error("Unsupported template type: ".concat(type));
          }
        }
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getHelpText", function () {
      if (_this.props.mode === 'roles' && _this.hasDeprecatedRolesAssigned()) {
        return _react.default.createElement("span", {
          "data-test-subj": "deprecatedRolesAssigned"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.deprecatedRolesAssigned",
          defaultMessage: "This mapping is assigned a deprecated role. Please migrate to a supported role."
        }));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "hasDeprecatedRolesAssigned", function () {
      var _ref, _this$props$roleMappi3;

      return (_ref = (_this$props$roleMappi3 = _this.props.roleMapping.roles) === null || _this$props$roleMappi3 === void 0 ? void 0 : _this$props$roleMappi3.some(function (r) {
        return _this.state.roles.some(function (role) {
          return role.name === r && (0, _model.isRoleDeprecated)(role);
        });
      })) !== null && _ref !== void 0 ? _ref : false;
    });

    _this.state = {
      roles: []
    };
    return _this;
  }

  _createClass(RoleSelector, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var roles;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.rolesAPIClient.getRoles();

              case 2:
                roles = _context.sent;
                this.setState({
                  roles: roles
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var mode = this.props.mode;
      return _react.default.createElement(_eui.EuiFormRow, {
        fullWidth: true,
        helpText: this.getHelpText()
      }, mode === 'roles' ? this.getRoleComboBox() : this.getRoleTemplates());
    }
  }]);

  return RoleSelector;
}(_react.default.Component);

exports.RoleSelector = RoleSelector;