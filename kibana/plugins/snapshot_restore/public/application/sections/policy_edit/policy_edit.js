"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyEdit = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../common/constants");

var _components = require("../../components");

var _constants2 = require("../../constants");

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

var PolicyEdit = function PolicyEdit(_ref) {
  var name = _ref.match.params.name,
      history = _ref.history,
      pathname = _ref.location.pathname;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n; // Set breadcrumb and page title


  (0, _react.useEffect)(function () {
    _navigation.breadcrumbService.setBreadcrumbs('policyEdit');

    _navigation.docTitleService.setTitle('policyEdit');
  }, []); // Policy state with default empty policy

  var _useState = (0, _react.useState)({
    name: '',
    snapshotName: '',
    schedule: '',
    repository: '',
    config: {},
    retention: {
      expireAfterValue: '',
      expireAfterUnit: _constants.TIME_UNITS.DAY,
      maxCount: '',
      minCount: ''
    },
    isManagedPolicy: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      policy = _useState2[0],
      setPolicy = _useState2[1];

  var _useLoadIndices = (0, _http.useLoadIndices)(),
      errorLoadingIndices = _useLoadIndices.error,
      isLoadingIndices = _useLoadIndices.isLoading,
      _useLoadIndices$data = _useLoadIndices.data;

  _useLoadIndices$data = _useLoadIndices$data === void 0 ? {
    indices: []
  } : _useLoadIndices$data;
  var indices = _useLoadIndices$data.indices; // Load policy

  var _useLoadPolicy = (0, _http.useLoadPolicy)(name),
      errorLoadingPolicy = _useLoadPolicy.error,
      isLoadingPolicy = _useLoadPolicy.isLoading,
      policyData = _useLoadPolicy.data; // Update policy state when data is loaded


  (0, _react.useEffect)(function () {
    if (policyData && policyData.policy) {
      setPolicy(policyData.policy);
    }
  }, [policyData]); // Saving policy states

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isSaving = _useState4[0],
      setIsSaving = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      saveError = _useState6[0],
      setSaveError = _useState6[1]; // Save policy


  var onSave =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(editedPolicy) {
      var _ref3, error;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsSaving(true);
              setSaveError(null);
              _context.next = 4;
              return (0, _http.editPolicy)(editedPolicy);

            case 4:
              _ref3 = _context.sent;
              error = _ref3.error;
              setIsSaving(false);

              if (error) {
                setSaveError(error);
              } else {
                history.push("".concat(_constants2.BASE_PATH, "/policies/").concat(name));
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

  var onCancel = function onCancel() {
    history.push("".concat(_constants2.BASE_PATH, "/policies/").concat(name));
  };

  var renderLoading = function renderLoading() {
    return errorLoadingPolicy ? _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.editPolicy.loadingPolicyDescription",
      defaultMessage: "Loading policy details\u2026"
    })) : _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.editPolicy.loadingIndicesDescription",
      defaultMessage: "Loading available indices\u2026"
    }));
  };

  var renderError = function renderError() {
    if (errorLoadingPolicy) {
      var notFound = errorLoadingPolicy.status === 404;
      var errorObject = notFound ? {
        data: {
          error: i18n.translate('xpack.snapshotRestore.editPolicy.policyNotFoundErrorMessage', {
            defaultMessage: "The policy '{name}' does not exist.",
            values: {
              name: name
            }
          })
        }
      } : errorLoadingPolicy;
      return _react.default.createElement(_components.SectionError, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.editPolicy.loadingPolicyErrorTitle",
          defaultMessage: "Error loading policy details"
        }),
        error: errorObject
      });
    }

    if (errorLoadingIndices) {
      return _react.default.createElement(_components.SectionError, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.editPolicy.LoadingIndicesErrorMessage",
          defaultMessage: "Error loading available indices"
        }),
        error: errorLoadingIndices
      });
    }
  };

  var renderSaveError = function renderSaveError() {
    return saveError ? _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.editPolicy.savingPolicyErrorTitle",
        defaultMessage: "Cannot save policy"
      }),
      error: saveError
    }) : null;
  };

  var clearSaveError = function clearSaveError() {
    setSaveError(null);
  };

  var renderContent = function renderContent() {
    if (isLoadingPolicy || isLoadingIndices) {
      return renderLoading();
    }

    if (errorLoadingPolicy || errorLoadingIndices) {
      return renderError();
    }

    return _react.default.createElement(_react.default.Fragment, null, policy.isManagedPolicy ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      size: "m",
      color: "warning",
      iconType: "iInCircle",
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.editPolicy.managedPolicyWarningTitle",
        defaultMessage: "This is a managed policy. Changing this policy might affect other systems that use it. Proceed with caution."
      })
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    })) : null, _react.default.createElement(_components.PolicyForm, {
      policy: policy,
      indices: indices,
      currentUrl: pathname,
      isEditing: true,
      isSaving: isSaving,
      saveError: renderSaveError(),
      clearSaveError: clearSaveError,
      onSave: onSave,
      onCancel: onCancel
    }));
  };

  return _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", {
    "data-test-subj": "pageTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.editPolicyTitle",
    defaultMessage: "Edit policy"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), renderContent()));
};

exports.PolicyEdit = PolicyEdit;