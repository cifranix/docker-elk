"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotRestoreHome = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _reactRouterDom = require("react-router-dom");

var _eui = require("@elastic/eui");

var _constants = require("../../constants");

var _app_context = require("../../app_context");

var _navigation = require("../../services/navigation");

var _repository_list = require("./repository_list");

var _snapshot_list = require("./snapshot_list");

var _restore_list = require("./restore_list");

var _policy_list = require("./policy_list");

var _documentation = require("../../services/documentation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SnapshotRestoreHome = function SnapshotRestoreHome(_ref) {
  var section = _ref.match.params.section,
      history = _ref.history;

  var _useConfig = (0, _app_context.useConfig)(),
      slmUi = _useConfig.slm_ui;

  var tabs = [{
    id: 'snapshots',
    name: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.home.snapshotsTabTitle",
      defaultMessage: "Snapshots"
    })
  }, {
    id: 'repositories',
    name: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.home.repositoriesTabTitle",
      defaultMessage: "Repositories"
    })
  }, {
    id: 'restore_status',
    name: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.home.restoreTabTitle",
      defaultMessage: "Restore Status"
    })
  }];

  if (slmUi.enabled) {
    tabs.splice(2, 0, {
      id: 'policies',
      name: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.home.policiesTabTitle",
        defaultMessage: "Policies"
      })
    });
  }

  var onSectionChange = function onSectionChange(newSection) {
    history.push("".concat(_constants.BASE_PATH, "/").concat(newSection));
  }; // Set breadcrumb and page title


  (0, _react.useEffect)(function () {
    _navigation.breadcrumbService.setBreadcrumbs(section || 'home');

    _navigation.docTitleService.setTitle(section || 'home');
  }, [section]);
  return _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement("h1", {
    "data-test-subj": "appTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.home.snapshotRestoreTitle",
    defaultMessage: "Snapshot and Restore"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    href: _documentation.documentationLinksService.getRepositoryTypeDocUrl(),
    target: "_blank",
    iconType: "help",
    "data-test-subj": "documentationLink"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.home.snapshotRestoreDocsLinkText",
    defaultMessage: "Snapshot and Restore docs"
  }))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.home.snapshotRestoreDescription",
    defaultMessage: "Use repositories to store and recover backups of your Elasticsearch indices and clusters."
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiTabs, null, tabs.map(function (tab) {
    return _react.default.createElement(_eui.EuiTab, {
      onClick: function onClick() {
        return onSectionChange(tab.id);
      },
      isSelected: tab.id === section,
      key: tab.id,
      "data-test-subj": tab.id.toLowerCase() + '_tab'
    }, tab.name);
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "/repositories/:repositoryName*"),
    component: _repository_list.RepositoryList
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "/snapshots"),
    component: _snapshot_list.SnapshotList
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "/snapshots/:repositoryName*/:snapshotId"),
    component: _snapshot_list.SnapshotList
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "/restore_status"),
    component: _restore_list.RestoreList
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "/policies/:policyName*"),
    component: _policy_list.PolicyList
  }))));
};

exports.SnapshotRestoreHome = SnapshotRestoreHome;