"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LicensingPlugin = exports.licensingSessionStorageKey = void 0;

var _rxjs = require("rxjs");

var _license_update = require("../common/license_update");

var _license = require("../common/license");

var _expired_banner = require("./expired_banner");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var licensingSessionStorageKey = 'xpack.licensing';
/**
 * @public
 * A plugin for fetching, refreshing, and receiving information about the license for the
 * current Kibana instance.
 */

exports.licensingSessionStorageKey = licensingSessionStorageKey;

var LicensingPlugin =
/*#__PURE__*/
function () {
  /**
   * Used as a flag to halt all other plugin observables.
   */

  /**
   * A function to execute once the plugin's HTTP interceptor needs to stop listening.
   */
  function LicensingPlugin(context) {
    var _this = this;

    var storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sessionStorage;

    _classCallCheck(this, LicensingPlugin);

    this.storage = storage;

    _defineProperty(this, "stop$", new _rxjs.Subject());

    _defineProperty(this, "removeInterceptor", void 0);

    _defineProperty(this, "internalSubscription", void 0);

    _defineProperty(this, "isLicenseExpirationBannerShown", false);

    _defineProperty(this, "infoEndpoint", '/api/licensing/info');

    _defineProperty(this, "coreStart", void 0);

    _defineProperty(this, "prevSignature", void 0);

    _defineProperty(this, "fetchLicense",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(core) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return core.http.get({
                  path: _this.infoEndpoint,
                  asSystemRequest: true
                });

              case 3:
                response = _context.sent;
                return _context.abrupt("return", new _license.License({
                  license: response.license,
                  features: response.features,
                  signature: response.signature
                }));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", new _license.License({
                  error: _context.t0.message,
                  signature: ''
                }));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  /**
   * Fetch the objectified license and signature from storage.
   */


  _createClass(LicensingPlugin, [{
    key: "getSaved",
    value: function getSaved() {
      var raw = this.storage.getItem(licensingSessionStorageKey);
      if (!raw) return;
      return _license.License.fromJSON(JSON.parse(raw));
    }
    /**
     * Store the given license and signature in storage.
     */

  }, {
    key: "save",
    value: function save(license) {
      this.storage.setItem(licensingSessionStorageKey, JSON.stringify(license));
    }
    /**
     * Clear license and signature information from storage.
     */

  }, {
    key: "removeSaved",
    value: function removeSaved() {
      this.storage.removeItem(licensingSessionStorageKey);
    }
  }, {
    key: "setup",
    value: function setup(core) {
      var _this2 = this;

      var signatureUpdated$ = new _rxjs.Subject();

      var _createLicenseUpdate = (0, _license_update.createLicenseUpdate)(signatureUpdated$, this.stop$, function () {
        return _this2.fetchLicense(core);
      }, this.getSaved()),
          license$ = _createLicenseUpdate.license$,
          refreshManually = _createLicenseUpdate.refreshManually;

      this.internalSubscription = license$.subscribe(function (license) {
        if (license.isAvailable) {
          _this2.prevSignature = license.signature;

          _this2.save(license);
        } else {
          _this2.prevSignature = undefined; // Prevent reusing stale license if the fetch operation fails

          _this2.removeSaved();
        }

        if (license.status === 'expired' && !_this2.isLicenseExpirationBannerShown && _this2.coreStart) {
          _this2.isLicenseExpirationBannerShown = true;

          _this2.showExpiredBanner(license);
        }
      });
      this.removeInterceptor = core.http.intercept({
        response: function () {
          var _response = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(httpResponse) {
            var signatureHeader;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!core.http.anonymousPaths.isAnonymous(window.location.pathname)) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt("return", httpResponse);

                  case 2:
                    if (httpResponse.response) {
                      signatureHeader = httpResponse.response.headers.get('kbn-license-sig');

                      if (_this2.prevSignature !== signatureHeader) {
                        if (!httpResponse.request.url.includes(_this2.infoEndpoint)) {
                          signatureUpdated$.next();
                        }
                      }
                    }

                    return _context2.abrupt("return", httpResponse);

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function response(_x2) {
            return _response.apply(this, arguments);
          }

          return response;
        }()
      });
      return {
        refresh: refreshManually,
        license$: license$
      };
    }
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(core) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.coreStart = core;

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function start(_x3) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "stop",
    value: function stop() {
      this.stop$.next();
      this.stop$.complete();

      if (this.removeInterceptor !== undefined) {
        this.removeInterceptor();
      }

      if (this.internalSubscription !== undefined) {
        this.internalSubscription.unsubscribe();
        this.internalSubscription = undefined;
      }
    }
  }, {
    key: "showExpiredBanner",
    value: function showExpiredBanner(license) {
      var uploadUrl = this.coreStart.http.basePath.prepend('/app/kibana#/management/elasticsearch/license_management/upload_license');
      this.coreStart.overlays.banners.add((0, _expired_banner.mountExpiredBanner)({
        type: license.type,
        uploadUrl: uploadUrl
      }));
    }
  }]);

  return LicensingPlugin;
}();

exports.LicensingPlugin = LicensingPlugin;