"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.outlinkEncoders = void 0;

var _risonNode = _interopRequireDefault(require("rison-node"));

var _i18n = require("@kbn/i18n");

var _kql_encoder = require("./kql_encoder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var outlinkEncoders = [{
  id: 'kql-loose',
  title: _i18n.i18n.translate('xpack.graph.outlinkEncoders.kqlLooseTitle', {
    defaultMessage: 'KQL OR query'
  }),
  description: _i18n.i18n.translate('xpack.graph.outlinkEncoders.kqlLooseDescription', {
    defaultMessage: 'KQL query, compatible with Discover, Visualize, and Dashboards'
  }),
  encode: function encode(workspace) {
    return (0, _kql_encoder.asKQL)(workspace, 'or');
  },
  type: 'kql'
}, {
  id: 'kql',
  title: _i18n.i18n.translate('xpack.graph.outlinkEncoders.kqlTitle', {
    defaultMessage: 'KQL AND query'
  }),
  description: _i18n.i18n.translate('xpack.graph.outlinkEncoders.kqlLooseDescription', {
    defaultMessage: 'KQL query, compatible with Discover, Visualize, and Dashboards'
  }),
  encode: function encode(workspace) {
    return (0, _kql_encoder.asKQL)(workspace, 'and');
  },
  type: 'kql'
}, {
  id: 'esq-rison-loose',
  title: _i18n.i18n.translate('xpack.graph.outlinkEncoders.esqRisonLooseTitle', {
    defaultMessage: 'elasticsearch OR query (rison encoded)'
  }),
  description: _i18n.i18n.translate('xpack.graph.outlinkEncoders.esqRisonLooseDescription', {
    defaultMessage: 'rison-encoded JSON, minimum_should_match=1, compatible with most Kibana URLs'
  }),
  encode: function encode(workspace) {
    return encodeURIComponent(_risonNode.default.encode(workspace.getQuery(workspace.getSelectedOrAllNodes(), true)));
  },
  type: 'esq'
}, {
  id: 'esq-rison',
  title: _i18n.i18n.translate('xpack.graph.outlinkEncoders.esqRisonTitle', {
    defaultMessage: 'elasticsearch AND query (rison encoded)'
  }),
  description: _i18n.i18n.translate('xpack.graph.outlinkEncoders.esqRisonDescription', {
    defaultMessage: 'rison-encoded JSON, minimum_should_match=2, compatible with most Kibana URLs'
  }),
  encode: function encode(workspace) {
    return encodeURIComponent(_risonNode.default.encode(workspace.getQuery(workspace.getSelectedOrAllNodes())));
  },
  type: 'esq'
}, {
  id: 'esq-similar-rison',
  title: _i18n.i18n.translate('xpack.graph.outlinkEncoders.esqSimilarRisonTitle', {
    defaultMessage: 'elasticsearch more like this query (rison encoded)'
  }),
  description: _i18n.i18n.translate('xpack.graph.outlinkEncoders.esqSimilarRisonDescription', {
    defaultMessage: 'rison-encoded JSON, "like this but not this" type query to find missing docs'
  }),
  encode: function encode(workspace) {
    return encodeURIComponent(_risonNode.default.encode(workspace.getLikeThisButNotThisQuery(workspace.getSelectedOrAllNodes())));
  },
  type: 'esq'
}, {
  id: 'esq-plain',
  title: _i18n.i18n.translate('xpack.graph.outlinkEncoders.esqPlainTitle', {
    defaultMessage: 'elasticsearch query (plain encoding)'
  }),
  description: _i18n.i18n.translate('xpack.graph.outlinkEncoders.esqPlainDescription', {
    defaultMessage: 'JSON encoded using standard url encoding'
  }),
  encode: function encode(workspace) {
    return encodeURIComponent(JSON.stringify(workspace.getQuery(workspace.getSelectedOrAllNodes())));
  },
  type: 'esq'
}, {
  id: 'text-plain',
  title: _i18n.i18n.translate('xpack.graph.outlinkEncoders.textPlainTitle', {
    defaultMessage: 'plain text'
  }),
  description: _i18n.i18n.translate('xpack.graph.outlinkEncoders.textPlainDescription', {
    defaultMessage: 'Text of selected vertex labels as a plain url-encoded string'
  }),
  encode: function encode(workspace) {
    var q = '';
    var nodes = workspace.getSelectedOrAllNodes();

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];

      if (i > 0) {
        q += ' ';
      }

      q += node.label;
    }

    return encodeURIComponent(q);
  },
  type: 'plain'
}, {
  id: 'text-lucene',
  title: _i18n.i18n.translate('xpack.graph.outlinkEncoders.textLuceneTitle', {
    defaultMessage: 'Lucene-escaped text'
  }),
  description: _i18n.i18n.translate('xpack.graph.outlinkEncoders.textLuceneDescription', {
    defaultMessage: 'Text of selected vertex labels with any Lucene special characters encoded'
  }),
  encode: function encode(workspace) {
    var q = '';
    var nodes = workspace.getSelectedOrAllNodes();

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];

      if (i > 0) {
        q += ' ';
      }

      q += node.label;
    } // escape the Lucene special characters https://lucene.apache.org/core/2_9_4/queryparsersyntax.html#Escaping Special Characters


    var luceneChars = '+-&|!(){}[]^"~*?:\\';
    q = q.split('').map(function (char) {
      return luceneChars.includes(char) ? "\\".concat(char) : char;
    }).join('');
    return encodeURIComponent(q);
  },
  type: 'lucene'
}];
exports.outlinkEncoders = outlinkEncoders;