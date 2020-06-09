"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModelMemoryLimitErrors = getModelMemoryLimitErrors;
exports.validateMinMML = validateMinMML;
exports.reducer = reducer;
exports.validateAdvancedEditor = exports.mmlUnitInvalidErrorMessage = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _es_utils = require("../../../../../../../common/util/es_utils");

var _json_xjson_translation_tools = require("../../../../../../../../../../src/plugins/es_ui_shared/console_lang/lib/json_xjson_translation_tools");

var _actions = require("./actions");

var _state = require("./state");

var _job_utils = require("../../../../../../../common/util/job_utils");

var _validators = require("../../../../../../../common/util/validators");

var _validation = require("../../../../../../../common/constants/validation");

var _analytics = require("../../../../common/analytics");

var _public = require("../../../../../../../../../../src/plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var mmlAllowedUnitsStr = "".concat(_validation.ALLOWED_DATA_UNITS.slice(0, _validation.ALLOWED_DATA_UNITS.length - 1).join(', '), " or ").concat(_toConsumableArray(_validation.ALLOWED_DATA_UNITS).pop());

var mmlUnitInvalidErrorMessage = _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.modelMemoryUnitsInvalidError', {
  defaultMessage: 'Model memory limit data unit unrecognized. It must be {str}',
  values: {
    str: mmlAllowedUnitsStr
  }
});
/**
 * Returns the list of model memory limit errors based on validation result.
 * @param mmlValidationResult
 */


exports.mmlUnitInvalidErrorMessage = mmlUnitInvalidErrorMessage;

function getModelMemoryLimitErrors(mmlValidationResult) {
  if (mmlValidationResult === null) {
    return null;
  }

  return Object.keys(mmlValidationResult).reduce(function (acc, errorKey) {
    if (errorKey === 'min') {
      acc.push(_i18n.i18n.translate('xpack.ml.dataframe.analytics.create.modelMemoryUnitsMinError', {
        defaultMessage: 'Model memory limit cannot be lower than {mml}',
        values: {
          mml: mmlValidationResult.min.minValue
        }
      }));
    }

    if (errorKey === 'invalidUnits') {
      acc.push(_i18n.i18n.translate('xpack.ml.dataframe.analytics.create.modelMemoryUnitsInvalidError', {
        defaultMessage: 'Model memory limit data unit unrecognized. It must be {str}',
        values: {
          str: mmlAllowedUnitsStr
        }
      }));
    }

    return acc;
  }, []);
}

var getSourceIndexString = function getSourceIndexString(state) {
  var _jobConfig$source;

  var jobConfig = state.jobConfig;
  var sourceIndex = jobConfig === null || jobConfig === void 0 ? void 0 : (_jobConfig$source = jobConfig.source) === null || _jobConfig$source === void 0 ? void 0 : _jobConfig$source.index;

  if (typeof sourceIndex === 'string') {
    return sourceIndex;
  }

  if (Array.isArray(sourceIndex)) {
    return sourceIndex.join(',');
  }

  return '';
};

var validateAdvancedEditor = function validateAdvancedEditor(state) {
  var _jobConfig$source2, _ref, _jobConfig$dest;

  var _state$form = state.form,
      jobIdEmpty = _state$form.jobIdEmpty,
      jobIdValid = _state$form.jobIdValid,
      jobIdExists = _state$form.jobIdExists,
      jobType = _state$form.jobType,
      createIndexPattern = _state$form.createIndexPattern,
      excludes = _state$form.excludes,
      maxDistinctValuesError = _state$form.maxDistinctValuesError;
  var jobConfig = state.jobConfig;
  state.advancedEditorMessages = [];
  var sourceIndexName = getSourceIndexString(state);
  var sourceIndexNameEmpty = sourceIndexName === ''; // general check against Kibana index pattern names, but since this is about the advanced editor
  // with support for arrays in the job config, we also need to check that each individual name
  // doesn't include a comma if index names are supplied as an array.
  // `indexPatterns.validate()` returns a map of messages, we're only interested here if it's valid or not.
  // If there are no messages, it means the index pattern is valid.

  var sourceIndexNameValid = Object.keys(_public.indexPatterns.validate(sourceIndexName)).length === 0;
  var sourceIndex = jobConfig === null || jobConfig === void 0 ? void 0 : (_jobConfig$source2 = jobConfig.source) === null || _jobConfig$source2 === void 0 ? void 0 : _jobConfig$source2.index;

  if (sourceIndexNameValid) {
    if (typeof sourceIndex === 'string') {
      sourceIndexNameValid = !sourceIndex.includes(',');
    }

    if (Array.isArray(sourceIndex)) {
      sourceIndexNameValid = !sourceIndex.some(function (d) {
        return d === null || d === void 0 ? void 0 : d.includes(',');
      });
    }
  }

  var destinationIndexName = (_ref = jobConfig === null || jobConfig === void 0 ? void 0 : (_jobConfig$dest = jobConfig.dest) === null || _jobConfig$dest === void 0 ? void 0 : _jobConfig$dest.index) !== null && _ref !== void 0 ? _ref : '';
  var destinationIndexNameEmpty = destinationIndexName === '';
  var destinationIndexNameValid = (0, _es_utils.isValidIndexName)(destinationIndexName);
  var destinationIndexPatternTitleExists = state.indexPatternsMap[destinationIndexName] !== undefined;
  var mml = jobConfig.model_memory_limit;
  var modelMemoryLimitEmpty = mml === '' || mml === undefined;

  if (!modelMemoryLimitEmpty && mml !== undefined) {
    var _validateModelMemoryL = (0, _job_utils.validateModelMemoryLimitUnits)(mml),
        valid = _validateModelMemoryL.valid;

    state.form.modelMemoryLimitUnitValid = valid;
  }

  var dependentVariableEmpty = false;
  var excludesValid = true;
  var trainingPercentValid = true;

  if (jobConfig.analysis === undefined && (jobType === _analytics.ANALYSIS_CONFIG_TYPE.CLASSIFICATION || jobType === _analytics.ANALYSIS_CONFIG_TYPE.REGRESSION)) {
    dependentVariableEmpty = true;
  }

  if (jobConfig.analysis !== undefined && ((0, _analytics.isRegressionAnalysis)(jobConfig.analysis) || (0, _analytics.isClassificationAnalysis)(jobConfig.analysis))) {
    var dependentVariableName = (0, _analytics.getDependentVar)(jobConfig.analysis) || '';
    dependentVariableEmpty = dependentVariableName === '';

    if (!dependentVariableEmpty && excludes.includes(dependentVariableName)) {
      excludesValid = false;
      state.advancedEditorMessages.push({
        error: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditorMessage.excludesInvalid', {
          defaultMessage: 'The dependent variable cannot be excluded.'
        }),
        message: ''
      });
    }

    var trainingPercent = (0, _analytics.getTrainingPercent)(jobConfig.analysis);

    if (trainingPercent !== undefined && (isNaN(trainingPercent) || trainingPercent < _analytics.TRAINING_PERCENT_MIN || trainingPercent > _analytics.TRAINING_PERCENT_MAX)) {
      trainingPercentValid = false;
      state.advancedEditorMessages.push({
        error: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditorMessage.trainingPercentInvalid', {
          defaultMessage: 'The training percent must be a value between {min} and {max}.',
          values: {
            min: _analytics.TRAINING_PERCENT_MIN,
            max: _analytics.TRAINING_PERCENT_MAX
          }
        }),
        message: ''
      });
    }
  }

  if (sourceIndexNameEmpty) {
    state.advancedEditorMessages.push({
      error: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditorMessage.sourceIndexNameEmpty', {
        defaultMessage: 'The source index name must not be empty.'
      }),
      message: ''
    });
  } else if (!sourceIndexNameValid) {
    state.advancedEditorMessages.push({
      error: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditorMessage.sourceIndexNameValid', {
        defaultMessage: 'Invalid source index name.'
      }),
      message: ''
    });
  }

  if (destinationIndexNameEmpty) {
    state.advancedEditorMessages.push({
      error: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditorMessage.destinationIndexNameEmpty', {
        defaultMessage: 'The destination index name must not be empty.'
      }),
      message: ''
    });
  } else if (destinationIndexPatternTitleExists && !createIndexPattern) {
    state.advancedEditorMessages.push({
      error: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditorMessage.destinationIndexNameExistsWarn', {
        defaultMessage: 'An index with this destination index name already exists. Be aware that running this analytics job will modify this destination index.'
      }),
      message: ''
    });
  } else if (!destinationIndexNameValid) {
    state.advancedEditorMessages.push({
      error: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditorMessage.destinationIndexNameValid', {
        defaultMessage: 'Invalid destination index name.'
      }),
      message: ''
    });
  }

  if (dependentVariableEmpty) {
    state.advancedEditorMessages.push({
      error: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditorMessage.dependentVariableEmpty', {
        defaultMessage: 'The dependent variable field must not be empty.'
      }),
      message: ''
    });
  }

  if (modelMemoryLimitEmpty) {
    state.advancedEditorMessages.push({
      error: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditorMessage.modelMemoryLimitEmpty', {
        defaultMessage: 'The model memory limit field must not be empty.'
      }),
      message: ''
    });
  }

  if (!state.form.modelMemoryLimitUnitValid) {
    state.advancedEditorMessages.push({
      error: mmlUnitInvalidErrorMessage,
      message: ''
    });
  }

  state.form.destinationIndexPatternTitleExists = destinationIndexPatternTitleExists;
  state.isValid = maxDistinctValuesError === undefined && excludesValid && trainingPercentValid && state.form.modelMemoryLimitUnitValid && !jobIdEmpty && jobIdValid && !jobIdExists && !sourceIndexNameEmpty && sourceIndexNameValid && !destinationIndexNameEmpty && destinationIndexNameValid && !dependentVariableEmpty && !modelMemoryLimitEmpty && (!destinationIndexPatternTitleExists || !createIndexPattern);
  return state;
};
/**
 * Validates provided MML isn't lower than the estimated one.
 */


exports.validateAdvancedEditor = validateAdvancedEditor;

function validateMinMML(estimatedMml) {
  return function (mml) {
    if (!mml || !estimatedMml) {
      return null;
    } // @ts-ignore


    var mmlInBytes = (0, _numeral.default)(mml.toUpperCase()).value(); // @ts-ignore

    var estimatedMmlInBytes = (0, _numeral.default)(estimatedMml.toUpperCase()).value();
    return estimatedMmlInBytes > mmlInBytes ? {
      min: {
        minValue: estimatedMml,
        actualValue: mml
      }
    } : null;
  };
}
/**
 * Result validator function for the MML.
 * Re-init only if the estimated mml has been changed.
 */


var mmlValidator = (0, _lodash.memoize)(function (estimatedMml) {
  return (0, _validators.composeValidators)((0, _validators.requiredValidator)(), validateMinMML(estimatedMml), (0, _validators.memoryInputValidator)());
});
var validateMml = (0, _lodash.memoize)(function (estimatedMml, mml) {
  return mmlValidator(estimatedMml)(mml);
}, function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.join('_');
});

var validateForm = function validateForm(state) {
  var _state$form2 = state.form,
      jobIdEmpty = _state$form2.jobIdEmpty,
      jobIdValid = _state$form2.jobIdValid,
      jobIdExists = _state$form2.jobIdExists,
      jobType = _state$form2.jobType,
      sourceIndexNameEmpty = _state$form2.sourceIndexNameEmpty,
      sourceIndexNameValid = _state$form2.sourceIndexNameValid,
      destinationIndexNameEmpty = _state$form2.destinationIndexNameEmpty,
      destinationIndexNameValid = _state$form2.destinationIndexNameValid,
      destinationIndexPatternTitleExists = _state$form2.destinationIndexPatternTitleExists,
      createIndexPattern = _state$form2.createIndexPattern,
      dependentVariable = _state$form2.dependentVariable,
      maxDistinctValuesError = _state$form2.maxDistinctValuesError,
      modelMemoryLimit = _state$form2.modelMemoryLimit;
  var estimatedModelMemoryLimit = state.estimatedModelMemoryLimit;
  var jobTypeEmpty = jobType === undefined;
  var dependentVariableEmpty = (jobType === _analytics.ANALYSIS_CONFIG_TYPE.REGRESSION || jobType === _analytics.ANALYSIS_CONFIG_TYPE.CLASSIFICATION) && dependentVariable === '';
  var mmlValidationResult = validateMml(estimatedModelMemoryLimit, modelMemoryLimit);
  state.form.modelMemoryLimitValidationResult = mmlValidationResult;
  state.isValid = maxDistinctValuesError === undefined && !jobTypeEmpty && !mmlValidationResult && !jobIdEmpty && jobIdValid && !jobIdExists && !sourceIndexNameEmpty && sourceIndexNameValid && !destinationIndexNameEmpty && destinationIndexNameValid && !dependentVariableEmpty && (!destinationIndexPatternTitleExists || !createIndexPattern);
  return state;
};

function reducer(state, action) {
  switch (action.type) {
    case _actions.ACTION.ADD_REQUEST_MESSAGE:
      var requestMessages = state.requestMessages;
      requestMessages.push(action.requestMessage);
      return _objectSpread({}, state, {
        requestMessages: requestMessages
      });

    case _actions.ACTION.RESET_REQUEST_MESSAGES:
      return _objectSpread({}, state, {
        requestMessages: []
      });

    case _actions.ACTION.CLOSE_MODAL:
      return _objectSpread({}, state, {
        isModalVisible: false
      });

    case _actions.ACTION.OPEN_MODAL:
      return _objectSpread({}, state, {
        isModalVisible: true
      });

    case _actions.ACTION.RESET_ADVANCED_EDITOR_MESSAGES:
      return _objectSpread({}, state, {
        advancedEditorMessages: []
      });

    case _actions.ACTION.RESET_FORM:
      return (0, _state.getInitialState)();

    case _actions.ACTION.SET_ADVANCED_EDITOR_RAW_STRING:
      var resultJobConfig;

      try {
        resultJobConfig = JSON.parse((0, _json_xjson_translation_tools.collapseLiteralStrings)(action.advancedEditorRawString));
      } catch (e) {
        return _objectSpread({}, state, {
          advancedEditorRawString: action.advancedEditorRawString,
          isAdvancedEditorValidJson: false,
          advancedEditorMessages: []
        });
      }

      return _objectSpread({}, validateAdvancedEditor(_objectSpread({}, state, {
        jobConfig: resultJobConfig
      })), {
        advancedEditorRawString: action.advancedEditorRawString,
        isAdvancedEditorValidJson: true
      });

    case _actions.ACTION.SET_FORM_STATE:
      var newFormState = _objectSpread({}, state.form, {}, action.payload); // update state attributes which are derived from other state attributes.


      if (action.payload.destinationIndex !== undefined) {
        newFormState.destinationIndexNameExists = state.indexNames.some(function (name) {
          return newFormState.destinationIndex === name;
        });
        newFormState.destinationIndexNameEmpty = newFormState.destinationIndex === '';
        newFormState.destinationIndexNameValid = (0, _es_utils.isValidIndexName)(newFormState.destinationIndex);
        newFormState.destinationIndexPatternTitleExists = state.indexPatternsMap[newFormState.destinationIndex] !== undefined;
      }

      if (action.payload.jobId !== undefined) {
        newFormState.jobIdExists = state.jobIds.some(function (id) {
          return newFormState.jobId === id;
        });
        newFormState.jobIdEmpty = newFormState.jobId === '';
        newFormState.jobIdValid = (0, _job_utils.isJobIdValid)(newFormState.jobId);
        newFormState.jobIdInvalidMaxLength = !!(0, _validators.maxLengthValidator)(_validation.JOB_ID_MAX_LENGTH)(newFormState.jobId);
      }

      if (action.payload.sourceIndex !== undefined) {
        newFormState.sourceIndexNameEmpty = newFormState.sourceIndex === '';

        var validationMessages = _public.indexPatterns.validate(newFormState.sourceIndex);

        newFormState.sourceIndexNameValid = Object.keys(validationMessages).length === 0;
      }

      return state.isAdvancedEditorEnabled ? validateAdvancedEditor(_objectSpread({}, state, {
        form: newFormState
      })) : validateForm(_objectSpread({}, state, {
        form: newFormState
      }));

    case _actions.ACTION.SET_INDEX_NAMES:
      {
        var newState = _objectSpread({}, state, {
          indexNames: action.indexNames
        });

        newState.form.destinationIndexNameExists = newState.indexNames.some(function (name) {
          return newState.form.destinationIndex === name;
        });
        return newState;
      }

    case _actions.ACTION.SET_INDEX_PATTERN_TITLES:
      {
        var _newState = _objectSpread({}, state, {}, action.payload);

        _newState.form.destinationIndexPatternTitleExists = _newState.indexPatternsMap[_newState.form.destinationIndex] !== undefined;
        return _newState;
      }

    case _actions.ACTION.SET_IS_JOB_CREATED:
      return _objectSpread({}, state, {
        isJobCreated: action.isJobCreated
      });

    case _actions.ACTION.SET_IS_JOB_STARTED:
      return _objectSpread({}, state, {
        isJobStarted: action.isJobStarted
      });

    case _actions.ACTION.SET_IS_MODAL_BUTTON_DISABLED:
      return _objectSpread({}, state, {
        isModalButtonDisabled: action.isModalButtonDisabled
      });

    case _actions.ACTION.SET_IS_MODAL_VISIBLE:
      return _objectSpread({}, state, {
        isModalVisible: action.isModalVisible
      });

    case _actions.ACTION.SET_JOB_CONFIG:
      return validateAdvancedEditor(_objectSpread({}, state, {
        jobConfig: action.payload
      }));

    case _actions.ACTION.SET_JOB_IDS:
      {
        var _newState2 = _objectSpread({}, state, {
          jobIds: action.jobIds
        });

        _newState2.form.jobIdExists = _newState2.jobIds.some(function (id) {
          return _newState2.form.jobId === id;
        });
        return _newState2;
      }

    case _actions.ACTION.SWITCH_TO_ADVANCED_EDITOR:
      var jobConfig = state.jobConfig;
      var isJobConfigEmpty = (0, _lodash.isEmpty)(state.jobConfig);

      if (isJobConfigEmpty) {
        jobConfig = (0, _state.getJobConfigFromFormState)(state.form);
      }

      return validateAdvancedEditor(_objectSpread({}, state, {
        advancedEditorRawString: JSON.stringify(jobConfig, null, 2),
        isAdvancedEditorEnabled: true,
        jobConfig: jobConfig
      }));

    case _actions.ACTION.SET_ESTIMATED_MODEL_MEMORY_LIMIT:
      return _objectSpread({}, state, {
        estimatedModelMemoryLimit: action.value
      });

    case _actions.ACTION.SET_JOB_CLONE:
      return _objectSpread({}, state, {
        cloneJob: action.cloneJob
      });
  }

  return state;
}