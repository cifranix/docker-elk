"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildCaseUserActions = exports.buildCaseUserActionItem = exports.buildCommentUserActionItem = exports.transformNewUserAction = void 0;

var _lodash = require("lodash");

var _helpers = require("../../routes/api/cases/helpers");

var _saved_object_types = require("../../saved_object_types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const transformNewUserAction = ({
  actionField,
  action,
  actionAt,
  email,
  full_name,
  newValue = null,
  oldValue = null,
  username
}) => ({
  action_field: actionField,
  action,
  action_at: actionAt,
  action_by: {
    email,
    full_name,
    username
  },
  new_value: newValue,
  old_value: oldValue
});

exports.transformNewUserAction = transformNewUserAction;

const buildCommentUserActionItem = ({
  action,
  actionAt,
  actionBy,
  caseId,
  commentId,
  fields,
  newValue,
  oldValue
}) => ({
  attributes: transformNewUserAction({
    actionField: fields,
    action,
    actionAt,
    ...actionBy,
    newValue: newValue,
    oldValue: oldValue
  }),
  references: [{
    type: _saved_object_types.CASE_SAVED_OBJECT,
    name: `associated-${_saved_object_types.CASE_SAVED_OBJECT}`,
    id: caseId
  }, {
    type: _saved_object_types.CASE_COMMENT_SAVED_OBJECT,
    name: `associated-${_saved_object_types.CASE_COMMENT_SAVED_OBJECT}`,
    id: commentId
  }]
});

exports.buildCommentUserActionItem = buildCommentUserActionItem;

const buildCaseUserActionItem = ({
  action,
  actionAt,
  actionBy,
  caseId,
  fields,
  newValue,
  oldValue
}) => ({
  attributes: transformNewUserAction({
    actionField: fields,
    action,
    actionAt,
    ...actionBy,
    newValue: newValue,
    oldValue: oldValue
  }),
  references: [{
    type: _saved_object_types.CASE_SAVED_OBJECT,
    name: `associated-${_saved_object_types.CASE_SAVED_OBJECT}`,
    id: caseId
  }]
});

exports.buildCaseUserActionItem = buildCaseUserActionItem;
const userActionFieldsAllowed = ['comment', 'description', 'tags', 'title', 'status'];

const buildCaseUserActions = ({
  actionDate,
  actionBy,
  originalCases,
  updatedCases
}) => updatedCases.reduce((acc, updatedItem) => {
  const originalItem = originalCases.find(oItem => oItem.id === updatedItem.id);

  if (originalItem != null) {
    let userActions = [];
    const updatedFields = Object.keys(updatedItem.attributes);
    updatedFields.forEach(field => {
      if (userActionFieldsAllowed.includes(field)) {
        const origValue = (0, _lodash.get)(originalItem, ['attributes', field]);
        const updatedValue = (0, _lodash.get)(updatedItem, ['attributes', field]);
        const compareValues = (0, _helpers.isTwoArraysDifference)(origValue, updatedValue);

        if (compareValues != null) {
          if (compareValues.addedItems.length > 0) {
            userActions = [...userActions, buildCaseUserActionItem({
              action: 'add',
              actionAt: actionDate,
              actionBy,
              caseId: updatedItem.id,
              fields: [field],
              newValue: compareValues.addedItems.join(', ')
            })];
          }

          if (compareValues.deletedItems.length > 0) {
            userActions = [...userActions, buildCaseUserActionItem({
              action: 'delete',
              actionAt: actionDate,
              actionBy,
              caseId: updatedItem.id,
              fields: [field],
              newValue: compareValues.deletedItems.join(', ')
            })];
          }
        } else if (origValue !== updatedValue) {
          userActions = [...userActions, buildCaseUserActionItem({
            action: 'update',
            actionAt: actionDate,
            actionBy,
            caseId: updatedItem.id,
            fields: [field],
            newValue: updatedValue,
            oldValue: origValue
          })];
        }
      }
    });
    return [...acc, ...userActions];
  }

  return acc;
}, []);

exports.buildCaseUserActions = buildCaseUserActions;