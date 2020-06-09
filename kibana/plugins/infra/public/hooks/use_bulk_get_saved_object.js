"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBulkGetSavedObject = void 0;

var _react = require("react");

var _public = require("../../../../../src/plugins/kibana_react/public");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useBulkGetSavedObject = function useBulkGetSavedObject(type) {
  var kibana = (0, _public.useKibana)(); // TODO: define saved object type

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var bulkGet = (0, _react.useCallback)(function (ids) {
    setLoading(true);

    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _kibana$services$save, savedObjectsClient, d;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                savedObjectsClient = (_kibana$services$save = kibana.services.savedObjects) === null || _kibana$services$save === void 0 ? void 0 : _kibana$services$save.client;

                if (savedObjectsClient) {
                  _context.next = 4;
                  break;
                }

                throw new Error('Saved objects client is unavailable');

              case 4:
                _context.next = 6;
                return savedObjectsClient.bulkGet(ids.map(function (i) {
                  return {
                    type: type,
                    id: i
                  };
                }));

              case 6:
                d = _context.sent;
                setError(null);
                setLoading(false);
                setData(d);
                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                setLoading(false);
                setError(_context.t0);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 12]]);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    fetchData();
  }, [type, kibana.services.savedObjects]);
  return {
    data: data,
    loading: loading,
    error: error,
    bulkGet: bulkGet
  };
};

exports.useBulkGetSavedObject = useBulkGetSavedObject;