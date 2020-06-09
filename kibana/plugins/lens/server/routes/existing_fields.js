"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.existingFieldsRoute = existingFieldsRoute;
exports.buildFieldList = buildFieldList;
exports.existingFields = existingFields;

var _boom = _interopRequireDefault(require("boom"));

var _configSchema = require("@kbn/config-schema");

var _common = require("../../common");

var _server = require("../../../../../src/plugins/data/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * The number of docs to sample to determine field empty status.
 */
const SAMPLE_SIZE = 500;
// TODO: Pull this from kibana advanced settings
const metaFields = ['_source', '_id', '_type', '_index', '_score'];

async function existingFieldsRoute(setup) {
  const router = setup.http.createRouter();
  router.post({
    path: `${_common.BASE_API_URL}/existing_fields/{indexPatternId}`,
    validate: {
      params: _configSchema.schema.object({
        indexPatternId: _configSchema.schema.string()
      }),
      body: _configSchema.schema.object({
        dslQuery: _configSchema.schema.object({}, {
          unknowns: 'allow'
        }),
        fromDate: _configSchema.schema.maybe(_configSchema.schema.string()),
        toDate: _configSchema.schema.maybe(_configSchema.schema.string()),
        timeFieldName: _configSchema.schema.maybe(_configSchema.schema.string())
      })
    }
  }, async (context, req, res) => {
    try {
      return res.ok({
        body: await fetchFieldExistence({ ...req.params,
          ...req.body,
          context
        })
      });
    } catch (e) {
      if (e.status === 404) {
        return res.notFound();
      }

      if (e.isBoom) {
        if (e.output.statusCode === 404) {
          return res.notFound();
        }

        return res.internalError(e.output.message);
      } else {
        return res.internalError({
          body: _boom.default.internal(e.message || e.name)
        });
      }
    }
  });
}

async function fetchFieldExistence({
  context,
  indexPatternId,
  dslQuery = {
    match_all: {}
  },
  fromDate,
  toDate,
  timeFieldName
}) {
  const {
    indexPattern,
    indexPatternTitle,
    mappings,
    fieldDescriptors
  } = await fetchIndexPatternDefinition(indexPatternId, context);
  const fields = buildFieldList(indexPattern, mappings, fieldDescriptors);
  const docs = await fetchIndexPatternStats({
    fromDate,
    toDate,
    dslQuery,
    client: context.core.elasticsearch.dataClient,
    index: indexPatternTitle,
    timeFieldName: timeFieldName || indexPattern.attributes.timeFieldName,
    fields
  });
  return {
    indexPatternTitle,
    existingFieldNames: existingFields(docs, fields)
  };
}

async function fetchIndexPatternDefinition(indexPatternId, context) {
  const savedObjectsClient = context.core.savedObjects.client;
  const requestClient = context.core.elasticsearch.dataClient;
  const indexPattern = await savedObjectsClient.get('index-pattern', indexPatternId);
  const indexPatternTitle = indexPattern.attributes.title; // TODO: maybe don't use IndexPatternsFetcher at all, since we're only using it
  // to look up field values in the resulting documents. We can accomplish the same
  // using the mappings which we're also fetching here.

  const indexPatternsFetcher = new _server.IndexPatternsFetcher(requestClient.callAsCurrentUser);
  const [mappings, fieldDescriptors] = await Promise.all([requestClient.callAsCurrentUser('indices.getMapping', {
    index: indexPatternTitle
  }), indexPatternsFetcher.getFieldsForWildcard({
    pattern: indexPatternTitle,
    // TODO: Pull this from kibana advanced settings
    metaFields
  })]);
  return {
    indexPattern,
    indexPatternTitle,
    mappings,
    fieldDescriptors
  };
}
/**
 * Exported only for unit tests.
 */


function buildFieldList(indexPattern, mappings, fieldDescriptors) {
  const aliasMap = Object.entries(Object.values(mappings)[0].mappings.properties).map(([name, v]) => ({ ...v,
    name
  })).filter(f => f.type === 'alias').reduce((acc, f) => {
    acc[f.name] = f.path;
    return acc;
  }, {});
  const descriptorMap = fieldDescriptors.reduce((acc, f) => {
    acc[f.name] = f;
    return acc;
  }, {});
  return JSON.parse(indexPattern.attributes.fields).map(field => {
    var _descriptorMap$field$, _descriptorMap$field$2, _descriptorMap$field$3;

    const path = aliasMap[field.name] || ((_descriptorMap$field$ = descriptorMap[field.name]) === null || _descriptorMap$field$ === void 0 ? void 0 : (_descriptorMap$field$2 = _descriptorMap$field$.subType) === null || _descriptorMap$field$2 === void 0 ? void 0 : (_descriptorMap$field$3 = _descriptorMap$field$2.multi) === null || _descriptorMap$field$3 === void 0 ? void 0 : _descriptorMap$field$3.parent) || field.name;
    return {
      name: field.name,
      isScript: !!field.scripted,
      isAlias: !!aliasMap[field.name],
      path: path.split('.'),
      lang: field.lang,
      script: field.script
    };
  });
}

async function fetchIndexPatternStats({
  client,
  index,
  dslQuery,
  timeFieldName,
  fromDate,
  toDate,
  fields
}) {
  const filter = timeFieldName && fromDate && toDate ? [{
    range: {
      [timeFieldName]: {
        gte: fromDate,
        lte: toDate
      }
    }
  }, dslQuery] : [dslQuery];
  const query = {
    bool: {
      filter
    }
  };
  const scriptedFields = fields.filter(f => f.isScript);
  const result = await client.callAsCurrentUser('search', {
    index,
    body: {
      size: SAMPLE_SIZE,
      query,
      // _source is required because we are also providing script fields.
      _source: '*',
      script_fields: scriptedFields.reduce((acc, field) => {
        acc[field.name] = {
          script: {
            lang: field.lang,
            source: field.script
          }
        };
        return acc;
      }, {})
    }
  });
  return result.hits.hits;
}

function exists(obj, path, i = 0) {
  if (obj == null) {
    return false;
  }

  if (path.length === i) {
    return true;
  }

  if (Array.isArray(obj)) {
    return obj.some(child => exists(child, path, i));
  }

  if (typeof obj === 'object') {
    return exists(obj[path[i]], path, i + 1);
  }

  return path.length === i;
}
/**
 * Exported only for unit tests.
 */


function existingFields(docs, fields) {
  const missingFields = new Set(fields);

  for (const doc of docs) {
    if (missingFields.size === 0) {
      break;
    }

    missingFields.forEach(field => {
      if (exists(field.isScript ? doc.fields : doc._source, field.path)) {
        missingFields.delete(field);
      }
    });
  }

  return fields.filter(field => !missingFields.has(field)).map(f => f.name);
}