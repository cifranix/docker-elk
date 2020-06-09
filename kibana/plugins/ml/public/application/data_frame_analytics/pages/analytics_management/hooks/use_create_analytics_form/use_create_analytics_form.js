"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreateAnalyticsForm = void 0;

var _react = require("react");

var _i18n = require("@kbn/i18n");

var _errors = require("../../../../../../../common/util/errors");

var _ml_api_service = require("../../../../../services/ml_api_service");

var _ml = require("../../../../../contexts/ml");

var _common = require("../../../../common");

var _action_clone = require("../../components/analytics_list/action_clone");

var _actions = require("./actions");

var _reducer = require("./reducer");

var _state = require("./state");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useCreateAnalyticsForm = function useCreateAnalyticsForm() {
  var mlContext = (0, _ml.useMlContext)();

  var _useReducer = (0, _react.useReducer)(_reducer.reducer, (0, _state.getInitialState)()),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useRefreshAnalyticsL = (0, _common.useRefreshAnalyticsList)(),
      refresh = _useRefreshAnalyticsL.refresh;

  var form = state.form,
      jobConfig = state.jobConfig,
      isAdvancedEditorEnabled = state.isAdvancedEditorEnabled;
  var createIndexPattern = form.createIndexPattern,
      jobId = form.jobId;
  var destinationIndex = form.destinationIndex;

  var addRequestMessage = function addRequestMessage(requestMessage) {
    return dispatch({
      type: _actions.ACTION.ADD_REQUEST_MESSAGE,
      requestMessage: requestMessage
    });
  };

  var closeModal = function closeModal() {
    return dispatch({
      type: _actions.ACTION.CLOSE_MODAL
    });
  };

  var resetAdvancedEditorMessages = function resetAdvancedEditorMessages() {
    return dispatch({
      type: _actions.ACTION.RESET_ADVANCED_EDITOR_MESSAGES
    });
  };

  var setIndexNames = function setIndexNames(indexNames) {
    return dispatch({
      type: _actions.ACTION.SET_INDEX_NAMES,
      indexNames: indexNames
    });
  };

  var setAdvancedEditorRawString = function setAdvancedEditorRawString(advancedEditorRawString) {
    return dispatch({
      type: _actions.ACTION.SET_ADVANCED_EDITOR_RAW_STRING,
      advancedEditorRawString: advancedEditorRawString
    });
  };

  var setIndexPatternTitles = function setIndexPatternTitles(payload) {
    return dispatch({
      type: _actions.ACTION.SET_INDEX_PATTERN_TITLES,
      payload: payload
    });
  };

  var setIsJobCreated = function setIsJobCreated(isJobCreated) {
    return dispatch({
      type: _actions.ACTION.SET_IS_JOB_CREATED,
      isJobCreated: isJobCreated
    });
  };

  var setIsJobStarted = function setIsJobStarted(isJobStarted) {
    dispatch({
      type: _actions.ACTION.SET_IS_JOB_STARTED,
      isJobStarted: isJobStarted
    });
  };

  var setIsModalButtonDisabled = function setIsModalButtonDisabled(isModalButtonDisabled) {
    return dispatch({
      type: _actions.ACTION.SET_IS_MODAL_BUTTON_DISABLED,
      isModalButtonDisabled: isModalButtonDisabled
    });
  };

  var setIsModalVisible = function setIsModalVisible(isModalVisible) {
    return dispatch({
      type: _actions.ACTION.SET_IS_MODAL_VISIBLE,
      isModalVisible: isModalVisible
    });
  };

  var setJobIds = function setJobIds(jobIds) {
    return dispatch({
      type: _actions.ACTION.SET_JOB_IDS,
      jobIds: jobIds
    });
  };

  var resetRequestMessages = function resetRequestMessages() {
    return dispatch({
      type: _actions.ACTION.RESET_REQUEST_MESSAGES
    });
  };

  var resetForm = function resetForm() {
    return dispatch({
      type: _actions.ACTION.RESET_FORM
    });
  };

  var createAnalyticsJob =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var analyticsJobConfig;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              resetRequestMessages();
              setIsModalButtonDisabled(true);
              analyticsJobConfig = isAdvancedEditorEnabled ? jobConfig : (0, _state.getJobConfigFromFormState)(form);

              if (isAdvancedEditorEnabled) {
                destinationIndex = analyticsJobConfig.dest.index;
              }

              _context.prev = 4;
              _context.next = 7;
              return _ml_api_service.ml.dataFrameAnalytics.createDataFrameAnalytics(jobId, analyticsJobConfig);

            case 7:
              addRequestMessage({
                message: _i18n.i18n.translate('xpack.ml.dataframe.stepCreateForm.createDataFrameAnalyticsSuccessMessage', {
                  defaultMessage: 'Request to create data frame analytics {jobId} acknowledged.',
                  values: {
                    jobId: jobId
                  }
                })
              });
              setIsModalButtonDisabled(false);
              setIsJobCreated(true);

              if (createIndexPattern) {
                createKibanaIndexPattern();
              }

              refresh();
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](4);
              addRequestMessage({
                error: (0, _errors.getErrorMessage)(_context.t0),
                message: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.errorCreatingDataFrameAnalyticsJob', {
                  defaultMessage: 'An error occurred creating the data frame analytics job:'
                })
              });
              setIsModalButtonDisabled(false);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 14]]);
    }));

    return function createAnalyticsJob() {
      return _ref.apply(this, arguments);
    };
  }();

  var createKibanaIndexPattern =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var indexPatternName, newIndexPattern, id;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              indexPatternName = destinationIndex;
              _context2.prev = 1;
              _context2.next = 4;
              return mlContext.indexPatterns.make();

            case 4:
              newIndexPattern = _context2.sent;
              Object.assign(newIndexPattern, {
                id: '',
                title: indexPatternName
              });
              _context2.next = 8;
              return newIndexPattern.create();

            case 8:
              id = _context2.sent;
              _context2.next = 11;
              return mlContext.indexPatterns.clearCache();

            case 11:
              if (!(id === false)) {
                _context2.next = 14;
                break;
              }

              addRequestMessage({
                error: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.duplicateIndexPatternErrorMessageError', {
                  defaultMessage: 'The index pattern {indexPatternName} already exists.',
                  values: {
                    indexPatternName: indexPatternName
                  }
                }),
                message: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.duplicateIndexPatternErrorMessage', {
                  defaultMessage: 'An error occurred creating the Kibana index pattern:'
                })
              });
              return _context2.abrupt("return");

            case 14:
              if (mlContext.kibanaConfig.get('defaultIndex')) {
                _context2.next = 17;
                break;
              }

              _context2.next = 17;
              return mlContext.kibanaConfig.set('defaultIndex', id);

            case 17:
              addRequestMessage({
                message: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.createIndexPatternSuccessMessage', {
                  defaultMessage: 'Kibana index pattern {indexPatternName} created.',
                  values: {
                    indexPatternName: indexPatternName
                  }
                })
              });
              _context2.next = 23;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](1);
              addRequestMessage({
                error: (0, _errors.getErrorMessage)(_context2.t0),
                message: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.createIndexPatternErrorMessage', {
                  defaultMessage: 'An error occurred creating the Kibana index pattern:'
                })
              });

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 20]]);
    }));

    return function createKibanaIndexPattern() {
      return _ref2.apply(this, arguments);
    };
  }();

  var prepareFormValidation =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var indexPatternsMap, savedObjects;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.t0 = setJobIds;
              _context3.next = 4;
              return _ml_api_service.ml.dataFrameAnalytics.getDataFrameAnalytics();

            case 4:
              _context3.t1 = function (job) {
                return job.id;
              };

              _context3.t2 = _context3.sent.data_frame_analytics.map(_context3.t1);
              (0, _context3.t0)(_context3.t2);
              _context3.next = 12;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t3 = _context3["catch"](0);
              addRequestMessage({
                error: (0, _errors.getErrorMessage)(_context3.t3),
                message: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.errorGettingDataFrameAnalyticsList', {
                  defaultMessage: 'An error occurred getting the existing data frame analytics job IDs:'
                })
              });

            case 12:
              _context3.prev = 12;
              _context3.t4 = setIndexNames;
              _context3.next = 16;
              return _ml_api_service.ml.getIndices();

            case 16:
              _context3.t5 = function (index) {
                return index.name;
              };

              _context3.t6 = _context3.sent.map(_context3.t5);
              (0, _context3.t4)(_context3.t6);
              _context3.next = 24;
              break;

            case 21:
              _context3.prev = 21;
              _context3.t7 = _context3["catch"](12);
              addRequestMessage({
                error: (0, _errors.getErrorMessage)(_context3.t7),
                message: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.errorGettingDataFrameIndexNames', {
                  defaultMessage: 'An error occurred getting the existing index names:'
                })
              });

            case 24:
              _context3.prev = 24;
              // Set the index pattern titles which the user can choose as the source.
              indexPatternsMap = {};
              _context3.next = 28;
              return mlContext.indexPatterns.getCache();

            case 28:
              _context3.t8 = _context3.sent;

              if (_context3.t8) {
                _context3.next = 31;
                break;
              }

              _context3.t8 = [];

            case 31:
              savedObjects = _context3.t8;
              savedObjects.forEach(function (obj) {
                var _obj$attributes;

                var title = obj === null || obj === void 0 ? void 0 : (_obj$attributes = obj.attributes) === null || _obj$attributes === void 0 ? void 0 : _obj$attributes.title;

                if (title !== undefined) {
                  var id = (obj === null || obj === void 0 ? void 0 : obj.id) || '';
                  indexPatternsMap[title] = {
                    label: title,
                    value: id
                  };
                }
              });
              setIndexPatternTitles({
                indexPatternsMap: indexPatternsMap
              });
              _context3.next = 39;
              break;

            case 36:
              _context3.prev = 36;
              _context3.t9 = _context3["catch"](24);
              addRequestMessage({
                error: (0, _errors.getErrorMessage)(_context3.t9),
                message: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.errorGettingIndexPatternTitles', {
                  defaultMessage: 'An error occurred getting the existing index pattern titles:'
                })
              });

            case 39:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9], [12, 21], [24, 36]]);
    }));

    return function prepareFormValidation() {
      return _ref3.apply(this, arguments);
    };
  }();

  var openModal =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return mlContext.indexPatterns.clearCache();

            case 2:
              resetForm();
              _context4.next = 5;
              return prepareFormValidation();

            case 5:
              dispatch({
                type: _actions.ACTION.OPEN_MODAL
              });

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function openModal() {
      return _ref4.apply(this, arguments);
    };
  }();

  var startAnalyticsJob =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              setIsModalButtonDisabled(true);
              _context5.prev = 1;
              _context5.next = 4;
              return _ml_api_service.ml.dataFrameAnalytics.startDataFrameAnalytics(jobId);

            case 4:
              response = _context5.sent;

              if (!(response.acknowledged !== true)) {
                _context5.next = 7;
                break;
              }

              throw new Error(response);

            case 7:
              addRequestMessage({
                message: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.startDataFrameAnalyticsSuccessMessage', {
                  defaultMessage: 'Request to start data frame analytics {jobId} acknowledged.',
                  values: {
                    jobId: jobId
                  }
                })
              });
              setIsJobStarted(true);
              setIsModalButtonDisabled(false);
              refresh();
              _context5.next = 17;
              break;

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](1);
              addRequestMessage({
                error: (0, _errors.getErrorMessage)(_context5.t0),
                message: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.errorStartingDataFrameAnalyticsJob', {
                  defaultMessage: 'An error occurred starting the data frame analytics job:'
                })
              });
              setIsModalButtonDisabled(false);

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 13]]);
    }));

    return function startAnalyticsJob() {
      return _ref5.apply(this, arguments);
    };
  }();

  var setJobConfig = function setJobConfig(payload) {
    dispatch({
      type: _actions.ACTION.SET_JOB_CONFIG,
      payload: payload
    });
  };

  var setFormState = function setFormState(payload) {
    dispatch({
      type: _actions.ACTION.SET_FORM_STATE,
      payload: payload
    });
  };

  var switchToAdvancedEditor = function switchToAdvancedEditor() {
    dispatch({
      type: _actions.ACTION.SWITCH_TO_ADVANCED_EDITOR
    });
  };

  var setEstimatedModelMemoryLimit = function setEstimatedModelMemoryLimit(value) {
    dispatch({
      type: _actions.ACTION.SET_ESTIMATED_MODEL_MEMORY_LIMIT,
      value: value
    });
  };

  var setJobClone =
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(cloneJob) {
      var config;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              resetForm();
              _context6.next = 3;
              return prepareFormValidation();

            case 3:
              config = (0, _action_clone.extractCloningConfig)(cloneJob);

              if ((0, _action_clone.isAdvancedConfig)(config)) {
                setJobConfig(config);
                switchToAdvancedEditor();
              } else {
                setFormState((0, _state.getCloneFormStateFromJobConfig)(config));
                setEstimatedModelMemoryLimit(config.model_memory_limit);
              }

              dispatch({
                type: _actions.ACTION.SET_JOB_CLONE,
                cloneJob: cloneJob
              });
              dispatch({
                type: _actions.ACTION.OPEN_MODAL
              });

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function setJobClone(_x) {
      return _ref6.apply(this, arguments);
    };
  }();

  var actions = {
    closeModal: closeModal,
    createAnalyticsJob: createAnalyticsJob,
    openModal: openModal,
    resetAdvancedEditorMessages: resetAdvancedEditorMessages,
    setAdvancedEditorRawString: setAdvancedEditorRawString,
    setFormState: setFormState,
    setIsModalVisible: setIsModalVisible,
    setJobConfig: setJobConfig,
    startAnalyticsJob: startAnalyticsJob,
    switchToAdvancedEditor: switchToAdvancedEditor,
    setEstimatedModelMemoryLimit: setEstimatedModelMemoryLimit,
    setJobClone: setJobClone
  };
  return {
    state: state,
    actions: actions
  };
};

exports.useCreateAnalyticsForm = useCreateAnalyticsForm;