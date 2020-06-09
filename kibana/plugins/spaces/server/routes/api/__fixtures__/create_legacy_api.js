"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLegacyAPI = void 0;

var _stream = require("stream");

var _streams = require("src/legacy/utils/streams");

var _server = require("src/core/server");

var _ = require(".");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function readStreamToCompletion(stream) {
  return await (0, _streams.createPromiseFromStreams)([stream, (0, _streams.createConcatStream)([])]);
}

const createLegacyAPI = ({
  spaces = (0, _.createSpaces)().map(s => ({
    id: s.id,
    ...s.attributes
  }))
} = {}) => {
  const mockSavedObjectsClientContract = {
    get: jest.fn((type, id) => {
      const result = spaces.filter(s => s.id === id);

      if (!result.length) {
        throw new Error(`not found: [${type}:${id}]`);
      }

      return result[0];
    }),
    find: jest.fn(() => {
      return {
        total: spaces.length,
        saved_objects: spaces
      };
    }),
    create: jest.fn((type, attributes, {
      id
    }) => {
      if (spaces.find(s => s.id === id)) {
        throw new Error('conflict');
      }

      return {};
    }),
    update: jest.fn((type, id) => {
      if (!spaces.find(s => s.id === id)) {
        throw new Error('not found: during update');
      }

      return {};
    }),
    delete: jest.fn((type, id) => {
      return {};
    }),
    deleteByNamespace: jest.fn()
  };
  const savedObjectsService = {
    types: ['visualization', 'dashboard', 'index-pattern', 'globalType'],
    schema: new _server.SavedObjectsSchema({
      space: {
        isNamespaceAgnostic: true,
        hidden: true
      },
      globalType: {
        isNamespaceAgnostic: true
      }
    }),
    getScopedSavedObjectsClient: jest.fn().mockResolvedValue(mockSavedObjectsClientContract),
    importExport: {
      objectLimit: 10000,
      getSortedObjectsForExport: jest.fn().mockResolvedValue(new _stream.Readable({
        objectMode: true,

        read() {
          this.push(null);
        }

      })),
      importSavedObjects: jest.fn().mockImplementation(async opts => {
        const objectsToImport = await readStreamToCompletion(opts.readStream);
        return {
          success: true,
          successCount: objectsToImport.length
        };
      }),
      resolveImportErrors: jest.fn().mockImplementation(async opts => {
        const objectsToImport = await readStreamToCompletion(opts.readStream);
        return {
          success: true,
          successCount: objectsToImport.length
        };
      })
    },
    SavedObjectsClient: {
      errors: {
        isNotFoundError: jest.fn(e => e.message.startsWith('not found:')),
        isConflictError: jest.fn(e => e.message.startsWith('conflict'))
      }
    }
  };
  const legacyAPI = {
    auditLogger: {},
    savedObjects: savedObjectsService
  };
  return legacyAPI;
};

exports.createLegacyAPI = createLegacyAPI;