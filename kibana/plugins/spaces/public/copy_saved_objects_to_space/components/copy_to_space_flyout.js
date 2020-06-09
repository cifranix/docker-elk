"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopySavedObjectsToSpaceFlyout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _public = require("../../../../../../src/legacy/core_plugins/management/public");

var _processing_copy_to_space = require("./processing_copy_to_space");

var _copy_to_space_flyout_footer = require("./copy_to_space_flyout_footer");

var _copy_to_space_form = require("./copy_to_space_form");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CopySavedObjectsToSpaceFlyout = function CopySavedObjectsToSpaceFlyout(props) {
  var onClose = props.onClose,
      savedObject = props.savedObject,
      spacesManager = props.spacesManager,
      toastNotifications = props.toastNotifications;

  var _useState = (0, _react.useState)({
    includeRelated: true,
    overwrite: true,
    selectedSpaceIds: []
  }),
      _useState2 = _slicedToArray(_useState, 2),
      copyOptions = _useState2[0],
      setCopyOptions = _useState2[1];

  var _useState3 = (0, _react.useState)({
    isLoading: true,
    spaces: []
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      _useState4$ = _useState4[0],
      isLoading = _useState4$.isLoading,
      spaces = _useState4$.spaces,
      setSpacesState = _useState4[1];

  (0, _react.useEffect)(function () {
    var getSpaces = spacesManager.getSpaces('copySavedObjectsIntoSpace');
    var getActiveSpace = spacesManager.getActiveSpace();
    Promise.all([getSpaces, getActiveSpace]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          allSpaces = _ref2[0],
          activeSpace = _ref2[1];

      setSpacesState({
        isLoading: false,
        spaces: allSpaces.filter(function (space) {
          return space.id !== activeSpace.id;
        })
      });
    }).catch(function (e) {
      toastNotifications.addError(e, {
        title: _i18n.i18n.translate('xpack.spaces.management.copyToSpace.spacesLoadErrorTitle', {
          defaultMessage: 'Error loading available spaces'
        })
      });
    });
  }, [spacesManager, toastNotifications]);

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      copyInProgress = _useState6[0],
      setCopyInProgress = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      conflictResolutionInProgress = _useState8[0],
      setConflictResolutionInProgress = _useState8[1];

  var _useState9 = (0, _react.useState)({}),
      _useState10 = _slicedToArray(_useState9, 2),
      copyResult = _useState10[0],
      setCopyResult = _useState10[1];

  var _useState11 = (0, _react.useState)({}),
      _useState12 = _slicedToArray(_useState11, 2),
      retries = _useState12[0],
      setRetries = _useState12[1];

  var initialCopyFinished = Object.values(copyResult).length > 0;

  var onRetriesChange = function onRetriesChange(updatedRetries) {
    setRetries(updatedRetries);
  };

  function startCopy() {
    return _startCopy.apply(this, arguments);
  }

  function _startCopy() {
    _startCopy = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var copySavedObjectsResult, processedResult;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setCopyInProgress(true);
              setCopyResult({});
              _context.prev = 2;
              _context.next = 5;
              return spacesManager.copySavedObjects([{
                type: savedObject.type,
                id: savedObject.id
              }], copyOptions.selectedSpaceIds, copyOptions.includeRelated, copyOptions.overwrite);

            case 5:
              copySavedObjectsResult = _context.sent;
              processedResult = (0, _lodash.mapValues)(copySavedObjectsResult, _public.processImportResponse);
              setCopyResult(processedResult);
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](2);
              setCopyInProgress(false);
              toastNotifications.addError(_context.t0, {
                title: _i18n.i18n.translate('xpack.spaces.management.copyToSpace.copyErrorTitle', {
                  defaultMessage: 'Error copying saved object'
                })
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 10]]);
    }));
    return _startCopy.apply(this, arguments);
  }

  function finishCopy() {
    return _finishCopy.apply(this, arguments);
  }

  function _finishCopy() {
    _finishCopy = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var needsConflictResolution;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              needsConflictResolution = Object.values(retries).some(function (spaceRetry) {
                return spaceRetry.some(function (retry) {
                  return retry.overwrite;
                });
              });

              if (!needsConflictResolution) {
                _context2.next = 16;
                break;
              }

              setConflictResolutionInProgress(true);
              _context2.prev = 3;
              _context2.next = 6;
              return spacesManager.resolveCopySavedObjectsErrors([{
                type: savedObject.type,
                id: savedObject.id
              }], retries, copyOptions.includeRelated);

            case 6:
              toastNotifications.addSuccess(_i18n.i18n.translate('xpack.spaces.management.copyToSpace.resolveCopySuccessTitle', {
                defaultMessage: 'Overwrite successful'
              }));
              onClose();
              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](3);
              setCopyInProgress(false);
              toastNotifications.addError(_context2.t0, {
                title: _i18n.i18n.translate('xpack.spaces.management.copyToSpace.resolveCopyErrorTitle', {
                  defaultMessage: 'Error resolving saved object conflicts'
                })
              });

            case 14:
              _context2.next = 17;
              break;

            case 16:
              onClose();

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 10]]);
    }));
    return _finishCopy.apply(this, arguments);
  }

  var getFlyoutBody = function getFlyoutBody() {
    // Step 1: loading assets for main form
    if (isLoading) {
      return _react.default.createElement(_eui.EuiLoadingSpinner, null);
    } // Step 1a: assets loaded, but no spaces are available for copy.


    if (spaces.length === 0) {
      return _react.default.createElement(_eui.EuiEmptyPrompt, {
        body: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.spaces.management.copyToSpace.noSpacesBody",
          defaultMessage: "There are no eligible spaces to copy into."
        })),
        title: _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.spaces.management.copyToSpace.noSpacesTitle",
          defaultMessage: "No spaces available"
        }))
      });
    } // Step 2: Copy has not been initiated yet; User must fill out form to continue.


    if (!copyInProgress) {
      return _react.default.createElement(_copy_to_space_form.CopyToSpaceForm, {
        spaces: spaces,
        copyOptions: copyOptions,
        onUpdate: setCopyOptions
      });
    } // Step3: Copy operation is in progress


    return _react.default.createElement(_processing_copy_to_space.ProcessingCopyToSpace, {
      savedObject: savedObject,
      copyInProgress: copyInProgress,
      conflictResolutionInProgress: conflictResolutionInProgress,
      copyResult: copyResult,
      spaces: spaces,
      copyOptions: copyOptions,
      retries: retries,
      onRetriesChange: onRetriesChange
    });
  };

  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: onClose,
    maxWidth: 600,
    "data-test-subj": "copy-to-space-flyout"
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "m"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    size: "m",
    type: "spacesApp"
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.spaces.management.copyToSpaceFlyoutHeader",
    defaultMessage: "Copy saved object to space"
  })))))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "m"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    type: savedObject.meta.icon || 'apps'
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, savedObject.meta.title)))), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), getFlyoutBody()), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_copy_to_space_flyout_footer.CopyToSpaceFlyoutFooter, {
    copyInProgress: copyInProgress,
    conflictResolutionInProgress: conflictResolutionInProgress,
    initialCopyFinished: initialCopyFinished,
    copyResult: copyResult,
    numberOfSelectedSpaces: copyOptions.selectedSpaceIds.length,
    retries: retries,
    onCopyStart: startCopy,
    onCopyFinish: finishCopy
  })));
};

exports.CopySavedObjectsToSpaceFlyout = CopySavedObjectsToSpaceFlyout;