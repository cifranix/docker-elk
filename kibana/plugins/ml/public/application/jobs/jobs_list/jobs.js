"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobsPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _navigation_menu = require("../../components/navigation_menu");

var _index = require("./components/jobs_list_view/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var JobsPage = function JobsPage(props) {
  return _react.default.createElement("div", {
    "data-test-subj": "mlPageJobManagement"
  }, _react.default.createElement(_navigation_menu.NavigationMenu, {
    tabId: "jobs"
  }), _react.default.createElement(_index.JobsListView, props));
};

exports.JobsPage = JobsPage;