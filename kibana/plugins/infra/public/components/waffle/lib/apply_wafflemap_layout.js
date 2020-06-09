"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumns = getColumns;
exports.getTotalItems = getTotalItems;
exports.getLargestCount = getLargestCount;
exports.applyWaffleMapLayout = applyWaffleMapLayout;

var _lodash = require("lodash");

var _type_guards = require("../../../containers/waffle/type_guards");

var _size_of_squares = require("./size_of_squares");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getColumns(n) {
  var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var pageRatio = w / h;
  var ratio = pageRatio > 1.2 ? 1.2 : pageRatio;
  var width = Math.ceil(Math.sqrt(n));
  return Math.ceil(width * ratio);
}

function getTotalItems(groups) {
  if (!groups) {
    return 0;
  }

  return groups.reduce(function (acc, group) {
    if ((0, _type_guards.isWaffleMapGroupWithGroups)(group)) {
      return group.groups.reduce(function (total, subGroup) {
        return subGroup.nodes.length + total;
      }, acc);
    }

    if ((0, _type_guards.isWaffleMapGroupWithNodes)(group)) {
      return group.nodes.length + acc;
    }

    return acc;
  }, 0);
}

function getLargestCount(groups) {
  if (!groups) {
    return 0;
  }

  return groups.reduce(function (total, group) {
    if ((0, _type_guards.isWaffleMapGroupWithGroups)(group)) {
      return group.groups.reduce(function (subTotal, subGroup) {
        if ((0, _type_guards.isWaffleMapGroupWithNodes)(subGroup)) {
          return subTotal > subGroup.nodes.length ? subTotal : subGroup.nodes.length;
        }

        return subTotal;
      }, total);
    }

    if ((0, _type_guards.isWaffleMapGroupWithNodes)(group)) {
      return total > group.nodes.length ? total : group.nodes.length;
    }

    return total;
  }, 0);
}

var getTotalItemsOfGroup = function getTotalItemsOfGroup(group) {
  return getTotalItems([group]);
};

function applyWaffleMapLayout(groups, width, height) {
  if (groups.length === 0) {
    return [];
  }

  var levels = (0, _type_guards.isWaffleMapGroupWithGroups)((0, _lodash.first)(groups)) ? 2 : 1;
  var totalItems = getTotalItems(groups);
  var squareSize = Math.round((0, _size_of_squares.sizeOfSquares)(width, height, totalItems, levels));
  var largestCount = getLargestCount(groups);
  return (0, _lodash.sortBy)(groups, getTotalItemsOfGroup).reverse().map(function (group) {
    if ((0, _type_guards.isWaffleMapGroupWithGroups)(group)) {
      var columns = getColumns(largestCount, width, height);
      var groupOfNodes = group.groups;
      var subGroups = (0, _lodash.sortBy)(groupOfNodes, getTotalItemsOfGroup).reverse().filter(_type_guards.isWaffleMapGroupWithNodes).map(function (subGroup) {
        return _objectSpread({}, subGroup, {
          count: subGroup.nodes.length,
          columns: columns,
          width: columns * squareSize,
          squareSize: squareSize
        });
      });
      return _objectSpread({}, group, {
        groups: subGroups,
        count: getTotalItems([group]),
        squareSize: squareSize
      });
    }

    if ((0, _type_guards.isWaffleMapGroupWithNodes)(group)) {
      var _columns = getColumns(Math.max(group.nodes.length, largestCount), width, height);

      return _objectSpread({}, group, {
        count: group.nodes.length,
        squareSize: squareSize,
        width: _columns * squareSize
      });
    }

    return group;
  });
}