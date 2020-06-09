"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncSearchStrategyProvider = exports.ASYNC_SEARCH_STRATEGY = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _common = require("../../../../../src/plugins/data/common");

var _public = require("../../../../../src/plugins/data/public");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ASYNC_SEARCH_STRATEGY = 'ASYNC_SEARCH_STRATEGY';
exports.ASYNC_SEARCH_STRATEGY = ASYNC_SEARCH_STRATEGY;

var asyncSearchStrategyProvider = function asyncSearchStrategyProvider(context) {
  var syncStrategyProvider = context.getSearchStrategy(_public.SYNC_SEARCH_STRATEGY);

  var _syncStrategyProvider = syncStrategyProvider(context),
      _search = _syncStrategyProvider.search;

  return {
    search: function search(request) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _ref$pollInterval = _ref.pollInterval,
          pollInterval = _ref$pollInterval === void 0 ? 1000 : _ref$pollInterval,
          options = _objectWithoutProperties(_ref, ["pollInterval"]);

      var serverStrategy = request.serverStrategy;
      var id = request.id;
      var aborted$ = options.signal ? (0, _rxjs.fromEvent)(options.signal, 'abort').pipe((0, _operators.mergeMap)(function () {
        // If we haven't received the response to the initial request, including the ID, then
        // we don't need to send a follow-up request to delete this search. Otherwise, we
        // send the follow-up request to delete this search, then throw an abort error.
        if (id !== undefined) {
          context.core.http.delete("/internal/search/".concat(request.serverStrategy, "/").concat(id));
        }

        return (0, _rxjs.throwError)(new _common.AbortError());
      })) : _rxjs.NEVER;
      return _search(request, options).pipe((0, _operators.expand)(function (response) {
        // If the response indicates of an error, stop polling and complete the observable
        if (!response || response.is_partial && !response.is_running) {
          return (0, _rxjs.throwError)(new _common.AbortError());
        } // If the response indicates it is complete, stop polling and complete the observable


        if (!response.is_running) return _rxjs.EMPTY;
        id = response.id; // Delay by the given poll interval

        return (0, _rxjs.timer)(pollInterval).pipe( // Send future requests using just the ID from the response
        (0, _operators.mergeMap)(function () {
          return _search({
            id: id,
            serverStrategy: serverStrategy
          }, options);
        }));
      }), (0, _operators.takeUntil)(aborted$));
    }
  };
};

exports.asyncSearchStrategyProvider = asyncSearchStrategyProvider;