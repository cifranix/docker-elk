"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnvironments = getEnvironments;

var _get_all_environments = require("./get_all_environments");

var _get_existing_environments_for_service = require("./get_existing_environments_for_service");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getEnvironments({
  serviceName,
  setup
}) {
  const [allEnvironments, existingEnvironments] = await Promise.all([(0, _get_all_environments.getAllEnvironments)({
    serviceName,
    setup
  }), (0, _get_existing_environments_for_service.getExistingEnvironmentsForService)({
    serviceName,
    setup
  })]);
  return allEnvironments.map(environment => {
    return {
      name: environment,
      alreadyConfigured: existingEnvironments.includes(environment)
    };
  });
}