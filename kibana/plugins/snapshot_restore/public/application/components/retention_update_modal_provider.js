"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RetentionSettingsUpdateModalProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _app_context = require("../app_context");

var _documentation = require("../services/documentation");

var _shared_imports = require("../../shared_imports");

var _constants = require("../constants");

var _http = require("../services/http");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RetentionSettingsUpdateModalProvider = function RetentionSettingsUpdateModalProvider(_ref) {
  var children = _ref.children;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var toastNotifications = (0, _app_context.useToastNotifications)();

  var _useState = (0, _react.useState)(_constants.DEFAULT_RETENTION_SCHEDULE),
      _useState2 = _slicedToArray(_useState, 2),
      retentionSchedule = _useState2[0],
      setRetentionSchedule = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isModalOpen = _useState4[0],
      setIsModalOpen = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isEditing = _useState6[0],
      setIsEditing = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isSaving = _useState8[0],
      setIsSaving = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      saveError = _useState10[0],
      setSaveError = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isAdvancedCronVisible = _useState12[0],
      setIsAdvancedCronVisible = _useState12[1];

  var onSuccessCallback = (0, _react.useRef)(null);

  var _useState13 = (0, _react.useState)({
    expression: _constants.DEFAULT_RETENTION_SCHEDULE,
    frequency: _constants.DEFAULT_RETENTION_FREQUENCY
  }),
      _useState14 = _slicedToArray(_useState13, 2),
      simpleCron = _useState14[0],
      setSimpleCron = _useState14[1];

  var _useState15 = (0, _react.useState)({}),
      _useState16 = _slicedToArray(_useState15, 2),
      fieldToPreferredValueMap = _useState16[0],
      setFieldToPreferredValueMap = _useState16[1];

  var _useState17 = (0, _react.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      isInvalid = _useState18[0],
      setIsInvalid = _useState18[1];

  var updateRetentionPrompt = function updateRetentionPrompt(originalRetentionSchedule) {
    var onSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return undefined;
    };
    setIsModalOpen(true);
    setIsAdvancedCronVisible(Boolean(originalRetentionSchedule && originalRetentionSchedule !== _constants.DEFAULT_RETENTION_SCHEDULE));

    if (originalRetentionSchedule) {
      setIsEditing(true);
      setRetentionSchedule(originalRetentionSchedule);
    }

    onSuccessCallback.current = onSuccess;
  };

  var closeModal = function closeModal() {
    setIsModalOpen(false);
  };

  var updateRetentionSetting =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _ref3, error;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (retentionSchedule) {
                _context.next = 3;
                break;
              }

              setIsInvalid(true);
              return _context.abrupt("return");

            case 3:
              setIsSaving(true);
              setSaveError(null);
              _context.next = 7;
              return (0, _http.updateRetentionSchedule)(retentionSchedule);

            case 7:
              _ref3 = _context.sent;
              error = _ref3.error;
              setIsSaving(false);

              if (error) {
                setSaveError(error);
              } else {
                closeModal();
                toastNotifications.addSuccess(i18n.translate('xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionSuccessMessage', {
                  defaultMessage: 'Retention schedule updated'
                }));

                if (onSuccessCallback.current) {
                  onSuccessCallback.current();
                }
              }

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function updateRetentionSetting() {
      return _ref2.apply(this, arguments);
    };
  }();

  var renderModal = function renderModal() {
    if (!isModalOpen) {
      return null;
    }

    return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
      onClose: closeModal
    }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, isEditing ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionEditTitle",
      defaultMessage: "Edit retention schedule"
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionAddTitle",
      defaultMessage: "Add retention schedule"
    }))), _react.default.createElement(_eui.EuiModalBody, null, saveError && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionErrorTitle",
        defaultMessage: "Error saving retention schedule"
      }),
      color: "danger",
      iconType: "alert"
    }, saveError.data && saveError.data.message ? _react.default.createElement("p", null, saveError.data.message) : null), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    })), isAdvancedCronVisible ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionScheduleLabel",
        defaultMessage: "Retention schedule"
      }),
      isInvalid: isInvalid,
      error: i18n.translate('xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionScheduleFieldErrorMessage', {
        defaultMessage: 'Retention schedule is required.'
      }),
      helpText: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionHelpText",
        defaultMessage: "Use cron expression. {docLink}",
        values: {
          docLink: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationLinksService.getCronUrl(),
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionHelpTextDocLinkText",
            defaultMessage: "Learn more."
          }))
        }
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFieldText, {
      defaultValue: retentionSchedule,
      fullWidth: true,
      onChange: function onChange(e) {
        return setRetentionSchedule(e.target.value);
      }
    })), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement(_eui.EuiLink, {
      onClick: function onClick() {
        setIsAdvancedCronVisible(false);
        setRetentionSchedule(simpleCron.expression);
      },
      "data-test-subj": "showBasicCronLink"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionBasicLabel",
      defaultMessage: "Create basic interval"
    })))) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_shared_imports.CronEditor, {
      fieldToPreferredValueMap: fieldToPreferredValueMap,
      cronExpression: simpleCron.expression,
      frequency: simpleCron.frequency,
      onChange: function onChange(_ref4) {
        var expression = _ref4.cronExpression,
            frequency = _ref4.frequency,
            newFieldToPreferredValueMap = _ref4.fieldToPreferredValueMap;
        setSimpleCron({
          expression: expression,
          frequency: frequency
        });
        setFieldToPreferredValueMap(newFieldToPreferredValueMap);
        setRetentionSchedule(expression);
      }
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement(_eui.EuiLink, {
      onClick: function onClick() {
        setIsAdvancedCronVisible(true);
      },
      "data-test-subj": "showAdvancedCronLink"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionAdvancedLabel",
      defaultMessage: "Create cron expression"
    }))))), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
      onClick: closeModal
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionCancelButtonLabel",
      defaultMessage: "Cancel"
    })), _react.default.createElement(_eui.EuiButton, {
      onClick: updateRetentionSetting,
      fill: true,
      isLoading: isSaving
    }, isEditing ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionEditButtonLabel",
      defaultMessage: "Save changes"
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepRetention.policyUpdateRetentionSaveButtonLabel",
      defaultMessage: "Schedule"
    })))));
  };

  return _react.default.createElement(_react.Fragment, null, children(updateRetentionPrompt), renderModal());
};

exports.RetentionSettingsUpdateModalProvider = RetentionSettingsUpdateModalProvider;