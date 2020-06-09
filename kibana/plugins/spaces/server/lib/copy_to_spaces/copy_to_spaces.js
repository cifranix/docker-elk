"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copySavedObjectsToSpacesFactory = copySavedObjectsToSpacesFactory;
exports.COPY_TO_SPACES_SAVED_OBJECTS_CLIENT_OPTS = void 0;

var _namespace = require("../utils/namespace");

var _get_eligible_types = require("./lib/get_eligible_types");

var _readable_stream_from_array = require("./lib/readable_stream_from_array");

var _create_empty_failure_response = require("./lib/create_empty_failure_response");

var _read_stream_to_completion = require("./lib/read_stream_to_completion");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const COPY_TO_SPACES_SAVED_OBJECTS_CLIENT_OPTS = {
  excludedWrappers: ['spaces']
};
exports.COPY_TO_SPACES_SAVED_OBJECTS_CLIENT_OPTS = COPY_TO_SPACES_SAVED_OBJECTS_CLIENT_OPTS;

function copySavedObjectsToSpacesFactory(savedObjectsClient, savedObjectsService) {
  const {
    importExport,
    types,
    schema
  } = savedObjectsService;
  const eligibleTypes = (0, _get_eligible_types.getEligibleTypes)({
    types,
    schema
  });

  const exportRequestedObjects = async (sourceSpaceId, options) => {
    const objectStream = await importExport.getSortedObjectsForExport({
      namespace: (0, _namespace.spaceIdToNamespace)(sourceSpaceId),
      includeReferencesDeep: options.includeReferences,
      excludeExportDetails: true,
      objects: options.objects,
      savedObjectsClient,
      exportSizeLimit: importExport.objectLimit
    });
    return (0, _read_stream_to_completion.readStreamToCompletion)(objectStream);
  };

  const importObjectsToSpace = async (spaceId, objectsStream, options) => {
    try {
      const importResponse = await importExport.importSavedObjects({
        namespace: (0, _namespace.spaceIdToNamespace)(spaceId),
        objectLimit: importExport.objectLimit,
        overwrite: options.overwrite,
        savedObjectsClient,
        supportedTypes: eligibleTypes,
        readStream: objectsStream
      });
      return {
        success: importResponse.success,
        successCount: importResponse.successCount,
        errors: importResponse.errors
      };
    } catch (error) {
      return (0, _create_empty_failure_response.createEmptyFailureResponse)([error]);
    }
  };

  const copySavedObjectsToSpaces = async (sourceSpaceId, destinationSpaceIds, options) => {
    const response = {};
    const exportedSavedObjects = await exportRequestedObjects(sourceSpaceId, options);

    for (const spaceId of destinationSpaceIds) {
      response[spaceId] = await importObjectsToSpace(spaceId, (0, _readable_stream_from_array.createReadableStreamFromArray)(exportedSavedObjects), options);
    }

    return response;
  };

  return copySavedObjectsToSpaces;
}