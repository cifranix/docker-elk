"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotPageContent = void 0;

var _react = _interopRequireDefault(require("react"));

var _with_waffle_filters = require("../../../containers/waffle/with_waffle_filters");

var _with_waffle_options = require("../../../containers/waffle/with_waffle_options");

var _with_waffle_time = require("../../../containers/waffle/with_waffle_time");

var _with_options = require("../../../containers/with_options");

var _with_source = require("../../../containers/with_source");

var _layout = require("../../../components/inventory/layout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SnapshotPageContent = function SnapshotPageContent() {
  return _react.default.createElement(_with_source.WithSource, null, function (_ref) {
    var configuration = _ref.configuration,
        createDerivedIndexPattern = _ref.createDerivedIndexPattern,
        sourceId = _ref.sourceId;
    return _react.default.createElement(_with_options.WithOptions, null, function (_ref2) {
      var wafflemap = _ref2.wafflemap;
      return _react.default.createElement(_with_waffle_filters.WithWaffleFilter, {
        indexPattern: createDerivedIndexPattern('metrics')
      }, function (_ref3) {
        var filterQueryAsJson = _ref3.filterQueryAsJson,
            applyFilterQuery = _ref3.applyFilterQuery;
        return _react.default.createElement(_with_waffle_time.WithWaffleTime, null, function (_ref4) {
          var currentTime = _ref4.currentTime;
          return _react.default.createElement(_with_waffle_options.WithWaffleOptions, null, function (_ref5) {
            var metric = _ref5.metric,
                groupBy = _ref5.groupBy,
                nodeType = _ref5.nodeType,
                view = _ref5.view,
                changeView = _ref5.changeView,
                autoBounds = _ref5.autoBounds,
                boundsOverride = _ref5.boundsOverride,
                accountId = _ref5.accountId,
                region = _ref5.region;
            return _react.default.createElement(_layout.Layout, {
              currentTime: currentTime,
              filterQuery: filterQueryAsJson,
              metric: metric,
              groupBy: groupBy,
              nodeType: nodeType,
              sourceId: sourceId,
              options: _objectSpread({}, wafflemap, {
                metric: metric,
                fields: configuration && configuration.fields,
                groupBy: groupBy
              }),
              onDrilldown: applyFilterQuery,
              view: view,
              onViewChange: changeView,
              autoBounds: autoBounds,
              boundsOverride: boundsOverride,
              accountId: accountId,
              region: region
            });
          });
        });
      });
    });
  });
};

exports.SnapshotPageContent = SnapshotPageContent;