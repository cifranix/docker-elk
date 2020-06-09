"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServiceNodeMetadata = getServiceNodeMetadata;

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

var _i18n = require("../../../common/i18n");

var _merge_projection = require("../../../common/projections/util/merge_projection");

var _service_nodes = require("../../../common/projections/service_nodes");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getServiceNodeMetadata({
  serviceName,
  serviceNodeName,
  setup
}) {
  var _response$aggregation, _response$aggregation2, _response$aggregation3, _response$aggregation4;

  const {
    client
  } = setup;
  const query = (0, _merge_projection.mergeProjection)((0, _service_nodes.getServiceNodesProjection)({
    setup,
    serviceName,
    serviceNodeName
  }), {
    body: {
      size: 0,
      aggs: {
        host: {
          terms: {
            field: _elasticsearch_fieldnames.HOST_NAME,
            size: 1
          }
        },
        containerId: {
          terms: {
            field: _elasticsearch_fieldnames.CONTAINER_ID,
            size: 1
          }
        }
      }
    }
  });
  const response = await client.search(query);
  return {
    host: ((_response$aggregation = response.aggregations) === null || _response$aggregation === void 0 ? void 0 : (_response$aggregation2 = _response$aggregation.host.buckets[0]) === null || _response$aggregation2 === void 0 ? void 0 : _response$aggregation2.key) || _i18n.NOT_AVAILABLE_LABEL,
    containerId: ((_response$aggregation3 = response.aggregations) === null || _response$aggregation3 === void 0 ? void 0 : (_response$aggregation4 = _response$aggregation3.containerId.buckets[0]) === null || _response$aggregation4 === void 0 ? void 0 : _response$aggregation4.key) || _i18n.NOT_AVAILABLE_LABEL
  };
}