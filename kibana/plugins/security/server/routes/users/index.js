"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineUsersRoutes = defineUsersRoutes;

var _get = require("./get");

var _get_all = require("./get_all");

var _create_or_update = require("./create_or_update");

var _delete = require("./delete");

var _change_password = require("./change_password");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function defineUsersRoutes(params) {
  (0, _get.defineGetUserRoutes)(params);
  (0, _get_all.defineGetAllUsersRoutes)(params);
  (0, _create_or_update.defineCreateOrUpdateUserRoutes)(params);
  (0, _delete.defineDeleteUserRoutes)(params);
  (0, _change_password.defineChangeUserPasswordRoutes)(params);
}