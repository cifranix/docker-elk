"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonWatchEditSimulateResults = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _watch_edit_actions = require("../../watch_edit_actions");

var _watch_context = require("../../watch_context");

var _components = require("../../../../components");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var JsonWatchEditSimulateResults = function JsonWatchEditSimulateResults(_ref) {
  var executeResults = _ref.executeResults,
      executeDetails = _ref.executeDetails,
      onCloseFlyout = _ref.onCloseFlyout,
      error = _ref.error;

  var _useContext = (0, _react.useContext)(_watch_context.WatchContext),
      watch = _useContext.watch;

  var actionModes = executeDetails.actionModes;

  var getTableData = function getTableData() {
    var actions = watch.watch && watch.watch.actions;

    if (executeResults && actions) {
      var actionStatuses = executeResults.watchStatus && executeResults.watchStatus.actionStatuses;
      return Object.keys(actions).map(function (actionKey) {
        var actionStatus = actionStatuses.find(function (status) {
          return status.id === actionKey;
        });
        return {
          actionId: actionKey,
          actionType: (0, _watch_edit_actions.getTypeFromAction)(actions[actionKey]),
          actionMode: actionModes[actionKey],
          actionState: actionStatus && actionStatus.state,
          actionReason: actionStatus && actionStatus.lastExecutionReason
        };
      });
    }

    return [];
  };

  var actionsTableData = getTableData();
  var columns = [{
    field: 'actionId',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulateResults.table.actionColumnLabel', {
      defaultMessage: 'ID'
    }),
    sortable: true,
    truncateText: true
  }, {
    field: 'actionType',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulateResults.table.typeColumnLabel', {
      defaultMessage: 'Type'
    }),
    truncateText: true
  }, {
    field: 'actionMode',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulateResults.table.modeColumnLabel', {
      defaultMessage: 'Mode'
    })
  }, {
    field: 'actionState',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulateResults.table.stateColumnLabel', {
      defaultMessage: 'State'
    }),
    dataType: 'string',
    render: function render(actionState, _item) {
      return _react.default.createElement(_components.WatchStatus, {
        status: actionState
      });
    }
  }, {
    field: 'actionReason',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulateResults.table.reasonColumnLabel', {
      defaultMessage: 'Reason'
    })
  }];

  var flyoutTitle = _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", {
    id: "simulateResultsFlyOutTitle",
    "data-test-subj": "simulateResultsFlyoutTitle"
  }, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulateResults.title', {
    defaultMessage: 'Simulation results'
  })));

  if (error) {
    return _react.default.createElement(_eui.EuiFlyout, {
      onClose: function onClose() {
        onCloseFlyout();
      },
      "aria-labelledby": "simulateResultsFlyOutTitle"
    }, _react.default.createElement(_eui.EuiFlyoutHeader, {
      hasBorder: true
    }, flyoutTitle), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchEdit.simulateResults.errorTitle",
        defaultMessage: "Cannot simulate watch"
      }),
      error: error
    })));
  }

  if (!executeResults) {
    return null;
  }

  var state = executeResults.watchStatus.state,
      details = executeResults.details;
  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: function onClose() {
      onCloseFlyout();
    },
    "data-test-subj": "simulateResultsFlyout",
    "aria-labelledby": "simulateResultsFlyOutTitle"
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, flyoutTitle, _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_components.WatchStatus, {
    status: state,
    size: "m"
  })), _react.default.createElement(_eui.EuiFlyoutBody, null, actionsTableData && actionsTableData.length > 0 && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("h5", null, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulateResults.actionsSectionTitle', {
    defaultMessage: 'Actions'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiBasicTable, {
    columns: columns,
    items: actionsTableData
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  })), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("h5", null, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulateResults.simulationOutputSectionTitle', {
    defaultMessage: 'Simulation output'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiCodeBlock, {
    language: "json"
  }, JSON.stringify(details, null, 2))));
};

exports.JsonWatchEditSimulateResults = JsonWatchEditSimulateResults;