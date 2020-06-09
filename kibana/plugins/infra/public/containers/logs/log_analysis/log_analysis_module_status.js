"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModuleStatus = void 0;

var _react = require("react");

var _log_analysis = require("../../../../common/log_analysis");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createInitialState = function createInitialState(_ref) {
  var jobTypes = _ref.jobTypes,
      sourceConfiguration = _ref.sourceConfiguration;
  return {
    jobDefinitions: [],
    jobStatus: jobTypes.reduce(function (accumulatedJobStatus, jobType) {
      return _objectSpread({}, accumulatedJobStatus, _defineProperty({}, jobType, 'unknown'));
    }, {}),
    jobSummaries: [],
    lastSetupErrorMessages: [],
    setupStatus: 'initializing',
    sourceConfiguration: sourceConfiguration
  };
};

var createStatusReducer = function createStatusReducer(jobTypes) {
  return function (state, action) {
    switch (action.type) {
      case 'startedSetup':
        {
          return _objectSpread({}, state, {
            jobStatus: jobTypes.reduce(function (accumulatedJobStatus, jobType) {
              return _objectSpread({}, accumulatedJobStatus, _defineProperty({}, jobType, 'initializing'));
            }, {}),
            setupStatus: 'pending'
          });
        }

      case 'finishedSetup':
        {
          var jobs = action.jobs,
              datafeeds = action.datafeeds,
              spaceId = action.spaceId,
              sourceId = action.sourceId;
          var nextJobStatus = jobTypes.reduce(function (accumulatedJobStatus, jobType) {
            return _objectSpread({}, accumulatedJobStatus, _defineProperty({}, jobType, hasSuccessfullyCreatedJob((0, _log_analysis.getJobId)(spaceId, sourceId, jobType))(jobs) && hasSuccessfullyStartedDatafeed((0, _log_analysis.getDatafeedId)(spaceId, sourceId, jobType))(datafeeds) ? 'started' : 'failed'));
          }, {});
          var nextSetupStatus = Object.values(nextJobStatus).every(function (jobState) {
            return jobState === 'started';
          }) ? 'succeeded' : 'failed';
          var nextErrorMessages = [].concat(_toConsumableArray(Object.values(datafeeds).filter(hasError).map(function (datafeed) {
            return datafeed.error.msg;
          })), _toConsumableArray(Object.values(jobs).filter(hasError).map(function (job) {
            return job.error.msg;
          })));
          return _objectSpread({}, state, {
            jobStatus: nextJobStatus,
            lastSetupErrorMessages: nextErrorMessages,
            setupStatus: nextSetupStatus
          });
        }

      case 'failedSetup':
        {
          return _objectSpread({}, state, {
            jobStatus: jobTypes.reduce(function (accumulatedJobStatus, jobType) {
              return _objectSpread({}, accumulatedJobStatus, _defineProperty({}, jobType, 'failed'));
            }, {}),
            setupStatus: 'failed'
          });
        }

      case 'fetchingModuleDefinition':
      case 'fetchingJobStatuses':
        {
          return _objectSpread({}, state, {
            setupStatus: state.setupStatus === 'unknown' ? 'initializing' : state.setupStatus
          });
        }

      case 'fetchedJobStatuses':
        {
          var jobSummaries = action.payload,
              _spaceId = action.spaceId,
              _sourceId = action.sourceId;
          var jobDefinitions = state.jobDefinitions,
              setupStatus = state.setupStatus,
              sourceConfiguration = state.sourceConfiguration;

          var _nextJobStatus = jobTypes.reduce(function (accumulatedJobStatus, jobType) {
            return _objectSpread({}, accumulatedJobStatus, _defineProperty({}, jobType, getJobStatus((0, _log_analysis.getJobId)(_spaceId, _sourceId, jobType))(jobSummaries)));
          }, {});

          var _nextSetupStatus = getSetupStatus(_spaceId, _sourceId, sourceConfiguration, _nextJobStatus, jobDefinitions, jobSummaries)(setupStatus);

          return _objectSpread({}, state, {
            jobSummaries: jobSummaries,
            jobStatus: _nextJobStatus,
            setupStatus: _nextSetupStatus
          });
        }

      case 'failedFetchingJobStatuses':
        {
          return _objectSpread({}, state, {
            setupStatus: 'unknown',
            jobStatus: jobTypes.reduce(function (accumulatedJobStatus, jobType) {
              return _objectSpread({}, accumulatedJobStatus, _defineProperty({}, jobType, 'unknown'));
            }, {})
          });
        }

      case 'fetchedModuleDefinition':
        {
          var _spaceId2 = action.spaceId,
              _sourceId2 = action.sourceId,
              moduleDefinition = action.moduleDefinition;
          var jobStatus = state.jobStatus,
              _jobSummaries = state.jobSummaries,
              _setupStatus = state.setupStatus,
              _sourceConfiguration = state.sourceConfiguration;

          var _nextSetupStatus2 = getSetupStatus(_spaceId2, _sourceId2, _sourceConfiguration, jobStatus, moduleDefinition.jobs, _jobSummaries)(_setupStatus);

          return _objectSpread({}, state, {
            jobDefinitions: moduleDefinition.jobs,
            setupStatus: _nextSetupStatus2
          });
        }

      case 'updatedSourceConfiguration':
        {
          var _spaceId3 = action.spaceId,
              _sourceId3 = action.sourceId,
              _sourceConfiguration2 = action.sourceConfiguration;
          var _jobDefinitions = state.jobDefinitions,
              _jobStatus = state.jobStatus,
              _jobSummaries2 = state.jobSummaries,
              _setupStatus2 = state.setupStatus;

          var _nextSetupStatus3 = getSetupStatus(_spaceId3, _sourceId3, _sourceConfiguration2, _jobStatus, _jobDefinitions, _jobSummaries2)(_setupStatus2);

          return _objectSpread({}, state, {
            setupStatus: _nextSetupStatus3,
            sourceConfiguration: _sourceConfiguration2
          });
        }

      case 'requestedJobConfigurationUpdate':
        {
          return _objectSpread({}, state, {
            setupStatus: 'requiredForReconfiguration'
          });
        }

      case 'requestedJobDefinitionUpdate':
        {
          return _objectSpread({}, state, {
            setupStatus: 'requiredForUpdate'
          });
        }

      case 'viewedResults':
        {
          return _objectSpread({}, state, {
            setupStatus: 'hiddenAfterSuccess'
          });
        }

      default:
        {
          return state;
        }
    }
  };
};

var hasSuccessfullyCreatedJob = function hasSuccessfullyCreatedJob(jobId) {
  return function (jobSetupResponses) {
    return jobSetupResponses.filter(function (jobSetupResponse) {
      return jobSetupResponse.id === jobId && jobSetupResponse.success && !jobSetupResponse.error;
    }).length > 0;
  };
};

var hasSuccessfullyStartedDatafeed = function hasSuccessfullyStartedDatafeed(datafeedId) {
  return function (datafeedSetupResponses) {
    return datafeedSetupResponses.filter(function (datafeedSetupResponse) {
      return datafeedSetupResponse.id === datafeedId && datafeedSetupResponse.success && datafeedSetupResponse.started && !datafeedSetupResponse.error;
    }).length > 0;
  };
};

var getJobStatus = function getJobStatus(jobId) {
  return function (jobSummaries) {
    return jobSummaries.filter(function (jobSummary) {
      return jobSummary.id === jobId;
    }).map(function (jobSummary) {
      if (jobSummary.jobState === 'failed' || jobSummary.datafeedState === '') {
        return 'failed';
      } else if (jobSummary.jobState === 'closed' && jobSummary.datafeedState === 'stopped' && jobSummary.fullJob && jobSummary.fullJob.finished_time != null) {
        return 'finished';
      } else if (jobSummary.jobState === 'closed' || jobSummary.jobState === 'closing' || jobSummary.datafeedState === 'stopped') {
        return 'stopped';
      } else if (jobSummary.jobState === 'opening') {
        return 'initializing';
      } else if (jobSummary.jobState === 'opened' && jobSummary.datafeedState === 'started') {
        return 'started';
      }

      return 'unknown';
    })[0] || 'missing';
  };
};

var getSetupStatus = function getSetupStatus(spaceId, sourceId, sourceConfiguration, everyJobStatus, jobDefinitions, jobSummaries) {
  return function (previousSetupStatus) {
    return Object.entries(everyJobStatus).reduce(function (setupStatus, _ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          jobType = _ref3[0],
          jobStatus = _ref3[1];

      var jobId = (0, _log_analysis.getJobId)(spaceId, sourceId, jobType);
      var jobDefinition = jobDefinitions.find(function (_ref4) {
        var id = _ref4.id;
        return id === jobType;
      });

      if (jobStatus === 'missing') {
        return 'required';
      } else if (setupStatus === 'required' || setupStatus === 'requiredForUpdate' || setupStatus === 'requiredForReconfiguration') {
        return setupStatus;
      } else if (jobDefinition && !isJobRevisionCurrent(jobId, jobDefinition.config.custom_settings.job_revision || 0)(jobSummaries)) {
        return 'skippedButUpdatable';
      } else if (!isJobConfigurationConsistent(jobId, sourceConfiguration)(jobSummaries)) {
        return 'skippedButReconfigurable';
      } else if (setupStatus === 'hiddenAfterSuccess') {
        return setupStatus;
      } else if (setupStatus === 'skipped' || (0, _log_analysis.isJobStatusWithResults)(jobStatus)) {
        return 'skipped';
      }

      return setupStatus;
    }, previousSetupStatus);
  };
};

var isJobRevisionCurrent = function isJobRevisionCurrent(jobId, currentRevision) {
  return function (jobSummaries) {
    return jobSummaries.filter(function (jobSummary) {
      return jobSummary.id === jobId;
    }).every(function (jobSummary) {
      var _ref5, _jobSummary$fullJob, _jobSummary$fullJob$c;

      return ((_ref5 = jobSummary === null || jobSummary === void 0 ? void 0 : (_jobSummary$fullJob = jobSummary.fullJob) === null || _jobSummary$fullJob === void 0 ? void 0 : (_jobSummary$fullJob$c = _jobSummary$fullJob.custom_settings) === null || _jobSummary$fullJob$c === void 0 ? void 0 : _jobSummary$fullJob$c.job_revision) !== null && _ref5 !== void 0 ? _ref5 : 0) >= currentRevision;
    });
  };
};

var isJobConfigurationConsistent = function isJobConfigurationConsistent(jobId, sourceConfiguration) {
  return function (jobSummaries) {
    return jobSummaries.filter(function (jobSummary) {
      return jobSummary.id === jobId;
    }).every(function (jobSummary) {
      if (!jobSummary.fullJob || !jobSummary.fullJob.custom_settings) {
        return false;
      }

      var jobConfiguration = jobSummary.fullJob.custom_settings.logs_source_config;
      return jobConfiguration && jobConfiguration.bucketSpan === sourceConfiguration.bucketSpan && jobConfiguration.indexPattern && isIndexPatternSubset(jobConfiguration.indexPattern, sourceConfiguration.indexPattern) && jobConfiguration.timestampField === sourceConfiguration.timestampField;
    });
  };
};

var isIndexPatternSubset = function isIndexPatternSubset(indexPatternSubset, indexPatternSuperset) {
  var subsetSubPatterns = indexPatternSubset.split(',');
  var supersetSubPatterns = new Set(indexPatternSuperset.split(','));
  return subsetSubPatterns.every(function (subPattern) {
    return supersetSubPatterns.has(subPattern);
  });
};

var hasError = function hasError(value) {
  return value.error != null;
};

var useModuleStatus = function useModuleStatus(jobTypes, sourceConfiguration) {
  return (0, _react.useReducer)(createStatusReducer(jobTypes), {
    jobTypes: jobTypes,
    sourceConfiguration: sourceConfiguration
  }, createInitialState);
};

exports.useModuleStatus = useModuleStatus;