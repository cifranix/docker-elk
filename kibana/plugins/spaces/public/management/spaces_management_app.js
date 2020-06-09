"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spacesManagementApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRouterDom = require("react-router-dom");

var _i18n = require("@kbn/i18n");

var _spaces_grid = require("./spaces_grid");

var _edit_space = require("./edit_space");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var spacesManagementApp = Object.freeze({
  id: 'spaces',
  create: function create(_ref) {
    var getStartServices = _ref.getStartServices,
        spacesManager = _ref.spacesManager,
        securityLicense = _ref.securityLicense;
    return {
      id: this.id,
      order: 10,
      title: _i18n.i18n.translate('xpack.spaces.displayName', {
        defaultMessage: 'Spaces'
      }),
      mount: function mount(_ref2) {
        var basePath = _ref2.basePath,
            element = _ref2.element,
            setBreadcrumbs = _ref2.setBreadcrumbs;
        return _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var _ref3, _ref4, _ref4$, notifications, i18nStart, application, features, spacesBreadcrumbs, SpacesGridPageWithBreadcrumbs, CreateSpacePageWithBreadcrumbs, EditSpacePageWithBreadcrumbs;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return getStartServices();

                case 2:
                  _ref3 = _context.sent;
                  _ref4 = _slicedToArray(_ref3, 2);
                  _ref4$ = _ref4[0];
                  notifications = _ref4$.notifications;
                  i18nStart = _ref4$.i18n;
                  application = _ref4$.application;
                  features = _ref4[1].features;
                  spacesBreadcrumbs = [{
                    text: _i18n.i18n.translate('xpack.spaces.management.breadcrumb', {
                      defaultMessage: 'Spaces'
                    }),
                    href: "#".concat(basePath)
                  }];

                  SpacesGridPageWithBreadcrumbs = function SpacesGridPageWithBreadcrumbs() {
                    var _ref5;

                    setBreadcrumbs(spacesBreadcrumbs);
                    return _react.default.createElement(_spaces_grid.SpacesGridPage, {
                      capabilities: application.capabilities,
                      getFeatures: features.getFeatures,
                      notifications: notifications,
                      spacesManager: spacesManager,
                      securityEnabled: (_ref5 = securityLicense === null || securityLicense === void 0 ? void 0 : securityLicense.getFeatures().showLinks) !== null && _ref5 !== void 0 ? _ref5 : false
                    });
                  };

                  CreateSpacePageWithBreadcrumbs = function CreateSpacePageWithBreadcrumbs() {
                    var _ref6;

                    setBreadcrumbs([].concat(spacesBreadcrumbs, [{
                      text: _i18n.i18n.translate('xpack.spaces.management.createSpaceBreadcrumb', {
                        defaultMessage: 'Create'
                      })
                    }]));
                    return _react.default.createElement(_edit_space.ManageSpacePage, {
                      capabilities: application.capabilities,
                      getFeatures: features.getFeatures,
                      notifications: notifications,
                      spacesManager: spacesManager,
                      securityEnabled: (_ref6 = securityLicense === null || securityLicense === void 0 ? void 0 : securityLicense.getFeatures().showLinks) !== null && _ref6 !== void 0 ? _ref6 : false
                    });
                  };

                  EditSpacePageWithBreadcrumbs = function EditSpacePageWithBreadcrumbs() {
                    var _ref7;

                    var _useParams = (0, _reactRouterDom.useParams)(),
                        spaceId = _useParams.spaceId;

                    var onLoadSpace = function onLoadSpace(space) {
                      setBreadcrumbs([].concat(spacesBreadcrumbs, [{
                        text: space.name,
                        href: "#".concat(basePath, "/edit/").concat(encodeURIComponent(space.id))
                      }]));
                    };

                    return _react.default.createElement(_edit_space.ManageSpacePage, {
                      capabilities: application.capabilities,
                      getFeatures: features.getFeatures,
                      notifications: notifications,
                      spacesManager: spacesManager,
                      spaceId: spaceId,
                      onLoadSpace: onLoadSpace,
                      securityEnabled: (_ref7 = securityLicense === null || securityLicense === void 0 ? void 0 : securityLicense.getFeatures().showLinks) !== null && _ref7 !== void 0 ? _ref7 : false
                    });
                  };

                  (0, _reactDom.render)(_react.default.createElement(i18nStart.Context, null, _react.default.createElement(_reactRouterDom.HashRouter, {
                    basename: basePath
                  }, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
                    path: "/",
                    exact: true
                  }, _react.default.createElement(SpacesGridPageWithBreadcrumbs, null)), _react.default.createElement(_reactRouterDom.Route, {
                    path: "/create"
                  }, _react.default.createElement(CreateSpacePageWithBreadcrumbs, null)), _react.default.createElement(_reactRouterDom.Route, {
                    path: "/edit/:spaceId"
                  }, _react.default.createElement(EditSpacePageWithBreadcrumbs, null))))), element);
                  return _context.abrupt("return", function () {
                    (0, _reactDom.unmountComponentAtNode)(element);
                  });

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      }
    };
  }
});
exports.spacesManagementApp = spacesManagementApp;