"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertIntervalToString = exports.parseInterval = exports.INTERVAL_STRING_RE = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _moment = _interopRequireDefault(require("moment"));

var _i18n = require("@kbn/i18n");

var rt = _interopRequireWildcard(require("io-ts"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INTERVAL_STRING_RE = new RegExp("^([\\d\\.]+)\\s*(".concat(_datemath.default.units.join('|'), ")$"));
exports.INTERVAL_STRING_RE = INTERVAL_STRING_RE;

var parseInterval = function parseInterval(intervalString) {
  if (intervalString) {
    var matches = intervalString.match(INTERVAL_STRING_RE);

    if (matches) {
      var value = Number(matches[1]);
      var unit = matches[2];
      return {
        value: value,
        unit: unit
      };
    }
  }

  throw new Error(_i18n.i18n.translate('xpack.infra.parseInterval.errorMessage', {
    defaultMessage: '{value} is not an interval string',
    values: {
      value: intervalString
    }
  }));
};

exports.parseInterval = parseInterval;
var ValidUnitRT = rt.keyof({
  seconds: null,
  minutes: null,
  hours: null,
  days: null,
  weeks: null,
  months: null,
  years: null
});
var UNITS = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'];
var DISPLAY_STRINGS_FOR_UNITS_PLURAL = {
  seconds: _i18n.i18n.translate('xpack.infra.durationUnits.seconds.plural', {
    defaultMessage: 'seconds'
  }),
  minutes: _i18n.i18n.translate('xpack.infra.durationUnits.minutes.plural', {
    defaultMessage: 'minutes'
  }),
  hours: _i18n.i18n.translate('xpack.infra.durationUnits.hours.plural', {
    defaultMessage: 'hours'
  }),
  days: _i18n.i18n.translate('xpack.infra.durationUnits.days.plural', {
    defaultMessage: 'days'
  }),
  weeks: _i18n.i18n.translate('xpack.infra.durationUnits.weeks.plural', {
    defaultMessage: 'weeks'
  }),
  months: _i18n.i18n.translate('xpack.infra.durationUnits.months.plural', {
    defaultMessage: 'months'
  }),
  years: _i18n.i18n.translate('xpack.infra.durationUnits.years.plural', {
    defaultMessage: 'years'
  })
};
var DISPLAY_STRINGS_FOR_UNITS_SINGULAR = {
  seconds: _i18n.i18n.translate('xpack.infra.durationUnits.seconds.singular', {
    defaultMessage: 'second'
  }),
  minutes: _i18n.i18n.translate('xpack.infra.durationUnits.minutes.singular', {
    defaultMessage: 'minute'
  }),
  hours: _i18n.i18n.translate('xpack.infra.durationUnits.hours.singular', {
    defaultMessage: 'hour'
  }),
  days: _i18n.i18n.translate('xpack.infra.durationUnits.days.singular', {
    defaultMessage: 'day'
  }),
  weeks: _i18n.i18n.translate('xpack.infra.durationUnits.weeks.singular', {
    defaultMessage: 'week'
  }),
  months: _i18n.i18n.translate('xpack.infra.durationUnits.months.singular', {
    defaultMessage: 'month'
  }),
  years: _i18n.i18n.translate('xpack.infra.durationUnits.years.singular', {
    defaultMessage: 'year'
  })
};

var getDisplayableUnit = function getDisplayableUnit(value, unit) {
  return Math.floor(value) === 1 ? DISPLAY_STRINGS_FOR_UNITS_SINGULAR[unit] : DISPLAY_STRINGS_FOR_UNITS_PLURAL[unit];
};

var convertIntervalToString = function convertIntervalToString(input) {
  var interval = parseInterval(input);

  if ((interval === null || interval === void 0 ? void 0 : interval.unit) === 's') {
    var duration = _moment.default.duration(interval.value, interval.unit);

    var targetUnit = UNITS.reduce(function (answer, unit) {
      if (duration.as(unit) >= 1) {
        return unit;
      }

      return answer;
    }, 'seconds');
    var durationAsUnit = duration.as(targetUnit);
    return "".concat(Math.floor(durationAsUnit), " ").concat(getDisplayableUnit(durationAsUnit, targetUnit));
  }
};

exports.convertIntervalToString = convertIntervalToString;