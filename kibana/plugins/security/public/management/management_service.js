"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManagementService = void 0;

var _i18n = require("@kbn/i18n");

var _api_keys = require("./api_keys");

var _role_mappings = require("./role_mappings");

var _roles = require("./roles");

var _users = require("./users");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ManagementService =
/*#__PURE__*/
function () {
  function ManagementService() {
    _classCallCheck(this, ManagementService);

    _defineProperty(this, "license", void 0);

    _defineProperty(this, "licenseFeaturesSubscription", void 0);
  }

  _createClass(ManagementService, [{
    key: "setup",
    value: function setup(_ref) {
      var getStartServices = _ref.getStartServices,
          management = _ref.management,
          authc = _ref.authc,
          license = _ref.license,
          fatalErrors = _ref.fatalErrors;
      this.license = license;
      var securitySection = management.sections.register({
        id: 'security',
        title: _i18n.i18n.translate('xpack.security.management.securityTitle', {
          defaultMessage: 'Security'
        }),
        order: 100,
        euiIconType: 'securityApp'
      });
      securitySection.registerApp(_users.usersManagementApp.create({
        authc: authc,
        getStartServices: getStartServices
      }));
      securitySection.registerApp(_roles.rolesManagementApp.create({
        fatalErrors: fatalErrors,
        license: license,
        getStartServices: getStartServices
      }));
      securitySection.registerApp(_api_keys.apiKeysManagementApp.create({
        getStartServices: getStartServices
      }));
      securitySection.registerApp(_role_mappings.roleMappingsManagementApp.create({
        getStartServices: getStartServices
      }));
    }
  }, {
    key: "start",
    value: function start(_ref2) {
      var management = _ref2.management;
      this.licenseFeaturesSubscription = this.license.features$.subscribe(
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(features) {
          var securitySection, securityManagementAppsStatuses, _i, _securityManagementAp, _securityManagementAp2, app, enableStatus;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  securitySection = management.sections.getSection('security');
                  securityManagementAppsStatuses = [[securitySection.getApp(_users.usersManagementApp.id), features.showLinks], [securitySection.getApp(_roles.rolesManagementApp.id), features.showLinks], [securitySection.getApp(_api_keys.apiKeysManagementApp.id), features.showLinks], [securitySection.getApp(_role_mappings.roleMappingsManagementApp.id), features.showLinks && features.showRoleMappingsManagement]]; // Iterate over all registered apps and update their enable status depending on the available
                  // license features.

                  _i = 0, _securityManagementAp = securityManagementAppsStatuses;

                case 3:
                  if (!(_i < _securityManagementAp.length)) {
                    _context.next = 11;
                    break;
                  }

                  _securityManagementAp2 = _slicedToArray(_securityManagementAp[_i], 2), app = _securityManagementAp2[0], enableStatus = _securityManagementAp2[1];

                  if (!(app.enabled === enableStatus)) {
                    _context.next = 7;
                    break;
                  }

                  return _context.abrupt("continue", 8);

                case 7:
                  if (enableStatus) {
                    app.enable();
                  } else {
                    app.disable();
                  }

                case 8:
                  _i++;
                  _context.next = 3;
                  break;

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.licenseFeaturesSubscription) {
        this.licenseFeaturesSubscription.unsubscribe();
        this.licenseFeaturesSubscription = undefined;
      }
    }
  }]);

  return ManagementService;
}();

exports.ManagementService = ManagementService;