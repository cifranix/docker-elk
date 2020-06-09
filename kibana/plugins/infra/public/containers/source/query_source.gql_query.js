"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _shared = require("../../../common/graphql/shared");

var _source_fields_fragment = require("./source_fields_fragment.gql_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query SourceQuery($sourceId: ID = \"default\") {\n    source(id: $sourceId) {\n      ...InfraSourceFields\n      configuration {\n        ...SourceConfigurationFields\n      }\n      status {\n        ...SourceStatusFields\n      }\n    }\n  }\n\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var sourceQuery = (0, _graphqlTag.default)(_templateObject(), _shared.sharedFragments.InfraSourceFields, _source_fields_fragment.sourceConfigurationFieldsFragment, _source_fields_fragment.sourceStatusFieldsFragment);
exports.sourceQuery = sourceQuery;