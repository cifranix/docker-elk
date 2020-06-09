"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEFT_PADDING_SIZE_FIELD_ITEM_WRAPPER = exports.CHILD_FIELD_INDENT_SIZE = exports.EUI_SIZE = exports.MAX_DEPTH_DEFAULT_EDITOR = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * The max nested depth allowed for child fields.
 * Above this thresold, the user has to use the JSON editor.
 */
var MAX_DEPTH_DEFAULT_EDITOR = 4;
/**
 * 16px is the default $euiSize Sass variable.
 * @link https://elastic.github.io/eui/#/guidelines/sass
 */

exports.MAX_DEPTH_DEFAULT_EDITOR = MAX_DEPTH_DEFAULT_EDITOR;
var EUI_SIZE = 16;
exports.EUI_SIZE = EUI_SIZE;
var CHILD_FIELD_INDENT_SIZE = EUI_SIZE * 1.5;
exports.CHILD_FIELD_INDENT_SIZE = CHILD_FIELD_INDENT_SIZE;
var LEFT_PADDING_SIZE_FIELD_ITEM_WRAPPER = EUI_SIZE * 0.25;
exports.LEFT_PADDING_SIZE_FIELD_ITEM_WRAPPER = LEFT_PADDING_SIZE_FIELD_ITEM_WRAPPER;