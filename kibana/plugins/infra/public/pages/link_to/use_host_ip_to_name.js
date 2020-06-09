"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHostIpToName = void 0;

var _react = require("react");

var _public = require("../../../../../../src/plugins/kibana_react/public");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useHostIpToName = function useHostIpToName(ipAddress, indexPattern) {
  var _useKibana$services$h;

  var fetch = (_useKibana$services$h = (0, _public.useKibana)().services.http) === null || _useKibana$services$h === void 0 ? void 0 : _useKibana$services$h.fetch;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoadingState = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      data = _useState6[0],
      setData = _useState6[1];

  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoadingState(true);
              setError(null);
              _context.prev = 2;

              if (fetch) {
                _context.next = 5;
                break;
              }

              throw new Error('HTTP service is unavailable');

            case 5:
              if (!(ipAddress && indexPattern)) {
                _context.next = 11;
                break;
              }

              _context.next = 8;
              return fetch('/api/infra/ip_to_host', {
                method: 'POST',
                body: JSON.stringify({
                  ip: ipAddress,
                  index_pattern: indexPattern
                })
              });

            case 8:
              response = _context.sent;
              setLoadingState(false);
              setData(response);

            case 11:
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](2);
              setLoadingState(false);
              setError(_context.t0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 13]]);
    }))();
  }, [ipAddress, indexPattern, fetch]);
  return {
    name: data && data.host || null,
    loading: loading,
    error: error
  };
};

exports.useHostIpToName = useHostIpToName;