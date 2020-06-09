"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Description = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _kibana = require("../../../../../../../../../contexts/kibana");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Description = (0, _react.memo)(function (_ref) {
  var children = _ref.children;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      docLinks = _useMlKibana.services.docLinks;

  var ELASTIC_WEBSITE_URL = docLinks.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = docLinks.DOC_LINK_VERSION;
  var docsUrl = "".concat(ELASTIC_WEBSITE_URL, "guide/en/machine-learning/").concat(DOC_LINK_VERSION, "/ml-calendars.html");

  var title = _i18n.i18n.translate('xpack.ml.newJob.wizard.jobDetailsStep.additionalSection.calendarsSelection.title', {
    defaultMessage: 'Calendars'
  });

  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement("h3", null, title),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.jobDetailsStep.additionalSection.calendarsSelection.description",
      defaultMessage: "Contains a list of scheduled events that you want to ignore, such as planned system outages or public holidays. {learnMoreLink}",
      values: {
        learnMoreLink: _react.default.createElement(_eui.EuiLink, {
          href: docsUrl,
          target: "_blank"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.ml.newJob.wizard.jobDetailsStep.additionalSection.calendarsSelection.learnMoreLinkText",
          defaultMessage: "Learn more"
        }))
      }
    })
  }, _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_react.default.Fragment, null, children)));
});
exports.Description = Description;