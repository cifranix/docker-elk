"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertNavigationRegistry = void 0;

var _i18n = require("@kbn/i18n");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_HANDLER = Symbol('*');

var AlertNavigationRegistry =
/*#__PURE__*/
function () {
  function AlertNavigationRegistry() {
    _classCallCheck(this, AlertNavigationRegistry);

    _defineProperty(this, "alertNavigations", new Map());
  }

  _createClass(AlertNavigationRegistry, [{
    key: "has",
    value: function has(consumer, alertType) {
      return this.hasTypedHandler(consumer, alertType) || this.hasDefaultHandler(consumer);
    }
  }, {
    key: "hasTypedHandler",
    value: function hasTypedHandler(consumer, alertType) {
      var _ref, _this$alertNavigation;

      return (_ref = (_this$alertNavigation = this.alertNavigations.get(consumer)) === null || _this$alertNavigation === void 0 ? void 0 : _this$alertNavigation.has(alertType.id)) !== null && _ref !== void 0 ? _ref : false;
    }
  }, {
    key: "hasDefaultHandler",
    value: function hasDefaultHandler(consumer) {
      var _ref2, _this$alertNavigation2;

      return (_ref2 = (_this$alertNavigation2 = this.alertNavigations.get(consumer)) === null || _this$alertNavigation2 === void 0 ? void 0 : _this$alertNavigation2.has(DEFAULT_HANDLER)) !== null && _ref2 !== void 0 ? _ref2 : false;
    }
  }, {
    key: "createConsumerNavigation",
    value: function createConsumerNavigation(consumer) {
      var consumerNavigations = new Map();
      this.alertNavigations.set(consumer, consumerNavigations);
      return consumerNavigations;
    }
  }, {
    key: "registerDefault",
    value: function registerDefault(consumer, handler) {
      var _this$alertNavigation3;

      if (this.hasDefaultHandler(consumer)) {
        throw new Error(_i18n.i18n.translate('xpack.alerting.alertNavigationRegistry.register.duplicateDefaultError', {
          defaultMessage: 'Default Navigation within "{consumer}" is already registered.',
          values: {
            consumer: consumer
          }
        }));
      }

      var consumerNavigations = (_this$alertNavigation3 = this.alertNavigations.get(consumer)) !== null && _this$alertNavigation3 !== void 0 ? _this$alertNavigation3 : this.createConsumerNavigation(consumer);
      consumerNavigations.set(DEFAULT_HANDLER, handler);
    }
  }, {
    key: "register",
    value: function register(consumer, alertType, handler) {
      var _this$alertNavigation4;

      if (this.hasTypedHandler(consumer, alertType)) {
        throw new Error(_i18n.i18n.translate('xpack.alerting.alertNavigationRegistry.register.duplicateNavigationError', {
          defaultMessage: 'Navigation for Alert type "{alertType}" within "{consumer}" is already registered.',
          values: {
            alertType: alertType.id,
            consumer: consumer
          }
        }));
      }

      var consumerNavigations = (_this$alertNavigation4 = this.alertNavigations.get(consumer)) !== null && _this$alertNavigation4 !== void 0 ? _this$alertNavigation4 : this.createConsumerNavigation(consumer);
      consumerNavigations.set(alertType.id, handler);
    }
  }, {
    key: "get",
    value: function get(consumer, alertType) {
      if (this.has(consumer, alertType)) {
        var _consumerHandlers$get;

        var consumerHandlers = this.alertNavigations.get(consumer);
        return (_consumerHandlers$get = consumerHandlers.get(alertType.id)) !== null && _consumerHandlers$get !== void 0 ? _consumerHandlers$get : consumerHandlers.get(DEFAULT_HANDLER);
      }

      throw new Error(_i18n.i18n.translate('xpack.alerting.alertNavigationRegistry.get.missingNavigationError', {
        defaultMessage: 'Navigation for Alert type "{alertType}" within "{consumer}" is not registered.',
        values: {
          alertType: alertType.id,
          consumer: consumer
        }
      }));
    }
  }]);

  return AlertNavigationRegistry;
}();

exports.AlertNavigationRegistry = AlertNavigationRegistry;