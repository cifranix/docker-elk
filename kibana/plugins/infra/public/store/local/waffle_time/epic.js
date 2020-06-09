"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWaffleTimeEpic = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _actions = require("./actions");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createWaffleTimeEpic = function createWaffleTimeEpic() {
  return function (action$, state$, _ref) {
    var selectWaffleTimeUpdatePolicyInterval = _ref.selectWaffleTimeUpdatePolicyInterval;
    var updateInterval$ = state$.pipe((0, _operators.map)(selectWaffleTimeUpdatePolicyInterval), (0, _operators.filter)(isNotNull));
    return action$.pipe((0, _operators.filter)(_actions.startAutoReload.match), (0, _operators.withLatestFrom)(updateInterval$), (0, _operators.exhaustMap)(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          action = _ref3[0],
          updateInterval = _ref3[1];

      return (0, _rxjs.timer)(0, updateInterval).pipe((0, _operators.map)(function () {
        return (0, _actions.jumpToTime)(Date.now());
      }), (0, _operators.takeUntil)(action$.pipe((0, _operators.filter)(_actions.stopAutoReload.match))));
    }));
  };
};

exports.createWaffleTimeEpic = createWaffleTimeEpic;

var isNotNull = function isNotNull(value) {
  return value !== null;
};