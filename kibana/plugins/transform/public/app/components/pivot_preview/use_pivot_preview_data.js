"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePivotPreviewData = exports.PIVOT_PREVIEW_STATUS = void 0;

var _react = require("react");

var _common = require("../../../../common/types/common");

var _use_api = require("../../hooks/use_api");

var _common2 = require("../../common");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PIVOT_PREVIEW_STATUS;
exports.PIVOT_PREVIEW_STATUS = PIVOT_PREVIEW_STATUS;

(function (PIVOT_PREVIEW_STATUS) {
  PIVOT_PREVIEW_STATUS[PIVOT_PREVIEW_STATUS["UNUSED"] = 0] = "UNUSED";
  PIVOT_PREVIEW_STATUS[PIVOT_PREVIEW_STATUS["LOADING"] = 1] = "LOADING";
  PIVOT_PREVIEW_STATUS[PIVOT_PREVIEW_STATUS["LOADED"] = 2] = "LOADED";
  PIVOT_PREVIEW_STATUS[PIVOT_PREVIEW_STATUS["ERROR"] = 3] = "ERROR";
})(PIVOT_PREVIEW_STATUS || (exports.PIVOT_PREVIEW_STATUS = PIVOT_PREVIEW_STATUS = {}));

var usePivotPreviewData = function usePivotPreviewData(indexPatternTitle, query, aggs, groupBy) {
  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      errorMessage = _useState2[0],
      setErrorMessage = _useState2[1];

  var _useState3 = (0, _react.useState)(PIVOT_PREVIEW_STATUS.UNUSED),
      _useState4 = _slicedToArray(_useState3, 2),
      status = _useState4[0],
      setStatus = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      previewData = _useState6[0],
      setPreviewData = _useState6[1];

  var _useState7 = (0, _react.useState)({
    properties: {}
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      previewMappings = _useState8[0],
      setPreviewMappings = _useState8[1];

  var api = (0, _use_api.useApi)();
  var aggsArr = (0, _common.dictionaryToArray)(aggs);
  var groupByArr = (0, _common.dictionaryToArray)(groupBy);
  var previewRequest = (0, _common2.getPreviewRequestBody)(indexPatternTitle, query, groupByArr, aggsArr);

  var getPreviewData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var resp;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(aggsArr.length === 0 || groupByArr.length === 0)) {
                _context.next = 3;
                break;
              }

              setPreviewData([]);
              return _context.abrupt("return");

            case 3:
              setErrorMessage('');
              setStatus(PIVOT_PREVIEW_STATUS.LOADING);
              _context.prev = 5;
              _context.next = 8;
              return api.getTransformsPreview(previewRequest);

            case 8:
              resp = _context.sent;
              setPreviewData(resp.preview);
              setPreviewMappings(resp.generated_dest_index.mappings);
              setStatus(PIVOT_PREVIEW_STATUS.LOADED);
              _context.next = 20;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](5);
              setErrorMessage(JSON.stringify(_context.t0, null, 2));
              setPreviewData([]);
              setPreviewMappings({
                properties: {}
              });
              setStatus(PIVOT_PREVIEW_STATUS.ERROR);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 14]]);
    }));

    return function getPreviewData() {
      return _ref.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    getPreviewData(); // custom comparison

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [indexPatternTitle, JSON.stringify(aggsArr), JSON.stringify(groupByArr), JSON.stringify(query)]);
  return {
    errorMessage: errorMessage,
    status: status,
    previewData: previewData,
    previewMappings: previewMappings,
    previewRequest: previewRequest
  };
};

exports.usePivotPreviewData = usePivotPreviewData;