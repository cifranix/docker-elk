"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notificationService = exports.NotificationService = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NotificationService =
/*#__PURE__*/
function () {
  function NotificationService() {
    var _this = this;

    _classCallCheck(this, NotificationService);

    _defineProperty(this, "_toasts", void 0);

    _defineProperty(this, "addToasts", function (title, type, text) {
      _this._toasts.add({
        title: title,
        color: type,
        text: text
      });
    });
  }

  _createClass(NotificationService, [{
    key: "setup",
    value: function setup(notifications) {
      this._toasts = notifications.toasts;
    }
  }, {
    key: "showDangerToast",
    value: function showDangerToast(title, text) {
      this.addToasts(title, 'danger', text);
    }
  }, {
    key: "showWarningToast",
    value: function showWarningToast(title, text) {
      this.addToasts(title, 'warning', text);
    }
  }, {
    key: "showSuccessToast",
    value: function showSuccessToast(title, text) {
      this.addToasts(title, 'success', text);
    }
  }, {
    key: "toasts",
    get: function get() {
      return this._toasts;
    }
  }]);

  return NotificationService;
}();

exports.NotificationService = NotificationService;
var notificationService = new NotificationService();
exports.notificationService = notificationService;