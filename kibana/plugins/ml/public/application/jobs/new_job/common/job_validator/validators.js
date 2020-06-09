"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCardinalityModelPlotHigh = isCardinalityModelPlotHigh;
exports.cardinalityValidator = cardinalityValidator;
exports.VALIDATOR_SEVERITY = void 0;

var _operators = require("rxjs/operators");

var _ml_api_service = require("../../../../services/ml_api_service");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VALIDATOR_SEVERITY;
exports.VALIDATOR_SEVERITY = VALIDATOR_SEVERITY;

(function (VALIDATOR_SEVERITY) {
  VALIDATOR_SEVERITY[VALIDATOR_SEVERITY["ERROR"] = 0] = "ERROR";
  VALIDATOR_SEVERITY[VALIDATOR_SEVERITY["WARNING"] = 1] = "WARNING";
})(VALIDATOR_SEVERITY || (exports.VALIDATOR_SEVERITY = VALIDATOR_SEVERITY = {}));

function isCardinalityModelPlotHigh(cardinalityValidationResult) {
  return cardinalityValidationResult.modelPlotCardinality !== undefined;
}

function cardinalityValidator(jobCreator$) {
  return jobCreator$.pipe( // Perform a cardinality check only with enabled model plot.
  (0, _operators.filter)(function (jobCreator) {
    return jobCreator === null || jobCreator === void 0 ? void 0 : jobCreator.modelPlot;
  }), (0, _operators.map)(function (jobCreator) {
    return {
      jobCreator: jobCreator,
      analysisConfigString: JSON.stringify(jobCreator.jobConfig.analysis_config)
    };
  }), // No need to perform an API call if the analysis configuration hasn't been changed
  (0, _operators.distinctUntilChanged)(function (prev, curr) {
    return prev.analysisConfigString === curr.analysisConfigString;
  }), (0, _operators.switchMap)(function (_ref) {
    var jobCreator = _ref.jobCreator;
    return _ml_api_service.ml.validateCardinality$(_objectSpread({}, jobCreator.jobConfig, {
      datafeed_config: jobCreator.datafeedConfig
    }));
  }), (0, _operators.map)(function (validationResults) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = validationResults[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var validationResult = _step.value;

        if (isCardinalityModelPlotHigh(validationResult)) {
          return {
            highCardinality: {
              value: validationResult.modelPlotCardinality,
              severity: VALIDATOR_SEVERITY.WARNING
            }
          };
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return null;
  }));
}