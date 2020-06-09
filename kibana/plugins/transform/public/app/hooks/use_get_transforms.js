"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetTransforms = void 0;

var _common = require("../common");

var _use_api = require("./use_api");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isGetTransformsStatsResponseOk = function isGetTransformsStatsResponseOk(arg) {
  return {}.hasOwnProperty.call(arg, 'count') && {}.hasOwnProperty.call(arg, 'transforms') && Array.isArray(arg.transforms);
};

var useGetTransforms = function useGetTransforms(setTransforms, setErrorMessage, setIsInitialized, blockRefresh) {
  var api = (0, _use_api.useApi)();
  var concurrentLoads = 0;

  var getTransforms =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var forceRefresh,
          transformConfigs,
          transformStats,
          tableRows,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              forceRefresh = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;

              if (!(forceRefresh === true || blockRefresh === false)) {
                _context.next = 32;
                break;
              }

              _common.refreshTransformList$.next(_common.REFRESH_TRANSFORM_LIST_STATE.LOADING);

              concurrentLoads++;

              if (!(concurrentLoads > 1)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return");

            case 6:
              _context.prev = 6;
              _context.next = 9;
              return api.getTransforms();

            case 9:
              transformConfigs = _context.sent;
              _context.next = 12;
              return api.getTransformsStats();

            case 12:
              transformStats = _context.sent;
              tableRows = transformConfigs.transforms.reduce(function (reducedtableRows, config) {
                var stats = isGetTransformsStatsResponseOk(transformStats) ? transformStats.transforms.find(function (d) {
                  return config.id === d.id;
                }) : undefined; // A newly created transform might not have corresponding stats yet.
                // If that's the case we just skip the transform and don't add it to the transform list yet.

                if (!(0, _common.isTransformStats)(stats)) {
                  return reducedtableRows;
                } // Table with expandable rows requires `id` on the outer most level


                reducedtableRows.push({
                  id: config.id,
                  config: config,
                  mode: typeof config.sync !== 'undefined' ? _common.TRANSFORM_MODE.CONTINUOUS : _common.TRANSFORM_MODE.BATCH,
                  stats: stats
                });
                return reducedtableRows;
              }, []);
              setTransforms(tableRows);
              setErrorMessage(undefined);
              setIsInitialized(true);

              _common.refreshTransformList$.next(_common.REFRESH_TRANSFORM_LIST_STATE.IDLE);

              _context.next = 27;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](6);

              // An error is followed immediately by setting the state to idle.
              // This way we're able to treat ERROR as a one-time-event like REFRESH.
              _common.refreshTransformList$.next(_common.REFRESH_TRANSFORM_LIST_STATE.ERROR);

              _common.refreshTransformList$.next(_common.REFRESH_TRANSFORM_LIST_STATE.IDLE);

              setTransforms([]);
              setErrorMessage(_context.t0);
              setIsInitialized(true);

            case 27:
              concurrentLoads--;

              if (!(concurrentLoads > 0)) {
                _context.next = 32;
                break;
              }

              concurrentLoads = 0;
              getTransforms(true);
              return _context.abrupt("return");

            case 32:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 20]]);
    }));

    return function getTransforms() {
      return _ref.apply(this, arguments);
    };
  }();

  return getTransforms;
};

exports.useGetTransforms = useGetTransforms;