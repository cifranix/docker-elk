"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabFailures = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TabFailures = function TabFailures(_ref) {
  var indexFailures = _ref.indexFailures,
      snapshotState = _ref.snapshotState;

  if (!indexFailures.length) {
    // If the snapshot is in progress then we still might encounter errors later.
    if (snapshotState === _constants.SNAPSHOT_STATE.IN_PROGRESS) {
      return _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotDetails.snapshotIsBeingCreatedMessage",
        defaultMessage: "Snapshot is being created."
      });
    } else {
      return _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotDetails.noIndexFailuresMessage",
        defaultMessage: "All indices were stored successfully."
      });
    }
  }

  return indexFailures.map(function (indexObject, count) {
    var index = indexObject.index,
        failures = indexObject.failures;
    return _react.default.createElement("div", {
      key: index,
      "data-test-subj": "indexFailure"
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "xs",
      "data-test-subj": "index"
    }, _react.default.createElement("h3", null, index)), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), failures.map(function (failure, failuresCount) {
      var status = failure.status,
          reason = failure.reason,
          shardId = failure.shard_id;
      return _react.default.createElement("div", {
        key: "".concat(shardId).concat(reason),
        "data-test-subj": "failure"
      }, _react.default.createElement(_eui.EuiText, {
        size: "xs",
        "data-test-subj": "shard"
      }, _react.default.createElement("p", null, _react.default.createElement("strong", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotDetails.failureShardTitle",
        defaultMessage: "Shard {shardId}",
        values: {
          shardId: shardId
        }
      })))), _react.default.createElement(_eui.EuiCodeBlock, {
        paddingSize: "s",
        "data-test-subj": "reason",
        language: "text"
      }, "".concat(status, ": ").concat(reason)), failuresCount < failures.length - 1 ? _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }) : undefined);
    }), count < indexFailures.length - 1 ? _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }) : undefined);
  });
};

exports.TabFailures = TabFailures;