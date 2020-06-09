"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogAnalysisCapabilitiesContext = exports.LogAnalysisCapabilitiesProvider = exports.useLogAnalysisCapabilities = void 0;

var _constate = _interopRequireDefault(require("constate"));

var _react = require("react");

var _Either = require("fp-ts/lib/Either");

var _pipeable = require("fp-ts/lib/pipeable");

var _function = require("fp-ts/lib/function");

var _use_tracked_promise = require("../../../utils/use_tracked_promise");

var _legacy_singletons = require("../../../legacy_singletons");

var _ml_api_types = require("./api/ml_api_types");

var _runtime_types = require("../../../../common/runtime_types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useLogAnalysisCapabilities = function useLogAnalysisCapabilities() {
  var _useState = (0, _react.useState)(initialMlCapabilities),
      _useState2 = _slicedToArray(_useState, 2),
      mlCapabilities = _useState2[0],
      setMlCapabilities = _useState2[1];

  var _useTrackedPromise = (0, _use_tracked_promise.useTrackedPromise)({
    cancelPreviousOn: 'resolution',
    createPromise: function () {
      var _createPromise = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var rawResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _legacy_singletons.npStart.http.fetch('/api/ml/ml_capabilities');

              case 2:
                rawResponse = _context.sent;
                return _context.abrupt("return", (0, _pipeable.pipe)(_ml_api_types.getMlCapabilitiesResponsePayloadRT.decode(rawResponse), (0, _Either.fold)((0, _runtime_types.throwErrors)(_runtime_types.createPlainError), _function.identity)));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createPromise() {
        return _createPromise.apply(this, arguments);
      }

      return createPromise;
    }(),
    onResolve: function onResolve(response) {
      setMlCapabilities(response);
    }
  }, []),
      _useTrackedPromise2 = _slicedToArray(_useTrackedPromise, 2),
      fetchMlCapabilitiesRequest = _useTrackedPromise2[0],
      fetchMlCapabilities = _useTrackedPromise2[1];

  (0, _react.useEffect)(function () {
    fetchMlCapabilities();
  }, [fetchMlCapabilities]);
  var isLoading = (0, _react.useMemo)(function () {
    return fetchMlCapabilitiesRequest.state === 'pending';
  }, [fetchMlCapabilitiesRequest.state]);
  var hasLogAnalysisSetupCapabilities = mlCapabilities.capabilities.canCreateJob;
  var hasLogAnalysisReadCapabilities = mlCapabilities.capabilities.canGetJobs;
  var hasLogAnalysisCapabilites = mlCapabilities.isPlatinumOrTrialLicense && mlCapabilities.mlFeatureEnabledInSpace;
  return {
    hasLogAnalysisCapabilites: hasLogAnalysisCapabilites,
    hasLogAnalysisReadCapabilities: hasLogAnalysisReadCapabilities,
    hasLogAnalysisSetupCapabilities: hasLogAnalysisSetupCapabilities,
    isLoading: isLoading
  };
};

exports.useLogAnalysisCapabilities = useLogAnalysisCapabilities;

var _createContainer = (0, _constate.default)(useLogAnalysisCapabilities),
    _createContainer2 = _slicedToArray(_createContainer, 2),
    LogAnalysisCapabilitiesProvider = _createContainer2[0],
    useLogAnalysisCapabilitiesContext = _createContainer2[1];

exports.useLogAnalysisCapabilitiesContext = useLogAnalysisCapabilitiesContext;
exports.LogAnalysisCapabilitiesProvider = LogAnalysisCapabilitiesProvider;
var initialMlCapabilities = {
  capabilities: {
    canGetJobs: false,
    canCreateJob: false,
    canDeleteJob: false,
    canOpenJob: false,
    canCloseJob: false,
    canForecastJob: false,
    canGetDatafeeds: false,
    canStartStopDatafeed: false,
    canUpdateJob: false,
    canUpdateDatafeed: false,
    canPreviewDatafeed: false,
    canGetCalendars: false,
    canCreateCalendar: false,
    canDeleteCalendar: false,
    canGetFilters: false,
    canCreateFilter: false,
    canDeleteFilter: false,
    canFindFileStructure: false,
    canGetDataFrameJobs: false,
    canDeleteDataFrameJob: false,
    canPreviewDataFrameJob: false,
    canCreateDataFrameJob: false,
    canStartStopDataFrameJob: false
  },
  isPlatinumOrTrialLicense: false,
  mlFeatureEnabledInSpace: false,
  upgradeInProgress: false
};