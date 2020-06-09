"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditRoleMappingPage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _rule_editor_panel = require("./rule_editor_panel");

var _components = require("../components");

var _management_urls = require("../../management_urls");

var _role_mapping_validation = require("./services/role_mapping_validation");

var _mapping_info_panel = require("./mapping_info_panel");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EditRoleMappingPage =
/*#__PURE__*/
function (_Component) {
  _inherits(EditRoleMappingPage, _Component);

  function EditRoleMappingPage(props) {
    var _this;

    _classCallCheck(this, EditRoleMappingPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditRoleMappingPage).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getFormTitle", function () {
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
        size: "l"
      }, _react.default.createElement("h1", null, _this.editingExistingRoleMapping() ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.editRoleMappingTitle",
        defaultMessage: "Edit role mapping"
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.createRoleMappingTitle",
        defaultMessage: "Create role mapping"
      }))), _react.default.createElement(_eui.EuiText, {
        color: "subdued",
        size: "s"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.roleMappingDescription",
        defaultMessage: "Use role mappings to control which roles are assigned to your users. {learnMoreLink}",
        values: {
          learnMoreLink: _react.default.createElement(_eui.EuiLink, {
            href: _this.props.docLinks.getRoleMappingDocUrl(),
            external: true,
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.editRoleMapping.learnMoreLinkText",
            defaultMessage: "Learn more."
          }))
        }
      }))), !_this.state.hasCompatibleRealms && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_components.NoCompatibleRealms, {
        docLinks: _this.props.docLinks
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "getFormButtons", function () {
      return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        fill: true,
        onClick: _this.saveRoleMapping,
        isLoading: _this.state.loadState === 'saveInProgress',
        disabled: !_this.state.rulesValid || _this.state.loadState === 'saveInProgress',
        "data-test-subj": "saveRoleMappingButton"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.saveRoleMappingButton",
        defaultMessage: "Save role mapping"
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false,
        onClick: _this.backToRoleMappingsList
      }, _react.default.createElement(_eui.EuiButton, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.cancelButton",
        defaultMessage: "Cancel"
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: true
      }), _this.editingExistingRoleMapping() && _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_components.DeleteProvider, {
        roleMappingsAPI: _this.props.roleMappingsAPI,
        notifications: _this.props.notifications
      }, function (deleteRoleMappingsPrompt) {
        return _react.default.createElement(_eui.EuiButtonEmpty, {
          onClick: function onClick() {
            return deleteRoleMappingsPrompt([_this.state.roleMapping], function () {
              return _this.backToRoleMappingsList();
            });
          },
          color: "danger"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.deleteRoleMappingButton",
          defaultMessage: "Delete role mapping"
        }));
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "onRuleValidityChange", function (rulesValid) {
      _this.setState({
        rulesValid: rulesValid
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveRoleMapping", function () {
      if (!_this.state.roleMapping) {
        return;
      }

      var _validateRoleMappingF = (0, _role_mapping_validation.validateRoleMappingForSave)(_this.state.roleMapping),
          isInvalid = _validateRoleMappingF.isInvalid;

      if (isInvalid) {
        _this.setState({
          validateForm: true
        });

        return;
      }

      var roleMappingName = _this.state.roleMapping.name;

      _this.setState({
        loadState: 'saveInProgress'
      });

      _this.props.roleMappingsAPI.saveRoleMapping(_this.state.roleMapping).then(function () {
        _this.props.notifications.toasts.addSuccess({
          title: _i18n.i18n.translate('xpack.security.management.editRoleMapping.saveSuccess', {
            defaultMessage: "Saved role mapping '{roleMappingName}'",
            values: {
              roleMappingName: roleMappingName
            }
          }),
          'data-test-subj': 'savedRoleMappingSuccessToast'
        });

        _this.backToRoleMappingsList();
      }).catch(function (e) {
        var _e$body;

        _this.props.notifications.toasts.addError(e, {
          title: _i18n.i18n.translate('xpack.security.management.editRoleMapping.saveError', {
            defaultMessage: "Error saving role mapping"
          }),
          toastMessage: e === null || e === void 0 ? void 0 : (_e$body = e.body) === null || _e$body === void 0 ? void 0 : _e$body.message
        });

        _this.setState({
          loadState: 'saveInProgress'
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "editingExistingRoleMapping", function () {
      return typeof _this.props.name === 'string';
    });

    _defineProperty(_assertThisInitialized(_this), "backToRoleMappingsList", function () {
      window.location.hash = _management_urls.ROLE_MAPPINGS_PATH;
    });

    _this.state = {
      loadState: 'loading',
      roleMapping: null,
      hasCompatibleRealms: true,
      canUseStoredScripts: true,
      canUseInlineScripts: true,
      rulesValid: true,
      validateForm: false,
      formError: {
        isInvalid: false
      }
    };
    return _this;
  }

  _createClass(EditRoleMappingPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadAppData();
    }
  }, {
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(prevProps) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(prevProps.name !== this.props.name)) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this.loadAppData();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidUpdate(_x) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var loadState = this.state.loadState;

      if (loadState === 'permissionDenied') {
        return _react.default.createElement(_components.PermissionDenied, null);
      }

      if (loadState === 'loading') {
        return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_components.SectionLoading, null));
      }

      return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiForm, {
        isInvalid: this.state.formError.isInvalid,
        error: this.state.formError.error
      }, this.getFormTitle(), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_mapping_info_panel.MappingInfoPanel, {
        roleMapping: this.state.roleMapping,
        onChange: function onChange(roleMapping) {
          return _this2.setState({
            roleMapping: roleMapping
          });
        },
        mode: this.editingExistingRoleMapping() ? 'edit' : 'create',
        validateForm: this.state.validateForm,
        canUseInlineScripts: this.state.canUseInlineScripts,
        canUseStoredScripts: this.state.canUseStoredScripts,
        rolesAPIClient: this.props.rolesAPIClient,
        docLinks: this.props.docLinks
      }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_rule_editor_panel.RuleEditorPanel, {
        rawRules: this.state.roleMapping.rules,
        validateForm: this.state.validateForm,
        onValidityChange: this.onRuleValidityChange,
        onChange: function onChange(rules) {
          return _this2.setState({
            roleMapping: _objectSpread({}, _this2.state.roleMapping, {
              rules: rules
            })
          });
        },
        docLinks: this.props.docLinks
      }), _react.default.createElement(_eui.EuiSpacer, null), this.getFormButtons()));
    }
  }, {
    key: "loadAppData",
    value: function () {
      var _loadAppData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _ref, _ref2, features, roleMapping, canManageRoleMappings, canUseStoredScripts, canUseInlineScripts, hasCompatibleRealms, loadState, _ref3, _e$body2;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return Promise.all([this.props.roleMappingsAPI.checkRoleMappingFeatures(), this.editingExistingRoleMapping() ? this.props.roleMappingsAPI.getRoleMapping(this.props.name) : Promise.resolve({
                  name: '',
                  enabled: true,
                  metadata: {},
                  role_templates: [],
                  roles: [],
                  rules: {}
                })]);

              case 3:
                _ref = _context2.sent;
                _ref2 = _slicedToArray(_ref, 2);
                features = _ref2[0];
                roleMapping = _ref2[1];
                canManageRoleMappings = features.canManageRoleMappings, canUseStoredScripts = features.canUseStoredScripts, canUseInlineScripts = features.canUseInlineScripts, hasCompatibleRealms = features.hasCompatibleRealms;
                loadState = canManageRoleMappings ? 'ready' : 'permissionDenied';
                this.setState({
                  loadState: loadState,
                  hasCompatibleRealms: hasCompatibleRealms,
                  canUseStoredScripts: canUseStoredScripts,
                  canUseInlineScripts: canUseInlineScripts,
                  roleMapping: roleMapping
                });
                _context2.next = 16;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                this.props.notifications.toasts.addDanger({
                  title: _i18n.i18n.translate('xpack.security.management.editRoleMapping.table.fetchingRoleMappingsErrorMessage', {
                    defaultMessage: 'Error loading role mapping editor: {message}',
                    values: {
                      message: (_ref3 = _context2.t0 === null || _context2.t0 === void 0 ? void 0 : (_e$body2 = _context2.t0.body) === null || _e$body2 === void 0 ? void 0 : _e$body2.message) !== null && _ref3 !== void 0 ? _ref3 : ''
                    }
                  }),
                  'data-test-subj': 'errorLoadingRoleMappingEditorToast'
                });
                this.backToRoleMappingsList();

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 12]]);
      }));

      function loadAppData() {
        return _loadAppData.apply(this, arguments);
      }

      return loadAppData;
    }()
  }]);

  return EditRoleMappingPage;
}(_react.Component);

exports.EditRoleMappingPage = EditRoleMappingPage;