"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRichDetectors = getRichDetectors;
exports.createFieldOptions = createFieldOptions;
exports.createMlcategoryFieldOption = createMlcategoryFieldOption;
exports.createDocCountFieldOption = createDocCountFieldOption;
exports.isSparseDataJob = isSparseDataJob;
exports.convertToMultiMetricJob = convertToMultiMetricJob;
exports.convertToAdvancedJob = convertToAdvancedJob;
exports.resetJob = resetJob;
exports.advancedStartDatafeed = advancedStartDatafeed;
exports.aggFieldPairsCanBeCharted = aggFieldPairsCanBeCharted;
exports.getJobCreatorTitle = getJobCreatorTitle;
exports.collectAggs = collectAggs;

var _i18n = require("@kbn/i18n");

var _new_job_capabilities_service = require("../../../../../services/new_job_capabilities_service");

var _aggregation_types = require("../../../../../../../common/constants/aggregation_types");

var _field_types = require("../../../../../../../common/constants/field_types");

var _public = require("../../../../../../../../../../src/plugins/data/public");

var _fields = require("../../../../../../../common/types/fields");

var _job_service = require("../../../../../services/job_service");

var _index = require("../index");

var _new_job = require("../../../../../../../common/constants/new_job");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getFieldByIdFactory = function getFieldByIdFactory(additionalFields) {
  return function (id) {
    var field = _new_job_capabilities_service.newJobCapsService.getFieldById(id); // if no field could be found it may be a pretend field, like mlcategory or a script field


    if (field === null) {
      if (id === _field_types.MLCATEGORY) {
        field = _fields.mlCategory;
      } else if (additionalFields.length) {
        field = additionalFields.find(function (f) {
          return f.id === id;
        }) || null;
      }
    }

    return field;
  };
}; // populate the detectors with Field and Agg objects loaded from the job capabilities service


function getRichDetectors(job, datafeed, additionalFields) {
  var advanced = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var detectors = advanced ? getDetectorsAdvanced(job, datafeed) : getDetectors(job, datafeed);
  var getFieldById = getFieldByIdFactory(additionalFields);
  return detectors.map(function (d) {
    var field = null;
    var byField = null;
    var overField = null;
    var partitionField = null;

    if (d.field_name !== undefined) {
      field = getFieldById(d.field_name);
    }

    if (d.by_field_name !== undefined) {
      byField = getFieldById(d.by_field_name);
    }

    if (d.over_field_name !== undefined) {
      overField = getFieldById(d.over_field_name);
    }

    if (d.partition_field_name !== undefined) {
      partitionField = getFieldById(d.partition_field_name);
    }

    return {
      agg: _new_job_capabilities_service.newJobCapsService.getAggById(d.function),
      field: field,
      byField: byField,
      overField: overField,
      partitionField: partitionField,
      excludeFrequent: d.exclude_frequent || null,
      description: d.detector_description || null
    };
  });
}

function createFieldOptions(fields, additionalFields) {
  return [].concat(_toConsumableArray(fields.filter(function (f) {
    return f.id !== _fields.EVENT_RATE_FIELD_ID;
  }).map(function (f) {
    return {
      label: f.name
    };
  })), _toConsumableArray(additionalFields.filter(function (f) {
    return fields.some(function (f2) {
      return f2.id === f.id;
    }) === false;
  }).map(function (f) {
    return {
      label: f.id
    };
  }))).sort(function (a, b) {
    return a.label.localeCompare(b.label);
  });
}

function createMlcategoryFieldOption(categorizationFieldName) {
  if (categorizationFieldName === null) {
    return [];
  }

  return [{
    label: _field_types.MLCATEGORY
  }];
}

function createDocCountFieldOption(usingAggregations) {
  return usingAggregations ? [{
    label: _field_types.DOC_COUNT
  }] : [];
}

function getDetectorsAdvanced(job, datafeed) {
  return processFieldlessAggs(job.analysis_config.detectors);
}

function getDetectors(job, datafeed) {
  var detectors = job.analysis_config.detectors;
  var sparseData = isSparseDataJob(job, datafeed); // if aggregations have been used in a single metric job and a distinct count detector
  // was used, we need to rebuild the detector.

  if (datafeed.aggregations !== undefined && job.analysis_config.detectors[0].function === _aggregation_types.ML_JOB_AGGREGATION.NON_ZERO_COUNT && sparseData === false) {
    var _datafeed$aggregation, _datafeed$aggregation2, _datafeed$aggregation3, _datafeed$aggregation4, _datafeed$aggregation5;

    // distinct count detector, field has been removed.
    // determine field from datafeed aggregations
    var field = datafeed === null || datafeed === void 0 ? void 0 : (_datafeed$aggregation = datafeed.aggregations) === null || _datafeed$aggregation === void 0 ? void 0 : (_datafeed$aggregation2 = _datafeed$aggregation.buckets) === null || _datafeed$aggregation2 === void 0 ? void 0 : (_datafeed$aggregation3 = _datafeed$aggregation2.aggregations) === null || _datafeed$aggregation3 === void 0 ? void 0 : (_datafeed$aggregation4 = _datafeed$aggregation3.dc_region) === null || _datafeed$aggregation4 === void 0 ? void 0 : (_datafeed$aggregation5 = _datafeed$aggregation4.cardinality) === null || _datafeed$aggregation5 === void 0 ? void 0 : _datafeed$aggregation5.field;

    if (field !== undefined) {
      detectors = [{
        function: _aggregation_types.ML_JOB_AGGREGATION.DISTINCT_COUNT,
        field_name: field
      }];
    }
  } else {
    // all other detectors.
    detectors = processFieldlessAggs(detectors);
    detectors = detectors.map(function (d) {
      switch (d.function) {
        // if sparse data functions were used, replace them with their non-sparse versions
        // the sparse data flag has already been determined and set, so this information is not being lost.
        case _aggregation_types.ML_JOB_AGGREGATION.NON_ZERO_COUNT:
          return _objectSpread({}, d, {
            field_name: _fields.EVENT_RATE_FIELD_ID,
            function: _aggregation_types.ML_JOB_AGGREGATION.COUNT
          });

        case _aggregation_types.ML_JOB_AGGREGATION.HIGH_NON_ZERO_COUNT:
          return _objectSpread({}, d, {
            field_name: _fields.EVENT_RATE_FIELD_ID,
            function: _aggregation_types.ML_JOB_AGGREGATION.HIGH_COUNT
          });

        case _aggregation_types.ML_JOB_AGGREGATION.LOW_NON_ZERO_COUNT:
          return _objectSpread({}, d, {
            field_name: _fields.EVENT_RATE_FIELD_ID,
            function: _aggregation_types.ML_JOB_AGGREGATION.LOW_COUNT
          });

        case _aggregation_types.ML_JOB_AGGREGATION.NON_NULL_SUM:
          return _objectSpread({}, d, {
            function: _aggregation_types.ML_JOB_AGGREGATION.SUM
          });

        case _aggregation_types.ML_JOB_AGGREGATION.HIGH_NON_NULL_SUM:
          return _objectSpread({}, d, {
            function: _aggregation_types.ML_JOB_AGGREGATION.HIGH_SUM
          });

        case _aggregation_types.ML_JOB_AGGREGATION.LOW_NON_NULL_SUM:
          return _objectSpread({}, d, {
            function: _aggregation_types.ML_JOB_AGGREGATION.LOW_SUM
          });

        default:
          return d;
      }
    });
  }

  return detectors;
} // if a fieldless function is used, add EVENT_RATE_FIELD_ID as its field


function processFieldlessAggs(detectors) {
  return detectors.map(function (d) {
    switch (d.function) {
      case _aggregation_types.ML_JOB_AGGREGATION.COUNT:
      case _aggregation_types.ML_JOB_AGGREGATION.HIGH_COUNT:
      case _aggregation_types.ML_JOB_AGGREGATION.LOW_COUNT:
      case _aggregation_types.ML_JOB_AGGREGATION.NON_ZERO_COUNT:
      case _aggregation_types.ML_JOB_AGGREGATION.HIGH_NON_ZERO_COUNT:
      case _aggregation_types.ML_JOB_AGGREGATION.LOW_NON_ZERO_COUNT:
      case _aggregation_types.ML_JOB_AGGREGATION.RARE:
      case _aggregation_types.ML_JOB_AGGREGATION.FREQ_RARE:
      case _aggregation_types.ML_JOB_AGGREGATION.TIME_OF_DAY:
      case _aggregation_types.ML_JOB_AGGREGATION.TIME_OF_WEEK:
        return _objectSpread({}, d, {
          field_name: _fields.EVENT_RATE_FIELD_ID
        });

      default:
        return d;
    }
  });
} // determine whether the job has been configured to run on sparse data
// by looking to see whether the datafeed contains a dc_region field in an aggregation
// if it does, it is a distinct count single metric job and no a sparse data job.
// this check is needed because distinct count jobs also use NON_ZERO_COUNT


function isSparseDataJob(job, datafeed) {
  var _datafeed$aggregation6, _datafeed$aggregation7, _datafeed$aggregation8, _datafeed$aggregation9, _datafeed$aggregation10;

  var detectors = job.analysis_config.detectors;
  var distinctCountField = datafeed === null || datafeed === void 0 ? void 0 : (_datafeed$aggregation6 = datafeed.aggregations) === null || _datafeed$aggregation6 === void 0 ? void 0 : (_datafeed$aggregation7 = _datafeed$aggregation6.buckets) === null || _datafeed$aggregation7 === void 0 ? void 0 : (_datafeed$aggregation8 = _datafeed$aggregation7.aggregations) === null || _datafeed$aggregation8 === void 0 ? void 0 : (_datafeed$aggregation9 = _datafeed$aggregation8.dc_region) === null || _datafeed$aggregation9 === void 0 ? void 0 : (_datafeed$aggregation10 = _datafeed$aggregation9.cardinality) === null || _datafeed$aggregation10 === void 0 ? void 0 : _datafeed$aggregation10.field; // if distinctCountField is undefined, and any detectors contain a sparse data function
  // return true

  if (distinctCountField === undefined) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = detectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var detector = _step.value;

        if (_aggregation_types.SPARSE_DATA_AGGREGATIONS.includes(detector.function)) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return false;
}

function stashCombinedJob(jobCreator) {
  var skipTimeRangeStep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var includeTimeRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var combinedJob = _objectSpread({}, jobCreator.jobConfig, {
    datafeed_config: jobCreator.datafeedConfig
  });

  _job_service.mlJobService.tempJobCloningObjects.job = combinedJob; // skip over the time picker step of the wizard

  _job_service.mlJobService.tempJobCloningObjects.skipTimeRangeStep = skipTimeRangeStep;

  if (includeTimeRange === true) {
    // auto select the start and end dates of the time picker
    _job_service.mlJobService.tempJobCloningObjects.start = jobCreator.start;
    _job_service.mlJobService.tempJobCloningObjects.end = jobCreator.end;
  }

  _job_service.mlJobService.tempJobCloningObjects.calendars = jobCreator.calendars;
}

function convertToMultiMetricJob(jobCreator) {
  jobCreator.createdBy = _new_job.CREATED_BY_LABEL.MULTI_METRIC;
  jobCreator.modelPlot = false;
  stashCombinedJob(jobCreator, true, true);
  window.location.href = window.location.href.replace(_new_job.JOB_TYPE.SINGLE_METRIC, _new_job.JOB_TYPE.MULTI_METRIC);
}

function convertToAdvancedJob(jobCreator) {
  jobCreator.createdBy = null;
  stashCombinedJob(jobCreator, true, true);
  var jobType = _new_job.JOB_TYPE.SINGLE_METRIC;

  if ((0, _index.isMultiMetricJobCreator)(jobCreator)) {
    jobType = _new_job.JOB_TYPE.MULTI_METRIC;
  } else if ((0, _index.isPopulationJobCreator)(jobCreator)) {
    jobType = _new_job.JOB_TYPE.POPULATION;
  } else if ((0, _index.isCategorizationJobCreator)(jobCreator)) {
    jobType = _new_job.JOB_TYPE.CATEGORIZATION;
  }

  window.location.href = window.location.href.replace(jobType, _new_job.JOB_TYPE.ADVANCED);
}

function resetJob(jobCreator) {
  jobCreator.jobId = '';
  stashCombinedJob(jobCreator, true, true);
  window.location.href = '#/jobs/new_job';
}

function advancedStartDatafeed(jobCreator) {
  stashCombinedJob(jobCreator, false, false);
  window.location.href = '#/jobs';
}

function aggFieldPairsCanBeCharted(afs) {
  return afs.some(function (a) {
    return a.agg.dslName === null;
  }) === false;
}

function getJobCreatorTitle(jobCreator) {
  switch (jobCreator.type) {
    case _new_job.JOB_TYPE.SINGLE_METRIC:
      return _i18n.i18n.translate('xpack.ml.newJob.wizard.jobCreatorTitle.singleMetric', {
        defaultMessage: 'Single metric'
      });

    case _new_job.JOB_TYPE.MULTI_METRIC:
      return _i18n.i18n.translate('xpack.ml.newJob.wizard.jobCreatorTitle.multiMetric', {
        defaultMessage: 'Multi metric'
      });

    case _new_job.JOB_TYPE.POPULATION:
      return _i18n.i18n.translate('xpack.ml.newJob.wizard.jobCreatorTitle.population', {
        defaultMessage: 'Population'
      });

    case _new_job.JOB_TYPE.ADVANCED:
      return _i18n.i18n.translate('xpack.ml.newJob.wizard.jobCreatorTitle.advanced', {
        defaultMessage: 'Advanced'
      });

    case _new_job.JOB_TYPE.CATEGORIZATION:
      return _i18n.i18n.translate('xpack.ml.newJob.wizard.jobCreatorTitle.categorization', {
        defaultMessage: 'Categorization'
      });

    default:
      return '';
  }
} // recurse through a datafeed aggregation object,
// adding top level keys from each nested agg to an array
// of fields


function collectAggs(o, aggFields) {
  for (var i in o) {
    if (o[i] !== null && _typeof(o[i]) === 'object') {
      if (i === 'aggregations' || i === 'aggs') {
        Object.keys(o[i]).forEach(function (k) {
          if (k !== 'aggregations' && k !== 'aggs') {
            aggFields.push({
              id: k,
              name: k,
              type: _public.ES_FIELD_TYPES.KEYWORD,
              aggregatable: true
            });
          }
        });
      }

      collectAggs(o[i], aggFields);
    }
  }
}