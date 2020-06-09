"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutateAggsTimesTree = mutateAggsTimesTree;
exports.mutateSearchTimesTree = mutateSearchTimesTree;
exports.initDataFor = exports.normalize = exports.initIndices = exports.calculateShardValues = void 0;

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _function = require("fp-ts/lib/function");

var _unsafe_utils = require("./unsafe_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Functions prefixed with "mutate" change values by reference. Be careful when using these!
 */
function mutateAggsTimesTree(shard) {
  if (shard.aggregations == null) {
    shard.time = 0;
  }

  var shardTime = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = shard.aggregations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var agg = _step.value;
      var totalTime = (0, _unsafe_utils.calcTimes)([agg]);
      shardTime += totalTime;
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = shard.aggregations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _agg = _step2.value;
      (0, _unsafe_utils.initTree)([_agg], shardTime); // To make this data structure consistent with that of search we
      // mark each aggregation as it's own tree root.

      _agg.treeRoot = _agg;
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

  shard.time = shardTime;
}

function mutateSearchTimesTree(shard) {
  if (shard.searches == null) {
    shard.time = 0;
  }

  shard.rewrite_time = 0;
  var shardTime = 0;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = shard.searches[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var search = _step3.value;
      shard.rewrite_time += search.rewrite_time;
      var totalTime = (0, _unsafe_utils.calcTimes)(search.query);
      shardTime += totalTime;
      (0, _unsafe_utils.initTree)(search.query, totalTime);
      search.treeRoot = search.query[0]; // Remove this object.

      search.query = null;
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

  shard.time = shardTime;
}

var initShards = function initShards(data) {
  return data.map(function (s) {
    var idMatch = s.id.match(/\[([^\]\[]*?)\]/g) || [];
    var ids = idMatch.map(function (id) {
      return id.replace('[', '').replace(']', '');
    });
    return _objectSpread({}, s, {
      id: ids,
      time: 0,
      color: '',
      relative: 0
    });
  });
};

var calculateShardValues = function calculateShardValues(target) {
  return function (data) {
    var mutateTimesTree = target === 'searches' ? mutateSearchTimesTree : target === 'aggregations' ? mutateAggsTimesTree : null;

    if (mutateTimesTree) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var shard = _step4.value;
          mutateTimesTree(shard);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }

    return data;
  };
};

exports.calculateShardValues = calculateShardValues;

var initIndices = function initIndices(data) {
  var indices = {};
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = data[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var shard = _step5.value;

      if (!indices[shard.id[1]]) {
        indices[shard.id[1]] = {
          shards: [],
          time: 0,
          name: shard.id[1],
          visible: false
        };
      }

      indices[shard.id[1]].shards.push(shard);
      indices[shard.id[1]].time += shard.time;
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return indices;
};

exports.initIndices = initIndices;

var normalize = function normalize(target) {
  return function (data) {
    (0, _unsafe_utils.normalizeIndices)(data, target);
    return data;
  };
};

exports.normalize = normalize;

var initDataFor = function initDataFor(target) {
  return (0, _function.flow)(_lodash.default, initShards, calculateShardValues(target), initIndices, normalize(target), _unsafe_utils.sortIndices);
};

exports.initDataFor = initDataFor;