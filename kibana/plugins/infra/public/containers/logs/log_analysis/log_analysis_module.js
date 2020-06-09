"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogAnalysisModule = void 0;

var _react = require("react");

var _use_tracked_promise = require("../../../utils/use_tracked_promise");

var _log_analysis_module_status = require("./log_analysis_module_status");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useLogAnalysisModule = function useLogAnalysisModule(_ref) {
  var sourceConfiguration = _ref.sourceConfiguration,
      moduleDescriptor = _ref.moduleDescriptor;
  var spaceId = sourceConfiguration.spaceId,
      sourceId = sourceConfiguration.sourceId,
      timestampField = sourceConfiguration.timestampField,
      indices = sourceConfiguration.indices;

  var _useModuleStatus = (0, _log_analysis_module_status.useModuleStatus)(moduleDescriptor.jobTypes, {
    bucketSpan: moduleDescriptor.bucketSpan,
    indexPattern: indices.join(','),
    timestampField: timestampField
  }),
      _useModuleStatus2 = _slicedToArray(_useModuleStatus, 2),
      moduleStatus = _useModuleStatus2[0],
      dispatchModuleStatus = _useModuleStatus2[1];

  var _useTrackedPromise = (0, _use_tracked_promise.useTrackedPromise)({
    cancelPreviousOn: 'resolution',
    createPromise: function () {
      var _createPromise = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatchModuleStatus({
                  type: 'fetchingModuleDefinition'
                });
                _context.next = 3;
                return moduleDescriptor.getModuleDefinition();

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createPromise() {
        return _createPromise.apply(this, arguments);
      }

      return createPromise;
    }(),
    onResolve: function onResolve(response) {
      dispatchModuleStatus({
        type: 'fetchedModuleDefinition',
        spaceId: spaceId,
        sourceId: sourceId,
        moduleDefinition: response
      });
    },
    onReject: function onReject() {
      dispatchModuleStatus({
        type: 'failedFetchingModuleDefinition'
      });
    }
  }, [moduleDescriptor.getModuleDefinition, spaceId, sourceId]),
      _useTrackedPromise2 = _slicedToArray(_useTrackedPromise, 2),
      fetchModuleDefinitionRequest = _useTrackedPromise2[0],
      fetchModuleDefinition = _useTrackedPromise2[1];

  var _useTrackedPromise3 = (0, _use_tracked_promise.useTrackedPromise)({
    cancelPreviousOn: 'resolution',
    createPromise: function () {
      var _createPromise2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dispatchModuleStatus({
                  type: 'fetchingJobStatuses'
                });
                _context2.next = 3;
                return moduleDescriptor.getJobSummary(spaceId, sourceId);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createPromise() {
        return _createPromise2.apply(this, arguments);
      }

      return createPromise;
    }(),
    onResolve: function onResolve(jobResponse) {
      dispatchModuleStatus({
        type: 'fetchedJobStatuses',
        payload: jobResponse,
        spaceId: spaceId,
        sourceId: sourceId
      });
    },
    onReject: function onReject() {
      dispatchModuleStatus({
        type: 'failedFetchingJobStatuses'
      });
    }
  }, [spaceId, sourceId]),
      _useTrackedPromise4 = _slicedToArray(_useTrackedPromise3, 2),
      fetchJobStatusRequest = _useTrackedPromise4[0],
      fetchJobStatus = _useTrackedPromise4[1];

  var isLoadingModuleStatus = (0, _react.useMemo)(function () {
    return fetchJobStatusRequest.state === 'pending' || fetchModuleDefinitionRequest.state === 'pending';
  }, [fetchJobStatusRequest.state, fetchModuleDefinitionRequest.state]);

  var _useTrackedPromise5 = (0, _use_tracked_promise.useTrackedPromise)({
    cancelPreviousOn: 'resolution',
    createPromise: function () {
      var _createPromise3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(selectedIndices, start, end) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                dispatchModuleStatus({
                  type: 'startedSetup'
                });
                _context3.next = 3;
                return moduleDescriptor.setUpModule(start, end, {
                  indices: selectedIndices,
                  sourceId: sourceId,
                  spaceId: spaceId,
                  timestampField: timestampField
                });

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createPromise(_x, _x2, _x3) {
        return _createPromise3.apply(this, arguments);
      }

      return createPromise;
    }(),
    onResolve: function onResolve(_ref2) {
      var datafeeds = _ref2.datafeeds,
          jobs = _ref2.jobs;
      dispatchModuleStatus({
        type: 'finishedSetup',
        datafeeds: datafeeds,
        jobs: jobs,
        spaceId: spaceId,
        sourceId: sourceId
      });
    },
    onReject: function onReject() {
      dispatchModuleStatus({
        type: 'failedSetup'
      });
    }
  }, [moduleDescriptor.setUpModule, spaceId, sourceId, timestampField]),
      _useTrackedPromise6 = _slicedToArray(_useTrackedPromise5, 2),
      setUpModule = _useTrackedPromise6[1];

  var _useTrackedPromise7 = (0, _use_tracked_promise.useTrackedPromise)({
    cancelPreviousOn: 'resolution',
    createPromise: function () {
      var _createPromise4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return moduleDescriptor.cleanUpModule(spaceId, sourceId);

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function createPromise() {
        return _createPromise4.apply(this, arguments);
      }

      return createPromise;
    }()
  }, [spaceId, sourceId]),
      _useTrackedPromise8 = _slicedToArray(_useTrackedPromise7, 2),
      cleanUpModuleRequest = _useTrackedPromise8[0],
      cleanUpModule = _useTrackedPromise8[1];

  var isCleaningUp = (0, _react.useMemo)(function () {
    return cleanUpModuleRequest.state === 'pending';
  }, [cleanUpModuleRequest.state]);
  var cleanUpAndSetUpModule = (0, _react.useCallback)(function (selectedIndices, start, end) {
    dispatchModuleStatus({
      type: 'startedSetup'
    });
    cleanUpModule().then(function () {
      setUpModule(selectedIndices, start, end);
    }).catch(function () {
      dispatchModuleStatus({
        type: 'failedSetup'
      });
    });
  }, [cleanUpModule, dispatchModuleStatus, setUpModule]);
  var viewSetupForReconfiguration = (0, _react.useCallback)(function () {
    dispatchModuleStatus({
      type: 'requestedJobConfigurationUpdate'
    });
  }, [dispatchModuleStatus]);
  var viewSetupForUpdate = (0, _react.useCallback)(function () {
    dispatchModuleStatus({
      type: 'requestedJobDefinitionUpdate'
    });
  }, [dispatchModuleStatus]);
  var viewResults = (0, _react.useCallback)(function () {
    dispatchModuleStatus({
      type: 'viewedResults'
    });
  }, [dispatchModuleStatus]);
  var jobIds = (0, _react.useMemo)(function () {
    return moduleDescriptor.getJobIds(spaceId, sourceId);
  }, [moduleDescriptor, spaceId, sourceId]);
  (0, _react.useEffect)(function () {
    dispatchModuleStatus({
      type: 'updatedSourceConfiguration',
      spaceId: spaceId,
      sourceId: sourceId,
      sourceConfiguration: {
        timestampField: timestampField,
        indexPattern: indices.join(','),
        bucketSpan: moduleDescriptor.bucketSpan
      }
    });
  }, [dispatchModuleStatus, indices, moduleDescriptor.bucketSpan, sourceConfiguration, sourceId, spaceId, timestampField]);
  return {
    cleanUpAndSetUpModule: cleanUpAndSetUpModule,
    cleanUpModule: cleanUpModule,
    fetchJobStatus: fetchJobStatus,
    fetchModuleDefinition: fetchModuleDefinition,
    isCleaningUp: isCleaningUp,
    isLoadingModuleStatus: isLoadingModuleStatus,
    jobIds: jobIds,
    jobStatus: moduleStatus.jobStatus,
    lastSetupErrorMessages: moduleStatus.lastSetupErrorMessages,
    moduleDescriptor: moduleDescriptor,
    setUpModule: setUpModule,
    setupStatus: moduleStatus.setupStatus,
    sourceConfiguration: sourceConfiguration,
    viewResults: viewResults,
    viewSetupForReconfiguration: viewSetupForReconfiguration,
    viewSetupForUpdate: viewSetupForUpdate
  };
};

exports.useLogAnalysisModule = useLogAnalysisModule;