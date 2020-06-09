"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpacesGridPage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _common = require("../../../common");

var _constants = require("../../../common/constants");

var _space_avatar = require("../../space_avatar");

var _constants2 = require("../../constants");

var _confirm_delete_modal = require("../components/confirm_delete_modal");

var _secure_space_message = require("../components/secure_space_message");

var _unauthorized_prompt = require("../components/unauthorized_prompt");

var _feature_utils = require("../lib/feature_utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var SpacesGridPage =
/*#__PURE__*/
function (_Component) {
  _inherits(SpacesGridPage, _Component);

  function SpacesGridPage(props) {
    var _this;

    _classCallCheck(this, SpacesGridPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpacesGridPage).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getConfirmDeleteModal", function () {
      if (!_this.state.showConfirmDeleteModal || !_this.state.selectedSpace) {
        return null;
      }

      var spacesManager = _this.props.spacesManager;
      return _react.default.createElement(_confirm_delete_modal.ConfirmDeleteModal, {
        space: _this.state.selectedSpace,
        spacesManager: spacesManager,
        onCancel: function onCancel() {
          _this.setState({
            showConfirmDeleteModal: false
          });
        },
        onConfirm: _this.deleteSpace
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deleteSpace",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var spacesManager, space, _ref2, _ref2$message, errorMessage, message;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              spacesManager = _this.props.spacesManager;
              space = _this.state.selectedSpace;

              if (space) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              _context.prev = 4;
              _context.next = 7;
              return spacesManager.deleteSpace(space);

            case 7:
              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](4);
              _ref2 = _context.t0.data || {}, _ref2$message = _ref2.message, errorMessage = _ref2$message === void 0 ? '' : _ref2$message;

              _this.props.notifications.toasts.addDanger(_i18n.i18n.translate('xpack.spaces.management.spacesGridPage.errorDeletingSpaceErrorMessage', {
                defaultMessage: 'Error deleting space: {errorMessage}',
                values: {
                  errorMessage: errorMessage
                }
              }));

            case 13:
              _this.setState({
                showConfirmDeleteModal: false
              });

              _this.loadGrid();

              message = _i18n.i18n.translate('xpack.spaces.management.spacesGridPage.spaceSuccessfullyDeletedNotificationMessage', {
                defaultMessage: 'Deleted "{spaceName}" space.',
                values: {
                  spaceName: space.name
                }
              });

              _this.props.notifications.toasts.addSuccess(message);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 9]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "loadGrid",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _this$props, spacesManager, getFeatures, notifications, getSpaces, _ref4, _ref5, spaces, features;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$props = _this.props, spacesManager = _this$props.spacesManager, getFeatures = _this$props.getFeatures, notifications = _this$props.notifications;

              _this.setState({
                loading: true,
                spaces: [],
                features: []
              });

              getSpaces = spacesManager.getSpaces();
              _context2.prev = 3;
              _context2.next = 6;
              return Promise.all([getSpaces, getFeatures()]);

            case 6:
              _ref4 = _context2.sent;
              _ref5 = _slicedToArray(_ref4, 2);
              spaces = _ref5[0];
              features = _ref5[1];

              _this.setState({
                loading: false,
                spaces: spaces,
                features: features
              });

              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](3);

              _this.setState({
                loading: false
              });

              notifications.toasts.addError(_context2.t0, {
                title: _i18n.i18n.translate('xpack.spaces.management.spacesGridPage.errorTitle', {
                  defaultMessage: 'Error loading spaces'
                })
              });

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 13]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "getEditSpacePath", function (space) {
      return "#/management/kibana/spaces/edit/".concat(encodeURIComponent(space.id));
    });

    _defineProperty(_assertThisInitialized(_this), "onDeleteSpaceClick", function (space) {
      _this.setState({
        selectedSpace: space,
        showConfirmDeleteModal: true
      });
    });

    _this.state = {
      spaces: [],
      features: [],
      loading: true,
      showConfirmDeleteModal: false,
      selectedSpace: null
    };
    return _this;
  }

  _createClass(SpacesGridPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.capabilities.spaces.manage) {
        this.loadGrid();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "spcGridPage",
        "data-test-subj": "spaces-grid-page"
      }, _react.default.createElement(_eui.EuiPageContent, {
        horizontalPosition: "center"
      }, this.getPageContent()), this.props.securityEnabled && _react.default.createElement(_secure_space_message.SecureSpaceMessage, null), this.getConfirmDeleteModal());
    }
  }, {
    key: "getPageContent",
    value: function getPageContent() {
      if (!this.props.capabilities.spaces.manage) {
        return _react.default.createElement(_unauthorized_prompt.UnauthorizedPrompt, null);
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: 'spaceBetween'
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "m"
      }, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.spacesGridPage.spacesTitle",
        defaultMessage: "Spaces"
      }))), _react.default.createElement(_eui.EuiText, {
        color: "subdued",
        size: "s"
      }, _react.default.createElement("p", null, (0, _constants2.getSpacesFeatureDescription)()))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, this.getPrimaryActionButton())), _react.default.createElement(_eui.EuiSpacer, {
        size: "l"
      }), _react.default.createElement(_eui.EuiInMemoryTable, {
        itemId: 'id',
        items: this.state.spaces,
        columns: this.getColumnConfig(),
        hasActions: true,
        pagination: true,
        sorting: true,
        search: {
          box: {
            placeholder: _i18n.i18n.translate('xpack.spaces.management.spacesGridPage.searchPlaceholder', {
              defaultMessage: 'Search'
            })
          }
        },
        loading: this.state.loading,
        message: this.state.loading ? _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.spaces.management.spacesGridPage.loadingTitle",
          defaultMessage: "loading\u2026"
        }) : undefined
      }));
    }
  }, {
    key: "getPrimaryActionButton",
    value: function getPrimaryActionButton() {
      return _react.default.createElement(_eui.EuiButton, {
        fill: true,
        href: "#/management/kibana/spaces/create"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.spacesGridPage.createSpaceButtonLabel",
        defaultMessage: "Create a space"
      }));
    }
  }, {
    key: "getColumnConfig",
    value: function getColumnConfig() {
      var _this2 = this;

      return [{
        field: 'initials',
        name: '',
        width: '50px',
        render: function render(value, record) {
          return _react.default.createElement(_eui.EuiLink, {
            href: _this2.getEditSpacePath(record)
          }, _react.default.createElement(_space_avatar.SpaceAvatar, {
            space: record,
            size: "s"
          }));
        }
      }, {
        field: 'name',
        name: _i18n.i18n.translate('xpack.spaces.management.spacesGridPage.spaceColumnName', {
          defaultMessage: 'Space'
        }),
        sortable: true,
        render: function render(value, record) {
          return _react.default.createElement(_eui.EuiLink, {
            href: _this2.getEditSpacePath(record)
          }, value);
        }
      }, {
        field: 'description',
        name: _i18n.i18n.translate('xpack.spaces.management.spacesGridPage.descriptionColumnName', {
          defaultMessage: 'Description'
        }),
        sortable: true
      }, {
        field: 'disabledFeatures',
        name: _i18n.i18n.translate('xpack.spaces.management.spacesGridPage.featuresColumnName', {
          defaultMessage: 'Features'
        }),
        sortable: function sortable(space) {
          return (0, _feature_utils.getEnabledFeatures)(_this2.state.features, space).length;
        },
        render: function render(disabledFeatures, record) {
          var enabledFeatureCount = (0, _feature_utils.getEnabledFeatures)(_this2.state.features, record).length;

          if (enabledFeatureCount === _this2.state.features.length) {
            return _react.default.createElement(_react2.FormattedMessage, {
              id: "xpack.spaces.management.spacesGridPage.allFeaturesEnabled",
              defaultMessage: "All features visible"
            });
          }

          if (enabledFeatureCount === 0) {
            return _react.default.createElement(_eui.EuiText, {
              color: 'danger'
            }, _react.default.createElement(_react2.FormattedMessage, {
              id: "xpack.spaces.management.spacesGridPage.noFeaturesEnabled",
              defaultMessage: "No features visible"
            }));
          }

          return _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.spaces.management.spacesGridPage.someFeaturesEnabled",
            defaultMessage: "{enabledFeatureCount} / {totalFeatureCount} features visible",
            values: {
              enabledFeatureCount: enabledFeatureCount,
              totalFeatureCount: _this2.state.features.length
            }
          });
        }
      }, {
        field: 'id',
        name: _i18n.i18n.translate('xpack.spaces.management.spacesGridPage.identifierColumnName', {
          defaultMessage: 'Identifier'
        }),
        sortable: true,
        render: function render(id) {
          if (id === _constants.DEFAULT_SPACE_ID) {
            return '';
          }

          return id;
        }
      }, {
        name: _i18n.i18n.translate('xpack.spaces.management.spacesGridPage.actionsColumnName', {
          defaultMessage: 'Actions'
        }),
        actions: [{
          render: function render(record) {
            return _react.default.createElement(_eui.EuiButtonIcon, {
              "aria-label": _i18n.i18n.translate('xpack.spaces.management.spacesGridPage.editSpaceActionName', {
                defaultMessage: "Edit {spaceName}.",
                values: {
                  spaceName: record.name
                }
              }),
              color: 'primary',
              iconType: 'pencil',
              href: _this2.getEditSpacePath(record)
            });
          }
        }, {
          available: function available(record) {
            return !(0, _common.isReservedSpace)(record);
          },
          render: function render(record) {
            return _react.default.createElement(_eui.EuiButtonIcon, {
              "aria-label": _i18n.i18n.translate('xpack.spaces.management.spacesGridPage.deleteActionName', {
                defaultMessage: "Delete {spaceName}.",
                values: {
                  spaceName: record.name
                }
              }),
              color: 'danger',
              iconType: 'trash',
              onClick: function onClick() {
                return _this2.onDeleteSpaceClick(record);
              }
            });
          }
        }]
      }];
    }
  }]);

  return SpacesGridPage;
}(_react.Component);

exports.SpacesGridPage = SpacesGridPage;