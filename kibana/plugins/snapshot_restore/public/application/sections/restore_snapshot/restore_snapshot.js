"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestoreSnapshot = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../constants");

var _components = require("../../components");

var _app_context = require("../../app_context");

var _navigation = require("../../services/navigation");

var _http = require("../../services/http");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RestoreSnapshot = function RestoreSnapshot(_ref) {
  var _ref$match$params = _ref.match.params,
      repositoryName = _ref$match$params.repositoryName,
      snapshotId = _ref$match$params.snapshotId,
      history = _ref.history;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n; // Set breadcrumb and page title


  (0, _react.useEffect)(function () {
    _navigation.breadcrumbService.setBreadcrumbs('restoreSnapshot');

    _navigation.docTitleService.setTitle('restoreSnapshot');
  }, []); // Snapshot details state with default empty snapshot

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      snapshotDetails = _useState2[0],
      setSnapshotDetails = _useState2[1]; // Load snapshot


  var _useLoadSnapshot = (0, _http.useLoadSnapshot)(repositoryName, snapshotId),
      snapshotError = _useLoadSnapshot.error,
      loadingSnapshot = _useLoadSnapshot.isLoading,
      snapshotData = _useLoadSnapshot.data; // Update repository state when data is loaded


  (0, _react.useEffect)(function () {
    if (snapshotData) {
      setSnapshotDetails(snapshotData);
    }
  }, [snapshotData]); // Saving repository states

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isSaving = _useState4[0],
      setIsSaving = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      saveError = _useState6[0],
      setSaveError = _useState6[1]; // Execute restore


  var onSave =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(restoreSettings) {
      var _ref3, error;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsSaving(true);
              setSaveError(null);
              _context.next = 4;
              return (0, _http.executeRestore)(repositoryName, snapshotId, restoreSettings);

            case 4:
              _ref3 = _context.sent;
              error = _ref3.error;

              if (error) {
                setIsSaving(false);
                setSaveError(error);
              } else {
                // Wait a few seconds before redirecting so that restore information has time to
                // populate into master node
                setTimeout(function () {
                  setIsSaving(false);
                  history.push("".concat(_constants.BASE_PATH, "/restore_status"));
                }, 5 * 1000);
              }

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onSave(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var renderLoading = function renderLoading() {
    return _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreSnapshot.loadingSnapshotDescription",
      defaultMessage: "Loading snapshot details\u2026"
    }));
  };

  var renderError = function renderError() {
    var notFound = snapshotError.status === 404;
    var errorObject = notFound ? {
      data: {
        error: i18n.translate('xpack.snapshotRestore.restoreSnapshot.snapshotNotFoundErrorMessage', {
          defaultMessage: "The snapshot '{snapshot}' does not exist in repository '{repository}'.",
          values: {
            snapshot: snapshotId,
            repository: repositoryName
          }
        })
      }
    } : snapshotError;
    return _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.restoreSnapshot.loadingSnapshotErrorTitle",
        defaultMessage: "Error loading snapshot details"
      }),
      error: errorObject
    });
  };

  var renderSaveError = function renderSaveError() {
    return saveError ? _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.restoreSnapshot.executeRestoreErrorTitle",
        defaultMessage: "Unable to restore snapshot"
      }),
      error: saveError
    }) : null;
  };

  var clearSaveError = function clearSaveError() {
    setSaveError(null);
  };

  var renderContent = function renderContent() {
    if (loadingSnapshot) {
      return renderLoading();
    }

    if (snapshotError) {
      return renderError();
    }

    return _react.default.createElement(_components.RestoreSnapshotForm, {
      snapshotDetails: snapshotDetails,
      isSaving: isSaving,
      saveError: renderSaveError(),
      clearSaveError: clearSaveError,
      onSave: onSave
    });
  };

  return _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.restoreSnapshotTitle",
    defaultMessage: "Restore '{snapshot}'",
    values: {
      snapshot: snapshotId
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), renderContent()));
};

exports.RestoreSnapshot = RestoreSnapshot;