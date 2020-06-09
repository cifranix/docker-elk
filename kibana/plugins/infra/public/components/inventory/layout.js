"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _react = _interopRequireDefault(require("react"));

var _nodes_overview = require("../nodes_overview");

var _toolbar = require("./toolbars/toolbar");

var _page = require("../page");

var _use_snaphot = require("../../containers/waffle/use_snaphot");

var _use_inventory_meta = require("../../containers/inventory_metadata/use_inventory_meta");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Layout = function Layout(props) {
  var _useInventoryMeta = (0, _use_inventory_meta.useInventoryMeta)(props.sourceId, props.nodeType),
      accounts = _useInventoryMeta.accounts,
      regions = _useInventoryMeta.regions;

  var _useSnapshot = (0, _use_snaphot.useSnapshot)(props.filterQuery, props.metric, props.groupBy, props.nodeType, props.sourceId, props.currentTime, props.accountId, props.region),
      loading = _useSnapshot.loading,
      nodes = _useSnapshot.nodes,
      reload = _useSnapshot.reload,
      interval = _useSnapshot.interval;

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_toolbar.Toolbar, {
    accounts: accounts,
    regions: regions,
    nodeType: props.nodeType
  }), _react.default.createElement(_page.PageContent, null, _react.default.createElement(_nodes_overview.NodesOverview, {
    nodes: nodes,
    options: props.options,
    nodeType: props.nodeType,
    loading: loading,
    reload: reload,
    onDrilldown: props.onDrilldown,
    currentTime: props.currentTime,
    onViewChange: props.onViewChange,
    view: props.view,
    autoBounds: props.autoBounds,
    boundsOverride: props.boundsOverride,
    interval: interval
  })));
};

exports.Layout = Layout;