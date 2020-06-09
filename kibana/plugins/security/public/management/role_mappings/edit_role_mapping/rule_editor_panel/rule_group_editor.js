"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleGroupEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _add_rule_button = require("./add_rule_button");

var _rule_group_title = require("./rule_group_title");

var _field_rule_editor = require("./field_rule_editor");

var _is_rule_group = require("../services/is_rule_group");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RuleGroupEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(RuleGroupEditor, _Component);

  function RuleGroupEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RuleGroupEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RuleGroupEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderSubRules", function () {
      return _this.props.rule.getRules().map(function (subRule, subRuleIndex, rules) {
        var isLastRule = subRuleIndex === rules.length - 1;
        var divider = isLastRule ? null : _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_eui.EuiHorizontalRule, {
          margin: "m"
        }));

        if ((0, _is_rule_group.isRuleGroup)(subRule)) {
          return _react.default.createElement(_react.Fragment, {
            key: subRuleIndex
          }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(RuleGroupEditor, {
            rule: subRule,
            parentRule: _this.props.rule,
            allowAdd: _this.props.allowAdd,
            ruleDepth: _this.props.ruleDepth + 1,
            onChange: function onChange(updatedSubRule) {
              var updatedRule = _this.props.rule.clone();

              updatedRule.replaceRule(subRuleIndex, updatedSubRule);

              _this.props.onChange(updatedRule);
            },
            onDelete: function onDelete() {
              var updatedRule = _this.props.rule.clone();

              updatedRule.removeRule(subRuleIndex);

              _this.props.onChange(updatedRule);
            }
          })), divider);
        }

        return _react.default.createElement(_react.Fragment, {
          key: subRuleIndex
        }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_field_rule_editor.FieldRuleEditor, {
          rule: subRule,
          onChange: function onChange(updatedSubRule) {
            var updatedRule = _this.props.rule.clone();

            updatedRule.replaceRule(subRuleIndex, updatedSubRule);

            _this.props.onChange(updatedRule);
          },
          onDelete: function onDelete() {
            var updatedRule = _this.props.rule.clone();

            updatedRule.removeRule(subRuleIndex);

            _this.props.onChange(updatedRule);
          }
        })), divider);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAddRuleClick", function (newRule) {
      var updatedRule = _this.props.rule.clone();

      updatedRule.addRule(newRule);

      _this.props.onChange(updatedRule);
    });

    return _this;
  }

  _createClass(RuleGroupEditor, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_eui.EuiPanel, {
        className: "secRoleMapping__ruleEditorGroup--".concat(this.props.ruleDepth % 2 ? 'odd' : 'even')
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        direction: "column"
      }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: true
      }, _react.default.createElement(_rule_group_title.RuleGroupTitle, {
        rule: this.props.rule,
        onChange: this.props.onChange,
        parentRule: this.props.parentRule
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        color: "danger",
        onClick: this.props.onDelete,
        size: "s",
        iconType: "trash",
        "data-test-subj": "deleteRuleGroupButton"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.deleteRuleGroupButton",
        defaultMessage: "Delete"
      }))))), this.renderSubRules(), this.props.allowAdd && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_add_rule_button.AddRuleButton, {
        onClick: this.onAddRuleClick
      }))));
    }
  }]);

  return RuleGroupEditor;
}(_react.Component);

exports.RuleGroupEditor = RuleGroupEditor;