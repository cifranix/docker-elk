"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAlertInstanceFactory = createAlertInstanceFactory;

var _alert_instance = require("./alert_instance");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createAlertInstanceFactory(alertInstances) {
  return id => {
    if (!alertInstances[id]) {
      alertInstances[id] = new _alert_instance.AlertInstance();
    }

    return alertInstances[id];
  };
}