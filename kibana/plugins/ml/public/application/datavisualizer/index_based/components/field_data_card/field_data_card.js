"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldDataCard = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _field_types = require("../../../../../../common/constants/field_types");

var _index = require("../../../../components/field_title_bar/index");

var _content_types = require("./content_types");

var _loading_indicator = require("./loading_indicator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var FieldDataCard = function FieldDataCard(_ref) {
  var config = _ref.config;
  var fieldName = config.fieldName,
      loading = config.loading,
      type = config.type,
      existsInDocs = config.existsInDocs;

  function getCardContent() {
    if (existsInDocs === false) {
      return _react.default.createElement(_content_types.NotInDocsContent, null);
    }

    switch (type) {
      case _field_types.ML_JOB_FIELD_TYPES.NUMBER:
        if (fieldName !== undefined) {
          return _react.default.createElement(_content_types.NumberContent, {
            config: config
          });
        } else {
          return _react.default.createElement(_content_types.DocumentCountContent, {
            config: config
          });
        }

      case _field_types.ML_JOB_FIELD_TYPES.BOOLEAN:
        return _react.default.createElement(_content_types.BooleanContent, {
          config: config
        });

      case _field_types.ML_JOB_FIELD_TYPES.DATE:
        return _react.default.createElement(_content_types.DateContent, {
          config: config
        });

      case _field_types.ML_JOB_FIELD_TYPES.GEO_POINT:
        return _react.default.createElement(_content_types.GeoPointContent, {
          config: config
        });

      case _field_types.ML_JOB_FIELD_TYPES.IP:
        return _react.default.createElement(_content_types.IpContent, {
          config: config
        });

      case _field_types.ML_JOB_FIELD_TYPES.KEYWORD:
        return _react.default.createElement(_content_types.KeywordContent, {
          config: config
        });

      case _field_types.ML_JOB_FIELD_TYPES.TEXT:
        return _react.default.createElement(_content_types.TextContent, {
          config: config
        });

      default:
        return _react.default.createElement(_content_types.OtherContent, {
          config: config
        });
    }
  }

  return _react.default.createElement(_eui.EuiPanel, {
    "data-test-subj": "mlFieldDataCard ".concat(fieldName, " ").concat(type),
    className: "mlFieldDataCard",
    hasShadow: false
  }, _react.default.createElement(_index.FieldTitleBar, {
    card: config
  }), _react.default.createElement("div", {
    className: "mlFieldDataCard__content"
  }, loading === true ? _react.default.createElement(_loading_indicator.LoadingIndicator, null) : getCardContent()));
};

exports.FieldDataCard = FieldDataCard;