"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhancedEsSearchStrategyProvider = void 0;

var _common = require("../../../../../src/plugins/data/common");

var _public = require("../../../../../src/plugins/data/public");

var _async_search_strategy = require("./async_search_strategy");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var enhancedEsSearchStrategyProvider = function enhancedEsSearchStrategyProvider(context) {
  var asyncStrategyProvider = context.getSearchStrategy(_async_search_strategy.ASYNC_SEARCH_STRATEGY);

  var _asyncStrategyProvide = asyncStrategyProvider(context),
      asyncSearch = _asyncStrategyProvide.search;

  var search = function search(request, options) {
    var params = _objectSpread({
      ignoreThrottled: !context.core.uiSettings.get('search:includeFrozen'),
      preference: (0, _public.getEsPreference)(context.core.uiSettings)
    }, request.params);

    request.params = params;

    var asyncOptions = _objectSpread({
      pollInterval: 0
    }, options);

    return asyncSearch(_objectSpread({}, request, {
      serverStrategy: _common.ES_SEARCH_STRATEGY
    }), asyncOptions);
  };

  return {
    search: search
  };
};

exports.enhancedEsSearchStrategyProvider = enhancedEsSearchStrategyProvider;