"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithWaffleOptionsUrlState = exports.WithWaffleOptions = exports.withWaffleOptions = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reselect = require("reselect");

var _lodash = require("lodash");

var _store = require("../../store");

var _typed_react = require("../../utils/typed_react");

var _typed_redux = require("../../utils/typed_redux");

var _url_state = require("../../utils/url_state");

var _snapshot_api = require("../../../common/http_api/snapshot_api");

var _types = require("../../../common/inventory_models/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var selectOptionsUrlState = (0, _reselect.createSelector)(_store.waffleOptionsSelectors.selectMetric, _store.waffleOptionsSelectors.selectView, _store.waffleOptionsSelectors.selectGroupBy, _store.waffleOptionsSelectors.selectNodeType, _store.waffleOptionsSelectors.selectCustomOptions, _store.waffleOptionsSelectors.selectBoundsOverride, _store.waffleOptionsSelectors.selectAutoBounds, _store.waffleOptionsSelectors.selectAccountId, _store.waffleOptionsSelectors.selectRegion, _store.waffleOptionsSelectors.selectCustomMetrics, function (metric, view, groupBy, nodeType, customOptions, boundsOverride, autoBounds, accountId, region, customMetrics) {
  return {
    metric: metric,
    groupBy: groupBy,
    nodeType: nodeType,
    view: view,
    customOptions: customOptions,
    boundsOverride: boundsOverride,
    autoBounds: autoBounds,
    accountId: accountId,
    region: region,
    customMetrics: customMetrics
  };
});
var withWaffleOptions = (0, _reactRedux.connect)(function (state) {
  return {
    metric: _store.waffleOptionsSelectors.selectMetric(state),
    groupBy: _store.waffleOptionsSelectors.selectGroupBy(state),
    nodeType: _store.waffleOptionsSelectors.selectNodeType(state),
    view: _store.waffleOptionsSelectors.selectView(state),
    customOptions: _store.waffleOptionsSelectors.selectCustomOptions(state),
    boundsOverride: _store.waffleOptionsSelectors.selectBoundsOverride(state),
    autoBounds: _store.waffleOptionsSelectors.selectAutoBounds(state),
    accountId: _store.waffleOptionsSelectors.selectAccountId(state),
    region: _store.waffleOptionsSelectors.selectRegion(state),
    urlState: selectOptionsUrlState(state),
    customMetrics: _store.waffleOptionsSelectors.selectCustomMetrics(state)
  };
}, (0, _typed_redux.bindPlainActionCreators)({
  changeMetric: _store.waffleOptionsActions.changeMetric,
  changeGroupBy: _store.waffleOptionsActions.changeGroupBy,
  changeNodeType: _store.waffleOptionsActions.changeNodeType,
  changeView: _store.waffleOptionsActions.changeView,
  changeCustomOptions: _store.waffleOptionsActions.changeCustomOptions,
  changeBoundsOverride: _store.waffleOptionsActions.changeBoundsOverride,
  changeAutoBounds: _store.waffleOptionsActions.changeAutoBounds,
  changeAccount: _store.waffleOptionsActions.changeAccount,
  changeRegion: _store.waffleOptionsActions.changeRegion,
  changeCustomMetrics: _store.waffleOptionsActions.changeCustomMetrics
}));
exports.withWaffleOptions = withWaffleOptions;
var WithWaffleOptions = (0, _typed_react.asChildFunctionRenderer)(withWaffleOptions);
/**
 * Url State
 */

exports.WithWaffleOptions = WithWaffleOptions;

var WithWaffleOptionsUrlState = function WithWaffleOptionsUrlState() {
  return _react.default.createElement(WithWaffleOptions, null, function (_ref) {
    var changeMetric = _ref.changeMetric,
        urlState = _ref.urlState,
        changeGroupBy = _ref.changeGroupBy,
        changeNodeType = _ref.changeNodeType,
        changeView = _ref.changeView,
        changeCustomOptions = _ref.changeCustomOptions,
        changeAutoBounds = _ref.changeAutoBounds,
        changeBoundsOverride = _ref.changeBoundsOverride,
        changeAccount = _ref.changeAccount,
        changeRegion = _ref.changeRegion,
        changeCustomMetrics = _ref.changeCustomMetrics;
    return _react.default.createElement(_url_state.UrlStateContainer, {
      urlState: urlState,
      urlStateKey: "waffleOptions",
      mapToUrlState: mapToUrlState,
      onChange: function onChange(newUrlState) {
        if (newUrlState && newUrlState.metric) {
          changeMetric(newUrlState.metric);
        }

        if (newUrlState && newUrlState.groupBy) {
          changeGroupBy(newUrlState.groupBy);
        }

        if (newUrlState && newUrlState.nodeType) {
          changeNodeType(newUrlState.nodeType);
        }

        if (newUrlState && newUrlState.view) {
          changeView(newUrlState.view);
        }

        if (newUrlState && newUrlState.customOptions) {
          changeCustomOptions(newUrlState.customOptions);
        }

        if (newUrlState && newUrlState.bounds) {
          changeBoundsOverride(newUrlState.bounds);
        }

        if (newUrlState && newUrlState.auto) {
          changeAutoBounds(newUrlState.auto);
        }

        if (newUrlState && newUrlState.accountId) {
          changeAccount(newUrlState.accountId);
        }

        if (newUrlState && newUrlState.region) {
          changeRegion(newUrlState.region);
        }

        if (newUrlState && newUrlState.customMetrics) {
          changeCustomMetrics(newUrlState.customMetrics);
        }
      },
      onInitialize: function onInitialize(initialUrlState) {
        if (initialUrlState && initialUrlState.metric) {
          changeMetric(initialUrlState.metric);
        }

        if (initialUrlState && initialUrlState.groupBy) {
          changeGroupBy(initialUrlState.groupBy);
        }

        if (initialUrlState && initialUrlState.nodeType) {
          changeNodeType(initialUrlState.nodeType);
        }

        if (initialUrlState && initialUrlState.view) {
          changeView(initialUrlState.view);
        }

        if (initialUrlState && initialUrlState.customOptions) {
          changeCustomOptions(initialUrlState.customOptions);
        }

        if (initialUrlState && initialUrlState.bounds) {
          changeBoundsOverride(initialUrlState.bounds);
        }

        if (initialUrlState && initialUrlState.auto) {
          changeAutoBounds(initialUrlState.auto);
        }

        if (initialUrlState && initialUrlState.accountId) {
          changeAccount(initialUrlState.accountId);
        }

        if (initialUrlState && initialUrlState.region) {
          changeRegion(initialUrlState.region);
        }

        if (initialUrlState && initialUrlState.customMetrics) {
          changeCustomMetrics(initialUrlState.customMetrics);
        }
      }
    });
  });
};

exports.WithWaffleOptionsUrlState = WithWaffleOptionsUrlState;

var mapToUrlState = function mapToUrlState(value) {
  return value ? {
    metric: mapToMetricUrlState(value.metric),
    groupBy: mapToGroupByUrlState(value.groupBy),
    nodeType: mapToNodeTypeUrlState(value.nodeType),
    view: mapToViewUrlState(value.view),
    customOptions: mapToCustomOptionsUrlState(value.customOptions),
    bounds: mapToBoundsOverideUrlState(value.boundsOverride),
    auto: mapToAutoBoundsUrlState(value.autoBounds),
    accountId: value.accountId,
    region: value.region,
    customMetrics: mapToCustomMetricsUrlState(value.customMetrics)
  } : undefined;
};

var isInfraNodeType = function isInfraNodeType(value) {
  return value in _types.ItemTypeRT;
};

var isInfraSnapshotMetricInput = function isInfraSnapshotMetricInput(subject) {
  return subject != null && subject.type in _types.SnapshotMetricTypeRT;
};

var isInfraSnapshotGroupbyInput = function isInfraSnapshotGroupbyInput(subject) {
  return subject != null && subject.type != null;
};

var isInfraGroupByOption = function isInfraGroupByOption(subject) {
  return subject != null && subject.text != null && subject.field != null;
};

var mapToMetricUrlState = function mapToMetricUrlState(subject) {
  return subject && isInfraSnapshotMetricInput(subject) ? subject : undefined;
};

var mapToGroupByUrlState = function mapToGroupByUrlState(subject) {
  return subject && Array.isArray(subject) && subject.every(isInfraSnapshotGroupbyInput) ? subject : undefined;
};

var mapToNodeTypeUrlState = function mapToNodeTypeUrlState(subject) {
  return isInfraNodeType(subject) ? subject : undefined;
};

var mapToViewUrlState = function mapToViewUrlState(subject) {
  return subject && ['map', 'table'].includes(subject) ? subject : undefined;
};

var mapToCustomOptionsUrlState = function mapToCustomOptionsUrlState(subject) {
  return subject && Array.isArray(subject) && subject.every(isInfraGroupByOption) ? subject : undefined;
};

var mapToCustomMetricsUrlState = function mapToCustomMetricsUrlState(subject) {
  return subject && Array.isArray(subject) && subject.every(function (s) {
    return _snapshot_api.SnapshotCustomMetricInputRT.is(s);
  }) ? subject : [];
};

var mapToBoundsOverideUrlState = function mapToBoundsOverideUrlState(subject) {
  return subject != null && (0, _lodash.isNumber)(subject.max) && (0, _lodash.isNumber)(subject.min) ? subject : undefined;
};

var mapToAutoBoundsUrlState = function mapToAutoBoundsUrlState(subject) {
  return subject != null && (0, _lodash.isBoolean)(subject) ? subject : undefined;
};