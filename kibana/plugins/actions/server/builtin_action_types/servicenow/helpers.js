"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformComments = exports.appendInformationToField = exports.transformFields = exports.prepareFieldsForTransformation = exports.appendField = exports.mapParams = exports.buildMap = exports.normalizeMapping = void 0;

var _lodash = require("lodash");

var _constants = require("./constants");

var transformers = _interopRequireWildcard(require("./transformers"));

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const normalizeMapping = (supportedFields, mapping) => {
  // Prevent prototype pollution and remove unsupported fields
  return mapping.filter(m => m.source !== '__proto__' && m.target !== '__proto__' && supportedFields.includes(m.source));
};

exports.normalizeMapping = normalizeMapping;

const buildMap = mapping => {
  return normalizeMapping(_constants.SUPPORTED_SOURCE_FIELDS, mapping).reduce((fieldsMap, field) => {
    const {
      source,
      target,
      actionType
    } = field;
    fieldsMap.set(source, {
      target,
      actionType
    });
    fieldsMap.set(target, {
      target: source,
      actionType
    });
    return fieldsMap;
  }, new Map());
};

exports.buildMap = buildMap;

const mapParams = (params, mapping) => {
  return Object.keys(params).reduce((prev, curr) => {
    const field = mapping.get(curr);

    if (field) {
      prev[field.target] = params[curr];
    }

    return prev;
  }, {});
};

exports.mapParams = mapParams;

const appendField = ({
  value,
  prefix = '',
  suffix = ''
}) => {
  return `${prefix}${value} ${suffix}`;
};

exports.appendField = appendField;
const t = { ...transformers
}; // TODO: Find a better solution exists.

const prepareFieldsForTransformation = ({
  params,
  mapping,
  defaultPipes = ['informationCreated']
}) => {
  return Object.keys(params.incident).filter(p => mapping.get(p).actionType !== 'nothing').map(p => ({
    key: p,
    value: params.incident[p],
    actionType: mapping.get(p).actionType,
    pipes: [...defaultPipes]
  })).map(p => ({ ...p,
    pipes: p.actionType === 'append' ? [...p.pipes, 'append'] : p.pipes
  }));
};

exports.prepareFieldsForTransformation = prepareFieldsForTransformation;

const transformFields = ({
  params,
  fields,
  currentIncident
}) => {
  return fields.reduce((prev, cur) => {
    var _params$updatedAt, _params$updatedBy$ful, _params$createdBy$ful;

    const transform = (0, _lodash.flow)(...cur.pipes.map(p => t[p]));
    prev[cur.key] = transform({
      value: cur.value,
      date: (_params$updatedAt = params.updatedAt) !== null && _params$updatedAt !== void 0 ? _params$updatedAt : params.createdAt,
      user: params.updatedBy != null ? (_params$updatedBy$ful = params.updatedBy.fullName) !== null && _params$updatedBy$ful !== void 0 ? _params$updatedBy$ful : params.updatedBy.username : (_params$createdBy$ful = params.createdBy.fullName) !== null && _params$createdBy$ful !== void 0 ? _params$createdBy$ful : params.createdBy.username,
      previousValue: currentIncident ? currentIncident[cur.key] : ''
    }).value;
    return prev;
  }, {});
};

exports.transformFields = transformFields;

const appendInformationToField = ({
  value,
  user,
  date,
  mode = 'create'
}) => {
  return appendField({
    value,
    suffix: i18n.FIELD_INFORMATION(mode, date, user)
  });
};

exports.appendInformationToField = appendInformationToField;

const transformComments = (comments, params, pipes) => {
  return comments.map(c => {
    var _c$updatedAt, _c$updatedBy$fullName, _c$createdBy$fullName;

    return { ...c,
      comment: (0, _lodash.flow)(...pipes.map(p => t[p]))({
        value: c.comment,
        date: (_c$updatedAt = c.updatedAt) !== null && _c$updatedAt !== void 0 ? _c$updatedAt : c.createdAt,
        user: c.updatedBy != null ? (_c$updatedBy$fullName = c.updatedBy.fullName) !== null && _c$updatedBy$fullName !== void 0 ? _c$updatedBy$fullName : c.updatedBy.username : (_c$createdBy$fullName = c.createdBy.fullName) !== null && _c$createdBy$fullName !== void 0 ? _c$createdBy$fullName : c.createdBy.username
      }).value
    };
  });
};

exports.transformComments = transformComments;