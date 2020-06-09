"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CaseConfigureService", {
  enumerable: true,
  get: function () {
    return _configure.CaseConfigureService;
  }
});
Object.defineProperty(exports, "CaseConfigureServiceSetup", {
  enumerable: true,
  get: function () {
    return _configure.CaseConfigureServiceSetup;
  }
});
Object.defineProperty(exports, "CaseUserActionService", {
  enumerable: true,
  get: function () {
    return _user_actions.CaseUserActionService;
  }
});
Object.defineProperty(exports, "CaseUserActionServiceSetup", {
  enumerable: true,
  get: function () {
    return _user_actions.CaseUserActionServiceSetup;
  }
});
exports.CaseService = void 0;

var _saved_object_types = require("../saved_object_types");

var _read_reporters = require("./reporters/read_reporters");

var _read_tags = require("./tags/read_tags");

var _configure = require("./configure");

var _user_actions = require("./user_actions");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CaseService {
  constructor(log) {
    this.log = log;

    _defineProperty(this, "setup", async ({
      authentication
    }) => ({
      deleteCase: async ({
        client,
        caseId
      }) => {
        try {
          this.log.debug(`Attempting to GET case ${caseId}`);
          return await client.delete(_saved_object_types.CASE_SAVED_OBJECT, caseId);
        } catch (error) {
          this.log.debug(`Error on GET case ${caseId}: ${error}`);
          throw error;
        }
      },
      deleteComment: async ({
        client,
        commentId
      }) => {
        try {
          this.log.debug(`Attempting to GET comment ${commentId}`);
          return await client.delete(_saved_object_types.CASE_COMMENT_SAVED_OBJECT, commentId);
        } catch (error) {
          this.log.debug(`Error on GET comment ${commentId}: ${error}`);
          throw error;
        }
      },
      getCase: async ({
        client,
        caseId
      }) => {
        try {
          this.log.debug(`Attempting to GET case ${caseId}`);
          return await client.get(_saved_object_types.CASE_SAVED_OBJECT, caseId);
        } catch (error) {
          this.log.debug(`Error on GET case ${caseId}: ${error}`);
          throw error;
        }
      },
      getCases: async ({
        client,
        caseIds
      }) => {
        try {
          this.log.debug(`Attempting to GET cases ${caseIds.join(', ')}`);
          return await client.bulkGet(caseIds.map(caseId => ({
            type: _saved_object_types.CASE_SAVED_OBJECT,
            id: caseId
          })));
        } catch (error) {
          this.log.debug(`Error on GET cases ${caseIds.join(', ')}: ${error}`);
          throw error;
        }
      },
      getComment: async ({
        client,
        commentId
      }) => {
        try {
          this.log.debug(`Attempting to GET comment ${commentId}`);
          return await client.get(_saved_object_types.CASE_COMMENT_SAVED_OBJECT, commentId);
        } catch (error) {
          this.log.debug(`Error on GET comment ${commentId}: ${error}`);
          throw error;
        }
      },
      findCases: async ({
        client,
        options
      }) => {
        try {
          this.log.debug(`Attempting to GET all cases`);
          return await client.find({ ...options,
            type: _saved_object_types.CASE_SAVED_OBJECT
          });
        } catch (error) {
          this.log.debug(`Error on GET cases: ${error}`);
          throw error;
        }
      },
      getAllCaseComments: async ({
        client,
        caseId,
        options
      }) => {
        try {
          this.log.debug(`Attempting to GET all comments for case ${caseId}`);
          return await client.find({ ...options,
            type: _saved_object_types.CASE_COMMENT_SAVED_OBJECT,
            hasReference: {
              type: _saved_object_types.CASE_SAVED_OBJECT,
              id: caseId
            }
          });
        } catch (error) {
          this.log.debug(`Error on GET all comments for case ${caseId}: ${error}`);
          throw error;
        }
      },
      getReporters: async ({
        client
      }) => {
        try {
          this.log.debug(`Attempting to GET all reporters`);
          return await (0, _read_reporters.readReporters)({
            client
          });
        } catch (error) {
          this.log.debug(`Error on GET all reporters: ${error}`);
          throw error;
        }
      },
      getTags: async ({
        client
      }) => {
        try {
          this.log.debug(`Attempting to GET all cases`);
          return await (0, _read_tags.readTags)({
            client
          });
        } catch (error) {
          this.log.debug(`Error on GET cases: ${error}`);
          throw error;
        }
      },
      getUser: async ({
        request,
        response
      }) => {
        try {
          this.log.debug(`Attempting to authenticate a user`);

          if (authentication != null) {
            const user = authentication.getCurrentUser(request);

            if (!user) {
              return {
                username: null,
                full_name: null,
                email: null
              };
            }

            return user;
          }

          return {
            username: null,
            full_name: null,
            email: null
          };
        } catch (error) {
          this.log.debug(`Error on GET cases: ${error}`);
          throw error;
        }
      },
      postNewCase: async ({
        client,
        attributes
      }) => {
        try {
          this.log.debug(`Attempting to POST a new case`);
          return await client.create(_saved_object_types.CASE_SAVED_OBJECT, { ...attributes
          });
        } catch (error) {
          this.log.debug(`Error on POST a new case: ${error}`);
          throw error;
        }
      },
      postNewComment: async ({
        client,
        attributes,
        references
      }) => {
        try {
          this.log.debug(`Attempting to POST a new comment`);
          return await client.create(_saved_object_types.CASE_COMMENT_SAVED_OBJECT, attributes, {
            references
          });
        } catch (error) {
          this.log.debug(`Error on POST a new comment: ${error}`);
          throw error;
        }
      },
      patchCase: async ({
        client,
        caseId,
        updatedAttributes,
        version
      }) => {
        try {
          this.log.debug(`Attempting to UPDATE case ${caseId}`);
          return await client.update(_saved_object_types.CASE_SAVED_OBJECT, caseId, { ...updatedAttributes
          }, {
            version
          });
        } catch (error) {
          this.log.debug(`Error on UPDATE case ${caseId}: ${error}`);
          throw error;
        }
      },
      patchCases: async ({
        client,
        cases
      }) => {
        try {
          this.log.debug(`Attempting to UPDATE case ${cases.map(c => c.caseId).join(', ')}`);
          return await client.bulkUpdate(cases.map(c => ({
            type: _saved_object_types.CASE_SAVED_OBJECT,
            id: c.caseId,
            attributes: c.updatedAttributes,
            version: c.version
          })));
        } catch (error) {
          this.log.debug(`Error on UPDATE case ${cases.map(c => c.caseId).join(', ')}: ${error}`);
          throw error;
        }
      },
      patchComment: async ({
        client,
        commentId,
        updatedAttributes,
        version
      }) => {
        try {
          this.log.debug(`Attempting to UPDATE comment ${commentId}`);
          return await client.update(_saved_object_types.CASE_COMMENT_SAVED_OBJECT, commentId, { ...updatedAttributes
          }, {
            version
          });
        } catch (error) {
          this.log.debug(`Error on UPDATE comment ${commentId}: ${error}`);
          throw error;
        }
      },
      patchComments: async ({
        client,
        comments
      }) => {
        try {
          this.log.debug(`Attempting to UPDATE comments ${comments.map(c => c.commentId).join(', ')}`);
          return await client.bulkUpdate(comments.map(c => ({
            type: _saved_object_types.CASE_COMMENT_SAVED_OBJECT,
            id: c.commentId,
            attributes: c.updatedAttributes,
            version: c.version
          })));
        } catch (error) {
          this.log.debug(`Error on UPDATE comments ${comments.map(c => c.commentId).join(', ')}: ${error}`);
          throw error;
        }
      }
    }));
  }

}

exports.CaseService = CaseService;