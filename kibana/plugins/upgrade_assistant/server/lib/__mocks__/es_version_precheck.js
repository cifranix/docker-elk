"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EsVersionPrecheck = exports.mockedEsVersionPrecheckMethod = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const mockedEsVersionPrecheckMethod = jest.fn().mockResolvedValue(true);
exports.mockedEsVersionPrecheckMethod = mockedEsVersionPrecheckMethod;
const EsVersionPrecheck = {
  assign: 'esVersionCheck',
  method: mockedEsVersionPrecheckMethod
};
exports.EsVersionPrecheck = EsVersionPrecheck;