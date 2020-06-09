"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobsListPage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _check_privilege = require("../../../../privilege/check_privilege");

var _dependency_cache = require("../../../../util/dependency_cache");

var _index = require("../../../../jobs/jobs_list/components/jobs_list_view/index");

var _analytics_list = require("../../../../data_frame_analytics/pages/analytics_management/components/analytics_list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getTabs(isMlEnabledInSpace) {
  return [{
    id: 'anomaly_detection_jobs',
    name: _i18n.i18n.translate('xpack.ml.management.jobsList.anomalyDetectionTab', {
      defaultMessage: 'Anomaly detection'
    }),
    content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_index.JobsListView, {
      isManagementTable: true,
      isMlEnabledInSpace: isMlEnabledInSpace
    }))
  }, {
    id: 'analytics_jobs',
    name: _i18n.i18n.translate('xpack.ml.management.jobsList.analyticsTab', {
      defaultMessage: 'Analytics'
    }),
    content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_analytics_list.DataFrameAnalyticsList, {
      isManagementTable: true,
      isMlEnabledInSpace: isMlEnabledInSpace
    }))
  }];
}

var JobsListPage = function JobsListPage(_ref) {
  var I18nContext = _ref.I18nContext;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      initialized = _useState2[0],
      setInitialized = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isMlEnabledInSpace = _useState4[0],
      setIsMlEnabledInSpace = _useState4[1];

  var tabs = getTabs(isMlEnabledInSpace);

  var _useState5 = (0, _react.useState)(tabs[0].id),
      _useState6 = _slicedToArray(_useState5, 2),
      currentTabId = _useState6[0],
      setCurrentTabId = _useState6[1];

  var check =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var checkPrivilege;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _check_privilege.checkGetManagementMlJobs)();

            case 3:
              checkPrivilege = _context.sent;
              setInitialized(true);
              setIsMlEnabledInSpace(checkPrivilege.mlFeatureEnabledInSpace);
              _context.next = 10;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function check() {
      return _ref2.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    check();
  }, []);

  if (initialized === false) {
    return null;
  }

  var docLinks = (0, _dependency_cache.getDocLinks)();
  var ELASTIC_WEBSITE_URL = docLinks.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = docLinks.DOC_LINK_VERSION;
  var anomalyDetectionJobsUrl = "".concat(ELASTIC_WEBSITE_URL, "guide/en/machine-learning/").concat(DOC_LINK_VERSION, "/ml-jobs.html");
  var anomalyJobsUrl = "".concat(ELASTIC_WEBSITE_URL, "guide/en/machine-learning/").concat(DOC_LINK_VERSION, "/ml-dfanalytics.html");

  var anomalyDetectionDocsLabel = _i18n.i18n.translate('xpack.ml.management.jobsList.anomalyDetectionDocsLabel', {
    defaultMessage: 'Anomaly detection jobs docs'
  });

  var analyticsDocsLabel = _i18n.i18n.translate('xpack.ml.management.jobsList.analyticsDocsLabel', {
    defaultMessage: 'Analytics jobs docs'
  });

  function renderTabs() {
    return _react.default.createElement(_eui.EuiTabbedContent, {
      onTabClick: function onTabClick(_ref3) {
        var id = _ref3.id;
        setCurrentTabId(id);
      },
      size: "s",
      tabs: getTabs(isMlEnabledInSpace),
      initialSelectedTab: tabs[0]
    });
  }

  return _react.default.createElement(I18nContext, null, _react.default.createElement(_eui.EuiPageContent, {
    id: "kibanaManagementMLSection"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("h1", null, _i18n.i18n.translate('xpack.ml.management.jobsList.jobsListTitle', {
    defaultMessage: 'Machine Learning Jobs'
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    target: "_blank",
    iconType: "help",
    iconSide: "left",
    color: "primary",
    href: currentTabId === 'anomaly_detection_jobs' ? anomalyDetectionJobsUrl : anomalyJobsUrl
  }, currentTabId === 'anomaly_detection_jobs' ? anomalyDetectionDocsLabel : analyticsDocsLabel)))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued"
  }, _i18n.i18n.translate('xpack.ml.management.jobsList.jobsListTagline', {
    defaultMessage: 'View machine learning analytics and anomaly detection jobs.'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiPageContentBody, null, renderTabs())));
};

exports.JobsListPage = JobsListPage;