"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShardDetails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _utils = require("../../../utils");

var _shard_details_tree = require("./shard_details_tree");

var _percentage_badge = require("../../percentage_badge");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var hasVisibleOperation = function hasVisibleOperation(ops) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ops[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _op$children;

      var op = _step.value;

      if (op.visible) {
        return true;
      }

      if (((_op$children = op.children) === null || _op$children === void 0 ? void 0 : _op$children.length) && hasVisibleOperation(op.children)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
};

var ShardDetails = function ShardDetails(_ref) {
  var index = _ref.index,
      shard = _ref.shard,
      operations = _ref.operations;
  var relative = shard.relative,
      time = shard.time;

  var _useState = (0, _react.useState)(function () {
    return hasVisibleOperation(operations.map(function (op) {
      var _op$treeRoot;

      return (_op$treeRoot = op.treeRoot) !== null && _op$treeRoot !== void 0 ? _op$treeRoot : op;
    }));
  }),
      _useState2 = _slicedToArray(_useState, 2),
      shardVisibility = _useState2[0],
      setShardVisibility = _useState2[1];

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    gutterSize: "none",
    direction: "row"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "prfDevTool__profileTree__shard__header-flex-item"
  }, _react.default.createElement(_eui.EuiLink, {
    className: "prfDevTool__profileTree__shardDetails",
    onClick: function onClick() {
      return setShardVisibility(!shardVisibility);
    }
  }, _react.default.createElement(_eui.EuiIcon, {
    type: shardVisibility ? 'arrowDown' : 'arrowRight'
  }), "[", shard.id[0], "][", shard.id[2], "]")), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "prfDevTool__profileTree__shard__header-flex-item"
  }, _react.default.createElement(_eui.EuiText, {
    className: "prfDevTool__shardDetails--dim"
  }, _react.default.createElement(_percentage_badge.PercentageBadge, {
    timePercentage: String(relative),
    label: (0, _utils.msToPretty)(time, 3),
    valueType: 'time'
  })))), shardVisibility ? operations.map(function (data, idx) {
    return _react.default.createElement(_shard_details_tree.ShardDetailTree, {
      key: idx,
      index: index,
      shard: shard,
      data: data
    });
  }) : null);
};

exports.ShardDetails = ShardDetails;