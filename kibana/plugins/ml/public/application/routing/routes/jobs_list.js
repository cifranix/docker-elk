"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobListRoute = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactUse = require("react-use");

var _i18n = require("@kbn/i18n");

var _jobs_list = require("../../../../common/constants/jobs_list");

var _timefilter_refresh_service = require("../../services/timefilter_refresh_service");

var _url_state = require("../../util/url_state");

var _router = require("../router");

var _use_resolver = require("../use_resolver");

var _resolvers = require("../resolvers");

var _jobs_list2 = require("../../jobs/jobs_list");

var _kibana = require("../../contexts/kibana");

var _breadcrumbs = require("../breadcrumbs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.ANOMALY_DETECTION_BREADCRUMB, {
  text: _i18n.i18n.translate('xpack.ml.anomalyDetection.jobManagementLabel', {
    defaultMessage: 'Job Management'
  }),
  href: ''
}];
var jobListRoute = {
  path: '/jobs',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.jobListRoute = jobListRoute;

var PageWrapper = function PageWrapper(_ref) {
  var _ref2, _ref3, _globalState$refreshI, _ref4, _globalState$refreshI2;

  var deps = _ref.deps;

  var _useResolver = (0, _use_resolver.useResolver)(undefined, undefined, deps.config, (0, _resolvers.basicResolvers)(deps)),
      context = _useResolver.context;

  var timefilter = (0, _kibana.useTimefilter)({
    timeRangeSelector: false,
    autoRefreshSelector: true
  });

  var _useUrlState = (0, _url_state.useUrlState)('_g'),
      _useUrlState2 = _slicedToArray(_useUrlState, 2),
      globalState = _useUrlState2[0],
      setGlobalState = _useUrlState2[1];

  var mlTimefilterRefresh = (0, _reactUse.useObservable)(_timefilter_refresh_service.mlTimefilterRefresh$);
  var lastRefresh = (_ref2 = mlTimefilterRefresh === null || mlTimefilterRefresh === void 0 ? void 0 : mlTimefilterRefresh.lastRefresh) !== null && _ref2 !== void 0 ? _ref2 : 0;
  var refreshValue = (_ref3 = globalState === null || globalState === void 0 ? void 0 : (_globalState$refreshI = globalState.refreshInterval) === null || _globalState$refreshI === void 0 ? void 0 : _globalState$refreshI.value) !== null && _ref3 !== void 0 ? _ref3 : 0;
  var refreshPause = (_ref4 = globalState === null || globalState === void 0 ? void 0 : (_globalState$refreshI2 = globalState.refreshInterval) === null || _globalState$refreshI2 === void 0 ? void 0 : _globalState$refreshI2.pause) !== null && _ref4 !== void 0 ? _ref4 : true;
  var blockRefresh = refreshValue === 0 || refreshPause === true;
  (0, _react.useEffect)(function () {
    // If the refreshInterval defaults to 0s/pause=true, set it to 30s/pause=false,
    // otherwise pass on the globalState's settings to the date picker.
    var refreshInterval = refreshValue === 0 && refreshPause === true ? {
      pause: false,
      value: _jobs_list.DEFAULT_REFRESH_INTERVAL_MS
    } : {
      pause: refreshPause,
      value: refreshValue
    };
    setGlobalState({
      refreshInterval: refreshInterval
    });
    timefilter.setRefreshInterval(refreshInterval);
  }, []);
  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_jobs_list2.JobsPage, {
    blockRefresh: blockRefresh,
    lastRefresh: lastRefresh
  }));
};