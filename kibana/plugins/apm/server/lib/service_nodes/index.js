"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServiceNodes = void 0;

var _service_nodes = require("../../../common/projections/service_nodes");

var _merge_projection = require("../../../common/projections/util/merge_projection");

var _service_nodes2 = require("../../../common/service_nodes");

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getServiceNodes = async ({
  setup,
  serviceName
}) => {
  const {
    client
  } = setup;
  const projection = (0, _service_nodes.getServiceNodesProjection)({
    setup,
    serviceName
  });
  const params = (0, _merge_projection.mergeProjection)(projection, {
    body: {
      aggs: {
        nodes: {
          terms: { ...projection.body.aggs.nodes.terms,
            size: 10000,
            missing: _service_nodes2.SERVICE_NODE_NAME_MISSING
          },
          aggs: {
            cpu: {
              avg: {
                field: _elasticsearch_fieldnames.METRIC_PROCESS_CPU_PERCENT
              }
            },
            heapMemory: {
              avg: {
                field: _elasticsearch_fieldnames.METRIC_JAVA_HEAP_MEMORY_USED
              }
            },
            nonHeapMemory: {
              avg: {
                field: _elasticsearch_fieldnames.METRIC_JAVA_NON_HEAP_MEMORY_USED
              }
            },
            threadCount: {
              max: {
                field: _elasticsearch_fieldnames.METRIC_JAVA_THREAD_COUNT
              }
            }
          }
        }
      }
    }
  });
  const response = await client.search(params);

  if (!response.aggregations) {
    return [];
  }

  return response.aggregations.nodes.buckets.map(bucket => {
    return {
      name: bucket.key,
      cpu: bucket.cpu.value,
      heapMemory: bucket.heapMemory.value,
      nonHeapMemory: bucket.nonHeapMemory.value,
      threadCount: bucket.threadCount.value
    };
  });
};

exports.getServiceNodes = getServiceNodes;