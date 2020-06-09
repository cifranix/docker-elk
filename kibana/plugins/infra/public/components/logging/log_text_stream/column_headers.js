"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogColumnHeaders = void 0;

var _react = _interopRequireWildcard(require("react"));

var _polished = require("polished");

var _public = require("../../../../../observability/public");

var _source_configuration = require("../../../utils/source_configuration");

var _log_entry_column = require("./log_entry_column");

var _vertical_scroll_panel = require("./vertical_scroll_panel");

var _log_position = require("../../../containers/logs/log_position");

var _datetime = require("../../../utils/formatters/datetime");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  font-size: ", ";\n  font-weight: ", ";\n  line-height: ", ";\n  text-overflow: clip;\n  white-space: pre;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n  height: 32px;\n  overflow: hidden;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  align-items: stretch;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: flex-start;\n  overflow: hidden;\n  padding-right: ", "px;\n  border-bottom: ", ";\n  box-shadow: 0 2px 2px -1px ", ";\n  position: relative;\n  z-index: 1;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var LogColumnHeaders = function LogColumnHeaders(_ref) {
  var columnConfigurations = _ref.columnConfigurations,
      columnWidths = _ref.columnWidths;

  var _useContext = (0, _react.useContext)(_log_position.LogPositionState.Context),
      firstVisiblePosition = _useContext.firstVisiblePosition;

  return _react.default.createElement(LogColumnHeadersWrapper, null, columnConfigurations.map(function (columnConfiguration) {
    if ((0, _source_configuration.isTimestampLogColumnConfiguration)(columnConfiguration)) {
      return _react.default.createElement(LogColumnHeader, {
        key: columnConfiguration.timestampColumn.id,
        columnWidth: columnWidths[columnConfiguration.timestampColumn.id],
        "data-test-subj": "logColumnHeader timestampLogColumnHeader"
      }, firstVisiblePosition ? (0, _datetime.localizedDate)(firstVisiblePosition.time) : 'Timestamp');
    } else if ((0, _source_configuration.isMessageLogColumnConfiguration)(columnConfiguration)) {
      return _react.default.createElement(LogColumnHeader, {
        columnWidth: columnWidths[columnConfiguration.messageColumn.id],
        "data-test-subj": "logColumnHeader messageLogColumnHeader",
        key: columnConfiguration.messageColumn.id
      }, "Message");
    } else if ((0, _source_configuration.isFieldLogColumnConfiguration)(columnConfiguration)) {
      return _react.default.createElement(LogColumnHeader, {
        columnWidth: columnWidths[columnConfiguration.fieldColumn.id],
        "data-test-subj": "logColumnHeader fieldLogColumnHeader",
        key: columnConfiguration.fieldColumn.id
      }, columnConfiguration.fieldColumn.field);
    }
  }));
};

exports.LogColumnHeaders = LogColumnHeaders;

var LogColumnHeader = function LogColumnHeader(_ref2) {
  var children = _ref2.children,
      columnWidth = _ref2.columnWidth,
      dataTestSubj = _ref2['data-test-subj'];
  return _react.default.createElement(LogColumnHeaderWrapper, _extends({
    "data-test-subj": dataTestSubj
  }, columnWidth), _react.default.createElement(LogColumnHeaderContent, null, children));
};

var LogColumnHeadersWrapper = _public.euiStyled.div.attrs(function () {
  return {
    role: 'row'
  };
})(_templateObject(), _vertical_scroll_panel.ASSUMED_SCROLLBAR_WIDTH, function (props) {
  return props.theme.eui.euiBorderThin;
}, function (props) {
  return (0, _polished.transparentize)(0.3, props.theme.eui.euiColorLightShade);
});

var LogColumnHeaderWrapper = (0, _public.euiStyled)(_log_entry_column.LogEntryColumn).attrs(function () {
  return {
    role: 'columnheader'
  };
})(_templateObject2());
var LogColumnHeaderContent = (0, _public.euiStyled)(_log_entry_column.LogEntryColumnContent)(_templateObject3(), function (props) {
  return props.theme.eui.euiTitleColor;
}, function (props) {
  return props.theme.eui.euiFontSizeS;
}, function (props) {
  return props.theme.eui.euiFontWeightSemiBold;
}, function (props) {
  return props.theme.eui.euiLineHeight;
});