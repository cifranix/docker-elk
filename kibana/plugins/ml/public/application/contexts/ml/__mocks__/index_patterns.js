"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexPatternsMock = void 0;

var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var indexPatternsMock = new (_temp = function _temp() {
  _classCallCheck(this, _temp);

  _defineProperty(this, "fieldFormats", []);

  _defineProperty(this, "config", {});

  _defineProperty(this, "savedObjectsClient", {});

  _defineProperty(this, "refreshSavedObjectsCache", {});

  _defineProperty(this, "clearCache", jest.fn());

  _defineProperty(this, "get", jest.fn());

  _defineProperty(this, "getDefault", jest.fn());

  _defineProperty(this, "getFields", jest.fn());

  _defineProperty(this, "getIds", jest.fn());

  _defineProperty(this, "getTitles", jest.fn());

  _defineProperty(this, "make", jest.fn());
}, _temp)();
exports.indexPatternsMock = indexPatternsMock;