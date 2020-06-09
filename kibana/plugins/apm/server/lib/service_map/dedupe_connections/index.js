"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dedupeConnections = dedupeConnections;

var _lodash = require("lodash");

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getConnectionNodeId(node) {
  if ('span.destination.service.resource' in node) {
    // use a prefix to distinguish exernal destination ids from services
    return `>${node[_elasticsearch_fieldnames.SPAN_DESTINATION_SERVICE_RESOURCE]}`;
  }

  return node[_elasticsearch_fieldnames.SERVICE_NAME];
}

function getConnectionId(connection) {
  return `${getConnectionNodeId(connection.source)}~${getConnectionNodeId(connection.destination)}`;
}

function dedupeConnections(response) {
  const {
    discoveredServices,
    services,
    connections
  } = response;
  const allNodes = connections.flatMap(connection => [connection.source, connection.destination]).map(node => ({ ...node,
    id: getConnectionNodeId(node)
  })).concat(services.map(service => ({ ...service,
    id: service[_elasticsearch_fieldnames.SERVICE_NAME]
  })));
  const serviceNodes = allNodes.filter(node => _elasticsearch_fieldnames.SERVICE_NAME in node);
  const externalNodes = allNodes.filter(node => _elasticsearch_fieldnames.SPAN_DESTINATION_SERVICE_RESOURCE in node); // 1. maps external nodes to internal services
  // 2. collapses external nodes into one node based on span.destination.service.resource
  // 3. picks the first available span.type/span.subtype in an alphabetically sorted list

  const nodeMap = allNodes.reduce((map, node) => {
    var _discoveredServices$f;

    if (map[node.id]) {
      return map;
    }

    const matchedService = (_discoveredServices$f = discoveredServices.find(({
      from
    }) => {
      if ('span.destination.service.resource' in node) {
        return node[_elasticsearch_fieldnames.SPAN_DESTINATION_SERVICE_RESOURCE] === from[_elasticsearch_fieldnames.SPAN_DESTINATION_SERVICE_RESOURCE];
      }

      return false;
    })) === null || _discoveredServices$f === void 0 ? void 0 : _discoveredServices$f.to;
    let serviceName = matchedService === null || matchedService === void 0 ? void 0 : matchedService[_elasticsearch_fieldnames.SERVICE_NAME];

    if (!serviceName && 'service.name' in node) {
      serviceName = node[_elasticsearch_fieldnames.SERVICE_NAME];
    }

    const matchedServiceNodes = serviceNodes.filter(serviceNode => serviceNode[_elasticsearch_fieldnames.SERVICE_NAME] === serviceName);

    if (matchedServiceNodes.length) {
      return { ...map,
        [node.id]: Object.assign({
          id: matchedServiceNodes[0][_elasticsearch_fieldnames.SERVICE_NAME]
        }, ...matchedServiceNodes.map(serviceNode => (0, _lodash.pick)(serviceNode, _lodash.identity)))
      };
    }

    const allMatchedExternalNodes = externalNodes.filter(n => n.id === node.id);
    const firstMatchedNode = allMatchedExternalNodes[0];
    return { ...map,
      [node.id]: { ...firstMatchedNode,
        label: firstMatchedNode[_elasticsearch_fieldnames.SPAN_DESTINATION_SERVICE_RESOURCE],
        [_elasticsearch_fieldnames.SPAN_TYPE]: allMatchedExternalNodes.map(n => n[_elasticsearch_fieldnames.SPAN_TYPE]).sort()[0],
        [_elasticsearch_fieldnames.SPAN_SUBTYPE]: allMatchedExternalNodes.map(n => n[_elasticsearch_fieldnames.SPAN_SUBTYPE]).sort()[0]
      }
    };
  }, {}); // maps destination.address to service.name if possible

  function getConnectionNode(node) {
    return nodeMap[getConnectionNodeId(node)];
  } // build connections with mapped nodes


  const mappedConnections = connections.map(connection => {
    const sourceData = getConnectionNode(connection.source);
    const targetData = getConnectionNode(connection.destination);
    return {
      source: sourceData.id,
      target: targetData.id,
      id: getConnectionId({
        source: sourceData,
        destination: targetData
      }),
      sourceData,
      targetData
    };
  }).filter(connection => connection.source !== connection.target);
  const nodes = mappedConnections.flatMap(connection => [connection.sourceData, connection.targetData]).concat(serviceNodes);
  const dedupedNodes = [];
  nodes.forEach(node => {
    if (!dedupedNodes.find(dedupedNode => node.id === dedupedNode.id)) {
      dedupedNodes.push(node);
    }
  });
  const connectionsById = mappedConnections.reduce((connectionMap, connection) => {
    return { ...connectionMap,
      [connection.id]: connection
    };
  }, {}); // instead of adding connections in two directions,
  // we add a `bidirectional` flag to use in styling

  const dedupedConnections = (0, _lodash.sortBy)(Object.values(connectionsById), // make sure that order is stable
  'id').reduce((prev, connection) => {
    const reversedConnection = prev.find(c => c.target === connection.source && c.source === connection.target);

    if (reversedConnection) {
      reversedConnection.bidirectional = true;
      return prev.concat({ ...connection,
        isInverseEdge: true
      });
    }

    return prev.concat(connection);
  }, []); // Put everything together in elements, with everything in the "data" property

  const elements = [...dedupedConnections, ...dedupedNodes].map(element => ({
    data: element
  }));
  return {
    elements
  };
}