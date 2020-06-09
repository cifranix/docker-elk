"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnimateSplit = useAnimateSplit;
exports.ANIMATION_SWITCH_DELAY_MS = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ANIMATION_SWITCH_DELAY_MS = 1000; // custom hook to enable the card split animation of the cards 1 second after the component has been rendered
// then switching to a step which contains the cards, the animation shouldn't play, instead
// the cards should be initially rendered in the split state.
// all subsequent changes to the split should be animated.

exports.ANIMATION_SWITCH_DELAY_MS = ANIMATION_SWITCH_DELAY_MS;

function useAnimateSplit() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      animateSplit = _useState2[0],
      setAnimateSplit = _useState2[1];

  (0, _react.useEffect)(function () {
    setTimeout(function () {
      setAnimateSplit(true);
    }, ANIMATION_SWITCH_DELAY_MS);
  }, []);
  return animateSplit;
}