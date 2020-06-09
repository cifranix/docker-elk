"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateToKibana660 = migrateToKibana660;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function migrateToKibana660(doc) {
  if (!doc.attributes.hasOwnProperty('disabledFeatures')) {
    doc.attributes.disabledFeatures = [];
  }

  return doc;
}