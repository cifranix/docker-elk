"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdvancedConfig = isAdvancedConfig;
exports.extractCloningConfig = extractCloningConfig;
exports.getCloneAction = getCloneAction;
exports.CloneAction = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _common = require("../../../../common");

var _analytics = require("../../../../common/analytics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isPropDefinition(a) {
  return a.hasOwnProperty('optional');
}

/**
 * Provides a config definition.
 */
var getAnalyticsJobMeta = function getAnalyticsJobMeta(config) {
  return {
    allow_lazy_start: {
      optional: true,
      defaultValue: false
    },
    description: {
      optional: true,
      formKey: 'description'
    },
    analysis: _objectSpread({}, (0, _analytics.isClassificationAnalysis)(config.analysis) ? {
      classification: {
        dependent_variable: {
          optional: false,
          formKey: 'dependentVariable'
        },
        training_percent: {
          optional: true,
          formKey: 'trainingPercent'
        },
        eta: {
          optional: true
        },
        feature_bag_fraction: {
          optional: true
        },
        max_trees: {
          optional: true
        },
        gamma: {
          optional: true
        },
        lambda: {
          optional: true
        },
        num_top_classes: {
          optional: true,
          defaultValue: 2
        },
        prediction_field_name: {
          optional: true,
          defaultValue: "".concat(config.analysis.classification.dependent_variable, "_prediction")
        },
        randomize_seed: {
          optional: true,
          // By default it is randomly generated
          ignore: true
        },
        num_top_feature_importance_values: {
          optional: true
        },
        class_assignment_objective: {
          optional: true,
          defaultValue: 'maximize_minimum_recall'
        }
      }
    } : {}, {}, (0, _common.isOutlierAnalysis)(config.analysis) ? {
      outlier_detection: {
        standardization_enabled: {
          defaultValue: true,
          optional: true
        },
        compute_feature_influence: {
          defaultValue: true,
          optional: true
        },
        outlier_fraction: {
          defaultValue: 0.05,
          optional: true
        },
        feature_influence_threshold: {
          optional: true
        },
        method: {
          optional: true
        },
        n_neighbors: {
          optional: true
        }
      }
    } : {}, {}, (0, _analytics.isRegressionAnalysis)(config.analysis) ? {
      regression: {
        dependent_variable: {
          optional: false,
          formKey: 'dependentVariable'
        },
        training_percent: {
          optional: true,
          formKey: 'trainingPercent'
        },
        eta: {
          optional: true
        },
        feature_bag_fraction: {
          optional: true
        },
        max_trees: {
          optional: true
        },
        gamma: {
          optional: true
        },
        lambda: {
          optional: true
        },
        prediction_field_name: {
          optional: true,
          defaultValue: "".concat(config.analysis.regression.dependent_variable, "_prediction")
        },
        num_top_feature_importance_values: {
          optional: true
        },
        randomize_seed: {
          optional: true,
          // By default it is randomly generated
          ignore: true
        }
      }
    } : {}),
    analyzed_fields: {
      excludes: {
        optional: true,
        formKey: 'excludes',
        defaultValue: []
      },
      includes: {
        optional: true,
        defaultValue: []
      }
    },
    source: {
      index: {
        formKey: 'sourceIndex',
        optional: false
      },
      query: {
        optional: true,
        defaultValue: {
          match_all: {}
        }
      },
      _source: {
        optional: true
      }
    },
    dest: {
      index: {
        optional: false,
        formKey: 'destinationIndex'
      },
      results_field: {
        optional: true,
        defaultValue: 'ml'
      }
    },
    model_memory_limit: {
      optional: true,
      formKey: 'modelMemoryLimit'
    }
  };
};
/**
 * Detects if analytics job configuration were created with
 * the advanced editor and not supported by the regular form.
 */


function isAdvancedConfig(config) {
  var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getAnalyticsJobMeta(config);

  for (var configKey in config) {
    if (config.hasOwnProperty(configKey)) {
      var fieldConfig = config[configKey];
      var fieldMeta = meta[configKey];

      if (!fieldMeta) {
        // eslint-disable-next-line no-console
        console.info("Property \"".concat(configKey, "\" is unknown."));
        return true;
      }

      if (isPropDefinition(fieldMeta)) {
        var isAdvancedSetting = fieldMeta.formKey === undefined && fieldMeta.ignore !== true && !(0, _lodash.isEqual)(fieldMeta.defaultValue, fieldConfig);

        if (isAdvancedSetting) {
          // eslint-disable-next-line no-console
          console.info("Property \"".concat(configKey, "\" is not supported by the form or has a different value to the default."));
          return true;
        }
      } else if (isAdvancedConfig(fieldConfig, fieldMeta)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Gets complete original configuration as an input
 * and returns the config for cloning omitting
 * non-relevant parameters and resetting the destination index.
 */
function extractCloningConfig(_ref) {
  var id = _ref.id,
      version = _ref.version,
      create_time = _ref.create_time,
      configToClone = _objectWithoutProperties(_ref, ["id", "version", "create_time"]);

  return (0, _lodash.cloneDeep)(_objectSpread({}, configToClone, {
    dest: _objectSpread({}, configToClone.dest, {
      // Reset the destination index
      index: ''
    })
  }));
}

function getCloneAction(createAnalyticsForm) {
  var buttonText = _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.cloneJobButtonLabel', {
    defaultMessage: 'Clone job'
  });

  var actions = createAnalyticsForm.actions;

  var onClick =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(item) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return actions.setJobClone(item.config);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onClick(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  return {
    name: buttonText,
    description: buttonText,
    icon: 'copy',
    onClick: onClick,
    'data-test-subj': 'mlAnalyticsJobCloneButton'
  };
}

/**
 * Temp component to have Clone job button with the same look as the other actions.
 * Replace with {@link getCloneAction} as soon as all the actions are refactored
 * to support EuiContext with a valid DOM structure without nested buttons.
 */
var CloneAction = function CloneAction(_ref3) {
  var createAnalyticsForm = _ref3.createAnalyticsForm,
      item = _ref3.item;

  var buttonText = _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.cloneJobButtonLabel', {
    defaultMessage: 'Clone job'
  });

  var actions = createAnalyticsForm.actions;

  var onClick =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return actions.setJobClone(item.config);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function onClick() {
      return _ref4.apply(this, arguments);
    };
  }();

  return _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "mlAnalyticsJobCloneButton",
    size: "xs",
    color: "text",
    iconType: "copy",
    onClick: onClick,
    "aria-label": buttonText
  }, buttonText);
};

exports.CloneAction = CloneAction;