"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformActionParams = transformActionParams;

var _mustache = _interopRequireDefault(require("mustache"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function transformActionParams({
  alertId,
  alertName,
  spaceId,
  tags,
  alertInstanceId,
  context,
  actionParams,
  state
}) {
  const result = (0, _lodash.cloneDeep)(actionParams, value => {
    if (!(0, _lodash.isString)(value)) return; // when the list of variables we pass in here changes,
    // the UI will need to be updated as well; see:
    // x-pack/plugins/triggers_actions_ui/public/application/lib/action_variables.ts

    const variables = {
      alertId,
      alertName,
      spaceId,
      tags,
      alertInstanceId,
      context,
      state
    };
    return _mustache.default.render(value, variables);
  }); // The return type signature for `cloneDeep()` ends up taking the return
  // type signature for the customizer, but rather than pollute the customizer
  // with casts, seemed better to just do it in one place, here.

  return result;
}