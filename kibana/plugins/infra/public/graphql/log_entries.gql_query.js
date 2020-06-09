"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logEntriesQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _shared = require("../../common/graphql/shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query LogEntries(\n    $sourceId: ID = \"default\"\n    $timeKey: InfraTimeKeyInput!\n    $countBefore: Int = 0\n    $countAfter: Int = 0\n    $filterQuery: String\n  ) {\n    source(id: $sourceId) {\n      id\n      logEntriesAround(\n        key: $timeKey\n        countBefore: $countBefore\n        countAfter: $countAfter\n        filterQuery: $filterQuery\n      ) {\n        start {\n          ...InfraTimeKeyFields\n        }\n        end {\n          ...InfraTimeKeyFields\n        }\n        hasMoreBefore\n        hasMoreAfter\n        entries {\n          ...InfraLogEntryFields\n        }\n      }\n    }\n  }\n\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var logEntriesQuery = (0, _graphqlTag.default)(_templateObject(), _shared.sharedFragments.InfraTimeKey, _shared.sharedFragments.InfraLogEntryFields);
exports.logEntriesQuery = logEntriesQuery;