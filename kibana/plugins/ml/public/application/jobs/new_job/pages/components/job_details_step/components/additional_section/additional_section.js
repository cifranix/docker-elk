"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdditionalSection = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _calendars = require("./components/calendars");

var _custom_urls = require("./components/custom_urls");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var buttonContent = _i18n.i18n.translate('xpack.ml.newJob.wizard.jobDetailsStep.additionalSectionButton', {
  defaultMessage: 'Additional settings'
});

var AdditionalSection = function AdditionalSection(_ref) {
  var additionalExpanded = _ref.additionalExpanded,
      setAdditionalExpanded = _ref.setAdditionalExpanded;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiAccordion, {
    id: "advanced-section",
    buttonContent: buttonContent,
    onToggle: setAdditionalExpanded,
    initialIsOpen: additionalExpanded,
    "data-test-subj": "mlJobWizardToggleAdditionalSettingsSection"
  }, _react.default.createElement("section", {
    "data-test-subj": "mlJobWizardAdditionalSettingsSection"
  }, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl",
    style: {
      marginLeft: '0px',
      marginRight: '0px'
    }
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_custom_urls.CustomUrlsSelection, null))), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl",
    style: {
      marginLeft: '0px',
      marginRight: '0px'
    }
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_calendars.CalendarsSelection, null)), _react.default.createElement(_eui.EuiFlexItem, null)))));
};

exports.AdditionalSection = AdditionalSection;