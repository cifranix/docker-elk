"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleEditorPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _visual_rule_editor = require("./visual_rule_editor");

var _json_rule_editor = require("./json_rule_editor");

var _role_mapping_constants = require("../services/role_mapping_constants");

var _model = require("../../model");

var _role_mapping_validation = require("../services/role_mapping_validation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RuleEditorPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(RuleEditorPanel, _Component);

  function RuleEditorPanel(props) {
    var _this;

    _classCallCheck(this, RuleEditorPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RuleEditorPanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "initializeFromRawRules", function (rawRules) {
      var _generateRulesFromRaw = (0, _model.generateRulesFromRaw)(rawRules),
          rules = _generateRulesFromRaw.rules,
          maxDepth = _generateRulesFromRaw.maxDepth;

      var mode = maxDepth >= _role_mapping_constants.VISUAL_MAX_RULE_DEPTH ? 'json' : 'visual';
      return {
        rules: rules,
        mode: mode,
        maxDepth: maxDepth
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getConfirmModeChangePrompt", function () {
      if (!_this.state.showConfirmModeChange) {
        return null;
      }

      return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.confirmModeChangePromptTitle",
          defaultMessage: "Switch with invalid rules?"
        }),
        onCancel: function onCancel() {
          return _this.setState({
            showConfirmModeChange: false
          });
        },
        onConfirm: function onConfirm() {
          _this.setState({
            mode: 'visual',
            showConfirmModeChange: false
          });

          _this.onValidityChange(true);
        },
        cancelButtonText: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.confirmModeChangePromptCancelButton",
          defaultMessage: "Cancel"
        }),
        confirmButtonText: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.confirmModeChangePromptConfirmButton",
          defaultMessage: "Switch anyway"
        })
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.confirmModeChangePromptBody",
        defaultMessage: "The rules defined are not valid, and cannot be translated to the visual editor. You may lose some or all of your changes during the conversion. Do you wish to continue?"
      }))));
    });

    _defineProperty(_assertThisInitialized(_this), "onRuleChange", function (updatedRule) {
      var raw = updatedRule ? updatedRule.toRaw() : {};

      _this.props.onChange(raw);

      _this.setState(_objectSpread({}, (0, _model.generateRulesFromRaw)(raw)));
    });

    _defineProperty(_assertThisInitialized(_this), "onValidityChange", function (isRuleValid) {
      _this.setState({
        isRuleValid: isRuleValid
      });

      _this.props.onValidityChange(isRuleValid);
    });

    _defineProperty(_assertThisInitialized(_this), "trySwitchEditorMode", function (newMode) {
      switch (newMode) {
        case 'visual':
          {
            if (_this.state.isRuleValid) {
              _this.setState({
                mode: newMode
              });

              _this.onValidityChange(true);
            } else {
              _this.setState({
                showConfirmModeChange: true
              });
            }

            break;
          }

        case 'json':
          _this.setState({
            mode: newMode
          });

          _this.onValidityChange(true);

          break;

        default:
          throw new Error("Unexpected rule editor mode: ".concat(_this.state.mode));
      }
    });

    _this.state = _objectSpread({}, _this.initializeFromRawRules(props.rawRules), {
      isRuleValid: true,
      showConfirmModeChange: false,
      showVisualEditorDisabledAlert: false
    });
    return _this;
  }

  _createClass(RuleEditorPanel, [{
    key: "render",
    value: function render() {
      var validationResult = this.props.validateForm && (0, _role_mapping_validation.validateRoleMappingRules)({
        rules: this.state.rules ? this.state.rules.toRaw() : {}
      });
      var validationWarning = null;

      if (validationResult && validationResult.error) {
        validationWarning = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
          color: "danger",
          title: validationResult.error,
          size: "s"
        }));
      }

      return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.mappingRulesPanelTitle",
        defaultMessage: "Mapping rules"
      }))), _react.default.createElement(_eui.EuiFlexGroup, {
        direction: "column"
      }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
        size: "s",
        color: "subdued"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.roleMappingRulesFormRowHelpText",
        defaultMessage: "Assign roles to users who match these rules. {learnMoreLink}",
        values: {
          learnMoreLink: _react.default.createElement(_eui.EuiLink, {
            href: this.props.docLinks.getRoleMappingFieldRulesDocUrl(),
            target: "_blank",
            external: true
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.editRoleMapping.fieldRuleEditor.fieldValueHelp",
            defaultMessage: "Learn about supported field values."
          }))
        }
      })))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
        fullWidth: true,
        isInvalid: validationResult && validationResult.isInvalid
      }, _react.default.createElement(_eui.EuiErrorBoundary, null, _react.default.createElement(_react.Fragment, null, validationWarning, this.getEditor(), _react.default.createElement(_eui.EuiSpacer, {
        size: "xl"
      }), this.getModeToggle(), this.getConfirmModeChangePrompt()))))));
    }
  }, {
    key: "getModeToggle",
    value: function getModeToggle() {
      var _this2 = this;

      if (this.state.mode === 'json' && this.state.maxDepth > _role_mapping_constants.VISUAL_MAX_RULE_DEPTH) {
        return _react.default.createElement(_eui.EuiCallOut, {
          size: "s",
          title: _i18n.i18n.translate('xpack.security.management.editRoleMapping.visualEditorUnavailableTitle', {
            defaultMessage: 'Visual editor unavailable'
          })
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.editRoleMapping.visualEditorUnavailableMessage",
          defaultMessage: "Rule definition is too complex for the visual editor."
        }));
      } // Don't offer swith if no rules are present yet


      if (this.state.mode === 'visual' && this.state.rules === null) {
        return null;
      }

      switch (this.state.mode) {
        case 'visual':
          return _react.default.createElement(_eui.EuiLink, {
            "data-test-subj": "roleMappingsJSONRuleEditorButton",
            onClick: function onClick() {
              _this2.trySwitchEditorMode('json');
            }
          }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.editRoleMapping.switchToJSONEditorLink",
            defaultMessage: "Switch to JSON editor"
          }), ' ', _react.default.createElement(_eui.EuiIcon, {
            type: "inputOutput",
            size: "s"
          })));

        case 'json':
          return _react.default.createElement(_eui.EuiLink, {
            "data-test-subj": "roleMappingsVisualRuleEditorButton",
            onClick: function onClick() {
              _this2.trySwitchEditorMode('visual');
            }
          }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.editRoleMapping.switchToVisualEditorLink",
            defaultMessage: "Switch to visual editor"
          }), ' ', _react.default.createElement(_eui.EuiIcon, {
            type: "inputOutput",
            size: "s"
          })));

        default:
          throw new Error("Unexpected rule editor mode: ".concat(this.state.mode));
      }
    }
  }, {
    key: "getEditor",
    value: function getEditor() {
      var _this3 = this;

      switch (this.state.mode) {
        case 'visual':
          return _react.default.createElement(_visual_rule_editor.VisualRuleEditor, {
            rules: this.state.rules,
            maxDepth: this.state.maxDepth,
            onChange: this.onRuleChange,
            onSwitchEditorMode: function onSwitchEditorMode() {
              return _this3.trySwitchEditorMode('json');
            }
          });

        case 'json':
          return _react.default.createElement(_json_rule_editor.JSONRuleEditor, {
            rules: this.state.rules,
            onChange: this.onRuleChange,
            onValidityChange: this.onValidityChange,
            docLinks: this.props.docLinks
          });

        default:
          throw new Error("Unexpected rule editor mode: ".concat(this.state.mode));
      }
    }
  }]);

  return RuleEditorPanel;
}(_react.Component);

exports.RuleEditorPanel = RuleEditorPanel;