"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHTTPRequest = useHTTPRequest;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _use_tracked_promise = require("../utils/use_tracked_promise");

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useHTTPRequest(pathname, method, body) {
  var decode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (response) {
    return response;
  };
  var fetch = arguments.length > 4 ? arguments[4] : undefined;
  var toastWarning = arguments.length > 5 ? arguments[5] : undefined;
  return function () {
    var _kibana$services$http;

    var kibana = (0, _public.useKibana)();
    var fetchService = fetch ? fetch : (_kibana$services$http = kibana.services.http) === null || _kibana$services$http === void 0 ? void 0 : _kibana$services$http.fetch;
    var toast = toastWarning ? toastWarning : kibana.notifications.toasts.warning;

    var _useState = (0, _react.useState)(null),
        _useState2 = _slicedToArray(_useState, 2),
        response = _useState2[0],
        setResponse = _useState2[1];

    var _useState3 = (0, _react.useState)(null),
        _useState4 = _slicedToArray(_useState3, 2),
        error = _useState4[0],
        setError = _useState4[1];

    var _useTrackedPromise = (0, _use_tracked_promise.useTrackedPromise)({
      cancelPreviousOn: 'resolution',
      createPromise: function createPromise() {
        if (!fetchService) {
          throw new Error('HTTP service is unavailable');
        }

        return fetchService(pathname, {
          method: method,
          body: body
        });
      },
      onResolve: function onResolve(resp) {
        return setResponse(decode(resp));
      },
      onReject: function onReject(e) {
        var _err$response, _err$response2, _err$response3;

        var err = e;
        setError(err);
        toast({
          toastLifeTimeMs: 3000,
          title: _i18n.i18n.translate('xpack.infra.useHTTPRequest.error.title', {
            defaultMessage: "Error while fetching resource"
          }),
          body: _react.default.createElement("div", null, err.response ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("h5", null, _i18n.i18n.translate('xpack.infra.useHTTPRequest.error.status', {
            defaultMessage: "Error"
          })), (_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.statusText, " (", (_err$response2 = err.response) === null || _err$response2 === void 0 ? void 0 : _err$response2.status, ")", _react.default.createElement("h5", null, _i18n.i18n.translate('xpack.infra.useHTTPRequest.error.url', {
            defaultMessage: "URL"
          })), (_err$response3 = err.response) === null || _err$response3 === void 0 ? void 0 : _err$response3.url) : _react.default.createElement("h5", null, err.message))
        });
      }
    }, [pathname, body, method, fetch, toast]),
        _useTrackedPromise2 = _slicedToArray(_useTrackedPromise, 2),
        request = _useTrackedPromise2[0],
        makeRequest = _useTrackedPromise2[1];

    var loading = (0, _react.useMemo)(function () {
      if (request.state === 'resolved' && response === null) {
        return true;
      }

      return request.state === 'pending';
    }, [request.state, response]);
    return {
      response: response,
      error: error,
      loading: loading,
      makeRequest: makeRequest
    };
  }();
}