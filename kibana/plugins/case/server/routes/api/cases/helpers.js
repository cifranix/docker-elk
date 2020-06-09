"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCaseToUpdate = exports.isTwoArraysDifference = exports.compareArrays = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const compareArrays = ({
  originalValue,
  updatedValue
}) => {
  const result = {
    addedItems: [],
    deletedItems: []
  };
  originalValue.forEach(origVal => {
    if (!updatedValue.includes(origVal)) {
      result.deletedItems = [...result.deletedItems, origVal];
    }
  });
  updatedValue.forEach(updatedVal => {
    if (!originalValue.includes(updatedVal)) {
      result.addedItems = [...result.addedItems, updatedVal];
    }
  });
  return result;
};

exports.compareArrays = compareArrays;

const isTwoArraysDifference = (originalValue, updatedValue) => {
  if (originalValue != null && updatedValue != null && Array.isArray(updatedValue) && Array.isArray(originalValue)) {
    const compObj = compareArrays({
      originalValue,
      updatedValue
    });

    if (compObj.addedItems.length > 0 || compObj.deletedItems.length > 0) {
      return compObj;
    }
  }

  return null;
};

exports.isTwoArraysDifference = isTwoArraysDifference;

const getCaseToUpdate = (currentCase, queryCase) => Object.entries(queryCase).reduce((acc, [key, value]) => {
  const currentValue = (0, _lodash.get)(currentCase, key);

  if (Array.isArray(currentValue) && Array.isArray(value)) {
    if (isTwoArraysDifference(value, currentValue)) {
      return { ...acc,
        [key]: value
      };
    }

    return acc;
  } else if (currentValue != null && value !== currentValue) {
    return { ...acc,
      [key]: value
    };
  }

  return acc;
}, {
  id: queryCase.id,
  version: queryCase.version
});

exports.getCaseToUpdate = getCaseToUpdate;