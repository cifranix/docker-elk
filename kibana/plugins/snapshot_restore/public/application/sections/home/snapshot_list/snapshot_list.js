"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _queryString = require("query-string");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../../common/constants");

var _components = require("../../../components");

var _constants2 = require("../../../constants");

var _authorization = require("../../../lib/authorization");

var _documentation = require("../../../services/documentation");

var _http = require("../../../services/http");

var _navigation = require("../../../services/navigation");

var _app_context = require("../../../app_context");

var _snapshot_details = require("./snapshot_details");

var _snapshot_table = require("./snapshot_table");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SnapshotList = function SnapshotList(_ref) {
  var _ref$match$params = _ref.match.params,
      repositoryName = _ref$match$params.repositoryName,
      snapshotId = _ref$match$params.snapshotId,
      search = _ref.location.search,
      history = _ref.history;

  var _useLoadSnapshots = (0, _http.useLoadSnapshots)(),
      error = _useLoadSnapshots.error,
      isLoading = _useLoadSnapshots.isLoading,
      _useLoadSnapshots$dat = _useLoadSnapshots.data,
      _useLoadSnapshots$dat2 = _useLoadSnapshots$dat.snapshots,
      snapshots = _useLoadSnapshots$dat2 === void 0 ? [] : _useLoadSnapshots$dat2,
      _useLoadSnapshots$dat3 = _useLoadSnapshots$dat.repositories,
      repositories = _useLoadSnapshots$dat3 === void 0 ? [] : _useLoadSnapshots$dat3,
      _useLoadSnapshots$dat4 = _useLoadSnapshots$dat.policies,
      policies = _useLoadSnapshots$dat4 === void 0 ? [] : _useLoadSnapshots$dat4,
      _useLoadSnapshots$dat5 = _useLoadSnapshots$dat.errors,
      errors = _useLoadSnapshots$dat5 === void 0 ? {} : _useLoadSnapshots$dat5,
      reload = _useLoadSnapshots.sendRequest;

  var _useServices = (0, _app_context.useServices)(),
      uiMetricService = _useServices.uiMetricService;

  var openSnapshotDetailsUrl = function openSnapshotDetailsUrl(repositoryNameToOpen, snapshotIdToOpen) {
    return (0, _navigation.linkToSnapshot)(repositoryNameToOpen, snapshotIdToOpen);
  };

  var closeSnapshotDetails = function closeSnapshotDetails() {
    history.push("".concat(_constants2.BASE_PATH, "/snapshots"));
  };

  var onSnapshotDeleted = function onSnapshotDeleted(snapshotsDeleted) {
    if (repositoryName && snapshotId && snapshotsDeleted.find(function (_ref2) {
      var snapshot = _ref2.snapshot,
          repository = _ref2.repository;
      return snapshot === snapshotId && repository === repositoryName;
    })) {
      closeSnapshotDetails();
    }

    if (snapshotsDeleted.length) {
      reload();
    }
  }; // Allow deeplinking to list pre-filtered by repository name or by policy name


  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      filteredRepository = _useState2[0],
      setFilteredRepository = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      filteredPolicy = _useState4[0],
      setFilteredPolicy = _useState4[1];

  (0, _react.useEffect)(function () {
    if (search) {
      var parsedParams = (0, _queryString.parse)(search.replace(/^\?/, ''), {
        sort: false
      });
      var repository = parsedParams.repository,
          policy = parsedParams.policy;

      if (policy && policy !== filteredPolicy) {
        setFilteredPolicy(String(policy));
        history.replace("".concat(_constants2.BASE_PATH, "/snapshots"));
      } else if (repository && repository !== filteredRepository) {
        setFilteredRepository(String(repository));
        history.replace("".concat(_constants2.BASE_PATH, "/snapshots"));
      }
    }
  }, [filteredPolicy, filteredRepository, history, search]); // Track component loaded

  (0, _react.useEffect)(function () {
    uiMetricService.trackUiMetric(_constants2.UIM_SNAPSHOT_LIST_LOAD);
  }, [uiMetricService]);
  var content;

  if (isLoading) {
    content = _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.snapshotList.loadingSnapshotsDescription",
      defaultMessage: "Loading snapshots\u2026"
    }));
  } else if (error) {
    content = _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotList.loadingSnapshotsErrorMessage",
        defaultMessage: "Error loading snapshots"
      }),
      error: error
    });
  } else if (Object.keys(errors).length && repositories.length === 0) {
    content = _react.default.createElement(_eui.EuiEmptyPrompt, {
      iconType: "managementApp",
      title: _react.default.createElement("h1", {
        "data-test-subj": "title"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotList.emptyPrompt.errorRepositoriesTitle",
        defaultMessage: "Some repositories contain errors"
      })),
      body: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotList.emptyPrompt.repositoryWarningDescription",
        defaultMessage: "Go to {repositoryLink} to fix the errors.",
        values: {
          repositoryLink: _react.default.createElement(_eui.EuiLink, {
            href: (0, _navigation.linkToRepositories)()
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.snapshotRestore.repositoryWarningLinkText",
            defaultMessage: "Repositories"
          }))
        }
      }))
    });
  } else if (repositories.length === 0) {
    content = _react.default.createElement(_eui.EuiEmptyPrompt, {
      iconType: "managementApp",
      title: _react.default.createElement("h1", {
        "data-test-subj": "title"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotList.emptyPrompt.noRepositoriesTitle",
        defaultMessage: "Start by registering a repository"
      })),
      body: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotList.emptyPrompt.noRepositoriesDescription",
        defaultMessage: "You need a place where your snapshots will live."
      })), _react.default.createElement("p", null, _react.default.createElement(_eui.EuiButton, {
        href: (0, _navigation.linkToAddRepository)(),
        fill: true,
        iconType: "plusInCircle",
        "data-test-subj": "registerRepositoryButton"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotList.emptyPrompt.noRepositoriesAddButtonLabel",
        defaultMessage: "Register a repository"
      })))),
      "data-test-subj": "emptyPrompt"
    });
  } else if (snapshots.length === 0) {
    content = _react.default.createElement(_eui.EuiEmptyPrompt, {
      iconType: "managementApp",
      title: _react.default.createElement("h1", {
        "data-test-subj": "title"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotList.emptyPrompt.noSnapshotsTitle",
        defaultMessage: "You don't have any snapshots yet"
      })),
      body: _react.default.createElement(_authorization.WithPrivileges, {
        privileges: _constants.APP_SLM_CLUSTER_PRIVILEGES.map(function (name) {
          return "cluster.".concat(name);
        })
      }, function (_ref3) {
        var hasPrivileges = _ref3.hasPrivileges;
        return hasPrivileges ? _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.snapshotList.emptyPrompt.usePolicyDescription",
          defaultMessage: "Run a Snapshot Lifecycle Policy to create a snapshot. Snapshots can also be created by using {docLink}.",
          values: {
            docLink: _react.default.createElement(_eui.EuiLink, {
              href: _documentation.documentationLinksService.getSnapshotDocUrl(),
              target: "_blank",
              "data-test-subj": "documentationLink"
            }, _react.default.createElement(_react2.FormattedMessage, {
              id: "xpack.snapshotRestore.emptyPrompt.usePolicyDocLinkText",
              defaultMessage: "the Elasticsearch API"
            }))
          }
        })), _react.default.createElement("p", null, policies.length === 0 ? _react.default.createElement(_eui.EuiButton, {
          href: (0, _navigation.linkToAddPolicy)(),
          fill: true,
          iconType: "plusInCircle",
          "data-test-subj": "addPolicyButton"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.snapshotList.emptyPrompt.addPolicyText",
          defaultMessage: "Create a policy"
        })) : _react.default.createElement(_eui.EuiButton, {
          href: (0, _navigation.linkToPolicies)(),
          fill: true,
          iconType: "list",
          "data-test-subj": "goToPoliciesButton"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.snapshotList.emptyPrompt.goToPoliciesText",
          defaultMessage: "View policies"
        })))) : _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.snapshotList.emptyPrompt.noSnapshotsDescription",
          defaultMessage: "Create a snapshot using the Elasticsearch API."
        })), _react.default.createElement("p", null, _react.default.createElement(_eui.EuiLink, {
          href: _documentation.documentationLinksService.getSnapshotDocUrl(),
          target: "_blank",
          "data-test-subj": "documentationLink"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.emptyPrompt.noSnapshotsDocLinkText",
          defaultMessage: "Learn how to create a snapshot"
        }), ' ', _react.default.createElement(_eui.EuiIcon, {
          type: "link"
        }))));
      }),
      "data-test-subj": "emptyPrompt"
    });
  } else {
    var repositoryErrorsWarning = Object.keys(errors).length ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryWarningTitle",
        defaultMessage: "Some repositories contain errors"
      }),
      color: "warning",
      iconType: "alert"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryWarningDescription",
      defaultMessage: "Snapshots might load slowly. Go to {repositoryLink} to fix the errors.",
      values: {
        repositoryLink: _react.default.createElement(_eui.EuiLink, {
          href: (0, _navigation.linkToRepositories)()
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.repositoryWarningLinkText",
          defaultMessage: "Repositories"
        }))
      }
    })), _react.default.createElement(_eui.EuiSpacer, null)) : null;
    content = _react.default.createElement(_react.Fragment, null, repositoryErrorsWarning, _react.default.createElement(_snapshot_table.SnapshotTable, {
      snapshots: snapshots,
      repositories: repositories,
      reload: reload,
      openSnapshotDetailsUrl: openSnapshotDetailsUrl,
      onSnapshotDeleted: onSnapshotDeleted,
      repositoryFilter: filteredRepository,
      policyFilter: filteredPolicy
    }));
  }

  return _react.default.createElement("section", {
    "data-test-subj": "snapshotList"
  }, repositoryName && snapshotId ? _react.default.createElement(_snapshot_details.SnapshotDetails, {
    repositoryName: repositoryName,
    snapshotId: snapshotId,
    onClose: closeSnapshotDetails,
    onSnapshotDeleted: onSnapshotDeleted
  }) : null, content);
};

exports.SnapshotList = SnapshotList;