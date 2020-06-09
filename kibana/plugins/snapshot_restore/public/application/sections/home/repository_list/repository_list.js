"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _components = require("../../../components");

var _constants = require("../../../constants");

var _app_context = require("../../../app_context");

var _http = require("../../../services/http");

var _navigation = require("../../../services/navigation");

var _repository_details = require("./repository_details");

var _repository_table = require("./repository_table");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RepositoryList = function RepositoryList(_ref) {
  var repositoryName = _ref.match.params.repositoryName,
      history = _ref.history;

  var _useLoadRepositories = (0, _http.useLoadRepositories)(),
      error = _useLoadRepositories.error,
      isLoading = _useLoadRepositories.isLoading,
      _useLoadRepositories$ = _useLoadRepositories.data;

  _useLoadRepositories$ = _useLoadRepositories$ === void 0 ? {
    repositories: undefined,
    managedRepository: {
      name: undefined
    }
  } : _useLoadRepositories$;
  var repositories = _useLoadRepositories$.repositories,
      managedRepository = _useLoadRepositories$.managedRepository,
      reload = _useLoadRepositories.sendRequest;

  var _useServices = (0, _app_context.useServices)(),
      uiMetricService = _useServices.uiMetricService;

  var openRepositoryDetailsUrl = function openRepositoryDetailsUrl(newRepositoryName) {
    return (0, _navigation.linkToRepository)(newRepositoryName);
  };

  var closeRepositoryDetails = function closeRepositoryDetails() {
    history.push("".concat(_constants.BASE_PATH, "/repositories"));
  };

  var onRepositoryDeleted = function onRepositoryDeleted(repositoriesDeleted) {
    if (repositoryName && repositoriesDeleted.includes(repositoryName)) {
      closeRepositoryDetails();
    }

    if (repositoriesDeleted.length) {
      reload();
    }
  }; // Track component loaded


  (0, _react.useEffect)(function () {
    uiMetricService.trackUiMetric(_constants.UIM_REPOSITORY_LIST_LOAD);
  }, [uiMetricService]);
  var content;

  if (isLoading) {
    content = _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryList.loadingRepositoriesDescription",
      defaultMessage: "Loading repositories\u2026"
    }));
  } else if (error) {
    content = _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryList.LoadingRepositoriesErrorMessage",
        defaultMessage: "Error loading repositories"
      }),
      error: error
    });
  } else if (repositories && repositories.length === 0) {
    content = _react.default.createElement(_eui.EuiEmptyPrompt, {
      iconType: "managementApp",
      title: _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryList.emptyPromptTitle",
        defaultMessage: "Register your first repository"
      })),
      body: _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryList.emptyPromptDescription",
        defaultMessage: "Create a place where your snapshots will live."
      }))),
      actions: _react.default.createElement(_eui.EuiButton, {
        href: (0, _navigation.linkToAddRepository)(),
        fill: true,
        iconType: "plusInCircle",
        "data-test-subj": "registerRepositoryButton"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.addRepositoryButtonLabel",
        defaultMessage: "Register a repository"
      })),
      "data-test-subj": "emptyPrompt"
    });
  } else {
    content = _react.default.createElement(_repository_table.RepositoryTable, {
      repositories: repositories || [],
      managedRepository: managedRepository === null || managedRepository === void 0 ? void 0 : managedRepository.name,
      reload: reload,
      openRepositoryDetailsUrl: openRepositoryDetailsUrl,
      onRepositoryDeleted: onRepositoryDeleted
    });
  }

  return _react.default.createElement("section", {
    "data-test-subj": "repositoryList"
  }, repositoryName ? _react.default.createElement(_repository_details.RepositoryDetails, {
    repositoryName: repositoryName,
    onClose: closeRepositoryDetails,
    onRepositoryDeleted: onRepositoryDeleted
  }) : null, content);
};

exports.RepositoryList = RepositoryList;