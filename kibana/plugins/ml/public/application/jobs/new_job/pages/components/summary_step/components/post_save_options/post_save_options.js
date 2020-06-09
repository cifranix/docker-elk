"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostSaveOptions = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _kibana = require("../../../../../../../contexts/kibana");

var _errors = require("../../../../../../../../../common/util/errors");

var _index = require("../../../../../../jobs_list/components/create_watch_flyout/index");

var _job_creator_context = require("../../../job_creator_context");

var _states = require("../../../../../../../../../common/constants/states");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PostSaveOptions = function PostSaveOptions(_ref) {
  var jobRunner = _ref.jobRunner;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      notifications = _useMlKibana.services.notifications;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator;

  var _useState = (0, _react.useState)(_states.DATAFEED_STATE.STOPPED),
      _useState2 = _slicedToArray(_useState, 2),
      datafeedState = _useState2[0],
      setDatafeedState = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      watchFlyoutVisible = _useState4[0],
      setWatchFlyoutVisible = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      watchCreated = _useState6[0],
      setWatchCreated = _useState6[1];

  function setShowCreateWatchFlyoutFunction(showFlyout) {
    showFlyout(jobCreator.jobId);
  }

  function flyoutHidden(jobCreated) {
    setWatchFlyoutVisible(false);
    setWatchCreated(jobCreated);
  }

  function unsetShowCreateWatchFlyoutFunction() {
    setWatchFlyoutVisible(false);
  }

  function startJobInRealTime() {
    return _startJobInRealTime.apply(this, arguments);
  }

  function _startJobInRealTime() {
    _startJobInRealTime = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var toasts, started;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              toasts = notifications.toasts;
              setDatafeedState(_states.DATAFEED_STATE.STARTING);

              if (!(jobRunner !== null)) {
                _context.next = 15;
                break;
              }

              _context.prev = 3;
              _context.next = 6;
              return jobRunner.startDatafeedInRealTime(true);

            case 6:
              started = _context.sent;
              setDatafeedState(started === true ? _states.DATAFEED_STATE.STARTED : _states.DATAFEED_STATE.STOPPED);
              toasts.addSuccess({
                title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.postSaveOptions.startJobInRealTimeSuccess', {
                  defaultMessage: "Job {jobId} started",
                  values: {
                    jobId: jobCreator.jobId
                  }
                })
              });
              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);
              setDatafeedState(_states.DATAFEED_STATE.STOPPED);
              toasts.addDanger({
                title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.postSaveOptions.startJobInRealTimeError', {
                  defaultMessage: "Error starting job"
                }),
                text: (0, _errors.getErrorMessage)(_context.t0)
              });

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 11]]);
    }));
    return _startJobInRealTime.apply(this, arguments);
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    isDisabled: datafeedState === _states.DATAFEED_STATE.STARTING || datafeedState === _states.DATAFEED_STATE.STARTED,
    onClick: startJobInRealTime,
    "data-test-subj": "mlJobWizardButtonRunInRealTime"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.summaryStep.postSaveOptions.startJobInRealTime",
    defaultMessage: "Start job running in real time"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    isDisabled: datafeedState === _states.DATAFEED_STATE.STOPPED || datafeedState === _states.DATAFEED_STATE.STARTING || watchCreated === true,
    onClick: function onClick() {
      return setWatchFlyoutVisible(true);
    },
    "data-test-subj": "mlJobWizardButtonCreateWatch"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.summaryStep.postSaveOptions.createWatch",
    defaultMessage: "Create watch"
  }))), datafeedState === _states.DATAFEED_STATE.STARTED && watchFlyoutVisible && _react.default.createElement(_index.CreateWatchFlyout, {
    setShowFunction: setShowCreateWatchFlyoutFunction,
    unsetShowFunction: unsetShowCreateWatchFlyoutFunction,
    flyoutHidden: flyoutHidden
  }));
};

exports.PostSaveOptions = PostSaveOptions;