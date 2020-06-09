"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeUnitLabel = getTimeUnitLabel;

var _i18n = require("@kbn/i18n");

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getTimeUnitLabel() {
  var timeUnit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.TIME_UNITS.SECOND;
  var timeValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';

  switch (timeUnit) {
    case _constants.TIME_UNITS.SECOND:
      return _i18n.i18n.translate('xpack.watcher.timeUnits.secondLabel', {
        defaultMessage: '{timeValue, plural, one {second} other {seconds}}',
        values: {
          timeValue: timeValue
        }
      });

    case _constants.TIME_UNITS.MINUTE:
      return _i18n.i18n.translate('xpack.watcher.timeUnits.minuteLabel', {
        defaultMessage: '{timeValue, plural, one {minute} other {minutes}}',
        values: {
          timeValue: timeValue
        }
      });

    case _constants.TIME_UNITS.HOUR:
      return _i18n.i18n.translate('xpack.watcher.timeUnits.hourLabel', {
        defaultMessage: '{timeValue, plural, one {hour} other {hours}}',
        values: {
          timeValue: timeValue
        }
      });

    case _constants.TIME_UNITS.DAY:
      return _i18n.i18n.translate('xpack.watcher.timeUnits.dayLabel', {
        defaultMessage: '{timeValue, plural, one {day} other {days}}',
        values: {
          timeValue: timeValue
        }
      });
  }
}