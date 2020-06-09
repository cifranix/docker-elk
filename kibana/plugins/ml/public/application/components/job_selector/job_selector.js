"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobSelector = JobSelector;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _kibana = require("../../contexts/kibana");

var _ml_api_service = require("../../services/ml_api_service");

var _url_state = require("../../util/url_state");

var _index = require("./job_selector_table/index");

var _index2 = require("./id_badges/index");

var _index3 = require("./new_selection_id_badges/index");

var _job_select_service_utils = require("./job_select_service_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function mergeSelection(jobIds, groupObjs, singleSelection) {
  if (singleSelection) {
    return jobIds;
  }

  var selectedIds = [];
  var alreadySelected = [];
  groupObjs.forEach(function (group) {
    selectedIds.push(group.groupId);
    alreadySelected.push.apply(alreadySelected, _toConsumableArray(group.jobIds));
  });
  jobIds.forEach(function (jobId) {
    // Add jobId if not already included in group selection
    if (alreadySelected.includes(jobId) === false) {
      selectedIds.push(jobId);
    }
  });
  return selectedIds;
}

function getInitialGroupsMap(selectedGroups) {
  var map = {};

  if (selectedGroups.length) {
    selectedGroups.forEach(function (group) {
      map[group.groupId] = group.jobIds;
    });
  }

  return map;
}

var BADGE_LIMIT = 10;
var DEFAULT_GANTT_BAR_WIDTH = 299; // pixels

function JobSelector(_ref) {
  var _ref2, _globalState$ml, _ref3, _globalState$ml2;

  var dateFormatTz = _ref.dateFormatTz,
      singleSelection = _ref.singleSelection,
      timeseriesOnly = _ref.timeseriesOnly;

  var _useUrlState = (0, _url_state.useUrlState)('_g'),
      _useUrlState2 = _slicedToArray(_useUrlState, 2),
      globalState = _useUrlState2[0],
      setGlobalState = _useUrlState2[1];

  var selectedJobIds = (_ref2 = globalState === null || globalState === void 0 ? void 0 : (_globalState$ml = globalState.ml) === null || _globalState$ml === void 0 ? void 0 : _globalState$ml.jobIds) !== null && _ref2 !== void 0 ? _ref2 : [];
  var selectedGroups = (_ref3 = globalState === null || globalState === void 0 ? void 0 : (_globalState$ml2 = globalState.ml) === null || _globalState$ml2 === void 0 ? void 0 : _globalState$ml2.groups) !== null && _ref3 !== void 0 ? _ref3 : [];

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      jobs = _useState2[0],
      setJobs = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      groups = _useState4[0],
      setGroups = _useState4[1];

  var _useState5 = (0, _react.useState)({
    groupsMap: getInitialGroupsMap(selectedGroups),
    jobsMap: {}
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      maps = _useState6[0],
      setMaps = _useState6[1];

  var _useState7 = (0, _react.useState)(mergeSelection(selectedJobIds, selectedGroups, singleSelection)),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedIds = _useState8[0],
      setSelectedIds = _useState8[1];

  var _useState9 = (0, _react.useState)(mergeSelection(selectedJobIds, selectedGroups, singleSelection)),
      _useState10 = _slicedToArray(_useState9, 2),
      newSelection = _useState10[0],
      setNewSelection = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      showAllBadges = _useState12[0],
      setShowAllBadges = _useState12[1];

  var _useState13 = (0, _react.useState)(false),
      _useState14 = _slicedToArray(_useState13, 2),
      showAllBarBadges = _useState14[0],
      setShowAllBarBadges = _useState14[1];

  var _useState15 = (0, _react.useState)(true),
      _useState16 = _slicedToArray(_useState15, 2),
      applyTimeRange = _useState16[0],
      setApplyTimeRange = _useState16[1];

  var _useState17 = (0, _react.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      isFlyoutVisible = _useState18[0],
      setIsFlyoutVisible = _useState18[1];

  var _useState19 = (0, _react.useState)(DEFAULT_GANTT_BAR_WIDTH),
      _useState20 = _slicedToArray(_useState19, 2),
      ganttBarWidth = _useState20[0],
      setGanttBarWidth = _useState20[1];

  var flyoutEl = (0, _react.useRef)(null);

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      notifications = _useMlKibana.services.notifications; // Ensure JobSelectionBar gets updated when selection via globalState changes.


  (0, _react.useEffect)(function () {
    setSelectedIds(mergeSelection(selectedJobIds, selectedGroups, singleSelection));
  }, [JSON.stringify([selectedJobIds, selectedGroups])]); // Ensure current selected ids always show up in flyout

  (0, _react.useEffect)(function () {
    setNewSelection(selectedIds);
  }, [isFlyoutVisible]); // eslint-disable-line
  // Wrap handleResize in useCallback as it is a dependency for useEffect on line 131 below.
  // Not wrapping it would cause this dependency to change on every render

  var handleResize = (0, _react.useCallback)(function () {
    if (jobs.length > 0 && flyoutEl && flyoutEl.current && flyoutEl.current.flyout) {
      // get all cols in flyout table
      var tableHeaderCols = flyoutEl.current.flyout.querySelectorAll('table thead th'); // get the width of the last col

      var derivedWidth = tableHeaderCols[tableHeaderCols.length - 1].offsetWidth - 16;
      var normalizedJobs = (0, _job_select_service_utils.normalizeTimes)(jobs, dateFormatTz, derivedWidth);
      setJobs(normalizedJobs);

      var _getGroupsFromJobs = (0, _job_select_service_utils.getGroupsFromJobs)(normalizedJobs),
          updatedGroups = _getGroupsFromJobs.groups;

      setGroups(updatedGroups);
      setGanttBarWidth(derivedWidth);
    }
  }, [dateFormatTz, jobs]);
  (0, _react.useEffect)(function () {
    // Ensure ganttBar width gets calculated on resize
    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  (0, _react.useEffect)(function () {
    handleResize();
  }, [handleResize, jobs]);

  function closeFlyout() {
    setIsFlyoutVisible(false);
  }

  function showFlyout() {
    setIsFlyoutVisible(true);
  }

  function handleJobSelectionClick() {
    showFlyout();

    _ml_api_service.ml.jobs.jobsWithTimerange(dateFormatTz).then(function (resp) {
      var normalizedJobs = (0, _job_select_service_utils.normalizeTimes)(resp.jobs, dateFormatTz, DEFAULT_GANTT_BAR_WIDTH);

      var _getGroupsFromJobs2 = (0, _job_select_service_utils.getGroupsFromJobs)(normalizedJobs),
          groupsWithTimerange = _getGroupsFromJobs2.groups,
          groupsMap = _getGroupsFromJobs2.groupsMap;

      setJobs(normalizedJobs);
      setGroups(groupsWithTimerange);
      setMaps({
        groupsMap: groupsMap,
        jobsMap: resp.jobsMap
      });
    }).catch(function (err) {
      console.error('Error fetching jobs with time range', err); // eslint-disable-line

      var toasts = notifications.toasts;
      toasts.addDanger({
        title: _i18n.i18n.translate('xpack.ml.jobSelector.jobFetchErrorMessage', {
          defaultMessage: 'An error occurred fetching jobs. Refresh and try again.'
        })
      });
    });
  }

  function handleNewSelection(_ref4) {
    var selectionFromTable = _ref4.selectionFromTable;
    setNewSelection(selectionFromTable);
  }

  function applySelection() {
    // allNewSelection will be a list of all job ids (including those from groups) selected from the table
    var allNewSelection = [];
    var groupSelection = [];
    newSelection.forEach(function (id) {
      if (maps.groupsMap[id] !== undefined) {
        // Push all jobs from selected groups into the newSelection list
        allNewSelection.push.apply(allNewSelection, _toConsumableArray(maps.groupsMap[id])); // if it's a group - push group obj to set in global state

        groupSelection.push({
          groupId: id,
          jobIds: maps.groupsMap[id]
        });
      } else {
        allNewSelection.push(id);
      }
    }); // create a Set to remove duplicate values

    var allNewSelectionUnique = Array.from(new Set(allNewSelection));
    setSelectedIds(newSelection);
    setNewSelection([]);
    closeFlyout();
    var time = applyTimeRange ? (0, _job_select_service_utils.getTimeRangeFromSelection)(jobs, allNewSelectionUnique) : undefined;
    setGlobalState(_objectSpread({
      ml: {
        jobIds: allNewSelectionUnique,
        groups: groupSelection
      }
    }, time !== undefined ? {
      time: time
    } : {}));
  }

  function toggleTimerangeSwitch() {
    setApplyTimeRange(!applyTimeRange);
  }

  function removeId(id) {
    setNewSelection(newSelection.filter(function (item) {
      return item !== id;
    }));
  }

  function clearSelection() {
    setNewSelection([]);
  }

  function renderJobSelectionBar() {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      responsive: false,
      gutterSize: "xs",
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      wrap: true,
      responsive: false,
      gutterSize: "xs",
      alignItems: "center",
      "data-test-subj": "mlJobSelectionBadges"
    }, _react.default.createElement(_index2.IdBadges, {
      limit: BADGE_LIMIT,
      maps: maps,
      onLinkClick: function onLinkClick() {
        return setShowAllBarBadges(!showAllBarBadges);
      },
      selectedIds: selectedIds,
      showAllBarBadges: showAllBarBadges
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      size: "xs",
      iconType: "pencil",
      onClick: handleJobSelectionClick,
      "data-test-subj": "mlButtonEditJobSelection"
    }, _i18n.i18n.translate('xpack.ml.jobSelector.jobSelectionButton', {
      defaultMessage: 'Edit job selection'
    }))));
  }

  function renderFlyout() {
    if (isFlyoutVisible) {
      return _react.default.createElement(_eui.EuiFlyout // @ts-ignore
      , {
        ref: flyoutEl,
        onClose: closeFlyout,
        "aria-labelledby": "jobSelectorFlyout",
        size: "l",
        "data-test-subj": "mlFlyoutJobSelector"
      }, _react.default.createElement(_eui.EuiFlyoutHeader, {
        hasBorder: true
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "m"
      }, _react.default.createElement("h2", {
        id: "flyoutTitle"
      }, _i18n.i18n.translate('xpack.ml.jobSelector.flyoutTitle', {
        defaultMessage: 'Job selection'
      })))), _react.default.createElement(_eui.EuiFlyoutBody, {
        className: "mlJobSelectorFlyoutBody"
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        direction: "column",
        responsive: false
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        wrap: true,
        responsive: false,
        gutterSize: "xs",
        alignItems: "center"
      }, _react.default.createElement(_index3.NewSelectionIdBadges, {
        limit: BADGE_LIMIT,
        maps: maps,
        newSelection: newSelection,
        onDeleteClick: removeId,
        onLinkClick: function onLinkClick() {
          return setShowAllBadges(!showAllBadges);
        },
        showAllBadges: showAllBadges
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        direction: "row",
        justifyContent: "spaceBetween",
        responsive: false
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, !singleSelection && newSelection.length > 0 && _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: clearSelection,
        size: "xs",
        "data-test-subj": "mlFlyoutJobSelectorButtonClearSelection"
      }, _i18n.i18n.translate('xpack.ml.jobSelector.clearAllFlyoutButton', {
        defaultMessage: 'Clear all'
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiSwitch, {
        label: _i18n.i18n.translate('xpack.ml.jobSelector.applyTimerangeSwitchLabel', {
          defaultMessage: 'Apply timerange'
        }),
        checked: applyTimeRange,
        onChange: toggleTimerangeSwitch,
        "data-test-subj": "mlFlyoutJobSelectorSwitchApplyTimeRange"
      }))))), _react.default.createElement(_index.JobSelectorTable, {
        jobs: jobs,
        ganttBarWidth: ganttBarWidth,
        groupsList: groups,
        onSelection: handleNewSelection,
        selectedIds: newSelection,
        singleSelection: singleSelection,
        timeseriesOnly: timeseriesOnly
      })), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        onClick: applySelection,
        fill: true,
        isDisabled: newSelection.length === 0,
        "data-test-subj": "mlFlyoutJobSelectorButtonApply"
      }, _i18n.i18n.translate('xpack.ml.jobSelector.applyFlyoutButton', {
        defaultMessage: 'Apply'
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        iconType: "cross",
        onClick: closeFlyout,
        "data-test-subj": "mlFlyoutJobSelectorButtonClose"
      }, _i18n.i18n.translate('xpack.ml.jobSelector.closeFlyoutButton', {
        defaultMessage: 'Close'
      }))))));
    }
  }

  return _react.default.createElement("div", {
    className: "mlJobSelectorBar"
  }, selectedIds.length > 0 && renderJobSelectionBar(), renderFlyout());
}

JobSelector.propTypes = {
  selectedJobIds: _propTypes.default.array,
  singleSelection: _propTypes.default.bool,
  timeseriesOnly: _propTypes.default.bool
};