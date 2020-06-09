"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addItemToRecentlyAccessed = addItemToRecentlyAccessed;

var _i18n = require("@kbn/i18n");

var _dependency_cache = require("./dependency_cache");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// utility functions for managing which links get added to kibana's recently accessed list
function addItemToRecentlyAccessed(page, itemId, url) {
  var pageLabel = '';
  var id = "ml-job-".concat(itemId);

  switch (page) {
    case 'explorer':
      pageLabel = _i18n.i18n.translate('xpack.ml.anomalyExplorerPageLabel', {
        defaultMessage: 'Anomaly Explorer'
      });
      break;

    case 'timeseriesexplorer':
      pageLabel = _i18n.i18n.translate('xpack.ml.singleMetricViewerPageLabel', {
        defaultMessage: 'Single Metric Viewer'
      });
      break;

    case 'jobs/new_job/datavisualizer':
      pageLabel = _i18n.i18n.translate('xpack.ml.dataVisualizerPageLabel', {
        defaultMessage: 'Data Visualizer'
      });
      id = "ml-datavisualizer-".concat(itemId);
      break;

    default:
      // eslint-disable-next-line no-console
      console.error('addItemToRecentlyAccessed - No page specified');
      return;
  }

  url = "ml#/".concat(page, "/").concat(url);
  var recentlyAccessed = (0, _dependency_cache.getRecentlyAccessed)();
  recentlyAccessed.add(url, "ML - ".concat(itemId, " - ").concat(pageLabel), id);
}