"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAnalyticsForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _kibana = require("../../../../../contexts/kibana");

var _ml_api_service = require("../../../../../services/ml_api_service");

var _new_job_capabilities_service = require("../../../../../services/new_job_capabilities_service");

var _ml = require("../../../../../contexts/ml");

var _state = require("../../hooks/use_create_analytics_form/state");

var _validation = require("../../../../../../../common/constants/validation");

var _messages = require("./messages");

var _job_type = require("./job_type");

var _job_description = require("./job_description");

var _reducer = require("../../hooks/use_create_analytics_form/reducer");

var _public = require("../../../../../../../../../../src/plugins/data/public");

var _analytics = require("../../../../common/analytics");

var _form_options_validation = require("./form_options_validation");

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

var CreateAnalyticsForm = function CreateAnalyticsForm(_ref) {
  var actions = _ref.actions,
      state = _ref.state;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      docLinks = _useMlKibana.services.docLinks;

  var ELASTIC_WEBSITE_URL = docLinks.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = docLinks.DOC_LINK_VERSION;
  var setFormState = actions.setFormState,
      setEstimatedModelMemoryLimit = actions.setEstimatedModelMemoryLimit;
  var mlContext = (0, _ml.useMlContext)();
  var form = state.form,
      indexPatternsMap = state.indexPatternsMap,
      isAdvancedEditorEnabled = state.isAdvancedEditorEnabled,
      isJobCreated = state.isJobCreated,
      requestMessages = state.requestMessages;
  var forceInput = (0, _react.useRef)(null);
  var firstUpdate = (0, _react.useRef)(true);
  var createIndexPattern = form.createIndexPattern,
      dependentVariable = form.dependentVariable,
      dependentVariableFetchFail = form.dependentVariableFetchFail,
      dependentVariableOptions = form.dependentVariableOptions,
      description = form.description,
      destinationIndex = form.destinationIndex,
      destinationIndexNameEmpty = form.destinationIndexNameEmpty,
      destinationIndexNameExists = form.destinationIndexNameExists,
      destinationIndexNameValid = form.destinationIndexNameValid,
      destinationIndexPatternTitleExists = form.destinationIndexPatternTitleExists,
      excludes = form.excludes,
      excludesOptions = form.excludesOptions,
      fieldOptionsFetchFail = form.fieldOptionsFetchFail,
      jobId = form.jobId,
      jobIdEmpty = form.jobIdEmpty,
      jobIdExists = form.jobIdExists,
      jobIdValid = form.jobIdValid,
      jobIdInvalidMaxLength = form.jobIdInvalidMaxLength,
      jobType = form.jobType,
      loadingDepVarOptions = form.loadingDepVarOptions,
      loadingFieldOptions = form.loadingFieldOptions,
      maxDistinctValuesError = form.maxDistinctValuesError,
      modelMemoryLimit = form.modelMemoryLimit,
      modelMemoryLimitValidationResult = form.modelMemoryLimitValidationResult,
      previousJobType = form.previousJobType,
      previousSourceIndex = form.previousSourceIndex,
      sourceIndex = form.sourceIndex,
      sourceIndexNameEmpty = form.sourceIndexNameEmpty,
      sourceIndexNameValid = form.sourceIndexNameValid,
      sourceIndexContainsNumericalFields = form.sourceIndexContainsNumericalFields,
      sourceIndexFieldsCheckFailed = form.sourceIndexFieldsCheckFailed,
      trainingPercent = form.trainingPercent;

  var characterList = _public.indexPatterns.ILLEGAL_CHARACTERS_VISIBLE.join(', ');

  var mmlErrors = (0, _react.useMemo)(function () {
    return (0, _reducer.getModelMemoryLimitErrors)(modelMemoryLimitValidationResult);
  }, [modelMemoryLimitValidationResult]);
  var isJobTypeWithDepVar = jobType === _analytics.ANALYSIS_CONFIG_TYPE.REGRESSION || jobType === _analytics.ANALYSIS_CONFIG_TYPE.CLASSIFICATION; // Find out if index pattern contain numeric fields. Provides a hint in the form
  // that an analytics jobs is not able to identify outliers if there are no numeric fields present.

  var validateSourceIndexFields =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var indexPattern, containsNumericalFields;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return mlContext.indexPatterns.get(indexPatternsMap[sourceIndex].value);

            case 3:
              indexPattern = _context.sent;
              containsNumericalFields = indexPattern.fields.some(function (_ref3) {
                var name = _ref3.name,
                    type = _ref3.type;
                return !_form_options_validation.OMIT_FIELDS.includes(name) && type === 'number';
              });
              setFormState({
                sourceIndexContainsNumericalFields: containsNumericalFields,
                sourceIndexFieldsCheckFailed: false
              });
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              setFormState({
                sourceIndexFieldsCheckFailed: true
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function validateSourceIndexFields() {
      return _ref2.apply(this, arguments);
    };
  }();

  var onCreateOption = function onCreateOption(searchValue, flattenedOptions) {
    var normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    var newOption = {
      label: searchValue
    }; // Create the option if it doesn't exist.

    if (!flattenedOptions.some(function (option) {
      return option.label.trim().toLowerCase() === normalizedSearchValue;
    })) {
      excludesOptions.push(newOption);
      setFormState({
        excludes: [].concat(_toConsumableArray(excludes), [newOption.label])
      });
    }
  };

  var debouncedGetExplainData = (0, _lodash.debounce)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var shouldUpdateModelMemoryLimit, _resp$memory_estimati, jobConfig, resp, expectedMemoryWithoutDisk, analyzedFieldsOptions, errorMessage, fallbackModelMemoryLimit;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            shouldUpdateModelMemoryLimit = !firstUpdate.current || !modelMemoryLimit;

            if (firstUpdate.current) {
              firstUpdate.current = false;
            } // Reset if sourceIndex or jobType changes (jobType requires dependent_variable to be set -
            // which won't be the case if switching from outlier detection)


            if (previousSourceIndex !== sourceIndex || previousJobType !== jobType) {
              setFormState({
                loadingFieldOptions: true
              });
            }

            _context2.prev = 3;
            jobConfig = (0, _state.getJobConfigFromFormState)(form);
            delete jobConfig.dest;
            delete jobConfig.model_memory_limit;
            delete jobConfig.analyzed_fields;
            _context2.next = 10;
            return _ml_api_service.ml.dataFrameAnalytics.explainDataFrameAnalytics(jobConfig);

          case 10:
            resp = _context2.sent;
            expectedMemoryWithoutDisk = (_resp$memory_estimati = resp.memory_estimation) === null || _resp$memory_estimati === void 0 ? void 0 : _resp$memory_estimati.expected_memory_without_disk;

            if (shouldUpdateModelMemoryLimit) {
              setEstimatedModelMemoryLimit(expectedMemoryWithoutDisk);
            } // If sourceIndex has changed load analysis field options again


            if (previousSourceIndex !== sourceIndex || previousJobType !== jobType) {
              analyzedFieldsOptions = [];

              if (resp.field_selection) {
                resp.field_selection.forEach(function (selectedField) {
                  if (selectedField.is_included === true && selectedField.name !== dependentVariable) {
                    analyzedFieldsOptions.push({
                      label: selectedField.name
                    });
                  }
                });
              }

              setFormState(_objectSpread({}, shouldUpdateModelMemoryLimit ? {
                modelMemoryLimit: expectedMemoryWithoutDisk
              } : {}, {
                excludesOptions: analyzedFieldsOptions,
                loadingFieldOptions: false,
                fieldOptionsFetchFail: false,
                maxDistinctValuesError: undefined
              }));
            } else {
              setFormState(_objectSpread({}, shouldUpdateModelMemoryLimit ? {
                modelMemoryLimit: expectedMemoryWithoutDisk
              } : {}));
            }

            _context2.next = 22;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](3);

            if (jobType === _analytics.ANALYSIS_CONFIG_TYPE.CLASSIFICATION && _context2.t0.message !== undefined && _context2.t0.message.includes('status_exception') && _context2.t0.message.includes('must have at most')) {
              errorMessage = _context2.t0.message;
            }

            fallbackModelMemoryLimit = jobType !== undefined ? _state.DEFAULT_MODEL_MEMORY_LIMIT[jobType] : _state.DEFAULT_MODEL_MEMORY_LIMIT.outlier_detection;
            setEstimatedModelMemoryLimit(fallbackModelMemoryLimit);
            setFormState(_objectSpread({
              fieldOptionsFetchFail: true,
              maxDistinctValuesError: errorMessage,
              loadingFieldOptions: false
            }, shouldUpdateModelMemoryLimit ? {
              modelMemoryLimit: fallbackModelMemoryLimit
            } : {}));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 16]]);
  })), 400);

  var loadDepVarOptions =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(formState) {
      var indexPattern, formStateUpdate, fields, resetDependentVariable, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, field;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setFormState({
                loadingDepVarOptions: true,
                // clear when the source index changes
                maxDistinctValuesError: undefined,
                sourceIndexFieldsCheckFailed: false,
                sourceIndexContainsNumericalFields: true
              });
              _context3.prev = 1;
              _context3.next = 4;
              return mlContext.indexPatterns.get(indexPatternsMap[sourceIndex].value);

            case 4:
              indexPattern = _context3.sent;

              if (!(indexPattern !== undefined)) {
                _context3.next = 32;
                break;
              }

              formStateUpdate = {
                loadingDepVarOptions: false,
                dependentVariableFetchFail: false,
                dependentVariableOptions: []
              };
              _context3.next = 9;
              return _new_job_capabilities_service.newJobCapsService.initializeFromIndexPattern(indexPattern, false, false);

            case 9:
              // Get fields and filter for supported types for job type
              fields = _new_job_capabilities_service.newJobCapsService.fields;
              resetDependentVariable = true;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context3.prev = 14;

              for (_iterator = fields[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                field = _step.value;

                if ((0, _form_options_validation.shouldAddAsDepVarOption)(field, jobType)) {
                  formStateUpdate.dependentVariableOptions.push({
                    label: field.id
                  });

                  if (formState.dependentVariable === field.id) {
                    resetDependentVariable = false;
                  }
                }
              }

              _context3.next = 22;
              break;

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](14);
              _didIteratorError = true;
              _iteratorError = _context3.t0;

            case 22:
              _context3.prev = 22;
              _context3.prev = 23;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 25:
              _context3.prev = 25;

              if (!_didIteratorError) {
                _context3.next = 28;
                break;
              }

              throw _iteratorError;

            case 28:
              return _context3.finish(25);

            case 29:
              return _context3.finish(22);

            case 30:
              if (resetDependentVariable) {
                formStateUpdate.dependentVariable = '';
              }

              setFormState(formStateUpdate);

            case 32:
              _context3.next = 37;
              break;

            case 34:
              _context3.prev = 34;
              _context3.t1 = _context3["catch"](1);
              setFormState({
                loadingDepVarOptions: false,
                dependentVariableFetchFail: true
              });

            case 37:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 34], [14, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function loadDepVarOptions(_x) {
      return _ref5.apply(this, arguments);
    };
  }();

  var getSourceIndexErrorMessages = function getSourceIndexErrorMessages() {
    var errors = [];

    if (!sourceIndexNameEmpty && !sourceIndexNameValid) {
      errors.push(_react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.dataframe.analytics.create.sourceIndexInvalidError",
        defaultMessage: "Invalid source index name, it cannot contain spaces or the characters: {characterList}",
        values: {
          characterList: characterList
        }
      })));
    }

    if (sourceIndexFieldsCheckFailed === true) {
      errors.push(_react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.dataframe.analytics.create.sourceIndexFieldCheckError",
        defaultMessage: "There was a problem checking for numerical fields. Please refresh the page and try again."
      })));
    }

    return errors;
  };

  var onSourceIndexChange = function onSourceIndexChange(selectedOptions) {
    setFormState({
      excludes: [],
      excludesOptions: [],
      previousSourceIndex: sourceIndex,
      sourceIndex: selectedOptions[0].label || ''
    });
  };

  (0, _react.useEffect)(function () {
    if (isJobTypeWithDepVar && sourceIndexNameEmpty === false) {
      loadDepVarOptions(form);
    }

    if (jobType === _analytics.ANALYSIS_CONFIG_TYPE.OUTLIER_DETECTION && sourceIndexNameEmpty === false) {
      validateSourceIndexFields();
    }
  }, [sourceIndex, jobType, sourceIndexNameEmpty]);
  (0, _react.useEffect)(function () {
    var hasBasicRequiredFields = jobType !== undefined && sourceIndex !== '' && sourceIndexNameValid === true;
    var hasRequiredAnalysisFields = isJobTypeWithDepVar && dependentVariable !== '' || jobType === _analytics.ANALYSIS_CONFIG_TYPE.OUTLIER_DETECTION;

    if (hasBasicRequiredFields && hasRequiredAnalysisFields) {
      debouncedGetExplainData();
    }

    return function () {
      debouncedGetExplainData.cancel();
    };
  }, [jobType, sourceIndex, sourceIndexNameEmpty, dependentVariable, trainingPercent]); // Temp effect to close the context menu popover on Clone button click

  (0, _react.useEffect)(function () {
    if (forceInput.current === null) {
      return;
    }

    var evt = document.createEvent('MouseEvents');
    evt.initEvent('mouseup', true, true);
    forceInput.current.dispatchEvent(evt);
  }, []);
  return _react.default.createElement(_eui.EuiForm, {
    className: "mlDataFrameAnalyticsCreateForm"
  }, _react.default.createElement(_messages.Messages, {
    messages: requestMessages
  }), !isJobCreated && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_job_type.JobType, {
    type: jobType,
    setFormState: setFormState
  }), _react.default.createElement(_eui.EuiFormRow, {
    helpText: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.enableAdvancedEditorHelpText', {
      defaultMessage: 'You cannot switch back to this form from the advanced editor.'
    })
  }, _react.default.createElement(_eui.EuiSwitch, {
    disabled: jobType === undefined,
    compressed: true,
    name: "mlDataFrameAnalyticsEnableAdvancedEditor",
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.enableAdvancedEditorSwitch', {
      defaultMessage: 'Enable advanced editor'
    }),
    checked: isAdvancedEditorEnabled,
    onChange: actions.switchToAdvancedEditor,
    "data-test-subj": "mlAnalyticsCreateJobFlyoutAdvancedEditorSwitch"
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.jobIdLabel', {
      defaultMessage: 'Job ID'
    }),
    isInvalid: !jobIdEmpty && !jobIdValid || jobIdExists || jobIdInvalidMaxLength,
    error: [].concat(_toConsumableArray(!jobIdEmpty && !jobIdValid ? [_i18n.i18n.translate('xpack.ml.dataframe.analytics.create.jobIdInvalidError', {
      defaultMessage: 'Must contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores only and must start and end with alphanumeric characters.'
    })] : []), _toConsumableArray(jobIdExists ? [_i18n.i18n.translate('xpack.ml.dataframe.analytics.create.jobIdExistsError', {
      defaultMessage: 'An analytics job with this ID already exists.'
    })] : []), _toConsumableArray(jobIdInvalidMaxLength ? [_i18n.i18n.translate('xpack.ml.dataframe.analytics.create.jobIdInvalidMaxLengthErrorMessage', {
      defaultMessage: 'Job ID must be no more than {maxLength, plural, one {# character} other {# characters}} long.',
      values: {
        maxLength: _validation.JOB_ID_MAX_LENGTH
      }
    })] : []))
  }, _react.default.createElement(_eui.EuiFieldText, {
    inputRef: function inputRef(input) {
      if (input) {
        forceInput.current = input;
      }
    },
    disabled: isJobCreated,
    placeholder: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.jobIdPlaceholder', {
      defaultMessage: 'Job ID'
    }),
    value: jobId,
    onChange: function onChange(e) {
      return setFormState({
        jobId: e.target.value
      });
    },
    "aria-label": _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.jobIdInputAriaLabel', {
      defaultMessage: 'Choose a unique analytics job ID.'
    }),
    isInvalid: !jobIdEmpty && !jobIdValid || jobIdExists,
    "data-test-subj": "mlAnalyticsCreateJobFlyoutJobIdInput"
  })), _react.default.createElement(_job_description.JobDescriptionInput, {
    description: description,
    setFormState: setFormState
  }), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.sourceIndexLabel', {
      defaultMessage: 'Source index'
    }),
    helpText: !sourceIndexNameEmpty && !sourceIndexContainsNumericalFields && _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.sourceIndexHelpText', {
      defaultMessage: 'This index pattern does not contain any numeric type fields. The analytics job may not be able to come up with any outliers.'
    }),
    isInvalid: !sourceIndexNameEmpty && !sourceIndexNameValid,
    error: getSourceIndexErrorMessages()
  }, _react.default.createElement(_react.Fragment, null, !isJobCreated && _react.default.createElement(_eui.EuiComboBox, {
    placeholder: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.sourceIndexPlaceholder', {
      defaultMessage: 'Choose a source index pattern.'
    }),
    singleSelection: {
      asPlainText: true
    },
    options: Object.values(indexPatternsMap).sort(function (a, b) {
      return a.label.localeCompare(b.label);
    }),
    selectedOptions: indexPatternsMap[sourceIndex] !== undefined ? [{
      label: sourceIndex
    }] : [],
    onChange: onSourceIndexChange,
    isClearable: false,
    "data-test-subj": "mlAnalyticsCreateJobFlyoutSourceIndexSelect"
  }), isJobCreated && _react.default.createElement(_eui.EuiFieldText, {
    disabled: true,
    value: sourceIndex,
    "aria-label": _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.sourceIndexInputAriaLabel', {
      defaultMessage: 'Source index pattern or search.'
    })
  }))), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.destinationIndexLabel', {
      defaultMessage: 'Destination index'
    }),
    isInvalid: !destinationIndexNameEmpty && !destinationIndexNameValid,
    helpText: destinationIndexNameExists && _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.destinationIndexHelpText', {
      defaultMessage: 'An index with this name already exists. Be aware that running this analytics job will modify this destination index.'
    }),
    error: !destinationIndexNameEmpty && !destinationIndexNameValid && [_react.default.createElement(_react.Fragment, null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.destinationIndexInvalidError', {
      defaultMessage: 'Invalid destination index name.'
    }), _react.default.createElement("br", null), _react.default.createElement(_eui.EuiLink, {
      href: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/indices-create-index.html#indices-create-index"),
      target: "_blank"
    }, _i18n.i18n.translate('xpack.ml.dataframe.stepDetailsForm.destinationIndexInvalidErrorLink', {
      defaultMessage: 'Learn more about index name limitations.'
    })))]
  }, _react.default.createElement(_eui.EuiFieldText, {
    disabled: isJobCreated,
    placeholder: "destination index",
    value: destinationIndex,
    onChange: function onChange(e) {
      return setFormState({
        destinationIndex: e.target.value
      });
    },
    "aria-label": _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.destinationIndexInputAriaLabel', {
      defaultMessage: 'Choose a unique destination index name.'
    }),
    isInvalid: !destinationIndexNameEmpty && !destinationIndexNameValid,
    "data-test-subj": "mlAnalyticsCreateJobFlyoutDestinationIndexInput"
  })), (jobType === _analytics.ANALYSIS_CONFIG_TYPE.REGRESSION || jobType === _analytics.ANALYSIS_CONFIG_TYPE.CLASSIFICATION) && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    isInvalid: maxDistinctValuesError !== undefined,
    error: _toConsumableArray(fieldOptionsFetchFail === true && maxDistinctValuesError !== undefined ? [_react.default.createElement(_react.Fragment, null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.dependentVariableMaxDistictValuesError', {
      defaultMessage: 'Invalid. {message}',
      values: {
        message: maxDistinctValuesError
      }
    }))] : [])
  }, _react.default.createElement(_react.Fragment, null)), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.dependentVariableLabel', {
      defaultMessage: 'Dependent variable'
    }),
    helpText: dependentVariableOptions.length === 0 && dependentVariableFetchFail === false && !sourceIndexNameEmpty && _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.dependentVariableOptionsNoNumericalFields', {
      defaultMessage: 'No numeric type fields were found for this index pattern.'
    }),
    isInvalid: maxDistinctValuesError !== undefined,
    error: _toConsumableArray(dependentVariableFetchFail === true ? [_react.default.createElement(_react.Fragment, null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.dependentVariableOptionsFetchError', {
      defaultMessage: 'There was a problem fetching fields. Please refresh the page and try again.'
    }))] : [])
  }, _react.default.createElement(_eui.EuiComboBox, {
    "aria-label": _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.dependentVariableInputAriaLabel', {
      defaultMessage: 'Enter field to be used as dependent variable.'
    }),
    placeholder: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.dependentVariablePlaceholder', {
      defaultMessage: 'dependent variable'
    }),
    isDisabled: isJobCreated,
    isLoading: loadingDepVarOptions,
    singleSelection: true,
    options: dependentVariableOptions,
    selectedOptions: dependentVariable ? [{
      label: dependentVariable
    }] : [],
    onChange: function onChange(selectedOptions) {
      return setFormState({
        dependentVariable: selectedOptions[0].label || ''
      });
    },
    isClearable: false,
    isInvalid: dependentVariable === '',
    "data-test-subj": "mlAnalyticsCreateJobFlyoutDependentVariableSelect"
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.trainingPercentLabel', {
      defaultMessage: 'Training percent'
    })
  }, _react.default.createElement(_eui.EuiRange, {
    min: _analytics.TRAINING_PERCENT_MIN,
    max: _analytics.TRAINING_PERCENT_MAX,
    step: 1,
    showLabels: true,
    showRange: true,
    showValue: true,
    value: trainingPercent // @ts-ignore Property 'value' does not exist on type 'EventTarget' | (EventTarget & HTMLInputElement)
    ,
    onChange: function onChange(e) {
      return setFormState({
        trainingPercent: +e.target.value
      });
    },
    "data-test-subj": "mlAnalyticsCreateJobFlyoutTrainingPercentSlider"
  }))), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.excludedFieldsLabel', {
      defaultMessage: 'Excluded fields'
    }),
    helpText: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.excludedFieldsHelpText', {
      defaultMessage: 'Select fields to exclude from analysis. All other supported fields are included.'
    }),
    error: excludesOptions.length === 0 && fieldOptionsFetchFail === false && !sourceIndexNameEmpty && [_i18n.i18n.translate('xpack.ml.dataframe.analytics.create.excludesOptionsNoSupportedFields', {
      defaultMessage: 'No supported analysis fields were found for this index pattern.'
    })]
  }, _react.default.createElement(_eui.EuiComboBox, {
    "aria-label": _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.excludesInputAriaLabel', {
      defaultMessage: 'Optional. Enter or select field to be excluded.'
    }),
    isDisabled: isJobCreated,
    isLoading: loadingFieldOptions,
    options: excludesOptions,
    selectedOptions: excludes.map(function (field) {
      return {
        label: field
      };
    }),
    onCreateOption: onCreateOption,
    onChange: function onChange(selectedOptions) {
      return setFormState({
        excludes: selectedOptions.map(function (option) {
          return option.label;
        })
      });
    },
    isClearable: true,
    "data-test-subj": "mlAnalyticsCreateJobFlyoutExcludesSelect"
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.modelMemoryLimitLabel', {
      defaultMessage: 'Model memory limit'
    }),
    isInvalid: modelMemoryLimitValidationResult !== null,
    error: mmlErrors
  }, _react.default.createElement(_eui.EuiFieldText, {
    placeholder: jobType !== undefined ? _state.DEFAULT_MODEL_MEMORY_LIMIT[jobType] : _state.DEFAULT_MODEL_MEMORY_LIMIT.outlier_detection,
    disabled: isJobCreated,
    value: modelMemoryLimit || '',
    onChange: function onChange(e) {
      return setFormState({
        modelMemoryLimit: e.target.value
      });
    },
    isInvalid: modelMemoryLimitValidationResult !== null,
    "data-test-subj": "mlAnalyticsCreateJobFlyoutModelMemoryInput"
  })), _react.default.createElement(_eui.EuiFormRow, {
    isInvalid: createIndexPattern && destinationIndexPatternTitleExists,
    error: createIndexPattern && destinationIndexPatternTitleExists && [_i18n.i18n.translate('xpack.ml.dataframe.analytics.create.indexPatternExistsError', {
      defaultMessage: 'An index pattern with this title already exists.'
    })]
  }, _react.default.createElement(_eui.EuiSwitch, {
    disabled: isJobCreated,
    name: "mlDataFrameAnalyticsCreateIndexPattern",
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.createIndexPatternLabel', {
      defaultMessage: 'Create index pattern'
    }),
    checked: createIndexPattern === true,
    onChange: function onChange() {
      return setFormState({
        createIndexPattern: !createIndexPattern
      });
    },
    "data-test-subj": "mlAnalyticsCreateJobFlyoutCreateIndexPatternSwitch"
  }))));
};

exports.CreateAnalyticsForm = CreateAnalyticsForm;