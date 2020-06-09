"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  useTrackPageview: true,
  useUiTracker: true,
  UiTracker: true,
  TrackMetricOptions: true,
  METRIC_TYPE: true
};
Object.defineProperty(exports, "useTrackPageview", {
  enumerable: true,
  get: function get() {
    return _use_track_metric.useTrackPageview;
  }
});
Object.defineProperty(exports, "useUiTracker", {
  enumerable: true,
  get: function get() {
    return _use_track_metric.useUiTracker;
  }
});
Object.defineProperty(exports, "UiTracker", {
  enumerable: true,
  get: function get() {
    return _use_track_metric.UiTracker;
  }
});
Object.defineProperty(exports, "TrackMetricOptions", {
  enumerable: true,
  get: function get() {
    return _use_track_metric.TrackMetricOptions;
  }
});
Object.defineProperty(exports, "METRIC_TYPE", {
  enumerable: true,
  get: function get() {
    return _use_track_metric.METRIC_TYPE;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _action_menu = require("./components/action_menu");

Object.keys(_action_menu).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _action_menu[key];
    }
  });
});

var _use_track_metric = require("./hooks/use_track_metric");

var _typings = require("./typings");

Object.keys(_typings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _typings[key];
    }
  });
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var plugin = function plugin(context) {
  return new _plugin.Plugin(context);
};

exports.plugin = plugin;