"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCanvasUsageCollector = registerCanvasUsageCollector;

var _constants = require("../../../../legacy/plugins/canvas/common/lib/constants");

var _workpad_collector = require("./workpad_collector");

var _custom_element_collector = require("./custom_element_collector");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const collectors = [_workpad_collector.workpadCollector, _custom_element_collector.customElementCollector];
/*
  Register the canvas usage collector function

  This will call all of the defined collectors and combine the individual results into a single object
  to be returned to the caller.

  A usage collector function returns an object derived from current data in the ES Cluster.
*/

function registerCanvasUsageCollector(usageCollection, kibanaIndex) {
  if (!usageCollection) {
    return;
  }

  const canvasCollector = usageCollection.makeUsageCollector({
    type: _constants.CANVAS_USAGE_TYPE,
    isReady: () => true,
    fetch: async callCluster => {
      const collectorResults = await Promise.all(collectors.map(collector => collector(kibanaIndex, callCluster)));
      return collectorResults.reduce((reduction, usage) => {
        return { ...reduction,
          ...usage
        };
      }, {});
    }
  });
  usageCollection.registerCollector(canvasCollector);
}