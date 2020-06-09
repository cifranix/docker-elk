"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualRuleEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _field_rule_editor = require("./field_rule_editor");

var _rule_group_editor = require("./rule_group_editor");

var _role_mapping_constants = require("../services/role_mapping_constants");

var _model = require("../../model");

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

var VisualRuleEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(VisualRuleEditor, _Component);

  function VisualRuleEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, VisualRuleEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(VisualRuleEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "canUseVisualEditor", function () {
      return _this.props.maxDepth < _role_mapping_constants.VISUAL_MAX_RULE_DEPTH;
    });

    _defineProperty(_assertThisInitialized(_this), "getRuleDepthWarning", function () {
      if (_this.canUseVisualEditor()) {
        return null;
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
        iconType: "alert",
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.visualRuleEditor.switchToJSONEditorTitle",
          defaultMessage: "Switch to JSON editor"
        }),
        "data-test-subj": "roleMappingsRulesTooComplex"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.visualRuleEditor.switchToJSONEditorMessage",
        defaultMessage: "Role mapping rules are too complex for the visual editor. Switch to the JSON editor to continue editing this rule."
      })), _react.default.createElement(_eui.EuiButton, {
        onClick: _this.props.onSwitchEditorMode,
        size: "s"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.visualRuleEditor.switchToJSONEditorButton",
        defaultMessage: "Use JSON editor"
      }))), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onRuleChange", function (updatedRule) {
      _this.props.onChange(updatedRule);
    });

    _defineProperty(_assertThisInitialized(_this), "onRuleDelete", function () {
      _this.props.onChange(null);
    });

    _defineProperty(_assertThisInitialized(_this), "renderRule", function (rule, onChange) {
      return _this.getEditorForRuleType(rule, onChange);
    });

    return _this;
  }

  _createClass(VisualRuleEditor, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.props.rules) {
        var _rules = this.renderRule(this.props.rules, this.onRuleChange);

        return _react.default.createElement(_react.Fragment, null, this.getRuleDepthWarning(), _rules);
      }

      return _react.default.createElement(_eui.EuiEmptyPrompt, {
        title: _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.visualRuleEditor.noRulesDefinedTitle",
          defaultMessage: "No rules defined"
        })),
        titleSize: "s",
        body: _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.visualRuleEditor.noRulesDefinedMessage",
          defaultMessage: "Rules control which users should be assigned roles."
        })),
        "data-test-subj": "roleMappingsNoRulesDefined",
        actions: _react.default.createElement(_eui.EuiButton, {
          color: "primary",
          iconType: "plusInCircle",
          "data-test-subj": "roleMappingsAddRuleButton",
          onClick: function onClick() {
            _this2.props.onChange(new _model.AllRule([new _model.FieldRule('username', '*')]));
          }
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.addFirstRuleButton",
          defaultMessage: "Add rules"
        }))
      });
    }
  }, {
    key: "getEditorForRuleType",
    value: function getEditorForRuleType(rule, _onChange) {
      if ((0, _is_rule_group.isRuleGroup)(rule)) {
        return _react.default.createElement(_rule_group_editor.RuleGroupEditor, {
          rule: rule,
          ruleDepth: 0,
          allowAdd: this.canUseVisualEditor(),
          onChange: function onChange(value) {
            return _onChange(value);
          },
          onDelete: this.onRuleDelete
        });
      }

      return _react.default.createElement(_field_rule_editor.FieldRuleEditor, {
        rule: rule,
        onChange: function onChange(value) {
          return _onChange(value);
        },
        onDelete: this.onRuleDelete
      });
    }
  }]);

  return VisualRuleEditor;
}(_react.Component);

exports.VisualRuleEditor = VisualRuleEditor;