"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateModelMemoryLimit = validateModelMemoryLimit;

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _validate_job_object = require("./validate_job_object");

var _calculate_model_memory_limit = require("../calculate_model_memory_limit");

var _validation = require("../../../common/constants/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// The minimum value the backend expects is 1MByte
const MODEL_MEMORY_LIMIT_MINIMUM_BYTES = 1048576;

async function validateModelMemoryLimit(callWithRequest, job, duration) {
  var _ref, _job$analysis_limits, _job$analysis_limits$, _ref2, _ref2$limits, _ref2$limits$max_mode;

  (0, _validate_job_object.validateJobObject)(job); // retrieve the model memory limit specified by the user in the job config.
  // note, this will probably be the auto generated value, unless the user has
  // over written it.

  const mml = (_ref = job === null || job === void 0 ? void 0 : (_job$analysis_limits = job.analysis_limits) === null || _job$analysis_limits === void 0 ? void 0 : (_job$analysis_limits$ = _job$analysis_limits.model_memory_limit) === null || _job$analysis_limits$ === void 0 ? void 0 : _job$analysis_limits$.toUpperCase()) !== null && _ref !== void 0 ? _ref : null;
  const messages = []; // check that mml is a valid data format

  if (mml !== null) {
    const mmlSplit = mml.match(/\d+(\w+)/);
    const unit = mmlSplit && mmlSplit.length === 2 ? mmlSplit[1] : null;

    if (unit === null || !_validation.ALLOWED_DATA_UNITS.includes(unit)) {
      messages.push({
        id: 'mml_value_invalid',
        mml
      }); // mml is not a valid data format.
      // abort all other tests

      return messages;
    }
  } // if there is no duration, do not run the estimate test


  const runCalcModelMemoryTest = duration && (duration === null || duration === void 0 ? void 0 : duration.start) !== undefined && (duration === null || duration === void 0 ? void 0 : duration.end) !== undefined; // retrieve the max_model_memory_limit value from the server
  // this will be unset unless the user has set this on their cluster

  const maxModelMemoryLimit = (_ref2 = await callWithRequest('ml.info')) === null || _ref2 === void 0 ? void 0 : (_ref2$limits = _ref2.limits) === null || _ref2$limits === void 0 ? void 0 : (_ref2$limits$max_mode = _ref2$limits.max_model_memory_limit) === null || _ref2$limits$max_mode === void 0 ? void 0 : _ref2$limits$max_mode.toUpperCase();

  if (runCalcModelMemoryTest) {
    const {
      modelMemoryLimit
    } = await (0, _calculate_model_memory_limit.calculateModelMemoryLimitProvider)(callWithRequest)(job.analysis_config, job.datafeed_config.indices.join(','), job.datafeed_config.query, job.data_description.time_field, duration.start, duration.end, true); // @ts-ignore

    const mmlEstimateBytes = (0, _numeral.default)(modelMemoryLimit).value();
    let runEstimateGreaterThenMml = true; // if max_model_memory_limit has been set,
    // make sure the estimated value is not greater than it.

    if (typeof maxModelMemoryLimit !== 'undefined') {
      // @ts-ignore
      const maxMmlBytes = (0, _numeral.default)(maxModelMemoryLimit).value();

      if (mmlEstimateBytes > maxMmlBytes) {
        runEstimateGreaterThenMml = false;
        messages.push({
          id: 'estimated_mml_greater_than_max_mml',
          maxModelMemoryLimit,
          modelMemoryLimit
        });
      }
    } // check to see if the estimated mml is greater that the user
    // specified mml
    // do not run this if we've already found that it's larger than
    // the max mml


    if (runEstimateGreaterThenMml && mml !== null) {
      // @ts-ignore
      const mmlBytes = (0, _numeral.default)(mml).value();

      if (mmlBytes < MODEL_MEMORY_LIMIT_MINIMUM_BYTES) {
        messages.push({
          id: 'mml_value_invalid',
          mml
        });
      } else if (mmlEstimateBytes / 2 > mmlBytes) {
        messages.push({
          id: 'half_estimated_mml_greater_than_mml',
          maxModelMemoryLimit,
          mml
        });
      } else if (mmlEstimateBytes > mmlBytes) {
        messages.push({
          id: 'estimated_mml_greater_than_mml',
          maxModelMemoryLimit,
          mml
        });
      }
    }
  } // if max_model_memory_limit has been set,
  // make sure the user defined MML is not greater than it


  if (maxModelMemoryLimit !== undefined && mml !== null) {
    // @ts-ignore
    const maxMmlBytes = (0, _numeral.default)(maxModelMemoryLimit).value(); // @ts-ignore

    const mmlBytes = (0, _numeral.default)(mml).value();

    if (mmlBytes > maxMmlBytes) {
      messages.push({
        id: 'mml_greater_than_max_mml',
        maxModelMemoryLimit,
        mml
      });
    }
  }

  if (messages.length === 0 && runCalcModelMemoryTest === true) {
    messages.push({
      id: 'success_mml'
    });
  }

  return messages;
}