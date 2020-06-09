"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSourceViaHttpContext = exports.SourceViaHttpProvider = exports.SourceViaHttp = exports.useSourceViaHttp = exports.pickIndexPattern = void 0;

var _react = require("react");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _pipeable = require("fp-ts/lib/pipeable");

var _constate = _interopRequireDefault(require("constate"));

var _source_api = require("../../../common/http_api/source_api");

var _use_http_request = require("../../hooks/use_http_request");

var _runtime_types = require("../../../common/runtime_types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pickIndexPattern = function pickIndexPattern(source, type) {
  if (!source) {
    return 'unknown-index';
  }

  if (type === 'logs') {
    return source.configuration.logAlias;
  }

  if (type === 'metrics') {
    return source.configuration.metricAlias;
  }

  return "".concat(source.configuration.logAlias, ",").concat(source.configuration.metricAlias);
};

exports.pickIndexPattern = pickIndexPattern;

var useSourceViaHttp = function useSourceViaHttp(_ref) {
  var _ref$sourceId = _ref.sourceId,
      sourceId = _ref$sourceId === void 0 ? 'default' : _ref$sourceId,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'both' : _ref$type,
      fetch = _ref.fetch,
      toastWarning = _ref.toastWarning;

  var decodeResponse = function decodeResponse(response) {
    return (0, _pipeable.pipe)(_source_api.SourceResponseRuntimeType.decode(response), (0, _Either.fold)((0, _runtime_types.throwErrors)(_runtime_types.createPlainError), _function.identity));
  };

  var _useHTTPRequest = (0, _use_http_request.useHTTPRequest)("/api/metrics/source/".concat(sourceId, "/").concat(type), 'GET', null, decodeResponse, fetch, toastWarning),
      error = _useHTTPRequest.error,
      loading = _useHTTPRequest.loading,
      response = _useHTTPRequest.response,
      makeRequest = _useHTTPRequest.makeRequest;

  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return makeRequest();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, [makeRequest]);

  var createDerivedIndexPattern = function createDerivedIndexPattern() {
    var indexType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : type;
    return {
      fields: (response === null || response === void 0 ? void 0 : response.source) ? response.status.indexFields : [],
      title: pickIndexPattern(response === null || response === void 0 ? void 0 : response.source, indexType)
    };
  };

  var source = (0, _react.useMemo)(function () {
    return response ? _objectSpread({}, response.source, {
      status: response.status
    }) : null;
  }, [response]);
  return {
    createDerivedIndexPattern: createDerivedIndexPattern,
    source: source,
    loading: loading,
    error: error
  };
};

exports.useSourceViaHttp = useSourceViaHttp;
var SourceViaHttp = (0, _constate.default)(useSourceViaHttp);
exports.SourceViaHttp = SourceViaHttp;

var _SourceViaHttp = _slicedToArray(SourceViaHttp, 2),
    SourceViaHttpProvider = _SourceViaHttp[0],
    useSourceViaHttpContext = _SourceViaHttp[1];

exports.useSourceViaHttpContext = useSourceViaHttpContext;
exports.SourceViaHttpProvider = SourceViaHttpProvider;