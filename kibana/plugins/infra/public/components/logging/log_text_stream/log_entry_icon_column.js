"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryDetailsIconColumn = exports.LogEntryIconColumn = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _log_entry_column = require("./log_entry_column");

var _text_styles = require("./text_styles");

var _public = require("../../../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  overflow: hidden;\n  position: absolute;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n  overflow: hidden;\n  user-select: none;\n\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LogEntryIconColumn = function LogEntryIconColumn(_ref) {
  var children = _ref.children,
      isHighlighted = _ref.isHighlighted,
      isHovered = _ref.isHovered;
  return _react.default.createElement(IconColumnContent, {
    isHighlighted: isHighlighted,
    isHovered: isHovered
  }, children);
};

exports.LogEntryIconColumn = LogEntryIconColumn;

var LogEntryDetailsIconColumn = function LogEntryDetailsIconColumn(_ref2) {
  var isHighlighted = _ref2.isHighlighted,
      isHovered = _ref2.isHovered,
      openFlyout = _ref2.openFlyout;

  var label = _i18n.i18n.translate('xpack.infra.logEntryItemView.viewDetailsToolTip', {
    defaultMessage: 'View Details'
  });

  return _react.default.createElement(LogEntryIconColumn, {
    isHighlighted: isHighlighted,
    isHovered: isHovered
  }, isHovered ? _react.default.createElement(AbsoluteIconButtonWrapper, null, _react.default.createElement(_eui.EuiButtonIcon, {
    onClick: openFlyout,
    iconType: "expand",
    title: label,
    "aria-label": label
  })) : null);
};

exports.LogEntryDetailsIconColumn = LogEntryDetailsIconColumn;
var IconColumnContent = (0, _public.euiStyled)(_log_entry_column.LogEntryColumnContent)(_templateObject(), function (props) {
  return props.theme.eui.euiColorEmptyShade;
}, function (props) {
  return props.isHovered || props.isHighlighted ? _text_styles.hoveredContentStyle : '';
}); // this prevents the button from influencing the line height

var AbsoluteIconButtonWrapper = _public.euiStyled.div(_templateObject2());