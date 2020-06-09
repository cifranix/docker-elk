"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryEdit = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _components = require("../../components");

var _constants = require("../../constants");

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

var RepositoryEdit = function RepositoryEdit(_ref) {
  var name = _ref.match.params.name,
      history = _ref.history;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var section = 'repositories'; // Set breadcrumb and page title

  (0, _react.useEffect)(function () {
    _navigation.breadcrumbService.setBreadcrumbs('repositoryEdit');

    _navigation.docTitleService.setTitle('repositoryEdit');
  }, []); // Repository state with default empty repository

  var _useState = (0, _react.useState)({
    name: '',
    type: null,
    settings: {}
  }),
      _useState2 = _slicedToArray(_useState, 2),
      repository = _useState2[0],
      setRepository = _useState2[1]; // Load repository


  var _useLoadRepository = (0, _http.useLoadRepository)(name),
      repositoryError = _useLoadRepository.error,
      loadingRepository = _useLoadRepository.isLoading,
      repositoryData = _useLoadRepository.data; // Update repository state when data is loaded


  (0, _react.useEffect)(function () {
    if (repositoryData && repositoryData.repository) {
      setRepository(repositoryData.repository);
    }
  }, [repositoryData]); // Saving repository states

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isSaving = _useState4[0],
      setIsSaving = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      saveError = _useState6[0],
      setSaveError = _useState6[1]; // Save repository


  var onSave =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(editedRepository) {
      var _ref3, error;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsSaving(true);
              setSaveError(null);
              _context.next = 4;
              return (0, _http.editRepository)(editedRepository);

            case 4:
              _ref3 = _context.sent;
              error = _ref3.error;
              setIsSaving(false);

              if (error) {
                setSaveError(error);
              } else {
                history.push("".concat(_constants.BASE_PATH, "/").concat(section, "/").concat(name));
              }

            case 8:
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
      id: "xpack.snapshotRestore.editRepository.loadingRepositoryDescription",
      defaultMessage: "Loading repository details\u2026"
    }));
  };

  var renderError = function renderError() {
    var notFound = repositoryError.status === 404;
    var errorObject = notFound ? {
      data: {
        error: i18n.translate('xpack.snapshotRestore.editRepository.repositoryNotFoundErrorMessage', {
          defaultMessage: "The repository '{name}' does not exist.",
          values: {
            name: name
          }
        })
      }
    } : repositoryError;
    return _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.editRepository.loadingRepositoryErrorTitle",
        defaultMessage: "Error loading repository details"
      }),
      error: errorObject
    });
  };

  var renderSaveError = function renderSaveError() {
    return saveError ? _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.editRepository.savingRepositoryErrorTitle",
        defaultMessage: "Cannot save repository"
      }),
      error: saveError
    }) : null;
  };

  var clearSaveError = function clearSaveError() {
    setSaveError(null);
  };

  var renderContent = function renderContent() {
    if (loadingRepository) {
      return renderLoading();
    }

    if (repositoryError) {
      return renderError();
    }

    var isManagedRepository = repositoryData.isManagedRepository;
    return _react.default.createElement(_react.Fragment, null, isManagedRepository ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      size: "m",
      color: "warning",
      iconType: "iInCircle",
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.editRepository.managedRepositoryWarningTitle",
        defaultMessage: "This is a managed repository. Changing this repository might affect other systems that use it. Proceed with caution."
      })
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    })) : null, _react.default.createElement(_components.RepositoryForm, {
      repository: repository,
      isManagedRepository: isManagedRepository,
      isEditing: true,
      isSaving: isSaving,
      saveError: renderSaveError(),
      clearSaveError: clearSaveError,
      onSave: onSave
    }));
  };

  return _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.editRepositoryTitle",
    defaultMessage: "Edit repository"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), renderContent()));
};

exports.RepositoryEdit = RepositoryEdit;