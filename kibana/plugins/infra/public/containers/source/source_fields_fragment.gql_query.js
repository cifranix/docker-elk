"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceStatusFieldsFragment = exports.sourceConfigurationFieldsFragment = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  fragment SourceStatusFields on InfraSourceStatus {\n    indexFields {\n      name\n      type\n      searchable\n      aggregatable\n      displayable\n    }\n    logIndicesExist\n    metricIndicesExist\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  fragment SourceConfigurationFields on InfraSourceConfiguration {\n    name\n    description\n    logAlias\n    metricAlias\n    fields {\n      container\n      host\n      message\n      pod\n      tiebreaker\n      timestamp\n    }\n    logColumns {\n      ... on InfraSourceTimestampLogColumn {\n        timestampColumn {\n          id\n        }\n      }\n      ... on InfraSourceMessageLogColumn {\n        messageColumn {\n          id\n        }\n      }\n      ... on InfraSourceFieldLogColumn {\n        fieldColumn {\n          id\n          field\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var sourceConfigurationFieldsFragment = (0, _graphqlTag.default)(_templateObject());
exports.sourceConfigurationFieldsFragment = sourceConfigurationFieldsFragment;
var sourceStatusFieldsFragment = (0, _graphqlTag.default)(_templateObject2());
exports.sourceStatusFieldsFragment = sourceStatusFieldsFragment;