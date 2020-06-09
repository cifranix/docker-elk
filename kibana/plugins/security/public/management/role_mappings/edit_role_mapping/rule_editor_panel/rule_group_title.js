"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleGroupTitle = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _model = require("../../model");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var rules = [new _model.AllRule(), new _model.AnyRule()];
var exceptRules = [new _model.ExceptAllRule(), new _model.ExceptAnyRule()];

var RuleGroupTitle = function RuleGroupTitle(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isMenuOpen = _useState2[0],
      setIsMenuOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showConfirmChangeModal = _useState4[0],
      setShowConfirmChangeModal = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      pendingNewRule = _useState6[0],
      setPendingNewRule = _useState6[1];

  var canUseExcept = props.parentRule && props.parentRule.canContainRules(exceptRules);
  var availableRuleTypes = [].concat(rules, _toConsumableArray(canUseExcept ? exceptRules : []));

  var onChange = function onChange(newRule) {
    var currentSubRules = props.rule.getRules();
    var areSubRulesValid = newRule.canContainRules(currentSubRules);

    if (areSubRulesValid) {
      var clone = newRule.clone();
      currentSubRules.forEach(function (subRule) {
        return clone.addRule(subRule);
      });
      props.onChange(clone);
      setIsMenuOpen(false);
    } else {
      setPendingNewRule(newRule);
      setShowConfirmChangeModal(true);
    }
  };

  var changeRuleDiscardingSubRules = function changeRuleDiscardingSubRules(newRule) {
    // Ensure a default sub rule is present when not carrying over the original sub rules
    var newRuleInstance = newRule.clone();

    if (newRuleInstance.getRules().length === 0) {
      newRuleInstance.addRule(new _model.FieldRule('username', '*'));
    }

    props.onChange(newRuleInstance);
    setIsMenuOpen(false);
  };

  var ruleButton = _react.default.createElement(_eui.EuiLink, {
    onClick: function onClick() {
      return setIsMenuOpen(!isMenuOpen);
    },
    "data-test-subj": "ruleGroupTitle"
  }, props.rule.getDisplayTitle(), " ", _react.default.createElement(_eui.EuiIcon, {
    type: "arrowDown"
  }));

  var ruleTypeSelector = _react.default.createElement(_eui.EuiPopover, {
    button: ruleButton,
    isOpen: isMenuOpen,
    closePopover: function closePopover() {
      return setIsMenuOpen(false);
    }
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    items: availableRuleTypes.map(function (rt, index) {
      var isSelected = rt.getDisplayTitle() === props.rule.getDisplayTitle();
      var icon = isSelected ? 'check' : 'empty';
      return _react.default.createElement(_eui.EuiContextMenuItem, {
        key: index,
        icon: icon,
        onClick: function onClick() {
          return onChange(rt);
        }
      }, rt.getDisplayTitle());
    })
  }));

  var confirmChangeModal = showConfirmChangeModal ? _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    "data-test-subj": "confirmRuleChangeModal",
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.editRoleMapping.confirmGroupChangePromptTitle",
      defaultMessage: "Change group type?"
    }),
    onCancel: function onCancel() {
      setShowConfirmChangeModal(false);
      setPendingNewRule(null);
    },
    onConfirm: function onConfirm() {
      setShowConfirmChangeModal(false);
      changeRuleDiscardingSubRules(pendingNewRule);
      setPendingNewRule(null);
    },
    cancelButtonText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.editRoleMapping.confirmGroupChangeCancelButton",
      defaultMessage: "Cancel"
    }),
    confirmButtonText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.editRoleMapping.confirmGroupChangeConfirmButton",
      defaultMessage: "Change anyway"
    })
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.editRoleMapping.switchWithIncompatibleRulesMessage",
    defaultMessage: "This group contains rules that are not compatible with the new type. If you change types, you will lose all rules within this group."
  })))) : null;
  return _react.default.createElement("h3", null, ruleTypeSelector, confirmChangeModal);
};

exports.RuleGroupTitle = RuleGroupTitle;