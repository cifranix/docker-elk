"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServerResultNode = createServerResultNode;
exports.fetchTopNodes = fetchTopNodes;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DEFAULT_SHARD_SIZE = 5000;

function createSamplerSearchBody(aggs) {
  var shardSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_SHARD_SIZE;
  return {
    size: 0,
    aggs: {
      sample: {
        sampler: {
          shard_size: shardSize
        },
        aggs: aggs
      }
    }
  };
}

function createTopTermsAggName(fieldName) {
  return "top_values_".concat(fieldName);
}

function createTopTermsSubAgg(field) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  return _defineProperty({}, createTopTermsAggName(field), {
    terms: {
      field: field,
      size: size
    }
  });
} // TODO use elasticsearch types here


function getTopTermsResult(response, fieldName) {
  if (!response.aggregations) {
    return [];
  }

  return response.aggregations.sample[createTopTermsAggName(fieldName)].buckets.map(function (bucket) {
    return bucket.key;
  });
}

function createServerResultNode(fieldName, term, allFields) {
  var field = allFields.find(function (_ref2) {
    var name = _ref2.name;
    return name === fieldName;
  });

  if (!field) {
    throw new Error('Invariant error: field not found');
  }

  return {
    field: fieldName,
    term: term,
    id: '',
    color: field.color,
    icon: field.icon,
    data: {
      field: fieldName,
      term: term
    },
    label: term
  };
}

function fetchTopNodes(_x, _x2, _x3) {
  return _fetchTopNodes.apply(this, arguments);
}

function _fetchTopNodes() {
  _fetchTopNodes = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(post, index, fields) {
    var aggs, body, response, nodes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            aggs = fields.map(function (_ref3) {
              var name = _ref3.name;
              return name;
            }).map(function (fieldName) {
              return createTopTermsSubAgg(fieldName);
            }).reduce(function (allAggs, subAgg) {
              return _objectSpread({}, allAggs, {}, subAgg);
            });
            body = createSamplerSearchBody(aggs);
            _context.next = 4;
            return post('../api/graph/searchProxy', {
              body: JSON.stringify({
                index: index,
                body: body
              })
            });

          case 4:
            response = _context.sent.resp;
            nodes = [];
            fields.forEach(function (_ref4) {
              var name = _ref4.name;
              var topTerms = getTopTermsResult(response, name);
              var fieldNodes = topTerms.map(function (term) {
                return createServerResultNode(name, term, fields);
              });
              nodes.push.apply(nodes, _toConsumableArray(fieldNodes));
            });
            return _context.abrupt("return", nodes);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchTopNodes.apply(this, arguments);
}