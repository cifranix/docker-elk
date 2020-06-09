"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logEntryCategoriesResponseRT = exports.logEntryCategoryHitRT = exports.createLogEntryCategoriesQuery = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _elasticsearch_runtime_types = require("../../../utils/elasticsearch_runtime_types");

var _common = require("./common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createLogEntryCategoriesQuery = (logEntryCategoriesJobId, categoryIds) => ({ ..._common.defaultRequestParameters,
  body: {
    query: {
      bool: {
        filter: [...(0, _common.createCategoryIdFilters)(categoryIds)]
      }
    },
    _source: ['category_id', 'regex', 'terms']
  },
  index: (0, _common.getMlResultIndex)(logEntryCategoriesJobId),
  size: categoryIds.length
});

exports.createLogEntryCategoriesQuery = createLogEntryCategoriesQuery;
const logEntryCategoryHitRT = rt.type({
  _source: rt.type({
    category_id: rt.number,
    regex: rt.string,
    terms: rt.string
  })
});
exports.logEntryCategoryHitRT = logEntryCategoryHitRT;
const logEntryCategoriesResponseRT = rt.intersection([_elasticsearch_runtime_types.commonSearchSuccessResponseFieldsRT, rt.type({
  hits: rt.type({
    hits: rt.array(logEntryCategoryHitRT)
  })
})]);
exports.logEntryCategoriesResponseRT = logEntryCategoriesResponseRT;