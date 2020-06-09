"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataEnhancedPlugin = void 0;

var _public = require("../../../../src/plugins/data/public");

var _services = require("./services");

var _autocomplete = require("./autocomplete");

var _search = require("./search");

var _search_interceptor = require("./search/search_interceptor");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DataEnhancedPlugin =
/*#__PURE__*/
function () {
  function DataEnhancedPlugin() {
    _classCallCheck(this, DataEnhancedPlugin);
  }

  _createClass(DataEnhancedPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var data = _ref.data;
      data.autocomplete.addQuerySuggestionProvider(_autocomplete.KUERY_LANGUAGE_NAME, (0, _autocomplete.setupKqlQuerySuggestionProvider)(core));
      data.search.registerSearchStrategyProvider(_search.ASYNC_SEARCH_STRATEGY, _search.asyncSearchStrategyProvider);
      data.search.registerSearchStrategyProvider(_public.ES_SEARCH_STRATEGY, _search.enhancedEsSearchStrategyProvider);
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      (0, _services.setAutocompleteService)(plugins.data.autocomplete);
      var enhancedSearchInterceptor = new _search_interceptor.EnhancedSearchInterceptor(core.notifications.toasts, core.application, core.injectedMetadata.getInjectedVar('esRequestTimeout'));
      plugins.data.search.setInterceptor(enhancedSearchInterceptor);
    }
  }]);

  return DataEnhancedPlugin;
}();

exports.DataEnhancedPlugin = DataEnhancedPlugin;