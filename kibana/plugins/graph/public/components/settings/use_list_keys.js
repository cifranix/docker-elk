"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useListKeys = useListKeys;

var _react = require("react");

var _eui = require("@elastic/eui");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var generateId = (0, _eui.htmlIdGenerator)();
/**
 * Hook providing stable ids to items of a list that don't have a natural
 * identifier that could be used as `key` in React list renderings.
 *
 * It assigns an ID to an object reference and will always return the
 * same id for the same object.
 *
 * This hook solves the problem that state in list item components is not
 * kept during list re-orderings if resorting to index keys.
 *
 * @param list The list of objects to assign ids to. The list has to be immutable -
 * if you change an object or add a new one, shallow-copy the old list
 * for the id generator to take effect.
 *
 * @returns A lookup function taking an item of the list supplied to the
 * hook and returning the id for the given item.
 */

function useListKeys(list) {
  var idStore = (0, _react.useRef)(new Map());
  var currentIdMap = (0, _react.useMemo)(function () {
    var newMap = new Map();
    list.forEach(function (item) {
      if (idStore.current.has(item)) {
        newMap.set(item, idStore.current.get(item));
      } else {
        var newId = generateId();
        newMap.set(item, newId);
      }
    });
    idStore.current = newMap;
    return idStore.current;
  }, [list]);
  return (0, _react.useCallback)(function (item) {
    var itemId = currentIdMap.get(item);

    if (itemId) {
      return itemId;
    }

    throw new Error("Object not found. Make sure to pass the whole list to the hook and don't mutate the list with functions like push");
  }, [currentIdMap]);
}