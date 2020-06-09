"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepReview = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _shared_imports = require("../../../../shared_imports");

var _template_serialization = require("../../../../../common/lib/template_serialization");

var _lib = require("../../mappings_editor/lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var stripEmptyFields = _shared_imports.serializers.stripEmptyFields;

var NoneDescriptionText = function NoneDescriptionText() {
  return _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepReview.summaryTab.noneDescriptionText",
    defaultMessage: "None"
  });
};

var getDescriptionText = function getDescriptionText(data) {
  var hasEntries = data && Object.entries(data).length > 0;
  return hasEntries ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepReview.summaryTab.yesDescriptionText",
    defaultMessage: "Yes"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepReview.summaryTab.noDescriptionText",
    defaultMessage: "No"
  });
};

var StepReview = function StepReview(_ref) {
  var template = _ref.template,
      updateCurrentStep = _ref.updateCurrentStep;
  var name = template.name,
      indexPatterns = template.indexPatterns,
      version = template.version,
      order = template.order;
  var serializedTemplate = (0, _template_serialization.serializeTemplate)(stripEmptyFields(template)); // Name not included in ES request body

  delete serializedTemplate.name;
  var serializedMappings = serializedTemplate.mappings,
      serializedSettings = serializedTemplate.settings,
      serializedAliases = serializedTemplate.aliases;
  var numIndexPatterns = indexPatterns.length;
  var hasWildCardIndexPattern = Boolean(indexPatterns.find(function (pattern) {
    return pattern === '*';
  }));

  var SummaryTab = function SummaryTab() {
    return _react.default.createElement("div", {
      "data-test-subj": "summaryTab"
    }, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.stepReview.summaryTab.indexPatternsLabel",
      defaultMessage: "Index {numIndexPatterns, plural, one {pattern} other {patterns}}",
      values: {
        numIndexPatterns: numIndexPatterns
      }
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, numIndexPatterns > 1 ? _react.default.createElement(_eui.EuiText, null, _react.default.createElement("ul", null, indexPatterns.map(function (indexName, i) {
      return _react.default.createElement("li", {
        key: "".concat(indexName, "-").concat(i)
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react.default.createElement("span", null, indexName)));
    }))) : indexPatterns.toString()), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.stepReview.summaryTab.orderLabel",
      defaultMessage: "Order"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, order ? order : _react.default.createElement(NoneDescriptionText, null)), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.stepReview.summaryTab.versionLabel",
      defaultMessage: "Version"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, version ? version : _react.default.createElement(NoneDescriptionText, null)))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.stepReview.summaryTab.settingsLabel",
      defaultMessage: "Index settings"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, getDescriptionText(serializedSettings)), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.stepReview.summaryTab.mappingLabel",
      defaultMessage: "Mappings"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, getDescriptionText(serializedMappings)), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.stepReview.summaryTab.aliasesLabel",
      defaultMessage: "Aliases"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, getDescriptionText(serializedAliases))))));
  };

  var RequestTab = function RequestTab() {
    var includeTypeName = (0, _lib.doMappingsHaveType)(template.mappings);
    var endpoint = "PUT _template/".concat(name || '<templateName>').concat(includeTypeName ? '?include_type_name' : '');
    var templateString = JSON.stringify(serializedTemplate, null, 2);
    var request = "".concat(endpoint, "\n").concat(templateString); // Beyond a certain point, highlighting the syntax will bog down performance to unacceptable
    // levels. This way we prevent that happening for very large requests.

    var language = request.length < 60000 ? 'json' : undefined;
    return _react.default.createElement("div", {
      "data-test-subj": "requestTab"
    }, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.stepReview.requestTab.descriptionText",
      defaultMessage: "This request will create the following index template."
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiCodeBlock, {
      language: language,
      isCopyable: true
    }, request));
  };

  return _react.default.createElement("div", {
    "data-test-subj": "stepSummary"
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", {
    "data-test-subj": "stepTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepReview.stepTitle",
    defaultMessage: "Review details for '{templateName}'",
    values: {
      templateName: name
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), hasWildCardIndexPattern ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.stepReview.summaryTab.indexPatternsWarningTitle",
      defaultMessage: "This template uses a wildcard (*) as an index pattern."
    }),
    color: "warning",
    iconType: "help",
    "data-test-subj": "indexPatternsWarning"
  }, _react.default.createElement("p", {
    "data-test-subj": "indexPatternsWarningDescription"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepReview.summaryTab.indexPatternsWarningDescription",
    defaultMessage: "All new indices that you create will use this template."
  }), ' ', _react.default.createElement(_eui.EuiLink, {
    onClick: updateCurrentStep.bind(null, 1)
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepReview.summaryTab.indexPatternsWarningLinkText",
    defaultMessage: "Edit index patterns."
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  })) : null, _react.default.createElement(_eui.EuiTabbedContent, {
    "data-test-subj": "summaryTabContent",
    tabs: [{
      id: 'summary',
      name: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepReview.summaryTabTitle', {
        defaultMessage: 'Summary'
      }),
      content: _react.default.createElement(SummaryTab, null)
    }, {
      id: 'request',
      name: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepReview.requestTabTitle', {
        defaultMessage: 'Request'
      }),
      content: _react.default.createElement(RequestTab, null)
    }]
  }));
};

exports.StepReview = StepReview;