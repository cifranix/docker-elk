"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldServiceProvider = fieldServiceProvider;

var _lodash = require("lodash");

var _fields = require("../../../../common/types/fields");

var _server = require("../../../../../../../src/plugins/data/server");

var _aggregation_types = require("../../../../common/constants/aggregation_types");

var _rollup = require("./rollup");

var _aggregations = require("./aggregations");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const supportedTypes = [_server.ES_FIELD_TYPES.DATE, _server.ES_FIELD_TYPES.KEYWORD, _server.ES_FIELD_TYPES.TEXT, _server.ES_FIELD_TYPES.DOUBLE, _server.ES_FIELD_TYPES.INTEGER, _server.ES_FIELD_TYPES.FLOAT, _server.ES_FIELD_TYPES.LONG, _server.ES_FIELD_TYPES.BYTE, _server.ES_FIELD_TYPES.HALF_FLOAT, _server.ES_FIELD_TYPES.SCALED_FLOAT, _server.ES_FIELD_TYPES.SHORT, _server.ES_FIELD_TYPES.IP, _server.ES_FIELD_TYPES.GEO_POINT, _server.ES_FIELD_TYPES.GEO_SHAPE, _server.ES_FIELD_TYPES.BOOLEAN];

function fieldServiceProvider(indexPattern, isRollup, callWithRequest, savedObjectsClient) {
  return new FieldsService(indexPattern, isRollup, callWithRequest, savedObjectsClient);
}

class FieldsService {
  constructor(indexPattern, isRollup, callWithRequest, savedObjectsClient) {
    _defineProperty(this, "_indexPattern", void 0);

    _defineProperty(this, "_isRollup", void 0);

    _defineProperty(this, "_callWithRequest", void 0);

    _defineProperty(this, "_savedObjectsClient", void 0);

    this._indexPattern = indexPattern;
    this._isRollup = isRollup;
    this._callWithRequest = callWithRequest;
    this._savedObjectsClient = savedObjectsClient;
  }

  async loadFieldCaps() {
    return this._callWithRequest('fieldCaps', {
      index: this._indexPattern,
      fields: '*'
    });
  } // create field object from the results from _field_caps


  async createFields() {
    const fieldCaps = await this.loadFieldCaps();
    const fields = [];

    if (fieldCaps && fieldCaps.fields) {
      Object.keys(fieldCaps.fields).forEach(k => {
        const fc = fieldCaps.fields[k];
        const firstKey = Object.keys(fc)[0];

        if (firstKey !== undefined) {
          const field = fc[firstKey]; // add to the list of fields if the field type can be used by ML

          if (supportedTypes.includes(field.type) === true) {
            fields.push({
              id: k,
              name: k,
              type: field.type,
              aggregatable: field.aggregatable,
              aggs: []
            });
          }
        }
      });
    }

    return fields.sort((a, b) => a.id.localeCompare(b.id));
  } // public function to load fields from _field_caps and create a list
  // of aggregations and fields that can be used for an ML job
  // if the index is a rollup, the fields and aggs will be filtered
  // based on what is available in the rollup job
  // the _indexPattern will be replaced with a comma separated list
  // of index patterns from all of the rollup jobs


  async getData() {
    let rollupFields = {};

    if (this._isRollup) {
      const rollupService = await (0, _rollup.rollupServiceProvider)(this._indexPattern, this._callWithRequest, this._savedObjectsClient);
      const rollupConfigs = await rollupService.getRollupJobs(); // if a rollup index has been specified, yet there are no
      // rollup configs, return with no results

      if (rollupConfigs === null) {
        return {
          aggs: [],
          fields: []
        };
      } else {
        rollupFields = combineAllRollupFields(rollupConfigs);
        this._indexPattern = rollupService.getIndexPattern();
      }
    }

    const aggs = (0, _lodash.cloneDeep)([..._aggregations.aggregations, ..._aggregations.mlOnlyAggregations]);
    const fields = await this.createFields();
    return await combineFieldsAndAggs(fields, aggs, rollupFields);
  }

} // cross reference fields and aggs.
// fields contain a list of aggs that are compatible, and vice versa.


async function combineFieldsAndAggs(fields, aggs, rollupFields) {
  const keywordFields = getKeywordFields(fields);
  const textFields = getTextFields(fields);
  const numericalFields = getNumericalFields(fields);
  const ipFields = getIpFields(fields);
  const geoFields = getGeoFields(fields);
  const isRollup = Object.keys(rollupFields).length > 0;
  const mix = mixFactory(isRollup, rollupFields);
  aggs.forEach(a => {
    if (a.type === _fields.METRIC_AGG_TYPE && a.fields !== undefined) {
      switch (a.id) {
        case _aggregation_types.ML_JOB_AGGREGATION.LAT_LONG:
          geoFields.forEach(f => mix(f, a));
          break;

        case _aggregation_types.ML_JOB_AGGREGATION.INFO_CONTENT:
        case _aggregation_types.ML_JOB_AGGREGATION.HIGH_INFO_CONTENT:
        case _aggregation_types.ML_JOB_AGGREGATION.LOW_INFO_CONTENT:
          textFields.forEach(f => mix(f, a));

        case _aggregation_types.ML_JOB_AGGREGATION.DISTINCT_COUNT:
        case _aggregation_types.ML_JOB_AGGREGATION.HIGH_DISTINCT_COUNT:
        case _aggregation_types.ML_JOB_AGGREGATION.LOW_DISTINCT_COUNT:
          // distinct count (i.e. cardinality) takes keywords, ips
          // as well as numerical fields
          keywordFields.forEach(f => mix(f, a));
          ipFields.forEach(f => mix(f, a));
        // note, no break to fall through to add numerical fields.

        default:
          // all other aggs take numerical fields
          numericalFields.forEach(f => {
            mix(f, a);
          });
          break;
      }
    }
  });
  return {
    aggs,
    fields: isRollup ? filterFields(fields) : fields
  };
} // remove fields that have no aggs associated to them, unless they are date fields


function filterFields(fields) {
  return fields.filter(f => f.aggs && (f.aggs.length > 0 || f.aggs.length === 0 && f.type === _server.ES_FIELD_TYPES.DATE));
} // returns a mix function that is used to cross-reference aggs and fields.
// wrapped in a provider to allow filtering based on rollup job capabilities


function mixFactory(isRollup, rollupFields) {
  return function mix(field, agg) {
    if (isRollup === false || rollupFields[field.id] && rollupFields[field.id].find(f => f.agg === agg.dslName)) {
      if (field.aggs !== undefined) {
        field.aggs.push(agg);
      }

      if (agg.fields !== undefined) {
        agg.fields.push(field);
      }
    }
  };
}

function combineAllRollupFields(rollupConfigs) {
  const rollupFields = {};
  rollupConfigs.forEach(conf => {
    Object.keys(conf.fields).forEach(fieldName => {
      if (rollupFields[fieldName] === undefined) {
        rollupFields[fieldName] = conf.fields[fieldName];
      } else {
        const aggs = conf.fields[fieldName];
        aggs.forEach(agg => {
          if (rollupFields[fieldName].find(f => f.agg === agg.agg) === null) {
            rollupFields[fieldName].push(agg);
          }
        });
      }
    });
  });
  return rollupFields;
}

function getKeywordFields(fields) {
  return fields.filter(f => f.type === _server.ES_FIELD_TYPES.KEYWORD);
}

function getTextFields(fields) {
  return fields.filter(f => f.type === _server.ES_FIELD_TYPES.TEXT);
}

function getIpFields(fields) {
  return fields.filter(f => f.type === _server.ES_FIELD_TYPES.IP);
}

function getNumericalFields(fields) {
  return fields.filter(f => f.type === _server.ES_FIELD_TYPES.LONG || f.type === _server.ES_FIELD_TYPES.INTEGER || f.type === _server.ES_FIELD_TYPES.SHORT || f.type === _server.ES_FIELD_TYPES.BYTE || f.type === _server.ES_FIELD_TYPES.DOUBLE || f.type === _server.ES_FIELD_TYPES.FLOAT || f.type === _server.ES_FIELD_TYPES.HALF_FLOAT || f.type === _server.ES_FIELD_TYPES.SCALED_FLOAT);
}

function getGeoFields(fields) {
  return fields.filter(f => f.type === _server.ES_FIELD_TYPES.GEO_POINT || f.type === _server.ES_FIELD_TYPES.GEO_SHAPE);
}