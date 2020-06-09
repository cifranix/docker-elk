"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waffleNodesQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query WaffleNodesQuery(\n    $sourceId: ID!\n    $timerange: InfraTimerangeInput!\n    $filterQuery: String\n    $metric: InfraSnapshotMetricInput!\n    $groupBy: [InfraSnapshotGroupbyInput!]!\n    $type: InfraNodeType!\n  ) {\n    source(id: $sourceId) {\n      id\n      snapshot(timerange: $timerange, filterQuery: $filterQuery) {\n        nodes(groupBy: $groupBy, metric: $metric, type: $type) {\n          path {\n            value\n            label\n            ip\n          }\n          metric {\n            name\n            value\n            avg\n            max\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var waffleNodesQuery = (0, _graphqlTag.default)(_templateObject());
exports.waffleNodesQuery = waffleNodesQuery;