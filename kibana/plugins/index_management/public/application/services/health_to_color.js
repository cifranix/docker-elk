"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.healthToColor = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var healthToColor = function healthToColor(health) {
  switch (health) {
    case 'green':
      return 'success';

    case 'yellow':
      return 'warning';

    case 'red':
      return 'danger';
  }
};

exports.healthToColor = healthToColor;