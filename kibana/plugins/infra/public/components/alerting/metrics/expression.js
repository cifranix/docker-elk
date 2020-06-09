"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggregationType = exports.ExpressionRow = exports.Expressions = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _types = require("../../../../server/lib/alerting/metric_threshold/types");

var _public = require("../../../../../observability/public");

var _common = require("../../../../../triggers_actions_ui/public/common");

var _kuery_bar = require("../../metrics_explorer/kuery_bar");

var _group_by = require("../../metrics_explorer/group_by");

var _use_source_via_http = require("../../../containers/source/use_source_via_http");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  padding: 0 4px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0 -4px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AGGREGATION_TYPES;

(function (AGGREGATION_TYPES) {
  AGGREGATION_TYPES["COUNT"] = "count";
  AGGREGATION_TYPES["AVERAGE"] = "avg";
  AGGREGATION_TYPES["SUM"] = "sum";
  AGGREGATION_TYPES["MIN"] = "min";
  AGGREGATION_TYPES["MAX"] = "max";
  AGGREGATION_TYPES["RATE"] = "rate";
  AGGREGATION_TYPES["CARDINALITY"] = "cardinality";
})(AGGREGATION_TYPES || (AGGREGATION_TYPES = {}));

var defaultExpression = {
  aggType: AGGREGATION_TYPES.AVERAGE,
  comparator: _types.Comparator.GT,
  threshold: [],
  timeSize: 1,
  timeUnit: 'm'
};

var Expressions = function Expressions(props) {
  var setAlertParams = props.setAlertParams,
      alertParams = props.alertParams,
      errors = props.errors,
      alertsContext = props.alertsContext;

  var _useSourceViaHttp = (0, _use_source_via_http.useSourceViaHttp)({
    sourceId: 'default',
    type: 'metrics',
    fetch: alertsContext.http.fetch,
    toastWarning: alertsContext.toastNotifications.addWarning
  }),
      source = _useSourceViaHttp.source,
      createDerivedIndexPattern = _useSourceViaHttp.createDerivedIndexPattern;

  var _useState = (0, _react.useState)(1),
      _useState2 = _slicedToArray(_useState, 2),
      timeSize = _useState2[0],
      setTimeSize = _useState2[1];

  var _useState3 = (0, _react.useState)('m'),
      _useState4 = _slicedToArray(_useState3, 2),
      timeUnit = _useState4[0],
      setTimeUnit = _useState4[1];

  var derivedIndexPattern = (0, _react.useMemo)(function () {
    return createDerivedIndexPattern('metrics');
  }, [createDerivedIndexPattern]);
  var options = (0, _react.useMemo)(function () {
    var _alertsContext$metada, _alertsContext$metada2;

    if ((_alertsContext$metada = alertsContext.metadata) === null || _alertsContext$metada === void 0 ? void 0 : (_alertsContext$metada2 = _alertsContext$metada.currentOptions) === null || _alertsContext$metada2 === void 0 ? void 0 : _alertsContext$metada2.metrics) {
      return alertsContext.metadata.currentOptions;
    } else {
      return {
        metrics: [],
        aggregation: 'avg'
      };
    }
  }, [alertsContext.metadata]);
  var updateParams = (0, _react.useCallback)(function (id, e) {
    var exp = alertParams.criteria ? alertParams.criteria.slice() : [];
    exp[id] = _objectSpread({}, exp[id], {}, e);
    setAlertParams('criteria', exp);
  }, [setAlertParams, alertParams.criteria]);
  var addExpression = (0, _react.useCallback)(function () {
    var exp = alertParams.criteria.slice();
    exp.push(defaultExpression);
    setAlertParams('criteria', exp);
  }, [setAlertParams, alertParams.criteria]);
  var removeExpression = (0, _react.useCallback)(function (id) {
    var exp = alertParams.criteria.slice();

    if (exp.length > 1) {
      exp.splice(id, 1);
      setAlertParams('criteria', exp);
    }
  }, [setAlertParams, alertParams.criteria]);
  var onFilterChange = (0, _react.useCallback)(function (filter) {
    setAlertParams('filterQuery', filter);
  }, [setAlertParams]);
  var onGroupByChange = (0, _react.useCallback)(function (group) {
    setAlertParams('groupBy', group || '');
  }, [setAlertParams]);
  var emptyError = (0, _react.useMemo)(function () {
    return {
      aggField: [],
      timeSizeUnit: [],
      timeWindowSize: []
    };
  }, []);
  var updateTimeSize = (0, _react.useCallback)(function (ts) {
    var criteria = alertParams.criteria.map(function (c) {
      return _objectSpread({}, c, {
        timeSize: ts
      });
    });
    setTimeSize(ts || undefined);
    setAlertParams('criteria', criteria);
  }, [alertParams.criteria, setAlertParams]);
  var updateTimeUnit = (0, _react.useCallback)(function (tu) {
    var criteria = alertParams.criteria.map(function (c) {
      return _objectSpread({}, c, {
        timeUnit: tu
      });
    });
    setTimeUnit(tu);
    setAlertParams('criteria', criteria);
  }, [alertParams.criteria, setAlertParams]);
  (0, _react.useEffect)(function () {
    var md = alertsContext.metadata;

    if (md) {
      var _md$currentOptions;

      if ((_md$currentOptions = md.currentOptions) === null || _md$currentOptions === void 0 ? void 0 : _md$currentOptions.metrics) {
        setAlertParams('criteria', md.currentOptions.metrics.map(function (metric) {
          return {
            metric: metric.field,
            comparator: _types.Comparator.GT,
            threshold: [],
            timeSize: timeSize,
            timeUnit: timeUnit,
            aggType: metric.aggregation
          };
        }));
      } else {
        setAlertParams('criteria', [defaultExpression]);
      }

      if (md.currentOptions) {
        if (md.currentOptions.filterQuery) {
          setAlertParams('filterQuery', md.currentOptions.filterQuery);
        } else if (md.currentOptions.groupBy && md.series) {
          var filter = "".concat(md.currentOptions.groupBy, ": \"").concat(md.series.id, "\"");
          setAlertParams('filterQuery', filter);
        }

        setAlertParams('groupBy', md.currentOptions.groupBy);
      }

      setAlertParams('sourceId', source === null || source === void 0 ? void 0 : source.id);
    } else {
      if (!alertParams.criteria) {
        setAlertParams('criteria', [defaultExpression]);
      }

      if (!alertParams.sourceId) {
        setAlertParams('sourceId', (source === null || source === void 0 ? void 0 : source.id) || 'default');
      }
    }
  }, [alertsContext.metadata, defaultExpression, source]); // eslint-disable-line react-hooks/exhaustive-deps

  var handleFieldSearchChange = (0, _react.useCallback)(function (e) {
    return onFilterChange(e.target.value);
  }, [onFilterChange]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: 'm'
  }), _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.metrics.alertFlyout.conditions",
    defaultMessage: "Conditions"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: 'xs'
  }), alertParams.criteria && alertParams.criteria.map(function (e, idx) {
    return _react.default.createElement(ExpressionRow, {
      canDelete: alertParams.criteria.length > 1,
      fields: derivedIndexPattern.fields,
      remove: removeExpression,
      addExpression: addExpression,
      key: idx // idx's don't usually make good key's but here the index has semantic meaning
      ,
      expressionId: idx,
      setAlertParams: updateParams,
      errors: errors[idx] || emptyError,
      expression: e || {}
    });
  }), _react.default.createElement(_common.ForLastExpression, {
    timeWindowSize: timeSize,
    timeWindowUnit: timeUnit,
    errors: emptyError,
    onChangeWindowSize: updateTimeSize,
    onChangeWindowUnit: updateTimeUnit
  }), _react.default.createElement("div", null, _react.default.createElement(_eui.EuiButtonEmpty, {
    color: 'primary',
    iconSide: 'left',
    flush: 'left',
    iconType: 'plusInCircleFilled',
    onClick: addExpression
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.metrics.alertFlyout.addCondition",
    defaultMessage: "Add condition"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: 'm'
  }), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.infra.metrics.alertFlyout.filterLabel', {
      defaultMessage: 'Filter (optional)'
    }),
    helpText: _i18n.i18n.translate('xpack.infra.metrics.alertFlyout.filterHelpText', {
      defaultMessage: 'Use a KQL expression to limit the scope of your alert trigger.'
    }),
    fullWidth: true,
    compressed: true
  }, alertsContext.metadata && _react.default.createElement(_kuery_bar.MetricsExplorerKueryBar, {
    derivedIndexPattern: derivedIndexPattern,
    onChange: onFilterChange,
    onSubmit: onFilterChange,
    value: alertParams.filterQuery
  }) || _react.default.createElement(_eui.EuiFieldSearch, {
    onChange: handleFieldSearchChange,
    value: alertParams.filterQuery,
    fullWidth: true
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: 'm'
  }), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.infra.metrics.alertFlyout.createAlertPerText', {
      defaultMessage: 'Create alert per (optional)'
    }),
    helpText: _i18n.i18n.translate('xpack.infra.metrics.alertFlyout.createAlertPerHelpText', {
      defaultMessage: 'Create an alert for every unique value. For example: "host.id" or "cloud.region".'
    }),
    fullWidth: true,
    compressed: true
  }, _react.default.createElement(_group_by.MetricsExplorerGroupBy, {
    onChange: onGroupByChange,
    fields: derivedIndexPattern.fields,
    options: _objectSpread({}, options, {
      groupBy: alertParams.groupBy || undefined
    })
  })));
};

exports.Expressions = Expressions;
var StyledExpressionRow = (0, _public.euiStyled)(_eui.EuiFlexGroup)(_templateObject());

var StyledExpression = _public.euiStyled.div(_templateObject2());

var ExpressionRow = function ExpressionRow(props) {
  var setAlertParams = props.setAlertParams,
      expression = props.expression,
      errors = props.errors,
      expressionId = props.expressionId,
      remove = props.remove,
      fields = props.fields,
      canDelete = props.canDelete;
  var _expression$aggType = expression.aggType,
      aggType = _expression$aggType === void 0 ? AGGREGATION_TYPES.MAX : _expression$aggType,
      metric = expression.metric,
      _expression$comparato = expression.comparator,
      comparator = _expression$comparato === void 0 ? _types.Comparator.GT : _expression$comparato,
      _expression$threshold = expression.threshold,
      threshold = _expression$threshold === void 0 ? [] : _expression$threshold;
  var updateAggType = (0, _react.useCallback)(function (at) {
    setAlertParams(expressionId, _objectSpread({}, expression, {
      aggType: at,
      metric: at === 'count' ? undefined : expression.metric
    }));
  }, [expressionId, expression, setAlertParams]);
  var updateMetric = (0, _react.useCallback)(function (m) {
    setAlertParams(expressionId, _objectSpread({}, expression, {
      metric: m
    }));
  }, [expressionId, expression, setAlertParams]);
  var updateComparator = (0, _react.useCallback)(function (c) {
    setAlertParams(expressionId, _objectSpread({}, expression, {
      comparator: c
    }));
  }, [expressionId, expression, setAlertParams]);
  var updateThreshold = (0, _react.useCallback)(function (t) {
    if (t.join() !== expression.threshold.join()) {
      setAlertParams(expressionId, _objectSpread({}, expression, {
        threshold: t
      }));
    }
  }, [expressionId, expression, setAlertParams]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(StyledExpressionRow, null, _react.default.createElement(StyledExpression, null, _react.default.createElement(_common.WhenExpression, {
    customAggTypesOptions: aggregationType,
    aggType: aggType,
    onChangeSelectedAggType: updateAggType
  })), aggType !== 'count' && _react.default.createElement(StyledExpression, null, _react.default.createElement(_common.OfExpression, {
    customAggTypesOptions: aggregationType,
    aggField: metric,
    fields: fields.map(function (f) {
      return {
        normalizedType: f.type,
        name: f.name
      };
    }),
    aggType: aggType,
    errors: errors,
    onChangeSelectedAggField: updateMetric
  })), _react.default.createElement(StyledExpression, null, _react.default.createElement(_common.ThresholdExpression, {
    thresholdComparator: comparator || _types.Comparator.GT,
    threshold: threshold,
    onChangeSelectedThresholdComparator: updateComparator,
    onChangeSelectedThreshold: updateThreshold,
    errors: errors
  })))), canDelete && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": _i18n.i18n.translate('xpack.infra.metrics.alertFlyout.removeCondition', {
      defaultMessage: 'Remove condition'
    }),
    color: 'danger',
    iconType: 'trash',
    onClick: function onClick() {
      return remove(expressionId);
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: 's'
  }));
};

exports.ExpressionRow = ExpressionRow;
var aggregationType = {
  avg: {
    text: _i18n.i18n.translate('xpack.infra.metrics.alertFlyout.aggregationText.avg', {
      defaultMessage: 'Average'
    }),
    fieldRequired: true,
    validNormalizedTypes: ['number'],
    value: AGGREGATION_TYPES.AVERAGE
  },
  max: {
    text: _i18n.i18n.translate('xpack.infra.metrics.alertFlyout.aggregationText.max', {
      defaultMessage: 'Max'
    }),
    fieldRequired: true,
    validNormalizedTypes: ['number', 'date'],
    value: AGGREGATION_TYPES.MAX
  },
  min: {
    text: _i18n.i18n.translate('xpack.infra.metrics.alertFlyout.aggregationText.min', {
      defaultMessage: 'Min'
    }),
    fieldRequired: true,
    validNormalizedTypes: ['number', 'date'],
    value: AGGREGATION_TYPES.MIN
  },
  cardinality: {
    text: _i18n.i18n.translate('xpack.infra.metrics.alertFlyout.aggregationText.cardinality', {
      defaultMessage: 'Cardinality'
    }),
    fieldRequired: false,
    value: AGGREGATION_TYPES.CARDINALITY,
    validNormalizedTypes: ['number']
  },
  rate: {
    text: _i18n.i18n.translate('xpack.infra.metrics.alertFlyout.aggregationText.rate', {
      defaultMessage: 'Rate'
    }),
    fieldRequired: false,
    value: AGGREGATION_TYPES.RATE,
    validNormalizedTypes: ['number']
  },
  count: {
    text: _i18n.i18n.translate('xpack.infra.metrics.alertFlyout.aggregationText.count', {
      defaultMessage: 'Document count'
    }),
    fieldRequired: false,
    value: AGGREGATION_TYPES.COUNT,
    validNormalizedTypes: ['number']
  }
};
exports.aggregationType = aggregationType;