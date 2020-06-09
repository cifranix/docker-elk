"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCachedIndexPatternProvider = createCachedIndexPatternProvider;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createCachedIndexPatternProvider(indexPatternGetter) {
  var cache = new Map();
  return {
    get: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(id) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (cache.has(id)) {
                  _context.next = 7;
                  break;
                }

                _context.t0 = cache;
                _context.t1 = id;
                _context.next = 5;
                return indexPatternGetter(id);

              case 5:
                _context.t2 = _context.sent;

                _context.t0.set.call(_context.t0, _context.t1, _context.t2);

              case 7:
                return _context.abrupt("return", Promise.resolve(cache.get(id)));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  };
}