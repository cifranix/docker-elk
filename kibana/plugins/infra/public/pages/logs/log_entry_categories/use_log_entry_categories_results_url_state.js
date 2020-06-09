"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogEntryCategoriesResultsUrlState = exports.stringTimeRangeRT = void 0;

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _pipeable = require("fp-ts/lib/pipeable");

var rt = _interopRequireWildcard(require("io-ts"));

var _use_url_state = require("../../../utils/use_url_state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var autoRefreshRT = rt.union([rt.type({
  interval: rt.number,
  isPaused: rt.boolean
}), rt.undefined]);
var stringTimeRangeRT = rt.type({
  startTime: rt.string,
  endTime: rt.string
});
exports.stringTimeRangeRT = stringTimeRangeRT;
var urlTimeRangeRT = rt.union([stringTimeRangeRT, rt.undefined]);
var TIME_RANGE_URL_STATE_KEY = 'timeRange';
var AUTOREFRESH_URL_STATE_KEY = 'autoRefresh';

var useLogEntryCategoriesResultsUrlState = function useLogEntryCategoriesResultsUrlState() {
  var _useUrlState = (0, _use_url_state.useUrlState)({
    defaultState: {
      startTime: 'now-2w',
      endTime: 'now'
    },
    decodeUrlState: function decodeUrlState(value) {
      return (0, _pipeable.pipe)(urlTimeRangeRT.decode(value), (0, _Either.fold)((0, _function.constant)(undefined), _function.identity));
    },
    encodeUrlState: urlTimeRangeRT.encode,
    urlStateKey: TIME_RANGE_URL_STATE_KEY,
    writeDefaultState: true
  }),
      _useUrlState2 = _slicedToArray(_useUrlState, 2),
      timeRange = _useUrlState2[0],
      setTimeRange = _useUrlState2[1];

  var _useUrlState3 = (0, _use_url_state.useUrlState)({
    defaultState: {
      isPaused: false,
      interval: 60000
    },
    decodeUrlState: function decodeUrlState(value) {
      return (0, _pipeable.pipe)(autoRefreshRT.decode(value), (0, _Either.fold)((0, _function.constant)(undefined), _function.identity));
    },
    encodeUrlState: autoRefreshRT.encode,
    urlStateKey: AUTOREFRESH_URL_STATE_KEY,
    writeDefaultState: true
  }),
      _useUrlState4 = _slicedToArray(_useUrlState3, 2),
      autoRefresh = _useUrlState4[0],
      setAutoRefresh = _useUrlState4[1];

  return {
    timeRange: timeRange,
    setTimeRange: setTimeRange,
    autoRefresh: autoRefresh,
    setAutoRefresh: setAutoRefresh
  };
};

exports.useLogEntryCategoriesResultsUrlState = useLogEntryCategoriesResultsUrlState;