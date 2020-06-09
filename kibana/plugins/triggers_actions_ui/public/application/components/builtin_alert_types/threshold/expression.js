"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexThresholdAlertTypeExpression = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _index_controls = require("../../../../common/index_controls");

var _constants = require("../../../../common/constants");

var _get_time_options = require("../../../../common/lib/get_time_options");

var _visualization = require("./visualization");

var _common = require("../../../../common");

require("./expression.scss");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_VALUES = {
  AGGREGATION_TYPE: 'count',
  TERM_SIZE: 5,
  THRESHOLD_COMPARATOR: _constants.COMPARATORS.GREATER_THAN,
  TIME_WINDOW_SIZE: 5,
  TIME_WINDOW_UNIT: 'm',
  THRESHOLD: [1000],
  GROUP_BY: 'all'
};
var expressionFieldsWithValidation = ['index', 'timeField', 'aggField', 'termSize', 'termField', 'threshold0', 'threshold1', 'timeWindowSize'];

var IndexThresholdAlertTypeExpression = function IndexThresholdAlertTypeExpression(_ref) {
  var alertParams = _ref.alertParams,
      alertInterval = _ref.alertInterval,
      setAlertParams = _ref.setAlertParams,
      setAlertProperty = _ref.setAlertProperty,
      errors = _ref.errors,
      alertsContext = _ref.alertsContext;
  var index = alertParams.index,
      timeField = alertParams.timeField,
      aggType = alertParams.aggType,
      aggField = alertParams.aggField,
      groupBy = alertParams.groupBy,
      termSize = alertParams.termSize,
      termField = alertParams.termField,
      thresholdComparator = alertParams.thresholdComparator,
      threshold = alertParams.threshold,
      timeWindowSize = alertParams.timeWindowSize,
      timeWindowUnit = alertParams.timeWindowUnit;
  var http = alertsContext.http;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      indexPopoverOpen = _useState2[0],
      setIndexPopoverOpen = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      indexPatterns = _useState4[0],
      setIndexPatterns = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      esFields = _useState6[0],
      setEsFields = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      indexOptions = _useState8[0],
      setIndexOptions = _useState8[1];

  var _useState9 = (0, _react.useState)([_index_controls.firstFieldOption]),
      _useState10 = _slicedToArray(_useState9, 2),
      timeFieldOptions = _useState10[0],
      setTimeFieldOptions = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isIndiciesLoading = _useState12[0],
      setIsIndiciesLoading = _useState12[1];

  var hasExpressionErrors = !!Object.keys(errors).find(function (errorKey) {
    return expressionFieldsWithValidation.includes(errorKey) && errors[errorKey].length >= 1 && alertParams[errorKey] !== undefined;
  });
  var canShowVizualization = !!Object.keys(errors).find(function (errorKey) {
    return expressionFieldsWithValidation.includes(errorKey) && errors[errorKey].length >= 1;
  });

  var expressionErrorMessage = _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertAdd.threshold.fixErrorInExpressionBelowValidationMessage', {
    defaultMessage: 'Expression contains errors.'
  });

  var setDefaultExpressionValues =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var currentEsFields, timeFields;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setAlertProperty('params', _objectSpread({}, alertParams, {
                aggType: aggType !== null && aggType !== void 0 ? aggType : DEFAULT_VALUES.AGGREGATION_TYPE,
                termSize: termSize !== null && termSize !== void 0 ? termSize : DEFAULT_VALUES.TERM_SIZE,
                thresholdComparator: thresholdComparator !== null && thresholdComparator !== void 0 ? thresholdComparator : DEFAULT_VALUES.THRESHOLD_COMPARATOR,
                timeWindowSize: timeWindowSize !== null && timeWindowSize !== void 0 ? timeWindowSize : DEFAULT_VALUES.TIME_WINDOW_SIZE,
                timeWindowUnit: timeWindowUnit !== null && timeWindowUnit !== void 0 ? timeWindowUnit : DEFAULT_VALUES.TIME_WINDOW_UNIT,
                groupBy: groupBy !== null && groupBy !== void 0 ? groupBy : DEFAULT_VALUES.GROUP_BY,
                threshold: threshold !== null && threshold !== void 0 ? threshold : DEFAULT_VALUES.THRESHOLD
              }));

              if (!(index && index.length > 0)) {
                _context.next = 8;
                break;
              }

              _context.next = 4;
              return (0, _index_controls.getFields)(http, index);

            case 4:
              currentEsFields = _context.sent;
              timeFields = (0, _get_time_options.getTimeFieldOptions)(currentEsFields);
              setEsFields(currentEsFields);
              setTimeFieldOptions([_index_controls.firstFieldOption].concat(_toConsumableArray(timeFields)));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function setDefaultExpressionValues() {
      return _ref2.apply(this, arguments);
    };
  }();

  var closeIndexPopover = function closeIndexPopover() {
    setIndexPopoverOpen(false);

    if (timeField === undefined) {
      setAlertParams('timeField', '');
    }
  };

  (0, _react.useEffect)(function () {
    var indexPatternsFunction =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = setIndexPatterns;
                _context2.next = 3;
                return (0, _index_controls.getIndexPatterns)();

              case 3:
                _context2.t1 = _context2.sent;
                (0, _context2.t0)(_context2.t1);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function indexPatternsFunction() {
        return _ref3.apply(this, arguments);
      };
    }();

    indexPatternsFunction();
  }, []);
  (0, _react.useEffect)(function () {
    setDefaultExpressionValues(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var indexPopover = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "indexSelectSearchBox",
    fullWidth: true,
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertAdd.threshold.indicesToQueryLabel",
      defaultMessage: "Indices to query"
    }),
    isInvalid: errors.index.length > 0 && index !== undefined,
    error: errors.index,
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertAdd.threshold.howToBroadenSearchQueryDescription",
      defaultMessage: "Use * to broaden your query."
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    fullWidth: true,
    async: true,
    isLoading: isIndiciesLoading,
    isInvalid: errors.index.length > 0 && index !== undefined,
    noSuggestions: !indexOptions.length,
    options: indexOptions,
    "data-test-subj": "thresholdIndexesComboBox",
    selectedOptions: (index || []).map(function (anIndex) {
      return {
        label: anIndex,
        value: anIndex
      };
    }),
    onChange:
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(selected) {
        var indices, currentEsFields, timeFields;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                setAlertParams('index', selected.map(function (aSelected) {
                  return aSelected.value;
                }));
                indices = selected.map(function (s) {
                  return s.value;
                }); // reset time field and expression fields if indices are deleted

                if (!(indices.length === 0)) {
                  _context3.next = 6;
                  break;
                }

                setTimeFieldOptions([_index_controls.firstFieldOption]);
                setAlertProperty('params', _objectSpread({}, alertParams, {
                  index: indices,
                  aggType: DEFAULT_VALUES.AGGREGATION_TYPE,
                  termSize: DEFAULT_VALUES.TERM_SIZE,
                  thresholdComparator: DEFAULT_VALUES.THRESHOLD_COMPARATOR,
                  timeWindowSize: DEFAULT_VALUES.TIME_WINDOW_SIZE,
                  timeWindowUnit: DEFAULT_VALUES.TIME_WINDOW_UNIT,
                  groupBy: DEFAULT_VALUES.GROUP_BY,
                  threshold: DEFAULT_VALUES.THRESHOLD,
                  timeField: ''
                }));
                return _context3.abrupt("return");

              case 6:
                _context3.next = 8;
                return (0, _index_controls.getFields)(http, indices);

              case 8:
                currentEsFields = _context3.sent;
                timeFields = (0, _get_time_options.getTimeFieldOptions)(currentEsFields);
                setEsFields(currentEsFields);
                setTimeFieldOptions([_index_controls.firstFieldOption].concat(_toConsumableArray(timeFields)));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }(),
    onSearchChange:
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(search) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                setIsIndiciesLoading(true);
                _context4.t0 = setIndexOptions;
                _context4.next = 4;
                return (0, _index_controls.getIndexOptions)(http, search, indexPatterns);

              case 4:
                _context4.t1 = _context4.sent;
                (0, _context4.t0)(_context4.t1);
                setIsIndiciesLoading(false);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x2) {
        return _ref5.apply(this, arguments);
      };
    }(),
    onBlur: function onBlur() {
      if (!index) {
        setAlertParams('index', []);
      }
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    id: "thresholdTimeField",
    fullWidth: true,
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertAdd.threshold.timeFieldLabel",
      defaultMessage: "Time field"
    }),
    isInvalid: errors.timeField.length > 0 && timeField !== undefined,
    error: errors.timeField
  }, _react.default.createElement(_eui.EuiSelect, {
    options: timeFieldOptions,
    isInvalid: errors.timeField.length > 0 && timeField !== undefined,
    fullWidth: true,
    name: "thresholdTimeField",
    "data-test-subj": "thresholdAlertTimeFieldSelect",
    value: timeField,
    onChange: function onChange(e) {
      setAlertParams('timeField', e.target.value);
    },
    onBlur: function onBlur() {
      if (timeField === undefined) {
        setAlertParams('timeField', '');
      }
    }
  })))), _react.default.createElement(_eui.EuiSpacer, null));

  var firstSetOfSteps = [{
    title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertAdd.selectIndex', {
      defaultMessage: 'Select an index.'
    }),
    children: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
      wrap: true
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiPopover, {
      id: "indexPopover",
      button: _react.default.createElement(_eui.EuiExpression, {
        "data-test-subj": "selectIndexExpression",
        description: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertAdd.threshold.indexLabel', {
          defaultMessage: 'index'
        }),
        value: index && index.length > 0 ? index.join(' ') : _index_controls.firstFieldOption.text,
        isActive: indexPopoverOpen,
        onClick: function onClick() {
          setIndexPopoverOpen(true);
        },
        color: index && index.length > 0 && timeField !== '' ? 'secondary' : 'danger'
      }),
      isOpen: indexPopoverOpen,
      closePopover: closeIndexPopover,
      ownFocus: true,
      withTitle: true,
      anchorPosition: "downLeft",
      zIndex: 8000
    }, _react.default.createElement("div", {
      style: {
        width: '450px'
      }
    }, _react.default.createElement(_eui.EuiPopoverTitle, null, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center",
      gutterSize: "s"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertAdd.threshold.indexButtonLabel', {
      defaultMessage: 'index'
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      "data-test-subj": "closePopover",
      iconType: "cross",
      color: "danger",
      "aria-label": _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertAdd.threshold.closeIndexPopoverLabel', {
        defaultMessage: 'Close'
      }),
      onClick: closeIndexPopover
    })))), indexPopover)))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_common.WhenExpression, {
      aggType: aggType !== null && aggType !== void 0 ? aggType : DEFAULT_VALUES.AGGREGATION_TYPE,
      onChangeSelectedAggType: function onChangeSelectedAggType(selectedAggType) {
        return setAlertParams('aggType', selectedAggType);
      }
    })), aggType && _constants.builtInAggregationTypes[aggType].fieldRequired ? _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_common.OfExpression, {
      aggField: aggField,
      fields: esFields,
      aggType: aggType,
      errors: errors,
      onChangeSelectedAggField: function onChangeSelectedAggField(selectedAggField) {
        return setAlertParams('aggField', selectedAggField);
      }
    })) : null), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_common.GroupByExpression, {
      groupBy: groupBy || DEFAULT_VALUES.GROUP_BY,
      termField: termField,
      termSize: termSize,
      errors: errors,
      fields: esFields,
      onChangeSelectedGroupBy: function onChangeSelectedGroupBy(selectedGroupBy) {
        return setAlertParams('groupBy', selectedGroupBy);
      },
      onChangeSelectedTermField: function onChangeSelectedTermField(selectedTermField) {
        return setAlertParams('termField', selectedTermField);
      },
      onChangeSelectedTermSize: function onChangeSelectedTermSize(selectedTermSize) {
        return setAlertParams('termSize', selectedTermSize);
      }
    }))))
  }, {
    title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertAdd.conditionPrompt', {
      defaultMessage: 'Define the condition.'
    }),
    children: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_common.ThresholdExpression, {
      thresholdComparator: thresholdComparator !== null && thresholdComparator !== void 0 ? thresholdComparator : DEFAULT_VALUES.THRESHOLD_COMPARATOR,
      threshold: threshold,
      errors: errors,
      popupPosition: 'upLeft',
      onChangeSelectedThreshold: function onChangeSelectedThreshold(selectedThresholds) {
        return setAlertParams('threshold', selectedThresholds);
      },
      onChangeSelectedThresholdComparator: function onChangeSelectedThresholdComparator(selectedThresholdComparator) {
        return setAlertParams('thresholdComparator', selectedThresholdComparator);
      }
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_common.ForLastExpression, {
      popupPosition: 'upLeft',
      timeWindowSize: timeWindowSize,
      timeWindowUnit: timeWindowUnit,
      errors: errors,
      onChangeWindowSize: function onChangeWindowSize(selectedWindowSize) {
        return setAlertParams('timeWindowSize', selectedWindowSize);
      },
      onChangeWindowUnit: function onChangeWindowUnit(selectedWindowUnit) {
        return setAlertParams('timeWindowUnit', selectedWindowUnit);
      }
    }))))
  }];
  return _react.default.createElement(_react.Fragment, null, hasExpressionErrors ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCallOut, {
    color: "danger",
    size: "s",
    title: expressionErrorMessage
  }), _react.default.createElement(_eui.EuiSpacer, null)) : null, _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiSteps, {
    steps: firstSetOfSteps
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement("div", {
    className: "actAlertVisualization__chart"
  }, canShowVizualization ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }), _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "visBarVertical",
    body: _react.default.createElement(_eui.EuiText, {
      color: "subdued"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertAdd.previewAlertVisualizationDescription",
      defaultMessage: "Complete the expression to generate a preview."
    }))
  })) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_visualization.ThresholdVisualization, {
    alertParams: alertParams,
    alertInterval: alertInterval,
    aggregationTypes: _constants.builtInAggregationTypes,
    comparators: _constants.builtInComparators,
    alertsContext: alertsContext
  }))));
};

exports.IndexThresholdAlertTypeExpression = IndexThresholdAlertTypeExpression;