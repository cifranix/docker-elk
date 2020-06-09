"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiMetricService = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UiMetricService =
/*#__PURE__*/
function () {
  function UiMetricService(appName) {
    _classCallCheck(this, UiMetricService);

    this.appName = appName;

    _defineProperty(this, "usageCollection", void 0);
  }

  _createClass(UiMetricService, [{
    key: "setup",
    value: function setup(usageCollection) {
      this.usageCollection = usageCollection;
    }
  }, {
    key: "track",
    value: function track(name) {
      if (!this.usageCollection) {
        // Usage collection might have been disabled in Kibana config.
        return;
      }

      this.usageCollection.reportUiStats(this.appName, 'count', name);
    }
  }, {
    key: "trackUiMetric",
    value: function trackUiMetric(eventName) {
      return this.track(eventName);
    }
  }]);

  return UiMetricService;
}();

exports.UiMetricService = UiMetricService;