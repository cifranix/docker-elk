"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogColumnsConfigurationPanel = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _add_log_column_popover = require("./add_log_column_popover");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var LogColumnsConfigurationPanel = function LogColumnsConfigurationPanel(_ref) {
  var addLogColumn = _ref.addLogColumn,
      moveLogColumn = _ref.moveLogColumn,
      availableFields = _ref.availableFields,
      isLoading = _ref.isLoading,
      logColumnConfiguration = _ref.logColumnConfiguration;
  var onDragEnd = (0, _react2.useCallback)(function (_ref2) {
    var source = _ref2.source,
        destination = _ref2.destination;
    return destination && moveLogColumn(source.index, destination.index);
  }, [moveLogColumn]);
  return _react2.default.createElement(_eui.EuiForm, null, _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiTitle, {
    size: "s",
    "data-test-subj": "sourceConfigurationLogColumnsSectionTitle"
  }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.sourceConfiguration.logColumnsSectionTitle",
    defaultMessage: "Log Columns"
  })))), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_add_log_column_popover.AddLogColumnButtonAndPopover, {
    addLogColumn: addLogColumn,
    availableFields: availableFields,
    isDisabled: isLoading
  }))), logColumnConfiguration.length > 0 ? _react2.default.createElement(_eui.EuiDragDropContext, {
    onDragEnd: onDragEnd
  }, _react2.default.createElement(_eui.EuiDroppable, {
    droppableId: "COLUMN_CONFIG_DROPPABLE_AREA"
  }, _react2.default.createElement(_react2.default.Fragment, null, logColumnConfiguration.map(function (column, index) {
    return _react2.default.createElement(_eui.EuiDraggable, {
      key: "logColumnConfigurationPanel-".concat(column.logColumnConfiguration.id),
      index: index,
      draggableId: column.logColumnConfiguration.id,
      customDragHandle: true
    }, function (provided) {
      return _react2.default.createElement(LogColumnConfigurationPanel, {
        dragHandleProps: provided.dragHandleProps,
        logColumnConfigurationProps: column
      });
    });
  })))) : _react2.default.createElement(LogColumnConfigurationEmptyPrompt, null));
};

exports.LogColumnsConfigurationPanel = LogColumnsConfigurationPanel;

var LogColumnConfigurationPanel = function LogColumnConfigurationPanel(props) {
  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), props.logColumnConfigurationProps.type === 'timestamp' ? _react2.default.createElement(TimestampLogColumnConfigurationPanel, props) : props.logColumnConfigurationProps.type === 'message' ? _react2.default.createElement(MessageLogColumnConfigurationPanel, props) : _react2.default.createElement(FieldLogColumnConfigurationPanel, {
    logColumnConfigurationProps: props.logColumnConfigurationProps,
    dragHandleProps: props.dragHandleProps
  }));
};

var TimestampLogColumnConfigurationPanel = function TimestampLogColumnConfigurationPanel(_ref3) {
  var logColumnConfigurationProps = _ref3.logColumnConfigurationProps,
      dragHandleProps = _ref3.dragHandleProps;
  return _react2.default.createElement(ExplainedLogColumnConfigurationPanel, {
    fieldName: "Timestamp",
    helpText: _react2.default.createElement(_react.FormattedMessage, {
      tagName: "span",
      id: "xpack.infra.sourceConfiguration.timestampLogColumnDescription",
      defaultMessage: "This system field shows the log entry's time as determined by the {timestampSetting} field setting.",
      values: {
        timestampSetting: _react2.default.createElement("code", null, "timestamp")
      }
    }),
    removeColumn: logColumnConfigurationProps.remove,
    dragHandleProps: dragHandleProps
  });
};

var MessageLogColumnConfigurationPanel = function MessageLogColumnConfigurationPanel(_ref4) {
  var logColumnConfigurationProps = _ref4.logColumnConfigurationProps,
      dragHandleProps = _ref4.dragHandleProps;
  return _react2.default.createElement(ExplainedLogColumnConfigurationPanel, {
    fieldName: "Message",
    helpText: _react2.default.createElement(_react.FormattedMessage, {
      tagName: "span",
      id: "xpack.infra.sourceConfiguration.messageLogColumnDescription",
      defaultMessage: "This system field shows the log entry message as derived from the document fields."
    }),
    removeColumn: logColumnConfigurationProps.remove,
    dragHandleProps: dragHandleProps
  });
};

var FieldLogColumnConfigurationPanel = function FieldLogColumnConfigurationPanel(_ref5) {
  var _ref5$logColumnConfig = _ref5.logColumnConfigurationProps,
      field = _ref5$logColumnConfig.logColumnConfiguration.field,
      remove = _ref5$logColumnConfig.remove,
      dragHandleProps = _ref5.dragHandleProps;

  var fieldLogColumnTitle = _i18n.i18n.translate('xpack.infra.sourceConfiguration.fieldLogColumnTitle', {
    defaultMessage: 'Field'
  });

  return _react2.default.createElement(_eui.EuiPanel, {
    "data-test-subj": "logColumnPanel fieldLogColumnPanel fieldLogColumnPanel:".concat(field)
  }, _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement("div", _extends({
    "data-test-subj": "moveLogColumnHandle"
  }, dragHandleProps), _react2.default.createElement(_eui.EuiIcon, {
    type: "grab"
  }))), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, fieldLogColumnTitle), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: 3
  }, _react2.default.createElement("code", null, field)), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(RemoveLogColumnButton, {
    onClick: remove,
    columnDescription: "".concat(fieldLogColumnTitle, " - ").concat(field)
  }))));
};

var ExplainedLogColumnConfigurationPanel = function ExplainedLogColumnConfigurationPanel(_ref6) {
  var fieldName = _ref6.fieldName,
      helpText = _ref6.helpText,
      removeColumn = _ref6.removeColumn,
      dragHandleProps = _ref6.dragHandleProps;
  return _react2.default.createElement(_eui.EuiPanel, {
    "data-test-subj": "logColumnPanel systemLogColumnPanel systemLogColumnPanel:".concat(fieldName)
  }, _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement("div", _extends({
    "data-test-subj": "moveLogColumnHandle"
  }, dragHandleProps), _react2.default.createElement(_eui.EuiIcon, {
    type: "grab"
  }))), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, fieldName), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: 3
  }, _react2.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, helpText)), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(RemoveLogColumnButton, {
    onClick: removeColumn,
    columnDescription: String(fieldName)
  }))));
};

var RemoveLogColumnButton = function RemoveLogColumnButton(_ref7) {
  var onClick = _ref7.onClick,
      columnDescription = _ref7.columnDescription;

  var removeColumnLabel = _i18n.i18n.translate('xpack.infra.sourceConfiguration.removeLogColumnButtonLabel', {
    defaultMessage: 'Remove {columnDescription} column',
    values: {
      columnDescription: columnDescription
    }
  });

  return _react2.default.createElement(_eui.EuiButtonIcon, {
    color: "danger",
    "data-test-subj": "removeLogColumnButton",
    iconType: "trash",
    onClick: onClick,
    title: removeColumnLabel,
    "aria-label": removeColumnLabel
  });
};

var LogColumnConfigurationEmptyPrompt = function LogColumnConfigurationEmptyPrompt() {
  return _react2.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "list",
    title: _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.noLogColumnsTitle",
      defaultMessage: "No columns"
    })),
    body: _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.noLogColumnsDescription",
      defaultMessage: "Add a column to this list using the button above."
    }))
  });
};