"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kbnTypeToMLJobType = kbnTypeToMLJobType;
exports.getMLJobTypeAriaLabel = exports.mlJobTypeAriaLabels = void 0;

var _i18n = require("@kbn/i18n");

var _field_types = require("../../../common/constants/field_types");

var _public = require("../../../../../../src/plugins/data/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// convert kibana types to ML Job types
// this is needed because kibana types only have string and not text and keyword.
// and we can't use ES_FIELD_TYPES because it has no NUMBER type
function kbnTypeToMLJobType(field) {
  // Return undefined if not one of the supported data visualizer field types.
  var type;

  switch (field.type) {
    case _public.KBN_FIELD_TYPES.STRING:
      type = field.aggregatable ? _field_types.ML_JOB_FIELD_TYPES.KEYWORD : _field_types.ML_JOB_FIELD_TYPES.TEXT;
      break;

    case _public.KBN_FIELD_TYPES.NUMBER:
      type = _field_types.ML_JOB_FIELD_TYPES.NUMBER;
      break;

    case _public.KBN_FIELD_TYPES.DATE:
      type = _field_types.ML_JOB_FIELD_TYPES.DATE;
      break;

    case _public.KBN_FIELD_TYPES.IP:
      type = _field_types.ML_JOB_FIELD_TYPES.IP;
      break;

    case _public.KBN_FIELD_TYPES.BOOLEAN:
      type = _field_types.ML_JOB_FIELD_TYPES.BOOLEAN;
      break;

    case _public.KBN_FIELD_TYPES.GEO_POINT:
      type = _field_types.ML_JOB_FIELD_TYPES.GEO_POINT;
      break;

    default:
      break;
  }

  return type;
}

var mlJobTypeAriaLabels = {
  BOOLEAN: _i18n.i18n.translate('xpack.ml.fieldTypeIcon.booleanTypeAriaLabel', {
    defaultMessage: 'boolean type'
  }),
  DATE: _i18n.i18n.translate('xpack.ml.fieldTypeIcon.dateTypeAriaLabel', {
    defaultMessage: 'date type'
  }),
  GEO_POINT: _i18n.i18n.translate('xpack.ml.fieldTypeIcon.geoPointTypeAriaLabel', {
    defaultMessage: '{geoPointParam} type',
    values: {
      geoPointParam: 'geo point'
    }
  }),
  IP: _i18n.i18n.translate('xpack.ml.fieldTypeIcon.ipTypeAriaLabel', {
    defaultMessage: 'ip type'
  }),
  KEYWORD: _i18n.i18n.translate('xpack.ml.fieldTypeIcon.keywordTypeAriaLabel', {
    defaultMessage: 'keyword type'
  }),
  NUMBER: _i18n.i18n.translate('xpack.ml.fieldTypeIcon.numberTypeAriaLabel', {
    defaultMessage: 'number type'
  }),
  TEXT: _i18n.i18n.translate('xpack.ml.fieldTypeIcon.textTypeAriaLabel', {
    defaultMessage: 'text type'
  }),
  UNKNOWN: _i18n.i18n.translate('xpack.ml.fieldTypeIcon.unknownTypeAriaLabel', {
    defaultMessage: 'unknown type'
  })
};
exports.mlJobTypeAriaLabels = mlJobTypeAriaLabels;

var getMLJobTypeAriaLabel = function getMLJobTypeAriaLabel(type) {
  var requestedFieldType = Object.keys(_field_types.ML_JOB_FIELD_TYPES).find(function (k) {
    return _field_types.ML_JOB_FIELD_TYPES[k] === type;
  });

  if (requestedFieldType === undefined) {
    return null;
  }

  return mlJobTypeAriaLabels[requestedFieldType];
};

exports.getMLJobTypeAriaLabel = getMLJobTypeAriaLabel;