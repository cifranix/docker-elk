"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexManagementHome = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../common/constants");

var _documentation = require("../../services/documentation");

var _index_list = require("./index_list");

var _template_list = require("./template_list");

var _breadcrumbs = require("../../services/breadcrumbs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var IndexManagementHome = function IndexManagementHome(_ref) {
  var section = _ref.match.params.section,
      history = _ref.history;
  var tabs = [{
    id: 'indices',
    name: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.home.indicesTabTitle",
      defaultMessage: "Indices"
    })
  }, {
    id: 'templates',
    name: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.home.indexTemplatesTabTitle",
      defaultMessage: "Index Templates"
    })
  }];

  var onSectionChange = function onSectionChange(newSection) {
    history.push("".concat(_constants.BASE_PATH).concat(newSection));
  };

  (0, _react.useEffect)(function () {
    _breadcrumbs.breadcrumbService.setBreadcrumbs('home');
  }, []);
  return _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement("h1", {
    "data-test-subj": "appTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.home.appTitle",
    defaultMessage: "Index Management"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    href: _documentation.documentationService.getIdxMgmtDocumentationLink(),
    target: "_blank",
    iconType: "help",
    "data-test-subj": "documentationLink"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.home.idxMgmtDocsLinkText",
    defaultMessage: "Index Management docs"
  }))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiTabs, null, tabs.map(function (tab) {
    return _react.default.createElement(_eui.EuiTab, {
      onClick: function onClick() {
        return onSectionChange(tab.id);
      },
      isSelected: tab.id === section,
      key: tab.id,
      "data-test-subj": "".concat(tab.id, "Tab")
    }, tab.name);
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "indices"),
    component: _index_list.IndexList
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "indices/filter/:filter?"),
    component: _index_list.IndexList
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "templates/:templateName*"),
    component: _template_list.TemplateList
  }))));
};

exports.IndexManagementHome = IndexManagementHome;