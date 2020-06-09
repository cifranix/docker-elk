"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUserReserved = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isUserReserved = function isUserReserved(user) {
  var _ref, _user$metadata;

  return (_ref = (_user$metadata = user.metadata) === null || _user$metadata === void 0 ? void 0 : _user$metadata._reserved) !== null && _ref !== void 0 ? _ref : false;
};

exports.isUserReserved = isUserReserved;