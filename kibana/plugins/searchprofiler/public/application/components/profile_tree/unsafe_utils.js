"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeInMilliseconds = timeInMilliseconds;
exports.calcTimes = calcTimes;
exports.normalizeBreakdown = normalizeBreakdown;
exports.normalizeIndices = normalizeIndices;
exports.normalizeTime = normalizeTime;
exports.initTree = initTree;
exports.sortIndices = exports.comparator = void 0;

var _i18n = require("@kbn/i18n");

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

var _lodash = _interopRequireDefault(require("lodash"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var comparator = function comparator(v1, v2) {
  if (v1 < v2) {
    return 1;
  }

  return v1 > v2 ? -1 : 0;
};

exports.comparator = comparator;

function getToolTip(key) {
  switch (key) {
    case 'build_scorer':
      return _i18n.i18n.translate('xpack.searchProfiler.buildScorerTimeDescription', {
        defaultMessage: 'The time taken to create the Scoring object, which is later used to execute the actual scoring of each doc.'
      });

    case 'create_weight':
      return _i18n.i18n.translate('xpack.searchProfiler.createWeightTimeDescription', {
        defaultMessage: 'The time taken to create the Weight object, which holds temporary information during scoring.'
      });

    case 'next_doc':
      return _i18n.i18n.translate('xpack.searchProfiler.nextDocTimeDescription', {
        defaultMessage: 'The time taken to advance the iterator to the next matching document.'
      });

    case 'score':
      return _i18n.i18n.translate('xpack.searchProfiler.scoreTimeDescription', {
        defaultMessage: 'The time taken in actually scoring the document against the query.'
      });

    case 'match':
      return _i18n.i18n.translate('xpack.searchProfiler.matchTimeDescription', {
        defaultMessage: 'The time taken to execute a secondary, more precise scoring phase (used by phrase queries).'
      });

    case 'advance':
      return _i18n.i18n.translate('xpack.searchProfiler.advanceTimeDescription', {
        defaultMessage: 'The time taken to advance the iterator to the next document.'
      });

    default:
      return '';
  }
}

function timeInMilliseconds(data) {
  if (data.time_in_nanos) {
    return data.time_in_nanos / 1000000;
  }

  if (typeof data.time === 'string') {
    return Number(data.time.replace('ms', ''));
  }

  return Number(data.time);
}

function calcTimes(data, parentId) {
  var totalTime = 0; // First pass to collect total

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;
      totalTime += timeInMilliseconds(child);
      child.breakdown = normalizeBreakdown(child.breakdown);
      var childrenTime = 0;

      if (child.children != null && child.children.length !== 0) {
        childrenTime = calcTimes(child.children, child.id);
        child.hasChildren = true;
      }

      child.selfTime = timeInMilliseconds(child) - childrenTime;
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

  return totalTime;
}

function normalizeBreakdown(breakdown) {
  var final = [];
  var total = Object.keys(breakdown).reduce(function (partialTotal, currentKey) {
    if (currentKey.indexOf('_count') === -1) {
      partialTotal += breakdown[currentKey];
    }

    return partialTotal;
  }, 0);
  Object.keys(breakdown).sort().forEach(function (key) {
    var relative = 0;

    if (key.indexOf('_count') === -1) {
      relative = (breakdown[key] / total * 100).toFixed(1);
    }

    final.push({
      key: key,
      time: breakdown[key],
      relative: relative,
      color: _tinycolor.default.mix('#F5F5F5', '#FFAFAF', relative).toHexString(),
      tip: getToolTip(key)
    });
  }); // Sort by time descending and then key ascending

  return final.sort(function (a, b) {
    if (comparator(a.time, b.time) !== 0) {
      return comparator(a.time, b.time);
    }

    return -1 * comparator(a.key, b.key);
  });
}

function normalizeIndices(indices, target) {
  // Sort the shards per-index
  var sortQueryComponents;

  if (target === 'searches') {
    sortQueryComponents = function sortQueryComponents(a, b) {
      var aTime = _lodash.default.sum(a.searches, function (search) {
        return search.treeRoot.time;
      });

      var bTime = _lodash.default.sum(b.searches, function (search) {
        return search.treeRoot.time;
      });

      return comparator(aTime, bTime);
    };
  } else if (target === 'aggregations') {
    sortQueryComponents = function sortQueryComponents(a, b) {
      var aTime = _lodash.default.sum(a.aggregations, function (agg) {
        return agg.treeRoot.time;
      });

      var bTime = _lodash.default.sum(b.aggregations, function (agg) {
        return agg.treeRoot.time;
      });

      return comparator(aTime, bTime);
    };
  }

  for (var _i = 0, _Object$values = Object.values(indices); _i < _Object$values.length; _i++) {
    var index = _Object$values[_i];
    index.shards.sort(sortQueryComponents);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = index.shards[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var shard = _step2.value;
        shard.relative = (shard.time / index.time * 100).toFixed(2);
        shard.color = _tinycolor.default.mix('#F5F5F5', '#FFAFAF', shard.relative).toHexString();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
}

function normalizeTime(operation, totalTime) {
  operation.timePercentage = (timeInMilliseconds(operation) / totalTime * 100).toFixed(2);
  operation.absoluteColor = _tinycolor.default.mix('#F5F5F5', '#FFAFAF', +operation.timePercentage).toHexString();
}

function initTree(data, totalTime) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  if (_constants.MAX_TREE_DEPTH + 1 === depth) {
    if (parent) {
      parent.hasChildren = false;
      parent.children = [];
    }

    return;
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var child = _step3.value;

      // For bwc of older profile responses
      if (!child.description) {
        child.description = child.lucene;
        child.lucene = null;
        child.type = child.query_type;
        child.query_type = null;
      }

      normalizeTime(child, totalTime);
      child.parent = parent;
      child.time = timeInMilliseconds(child);
      child.lucene = child.description;
      child.query_type = child.type.split('.').pop();
      child.visible = +child.timePercentage > 20;
      child.depth = depth;

      if (child.children != null && child.children.length !== 0) {
        initTree(child.children, totalTime, depth + 1, child);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  data.sort(function (a, b) {
    return comparator(timeInMilliseconds(a), timeInMilliseconds(b));
  });
}

var sortIndices = function sortIndices(data) {
  var sortedIndices = [];

  for (var _i2 = 0, _Object$values2 = Object.values(data); _i2 < _Object$values2.length; _i2++) {
    var index = _Object$values2[_i2];
    sortedIndices.push(index);
  } // And now sort the indices themselves


  sortedIndices.sort(function (a, b) {
    return comparator(a.time, b.time);
  });
  return sortedIndices;
};

exports.sortIndices = sortIndices;