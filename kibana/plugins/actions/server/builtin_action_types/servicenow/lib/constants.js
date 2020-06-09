"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_INCIDENT_URL = exports.COMMENT_URL = exports.USER_URL = exports.INCIDENT_URL = exports.API_VERSION = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const API_VERSION = 'v2';
exports.API_VERSION = API_VERSION;
const INCIDENT_URL = `api/now/${API_VERSION}/table/incident`;
exports.INCIDENT_URL = INCIDENT_URL;
const USER_URL = `api/now/${API_VERSION}/table/sys_user?user_name=`;
exports.USER_URL = USER_URL;
const COMMENT_URL = `api/now/${API_VERSION}/table/incident`; // Based on: https://docs.servicenow.com/bundle/orlando-platform-user-interface/page/use/navigation/reference/r_NavigatingByURLExamples.html

exports.COMMENT_URL = COMMENT_URL;
const VIEW_INCIDENT_URL = `nav_to.do?uri=incident.do?sys_id=`;
exports.VIEW_INCIDENT_URL = VIEW_INCIDENT_URL;