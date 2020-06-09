"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShardsTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _app_context = require("../../../../app_context");

var _components = require("../../../../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ShardsTable = function ShardsTable(_ref) {
  var shards = _ref.shards;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var Progress = function Progress(_ref2) {
    var total = _ref2.total,
        restored = _ref2.restored,
        percent = _ref2.percent;
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.progressTooltipLabel', {
        defaultMessage: '{restored} of {total} restored',
        values: {
          restored: restored,
          total: total
        }
      })
    }, _react.default.createElement(_eui.EuiText, {
      size: "xs",
      textAlign: "center",
      style: {
        width: '100%'
      }
    }, _react.default.createElement(_eui.EuiProgress, {
      value: total === 0 ? 1 : restored,
      max: total === 0 ? 1 : total,
      size: "xs"
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "xs"
    }), percent));
  };

  var columns = [{
    field: 'id',
    name: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.indexColumnTitle', {
      defaultMessage: 'ID'
    }),
    width: '40px',
    render: function render(id, shard) {
      return shard.primary ? _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        gutterSize: "xs"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, id), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiToolTip, {
        position: "right",
        content: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.restoreList.shardTable.primaryTooltipLabel",
          defaultMessage: "Primary"
        })
      }, _react.default.createElement("strong", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.restoreList.shardTable.primaryAbbreviationText",
        defaultMessage: "P",
        description: "Used as an abbreviation for 'Primary', as in 'Primary shard'"
      }))))) : id;
    }
  }, {
    field: 'stage',
    name: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.stageColumnTitle', {
      defaultMessage: 'Stage'
    })
  }, {
    field: 'startTimeInMillis',
    name: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.startTimeColumnTitle', {
      defaultMessage: 'Start time'
    }),
    render: function render(startTimeInMillis) {
      return startTimeInMillis ? _react.default.createElement(_components.FormattedDateTime, {
        epochMs: startTimeInMillis
      }) : _react.default.createElement(_eui.EuiLoadingSpinner, {
        size: "m"
      });
    }
  }, {
    field: 'stopTimeInMillis',
    name: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.endTimeColumnTitle', {
      defaultMessage: 'End time'
    }),
    render: function render(stopTimeInMillis) {
      return stopTimeInMillis ? _react.default.createElement(_components.FormattedDateTime, {
        epochMs: stopTimeInMillis
      }) : _react.default.createElement(_eui.EuiLoadingSpinner, {
        size: "m"
      });
    }
  }, {
    field: 'totalTimeInMillis',
    name: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.durationColumnTitle', {
      defaultMessage: 'Duration'
    }),
    render: function render(totalTimeInMillis) {
      return totalTimeInMillis ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.restoreList.shardTable.durationValue",
        defaultMessage: "{seconds} {seconds, plural, one {second} other {seconds}}",
        values: {
          seconds: Math.ceil(totalTimeInMillis / 1000)
        }
      }) : _react.default.createElement(_eui.EuiLoadingSpinner, {
        size: "m"
      });
    }
  }, {
    field: 'repository',
    name: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.repositoryColumnTitle', {
      defaultMessage: 'Repository'
    })
  }, {
    field: 'snapshot',
    name: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.snapshotColumnTitle', {
      defaultMessage: 'Snapshot'
    })
  }, {
    field: 'version',
    name: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.versionColumnTitle', {
      defaultMessage: 'Version'
    })
  }, {
    field: 'targetHost',
    name: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.targetHostColumnTitle', {
      defaultMessage: 'Target host'
    })
  }, {
    field: 'targetNode',
    name: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.targetNodeColumnTitle', {
      defaultMessage: 'Target node'
    })
  }, {
    field: 'bytesTotal',
    name: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.bytesColumnTitle', {
      defaultMessage: 'Bytes'
    }),
    render: function render(bytesTotal, _ref3) {
      var bytesRecovered = _ref3.bytesRecovered,
          bytesPercent = _ref3.bytesPercent;
      return _react.default.createElement(Progress, {
        total: bytesTotal,
        restored: bytesRecovered,
        percent: bytesPercent
      });
    }
  }, {
    field: 'filesTotal',
    name: i18n.translate('xpack.snapshotRestore.restoreList.shardTable.filesColumnTitle', {
      defaultMessage: 'Files'
    }),
    render: function render(filesTotal, _ref4) {
      var filesRecovered = _ref4.filesRecovered,
          filesPercent = _ref4.filesPercent;
      return _react.default.createElement(Progress, {
        total: filesTotal,
        restored: filesRecovered,
        percent: filesPercent
      });
    }
  }];
  return _react.default.createElement(_eui.EuiBasicTable, {
    className: "snapshotRestore__shardsTable",
    compressed: true // @ts-ignore `shards` is a Partial<> but this component treats a number of fields as required
    ,
    items: shards,
    columns: columns
  });
};

exports.ShardsTable = ShardsTable;