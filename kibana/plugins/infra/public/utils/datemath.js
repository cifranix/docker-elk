"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidDatemath = isValidDatemath;
exports.datemathToEpochMillis = datemathToEpochMillis;
exports.extendDatemath = extendDatemath;
exports.convertDate = convertDate;
exports.normalizeDate = normalizeDate;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isValidDatemath(value) {
  var parsedValue = _datemath.default.parse(value);

  return !!(parsedValue && parsedValue.isValid());
}

function datemathToEpochMillis(value) {
  var round = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'down';

  var parsedValue = _datemath.default.parse(value, {
    roundUp: round === 'up'
  });

  if (!parsedValue || !parsedValue.isValid()) {
    return null;
  }

  return parsedValue.valueOf();
}

var datemathNowExpression = /(\+|\-)(\d+)(ms|s|m|h|d|w|M|y)$/;
/**
 * Extend a datemath value
 * @param value The value to extend
 * @param {'before' | 'after'} direction Should the value move before or after in time
 * @param oppositeEdge For absolute values, the value of the other edge of the range
 */

function extendDatemath(value) {
  var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'before';
  var oppositeEdge = arguments.length > 2 ? arguments[2] : undefined;

  if (!isValidDatemath(value)) {
    return undefined;
  } // `now` cannot be extended


  if (value === 'now') {
    return {
      value: 'now'
    };
  } // The unit is relative


  if (value.startsWith('now')) {
    return extendRelativeDatemath(value, direction);
  } else if (oppositeEdge && isValidDatemath(oppositeEdge)) {
    return extendAbsoluteDatemath(value, direction, oppositeEdge);
  }

  return undefined;
}

function extendRelativeDatemath(value, direction) {
  var _ref = datemathNowExpression.exec(value) || [],
      _ref2 = _slicedToArray(_ref, 4),
      operator = _ref2[1],
      amount = _ref2[2],
      unit = _ref2[3];

  if (!operator || !amount || !unit) {
    return undefined;
  }

  var mustIncreaseAmount = operator === '-' && direction === 'before';
  var parsedAmount = parseInt(amount, 10);
  var newUnit = unit;
  var newAmount; // Extend the amount

  switch (unit) {
    // For small units, always double or halve the amount
    case 'ms':
    case 's':
      newAmount = mustIncreaseAmount ? parsedAmount * 2 : Math.floor(parsedAmount / 2);
      break;
    // For minutes, increase or decrease in doubles or halves, depending on
    // the amount of minutes

    case 'm':
      var ratio;
      var MINUTES_LARGE = 10;

      if (mustIncreaseAmount) {
        ratio = parsedAmount >= MINUTES_LARGE ? 0.5 : 1;
        newAmount = parsedAmount + Math.floor(parsedAmount * ratio);
      } else {
        newAmount = parsedAmount >= MINUTES_LARGE ? Math.floor(parsedAmount / 1.5) : parsedAmount - Math.floor(parsedAmount * 0.5);
      }

      break;
    // For hours, increase or decrease half an hour for 1 hour. Otherwise
    // increase full hours

    case 'h':
      if (parsedAmount === 1) {
        newAmount = mustIncreaseAmount ? 90 : 30;
        newUnit = 'm';
      } else {
        newAmount = mustIncreaseAmount ? parsedAmount + 1 : parsedAmount - 1;
      }

      break;
    // For the rest of units, increase or decrease one smaller unit for
    // amounts of 1. Otherwise increase or decrease the unit

    case 'd':
    case 'w':
    case 'M':
    case 'y':
      if (parsedAmount === 1) {
        newUnit = _datemath.default.unitsDesc[_datemath.default.unitsDesc.indexOf(unit) + 1];
        newAmount = mustIncreaseAmount ? convertDate(1, unit, newUnit) + 1 : convertDate(1, unit, newUnit) - 1;
      } else {
        newAmount = mustIncreaseAmount ? parsedAmount + 1 : parsedAmount - 1;
      }

      break;

    default:
      throw new TypeError('Unhandled datemath unit');
  } // normalize amount and unit (i.e. 120s -> 2m)


  var _normalizeDate = normalizeDate(newAmount, newUnit),
      normalizedUnit = _normalizeDate.unit,
      normalizedAmount = _normalizeDate.amount; // How much have we changed the time?


  var diffAmount = Math.abs(normalizedAmount - convertDate(parsedAmount, unit, normalizedUnit)); // if `diffAmount` is not an integer after normalization, express the difference in the original unit

  var shouldKeepDiffUnit = diffAmount % 1 !== 0;
  return {
    value: "now".concat(operator).concat(normalizedAmount).concat(normalizedUnit),
    diffUnit: shouldKeepDiffUnit ? unit : newUnit,
    diffAmount: shouldKeepDiffUnit ? Math.abs(newAmount - parsedAmount) : diffAmount
  };
}

function extendAbsoluteDatemath(value, direction, oppositeEdge) {
  var valueTimestamp = datemathToEpochMillis(value);
  var oppositeEdgeTimestamp = datemathToEpochMillis(oppositeEdge);
  var actualTimestampDiff = Math.abs(valueTimestamp - oppositeEdgeTimestamp);
  var normalizedDiff = normalizeDate(actualTimestampDiff, 'ms');
  var normalizedTimestampDiff = convertDate(normalizedDiff.amount, normalizedDiff.unit, 'ms');
  var newValue = direction === 'before' ? valueTimestamp - normalizedTimestampDiff : valueTimestamp + normalizedTimestampDiff;
  return {
    value: new Date(newValue).toISOString(),
    diffUnit: normalizedDiff.unit,
    diffAmount: normalizedDiff.amount
  };
}

var CONVERSION_RATIOS = {
  wy: [['w', 52], // 1 year = 52 weeks
  ['y', 1]],
  w: [['ms', 1000], ['s', 60], ['m', 60], ['h', 24], ['d', 7], // 1 week = 7 days
  ['w', 4], // 1 month = 4 weeks = 28 days
  ['M', 12], // 1 year = 12 months = 52 weeks = 364 days
  ['y', 1]],
  M: [['ms', 1000], ['s', 60], ['m', 60], ['h', 24], ['d', 30], // 1 month = 30 days
  ['M', 12], // 1 year = 12 months = 360 days
  ['y', 1]],
  default: [['ms', 1000], ['s', 60], ['m', 60], ['h', 24], ['d', 365], // 1 year = 365 days
  ['y', 1]]
};

function getRatioScale(from, to) {
  if (from === 'y' && to === 'w' || from === 'w' && to === 'y') {
    return CONVERSION_RATIOS.wy;
  } else if (from === 'w' || to === 'w') {
    return CONVERSION_RATIOS.w;
  } else if (from === 'M' || to === 'M') {
    return CONVERSION_RATIOS.M;
  } else {
    return CONVERSION_RATIOS.default;
  }
}

function convertDate(value, from, to) {
  if (from === to) {
    return value;
  }

  var ratioScale = getRatioScale(from, to);
  var fromIdx = ratioScale.findIndex(function (ratio) {
    return ratio[0] === from;
  });
  var toIdx = ratioScale.findIndex(function (ratio) {
    return ratio[0] === to;
  });
  var convertedValue = value;

  if (fromIdx > toIdx) {
    // `from` is the bigger unit. Multiply the value
    for (var i = toIdx; i < fromIdx; i++) {
      convertedValue *= ratioScale[i][1];
    }
  } else {
    // `from` is the smaller unit. Divide the value
    for (var _i2 = fromIdx; _i2 < toIdx; _i2++) {
      convertedValue /= ratioScale[_i2][1];
    }
  }

  return convertedValue;
}

function normalizeDate(amount, unit) {
  // There is nothing after years
  if (unit === 'y') {
    return {
      amount: amount,
      unit: unit
    };
  }

  var nextUnit = _datemath.default.unitsAsc[_datemath.default.unitsAsc.indexOf(unit) + 1];

  var ratioScale = getRatioScale(unit, nextUnit);
  var ratio = ratioScale.find(function (r) {
    return r[0] === unit;
  })[1];
  var newAmount = amount / ratio; // Exact conversion

  if (newAmount === 1) {
    return {
      amount: newAmount,
      unit: nextUnit
    };
  } // Might be able to go one unit more, so try again, rounding the value
  // 7200s => 120m => 2h
  // 7249s ~> 120m ~> 2h


  if (newAmount >= 2) {
    return normalizeDate(Math.round(newAmount), nextUnit);
  } // Cannot go one one unit above. Return as it is


  return {
    amount: amount,
    unit: unit
  };
}