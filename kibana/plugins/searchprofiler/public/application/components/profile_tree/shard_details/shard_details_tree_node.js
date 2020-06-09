"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShardDetailsTreeNode = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _utils = require("../utils");

var _use_highlight_tree_node = require("../use_highlight_tree_node");

var _utils2 = require("../../../utils");

var _percentage_badge = require("../../percentage_badge");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TAB_WIDTH_PX = 32;

var limitString = function limitString(string, limit) {
  return "".concat(string.slice(0, limit)).concat(string.length > limit ? '...' : '');
};
/**
 * This component recursively renders a tree
 */


var ShardDetailsTreeNode = function ShardDetailsTreeNode(_ref) {
  var operation = _ref.operation,
      index = _ref.index,
      shard = _ref.shard;

  var _useState = (0, _react.useState)((0, _utils.hasVisibleChild)(operation)),
      _useState2 = _slicedToArray(_useState, 2),
      childrenVisible = _useState2[0],
      setChildrenVisible = _useState2[1];

  var _useHighlightTreeNode = (0, _use_highlight_tree_node.useHighlightTreeNode)(),
      highlight = _useHighlightTreeNode.highlight,
      isHighlighted = _useHighlightTreeNode.isHighlighted,
      id = _useHighlightTreeNode.id;

  var renderTimeRow = function renderTimeRow(op) {
    return _react.default.createElement("div", {
      className: "prfDevTool__profileTree__tvRow"
    }, _react.default.createElement("div", {
      className: "prfDevTool__profileTree__cell euiTextAlign--left"
    }, op.hasChildren ? _react.default.createElement(_eui.EuiLink, {
      className: "prfDevTool__profileTree__shardDetails",
      disabled: !op.hasChildren,
      onClick: function onClick() {
        return setChildrenVisible(!childrenVisible);
      }
    }, _react.default.createElement(_eui.EuiIcon, {
      type: childrenVisible ? 'arrowDown' : 'arrowRight'
    }), ' ' + op.query_type) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiIcon, {
      type: "dot"
    }), ' ' + op.query_type)), _react.default.createElement("div", {
      className: "prfDevTool__profileTree__cell prfDevTool__profileTree__time euiTextAlign--center"
    }, _react.default.createElement(_eui.EuiBadge, {
      className: "prfDevTool__profileTree__badge euiTextAlign--center",
      style: {
        backgroundColor: op.absoluteColor
      }
    }, (0, _utils2.msToPretty)(op.selfTime || 0, 1))), _react.default.createElement("div", {
      className: "prfDevTool__profileTree__cell prfDevTool__profileTree__totalTime"
    }, _react.default.createElement(_eui.EuiBadge, {
      className: "prfDevTool__profileTree__badge euiTextAlign--center",
      style: {
        backgroundColor: op.absoluteColor
      }
    }, (0, _utils2.msToPretty)(op.time, 1))), _react.default.createElement("div", {
      className: "prfDevTool__profileTree__cell prfDevTool__profileTree__percentage"
    }, _react.default.createElement(_percentage_badge.PercentageBadge, {
      timePercentage: op.timePercentage,
      label: op.timePercentage + '%'
    })));
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    key: id,
    className: isHighlighted() ? 'prfDevTool__tvRow--last' : '',
    style: {
      paddingLeft: operation.depth * TAB_WIDTH_PX + 'px'
    }
  }, renderTimeRow(operation), _react.default.createElement("div", {
    className: "prfDevTool__profileTree__tvRow"
  }, _react.default.createElement("span", {
    className: "prfDevTool__detail"
  }, _react.default.createElement(_eui.EuiCodeBlock, {
    paddingSize: "none"
  }, limitString(operation.lucene || '', 120)), _react.default.createElement(_eui.EuiLink, {
    type: "button",
    onClick: function onClick() {
      return highlight({
        indexName: index.name,
        operation: operation,
        shard: shard
      });
    }
  }, _i18n.i18n.translate('xpack.searchProfiler.profileTree.body.viewDetailsLabel', {
    defaultMessage: 'View details'
  }))))), childrenVisible && operation.hasChildren && operation.children.map(function (childOp, idx) {
    return _react.default.createElement(ShardDetailsTreeNode, {
      key: idx,
      operation: childOp,
      index: index,
      shard: shard
    });
  }));
};

exports.ShardDetailsTreeNode = ShardDetailsTreeNode;