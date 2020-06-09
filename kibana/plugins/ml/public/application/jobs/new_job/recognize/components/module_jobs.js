"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModuleJobs = exports.SETUP_RESULTS_WIDTH = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _page = require("../page");

var _job_item = require("./job_item");

var _edit_job = require("./edit_job");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SETUP_RESULTS_WIDTH = '200px';
exports.SETUP_RESULTS_WIDTH = SETUP_RESULTS_WIDTH;

var ModuleJobs = function ModuleJobs(_ref) {
  var jobs = _ref.jobs,
      jobPrefix = _ref.jobPrefix,
      jobOverrides = _ref.jobOverrides,
      saveState = _ref.saveState,
      existingGroupIds = _ref.existingGroupIds,
      onJobOverridesChange = _ref.onJobOverridesChange;
  var isSaving = saveState === _page.SAVE_STATE.SAVING;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      jobToEdit = _useState2[0],
      setJobToEdit = _useState2[1];

  var onFlyoutClose = function onFlyoutClose(result) {
    setJobToEdit(null);

    if (result === null) {
      return;
    }

    onJobOverridesChange(result);
  };

  var getJobOverride = function getJobOverride(job) {
    return jobOverrides[job.id];
  };

  var editJobFlyout = jobToEdit !== null ? _react.default.createElement(_edit_job.EditJob, {
    job: jobToEdit,
    jobOverride: getJobOverride(jobToEdit),
    onClose: onFlyoutClose,
    existingGroupIds: existingGroupIds
  }) : null;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.jobsTitle",
    defaultMessage: "Jobs"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), saveState !== _page.SAVE_STATE.SAVING && saveState !== _page.SAVE_STATE.NOT_SAVED && _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd",
    responsive: false,
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      width: SETUP_RESULTS_WIDTH
    },
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround",
    responsive: false,
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_eui.EuiText, {
    size: "s",
    textAlign: "center"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.jobLabel",
    defaultMessage: "Job"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_eui.EuiText, {
    size: "s",
    textAlign: "center"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.datafeedLabel",
    defaultMessage: "Datafeed"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_eui.EuiText, {
    size: "s",
    textAlign: "center"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.runningLabel",
    defaultMessage: "Running"
  })))))), _react.default.createElement("ul", null, jobs.map(function (job, i) {
    return _react.default.createElement("li", {
      key: job.id
    }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_job_item.JobItem, {
      jobPrefix: jobPrefix,
      job: job,
      jobOverride: getJobOverride(job),
      isSaving: isSaving,
      onEditRequest: function onEditRequest() {
        return setJobToEdit(job);
      }
    }))), i < jobs.length - 1 && _react.default.createElement(_eui.EuiHorizontalRule, {
      margin: "s"
    }));
  })), editJobFlyout);
};

exports.ModuleJobs = ModuleJobs;