"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSavedObjects = setupSavedObjects;

var _encrypted_saved_objects_client_wrapper = require("./encrypted_saved_objects_client_wrapper");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function setupSavedObjects({
  service,
  savedObjects,
  getStartServices
}) {
  // Register custom saved object client that will encrypt, decrypt and strip saved object
  // attributes where appropriate for any saved object repository request. We choose max possible
  // priority for this wrapper to allow all other wrappers to set proper `namespace` for the Saved
  // Object (e.g. wrapper registered by the Spaces plugin) before we encrypt attributes since
  // `namespace` is included into AAD.
  savedObjects.addClientWrapper(Number.MAX_SAFE_INTEGER, 'encryptedSavedObjects', ({
    client: baseClient
  }) => new _encrypted_saved_objects_client_wrapper.EncryptedSavedObjectsClientWrapper({
    baseClient,
    service
  }));
  const internalRepositoryPromise = getStartServices().then(([core]) => core.savedObjects.createInternalRepository());
  return {
    getDecryptedAsInternalUser: async (type, id, options) => {
      const internalRepository = await internalRepositoryPromise;
      const savedObject = await internalRepository.get(type, id, options);
      return { ...savedObject,
        attributes: await service.decryptAttributes({
          type,
          id,
          namespace: options && options.namespace
        }, savedObject.attributes)
      };
    }
  };
}