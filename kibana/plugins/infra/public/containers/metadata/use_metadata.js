"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMetadata = useMetadata;

var _react = require("react");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _pipeable = require("fp-ts/lib/pipeable");

var _metadata_api = require("../../../common/http_api/metadata_api");

var _use_http_request = require("../../hooks/use_http_request");

var _runtime_types = require("../../../common/runtime_types");

var _get_filtered_metrics = require("./lib/get_filtered_metrics");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function useMetadata(nodeId, nodeType, requiredMetrics, sourceId) {
  var decodeResponse = function decodeResponse(response) {
    return (0, _pipeable.pipe)(_metadata_api.InfraMetadataRT.decode(response), (0, _Either.fold)((0, _runtime_types.throwErrors)(_runtime_types.createPlainError), _function.identity));
  };

  var _useHTTPRequest = (0, _use_http_request.useHTTPRequest)('/api/infra/metadata', 'POST', JSON.stringify({
    nodeId: nodeId,
    nodeType: nodeType,
    sourceId: sourceId
  }), decodeResponse),
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
  return {
    name: response && response.name || '',
    filteredRequiredMetrics: response && (0, _get_filtered_metrics.getFilteredMetrics)(requiredMetrics, response.features) || [],
    error: error && error.message || null,
    loading: loading,
    metadata: response,
    cloudId: response && response.info && response.info.cloud && response.info.cloud.instance && response.info.cloud.instance.id || ''
  };
}