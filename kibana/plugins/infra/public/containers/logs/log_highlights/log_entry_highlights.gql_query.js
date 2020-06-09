"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logEntryHighlightsQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _shared = require("../../../../common/graphql/shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query LogEntryHighlightsQuery(\n    $sourceId: ID = \"default\"\n    $startKey: InfraTimeKeyInput!\n    $endKey: InfraTimeKeyInput!\n    $filterQuery: String\n    $highlights: [InfraLogEntryHighlightInput!]!\n  ) {\n    source(id: $sourceId) {\n      id\n      logEntryHighlights(\n        startKey: $startKey\n        endKey: $endKey\n        filterQuery: $filterQuery\n        highlights: $highlights\n      ) {\n        start {\n          ...InfraTimeKeyFields\n        }\n        end {\n          ...InfraTimeKeyFields\n        }\n        entries {\n          ...InfraLogEntryHighlightFields\n        }\n      }\n    }\n  }\n\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var logEntryHighlightsQuery = (0, _graphqlTag.default)(_templateObject(), _shared.sharedFragments.InfraTimeKey, _shared.sharedFragments.InfraLogEntryHighlightFields);
exports.logEntryHighlightsQuery = logEntryHighlightsQuery;