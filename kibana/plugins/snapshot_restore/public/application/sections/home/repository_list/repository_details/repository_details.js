"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryDetails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

require("brace/theme/textmate");

var _app_context = require("../../../../app_context");

var _documentation = require("../../../../services/documentation");

var _http = require("../../../../services/http");

var _text = require("../../../../services/text");

var _navigation = require("../../../../services/navigation");

var _constants = require("../../../../../../common/constants");

var _components = require("../../../../components");

var _type_details = require("./type_details");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RepositoryDetails = function RepositoryDetails(_ref) {
  var repositoryName = _ref.repositoryName,
      onClose = _ref.onClose,
      onRepositoryDeleted = _ref.onRepositoryDeleted;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var _useLoadRepository = (0, _http.useLoadRepository)(repositoryName),
      error = _useLoadRepository.error,
      repositoryDetails = _useLoadRepository.data;

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      verification = _useState2[0],
      setVerification = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      cleanup = _useState4[0],
      setCleanup = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isLoadingVerification = _useState6[0],
      setIsLoadingVerification = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isLoadingCleanup = _useState8[0],
      setIsLoadingCleanup = _useState8[1];

  var verifyRepository =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _ref3, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoadingVerification(true);
              _context.next = 3;
              return (0, _http.verifyRepository)(repositoryName);

            case 3:
              _ref3 = _context.sent;
              data = _ref3.data;
              setVerification(data.verification);
              setIsLoadingVerification(false);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function verifyRepository() {
      return _ref2.apply(this, arguments);
    };
  }();

  var cleanupRepository =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _ref5, data;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setIsLoadingCleanup(true);
              _context2.next = 3;
              return (0, _http.cleanupRepository)(repositoryName);

            case 3:
              _ref5 = _context2.sent;
              data = _ref5.data;
              setCleanup(data.cleanup);
              setIsLoadingCleanup(false);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function cleanupRepository() {
      return _ref4.apply(this, arguments);
    };
  }(); // Reset verification state and cleanup when repository name changes, either from adjust URL or clicking
  // into a different repository in table list.


  (0, _react.useEffect)(function () {
    setVerification(undefined);
    setIsLoadingVerification(false);
    setCleanup(undefined);
    setIsLoadingCleanup(false);
  }, [repositoryName]);

  var renderBody = function renderBody() {
    if (repositoryDetails) {
      return renderRepository();
    }

    if (error) {
      return renderError();
    }

    return renderLoading();
  };

  var renderLoading = function renderLoading() {
    return _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.loadingRepositoryDescription",
      defaultMessage: "Loading repository\u2026"
    }));
  };

  var renderError = function renderError() {
    var notFound = error.status === 404;
    var errorObject = notFound ? {
      data: {
        error: i18n.translate('xpack.snapshotRestore.repositoryDetails.repositoryNotFoundErrorMessage', {
          defaultMessage: "The repository '{name}' does not exist.",
          values: {
            name: repositoryName
          }
        })
      }
    } : error;
    return _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.loadingRepositoryErrorTitle",
        defaultMessage: "Error loading repository"
      }),
      error: errorObject
    });
  };

  var renderSnapshotCount = function renderSnapshotCount() {
    var snapshots = repositoryDetails.snapshots;

    if (!Number.isInteger(snapshots.count)) {
      return _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.noSnapshotInformationDescription",
        defaultMessage: "No snapshot information"
      });
    }

    if (snapshots.count === 0) {
      return _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.zeroSnapshotsDescription",
        defaultMessage: "Repository has no snapshots"
      });
    }

    return _react.default.createElement(_eui.EuiLink, {
      href: (0, _navigation.linkToSnapshots)(repositoryName)
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.snapshotsDescription",
      defaultMessage: "{count} {count, plural, one {snapshot} other {snapshots}} found",
      values: {
        count: snapshots.count
      }
    }));
  };

  var renderRepository = function renderRepository() {
    var repository = repositoryDetails.repository,
        isManagedRepository = repositoryDetails.isManagedRepository;

    if (!repository) {
      return null;
    }

    var _ref6 = repository,
        type = _ref6.type;
    return _react.default.createElement(_react.Fragment, null, isManagedRepository ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      size: "s",
      color: "warning",
      iconType: "iInCircle",
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.managedRepositoryWarningTitle",
        defaultMessage: "This is a managed repository used by other systems. Any changes you make might affect how these systems operate."
      })
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    })) : null, _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "spaceBetween",
      alignItems: "flexStart"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.typeTitle",
      defaultMessage: "Repository type"
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement("span", {
      "data-test-subj": "repositoryType"
    }, type === _constants.REPOSITORY_TYPES.source ? _text.textService.getRepositoryTypeName(type, repository.settings.delegateType) : _text.textService.getRepositoryTypeName(type))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      size: "s",
      flush: "right",
      href: _documentation.documentationLinksService.getRepositoryTypeDocUrl(type),
      target: "_blank",
      iconType: "help",
      "data-test-subj": "documentationLink"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.repositoryTypeDocLink",
      defaultMessage: "Repository docs"
    })))), _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }), _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.snapshotsTitle",
      defaultMessage: "Snapshots"
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement("span", {
      "data-test-subj": "snapshotCount"
    }, renderSnapshotCount()), _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }), _react.default.createElement(_type_details.TypeDetails, {
      repository: repository
    }), _react.default.createElement(_eui.EuiHorizontalRule, null), renderVerification(), _react.default.createElement(_eui.EuiHorizontalRule, null), renderCleanup());
  };

  var renderVerification = function renderVerification() {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.verificationTitle",
      defaultMessage: "Verification status"
    }))), verification ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_components.RepositoryVerificationBadge, {
      verificationResults: verification
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiTitle, {
      size: "xs"
    }, _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.verificationDetailsTitle",
      defaultMessage: "Details"
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), verification ? _react.default.createElement(_eui.EuiCodeBlock, {
      language: "json",
      inline: false,
      "data-test-subj": "verificationCodeBlock"
    }, JSON.stringify(verification.valid ? verification.response : verification.error, null, 2)) : null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiButton, {
      onClick: verifyRepository,
      color: "primary",
      isLoading: isLoadingVerification
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.verifyButtonLabel",
      defaultMessage: "Verify repository"
    }))) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiButton, {
      onClick: verifyRepository,
      color: "primary",
      isLoading: isLoadingVerification,
      "data-test-subj": "verifyRepositoryButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.verifyButtonLabel",
      defaultMessage: "Verify repository"
    }))));
  };

  var renderCleanup = function renderCleanup() {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.cleanupTitle",
      defaultMessage: "Repository cleanup"
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.cleanupRepositoryMessage",
      defaultMessage: "You can clean up a repository to delete any unreferenced data from a snapshot. This may provide storage space savings. Note: If you regularly delete snapshots, this functionality will likely not be as beneficial and should be used less frequently."
    }))), cleanup ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), cleanup.cleaned ? _react.default.createElement("div", null, _react.default.createElement(_eui.EuiTitle, {
      size: "xs"
    }, _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.cleanupDetailsTitle",
      defaultMessage: "Details"
    }))), _react.default.createElement(_eui.EuiCodeBlock, {
      language: "json",
      inline: false,
      "data-test-subj": "cleanupCodeBlock"
    }, JSON.stringify(cleanup.response, null, 2))) : _react.default.createElement(_eui.EuiCallOut, {
      color: "danger",
      iconType: "alert",
      title: i18n.translate('xpack.snapshotRestore.repositoryDetails.cleanupErrorTitle', {
        defaultMessage: 'Sorry, there was an error cleaning the repository.'
      })
    }, _react.default.createElement("p", null, cleanup.error ? JSON.stringify(cleanup.error) : i18n.translate('xpack.snapshotRestore.repositoryDetails.cleanupUnknownError', {
      defaultMessage: '503: Unknown error'
    })))) : null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiButton, {
      onClick: cleanupRepository,
      color: "primary",
      isLoading: isLoadingCleanup,
      "data-test-subj": "cleanupRepositoryButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.cleanupButtonLabel",
      defaultMessage: "Clean up repository"
    })));
  };

  var renderFooter = function renderFooter() {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "spaceBetween",
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      iconType: "cross",
      flush: "left",
      onClick: onClose,
      "data-test-subj": "srRepositoryDetailsFlyoutCloseButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.closeButtonLabel",
      defaultMessage: "Close"
    }))), repositoryDetails ? _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_components.RepositoryDeleteProvider, null, function (deleteRepositoryPrompt) {
      return _react.default.createElement(_eui.EuiButtonEmpty, {
        color: "danger",
        "data-test-subj": "srRepositoryDetailsDeleteActionButton",
        onClick: function onClick() {
          return deleteRepositoryPrompt([repositoryName], onRepositoryDeleted);
        },
        isDisabled: repositoryDetails.isManagedRepository,
        title: repositoryDetails.isManagedRepository ? i18n.translate('xpack.snapshotRestore.repositoryDetails.removeManagedRepositoryButtonTitle', {
          defaultMessage: 'You cannot delete a managed repository.'
        }) : undefined
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.removeButtonLabel",
        defaultMessage: "Remove"
      }));
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButton, {
      href: (0, _navigation.linkToEditRepository)(repositoryName),
      fill: true,
      color: "primary"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.editButtonLabel",
      defaultMessage: "Edit"
    }))))) : null);
  };

  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: onClose,
    "data-test-subj": "repositoryDetail",
    "aria-labelledby": "srRepositoryDetailsFlyoutTitle",
    size: "m",
    maxWidth: 550
  }, _react.default.createElement(_eui.EuiFlyoutHeader, null, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h2", {
    id: "srRepositoryDetailsFlyoutTitle",
    "data-test-subj": "title"
  }, repositoryName))), _react.default.createElement(_eui.EuiFlyoutBody, {
    "data-test-subj": "content"
  }, renderBody()), _react.default.createElement(_eui.EuiFlyoutFooter, null, renderFooter()));
};

exports.RepositoryDetails = RepositoryDetails;