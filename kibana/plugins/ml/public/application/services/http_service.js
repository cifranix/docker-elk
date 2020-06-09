"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.http = http;
exports.http$ = http$;
exports.fromHttpHandler = fromHttpHandler;

var _rxjs = require("rxjs");

var _dependency_cache = require("../util/dependency_cache");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getResultHeaders(headers) {
  return _objectSpread({
    asSystemRequest: true,
    'Content-Type': 'application/json'
  }, headers);
}

function getFetchOptions(options) {
  var _options$headers;

  if (!options.path) {
    throw new Error('URL path is missing');
  }

  return {
    path: options.path,
    fetchOptions: _objectSpread({
      credentials: 'same-origin',
      method: options.method || 'GET'
    }, options.body ? {
      body: options.body
    } : {}, {}, options.query ? {
      query: options.query
    } : {}, {
      headers: getResultHeaders((_options$headers = options.headers) !== null && _options$headers !== void 0 ? _options$headers : {})
    })
  };
}
/**
 * Function for making HTTP requests to Kibana's backend.
 * Wrapper for Kibana's HttpHandler.
 */


function http(_x) {
  return _http.apply(this, arguments);
}
/**
 * Function for making HTTP requests to Kibana's backend which returns an Observable
 * with request cancellation support.
 */


function _http() {
  _http = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options) {
    var _getFetchOptions2, path, fetchOptions;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _getFetchOptions2 = getFetchOptions(options), path = _getFetchOptions2.path, fetchOptions = _getFetchOptions2.fetchOptions;
            return _context.abrupt("return", (0, _dependency_cache.getHttp)().fetch(path, fetchOptions));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _http.apply(this, arguments);
}

function http$(options) {
  var _getFetchOptions = getFetchOptions(options),
      path = _getFetchOptions.path,
      fetchOptions = _getFetchOptions.fetchOptions;

  return fromHttpHandler(path, fetchOptions);
}
/**
 * Creates an Observable from Kibana's HttpHandler.
 */


function fromHttpHandler(input, init) {
  return new _rxjs.Observable(function (subscriber) {
    var controller = new AbortController();
    var signal = controller.signal;
    var abortable = true;
    var unsubscribed = false;

    if (init === null || init === void 0 ? void 0 : init.signal) {
      if (init.signal.aborted) {
        controller.abort();
      } else {
        init.signal.addEventListener('abort', function () {
          if (!signal.aborted) {
            controller.abort();
          }
        });
      }
    }

    var perSubscriberInit = _objectSpread({}, init ? init : {}, {
      signal: signal
    });

    (0, _dependency_cache.getHttp)().fetch(input, perSubscriberInit).then(function (response) {
      abortable = false;
      subscriber.next(response);
      subscriber.complete();
    }).catch(function (err) {
      abortable = false;

      if (!unsubscribed) {
        subscriber.error(err);
      }
    });
    return function () {
      unsubscribed = true;

      if (abortable) {
        controller.abort();
      }
    };
  });
}