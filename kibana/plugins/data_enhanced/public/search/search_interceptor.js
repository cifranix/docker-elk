"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnhancedSearchInterceptor = void 0;

var _long_query_notification = require("./long_query_notification");

var _public = require("../../../../../src/plugins/data/public");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EnhancedSearchInterceptor =
/*#__PURE__*/
function (_SearchInterceptor) {
  _inherits(EnhancedSearchInterceptor, _SearchInterceptor);

  /**
   * This class should be instantiated with a `requestTimeout` corresponding with how many ms after
   * requests are initiated that they should automatically cancel.
   * @param toasts The `core.notifications.toasts` service
   * @param application The `core.application` service
   * @param requestTimeout Usually config value `elasticsearch.requestTimeout`
   */
  function EnhancedSearchInterceptor(toasts, application, requestTimeout) {
    var _this;

    _classCallCheck(this, EnhancedSearchInterceptor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EnhancedSearchInterceptor).call(this, toasts, application, requestTimeout));

    _defineProperty(_assertThisInitialized(_this), "cancelPending", function () {
      _this.hideToast();

      _this.abortController.abort();

      _this.abortController = new AbortController();
    });

    _defineProperty(_assertThisInitialized(_this), "runBeyondTimeout", function () {
      _this.hideToast();

      _this.timeoutSubscriptions.forEach(function (subscription) {
        return subscription.unsubscribe();
      });

      _this.timeoutSubscriptions.clear();
    });

    _defineProperty(_assertThisInitialized(_this), "showToast", function () {
      if (_this.longRunningToast) return;
      _this.longRunningToast = _this.toasts.addInfo({
        title: 'Your query is taking awhile',
        text: (0, _long_query_notification.getLongQueryNotification)({
          cancel: _this.cancelPending,
          runBeyondTimeout: _this.runBeyondTimeout
        })
      }, {
        toastLifeTimeMs: 1000000
      });
    });

    return _this;
  }
  /**
   * Abort our `AbortController`, which in turn aborts any intercepted searches.
   */


  return EnhancedSearchInterceptor;
}(_public.SearchInterceptor);

exports.EnhancedSearchInterceptor = EnhancedSearchInterceptor;