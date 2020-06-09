"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultSpace = createDefaultSpace;

var _i18n = require("@kbn/i18n");

var _constants = require("../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function createDefaultSpace({
  esClient,
  savedObjects
}) {
  const {
    getSavedObjectsRepository,
    SavedObjectsClient
  } = savedObjects;
  const savedObjectsRepository = getSavedObjectsRepository(esClient.callAsInternalUser, ['space']);
  const defaultSpaceExists = await doesDefaultSpaceExist(SavedObjectsClient, savedObjectsRepository);

  if (defaultSpaceExists) {
    return;
  }

  const options = {
    id: _constants.DEFAULT_SPACE_ID
  };

  try {
    await savedObjectsRepository.create('space', {
      name: _i18n.i18n.translate('xpack.spaces.defaultSpaceTitle', {
        defaultMessage: 'Default'
      }),
      description: _i18n.i18n.translate('xpack.spaces.defaultSpaceDescription', {
        defaultMessage: 'This is your default space!'
      }),
      color: '#00bfb3',
      disabledFeatures: [],
      _reserved: true
    }, options);
  } catch (error) {
    // Ignore conflict errors.
    // It is possible that another Kibana instance, or another invocation of this function
    // created the default space in the time it took this to complete.
    if (SavedObjectsClient.errors.isConflictError(error)) {
      return;
    }

    throw error;
  }
}

async function doesDefaultSpaceExist(SavedObjectsClient, savedObjectsRepository) {
  try {
    await savedObjectsRepository.get('space', _constants.DEFAULT_SPACE_ID);
    return true;
  } catch (e) {
    if (SavedObjectsClient.errors.isNotFoundError(e)) {
      return false;
    }

    throw e;
  }
}