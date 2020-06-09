"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptedSavedObjectsMock = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createEncryptedSavedObjectsSetupMock() {
  return {
    registerType: jest.fn(),
    __legacyCompat: {
      registerLegacyAPI: jest.fn()
    },
    usingEphemeralEncryptionKey: true
  };
}

function createEncryptedSavedObjectsStartMock() {
  return {
    isEncryptionError: jest.fn(),
    getDecryptedAsInternalUser: jest.fn()
  };
}

const encryptedSavedObjectsMock = {
  createSetup: createEncryptedSavedObjectsSetupMock,
  createStart: createEncryptedSavedObjectsStartMock
};
exports.encryptedSavedObjectsMock = encryptedSavedObjectsMock;