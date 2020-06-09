"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.builtInComparators = exports.COMPARATORS = void 0;

var _i18n = require("@kbn/i18n");

var _builtInComparators;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var COMPARATORS;
exports.COMPARATORS = COMPARATORS;

(function (COMPARATORS) {
  COMPARATORS["GREATER_THAN"] = ">";
  COMPARATORS["GREATER_THAN_OR_EQUALS"] = ">=";
  COMPARATORS["BETWEEN"] = "between";
  COMPARATORS["LESS_THAN"] = "<";
  COMPARATORS["LESS_THAN_OR_EQUALS"] = "<=";
})(COMPARATORS || (exports.COMPARATORS = COMPARATORS = {}));

var builtInComparators = (_builtInComparators = {}, _defineProperty(_builtInComparators, COMPARATORS.GREATER_THAN, {
  text: _i18n.i18n.translate('xpack.triggersActionsUI.common.constants.comparators.isAboveLabel', {
    defaultMessage: 'Is above'
  }),
  value: COMPARATORS.GREATER_THAN,
  requiredValues: 1
}), _defineProperty(_builtInComparators, COMPARATORS.GREATER_THAN_OR_EQUALS, {
  text: _i18n.i18n.translate('xpack.triggersActionsUI.common.constants.comparators.isAboveOrEqualsLabel', {
    defaultMessage: 'Is above or equals'
  }),
  value: COMPARATORS.GREATER_THAN_OR_EQUALS,
  requiredValues: 1
}), _defineProperty(_builtInComparators, COMPARATORS.LESS_THAN, {
  text: _i18n.i18n.translate('xpack.triggersActionsUI.common.constants.comparators.isBelowLabel', {
    defaultMessage: 'Is below'
  }),
  value: COMPARATORS.LESS_THAN,
  requiredValues: 1
}), _defineProperty(_builtInComparators, COMPARATORS.LESS_THAN_OR_EQUALS, {
  text: _i18n.i18n.translate('xpack.triggersActionsUI.common.constants.comparators.isBelowOrEqualsLabel', {
    defaultMessage: 'Is below or equals'
  }),
  value: COMPARATORS.LESS_THAN_OR_EQUALS,
  requiredValues: 1
}), _defineProperty(_builtInComparators, COMPARATORS.BETWEEN, {
  text: _i18n.i18n.translate('xpack.triggersActionsUI.common.constants.comparators.isBetweenLabel', {
    defaultMessage: 'Is between'
  }),
  value: COMPARATORS.BETWEEN,
  requiredValues: 2
}), _builtInComparators);
exports.builtInComparators = builtInComparators;