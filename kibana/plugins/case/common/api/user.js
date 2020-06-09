"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRt = exports.UserRT = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const UserRT = rt.type({
  email: rt.union([rt.undefined, rt.null, rt.string]),
  full_name: rt.union([rt.undefined, rt.null, rt.string]),
  username: rt.union([rt.undefined, rt.null, rt.string])
});
exports.UserRT = UserRT;
const UsersRt = rt.array(UserRT);
exports.UsersRt = UsersRt;