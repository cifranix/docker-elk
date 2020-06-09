"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExecuteFunction = createExecuteFunction;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createExecuteFunction({
  getBasePath,
  taskManager,
  actionTypeRegistry,
  getScopedSavedObjectsClient,
  isESOUsingEphemeralEncryptionKey
}) {
  return async function execute({
    id,
    params,
    spaceId,
    apiKey
  }) {
    if (isESOUsingEphemeralEncryptionKey === true) {
      throw new Error(`Unable to execute action due to the Encrypted Saved Objects plugin using an ephemeral encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in kibana.yml`);
    }

    const requestHeaders = {};

    if (apiKey) {
      requestHeaders.authorization = `ApiKey ${apiKey}`;
    } // Since we're using API keys and accessing elasticsearch can only be done
    // via a request, we're faking one with the proper authorization headers.


    const fakeRequest = {
      headers: requestHeaders,
      getBasePath: () => getBasePath(spaceId),
      path: '/',
      route: {
        settings: {}
      },
      url: {
        href: '/'
      },
      raw: {
        req: {
          url: '/'
        }
      }
    };
    const savedObjectsClient = getScopedSavedObjectsClient(fakeRequest);
    const actionSavedObject = await savedObjectsClient.get('action', id);
    actionTypeRegistry.ensureActionTypeEnabled(actionSavedObject.attributes.actionTypeId);
    const actionTaskParamsRecord = await savedObjectsClient.create('action_task_params', {
      actionId: id,
      params,
      apiKey
    });
    await taskManager.schedule({
      taskType: `actions:${actionSavedObject.attributes.actionTypeId}`,
      params: {
        spaceId,
        actionTaskParamsId: actionTaskParamsRecord.id
      },
      state: {},
      scope: ['actions']
    });
  };
}