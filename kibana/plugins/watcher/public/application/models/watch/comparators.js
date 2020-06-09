"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparators = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("../../../../common/constants");

var _comparators;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var comparators = (_comparators = {}, _defineProperty(_comparators, _constants.COMPARATORS.GREATER_THAN, {
  text: _i18n.i18n.translate('xpack.watcher.thresholdWatchExpression.comparators.isAboveLabel', {
    defaultMessage: 'Is above'
  }),
  value: _constants.COMPARATORS.GREATER_THAN,
  requiredValues: 1
}), _defineProperty(_comparators, _constants.COMPARATORS.GREATER_THAN_OR_EQUALS, {
  text: _i18n.i18n.translate('xpack.watcher.thresholdWatchExpression.comparators.isAboveOrEqualsLabel', {
    defaultMessage: 'Is above or equals'
  }),
  value: _constants.COMPARATORS.GREATER_THAN_OR_EQUALS,
  requiredValues: 1
}), _defineProperty(_comparators, _constants.COMPARATORS.LESS_THAN, {
  text: _i18n.i18n.translate('xpack.watcher.thresholdWatchExpression.comparators.isBelowLabel', {
    defaultMessage: 'Is below'
  }),
  value: _constants.COMPARATORS.LESS_THAN,
  requiredValues: 1
}), _defineProperty(_comparators, _constants.COMPARATORS.LESS_THAN_OR_EQUALS, {
  text: _i18n.i18n.translate('xpack.watcher.thresholdWatchExpression.comparators.isBelowOrEqualsLabel', {
    defaultMessage: 'Is below or equals'
  }),
  value: _constants.COMPARATORS.LESS_THAN_OR_EQUALS,
  requiredValues: 1
}), _defineProperty(_comparators, _constants.COMPARATORS.BETWEEN, {
  text: _i18n.i18n.translate('xpack.watcher.thresholdWatchExpression.comparators.isBetweenLabel', {
    defaultMessage: 'Is between'
  }),
  value: _constants.COMPARATORS.BETWEEN,
  requiredValues: 2
}), _comparators);
exports.comparators = comparators;