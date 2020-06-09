"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spacesSavedObjectsClientWrapperFactory = spacesSavedObjectsClientWrapperFactory;

var _spaces_saved_objects_client = require("./spaces_saved_objects_client");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function spacesSavedObjectsClientWrapperFactory(spacesService, types) {
  return ({
    client,
    request
  }) => new _spaces_saved_objects_client.SpacesSavedObjectsClient({
    baseClient: client,
    request,
    spacesService,
    types
  });
}