"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiFiltersRt = exports.rangeRt = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _date_as_string_rt = require("../../common/runtime_types/date_as_string_rt");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const rangeRt = t.type({
  start: _date_as_string_rt.dateAsStringRt,
  end: _date_as_string_rt.dateAsStringRt
});
exports.rangeRt = rangeRt;
const uiFiltersRt = t.type({
  uiFilters: t.string
});
exports.uiFiltersRt = uiFiltersRt;