"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTransformStats = isTransformStats;
exports.getTransformProgress = getTransformProgress;
exports.isCompletedBatchTransform = isCompletedBatchTransform;
exports.TRANSFORM_MODE = void 0;

var _common = require("../../../common");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var TRANSFORM_MODE;
exports.TRANSFORM_MODE = TRANSFORM_MODE;

(function (TRANSFORM_MODE) {
  TRANSFORM_MODE["BATCH"] = "batch";
  TRANSFORM_MODE["CONTINUOUS"] = "continuous";
})(TRANSFORM_MODE || (exports.TRANSFORM_MODE = TRANSFORM_MODE = {}));

function isTransformStats(arg) {
  return _typeof(arg) === 'object' && arg !== null && {}.hasOwnProperty.call(arg, 'state') && Object.values(_common.TRANSFORM_STATE).includes(arg.state);
}

function getTransformProgress(item) {
  var _item$stats, _item$stats$checkpoin, _item$stats$checkpoin2, _item$stats$checkpoin3;

  if (isCompletedBatchTransform(item)) {
    return 100;
  }

  var progress = item === null || item === void 0 ? void 0 : (_item$stats = item.stats) === null || _item$stats === void 0 ? void 0 : (_item$stats$checkpoin = _item$stats.checkpointing) === null || _item$stats$checkpoin === void 0 ? void 0 : (_item$stats$checkpoin2 = _item$stats$checkpoin.next) === null || _item$stats$checkpoin2 === void 0 ? void 0 : (_item$stats$checkpoin3 = _item$stats$checkpoin2.checkpoint_progress) === null || _item$stats$checkpoin3 === void 0 ? void 0 : _item$stats$checkpoin3.percent_complete;
  return progress !== undefined ? Math.round(progress) : undefined;
}

function isCompletedBatchTransform(item) {
  // If `checkpoint=1`, `sync` is missing from the config and state is stopped,
  // then this is a completed batch transform.
  return item.stats.checkpointing.last.checkpoint === 1 && item.config.sync === undefined && item.stats.state === _common.TRANSFORM_STATE.STOPPED;
}