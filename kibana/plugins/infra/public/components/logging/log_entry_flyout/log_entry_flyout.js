"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraFlyoutLoadingPanel = exports.LogEntryFlyout = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _moment = _interopRequireDefault(require("moment"));

var _react2 = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

var _loading = require("../../loading");

var _log_entry_actions_menu = require("./log_entry_actions_menu");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LogEntryFlyout = function LogEntryFlyout(_ref) {
  var flyoutItem = _ref.flyoutItem,
      loading = _ref.loading,
      setFlyoutVisibility = _ref.setFlyoutVisibility,
      setFilter = _ref.setFilter,
      setTarget = _ref.setTarget;
  var createFilterHandler = (0, _react2.useCallback)(function (field) {
    return function () {
      var filter = "".concat(field.field, ":\"").concat(field.value, "\"");
      setFilter(filter);

      if (flyoutItem && flyoutItem.key) {
        var timestampMoment = (0, _moment.default)(flyoutItem.key.time);

        if (timestampMoment.isValid()) {
          setTarget({
            time: timestampMoment.valueOf(),
            tiebreaker: flyoutItem.key.tiebreaker
          }, flyoutItem.id);
        }
      }
    };
  }, [flyoutItem, setFilter, setTarget]);
  var closeFlyout = (0, _react2.useCallback)(function () {
    return setFlyoutVisibility(false);
  }, [setFlyoutVisibility]);
  var columns = (0, _react2.useMemo)(function () {
    return [{
      field: 'field',
      name: _i18n.i18n.translate('xpack.infra.logFlyout.fieldColumnLabel', {
        defaultMessage: 'Field'
      }),
      sortable: true
    }, {
      field: 'value',
      name: _i18n.i18n.translate('xpack.infra.logFlyout.valueColumnLabel', {
        defaultMessage: 'Value'
      }),
      sortable: true,
      render: function render(_name, item) {
        return _react2.default.createElement("span", null, _react2.default.createElement(_eui.EuiToolTip, {
          content: _i18n.i18n.translate('xpack.infra.logFlyout.setFilterTooltip', {
            defaultMessage: 'View event with filter'
          })
        }, _react2.default.createElement(_eui.EuiButtonIcon, {
          color: "text",
          iconType: "filter",
          "aria-label": _i18n.i18n.translate('xpack.infra.logFlyout.filterAriaLabel', {
            defaultMessage: 'Filter'
          }),
          onClick: createFilterHandler(item)
        })), item.value);
      }
    }];
  }, [createFilterHandler]);
  return _react2.default.createElement(_eui.EuiFlyout, {
    onClose: closeFlyout,
    size: "m"
  }, _react2.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react2.default.createElement("h3", {
    id: "flyoutTitle"
  }, _react2.default.createElement(_react.FormattedMessage, {
    defaultMessage: "Log event document details",
    id: "xpack.infra.logFlyout.flyoutTitle"
  })))), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, flyoutItem !== null ? _react2.default.createElement(_log_entry_actions_menu.LogEntryActionsMenu, {
    logItem: flyoutItem
  }) : null))), _react2.default.createElement(_eui.EuiFlyoutBody, null, loading || flyoutItem === null ? _react2.default.createElement(InfraFlyoutLoadingPanel, null, _react2.default.createElement(_loading.InfraLoadingPanel, {
    height: "100%",
    width: "100%",
    text: _i18n.i18n.translate('xpack.infra.logFlyout.loadingMessage', {
      defaultMessage: 'Loading Event'
    })
  })) : _react2.default.createElement(_eui.EuiBasicTable, {
    columns: columns,
    items: flyoutItem.fields
  })));
};

exports.LogEntryFlyout = LogEntryFlyout;

var InfraFlyoutLoadingPanel = _public.euiStyled.div(_templateObject());

exports.InfraFlyoutLoadingPanel = InfraFlyoutLoadingPanel;