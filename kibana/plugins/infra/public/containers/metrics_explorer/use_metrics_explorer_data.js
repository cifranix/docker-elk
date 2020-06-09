"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMetricsExplorerData = useMetricsExplorerData;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _lodash = require("lodash");

var _react = require("react");

var _metrics_explorer = require("../../../common/http_api/metrics_explorer");

var _kuery = require("../../utils/kuery");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _runtime_types = require("../../../common/runtime_types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isSameOptions(current, next) {
  return (0, _lodash.isEqual)(current, next);
}

function useMetricsExplorerData(options, source, derivedIndexPattern, timerange, afterKey, signal) {
  var _useKibana$services$h;

  var fetch = (_useKibana$services$h = (0, _public.useKibana)().services.http) === null || _useKibana$services$h === void 0 ? void 0 : _useKibana$services$h.fetch;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      data = _useState6[0],
      setData = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      lastOptions = _useState8[0],
      setLastOptions = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      lastTimerange = _useState10[0],
      setLastTimerange = _useState10[1];

  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var from, to, response, series;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(true);
              _context.prev = 1;
              from = _datemath.default.parse(timerange.from);
              to = _datemath.default.parse(timerange.to, {
                roundUp: true
              });

              if (!(!from || !to)) {
                _context.next = 6;
                break;
              }

              throw new Error('Unalble to parse timerange');

            case 6:
              if (fetch) {
                _context.next = 8;
                break;
              }

              throw new Error('HTTP service is unavailable');

            case 8:
              _context.t0 = (0, _runtime_types.decodeOrThrow)(_metrics_explorer.metricsExplorerResponseRT);
              _context.next = 11;
              return fetch('/api/infra/metrics_explorer', {
                method: 'POST',
                body: JSON.stringify({
                  metrics: options.aggregation === 'count' ? [{
                    aggregation: 'count'
                  }] : options.metrics.map(function (metric) {
                    return {
                      aggregation: metric.aggregation,
                      field: metric.field
                    };
                  }),
                  groupBy: options.groupBy,
                  afterKey: afterKey,
                  limit: options.limit,
                  indexPattern: source.metricAlias,
                  filterQuery: options.filterQuery && (0, _kuery.convertKueryToElasticSearchQuery)(options.filterQuery, derivedIndexPattern) || void 0,
                  timerange: _objectSpread({}, timerange, {
                    field: source.fields.timestamp,
                    from: from.valueOf(),
                    to: to.valueOf()
                  })
                })
              });

            case 11:
              _context.t1 = _context.sent;
              response = (0, _context.t0)(_context.t1);

              if (response) {
                if (data && lastOptions && data.pageInfo.afterKey !== response.pageInfo.afterKey && isSameOptions(lastOptions, options) && (0, _lodash.isEqual)(timerange, lastTimerange) && afterKey) {
                  series = data.series;
                  setData(_objectSpread({}, response, {
                    series: [].concat(_toConsumableArray(series), _toConsumableArray(response.series))
                  }));
                } else {
                  setData(response);
                }

                setLastOptions(options);
                setLastTimerange(timerange);
                setError(null);
              }

              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t2 = _context["catch"](1);
              setError(_context.t2);

            case 19:
              setLoading(false);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 16]]);
    }))(); // TODO: fix this dependency list while preserving the semantics
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [options, source, timerange, signal, afterKey]);
  return {
    error: error,
    loading: loading,
    data: data
  };
}