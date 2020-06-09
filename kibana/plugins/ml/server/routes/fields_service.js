"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldsService = fieldsService;

var _error_wrapper = require("../client/error_wrapper");

var _fields_service_schema = require("./schemas/fields_service_schema");

var _fields_service = require("../models/fields_service");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getCardinalityOfFields(context, payload) {
  const fs = (0, _fields_service.fieldsServiceProvider)(context.ml.mlClient.callAsCurrentUser);
  const {
    index,
    fieldNames,
    query,
    timeFieldName,
    earliestMs,
    latestMs
  } = payload;
  return fs.getCardinalityOfFields(index, fieldNames, query, timeFieldName, earliestMs, latestMs);
}

function getTimeFieldRange(context, payload) {
  const fs = (0, _fields_service.fieldsServiceProvider)(context.ml.mlClient.callAsCurrentUser);
  const {
    index,
    timeFieldName,
    query
  } = payload;
  return fs.getTimeFieldRange(index, timeFieldName, query);
}
/**
 * Routes for fields service
 */


function fieldsService({
  router,
  mlLicense
}) {
  /**
   * @apiGroup FieldsService
   *
   * @api {post} /api/ml/fields_service/field_cardinality Get cardinality of fields
   * @apiName GetCardinalityOfFields
   * @apiDescription Returns the cardinality of one or more fields. Returns an Object whose keys are the names of the fields, with values equal to the cardinality of the field
   */
  router.post({
    path: '/api/ml/fields_service/field_cardinality',
    validate: {
      body: _fields_service_schema.getCardinalityOfFieldsSchema
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const resp = await getCardinalityOfFields(context, request.body);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup FieldsService
   *
   * @api {post} /api/ml/fields_service/time_field_range Get time field range
   * @apiName GetTimeFieldRange
   * @apiDescription Returns the timefield range for the given index
   */

  router.post({
    path: '/api/ml/fields_service/time_field_range',
    validate: {
      body: _fields_service_schema.getTimeFieldRangeSchema
    }
  }, mlLicense.basicLicenseAPIGuard(async (context, request, response) => {
    try {
      const resp = await getTimeFieldRange(context, request.body);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
}