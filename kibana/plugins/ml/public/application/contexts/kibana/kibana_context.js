"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMlKibana = void 0;

var _public = require("../../../../../../../src/plugins/kibana_react/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line react-hooks/rules-of-hooks
var useMlKibana = function useMlKibana() {
  return (0, _public.useKibana)();
};

exports.useMlKibana = useMlKibana;