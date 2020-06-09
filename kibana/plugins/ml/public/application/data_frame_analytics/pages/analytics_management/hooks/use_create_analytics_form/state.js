"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCloneFormStateFromJobConfig = getCloneFormStateFromJobConfig;
exports.getJobConfigFromFormState = exports.getInitialState = exports.DEFAULT_MODEL_MEMORY_LIMIT = void 0;

var _check_privilege = require("../../../../../privilege/check_privilege");

var _ml_nodes_check = require("../../../../../ml_nodes_check");

var _new_job_capabilities_service = require("../../../../../services/new_job_capabilities_service");

var _analytics = require("../../../../common/analytics");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_MODEL_MEMORY_LIMIT;
exports.DEFAULT_MODEL_MEMORY_LIMIT = DEFAULT_MODEL_MEMORY_LIMIT;

(function (DEFAULT_MODEL_MEMORY_LIMIT) {
  DEFAULT_MODEL_MEMORY_LIMIT["regression"] = "100mb";
  DEFAULT_MODEL_MEMORY_LIMIT["outlier_detection"] = "50mb";
  DEFAULT_MODEL_MEMORY_LIMIT["classification"] = "100mb";
})(DEFAULT_MODEL_MEMORY_LIMIT || (exports.DEFAULT_MODEL_MEMORY_LIMIT = DEFAULT_MODEL_MEMORY_LIMIT = {}));

var getInitialState = function getInitialState() {
  return {
    advancedEditorMessages: [],
    advancedEditorRawString: '',
    form: {
      createIndexPattern: false,
      dependentVariable: '',
      dependentVariableFetchFail: false,
      dependentVariableOptions: [],
      description: '',
      destinationIndex: '',
      destinationIndexNameExists: false,
      destinationIndexNameEmpty: true,
      destinationIndexNameValid: false,
      destinationIndexPatternTitleExists: false,
      excludes: [],
      fieldOptionsFetchFail: false,
      excludesOptions: [],
      jobId: '',
      jobIdExists: false,
      jobIdEmpty: true,
      jobIdInvalidMaxLength: false,
      jobIdValid: false,
      jobType: undefined,
      loadingDepVarOptions: false,
      loadingFieldOptions: false,
      maxDistinctValuesError: undefined,
      modelMemoryLimit: undefined,
      modelMemoryLimitUnitValid: true,
      modelMemoryLimitValidationResult: null,
      previousJobType: null,
      previousSourceIndex: undefined,
      sourceIndex: '',
      sourceIndexNameEmpty: true,
      sourceIndexNameValid: false,
      sourceIndexContainsNumericalFields: true,
      sourceIndexFieldsCheckFailed: false,
      trainingPercent: 80
    },
    jobConfig: {},
    disabled: !(0, _ml_nodes_check.mlNodesAvailable)() || !(0, _check_privilege.checkPermission)('canCreateDataFrameAnalytics') || !(0, _check_privilege.checkPermission)('canStartStopDataFrameAnalytics'),
    indexNames: [],
    indexPatternsMap: {},
    isAdvancedEditorEnabled: false,
    isAdvancedEditorValidJson: true,
    isJobCreated: false,
    isJobStarted: false,
    isModalVisible: false,
    isModalButtonDisabled: false,
    isValid: false,
    jobIds: [],
    requestMessages: [],
    estimatedModelMemoryLimit: ''
  };
};

exports.getInitialState = getInitialState;

var getExcludesFields = function getExcludesFields(excluded) {
  var fields = _new_job_capabilities_service.newJobCapsService.fields;
  var updatedExcluded = []; // Loop through excluded fields to check for multiple types of same field

  for (var i = 0; i < excluded.length; i++) {
    var fieldName = excluded[i];
    var mainField = void 0; // No dot in fieldName - it is the main field

    if (fieldName.includes('.') === false) {
      mainField = fieldName;
    } else {
      // Dot in fieldName - check if there's a field whose name equals the fieldName with the last dot suffix removed
      var regex = /\.[^.]*$/;
      var suffixRemovedField = fieldName.replace(regex, '');

      var fieldMatch = _new_job_capabilities_service.newJobCapsService.getFieldById(suffixRemovedField); // There's a match - set as the main field


      if (fieldMatch !== null) {
        mainField = suffixRemovedField;
      } else {
        // No main field to be found - add the fieldName to updatedExcluded array if it's not already there
        if (updatedExcluded.includes(fieldName) === false) {
          updatedExcluded.push(fieldName);
        }
      }
    }

    if (mainField !== undefined) {
      // Add the main field to the updatedExcluded array if it's not already there
      if (updatedExcluded.includes(mainField) === false) {
        updatedExcluded.push(mainField);
      } // Create regex to find all other fields whose names begin with main field followed by a dot


      var _regex = new RegExp("".concat(mainField, "\\..+")); // Loop through fields and add fields matching the pattern to updatedExcluded array


      for (var j = 0; j < fields.length; j++) {
        var field = fields[j].name;

        if (updatedExcluded.includes(field) === false && field.match(_regex) !== null) {
          updatedExcluded.push(field);
        }
      }
    }
  }

  return updatedExcluded;
};

var getJobConfigFromFormState = function getJobConfigFromFormState(formState) {
  var jobConfig = {
    description: formState.description,
    source: {
      // If a Kibana index patterns includes commas, we need to split
      // the into an array of indices to be in the correct format for
      // the data frame analytics API.
      index: formState.sourceIndex.includes(',') ? formState.sourceIndex.split(',').map(function (d) {
        return d.trim();
      }) : formState.sourceIndex
    },
    dest: {
      index: formState.destinationIndex
    },
    analyzed_fields: {
      excludes: getExcludesFields(formState.excludes)
    },
    analysis: {
      outlier_detection: {}
    },
    model_memory_limit: formState.modelMemoryLimit
  };

  if (formState.jobType === _analytics.ANALYSIS_CONFIG_TYPE.REGRESSION || formState.jobType === _analytics.ANALYSIS_CONFIG_TYPE.CLASSIFICATION) {
    jobConfig.analysis = _defineProperty({}, formState.jobType, {
      dependent_variable: formState.dependentVariable,
      training_percent: formState.trainingPercent
    });
  }

  return jobConfig;
};
/**
 * Extracts form state for a job clone from the analytics job configuration.
 * For cloning we keep job id and destination index empty.
 */


exports.getJobConfigFromFormState = getJobConfigFromFormState;

function getCloneFormStateFromJobConfig(analyticsJobConfig) {
  var _analyticsJobConfig$d;

  var jobType = Object.keys(analyticsJobConfig.analysis)[0];
  var resultState = {
    jobType: jobType,
    description: (_analyticsJobConfig$d = analyticsJobConfig.description) !== null && _analyticsJobConfig$d !== void 0 ? _analyticsJobConfig$d : '',
    sourceIndex: Array.isArray(analyticsJobConfig.source.index) ? analyticsJobConfig.source.index.join(',') : analyticsJobConfig.source.index,
    modelMemoryLimit: analyticsJobConfig.model_memory_limit,
    excludes: analyticsJobConfig.analyzed_fields.excludes
  };

  if ((0, _analytics.isRegressionAnalysis)(analyticsJobConfig.analysis) || (0, _analytics.isClassificationAnalysis)(analyticsJobConfig.analysis)) {
    var analysisConfig = analyticsJobConfig.analysis[jobType];
    resultState.dependentVariable = analysisConfig.dependent_variable;
    resultState.trainingPercent = analysisConfig.training_percent;
  }

  return resultState;
}