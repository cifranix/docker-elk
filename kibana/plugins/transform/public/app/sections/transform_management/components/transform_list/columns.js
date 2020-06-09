"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumns = exports.getTaskStateBadge = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _common = require("../../../../../../common");

var _common2 = require("../../../../common");

var _actions = require("./actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var STATE_COLOR;

(function (STATE_COLOR) {
  STATE_COLOR["aborting"] = "warning";
  STATE_COLOR["failed"] = "danger";
  STATE_COLOR["indexing"] = "primary";
  STATE_COLOR["started"] = "primary";
  STATE_COLOR["stopped"] = "hollow";
  STATE_COLOR["stopping"] = "hollow";
})(STATE_COLOR || (STATE_COLOR = {}));

var getTaskStateBadge = function getTaskStateBadge(state, reason) {
  var color = STATE_COLOR[state];

  if (state === _common.TRANSFORM_STATE.FAILED && reason !== undefined) {
    return _react.default.createElement(_eui.EuiToolTip, {
      content: reason
    }, _react.default.createElement(_eui.EuiBadge, {
      className: "transform__TaskStateBadge",
      color: color
    }, state));
  }

  return _react.default.createElement(_eui.EuiBadge, {
    className: "transform__TaskStateBadge",
    color: color
  }, state);
};

exports.getTaskStateBadge = getTaskStateBadge;

var getColumns = function getColumns(expandedRowItemIds, setExpandedRowItemIds, transformSelection) {
  var actions = (0, _actions.getActions)({
    forceDisable: transformSelection.length > 0
  });

  function toggleDetails(item) {
    var index = expandedRowItemIds.indexOf(item.config.id);

    if (index !== -1) {
      expandedRowItemIds.splice(index, 1);
      setExpandedRowItemIds(_toConsumableArray(expandedRowItemIds));
    } else {
      expandedRowItemIds.push(item.config.id);
    } // spread to a new array otherwise the component wouldn't re-render


    setExpandedRowItemIds(_toConsumableArray(expandedRowItemIds));
  }

  var columns = [{
    name: _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.transform.transformList.showDetailsColumn.screenReaderDescription",
      defaultMessage: "This column contains clickable controls for showing more details on each transform"
    }))),
    align: _eui.RIGHT_ALIGNMENT,
    width: '40px',
    isExpander: true,
    render: function render(item) {
      return _react.default.createElement(_eui.EuiButtonIcon, {
        onClick: function onClick() {
          return toggleDetails(item);
        },
        "aria-label": expandedRowItemIds.includes(item.config.id) ? _i18n.i18n.translate('xpack.transform.transformList.rowCollapse', {
          defaultMessage: 'Hide details for {transformId}',
          values: {
            transformId: item.config.id
          }
        }) : _i18n.i18n.translate('xpack.transform.transformList.rowExpand', {
          defaultMessage: 'Show details for {transformId}',
          values: {
            transformId: item.config.id
          }
        }),
        iconType: expandedRowItemIds.includes(item.config.id) ? 'arrowUp' : 'arrowDown',
        "data-test-subj": "transformListRowDetailsToggle"
      });
    }
  }, {
    field: _common2.TRANSFORM_LIST_COLUMN.ID,
    'data-test-subj': 'transformListColumnId',
    name: 'ID',
    sortable: true,
    truncateText: true,
    scope: 'row'
  }, {
    field: _common2.TRANSFORM_LIST_COLUMN.DESCRIPTION,
    'data-test-subj': 'transformListColumnDescription',
    name: _i18n.i18n.translate('xpack.transform.description', {
      defaultMessage: 'Description'
    }),
    sortable: true,
    truncateText: true
  }, {
    field: _common2.TRANSFORM_LIST_COLUMN.CONFIG_SOURCE_INDEX,
    'data-test-subj': 'transformListColumnSourceIndex',
    name: _i18n.i18n.translate('xpack.transform.sourceIndex', {
      defaultMessage: 'Source index'
    }),
    sortable: true,
    truncateText: true
  }, {
    field: _common2.TRANSFORM_LIST_COLUMN.CONFIG_DEST_INDEX,
    'data-test-subj': 'transformListColumnDestinationIndex',
    name: _i18n.i18n.translate('xpack.transform.destinationIndex', {
      defaultMessage: 'Destination index'
    }),
    sortable: true,
    truncateText: true
  }, {
    name: _i18n.i18n.translate('xpack.transform.status', {
      defaultMessage: 'Status'
    }),
    'data-test-subj': 'transformListColumnStatus',
    sortable: function sortable(item) {
      return item.stats.state;
    },
    truncateText: true,
    render: function render(item) {
      return getTaskStateBadge(item.stats.state, item.stats.reason);
    },
    width: '100px'
  }, {
    name: _i18n.i18n.translate('xpack.transform.mode', {
      defaultMessage: 'Mode'
    }),
    'data-test-subj': 'transformListColumnMode',
    sortable: function sortable(item) {
      return item.mode;
    },
    truncateText: true,
    render: function render(item) {
      var mode = item.mode;
      var color = 'hollow';
      return _react.default.createElement(_eui.EuiBadge, {
        color: color
      }, mode);
    },
    width: '100px'
  }, {
    name: _i18n.i18n.translate('xpack.transform.progress', {
      defaultMessage: 'Progress'
    }),
    'data-test-subj': 'transformListColumnProgress',
    sortable: function sortable(item) {
      return (0, _common2.getTransformProgress)(item) || 0;
    },
    truncateText: true,
    render: function render(item) {
      var progress = (0, _common2.getTransformProgress)(item);
      var isBatchTransform = typeof item.config.sync === 'undefined';

      if (progress === undefined && isBatchTransform === true) {
        return null;
      }

      return _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        gutterSize: "xs"
      }, isBatchTransform && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
        style: {
          width: '40px'
        },
        grow: false
      }, _react.default.createElement(_eui.EuiProgress, {
        value: progress,
        max: 100,
        color: "primary",
        size: "m",
        "data-test-subj": "transformListProgress"
      }, progress, "%")), _react.default.createElement(_eui.EuiFlexItem, {
        style: {
          width: '35px'
        },
        grow: false
      }, _react.default.createElement(_eui.EuiText, {
        size: "xs"
      }, "".concat(progress, "%")))), !isBatchTransform && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
        style: {
          width: '40px'
        },
        grow: false
      }, item.stats.state !== _common.TRANSFORM_STATE.STOPPED && item.stats.state !== _common.TRANSFORM_STATE.FAILED && _react.default.createElement(_eui.EuiProgress, {
        color: "primary",
        size: "m"
      }), (item.stats.state === _common.TRANSFORM_STATE.STOPPED || item.stats.state === _common.TRANSFORM_STATE.FAILED) && _react.default.createElement(_eui.EuiProgress, {
        value: 0,
        max: 100,
        color: "primary",
        size: "m"
      })), _react.default.createElement(_eui.EuiFlexItem, {
        style: {
          width: '35px'
        },
        grow: false
      }, "\xA0")));
    },
    width: '100px'
  }, {
    name: _i18n.i18n.translate('xpack.transform.tableActionLabel', {
      defaultMessage: 'Actions'
    }),
    actions: actions,
    width: '200px'
  }];
  return columns;
};

exports.getColumns = getColumns;