"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllRule = void 0;

var _i18n = require("@kbn/i18n");

var _rule_group = require("./rule_group");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Represents a group of rules which must all evaluate to true.
 */
var AllRule =
/*#__PURE__*/
function (_RuleGroup) {
  _inherits(AllRule, _RuleGroup);

  function AllRule() {
    var _this;

    var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, AllRule);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AllRule).call(this));
    _this.rules = rules;
    return _this;
  }
  /** {@see RuleGroup.getRules} */


  _createClass(AllRule, [{
    key: "getRules",
    value: function getRules() {
      return _toConsumableArray(this.rules);
    }
    /** {@see RuleGroup.getDisplayTitle} */

  }, {
    key: "getDisplayTitle",
    value: function getDisplayTitle() {
      return _i18n.i18n.translate('xpack.security.management.editRoleMapping.allRule.displayTitle', {
        defaultMessage: 'All are true'
      });
    }
    /** {@see RuleGroup.replaceRule} */

  }, {
    key: "replaceRule",
    value: function replaceRule(ruleIndex, rule) {
      this.rules.splice(ruleIndex, 1, rule);
    }
    /** {@see RuleGroup.removeRule} */

  }, {
    key: "removeRule",
    value: function removeRule(ruleIndex) {
      this.rules.splice(ruleIndex, 1);
    }
    /** {@see RuleGroup.addRule} */

  }, {
    key: "addRule",
    value: function addRule(rule) {
      this.rules.push(rule);
    }
    /** {@see RuleGroup.canContainRules} */

  }, {
    key: "canContainRules",
    value: function canContainRules() {
      return true;
    }
    /** {@see RuleGroup.clone} */

  }, {
    key: "clone",
    value: function clone() {
      return new AllRule(this.rules.map(function (r) {
        return r.clone();
      }));
    }
    /** {@see RuleGroup.toRaw} */

  }, {
    key: "toRaw",
    value: function toRaw() {
      return {
        all: _toConsumableArray(this.rules.map(function (rule) {
          return rule.toRaw();
        }))
      };
    }
  }]);

  return AllRule;
}(_rule_group.RuleGroup);

exports.AllRule = AllRule;