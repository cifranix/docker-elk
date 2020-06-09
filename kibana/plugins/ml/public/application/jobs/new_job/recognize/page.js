"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = exports.SAVE_STATE = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _kibana = require("../../../contexts/kibana");

var _ml_api_service = require("../../../services/ml_api_service");

var _ml = require("../../../contexts/ml");

var _job_service = require("../../../services/job_service");

var _create_result_callout = require("./components/create_result_callout");

var _kibana_objects = require("./components/kibana_objects");

var _module_jobs = require("./components/module_jobs");

var _resolvers = require("./resolvers");

var _job_settings_form = require("./components/job_settings_form");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SAVE_STATE;
exports.SAVE_STATE = SAVE_STATE;

(function (SAVE_STATE) {
  SAVE_STATE[SAVE_STATE["NOT_SAVED"] = 0] = "NOT_SAVED";
  SAVE_STATE[SAVE_STATE["SAVING"] = 1] = "SAVING";
  SAVE_STATE[SAVE_STATE["SAVED"] = 2] = "SAVED";
  SAVE_STATE[SAVE_STATE["FAILED"] = 3] = "FAILED";
  SAVE_STATE[SAVE_STATE["PARTIAL_FAILURE"] = 4] = "PARTIAL_FAILURE";
})(SAVE_STATE || (exports.SAVE_STATE = SAVE_STATE = {}));

var Page = function Page(_ref) {
  var moduleId = _ref.moduleId,
      existingGroupIds = _ref.existingGroupIds;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      notifications = _useMlKibana.services.notifications; // #region State


  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      jobPrefix = _useState2[0],
      setJobPrefix = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      jobs = _useState4[0],
      setJobs = _useState4[1];

  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      jobOverrides = _useState6[0],
      setJobOverrides = _useState6[1];

  var _useState7 = (0, _react.useState)({}),
      _useState8 = _slicedToArray(_useState7, 2),
      kibanaObjects = _useState8[0],
      setKibanaObjects = _useState8[1];

  var _useState9 = (0, _react.useState)(SAVE_STATE.NOT_SAVED),
      _useState10 = _slicedToArray(_useState9, 2),
      saveState = _useState10[0],
      setSaveState = _useState10[1];

  var _useState11 = (0, _react.useState)(''),
      _useState12 = _slicedToArray(_useState11, 2),
      resultsUrl = _useState12[0],
      setResultsUrl = _useState12[1];

  var _useState13 = (0, _react.useState)(existingGroupIds),
      _useState14 = _slicedToArray(_useState13, 2),
      existingGroups = _useState14[0],
      setExistingGroups = _useState14[1]; // #endregion


  var _useMlContext = (0, _ml.useMlContext)(),
      savedSearch = _useMlContext.currentSavedSearch,
      indexPattern = _useMlContext.currentIndexPattern,
      combinedQuery = _useMlContext.combinedQuery;

  var pageTitle = savedSearch !== null ? _i18n.i18n.translate('xpack.ml.newJob.recognize.savedSearchPageTitle', {
    defaultMessage: 'saved search {savedSearchTitle}',
    values: {
      savedSearchTitle: savedSearch.attributes.title
    }
  }) : _i18n.i18n.translate('xpack.ml.newJob.recognize.indexPatternPageTitle', {
    defaultMessage: 'index pattern {indexPatternTitle}',
    values: {
      indexPatternTitle: indexPattern.title
    }
  });
  var displayQueryWarning = savedSearch !== null;
  var tempQuery = savedSearch === null ? undefined : combinedQuery;
  /**
   * Loads recognizer module configuration.
   */

  var loadModule =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var response, kibanaObjectsResult, moduleGroups;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _ml_api_service.ml.getDataRecognizerModule({
                moduleId: moduleId
              });

            case 3:
              response = _context.sent;
              setJobs(response.jobs);
              _context.next = 7;
              return (0, _resolvers.checkForSavedObjects)(response.kibana);

            case 7:
              kibanaObjectsResult = _context.sent;
              setKibanaObjects(kibanaObjectsResult);
              setSaveState(SAVE_STATE.NOT_SAVED); // mix existing groups from the server with the groups used across all jobs in the module.

              moduleGroups = _toConsumableArray(response.jobs.map(function (j) {
                return j.config.groups || [];
              })).flat();
              setExistingGroups(_toConsumableArray(new Set([].concat(_toConsumableArray(existingGroups), _toConsumableArray(moduleGroups)))));
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              // eslint-disable-next-line no-console
              console.error(_context.t0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 14]]);
    }));

    return function loadModule() {
      return _ref2.apply(this, arguments);
    };
  }();

  var getTimeRange =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(useFullIndexData, timeRange) {
      var _ref4, start, end;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!useFullIndexData) {
                _context2.next = 9;
                break;
              }

              _context2.next = 3;
              return _ml_api_service.ml.getTimeFieldRange({
                index: indexPattern.title,
                timeFieldName: indexPattern.timeFieldName,
                query: combinedQuery
              });

            case 3:
              _ref4 = _context2.sent;
              start = _ref4.start;
              end = _ref4.end;
              return _context2.abrupt("return", {
                start: start.epoch,
                end: end.epoch
              });

            case 9:
              return _context2.abrupt("return", Promise.resolve(timeRange));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function getTimeRange(_x, _x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    loadModule();
  }, []);
  /**
   * Sets up recognizer module configuration.
   */

  var save =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(formValues) {
      var resultJobPrefix, startDatafeedAfterSave, useDedicatedIndex, useFullIndexData, timeRange, resultTimeRange, jobOverridesPayload, response, datafeedsResponse, jobsResponse, kibanaResponse, failedJobsCount, toasts;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setSaveState(SAVE_STATE.SAVING);
              resultJobPrefix = formValues.jobPrefix, startDatafeedAfterSave = formValues.startDatafeedAfterSave, useDedicatedIndex = formValues.useDedicatedIndex, useFullIndexData = formValues.useFullIndexData, timeRange = formValues.timeRange;
              _context3.next = 4;
              return getTimeRange(useFullIndexData, timeRange);

            case 4:
              resultTimeRange = _context3.sent;
              _context3.prev = 5;
              jobOverridesPayload = Object.values(jobOverrides);
              jobOverridesPayload = jobOverridesPayload.length > 0 ? jobOverridesPayload : null;
              _context3.next = 10;
              return _ml_api_service.ml.setupDataRecognizerConfig(_objectSpread({
                moduleId: moduleId,
                prefix: resultJobPrefix,
                query: tempQuery,
                indexPatternName: indexPattern.title,
                useDedicatedIndex: useDedicatedIndex,
                startDatafeed: startDatafeedAfterSave
              }, jobOverridesPayload !== null ? {
                jobOverrides: jobOverridesPayload
              } : {}, {}, resultTimeRange, {
                estimateModelMemory: false
              }));

            case 10:
              response = _context3.sent;
              datafeedsResponse = response.datafeeds, jobsResponse = response.jobs, kibanaResponse = response.kibana;
              setJobs(jobs.map(function (job) {
                return _objectSpread({}, job, {
                  datafeedResult: datafeedsResponse.find(function (_ref6) {
                    var id = _ref6.id;
                    return id.endsWith(job.id);
                  }),
                  setupResult: jobsResponse.find(function (_ref7) {
                    var id = _ref7.id;
                    return id === resultJobPrefix + job.id;
                  })
                });
              }));
              setKibanaObjects((0, _lodash.merge)(kibanaObjects, kibanaResponse));
              setResultsUrl(_job_service.mlJobService.createResultsUrl(jobsResponse.filter(function (_ref8) {
                var success = _ref8.success;
                return success;
              }).map(function (_ref9) {
                var id = _ref9.id;
                return id;
              }), resultTimeRange.start, resultTimeRange.end, 'explorer'));
              failedJobsCount = jobsResponse.reduce(function (count, _ref10) {
                var success = _ref10.success;
                return success ? count : count + 1;
              }, 0);
              setSaveState(failedJobsCount === 0 ? SAVE_STATE.SAVED : failedJobsCount === jobs.length ? SAVE_STATE.FAILED : SAVE_STATE.PARTIAL_FAILURE);
              _context3.next = 25;
              break;

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](5);
              setSaveState(SAVE_STATE.FAILED); // eslint-disable-next-line no-console

              console.error('Error setting up module', _context3.t0);
              toasts = notifications.toasts;
              toasts.addDanger({
                title: _i18n.i18n.translate('xpack.ml.newJob.recognize.moduleSetupFailedWarningTitle', {
                  defaultMessage: 'Error setting up module {moduleId}',
                  values: {
                    moduleId: moduleId
                  }
                }),
                text: _i18n.i18n.translate('xpack.ml.newJob.recognize.moduleSetupFailedWarningDescription', {
                  defaultMessage: 'An error occurred trying to create the {count, plural, one {job} other {jobs}} in the module.',
                  values: {
                    count: jobs.length
                  }
                })
              });

            case 25:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[5, 19]]);
    }));

    return function save(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var onJobOverridesChange = function onJobOverridesChange(job) {
    setJobOverrides(_objectSpread({}, jobOverrides, _defineProperty({}, job.job_id, job)));

    if (job.groups !== undefined) {
      // add newly added jobs to the list of existing groups
      // for use when editing other jobs in the module
      var groups = _toConsumableArray(new Set([].concat(_toConsumableArray(existingGroups), _toConsumableArray(job.groups))));

      setExistingGroups(groups);
    }
  };

  var isFormVisible = [SAVE_STATE.NOT_SAVED, SAVE_STATE.SAVING].includes(saveState);
  return _react.default.createElement(_eui.EuiPage, null, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageHeader, null, _react.default.createElement(_eui.EuiPageHeaderSection, null, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.newJobFromTitle",
    defaultMessage: "New job from {pageTitle}",
    values: {
      pageTitle: pageTitle
    }
  }))))), displayQueryWarning && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.searchWillBeOverwrittenLabel",
      defaultMessage: "Search will be overwritten"
    }),
    color: "warning",
    iconType: "alert"
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.usingSavedSearchDescription",
    defaultMessage: "Using a saved search will mean the query used in the datafeeds will be different from the default ones we supply in the {moduleId} module.",
    values: {
      moduleId: moduleId
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  })), _react.default.createElement(_eui.EuiFlexGroup, {
    wrap: true,
    gutterSize: "m"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_eui.EuiPanel, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.jobSettingsTitle",
    defaultMessage: "Job settings"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), isFormVisible && _react.default.createElement(_job_settings_form.JobSettingsForm, {
    onSubmit: save,
    onChange: function onChange(formValues) {
      setJobPrefix(formValues.jobPrefix);
    },
    saveState: saveState,
    jobs: jobs
  }), _react.default.createElement(_create_result_callout.CreateResultCallout, {
    saveState: saveState,
    resultsUrl: resultsUrl,
    onReset: loadModule
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 2
  }, _react.default.createElement(_eui.EuiPanel, {
    grow: false
  }, _react.default.createElement(_module_jobs.ModuleJobs, {
    jobs: jobs,
    jobPrefix: jobPrefix,
    saveState: saveState,
    existingGroupIds: existingGroups,
    jobOverrides: jobOverrides,
    onJobOverridesChange: onJobOverridesChange
  })), Object.keys(kibanaObjects).length > 0 && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiPanel, {
    grow: false
  }, Object.keys(kibanaObjects).map(function (objectType, i) {
    return _react.default.createElement(_react.Fragment, {
      key: objectType
    }, _react.default.createElement(_kibana_objects.KibanaObjects, {
      objectType: objectType,
      kibanaObjects: kibanaObjects[objectType],
      isSaving: saveState === SAVE_STATE.SAVING
    }), i < Object.keys(kibanaObjects).length - 1 && _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }));
  }))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  })));
};

exports.Page = Page;