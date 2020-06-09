"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.annotationProvider = annotationProvider;

var _boom = _interopRequireDefault(require("boom"));

var _lodash = _interopRequireDefault(require("lodash"));

var _annotations = require("../../../common/constants/annotations");

var _index_patterns = require("../../../common/constants/index_patterns");

var _annotations2 = require("../../../common/types/annotations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function annotationProvider(callAsCurrentUser) {
  async function indexAnnotation(annotation, username) {
    if ((0, _annotations2.isAnnotation)(annotation) === false) {
      // No need to translate, this will not be exposed in the UI.
      return Promise.reject(new Error('invalid annotation format'));
    }

    if (annotation.create_time === undefined) {
      annotation.create_time = new Date().getTime();
      annotation.create_username = username;
    }

    annotation.modified_time = new Date().getTime();
    annotation.modified_username = username;
    const params = {
      index: _index_patterns.ML_ANNOTATIONS_INDEX_ALIAS_WRITE,
      body: annotation,
      refresh: 'wait_for'
    };

    if (typeof annotation._id !== 'undefined') {
      params.id = annotation._id;
      delete params.body._id;
      delete params.body.key;
    }

    return await callAsCurrentUser('index', params);
  }

  async function getAnnotations({
    jobIds,
    earliestMs,
    latestMs,
    maxAnnotations
  }) {
    const obj = {
      success: true,
      annotations: {}
    };
    const boolCriteria = []; // Build the criteria to use in the bool filter part of the request.
    // Adds criteria for the time range plus any specified job IDs.
    // The nested must_not time range filter queries make sure that we fetch:
    // - annotations with start and end within the time range
    // - annotations that either start or end within the time range
    // - annotations that start before and end after the given time range
    // - but skip annotation that are completely outside the time range
    //   (the ones that start and end before or after the time range)

    if (earliestMs !== null && latestMs !== null) {
      boolCriteria.push({
        bool: {
          must_not: [{
            bool: {
              filter: [{
                range: {
                  timestamp: {
                    lte: earliestMs,
                    format: 'epoch_millis'
                  }
                }
              }, {
                range: {
                  end_timestamp: {
                    lte: earliestMs,
                    format: 'epoch_millis'
                  }
                }
              }]
            }
          }, {
            bool: {
              filter: [{
                range: {
                  timestamp: {
                    gte: latestMs,
                    format: 'epoch_millis'
                  }
                }
              }, {
                range: {
                  end_timestamp: {
                    gte: latestMs,
                    format: 'epoch_millis'
                  }
                }
              }]
            }
          }]
        }
      });
    }

    boolCriteria.push({
      exists: {
        field: 'annotation'
      }
    });

    if (jobIds && jobIds.length > 0 && !(jobIds.length === 1 && jobIds[0] === '*')) {
      let jobIdFilterStr = '';

      _lodash.default.each(jobIds, (jobId, i) => {
        jobIdFilterStr += `${i > 0 ? ' OR ' : ''}job_id:${jobId}`;
      });

      boolCriteria.push({
        query_string: {
          analyze_wildcard: false,
          query: jobIdFilterStr
        }
      });
    }

    const params = {
      index: _index_patterns.ML_ANNOTATIONS_INDEX_ALIAS_READ,
      size: maxAnnotations,
      body: {
        query: {
          bool: {
            filter: [{
              query_string: {
                query: `type:${_annotations.ANNOTATION_TYPE.ANNOTATION}`,
                analyze_wildcard: false
              }
            }, {
              bool: {
                must: boolCriteria
              }
            }]
          }
        }
      }
    };

    try {
      const resp = await callAsCurrentUser('search', params);

      if (resp.error !== undefined && resp.message !== undefined) {
        // No need to translate, this will not be exposed in the UI.
        throw new Error(`Annotations couldn't be retrieved from Elasticsearch.`);
      }

      const docs = _lodash.default.get(resp, ['hits', 'hits'], []).map(d => {
        // get the original source document and the document id, we need it
        // to identify the annotation when editing/deleting it.
        return { ...d._source,
          _id: d._id
        };
      });

      if ((0, _annotations2.isAnnotations)(docs) === false) {
        // No need to translate, this will not be exposed in the UI.
        throw new Error(`Annotations didn't pass integrity check.`);
      }

      docs.forEach(doc => {
        const jobId = doc.job_id;

        if (typeof obj.annotations[jobId] === 'undefined') {
          obj.annotations[jobId] = [];
        }

        obj.annotations[jobId].push(doc);
      });
      return obj;
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  }

  async function deleteAnnotation(id) {
    const param = {
      index: _index_patterns.ML_ANNOTATIONS_INDEX_ALIAS_WRITE,
      id,
      refresh: 'wait_for'
    };
    return await callAsCurrentUser('delete', param);
  }

  return {
    getAnnotations,
    indexAnnotation,
    deleteAnnotation
  };
}