"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newJobCapsProvider = newJobCapsProvider;

var _field_service = require("./field_service");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function newJobCapsProvider(callWithRequest) {
  async function newJobCaps(indexPattern, isRollup = false, savedObjectsClient) {
    const fieldService = (0, _field_service.fieldServiceProvider)(indexPattern, isRollup, callWithRequest, savedObjectsClient);
    const {
      aggs,
      fields
    } = await fieldService.getData();
    convertForStringify(aggs, fields);
    return {
      [indexPattern]: {
        aggs,
        fields
      }
    };
  }

  return {
    newJobCaps
  };
} // replace the recursive field and agg references with a
// map of ids to allow it to be stringified for transportation
// over the network.


function convertForStringify(aggs, fields) {
  fields.forEach(f => {
    f.aggIds = f.aggs ? f.aggs.map(a => a.id) : [];
    delete f.aggs;
  });
  aggs.forEach(a => {
    if (a.fields !== undefined) {
      // if the aggregation supports fields, i.e. it's fields list isn't undefined,
      // create a list of field ids
      a.fieldIds = a.fields.map(f => f.id);
    }

    delete a.fields;
  });
}