"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useJobSelection = void 0;

var _lodash = require("lodash");

var _react = require("react");

var _i18n = require("@kbn/i18n");

var _dependency_cache = require("../../util/dependency_cache");

var _url_state = require("../../util/url_state");

var _job_select_service_utils = require("./job_select_service_utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// check that the ids read from the url exist by comparing them to the
// jobs loaded via mlJobsService.
function getInvalidJobIds(jobs, ids) {
  return ids.filter(function (id) {
    var jobExists = jobs.some(function (job) {
      return job.job_id === id;
    });
    return jobExists === false && id !== '*';
  });
}

function warnAboutInvalidJobIds(invalidIds) {
  if (invalidIds.length > 0) {
    var toastNotifications = (0, _dependency_cache.getToastNotifications)();
    toastNotifications.addWarning(_i18n.i18n.translate('xpack.ml.jobSelect.requestedJobsDoesNotExistWarningMessage', {
      defaultMessage: "Requested\n{invalidIdsLength, plural, one {job {invalidIds} does not exist} other {jobs {invalidIds} do not exist}}",
      values: {
        invalidIdsLength: invalidIds.length,
        invalidIds: invalidIds.join()
      }
    }));
  }
}

var useJobSelection = function useJobSelection(jobs, dateFormatTz) {
  var _globalState$ml, _ref, _globalState$ml2;

  var _useUrlState = (0, _url_state.useUrlState)('_g'),
      _useUrlState2 = _slicedToArray(_useUrlState, 2),
      globalState = _useUrlState2[0],
      setGlobalState = _useUrlState2[1];

  var jobSelection = {
    jobIds: [],
    selectedGroups: []
  };
  var ids = (globalState === null || globalState === void 0 ? void 0 : (_globalState$ml = globalState.ml) === null || _globalState$ml === void 0 ? void 0 : _globalState$ml.jobIds) || [];
  var tmpIds = (typeof ids === 'string' ? [ids] : ids).map(function (id) {
    return String(id);
  });
  var invalidIds = getInvalidJobIds(jobs, tmpIds);
  var validIds = (0, _lodash.difference)(tmpIds, invalidIds);
  validIds.sort();
  jobSelection.jobIds = validIds;
  jobSelection.selectedGroups = (_ref = globalState === null || globalState === void 0 ? void 0 : (_globalState$ml2 = globalState.ml) === null || _globalState$ml2 === void 0 ? void 0 : _globalState$ml2.groups) !== null && _ref !== void 0 ? _ref : [];
  (0, _react.useEffect)(function () {
    warnAboutInvalidJobIds(invalidIds);
  }, [invalidIds]);
  (0, _react.useEffect)(function () {
    // if there are no valid ids, warn and then select the first job
    if (validIds.length === 0 && jobs.length > 0) {
      var toastNotifications = (0, _dependency_cache.getToastNotifications)();
      toastNotifications.addWarning(_i18n.i18n.translate('xpack.ml.jobSelect.noJobsSelectedWarningMessage', {
        defaultMessage: 'No jobs selected, auto selecting first job'
      }));
      var mlGlobalState = (globalState === null || globalState === void 0 ? void 0 : globalState.ml) || {};
      mlGlobalState.jobIds = [jobs[0].job_id];
      var time = (0, _job_select_service_utils.getTimeRangeFromSelection)(jobs, mlGlobalState.jobIds);
      setGlobalState(_objectSpread({}, {
        ml: mlGlobalState
      }, {}, time !== undefined ? {
        time: time
      } : {}));
    }
  }, [jobs, validIds]);
  return jobSelection;
};

exports.useJobSelection = useJobSelection;