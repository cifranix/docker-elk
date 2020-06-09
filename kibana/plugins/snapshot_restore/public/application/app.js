"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _constants = require("../../common/constants");

var _components = require("./components");

var _constants2 = require("./constants");

var _sections = require("./sections");

var _app_context = require("./app_context");

var _authorization = require("./lib/authorization");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var App = function App() {
  var _useConfig = (0, _app_context.useConfig)(),
      slmUi = _useConfig.slm_ui;

  var _useContext = (0, _react.useContext)(_authorization.AuthorizationContext),
      apiError = _useContext.apiError;

  var sections = ['repositories', 'snapshots', 'restore_status'];

  if (slmUi.enabled) {
    sections.push('policies');
  }

  var sectionsRegex = sections.join('|');
  return apiError ? _react.default.createElement(_components.SectionError, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.app.checkingPrivilegesErrorMessage",
      defaultMessage: "Error fetching user privileges from the server."
    }),
    error: apiError
  }) : _react.default.createElement(_authorization.WithPrivileges, {
    privileges: _constants.APP_REQUIRED_CLUSTER_PRIVILEGES.map(function (name) {
      return "cluster.".concat(name);
    })
  }, function (_ref) {
    var isLoading = _ref.isLoading,
        hasPrivileges = _ref.hasPrivileges,
        privilegesMissing = _ref.privilegesMissing;
    return isLoading ? _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.app.checkingPrivilegesDescription",
      defaultMessage: "Checking privileges\u2026"
    })) : hasPrivileges ? _react.default.createElement("div", {
      "data-test-subj": "snapshotRestoreApp"
    }, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      exact: true,
      path: "".concat(_constants2.BASE_PATH, "/add_repository"),
      component: _sections.RepositoryAdd
    }), _react.default.createElement(_reactRouterDom.Route, {
      exact: true,
      path: "".concat(_constants2.BASE_PATH, "/edit_repository/:name*"),
      component: _sections.RepositoryEdit
    }), _react.default.createElement(_reactRouterDom.Route, {
      exact: true,
      path: "".concat(_constants2.BASE_PATH, "/:section(").concat(sectionsRegex, ")/:repositoryName?/:snapshotId*"),
      component: _sections.SnapshotRestoreHome
    }), _react.default.createElement(_reactRouterDom.Redirect, {
      exact: true,
      from: "".concat(_constants2.BASE_PATH, "/restore/:repositoryName"),
      to: "".concat(_constants2.BASE_PATH, "/snapshots")
    }), _react.default.createElement(_reactRouterDom.Route, {
      exact: true,
      path: "".concat(_constants2.BASE_PATH, "/restore/:repositoryName/:snapshotId*"),
      component: _sections.RestoreSnapshot
    }), slmUi.enabled && _react.default.createElement(_reactRouterDom.Route, {
      exact: true,
      path: "".concat(_constants2.BASE_PATH, "/add_policy"),
      component: _sections.PolicyAdd
    }), slmUi.enabled && _react.default.createElement(_reactRouterDom.Route, {
      exact: true,
      path: "".concat(_constants2.BASE_PATH, "/edit_policy/:name*"),
      component: _sections.PolicyEdit
    }), _react.default.createElement(_reactRouterDom.Redirect, {
      from: "".concat(_constants2.BASE_PATH),
      to: "".concat(_constants2.BASE_PATH, "/").concat(_constants2.DEFAULT_SECTION)
    }))) : _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_authorization.NotAuthorizedSection, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.app.deniedPrivilegeTitle",
        defaultMessage: "You're missing cluster privileges"
      }),
      message: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.app.deniedPrivilegeDescription",
        defaultMessage: "To use Snapshot and Restore, you must have {privilegesCount, plural, one {this cluster privilege} other {these cluster privileges}}: {missingPrivileges}.",
        values: {
          missingPrivileges: privilegesMissing.cluster.join(', '),
          privilegesCount: privilegesMissing.cluster.length
        }
      })
    }));
  });
};

exports.App = App;