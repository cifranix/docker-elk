"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicMappingSection = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _documentation = require("../../../../../services/documentation");

var _shared_imports = require("../../../shared_imports");

var _constants = require("../../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UseField = (0, _shared_imports.getUseField)({
  component: _shared_imports.Field
});

var DynamicMappingSection = function DynamicMappingSection() {
  return _react.default.createElement(_shared_imports.FormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dynamicMappingTitle', {
      defaultMessage: 'Dynamic mapping'
    }),
    description: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.dynamicMappingDescription",
      defaultMessage: "Dynamic mapping allows an index template to interpret unmapped fields. {docsLink}",
      values: {
        docsLink: _react.default.createElement(_eui.EuiLink, {
          href: _documentation.documentationService.getDynamicMappingLink(),
          target: "_blank"
        }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dynamicMappingDocumentionLink', {
          defaultMessage: 'Learn more.'
        }))
      }
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(UseField, {
      path: "dynamicMapping.enabled",
      component: _shared_imports.ToggleField,
      componentProps: {
        'data-test-subj': 'dynamicMappingsToggle'
      }
    }))
  }, _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: ['dynamicMapping.enabled', 'dynamicMapping.date_detection']
  }, function (formData) {
    var enabled = formData['dynamicMapping.enabled'],
        dateDetection = formData['dynamicMapping.date_detection'];

    if (enabled === undefined) {
      // If enabled is not yet defined don't go any further.
      return null;
    }

    if (enabled) {
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(UseField, {
        path: "dynamicMapping.numeric_detection",
        componentProps: {
          'data-test-subj': 'numericDetection'
        }
      }), _react.default.createElement(UseField, {
        path: "dynamicMapping.date_detection"
      }), dateDetection && _react.default.createElement(UseField, {
        path: "dynamicMapping.dynamic_date_formats",
        componentProps: {
          euiFieldProps: {
            options: _constants.ALL_DATE_FORMAT_OPTIONS,
            noSuggestions: false
          }
        }
      }));
    } else {
      return _react.default.createElement(UseField, {
        path: "dynamicMapping.throwErrorsForUnmappedFields",
        component: _shared_imports.CheckBoxField
      });
    }
  }));
};

exports.DynamicMappingSection = DynamicMappingSection;