"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldRule = void 0;

var _i18n = require("@kbn/i18n");

var _rule = require("./rule");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 * Represents a single field rule.
 * Ex: "username = 'foo'"
 */
var FieldRule =
/*#__PURE__*/
function (_Rule) {
  _inherits(FieldRule, _Rule);

  function FieldRule(field, value) {
    var _this;

    _classCallCheck(this, FieldRule);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FieldRule).call(this));
    _this.field = field;
    _this.value = value;
    return _this;
  }
  /** {@see Rule.getDisplayTitle} */


  _createClass(FieldRule, [{
    key: "getDisplayTitle",
    value: function getDisplayTitle() {
      return _i18n.i18n.translate('xpack.security.management.editRoleMapping.fieldRule.displayTitle', {
        defaultMessage: 'The following is true'
      });
    }
    /** {@see Rule.clone} */

  }, {
    key: "clone",
    value: function clone() {
      return new FieldRule(this.field, Array.isArray(this.value) ? _toConsumableArray(this.value) : this.value);
    }
    /** {@see Rule.toRaw} */

  }, {
    key: "toRaw",
    value: function toRaw() {
      return {
        field: _defineProperty({}, this.field, Array.isArray(this.value) ? _toConsumableArray(this.value) : this.value)
      };
    }
  }]);

  return FieldRule;
}(_rule.Rule);

exports.FieldRule = FieldRule;