"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddLogColumnButtonAndPopover = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _uuid = require("uuid");

var _use_visibility_state = require("../../utils/use_visibility_state");

var _public = require("../../../../observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 400px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var AddLogColumnButtonAndPopover = function AddLogColumnButtonAndPopover(_ref) {
  var addLogColumn = _ref.addLogColumn,
      availableFields = _ref.availableFields,
      isDisabled = _ref.isDisabled;

  var _useVisibilityState = (0, _use_visibility_state.useVisibilityState)(false),
      isOpen = _useVisibilityState.isVisible,
      openPopover = _useVisibilityState.show,
      closePopover = _useVisibilityState.hide;

  var availableColumnOptions = (0, _react2.useMemo)(function () {
    return [{
      optionProps: {
        append: _react2.default.createElement(SystemColumnBadge, null),
        'data-test-subj': 'addTimestampLogColumn',
        // this key works around EuiSelectable using a lowercased label as
        // key, which leads to conflicts with field names
        key: 'timestamp',
        label: 'Timestamp'
      },
      columnConfiguration: {
        timestampColumn: {
          id: (0, _uuid.v4)()
        }
      }
    }, {
      optionProps: {
        'data-test-subj': 'addMessageLogColumn',
        append: _react2.default.createElement(SystemColumnBadge, null),
        // this key works around EuiSelectable using a lowercased label as
        // key, which leads to conflicts with field names
        key: 'message',
        label: 'Message'
      },
      columnConfiguration: {
        messageColumn: {
          id: (0, _uuid.v4)()
        }
      }
    }].concat(_toConsumableArray(availableFields.map(function (field) {
      return {
        optionProps: {
          'data-test-subj': "addFieldLogColumn addFieldLogColumn:".concat(field),
          // this key works around EuiSelectable using a lowercased label as
          // key, which leads to conflicts with fields that only differ in the
          // case (e.g. the metricbeat mongodb module)
          key: "field-".concat(field),
          label: field
        },
        columnConfiguration: {
          fieldColumn: {
            id: (0, _uuid.v4)(),
            field: field
          }
        }
      };
    })));
  }, [availableFields]);
  var availableOptions = (0, _react2.useMemo)(function () {
    return availableColumnOptions.map(function (availableColumnOption) {
      return availableColumnOption.optionProps;
    });
  }, [availableColumnOptions]);
  var handleColumnSelection = (0, _react2.useCallback)(function (selectedOptions) {
    closePopover();
    var selectedOptionIndex = selectedOptions.findIndex(function (selectedOption) {
      return selectedOption.checked === 'on';
    });
    var selectedOption = availableColumnOptions[selectedOptionIndex];
    addLogColumn(selectedOption.columnConfiguration);
  }, [addLogColumn, availableColumnOptions, closePopover]);
  return _react2.default.createElement(_eui.EuiPopover, {
    anchorPosition: "downRight",
    button: _react2.default.createElement(_eui.EuiButton, {
      "data-test-subj": "addLogColumnButton",
      isDisabled: isDisabled,
      iconType: "plusInCircle",
      onClick: openPopover
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.addLogColumnButtonLabel",
      defaultMessage: "Add column"
    })),
    closePopover: closePopover,
    id: "addLogColumn",
    isOpen: isOpen,
    ownFocus: true,
    panelPaddingSize: "none"
  }, _react2.default.createElement(_eui.EuiSelectable, {
    height: 600,
    listProps: selectableListProps,
    onChange: handleColumnSelection,
    options: availableOptions,
    searchable: true,
    searchProps: searchProps,
    singleSelection: true
  }, function (list, search) {
    return _react2.default.createElement(SelectableContent, {
      "data-test-subj": "addLogColumnPopover"
    }, _react2.default.createElement(_eui.EuiPopoverTitle, null, search), list);
  }));
};

exports.AddLogColumnButtonAndPopover = AddLogColumnButtonAndPopover;
var searchProps = {
  'data-test-subj': 'fieldSearchInput'
};
var selectableListProps = {
  showIcons: false
};

var SystemColumnBadge = function SystemColumnBadge() {
  return _react2.default.createElement(_eui.EuiBadge, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.sourceConfiguration.systemColumnBadgeLabel",
    defaultMessage: "System"
  }));
};

var SelectableContent = _public.euiStyled.div(_templateObject());