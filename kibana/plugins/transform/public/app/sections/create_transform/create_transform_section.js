"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTransformSection = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../common/constants");

var _use_documentation_links = require("../../hooks/use_documentation_links");

var _use_search_items = require("../../hooks/use_search_items");

var _navigation = require("../../services/navigation");

var _authorization = require("../../lib/authorization");

var _wizard = require("./components/wizard");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CreateTransformSection = function CreateTransformSection(_ref) {
  var match = _ref.match;
  // Set breadcrumb and page title
  (0, _react.useEffect)(function () {
    _navigation.breadcrumbService.setBreadcrumbs(_navigation.BREADCRUMB_SECTION.CREATE_TRANSFORM);

    _navigation.docTitleService.setTitle('createTransform');
  }, []);

  var _useDocumentationLink = (0, _use_documentation_links.useDocumentationLinks)(),
      esTransform = _useDocumentationLink.esTransform;

  var _useSearchItems = (0, _use_search_items.useSearchItems)(match.params.savedObjectId),
      searchItems = _useSearchItems.searchItems;

  return _react.default.createElement(_authorization.PrivilegesWrapper, {
    privileges: _constants.APP_CREATE_TRANSFORM_CLUSTER_PRIVILEGES
  }, _react.default.createElement(_eui.EuiPageContent, {
    "data-test-subj": "transformPageCreateTransform"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.transform.transformsWizard.createTransformTitle",
    defaultMessage: "Create transform"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    href: esTransform,
    target: "_blank",
    iconType: "help",
    "data-test-subj": "documentationLink"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.transform.transformsWizard.transformDocsLinkText",
    defaultMessage: "Transform docs"
  }))))), _react.default.createElement(_eui.EuiPageContentBody, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), searchItems !== undefined && _react.default.createElement(_wizard.Wizard, {
    searchItems: searchItems
  }))));
};

exports.CreateTransformSection = CreateTransformSection;