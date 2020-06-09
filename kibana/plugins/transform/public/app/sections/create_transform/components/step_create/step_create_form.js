"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultStepCreateState = getDefaultStepCreateState;
exports.StepCreateForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _public = require("../../../../../../../../../src/plugins/kibana_react/public");

var _constants = require("../../../../../../common/constants");

var _shared_imports = require("../../../../../shared_imports");

var _common = require("../../../../common");

var _use_api = require("../../../../hooks/use_api");

var _app_dependencies = require("../../../../app_dependencies");

var _navigation = require("../../../../common/navigation");

var _components = require("../../../../components");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDefaultStepCreateState() {
  return {
    created: false,
    started: false,
    indexPatternId: undefined
  };
}

var StepCreateForm = _react.default.memo(function (_ref) {
  var createIndexPattern = _ref.createIndexPattern,
      transformConfig = _ref.transformConfig,
      transformId = _ref.transformId,
      onChange = _ref.onChange,
      overrides = _ref.overrides;

  var defaults = _objectSpread({}, getDefaultStepCreateState(), {}, overrides);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      redirectToTransformManagement = _useState2[0],
      setRedirectToTransformManagement = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(defaults.created),
      _useState6 = _slicedToArray(_useState5, 2),
      created = _useState6[0],
      setCreated = _useState6[1];

  var _useState7 = (0, _react.useState)(defaults.started),
      _useState8 = _slicedToArray(_useState7, 2),
      started = _useState8[0],
      setStarted = _useState8[1];

  var _useState9 = (0, _react.useState)(defaults.indexPatternId),
      _useState10 = _slicedToArray(_useState9, 2),
      indexPatternId = _useState10[0],
      setIndexPatternId = _useState10[1];

  var _useState11 = (0, _react.useState)(undefined),
      _useState12 = _slicedToArray(_useState11, 2),
      progressPercentComplete = _useState12[0],
      setProgressPercentComplete = _useState12[1];

  var deps = (0, _app_dependencies.useAppDependencies)();
  var indexPatterns = deps.data.indexPatterns;
  var uiSettings = deps.uiSettings;
  var toastNotifications = (0, _app_dependencies.useToastNotifications)();
  (0, _react.useEffect)(function () {
    onChange({
      created: created,
      started: started,
      indexPatternId: indexPatternId
    }); // custom comparison
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [created, started, indexPatternId]);
  var api = (0, _use_api.useApi)();

  function createTransform() {
    return _createTransform.apply(this, arguments);
  }

  function _createTransform() {
    _createTransform = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var resp;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setLoading(true);
              _context3.prev = 1;
              _context3.next = 4;
              return api.createTransform(transformId, transformConfig);

            case 4:
              resp = _context3.sent;

              if (!(resp.errors !== undefined && Array.isArray(resp.errors))) {
                _context3.next = 10;
                break;
              }

              if (!(resp.errors.length === 1)) {
                _context3.next = 8;
                break;
              }

              throw resp.errors[0];

            case 8:
              if (!(resp.errors.length > 1)) {
                _context3.next = 10;
                break;
              }

              throw resp.errors;

            case 10:
              toastNotifications.addSuccess(_i18n.i18n.translate('xpack.transform.stepCreateForm.createTransformSuccessMessage', {
                defaultMessage: 'Request to create transform {transformId} acknowledged.',
                values: {
                  transformId: transformId
                }
              }));
              setCreated(true);
              setLoading(false);
              _context3.next = 21;
              break;

            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](1);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.transform.stepCreateForm.createTransformErrorMessage', {
                  defaultMessage: 'An error occurred creating the transform {transformId}:',
                  values: {
                    transformId: transformId
                  }
                }),
                text: (0, _public.toMountPoint)(_react.default.createElement(_components.ToastNotificationText, {
                  overlays: deps.overlays,
                  text: (0, _shared_imports.getErrorMessage)(_context3.t0)
                }))
              });
              setCreated(false);
              setLoading(false);
              return _context3.abrupt("return", false);

            case 21:
              if (createIndexPattern) {
                createKibanaIndexPattern();
              }

              return _context3.abrupt("return", true);

            case 23:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 15]]);
    }));
    return _createTransform.apply(this, arguments);
  }

  function startTransform() {
    return _startTransform.apply(this, arguments);
  }

  function _startTransform() {
    _startTransform = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var _resp$transformId, resp, _resp$transformId2, errorMessage;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              setLoading(true);
              _context4.prev = 1;
              _context4.next = 4;
              return api.startTransforms([{
                id: transformId
              }]);

            case 4:
              resp = _context4.sent;

              if (!(_typeof(resp) === 'object' && resp !== null && ((_resp$transformId = resp[transformId]) === null || _resp$transformId === void 0 ? void 0 : _resp$transformId.success) === true)) {
                _context4.next = 11;
                break;
              }

              toastNotifications.addSuccess(_i18n.i18n.translate('xpack.transform.stepCreateForm.startTransformSuccessMessage', {
                defaultMessage: 'Request to start transform {transformId} acknowledged.',
                values: {
                  transformId: transformId
                }
              }));
              setStarted(true);
              setLoading(false);
              _context4.next = 13;
              break;

            case 11:
              errorMessage = _typeof(resp) === 'object' && resp !== null && ((_resp$transformId2 = resp[transformId]) === null || _resp$transformId2 === void 0 ? void 0 : _resp$transformId2.success) === false ? resp[transformId].error : resp;
              throw new Error(errorMessage);

            case 13:
              _context4.next = 20;
              break;

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](1);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.transform.stepCreateForm.startTransformErrorMessage', {
                  defaultMessage: 'An error occurred starting the transform {transformId}:',
                  values: {
                    transformId: transformId
                  }
                }),
                text: (0, _public.toMountPoint)(_react.default.createElement(_components.ToastNotificationText, {
                  overlays: deps.overlays,
                  text: (0, _shared_imports.getErrorMessage)(_context4.t0)
                }))
              });
              setStarted(false);
              setLoading(false);

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 15]]);
    }));
    return _startTransform.apply(this, arguments);
  }

  function createAndStartTransform() {
    return _createAndStartTransform.apply(this, arguments);
  }

  function _createAndStartTransform() {
    _createAndStartTransform = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var acknowledged;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return createTransform();

            case 2:
              acknowledged = _context5.sent;

              if (!acknowledged) {
                _context5.next = 6;
                break;
              }

              _context5.next = 6;
              return startTransform();

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _createAndStartTransform.apply(this, arguments);
  }

  var createKibanaIndexPattern =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var indexPatternName, newIndexPattern, id;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(true);
              indexPatternName = transformConfig.dest.index;
              _context.prev = 2;
              _context.next = 5;
              return indexPatterns.make();

            case 5:
              newIndexPattern = _context.sent;
              Object.assign(newIndexPattern, {
                id: '',
                title: indexPatternName
              });
              _context.next = 9;
              return newIndexPattern.create();

            case 9:
              id = _context.sent;
              _context.next = 12;
              return indexPatterns.clearCache();

            case 12:
              if (!(id === false)) {
                _context.next = 16;
                break;
              }

              toastNotifications.addDanger(_i18n.i18n.translate('xpack.transform.stepCreateForm.duplicateIndexPatternErrorMessage', {
                defaultMessage: 'An error occurred creating the Kibana index pattern {indexPatternName}: The index pattern already exists.',
                values: {
                  indexPatternName: indexPatternName
                }
              }));
              setLoading(false);
              return _context.abrupt("return");

            case 16:
              if (uiSettings.get('defaultIndex')) {
                _context.next = 19;
                break;
              }

              _context.next = 19;
              return uiSettings.set('defaultIndex', id);

            case 19:
              toastNotifications.addSuccess(_i18n.i18n.translate('xpack.transform.stepCreateForm.createIndexPatternSuccessMessage', {
                defaultMessage: 'Kibana index pattern {indexPatternName} created successfully.',
                values: {
                  indexPatternName: indexPatternName
                }
              }));
              setIndexPatternId(id);
              setLoading(false);
              return _context.abrupt("return", true);

            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](2);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.transform.stepCreateForm.createIndexPatternErrorMessage', {
                  defaultMessage: 'An error occurred creating the Kibana index pattern {indexPatternName}:',
                  values: {
                    indexPatternName: indexPatternName
                  }
                }),
                text: (0, _public.toMountPoint)(_react.default.createElement(_components.ToastNotificationText, {
                  overlays: deps.overlays,
                  text: (0, _shared_imports.getErrorMessage)(_context.t0)
                }))
              });
              setLoading(false);
              return _context.abrupt("return", false);

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 25]]);
    }));

    return function createKibanaIndexPattern() {
      return _ref2.apply(this, arguments);
    };
  }();

  var isBatchTransform = typeof transformConfig.sync === 'undefined';

  if (loading === false && started === true && progressPercentComplete === undefined && isBatchTransform) {
    // wrapping in function so we can keep the interval id in local scope
    var startProgressBar = function startProgressBar() {
      var interval = setInterval(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var stats, percent;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return api.getTransformsStats(transformId);

              case 3:
                stats = _context2.sent;

                if (stats && Array.isArray(stats.transforms) && stats.transforms.length > 0) {
                  percent = (0, _common.getTransformProgress)({
                    id: transformConfig.id,
                    config: transformConfig,
                    stats: stats.transforms[0]
                  }) || 0;
                  setProgressPercentComplete(percent);

                  if (percent >= 100) {
                    clearInterval(interval);
                  }
                }

                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                toastNotifications.addDanger({
                  title: _i18n.i18n.translate('xpack.transform.stepCreateForm.progressErrorMessage', {
                    defaultMessage: 'An error occurred getting the progress percentage:'
                  }),
                  text: (0, _public.toMountPoint)(_react.default.createElement(_components.ToastNotificationText, {
                    overlays: deps.overlays,
                    text: (0, _shared_imports.getErrorMessage)(_context2.t0)
                  }))
                });
                clearInterval(interval);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      })), _constants.PROGRESS_REFRESH_INTERVAL_MS);
      setProgressPercentComplete(0);
    };

    startProgressBar();
  }

  function getTransformConfigDevConsoleStatement() {
    return "PUT _transform/".concat(transformId, "\n").concat(JSON.stringify(transformConfig, null, 2), "\n\n");
  } // TODO move this to SASS


  var FLEX_GROUP_STYLE = {
    height: '90px',
    maxWidth: '800px'
  };
  var FLEX_ITEM_STYLE = {
    width: '200px'
  };
  var PANEL_ITEM_STYLE = {
    width: '300px'
  };

  if (redirectToTransformManagement) {
    return _react.default.createElement(_navigation.RedirectToTransformManagement, null);
  }

  return _react.default.createElement("div", {
    "data-test-subj": "transformStepCreateForm"
  }, _react.default.createElement(_eui.EuiForm, null, !created && _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    style: FLEX_GROUP_STYLE
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: FLEX_ITEM_STYLE
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    isDisabled: loading || created && started,
    onClick: createAndStartTransform,
    "data-test-subj": "transformWizardCreateAndStartButton"
  }, _i18n.i18n.translate('xpack.transform.stepCreateForm.createAndStartTransformButton', {
    defaultMessage: 'Create and start'
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "s"
  }, _i18n.i18n.translate('xpack.transform.stepCreateForm.createAndStartTransformDescription', {
    defaultMessage: 'Creates and starts the transform. A transform will increase search and indexing load in your cluster. Please stop the transform if excessive load is experienced. After the transform is started, you will be offered options to continue exploring the transform.'
  })))), created && _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    style: FLEX_GROUP_STYLE
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: FLEX_ITEM_STYLE
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    isDisabled: loading || created && started,
    onClick: startTransform,
    "data-test-subj": "transformWizardStartButton"
  }, _i18n.i18n.translate('xpack.transform.stepCreateForm.startTransformButton', {
    defaultMessage: 'Start'
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "s"
  }, _i18n.i18n.translate('xpack.transform.stepCreateForm.startTransformDescription', {
    defaultMessage: 'Starts the transform. A transform will increase search and indexing load in your cluster. Please stop the transform if excessive load is experienced. After the transform is started, you will be offered options to continue exploring the transform.'
  })))), _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    style: FLEX_GROUP_STYLE
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: FLEX_ITEM_STYLE
  }, _react.default.createElement(_eui.EuiButton, {
    isDisabled: loading || created,
    onClick: createTransform,
    "data-test-subj": "transformWizardCreateButton"
  }, _i18n.i18n.translate('xpack.transform.stepCreateForm.createTransformButton', {
    defaultMessage: 'Create'
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "s"
  }, _i18n.i18n.translate('xpack.transform.stepCreateForm.createTransformDescription', {
    defaultMessage: 'Create the transform without starting it. You will be able to start the transform later by returning to the transforms list.'
  })))), _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    style: FLEX_GROUP_STYLE
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: FLEX_ITEM_STYLE
  }, _react.default.createElement(_eui.EuiCopy, {
    textToCopy: getTransformConfigDevConsoleStatement()
  }, function (copy) {
    return _react.default.createElement(_eui.EuiButton, {
      onClick: copy,
      style: {
        width: '100%'
      },
      "data-test-subj": "transformWizardCopyToClipboardButton"
    }, _i18n.i18n.translate('xpack.transform.stepCreateForm.copyTransformConfigToClipboardButton', {
      defaultMessage: 'Copy to clipboard'
    }));
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "s"
  }, _i18n.i18n.translate('xpack.transform.stepCreateForm.copyTransformConfigToClipboardDescription', {
    defaultMessage: 'Copies to the clipboard the Kibana Dev Console command for creating the transform.'
  })))), progressPercentComplete !== undefined && isBatchTransform && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement("strong", null, _i18n.i18n.translate('xpack.transform.stepCreateForm.progressTitle', {
    defaultMessage: 'Progress'
  }))), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      width: '400px'
    },
    grow: false
  }, _react.default.createElement(_eui.EuiProgress, {
    size: "l",
    color: "primary",
    value: progressPercentComplete,
    max: 100,
    "data-test-subj": "transformWizardProgressBar"
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, progressPercentComplete, "%")))), created && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_eui.EuiFlexGrid, {
    gutterSize: "l"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    style: PANEL_ITEM_STYLE
  }, _react.default.createElement(_eui.EuiCard, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      size: "xxl",
      type: "list"
    }),
    title: _i18n.i18n.translate('xpack.transform.stepCreateForm.transformListCardTitle', {
      defaultMessage: 'Transforms'
    }),
    description: _i18n.i18n.translate('xpack.transform.stepCreateForm.transformListCardDescription', {
      defaultMessage: 'Return to the transform management page.'
    }),
    onClick: function onClick() {
      return setRedirectToTransformManagement(true);
    },
    "data-test-subj": "transformWizardCardManagement"
  })), started === true && createIndexPattern === true && indexPatternId === undefined && _react.default.createElement(_eui.EuiFlexItem, {
    style: PANEL_ITEM_STYLE
  }, _react.default.createElement(_eui.EuiPanel, {
    style: {
      position: 'relative'
    }
  }, _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "primary",
    position: "absolute"
  }), _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "s"
  }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.transform.stepCreateForm.creatingIndexPatternMessage', {
    defaultMessage: 'Creating Kibana index pattern ...'
  }))))), started === true && indexPatternId !== undefined && _react.default.createElement(_eui.EuiFlexItem, {
    style: PANEL_ITEM_STYLE
  }, _react.default.createElement(_eui.EuiCard, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      size: "xxl",
      type: "discoverApp"
    }),
    title: _i18n.i18n.translate('xpack.transform.stepCreateForm.discoverCardTitle', {
      defaultMessage: 'Discover'
    }),
    description: _i18n.i18n.translate('xpack.transform.stepCreateForm.discoverCardDescription', {
      defaultMessage: 'Use Discover to explore the transform.'
    }),
    href: (0, _common.getDiscoverUrl)(indexPatternId, deps.http.basePath.get()),
    "data-test-subj": "transformWizardCardDiscover"
  }))))));
});

exports.StepCreateForm = StepCreateForm;