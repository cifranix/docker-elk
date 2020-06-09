"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSubmitCode = void 0;

var _react = require("react");

var _lodash = require("lodash");

var _constants = require("../../../common/constants");

var _types = require("../types");

var _format = require("../lib/format");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEBOUNCE_MS = 800;

var useSubmitCode = function useSubmitCode(http) {
  var currentRequestIdRef = (0, _react.useRef)(0);

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      response = _useState2[0],
      setResponse = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      inProgress = _useState4[0],
      setInProgress = _useState4[1];

  var submit = (0, _react.useCallback)((0, _lodash.debounce)(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(config) {
      var requestId, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setInProgress(true); // Prevent an older request that resolves after a more recent request from clobbering it.
              // We store the resulting ID in this closure for comparison when the request resolves.

              requestId = ++currentRequestIdRef.current;
              _context.prev = 2;
              _context.next = 5;
              return http.post("".concat(_constants.API_BASE_PATH, "/execute"), {
                // Stringify the string, because http runs it through JSON.parse, and we want to actually
                // send a JSON string.
                body: JSON.stringify((0, _format.formatRequestPayload)(config, _types.PayloadFormat.UGLY))
              });

            case 5:
              result = _context.sent;

              if (currentRequestIdRef.current === requestId) {
                setResponse(result);
                setInProgress(false);
              } // else ignore this response...


              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);

              if (currentRequestIdRef.current === requestId) {
                setResponse({
                  error: _context.t0
                });
                setInProgress(false);
              } // else ignore this response...


            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 9]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), DEBOUNCE_MS, {
    trailing: true
  }), [http]);
  return {
    response: response,
    inProgress: inProgress,
    submit: submit
  };
};

exports.useSubmitCode = useSubmitCode;