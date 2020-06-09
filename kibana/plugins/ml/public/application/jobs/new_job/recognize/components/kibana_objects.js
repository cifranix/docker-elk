"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaObjects = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var KibanaObjects = (0, _react.memo)(function (_ref) {
  var objectType = _ref.objectType,
      kibanaObjects = _ref.kibanaObjects,
      isSaving = _ref.isSaving;
  var kibanaObjectLabels = {
    dashboard: _i18n.i18n.translate('xpack.ml.newJob.recognize.dashboardsLabel', {
      defaultMessage: 'Dashboards'
    }),
    search: _i18n.i18n.translate('xpack.ml.newJob.recognize.searchesLabel', {
      defaultMessage: 'Searches'
    }),
    visualization: _i18n.i18n.translate('xpack.ml.newJob.recognize.visualizationsLabel', {
      defaultMessage: 'Visualizations'
    })
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h4", null, kibanaObjectLabels[objectType])), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement("ul", null, kibanaObjects.map(function (_ref2, i) {
    var id = _ref2.id,
        title = _ref2.title,
        success = _ref2.success,
        exists = _ref2.exists;
    return _react.default.createElement("li", {
      key: id
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center",
      gutterSize: "s"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "xs"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiText, {
      size: "s",
      color: exists ? 'subdued' : 'secondary'
    }, title)), exists && _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiText, {
      size: "xs",
      color: "default"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.alreadyExistsLabel",
      defaultMessage: "(already exists)"
    }))))), !exists && _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      style: {
        width: '60px'
      }
    }, _react.default.createElement(_eui.EuiText, {
      textAlign: "center"
    }, isSaving ? _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "m"
    }) : null, success !== undefined ? _react.default.createElement(_eui.EuiIcon, {
      type: success ? 'check' : 'cross',
      color: success ? 'success' : 'danger',
      "aria-label": success ? _i18n.i18n.translate('xpack.ml.newJob.recognize.results.savedAriaLabel', {
        defaultMessage: 'Saved'
      }) : _i18n.i18n.translate('xpack.ml.newJob.recognize.results.saveFailedAriaLabel', {
        defaultMessage: 'Save failed'
      })
    }) : null))), (kibanaObjects.length === 1 || i < kibanaObjects.length - 1) && _react.default.createElement(_eui.EuiHorizontalRule, {
      margin: "s"
    }));
  })));
});
exports.KibanaObjects = KibanaObjects;