"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metricsQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query MetricsQuery(\n    $sourceId: ID!\n    $timerange: InfraTimerangeInput!\n    $metrics: [InfraMetric!]!\n    $nodeId: ID!\n    $cloudId: ID\n    $nodeType: InfraNodeType!\n  ) {\n    source(id: $sourceId) {\n      id\n      metrics(\n        nodeIds: { nodeId: $nodeId, cloudId: $cloudId }\n        timerange: $timerange\n        metrics: $metrics\n        nodeType: $nodeType\n      ) {\n        id\n        series {\n          id\n          label\n          data {\n            timestamp\n            value\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var metricsQuery = (0, _graphqlTag.default)(_templateObject());
exports.metricsQuery = metricsQuery;