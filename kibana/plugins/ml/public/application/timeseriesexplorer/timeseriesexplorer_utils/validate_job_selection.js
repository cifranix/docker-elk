"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateJobSelection = validateJobSelection;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _dependency_cache = require("../../util/dependency_cache");

var _job_select_service_utils = require("../../components/job_selector/job_select_service_utils");

var _job_service = require("../../services/job_service");

var _timeseriesexplorer_utils = require("./timeseriesexplorer_utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * returns true/false if setGlobalState has been triggered
 * or returns the job id which should be loaded.
 */
function validateJobSelection(jobsWithTimeRange, selectedJobIds, setGlobalState) {
  var toastNotifications = (0, _dependency_cache.getToastNotifications)();
  var jobs = (0, _timeseriesexplorer_utils.createTimeSeriesJobData)(_job_service.mlJobService.jobs);
  var timeSeriesJobIds = jobs.map(function (j) {
    return j.id;
  }); // Check if any of the jobs set in the URL are not time series jobs
  // (e.g. if switching to this view straight from the Anomaly Explorer).

  var invalidIds = (0, _lodash.difference)(selectedJobIds, timeSeriesJobIds);

  var validSelectedJobIds = _lodash.without.apply(void 0, [selectedJobIds].concat(_toConsumableArray(invalidIds)));

  if (invalidIds.length > 0) {
    var warningText = _i18n.i18n.translate('xpack.ml.timeSeriesExplorer.canNotViewRequestedJobsWarningMessage', {
      defaultMessage: "You can't view requested {invalidIdsCount, plural, one {job} other {jobs}} {invalidIds} in this dashboard",
      values: {
        invalidIdsCount: invalidIds.length,
        invalidIds: invalidIds.join(', ')
      }
    });

    if (validSelectedJobIds.length === 0 && timeSeriesJobIds.length > 0) {
      warningText += _i18n.i18n.translate('xpack.ml.timeSeriesExplorer.autoSelectingFirstJobText', {
        defaultMessage: ', auto selecting first job'
      });
    }

    toastNotifications.addWarning(warningText);
  }

  if (validSelectedJobIds.length > 1) {
    // if more than one job, select the first job from the selection.
    toastNotifications.addWarning(_i18n.i18n.translate('xpack.ml.timeSeriesExplorer.youCanViewOneJobAtTimeWarningMessage', {
      defaultMessage: 'You can only view one job at a time in this dashboard'
    }));
    setGlobalState('ml', {
      jobIds: [validSelectedJobIds[0]]
    });
    return true;
  } else if (invalidIds.length > 0 && validSelectedJobIds.length > 0) {
    // if some ids have been filtered out because they were invalid.
    // refresh the URL with the first valid id
    setGlobalState('ml', {
      jobIds: [validSelectedJobIds[0]]
    });
    return true;
  } else if (validSelectedJobIds.length === 1) {
    // normal behavior. a job ID has been loaded from the URL
    // Clear the detectorIndex, entities and forecast info.
    return validSelectedJobIds[0];
  } else if (validSelectedJobIds.length === 0 && jobs.length > 0) {
    // no jobs were loaded from the URL, so add the first job
    // from the full jobs list.
    var jobIds = [jobs[0].id];
    var time = (0, _job_select_service_utils.getTimeRangeFromSelection)(jobsWithTimeRange, jobIds);
    setGlobalState(_objectSpread({}, {
      ml: {
        jobIds: jobIds
      }
    }, {}, time !== undefined ? {
      time: time
    } : {}));
    return true;
  } else {
    // Jobs exist, but no time series jobs.
    return false;
  }
}