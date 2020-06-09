"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionTimeout = void 0;

var _broadcastChannel = require("broadcast-channel");

var _session_idle_timeout_warning = require("./session_idle_timeout_warning");

var _session_lifespan_warning = require("./session_lifespan_warning");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Client session timeout is decreased by this number so that Kibana server
 * can still access session content during logout request to properly clean
 * user session up (invalidate access tokens, redirect to logout portal etc.).
 */
var GRACE_PERIOD_MS = 5 * 1000;
/**
 * Duration we'll normally display the warning toast
 */

var WARNING_MS = 60 * 1000;
/**
 * Current session info is checked this number of milliseconds before the
 * warning toast shows. This will prevent the toast from being shown if the
 * session has already been extended.
 */

var SESSION_CHECK_MS = 1000;
/**
 * Route to get session info and extend session expiration
 */

var SESSION_ROUTE = '/internal/security/session';

var SessionTimeout =
/*#__PURE__*/
function () {
  function SessionTimeout(notifications, sessionExpired, http, tenant) {
    var _this = this;

    _classCallCheck(this, SessionTimeout);

    this.notifications = notifications;
    this.sessionExpired = sessionExpired;
    this.http = http;
    this.tenant = tenant;

    _defineProperty(this, "channel", void 0);

    _defineProperty(this, "sessionInfo", void 0);

    _defineProperty(this, "fetchTimer", void 0);

    _defineProperty(this, "warningTimer", void 0);

    _defineProperty(this, "expirationTimer", void 0);

    _defineProperty(this, "warningToast", void 0);

    _defineProperty(this, "fetchSessionInfoAndResetTimers",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var extend,
            method,
            result,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                extend = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
                method = extend ? 'POST' : 'GET';
                _context.prev = 2;
                _context.next = 5;
                return _this.http.fetch(SESSION_ROUTE, {
                  method: method,
                  asSystemRequest: !extend
                });

              case 5:
                result = _context.sent;

                _this.handleSessionInfoAndResetTimers(result); // share this updated session info with any other tabs to sync the UX


                if (_this.channel) {
                  _this.channel.postMessage(result);
                }

                _context.next = 12;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 10]]);
      }));

      return function () {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(this, "handleSessionInfoAndResetTimers", function (sessionInfo) {
      _this.sessionInfo = sessionInfo; // save the provider name in session storage, we will need it when we log out

      var key = "".concat(_this.tenant, "/session_provider");
      sessionStorage.setItem(key, sessionInfo.provider);

      var _this$getTimeout = _this.getTimeout(),
          timeout = _this$getTimeout.timeout,
          isLifespanTimeout = _this$getTimeout.isLifespanTimeout;

      if (timeout == null) {
        return;
      }

      _this.cleanup(); // set timers


      var timeoutVal = timeout - WARNING_MS - GRACE_PERIOD_MS - SESSION_CHECK_MS;

      if (timeoutVal > 0 && !isLifespanTimeout) {
        // we should check for the latest session info before the warning displays
        _this.fetchTimer = window.setTimeout(_this.fetchSessionInfoAndResetTimers, timeoutVal);
      }

      _this.warningTimer = window.setTimeout(_this.showWarning, Math.max(timeout - WARNING_MS - GRACE_PERIOD_MS, 0));
      _this.expirationTimer = window.setTimeout(function () {
        return _this.sessionExpired.logout();
      }, Math.max(timeout - GRACE_PERIOD_MS, 0));
    });

    _defineProperty(this, "cleanup", function () {
      if (_this.fetchTimer) {
        window.clearTimeout(_this.fetchTimer);
      }

      if (_this.warningTimer) {
        window.clearTimeout(_this.warningTimer);
      }

      if (_this.expirationTimer) {
        window.clearTimeout(_this.expirationTimer);
      }

      if (_this.warningToast) {
        _this.notifications.toasts.remove(_this.warningToast);

        _this.warningToast = undefined;
      }
    });

    _defineProperty(this, "getTimeout", function () {
      var timeout = null;
      var isLifespanTimeout = false;

      if (_this.sessionInfo) {
        var _this$sessionInfo = _this.sessionInfo,
            now = _this$sessionInfo.now,
            idleTimeoutExpiration = _this$sessionInfo.idleTimeoutExpiration,
            lifespanExpiration = _this$sessionInfo.lifespanExpiration;

        if (idleTimeoutExpiration) {
          timeout = idleTimeoutExpiration - now;
        }

        if (lifespanExpiration && (idleTimeoutExpiration === null || lifespanExpiration <= idleTimeoutExpiration)) {
          timeout = lifespanExpiration - now;
          isLifespanTimeout = true;
        }
      }

      return {
        timeout: timeout,
        isLifespanTimeout: isLifespanTimeout
      };
    });

    _defineProperty(this, "showWarning", function () {
      var _this$getTimeout2 = _this.getTimeout(),
          timeout = _this$getTimeout2.timeout,
          isLifespanTimeout = _this$getTimeout2.isLifespanTimeout;

      var toastLifeTimeMs = Math.min(timeout - GRACE_PERIOD_MS, WARNING_MS);
      var toast;

      if (!isLifespanTimeout) {
        var refresh = function refresh() {
          return _this.fetchSessionInfoAndResetTimers(true);
        };

        toast = (0, _session_idle_timeout_warning.createToast)(toastLifeTimeMs, refresh);
      } else {
        toast = (0, _session_lifespan_warning.createToast)(toastLifeTimeMs);
      }

      _this.warningToast = _this.notifications.toasts.add(toast);
    });
  }

  _createClass(SessionTimeout, [{
    key: "start",
    value: function start() {
      if (this.http.anonymousPaths.isAnonymous(window.location.pathname)) {
        return;
      } // subscribe to a broadcast channel for session timeout messages
      // this allows us to synchronize the UX across tabs and avoid repetitive API calls


      var name = "".concat(this.tenant, "/session_timeout");
      this.channel = new _broadcastChannel.BroadcastChannel(name, {
        webWorkerSupport: false
      });
      this.channel.onmessage = this.handleSessionInfoAndResetTimers; // Triggers an initial call to the endpoint to get session info;
      // when that returns, it will set the timeout

      return this.fetchSessionInfoAndResetTimers();
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.channel) {
        this.channel.close();
      }

      this.cleanup();
    }
    /**
     * When the user makes an authenticated, non-system API call, this function is used to check
     * and see if the session has been extended.
     * @param url The URL that was called
     */

  }, {
    key: "extend",
    value: function extend(url) {
      // avoid an additional API calls when the user clicks the button on the session idle timeout
      if (url.endsWith(SESSION_ROUTE)) {
        return;
      }

      var _this$getTimeout3 = this.getTimeout(),
          isLifespanTimeout = _this$getTimeout3.isLifespanTimeout;

      if (this.warningToast && !isLifespanTimeout) {
        // the idle timeout warning is currently showing and the user has clicked elsewhere on the page;
        // make a new call to get the latest session info
        return this.fetchSessionInfoAndResetTimers();
      }
    }
    /**
     * Fetch latest session information from the server, and optionally attempt to extend
     * the session expiration.
     */

  }]);

  return SessionTimeout;
}();

exports.SessionTimeout = SessionTimeout;