"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveCopySavedObjectsToSpacesConflictsFactory = resolveCopySavedObjectsToSpacesConflictsFactory;

var _namespace = require("../utils/namespace");

var _get_eligible_types = require("./lib/get_eligible_types");

var _create_empty_failure_response = require("./lib/create_empty_failure_response");

var _read_stream_to_completion = require("./lib/read_stream_to_completion");

var _readable_stream_from_array = require("./lib/readable_stream_from_array");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function resolveCopySavedObjectsToSpacesConflictsFactory(savedObjectsClient, savedObjectsService) {
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

  const resolveConflictsForSpace = async (spaceId, objectsStream, retries) => {
    try {
      const importResponse = await importExport.resolveImportErrors({
        namespace: (0, _namespace.spaceIdToNamespace)(spaceId),
        objectLimit: importExport.objectLimit,
        savedObjectsClient,
        supportedTypes: eligibleTypes,
        readStream: objectsStream,
        retries
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

  const resolveCopySavedObjectsToSpacesConflicts = async (sourceSpaceId, options) => {
    const response = {};
    const exportedSavedObjects = await exportRequestedObjects(sourceSpaceId, {
      includeReferences: options.includeReferences,
      objects: options.objects
    });

    for (const entry of Object.entries(options.retries)) {
      const [spaceId, entryRetries] = entry;
      const retries = entryRetries.map(retry => ({ ...retry,
        replaceReferences: []
      }));
      response[spaceId] = await resolveConflictsForSpace(spaceId, (0, _readable_stream_from_array.createReadableStreamFromArray)(exportedSavedObjects), retries);
    }

    return response;
  };

  return resolveCopySavedObjectsToSpacesConflicts;
}