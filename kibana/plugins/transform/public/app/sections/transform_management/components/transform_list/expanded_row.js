"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandedRow = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _date_utils = require("../../../../../../common/utils/date_utils");

var _expanded_row_details_pane = require("./expanded_row_details_pane");

var _expanded_row_json_pane = require("./expanded_row_json_pane");

var _expanded_row_messages_pane = require("./expanded_row_messages_pane");

var _expanded_row_preview_pane = require("./expanded_row_preview_pane");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getItemDescription(value) {
  if (_typeof(value) === 'object') {
    return JSON.stringify(value);
  }

  return value.toString();
}

var ExpandedRow = function ExpandedRow(_ref) {
  var item = _ref.item;

  var stateValues = _objectSpread({}, item.stats);

  delete stateValues.stats;
  delete stateValues.checkpointing;
  var stateItems = [];
  stateItems.push({
    title: 'ID',
    description: item.id
  }, {
    title: 'state',
    description: item.stats.state
  });

  if (item.stats.node !== undefined) {
    stateItems.push({
      title: 'node.name',
      description: item.stats.node.name
    });
  }

  var state = {
    title: 'State',
    items: stateItems,
    position: 'left'
  };
  var checkpointingItems = [];

  if (item.stats.checkpointing.last !== undefined) {
    checkpointingItems.push({
      title: 'last.checkpoint',
      description: item.stats.checkpointing.last.checkpoint
    });

    if (item.stats.checkpointing.last.timestamp_millis !== undefined) {
      checkpointingItems.push({
        title: 'last.timestamp',
        description: (0, _date_utils.formatHumanReadableDateTimeSeconds)(item.stats.checkpointing.last.timestamp_millis)
      });
      checkpointingItems.push({
        title: 'last.timestamp_millis',
        description: item.stats.checkpointing.last.timestamp_millis
      });
    }
  }

  if (item.stats.checkpointing.next !== undefined) {
    checkpointingItems.push({
      title: 'next.checkpoint',
      description: item.stats.checkpointing.next.checkpoint
    });

    if (item.stats.checkpointing.next.checkpoint_progress !== undefined) {
      checkpointingItems.push({
        title: 'next.checkpoint_progress.total_docs',
        description: item.stats.checkpointing.next.checkpoint_progress.total_docs
      });
      checkpointingItems.push({
        title: 'next.checkpoint_progress.docs_remaining',
        description: item.stats.checkpointing.next.checkpoint_progress.docs_remaining
      });
      checkpointingItems.push({
        title: 'next.checkpoint_progress.percent_complete',
        description: item.stats.checkpointing.next.checkpoint_progress.percent_complete
      });
    }
  }

  var checkpointing = {
    title: 'Checkpointing',
    items: checkpointingItems,
    position: 'left'
  };
  var stats = {
    title: 'Stats',
    items: Object.entries(item.stats.stats).map(function (s) {
      return {
        title: s[0].toString(),
        description: getItemDescription(s[1])
      };
    }),
    position: 'right'
  };
  var tabs = [{
    id: "transform-details-tab-".concat(item.id),
    'data-test-subj': 'transformDetailsTab',
    name: _i18n.i18n.translate('xpack.transform.transformList.transformDetails.tabs.transformSettingsLabel', {
      defaultMessage: 'Transform details'
    }),
    content: _react.default.createElement(_expanded_row_details_pane.ExpandedRowDetailsPane, {
      sections: [state, checkpointing, stats]
    })
  }, {
    id: "transform-json-tab-".concat(item.id),
    'data-test-subj': 'transformJsonTab',
    name: 'JSON',
    content: _react.default.createElement(_expanded_row_json_pane.ExpandedRowJsonPane, {
      json: item.config
    })
  }, {
    id: "transform-messages-tab-".concat(item.id),
    'data-test-subj': 'transformMessagesTab',
    name: _i18n.i18n.translate('xpack.transform.transformList.transformDetails.tabs.transformMessagesLabel', {
      defaultMessage: 'Messages'
    }),
    content: _react.default.createElement(_expanded_row_messages_pane.ExpandedRowMessagesPane, {
      transformId: item.id
    })
  }, {
    id: "transform-preview-tab-".concat(item.id),
    'data-test-subj': 'transformPreviewTab',
    name: _i18n.i18n.translate('xpack.transform.transformList.transformDetails.tabs.transformPreviewLabel', {
      defaultMessage: 'Preview'
    }),
    content: _react.default.createElement(_expanded_row_preview_pane.ExpandedRowPreviewPane, {
      transformConfig: item.config
    })
  }]; // Using `expand=false` here so the tabs themselves don't spread
  // across the full width. The 100% width is used so the bottom line
  // as well as the tab content spans across the full width,
  // even if the tab content wouldn't extend to the full width.

  return _react.default.createElement(_eui.EuiTabbedContent, {
    size: "s",
    tabs: tabs,
    initialSelectedTab: tabs[0],
    onTabClick: function onTabClick() {},
    expand: false,
    style: {
      width: '100%'
    }
  });
};

exports.ExpandedRow = ExpandedRow;