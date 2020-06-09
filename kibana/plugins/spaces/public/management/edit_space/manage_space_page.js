"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageSpacePage = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _lodash = _interopRequireDefault(require("lodash"));

var _react2 = _interopRequireWildcard(require("react"));

var _common = require("../../../common");

var _components = require("../components");

var _lib = require("../lib");

var _validate_space = require("../lib/validate_space");

var _confirm_alter_active_space_modal = require("./confirm_alter_active_space_modal");

var _customize_space = require("./customize_space");

var _delete_spaces_button = require("./delete_spaces_button");

var _enabled_features = require("./enabled_features");

var _reserved_space_badge = require("./reserved_space_badge");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var ManageSpacePage =
/*#__PURE__*/
function (_Component) {
  _inherits(ManageSpacePage, _Component);

  function ManageSpacePage(props) {
    var _this;

    _classCallCheck(this, ManageSpacePage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ManageSpacePage).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "validator", void 0);

    _defineProperty(_assertThisInitialized(_this), "getLoadingIndicator", function () {
      return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiLoadingSpinner, {
        size: 'xl'
      }), ' ', _react2.default.createElement(_eui.EuiTitle, null, _react2.default.createElement("h1", null, "Loading...")));
    });

    _defineProperty(_assertThisInitialized(_this), "getForm", function () {
      if (!_this.props.capabilities.spaces.manage) {
        return _react2.default.createElement(_components.UnauthorizedPrompt, null);
      }

      var showAlteringActiveSpaceDialog = _this.state.showAlteringActiveSpaceDialog;
      return _react2.default.createElement("div", {
        "data-test-subj": "spaces-edit-page"
      }, _this.getFormHeading(), _react2.default.createElement(_eui.EuiSpacer, {
        size: 's'
      }), _react2.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.manageSpacePage.manageDescription",
        defaultMessage: "Organize your saved objects into meaningful categories."
      })), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_customize_space.CustomizeSpace, {
        space: _this.state.space,
        onChange: _this.onSpaceChange,
        editingExistingSpace: _this.editingExistingSpace(),
        validator: _this.validator
      }), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_enabled_features.EnabledFeatures, {
        space: _this.state.space,
        features: _this.state.features,
        onChange: _this.onSpaceChange,
        securityEnabled: _this.props.securityEnabled
      }), _react2.default.createElement(_eui.EuiSpacer, null), _this.getFormButtons(), showAlteringActiveSpaceDialog && _react2.default.createElement(_confirm_alter_active_space_modal.ConfirmAlterActiveSpaceModal, {
        onConfirm: function onConfirm() {
          return _this.performSave(true);
        },
        onCancel: function onCancel() {
          _this.setState({
            showAlteringActiveSpaceDialog: false
          });
        }
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getFormHeading", function () {
      return _react2.default.createElement(_eui.EuiTitle, {
        size: "m"
      }, _react2.default.createElement("h1", null, _this.getTitle(), " ", _react2.default.createElement(_reserved_space_badge.ReservedSpaceBadge, {
        space: _this.state.space
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "getTitle", function () {
      if (_this.editingExistingSpace()) {
        return "Edit space";
      }

      return _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.manageSpacePage.createSpaceTitle",
        defaultMessage: "Create a space"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "maybeGetSecureSpacesMessage", function () {
      if (_this.editingExistingSpace() && _this.props.securityEnabled) {
        return _react2.default.createElement(_components.SecureSpaceMessage, null);
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "getFormButtons", function () {
      var createSpaceText = _i18n.i18n.translate('xpack.spaces.management.manageSpacePage.createSpaceButton', {
        defaultMessage: 'Create space'
      });

      var updateSpaceText = _i18n.i18n.translate('xpack.spaces.management.manageSpacePage.updateSpaceButton', {
        defaultMessage: 'Update space'
      });

      var cancelButtonText = _i18n.i18n.translate('xpack.spaces.management.manageSpacePage.cancelSpaceButton', {
        defaultMessage: 'Cancel'
      });

      var saveText = _this.editingExistingSpace() ? updateSpaceText : createSpaceText;
      return _react2.default.createElement(_eui.EuiFlexGroup, {
        responsive: false
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButton, {
        fill: true,
        onClick: _this.saveSpace,
        "data-test-subj": "save-space-button",
        isLoading: _this.state.saveInProgress
      }, saveText)), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButtonEmpty, {
        onClick: _this.backToSpacesList,
        "data-test-subj": "cancel-space-button"
      }, cancelButtonText)), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: true
      }), _this.getActionButton());
    });

    _defineProperty(_assertThisInitialized(_this), "getActionButton", function () {
      if (_this.state.space && _this.editingExistingSpace() && !(0, _common.isReservedSpace)(_this.state.space)) {
        return _react2.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react2.default.createElement(_delete_spaces_button.DeleteSpacesButton, {
          "data-test-subj": "delete-space-button",
          space: _this.state.space,
          spacesManager: _this.props.spacesManager,
          onDelete: _this.backToSpacesList,
          notifications: _this.props.notifications
        }));
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "onSpaceChange", function (updatedSpace) {
      _this.setState({
        space: updatedSpace
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveSpace", function () {
      _this.validator.enableValidation();

      var result = _this.validator.validateForSave(_this.state.space);

      if (result.isInvalid) {
        _this.setState({
          formError: result
        });

        return;
      }

      if (_this.editingExistingSpace()) {
        var spacesManager = _this.props.spacesManager;
        var originalSpace = _this.state.originalSpace;
        var _space = _this.state.space;
        spacesManager.getActiveSpace().then(function (activeSpace) {
          var editingActiveSpace = activeSpace.id === originalSpace.id;
          var haveDisabledFeaturesChanged = _space.disabledFeatures.length !== originalSpace.disabledFeatures.length || _lodash.default.difference(_space.disabledFeatures, originalSpace.disabledFeatures).length > 0;

          if (editingActiveSpace && haveDisabledFeaturesChanged) {
            _this.setState({
              showAlteringActiveSpaceDialog: true
            });

            return;
          }

          _this.performSave();
        });
      } else {
        _this.performSave();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "loadSpace",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(spaceId, featuresPromise) {
        var _this$props, spacesManager, onLoadSpace, _ref2, _ref3, _space2, features, _ref4, _error$body, message;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = _this.props, spacesManager = _this$props.spacesManager, onLoadSpace = _this$props.onLoadSpace;
                _context.prev = 1;
                _context.next = 4;
                return Promise.all([spacesManager.getSpace(spaceId), featuresPromise]);

              case 4:
                _ref2 = _context.sent;
                _ref3 = _slicedToArray(_ref2, 2);
                _space2 = _ref3[0];
                features = _ref3[1];

                if (_space2) {
                  if (onLoadSpace) {
                    onLoadSpace(_space2);
                  }

                  _this.setState({
                    space: _space2,
                    features: features,
                    originalSpace: _space2,
                    isLoading: false
                  });
                }

                _context.next = 16;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);
                message = (_ref4 = _context.t0 === null || _context.t0 === void 0 ? void 0 : (_error$body = _context.t0.body) === null || _error$body === void 0 ? void 0 : _error$body.message) !== null && _ref4 !== void 0 ? _ref4 : '';

                _this.props.notifications.toasts.addDanger(_i18n.i18n.translate('xpack.spaces.management.manageSpacePage.errorLoadingSpaceTitle', {
                  defaultMessage: 'Error loading space: {message}',
                  values: {
                    message: message
                  }
                }));

                _this.backToSpacesList();

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 11]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "performSave", function () {
      var requireRefresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_this.state.space) {
        return;
      }

      var name = _this.state.space.name || '';
      var _this$state$space = _this.state.space,
          _this$state$space$id = _this$state$space.id,
          id = _this$state$space$id === void 0 ? (0, _lib.toSpaceIdentifier)(name) : _this$state$space$id,
          description = _this$state$space.description,
          initials = _this$state$space.initials,
          color = _this$state$space.color,
          _this$state$space$dis = _this$state$space.disabledFeatures,
          disabledFeatures = _this$state$space$dis === void 0 ? [] : _this$state$space$dis,
          imageUrl = _this$state$space.imageUrl;
      var params = {
        name: name,
        id: id,
        description: description,
        initials: initials,
        color: color,
        disabledFeatures: disabledFeatures,
        imageUrl: imageUrl
      };
      var action;

      if (_this.editingExistingSpace()) {
        action = _this.props.spacesManager.updateSpace(params);
      } else {
        action = _this.props.spacesManager.createSpace(params);
      }

      _this.setState({
        saveInProgress: true
      });

      action.then(function () {
        _this.props.notifications.toasts.addSuccess(_i18n.i18n.translate('xpack.spaces.management.manageSpacePage.spaceSuccessfullySavedNotificationMessage', {
          defaultMessage: "Space {name} was saved.",
          values: {
            name: "'".concat(name, "'")
          }
        }));

        window.location.hash = "#/management/kibana/spaces";

        if (requireRefresh) {
          setTimeout(function () {
            window.location.reload();
          });
        }
      }).catch(function (error) {
        var _ref5, _error$body2;

        var message = (_ref5 = error === null || error === void 0 ? void 0 : (_error$body2 = error.body) === null || _error$body2 === void 0 ? void 0 : _error$body2.message) !== null && _ref5 !== void 0 ? _ref5 : '';

        _this.setState({
          saveInProgress: false
        });

        _this.props.notifications.toasts.addDanger(_i18n.i18n.translate('xpack.spaces.management.manageSpacePage.errorSavingSpaceTitle', {
          defaultMessage: 'Error saving space: {message}',
          values: {
            message: message
          }
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "backToSpacesList", function () {
      window.location.hash = "#/management/kibana/spaces";
    });

    _defineProperty(_assertThisInitialized(_this), "editingExistingSpace", function () {
      return !!_this.props.spaceId;
    });

    _this.validator = new _validate_space.SpaceValidator({
      shouldValidate: false
    });
    _this.state = {
      isLoading: true,
      showAlteringActiveSpaceDialog: false,
      saveInProgress: false,
      space: {},
      features: []
    };
    return _this;
  }

  _createClass(ManageSpacePage, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this$props2, spaceId, getFeatures, notifications, features;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.props.capabilities.spaces.manage) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                _this$props2 = this.props, spaceId = _this$props2.spaceId, getFeatures = _this$props2.getFeatures, notifications = _this$props2.notifications;
                _context2.prev = 3;

                if (!spaceId) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 7;
                return this.loadSpace(spaceId, getFeatures());

              case 7:
                _context2.next = 13;
                break;

              case 9:
                _context2.next = 11;
                return getFeatures();

              case 11:
                features = _context2.sent;
                this.setState({
                  isLoading: false,
                  features: features
                });

              case 13:
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](3);
                notifications.toasts.addError(_context2.t0, {
                  title: _i18n.i18n.translate('xpack.spaces.management.manageSpacePage.loadErrorTitle', {
                    defaultMessage: 'Error loading available features'
                  })
                });

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 15]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(previousProps) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.props.spaceId !== previousProps.spaceId && this.props.spaceId)) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this.loadSpace(this.props.spaceId, Promise.resolve(this.state.features));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidUpdate(_x3) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "render",
    value: function render() {
      var content = this.state.isLoading ? this.getLoadingIndicator() : this.getForm();
      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiPageContentBody, null, content), this.maybeGetSecureSpacesMessage());
    }
  }]);

  return ManageSpacePage;
}(_react2.Component);

exports.ManageSpacePage = ManageSpacePage;