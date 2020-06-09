"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockSavedObjectsRepository = void 0;

var _server = require("src/core/server");

var _saved_object_types = require("../../../saved_object_types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createMockSavedObjectsRepository = ({
  caseSavedObject = [],
  caseCommentSavedObject = []
}) => {
  const mockSavedObjectsClientContract = {
    bulkGet: jest.fn(objects => {
      return {
        saved_objects: objects.map(({
          id,
          type
        }) => {
          if (type === _saved_object_types.CASE_COMMENT_SAVED_OBJECT) {
            const result = caseCommentSavedObject.filter(s => s.id === id);

            if (!result.length) {
              throw _server.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
            }

            return result;
          }

          const result = caseSavedObject.filter(s => s.id === id);

          if (!result.length) {
            throw _server.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
          }

          return result[0];
        })
      };
    }),
    bulkUpdate: jest.fn(objects => {
      return {
        saved_objects: objects.map(({
          id,
          type,
          attributes
        }) => {
          if (type === _saved_object_types.CASE_COMMENT_SAVED_OBJECT) {
            if (!caseCommentSavedObject.find(s => s.id === id)) {
              throw _server.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
            }
          } else if (type === _saved_object_types.CASE_SAVED_OBJECT) {
            if (!caseSavedObject.find(s => s.id === id)) {
              throw _server.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
            }
          }

          return {
            id,
            type,
            updated_at: '2019-11-22T22:50:55.191Z',
            version: 'WzE3LDFd',
            attributes
          };
        })
      };
    }),
    get: jest.fn((type, id) => {
      if (type === _saved_object_types.CASE_COMMENT_SAVED_OBJECT) {
        const result = caseCommentSavedObject.filter(s => s.id === id);

        if (!result.length) {
          throw _server.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
        }

        return result[0];
      }

      const result = caseSavedObject.filter(s => s.id === id);

      if (!result.length) {
        throw _server.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
      }

      return result[0];
    }),
    find: jest.fn(findArgs => {
      if (findArgs.hasReference && findArgs.hasReference.id === 'bad-guy') {
        throw _server.SavedObjectsErrorHelpers.createBadRequestError('Error thrown for testing');
      }

      if (findArgs.type === _saved_object_types.CASE_COMMENT_SAVED_OBJECT) {
        return {
          page: 1,
          per_page: 5,
          total: caseCommentSavedObject.length,
          saved_objects: caseCommentSavedObject
        };
      }

      return {
        page: 1,
        per_page: 5,
        total: caseSavedObject.length,
        saved_objects: caseSavedObject
      };
    }),
    create: jest.fn((type, attributes, references) => {
      if (attributes.description === 'Throw an error' || attributes.comment === 'Throw an error') {
        throw _server.SavedObjectsErrorHelpers.createBadRequestError('Error thrown for testing');
      }

      if (type === _saved_object_types.CASE_COMMENT_SAVED_OBJECT) {
        const newCommentObj = {
          type,
          id: 'mock-comment',
          attributes,
          ...references,
          updated_at: '2019-12-02T22:48:08.327Z',
          version: 'WzksMV0='
        };
        caseCommentSavedObject = [...caseCommentSavedObject, newCommentObj];
        return newCommentObj;
      }

      return {
        type,
        id: 'mock-it',
        attributes,
        references: [],
        updated_at: '2019-12-02T22:48:08.327Z',
        version: 'WzksMV0='
      };
    }),
    update: jest.fn((type, id, attributes) => {
      if (type === _saved_object_types.CASE_COMMENT_SAVED_OBJECT) {
        if (!caseCommentSavedObject.find(s => s.id === id)) {
          throw _server.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
        }

        caseCommentSavedObject = [...caseCommentSavedObject, {
          id,
          type,
          updated_at: '2019-11-22T22:50:55.191Z',
          version: 'WzE3LDFd',
          attributes
        }];
      } else if (type === _saved_object_types.CASE_SAVED_OBJECT) {
        if (!caseSavedObject.find(s => s.id === id)) {
          throw _server.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
        }
      }

      return {
        id,
        type,
        updated_at: '2019-11-22T22:50:55.191Z',
        version: 'WzE3LDFd',
        attributes
      };
    }),
    delete: jest.fn((type, id) => {
      let result = caseSavedObject.filter(s => s.id === id);

      if (type === _saved_object_types.CASE_COMMENT_SAVED_OBJECT) {
        result = caseCommentSavedObject.filter(s => s.id === id);
      }

      if (type === _saved_object_types.CASE_COMMENT_SAVED_OBJECT && id === 'bad-guy') {
        throw _server.SavedObjectsErrorHelpers.createBadRequestError('Error thrown for testing');
      }

      if (!result.length) {
        throw _server.SavedObjectsErrorHelpers.createGenericNotFoundError(type, id);
      }

      return {};
    }),
    deleteByNamespace: jest.fn()
  };
  return mockSavedObjectsClientContract;
};

exports.createMockSavedObjectsRepository = createMockSavedObjectsRepository;