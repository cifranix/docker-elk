"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFlattenedFields = getFlattenedFields;
exports.toggleSelectedField = exports.toggleSelectedFieldSimple = exports.getDefaultSelectableFields = exports.getDefaultRegressionFields = exports.getDefaultClassificationFields = exports.getDefaultFieldsFromJobCaps = exports.sortRegressionResultsColumns = exports.sortRegressionResultsFields = exports.sortColumns = exports.isKeywordAndTextType = exports.EXTENDED_NUMERICAL_TYPES = exports.BASIC_NUMERICAL_TYPES = exports.DEFAULT_REGRESSION_COLUMNS = exports.MAX_COLUMNS = void 0;

var _object_utils = require("../../util/object_utils");

var _analytics = require("./analytics");

var _public = require("../../../../../../../src/plugins/data/public");

var _new_job_capabilities_service = require("../../services/new_job_capabilities_service");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var MAX_COLUMNS = 20;
exports.MAX_COLUMNS = MAX_COLUMNS;
var DEFAULT_REGRESSION_COLUMNS = 8;
exports.DEFAULT_REGRESSION_COLUMNS = DEFAULT_REGRESSION_COLUMNS;
var BASIC_NUMERICAL_TYPES = new Set([_public.ES_FIELD_TYPES.LONG, _public.ES_FIELD_TYPES.INTEGER, _public.ES_FIELD_TYPES.SHORT, _public.ES_FIELD_TYPES.BYTE]);
exports.BASIC_NUMERICAL_TYPES = BASIC_NUMERICAL_TYPES;
var EXTENDED_NUMERICAL_TYPES = new Set([_public.ES_FIELD_TYPES.DOUBLE, _public.ES_FIELD_TYPES.FLOAT, _public.ES_FIELD_TYPES.HALF_FLOAT, _public.ES_FIELD_TYPES.SCALED_FLOAT]);
exports.EXTENDED_NUMERICAL_TYPES = EXTENDED_NUMERICAL_TYPES;
var ML__ID_COPY = 'ml__id_copy';

var isKeywordAndTextType = function isKeywordAndTextType(fieldName) {
  var _fields$find;

  var fields = _new_job_capabilities_service.newJobCapsService.fields;
  var fieldType = (_fields$find = fields.find(function (field) {
    return field.name === fieldName;
  })) === null || _fields$find === void 0 ? void 0 : _fields$find.type;
  var isBothTypes = false; // If it's a keyword type - check if it has a corresponding text type

  if (fieldType !== undefined && fieldType === _public.ES_FIELD_TYPES.KEYWORD) {
    var field = _new_job_capabilities_service.newJobCapsService.getFieldById(fieldName.replace(/\.keyword$/, ''));

    isBothTypes = field !== null && field.type === _public.ES_FIELD_TYPES.TEXT;
  } else if (fieldType !== undefined && fieldType === _public.ES_FIELD_TYPES.TEXT) {
    //   If text, check if has corresponding keyword type
    var _field = _new_job_capabilities_service.newJobCapsService.getFieldById("".concat(fieldName, ".keyword"));

    isBothTypes = _field !== null && _field.type === _public.ES_FIELD_TYPES.KEYWORD;
  }

  return isBothTypes;
}; // Used to sort columns:
// - string based columns are moved to the left
// - followed by the outlier_score column
// - feature_influence fields get moved next to the corresponding field column
// - overall fields get sorted alphabetically


exports.isKeywordAndTextType = isKeywordAndTextType;

var sortColumns = function sortColumns(obj, resultsField) {
  return function (a, b) {
    var typeofA = _typeof(obj[a]);

    var typeofB = _typeof(obj[b]);

    if (typeofA !== 'string' && typeofB === 'string') {
      return 1;
    }

    if (typeofA === 'string' && typeofB !== 'string') {
      return -1;
    }

    if (typeofA === 'string' && typeofB === 'string') {
      return a.localeCompare(b);
    }

    if (a === "".concat(resultsField, ".outlier_score")) {
      return -1;
    }

    if (b === "".concat(resultsField, ".outlier_score")) {
      return 1;
    }

    var tokensA = a.split('.');
    var prefixA = tokensA[0];
    var tokensB = b.split('.');
    var prefixB = tokensB[0];

    if (prefixA === resultsField && tokensA.length > 1 && prefixB !== resultsField) {
      tokensA.shift();
      tokensA.shift();
      if (tokensA.join('.') === b) return 1;
      return tokensA.join('.').localeCompare(b);
    }

    if (prefixB === resultsField && tokensB.length > 1 && prefixA !== resultsField) {
      tokensB.shift();
      tokensB.shift();
      if (tokensB.join('.') === a) return -1;
      return a.localeCompare(tokensB.join('.'));
    }

    return a.localeCompare(b);
  };
};

exports.sortColumns = sortColumns;

var sortRegressionResultsFields = function sortRegressionResultsFields(a, b, jobConfig) {
  var dependentVariable = (0, _analytics.getDependentVar)(jobConfig.analysis);
  var resultsField = jobConfig.dest.results_field;
  var predictedField = (0, _analytics.getPredictedFieldName)(resultsField, jobConfig.analysis, true);

  if (a === "".concat(resultsField, ".is_training")) {
    return -1;
  }

  if (b === "".concat(resultsField, ".is_training")) {
    return 1;
  }

  if (a === predictedField) {
    return -1;
  }

  if (b === predictedField) {
    return 1;
  }

  if (a === dependentVariable || a === dependentVariable.replace(/\.keyword$/, '')) {
    return -1;
  }

  if (b === dependentVariable || b === dependentVariable.replace(/\.keyword$/, '')) {
    return 1;
  }

  if (a === "".concat(resultsField, ".prediction_probability")) {
    return -1;
  }

  if (b === "".concat(resultsField, ".prediction_probability")) {
    return 1;
  }

  return a.localeCompare(b);
}; // Used to sort columns:
// Anchor on the left ml.is_training, <predictedField>, <actual>


exports.sortRegressionResultsFields = sortRegressionResultsFields;

var sortRegressionResultsColumns = function sortRegressionResultsColumns(obj, jobConfig) {
  return function (a, b) {
    var dependentVariable = (0, _analytics.getDependentVar)(jobConfig.analysis);
    var resultsField = jobConfig.dest.results_field;
    var predictedField = (0, _analytics.getPredictedFieldName)(resultsField, jobConfig.analysis, true);

    var typeofA = _typeof(obj[a]);

    var typeofB = _typeof(obj[b]);

    if (a === "".concat(resultsField, ".is_training")) {
      return -1;
    }

    if (b === "".concat(resultsField, ".is_training")) {
      return 1;
    }

    if (a === predictedField) {
      return -1;
    }

    if (b === predictedField) {
      return 1;
    }

    if (a === dependentVariable) {
      return -1;
    }

    if (b === dependentVariable) {
      return 1;
    }

    if (a === "".concat(resultsField, ".prediction_probability")) {
      return -1;
    }

    if (b === "".concat(resultsField, ".prediction_probability")) {
      return 1;
    }

    if (typeofA !== 'string' && typeofB === 'string') {
      return 1;
    }

    if (typeofA === 'string' && typeofB !== 'string') {
      return -1;
    }

    if (typeofA === 'string' && typeofB === 'string') {
      return a.localeCompare(b);
    }

    var tokensA = a.split('.');
    var prefixA = tokensA[0];
    var tokensB = b.split('.');
    var prefixB = tokensB[0];

    if (prefixA === resultsField && tokensA.length > 1 && prefixB !== resultsField) {
      tokensA.shift();
      tokensA.shift();
      if (tokensA.join('.') === b) return 1;
      return tokensA.join('.').localeCompare(b);
    }

    if (prefixB === resultsField && tokensB.length > 1 && prefixA !== resultsField) {
      tokensB.shift();
      tokensB.shift();
      if (tokensB.join('.') === a) return -1;
      return a.localeCompare(tokensB.join('.'));
    }

    return a.localeCompare(b);
  };
};

exports.sortRegressionResultsColumns = sortRegressionResultsColumns;

function getFlattenedFields(obj, resultsField) {
  var flatDocFields = [];
  var newDocFields = Object.keys(obj);
  newDocFields.forEach(function (f) {
    var fieldValue = (0, _object_utils.getNestedProperty)(obj, f);

    if (_typeof(fieldValue) !== 'object' || fieldValue === null || Array.isArray(fieldValue)) {
      flatDocFields.push(f);
    } else {
      var innerFields = getFlattenedFields(fieldValue, resultsField);
      var flattenedFields = innerFields.map(function (d) {
        return "".concat(f, ".").concat(d);
      });
      flatDocFields.push.apply(flatDocFields, _toConsumableArray(flattenedFields));
    }
  });
  return flatDocFields.filter(function (f) {
    return f !== ML__ID_COPY;
  });
}

var getDefaultFieldsFromJobCaps = function getDefaultFieldsFromJobCaps(fields, jobConfig, needsDestIndexFields) {
  var _newJobCapsService$ge;

  var fieldsObj = {
    selectedFields: [],
    docFields: []
  };

  if (fields.length === 0) {
    return fieldsObj;
  }

  var dependentVariable = (0, _analytics.getDependentVar)(jobConfig.analysis);
  var type = (_newJobCapsService$ge = _new_job_capabilities_service.newJobCapsService.getFieldById(dependentVariable)) === null || _newJobCapsService$ge === void 0 ? void 0 : _newJobCapsService$ge.type;
  var predictionFieldName = (0, _analytics.getPredictionFieldName)(jobConfig.analysis); // default is 'ml'

  var resultsField = jobConfig.dest.results_field;
  var defaultPredictionField = "".concat(dependentVariable, "_prediction");
  var predictedField = "".concat(resultsField, ".").concat(predictionFieldName ? predictionFieldName : defaultPredictionField); // Only need to add these first two fields if we didn't use dest index pattern to get the fields

  var allFields = needsDestIndexFields === true ? [{
    id: "".concat(resultsField, ".is_training"),
    name: "".concat(resultsField, ".is_training"),
    type: _public.ES_FIELD_TYPES.BOOLEAN
  }, {
    id: predictedField,
    name: predictedField,
    type: type
  }] : [];
  allFields.push.apply(allFields, _toConsumableArray(fields)); // @ts-ignore

  allFields.sort(function (_ref, _ref2) {
    var a = _ref.name;
    var b = _ref2.name;
    return sortRegressionResultsFields(a, b, jobConfig);
  });
  var selectedFields = allFields.slice(0, DEFAULT_REGRESSION_COLUMNS * 2).filter(function (field) {
    return field.name === predictedField || !field.name.includes('.keyword');
  });

  if (selectedFields.length > DEFAULT_REGRESSION_COLUMNS) {
    selectedFields = selectedFields.slice(0, DEFAULT_REGRESSION_COLUMNS);
  }

  return {
    selectedFields: selectedFields,
    docFields: allFields,
    depVarType: type
  };
};

exports.getDefaultFieldsFromJobCaps = getDefaultFieldsFromJobCaps;

var getDefaultClassificationFields = function getDefaultClassificationFields(docs, jobConfig) {
  if (docs.length === 0) {
    return [];
  }

  var resultsField = jobConfig.dest.results_field;
  var newDocFields = getFlattenedFields(docs[0]._source, resultsField);
  return newDocFields.filter(function (k) {
    if (k === "".concat(resultsField, ".is_training")) {
      return true;
    } // predicted value of dependent variable


    if (k === (0, _analytics.getPredictedFieldName)(resultsField, jobConfig.analysis, true)) {
      return true;
    } // actual value of dependent variable


    if (k === (0, _analytics.getDependentVar)(jobConfig.analysis)) {
      return true;
    }

    if (k === "".concat(resultsField, ".prediction_probability")) {
      return true;
    }

    if (k.split('.')[0] === resultsField) {
      return false;
    }

    return docs.some(function (row) {
      return row._source[k] !== null;
    });
  }).sort(function (a, b) {
    return sortRegressionResultsFields(a, b, jobConfig);
  }).slice(0, DEFAULT_REGRESSION_COLUMNS);
};

exports.getDefaultClassificationFields = getDefaultClassificationFields;

var getDefaultRegressionFields = function getDefaultRegressionFields(docs, jobConfig) {
  var resultsField = jobConfig.dest.results_field;

  if (docs.length === 0) {
    return [];
  }

  var newDocFields = getFlattenedFields(docs[0]._source, resultsField);
  return newDocFields.filter(function (k) {
    if (k === "".concat(resultsField, ".is_training")) {
      return true;
    } // predicted value of dependent variable


    if (k === (0, _analytics.getPredictedFieldName)(resultsField, jobConfig.analysis)) {
      return true;
    } // actual value of dependent variable


    if (k === (0, _analytics.getDependentVar)(jobConfig.analysis)) {
      return true;
    }

    if (k.split('.')[0] === resultsField) {
      return false;
    }

    return docs.some(function (row) {
      return row._source[k] !== null;
    });
  }).sort(function (a, b) {
    return sortRegressionResultsFields(a, b, jobConfig);
  }).slice(0, DEFAULT_REGRESSION_COLUMNS);
};

exports.getDefaultRegressionFields = getDefaultRegressionFields;

var getDefaultSelectableFields = function getDefaultSelectableFields(docs, resultsField) {
  if (docs.length === 0) {
    return [];
  }

  var newDocFields = getFlattenedFields(docs[0]._source, resultsField);
  return newDocFields.filter(function (k) {
    if (k === "".concat(resultsField, ".outlier_score")) {
      return true;
    }

    if (k.split('.')[0] === resultsField) {
      return false;
    }

    return docs.some(function (row) {
      return row._source[k] !== null;
    });
  });
};

exports.getDefaultSelectableFields = getDefaultSelectableFields;

var toggleSelectedFieldSimple = function toggleSelectedFieldSimple(selectedFields, column) {
  var index = selectedFields.indexOf(column);

  if (index === -1) {
    selectedFields.push(column);
  } else {
    selectedFields.splice(index, 1);
  }

  return selectedFields;
}; // Fields starting with 'ml' or custom result name not included in newJobCapsService fields so
// need to recreate the field with correct type and add to selected fields


exports.toggleSelectedFieldSimple = toggleSelectedFieldSimple;

var toggleSelectedField = function toggleSelectedField(selectedFields, column, resultsField, depVarType) {
  var index = selectedFields.map(function (field) {
    return field.name;
  }).indexOf(column);

  if (index === -1) {
    var columnField = _new_job_capabilities_service.newJobCapsService.getFieldById(column);

    if (columnField !== null) {
      selectedFields.push(columnField);
    } else {
      var resultFieldPattern = "^".concat(resultsField, ".");
      var regex = new RegExp(resultFieldPattern);
      var isResultField = column.match(regex) !== null;
      var newField;

      if (isResultField && column.includes('is_training')) {
        newField = {
          id: column,
          name: column,
          type: _public.ES_FIELD_TYPES.BOOLEAN
        };
      } else if (isResultField && depVarType !== undefined) {
        newField = {
          id: column,
          name: column,
          type: depVarType
        };
      }

      if (newField) selectedFields.push(newField);
    }
  } else {
    selectedFields.splice(index, 1);
  }

  return selectedFields;
};

exports.toggleSelectedField = toggleSelectedField;