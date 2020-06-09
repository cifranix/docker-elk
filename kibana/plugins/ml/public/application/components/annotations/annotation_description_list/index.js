"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationDescriptionList = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _date_utils = require("../../../util/date_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * React component for listing pairs of information about the detector for which
 * rules are being edited.
 */
var AnnotationDescriptionList = function AnnotationDescriptionList(_ref) {
  var annotation = _ref.annotation;
  var listItems = [{
    title: _i18n.i18n.translate('xpack.ml.timeSeriesExplorer.annotationDescriptionList.jobIdTitle', {
      defaultMessage: 'Job ID'
    }),
    description: annotation.job_id
  }, {
    title: _i18n.i18n.translate('xpack.ml.timeSeriesExplorer.annotationDescriptionList.startTitle', {
      defaultMessage: 'Start'
    }),
    description: (0, _date_utils.formatHumanReadableDateTimeSeconds)(annotation.timestamp)
  }];

  if (annotation.end_timestamp !== undefined) {
    listItems.push({
      title: _i18n.i18n.translate('xpack.ml.timeSeriesExplorer.annotationDescriptionList.endTitle', {
        defaultMessage: 'End'
      }),
      description: (0, _date_utils.formatHumanReadableDateTimeSeconds)(annotation.end_timestamp)
    });
  }

  if (annotation.create_time !== undefined && annotation.modified_time !== undefined) {
    listItems.push({
      title: _i18n.i18n.translate('xpack.ml.timeSeriesExplorer.annotationDescriptionList.createdTitle', {
        defaultMessage: 'Created'
      }),
      description: (0, _date_utils.formatHumanReadableDateTimeSeconds)(annotation.create_time)
    });
    listItems.push({
      title: _i18n.i18n.translate('xpack.ml.timeSeriesExplorer.annotationDescriptionList.createdByTitle', {
        defaultMessage: 'Created by'
      }),
      description: annotation.create_username
    });
    listItems.push({
      title: _i18n.i18n.translate('xpack.ml.timeSeriesExplorer.annotationDescriptionList.lastModifiedTitle', {
        defaultMessage: 'Last modified'
      }),
      description: (0, _date_utils.formatHumanReadableDateTimeSeconds)(annotation.modified_time)
    });
    listItems.push({
      title: _i18n.i18n.translate('xpack.ml.timeSeriesExplorer.annotationDescriptionList.modifiedByTitle', {
        defaultMessage: 'Modified by'
      }),
      description: annotation.modified_username
    });
  }

  return _react.default.createElement(_eui.EuiDescriptionList, {
    className: "ml-annotation-description-list",
    type: "column",
    listItems: listItems
  });
};

exports.AnnotationDescriptionList = AnnotationDescriptionList;