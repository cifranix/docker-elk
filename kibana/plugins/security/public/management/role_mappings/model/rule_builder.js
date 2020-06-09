"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRulesFromRaw = generateRulesFromRaw;

var _i18n = require("@kbn/i18n");

var _field_rule = require("./field_rule");

var _all_rule = require("./all_rule");

var _any_rule = require("./any_rule");

var _except_all_rule = require("./except_all_rule");

var _except_any_rule = require("./except_any_rule");

var _ = require(".");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Given a set of raw rules, this constructs a class based tree for consumption by the Role Management UI.
 * This also performs validation on the raw rule set, as it is possible to enter raw JSON in the JSONRuleEditor,
 * so we have no guarantees that the rule set is valid ahead of time.
 *
 * @param rawRules the raw rules to translate.
 */
function generateRulesFromRaw() {
  var rawRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return parseRawRules(rawRules, null, [], 0);
}

function parseRawRules(rawRules, parentRuleType, ruleTrace, depth) {
  var entries = Object.entries(rawRules);

  if (!entries.length) {
    return {
      rules: null,
      maxDepth: 0
    };
  }

  if (entries.length > 1) {
    throw new _.RuleBuilderError(_i18n.i18n.translate('xpack.security.management.editRoleMapping.ruleBuilder.expectSingleRule', {
      defaultMessage: "Expected a single rule definition, but found {numberOfRules}.",
      values: {
        numberOfRules: entries.length
      }
    }), ruleTrace);
  }

  var rule = entries[0];

  var _rule = _slicedToArray(rule, 2),
      ruleType = _rule[0],
      ruleDefinition = _rule[1];

  return createRuleForType(ruleType, ruleDefinition, parentRuleType, ruleTrace, depth + 1);
}

function createRuleForType(ruleType, ruleDefinition, parentRuleType) {
  var ruleTrace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var depth = arguments.length > 4 ? arguments[4] : undefined;
  var isRuleNegated = parentRuleType === 'except';
  var currentRuleTrace = [].concat(_toConsumableArray(ruleTrace), [ruleType]);

  switch (ruleType) {
    case 'field':
      {
        assertIsObject(ruleDefinition, currentRuleTrace);
        var entries = Object.entries(ruleDefinition);

        if (entries.length !== 1) {
          throw new _.RuleBuilderError(_i18n.i18n.translate('xpack.security.management.editRoleMapping.ruleBuilder.expectedSingleFieldRule', {
            defaultMessage: "Expected a single field, but found {count}.",
            values: {
              count: entries.length
            }
          }), currentRuleTrace);
        }

        var _ref = entries[0],
            _ref2 = _slicedToArray(_ref, 2),
            field = _ref2[0],
            value = _ref2[1];

        var values = Array.isArray(value) ? value : [value];
        values.forEach(function (fieldValue) {
          var valueType = _typeof(fieldValue);

          if (fieldValue !== null && !['string', 'number', 'boolean'].includes(valueType)) {
            throw new _.RuleBuilderError(_i18n.i18n.translate('xpack.security.management.editRoleMapping.ruleBuilder.invalidFieldValueType', {
              defaultMessage: "Invalid value type for field. Expected one of null, string, number, or boolean, but found {valueType} ({value}).",
              values: {
                valueType: valueType,
                value: JSON.stringify(value)
              }
            }), currentRuleTrace);
          }
        });
        var fieldRule = new _field_rule.FieldRule(field, value);
        return {
          rules: isRuleNegated ? new _except_all_rule.ExceptAllRule([fieldRule]) : fieldRule,
          maxDepth: depth
        };
      }

    case 'any': // intentional fall-through to 'all', as validation logic is identical

    case 'all':
      {
        if (ruleDefinition != null && !Array.isArray(ruleDefinition)) {
          throw new _.RuleBuilderError(_i18n.i18n.translate('xpack.security.management.editRoleMapping.ruleBuilder.expectedArrayForGroupRule', {
            defaultMessage: "Expected an array of rules, but found {type}.",
            values: {
              type: _typeof(ruleDefinition)
            }
          }), currentRuleTrace);
        }

        var subRulesResults = (ruleDefinition || []).map(function (definition, index) {
          return parseRawRules(definition, ruleType, [].concat(_toConsumableArray(currentRuleTrace), ["[".concat(index, "]")]), depth);
        });

        var _subRulesResults$redu = subRulesResults.reduce(function (acc, result) {
          return {
            subRules: [].concat(_toConsumableArray(acc.subRules), [result.rules]),
            maxDepth: Math.max(acc.maxDepth, result.maxDepth)
          };
        }, {
          subRules: [],
          maxDepth: 0
        }),
            subRules = _subRulesResults$redu.subRules,
            maxDepth = _subRulesResults$redu.maxDepth;

        if (ruleType === 'all') {
          return {
            rules: isRuleNegated ? new _except_all_rule.ExceptAllRule(subRules) : new _all_rule.AllRule(subRules),
            maxDepth: maxDepth
          };
        } else {
          return {
            rules: isRuleNegated ? new _except_any_rule.ExceptAnyRule(subRules) : new _any_rule.AnyRule(subRules),
            maxDepth: maxDepth
          };
        }
      }

    case 'except':
      {
        assertIsObject(ruleDefinition, currentRuleTrace);

        if (parentRuleType !== 'all') {
          throw new _.RuleBuilderError(_i18n.i18n.translate('xpack.security.management.editRoleMapping.ruleBuilder.exceptOnlyInAllRule', {
            defaultMessage: "\"except\" rule can only exist within an \"all\" rule."
          }), currentRuleTrace);
        } // subtracting 1 from depth because we don't currently count the "except" level itself as part of the depth calculation
        // for the purpose of determining if the rule set is "too complex" for the visual rule editor.
        // The "except" rule MUST be nested within an "all" rule type (see validation above), so the depth itself will always be a non-negative number.


        return parseRawRules(ruleDefinition || {}, ruleType, currentRuleTrace, depth - 1);
      }

    default:
      throw new _.RuleBuilderError(_i18n.i18n.translate('xpack.security.management.editRoleMapping.ruleBuilder.unknownRuleType', {
        defaultMessage: "Unknown rule type: {ruleType}.",
        values: {
          ruleType: ruleType
        }
      }), currentRuleTrace);
  }
}

function assertIsObject(ruleDefinition, ruleTrace) {
  var fieldType = _typeof(ruleDefinition);

  if (Array.isArray(ruleDefinition)) {
    fieldType = 'array';
  }

  if (ruleDefinition && fieldType !== 'object') {
    throw new _.RuleBuilderError(_i18n.i18n.translate('xpack.security.management.editRoleMapping.ruleBuilder.expectedObjectError', {
      defaultMessage: "Expected an object, but found {type}.",
      values: {
        type: fieldType
      }
    }), ruleTrace);
  }
}