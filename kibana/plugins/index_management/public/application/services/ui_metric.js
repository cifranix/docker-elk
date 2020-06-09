"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUiMetricServiceInstance = exports.setUiMetricServiceInstance = exports.UiMetricService = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var uiMetricService;

var UiMetricService =
/*#__PURE__*/
function () {
  function UiMetricService(appName) {
    _classCallCheck(this, UiMetricService);

    _defineProperty(this, "appName", void 0);

    _defineProperty(this, "usageCollection", void 0);

    this.appName = appName;
  }

  _createClass(UiMetricService, [{
    key: "setup",
    value: function setup(usageCollection) {
      this.usageCollection = usageCollection;
    }
  }, {
    key: "track",
    value: function track(type, name) {
      if (!this.usageCollection) {
        // Usage collection might have been disabled in Kibana config.
        return;
      }

      this.usageCollection.reportUiStats(this.appName, type, name);
    }
  }, {
    key: "trackMetric",
    value: function trackMetric(type, eventName) {
      return this.track(type, eventName);
    }
  }]);

  return UiMetricService;
}();
/**
 * To minimize the refactor to migrate to NP where all deps should be explicitely declared
 * we will export here the instance created in our plugin.ts setup() so other parts of the code can access it.
 *
 * TODO: Refactor the api.ts (convert it to a class with setup()) and detail_panel.ts (reducer) to explicitely declare their dependency on the UiMetricService
 * @param instance UiMetricService instance from our plugin.ts setup()
 */


exports.UiMetricService = UiMetricService;

var setUiMetricServiceInstance = function setUiMetricServiceInstance(instance) {
  uiMetricService = instance;
};

exports.setUiMetricServiceInstance = setUiMetricServiceInstance;

var getUiMetricServiceInstance = function getUiMetricServiceInstance() {
  return uiMetricService;
};

exports.getUiMetricServiceInstance = getUiMetricServiceInstance;