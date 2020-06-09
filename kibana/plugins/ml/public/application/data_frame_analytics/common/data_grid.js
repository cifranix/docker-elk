"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.euiDataGridToolbarSettings = exports.euiDataGridStyle = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var euiDataGridStyle = {
  border: 'all',
  fontSize: 's',
  cellPadding: 's',
  stripes: false,
  rowHover: 'none',
  header: 'shade'
};
exports.euiDataGridStyle = euiDataGridStyle;
var euiDataGridToolbarSettings = {
  showColumnSelector: true,
  showStyleSelector: false,
  showSortSelector: true,
  showFullScreenSelector: false
};
exports.euiDataGridToolbarSettings = euiDataGridToolbarSettings;