"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransformStatsBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _common = require("../../../../../../common");

var _common2 = require("../../../../common");

var _stats_bar = require("../stats_bar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createTranformStats(transformsList) {
  var transformStats = {
    total: {
      label: _i18n.i18n.translate('xpack.transform.statsBar.totalTransformsLabel', {
        defaultMessage: 'Total transforms'
      }),
      value: 0,
      show: true
    },
    batch: {
      label: _i18n.i18n.translate('xpack.transform.statsBar.batchTransformsLabel', {
        defaultMessage: 'Batch'
      }),
      value: 0,
      show: true
    },
    continuous: {
      label: _i18n.i18n.translate('xpack.transform.statsBar.continuousTransformsLabel', {
        defaultMessage: 'Continuous'
      }),
      value: 0,
      show: true
    },
    failed: {
      label: _i18n.i18n.translate('xpack.transform.statsBar.failedTransformsLabel', {
        defaultMessage: 'Failed'
      }),
      value: 0,
      show: false
    },
    started: {
      label: _i18n.i18n.translate('xpack.transform.statsBar.startedTransformsLabel', {
        defaultMessage: 'Started'
      }),
      value: 0,
      show: true
    }
  };

  if (transformsList === undefined) {
    return transformStats;
  }

  var failedTransforms = 0;
  var startedTransforms = 0;
  transformsList.forEach(function (transform) {
    if (transform.mode === _common2.TRANSFORM_MODE.CONTINUOUS) {
      transformStats.continuous.value++;
    } else if (transform.mode === _common2.TRANSFORM_MODE.BATCH) {
      transformStats.batch.value++;
    }

    if (transform.stats.state === _common.TRANSFORM_STATE.FAILED) {
      failedTransforms++;
    } else if (transform.stats.state === _common.TRANSFORM_STATE.STARTED) {
      startedTransforms++;
    }
  });
  transformStats.total.value = transformsList.length;
  transformStats.started.value = startedTransforms;

  if (failedTransforms !== 0) {
    transformStats.failed.value = failedTransforms;
    transformStats.failed.show = true;
  } else {
    transformStats.failed.show = false;
  }

  return transformStats;
}

var TransformStatsBar = function TransformStatsBar(_ref) {
  var transformsList = _ref.transformsList;
  var transformStats = createTranformStats(transformsList);
  return _react.default.createElement(_stats_bar.StatsBar, {
    stats: transformStats,
    dataTestSub: 'transformStatsBar'
  });
};

exports.TransformStatsBar = TransformStatsBar;