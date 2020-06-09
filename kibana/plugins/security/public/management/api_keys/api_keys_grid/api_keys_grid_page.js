"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIKeysGridPage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _lodash = _interopRequireDefault(require("lodash"));

var _section_loading = require("../../../../../../../src/plugins/es_ui_shared/public/components/section_loading");

var _permission_denied = require("./permission_denied");

var _empty_prompt = require("./empty_prompt");

var _not_enabled = require("./not_enabled");

var _invalidate_provider = require("./invalidate_provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var DATE_FORMAT = 'MMMM Do YYYY HH:mm:ss';

var APIKeysGridPage =
/*#__PURE__*/
function (_Component) {
  _inherits(APIKeysGridPage, _Component);

  function APIKeysGridPage(props) {
    var _this;

    _classCallCheck(this, APIKeysGridPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(APIKeysGridPage).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "renderTable", function () {
      var _this$state = _this.state,
          apiKeys = _this$state.apiKeys,
          selectedItems = _this$state.selectedItems,
          isLoadingTable = _this$state.isLoadingTable,
          isAdmin = _this$state.isAdmin;
      var message = isLoadingTable ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.apiKeys.table.apiKeysTableLoadingMessage",
        defaultMessage: "Loading API keys\u2026"
      }) : undefined;
      var sorting = {
        sort: {
          field: 'expiration',
          direction: 'asc'
        }
      };
      var pagination = {
        initialPageSize: 20,
        pageSizeOptions: [10, 20, 50]
      };
      var selection = {
        onSelectionChange: function onSelectionChange(newSelectedItems) {
          _this.setState({
            selectedItems: newSelectedItems
          });
        }
      };
      var search = {
        toolsLeft: selectedItems.length ? _react.default.createElement(_invalidate_provider.InvalidateProvider, {
          isAdmin: isAdmin,
          notifications: _this.props.notifications,
          apiKeysAPIClient: _this.props.apiKeysAPIClient
        }, function (invalidateApiKeyPrompt) {
          return _react.default.createElement(_eui.EuiButton, {
            onClick: function onClick() {
              return invalidateApiKeyPrompt(selectedItems.map(function (_ref) {
                var name = _ref.name,
                    id = _ref.id;
                return {
                  name: name,
                  id: id
                };
              }), _this.onApiKeysInvalidated);
            },
            color: "danger",
            "data-test-subj": "bulkInvalidateActionButton"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.apiKeys.table.invalidateApiKeyButton",
            defaultMessage: "Invalidate {count, plural, one {API key} other {API keys}}",
            values: {
              count: selectedItems.length
            }
          }));
        }) : undefined,
        toolsRight: _react.default.createElement(_eui.EuiButton, {
          color: "secondary",
          iconType: "refresh",
          onClick: function onClick() {
            return _this.reloadApiKeys();
          },
          "data-test-subj": "reloadButton"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.apiKeys.table.reloadApiKeysButton",
          defaultMessage: "Reload"
        })),
        box: {
          incremental: true
        },
        filters: isAdmin ? [{
          type: 'field_value_selection',
          field: 'username',
          name: _i18n.i18n.translate('xpack.security.management.apiKeys.table.userFilterLabel', {
            defaultMessage: 'User'
          }),
          multiSelect: false,
          options: Object.keys(apiKeys.reduce(function (apiKeysMap, apiKey) {
            apiKeysMap[apiKey.username] = true;
            return apiKeysMap;
          }, {})).map(function (username) {
            return {
              value: username,
              view: username
            };
          })
        }, {
          type: 'field_value_selection',
          field: 'realm',
          name: _i18n.i18n.translate('xpack.security.management.apiKeys.table.realmFilterLabel', {
            defaultMessage: 'Realm'
          }),
          multiSelect: false,
          options: Object.keys(apiKeys.reduce(function (apiKeysMap, apiKey) {
            apiKeysMap[apiKey.realm] = true;
            return apiKeysMap;
          }, {})).map(function (realm) {
            return {
              value: realm,
              view: realm
            };
          })
        }] : undefined
      };
      return _react.default.createElement(_react.default.Fragment, null, isAdmin ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.apiKeys.table.adminText",
          defaultMessage: "You are an API Key administrator."
        }),
        color: "success",
        iconType: "user",
        size: "s",
        "data-test-subj": "apiKeyAdminDescriptionCallOut"
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      })) : undefined, _react.default.createElement(_eui.EuiInMemoryTable, {
        items: apiKeys,
        itemId: "id",
        columns: _this.getColumnConfig(),
        search: search,
        sorting: sorting,
        selection: selection,
        pagination: pagination,
        loading: isLoadingTable,
        message: message,
        isSelectable: true,
        rowProps: function rowProps() {
          return {
            'data-test-subj': 'apiKeyRow'
          };
        }
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getColumnConfig", function () {
      var isAdmin = _this.state.isAdmin;
      var config = [{
        field: 'name',
        name: _i18n.i18n.translate('xpack.security.management.apiKeys.table.nameColumnName', {
          defaultMessage: 'Name'
        }),
        sortable: true
      }];

      if (isAdmin) {
        config = config.concat([{
          field: 'username',
          name: _i18n.i18n.translate('xpack.security.management.apiKeys.table.userNameColumnName', {
            defaultMessage: 'User'
          }),
          sortable: true
        }, {
          field: 'realm',
          name: _i18n.i18n.translate('xpack.security.management.apiKeys.table.realmColumnName', {
            defaultMessage: 'Realm'
          }),
          sortable: true
        }]);
      }

      config = config.concat([{
        field: 'creation',
        name: _i18n.i18n.translate('xpack.security.management.apiKeys.table.creationDateColumnName', {
          defaultMessage: 'Created'
        }),
        sortable: true,
        // @ts-ignore
        render: function render(creationDateMs) {
          return (0, _momentTimezone.default)(creationDateMs).format(DATE_FORMAT);
        }
      }, {
        field: 'expiration',
        name: _i18n.i18n.translate('xpack.security.management.apiKeys.table.expirationDateColumnName', {
          defaultMessage: 'Expires'
        }),
        sortable: true,
        // @ts-ignore
        render: function render(expirationDateMs) {
          if (expirationDateMs === undefined) {
            return _react.default.createElement(_eui.EuiText, {
              color: "subdued"
            }, _i18n.i18n.translate('xpack.security.management.apiKeys.table.expirationDateNeverMessage', {
              defaultMessage: 'Never'
            }));
          }

          return (0, _momentTimezone.default)(expirationDateMs).format(DATE_FORMAT);
        }
      }, {
        name: _i18n.i18n.translate('xpack.security.management.apiKeys.table.statusColumnName', {
          defaultMessage: 'Status'
        }),
        render: function render(_ref2) {
          var expiration = _ref2.expiration;
          var now = Date.now();

          if (now > expiration) {
            return _react.default.createElement(_eui.EuiBadge, {
              color: "hollow"
            }, "Expired");
          }

          return _react.default.createElement(_eui.EuiBadge, {
            color: "secondary"
          }, "Active");
        }
      }, {
        name: _i18n.i18n.translate('xpack.security.management.apiKeys.table.actionsColumnName', {
          defaultMessage: 'Actions'
        }),
        actions: [{
          render: function render(_ref3) {
            var name = _ref3.name,
                id = _ref3.id;
            return _react.default.createElement(_eui.EuiFlexGroup, {
              gutterSize: "s"
            }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_invalidate_provider.InvalidateProvider, {
              isAdmin: isAdmin,
              notifications: _this.props.notifications,
              apiKeysAPIClient: _this.props.apiKeysAPIClient
            }, function (invalidateApiKeyPrompt) {
              return _react.default.createElement(_eui.EuiToolTip, {
                content: _i18n.i18n.translate('xpack.security.management.apiKeys.table.actionDeleteTooltip', {
                  defaultMessage: 'Invalidate'
                })
              }, _react.default.createElement(_eui.EuiButtonIcon, {
                "aria-label": _i18n.i18n.translate('xpack.security.management.apiKeys.table.actionDeleteAriaLabel', {
                  defaultMessage: "Invalidate '{name}'",
                  values: {
                    name: name
                  }
                }),
                iconType: "minusInCircle",
                color: "danger",
                "data-test-subj": "invalidateApiKeyButton",
                onClick: function onClick() {
                  return invalidateApiKeyPrompt([{
                    id: id,
                    name: name
                  }], _this.onApiKeysInvalidated);
                }
              }));
            })));
          }
        }]
      }]);
      return config;
    });

    _defineProperty(_assertThisInitialized(_this), "onApiKeysInvalidated", function (apiKeysInvalidated) {
      if (apiKeysInvalidated.length) {
        _this.reloadApiKeys();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "initiallyLoadApiKeys", function () {
      _this.setState({
        isLoadingApp: true,
        isLoadingTable: false
      });

      _this.loadApiKeys();
    });

    _defineProperty(_assertThisInitialized(_this), "reloadApiKeys", function () {
      _this.setState({
        apiKeys: [],
        isLoadingApp: false,
        isLoadingTable: true
      });

      _this.loadApiKeys();
    });

    _defineProperty(_assertThisInitialized(_this), "loadApiKeys",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var isAdmin, _ref5, apiKeys;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              isAdmin = _this.state.isAdmin;
              _context.next = 4;
              return _this.props.apiKeysAPIClient.getApiKeys(isAdmin);

            case 4:
              _ref5 = _context.sent;
              apiKeys = _ref5.apiKeys;

              _this.setState({
                apiKeys: apiKeys
              });

              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);

              _this.setState({
                error: _context.t0
              });

            case 12:
              _this.setState({
                isLoadingApp: false,
                isLoadingTable: false
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    })));

    _this.state = {
      isLoadingApp: true,
      isLoadingTable: false,
      isAdmin: false,
      areApiKeysEnabled: false,
      apiKeys: [],
      permissionDenied: false,
      selectedItems: [],
      error: undefined
    };
    return _this;
  }

  _createClass(APIKeysGridPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.checkPrivileges();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          permissionDenied = _this$state2.permissionDenied,
          isLoadingApp = _this$state2.isLoadingApp,
          isLoadingTable = _this$state2.isLoadingTable,
          areApiKeysEnabled = _this$state2.areApiKeysEnabled,
          isAdmin = _this$state2.isAdmin,
          error = _this$state2.error,
          apiKeys = _this$state2.apiKeys;

      if (permissionDenied) {
        return _react.default.createElement(_permission_denied.PermissionDenied, null);
      }

      if (isLoadingApp) {
        return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_section_loading.SectionLoading, {
          "data-test-subj": "apiKeysSectionLoading"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.apiKeys.table.loadingApiKeysDescription",
          defaultMessage: "Loading API keys\u2026"
        })));
      }

      if (error) {
        var _error$body = error.body,
            errorTitle = _error$body.error,
            message = _error$body.message,
            statusCode = _error$body.statusCode;
        return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiCallOut, {
          title: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.apiKeys.table.loadingApiKeysErrorTitle",
            defaultMessage: "Error loading API keys"
          }),
          color: "danger",
          iconType: "alert",
          "data-test-subj": "apiKeysError"
        }, statusCode, ": ", errorTitle, " - ", message));
      }

      if (!areApiKeysEnabled) {
        return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_not_enabled.NotEnabled, {
          docLinks: this.props.docLinks
        }));
      }

      if (!isLoadingTable && apiKeys && apiKeys.length === 0) {
        return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_empty_prompt.EmptyPrompt, {
          isAdmin: isAdmin,
          docLinks: this.props.docLinks
        }));
      }

      var description = _react.default.createElement(_eui.EuiText, {
        color: "subdued",
        size: "s",
        "data-test-subj": "apiKeysDescriptionText"
      }, _react.default.createElement("p", null, isAdmin ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.apiKeys.table.apiKeysAllDescription",
        defaultMessage: "View and invalidate API keys. An API key sends requests on behalf of a user."
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.apiKeys.table.apiKeysOwnDescription",
        defaultMessage: "View and invalidate your API keys. An API key sends requests on your behalf."
      })));

      return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.apiKeys.table.apiKeysTitle",
        defaultMessage: "API Keys"
      }))), description)), _react.default.createElement(_eui.EuiPageContentBody, null, this.renderTable()));
    }
  }, {
    key: "checkPrivileges",
    value: function () {
      var _checkPrivileges = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _ref6, isAdmin, areApiKeysEnabled;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.props.apiKeysAPIClient.checkPrivileges();

              case 3:
                _ref6 = _context2.sent;
                isAdmin = _ref6.isAdmin;
                areApiKeysEnabled = _ref6.areApiKeysEnabled;
                this.setState({
                  isAdmin: isAdmin,
                  areApiKeysEnabled: areApiKeysEnabled
                });

                if (areApiKeysEnabled) {
                  this.initiallyLoadApiKeys();
                } else {
                  // We're done loading and will just show the "Disabled" error.
                  this.setState({
                    isLoadingApp: false
                  });
                }

                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);

                if (_lodash.default.get(_context2.t0, 'body.statusCode') === 403) {
                  this.setState({
                    permissionDenied: true,
                    isLoadingApp: false
                  });
                } else {
                  this.props.notifications.toasts.addDanger(_i18n.i18n.translate('xpack.security.management.apiKeys.table.fetchingApiKeysErrorMessage', {
                    defaultMessage: 'Error checking privileges: {message}',
                    values: {
                      message: _lodash.default.get(_context2.t0, 'body.message', '')
                    }
                  }));
                }

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      function checkPrivileges() {
        return _checkPrivileges.apply(this, arguments);
      }

      return checkPrivileges;
    }()
  }]);

  return APIKeysGridPage;
}(_react.Component);

exports.APIKeysGridPage = APIKeysGridPage;