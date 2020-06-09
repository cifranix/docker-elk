"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResultsLinks = void 0;

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _ml_api_service = require("../../../../services/ml_api_service");

var _license = require("../../../../license");

var _check_privilege = require("../../../../privilege/check_privilege");

var _check_ml_nodes = require("../../../../ml_nodes_check/check_ml_nodes");

var _kibana = require("../../../../contexts/kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RECHECK_DELAY_MS = 3000;

var ResultsLinks = function ResultsLinks(_ref) {
  var index = _ref.index,
      indexPatternId = _ref.indexPatternId,
      timeFieldName = _ref.timeFieldName,
      createIndexPattern = _ref.createIndexPattern,
      showFilebeatFlyout = _ref.showFilebeatFlyout;

  var _useState = (0, _react.useState)({
    from: 'now-30m',
    to: 'now'
  }),
      _useState2 = _slicedToArray(_useState, 2),
      duration = _useState2[0],
      setDuration = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showCreateJobLink = _useState4[0],
      setShowCreateJobLink = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      globalStateString = _useState6[0],
      setGlobalStateString = _useState6[1];

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      basePath = _useMlKibana.services.http.basePath;

  (0, _react.useEffect)(function () {
    setShowCreateJobLink((0, _check_privilege.checkPermission)('canCreateJob') && (0, _check_ml_nodes.mlNodesAvailable)());
    updateTimeValues();
  }, []);
  (0, _react.useEffect)(function () {
    var _g = timeFieldName !== undefined ? "&_g=(time:(from:'".concat(duration.from, "',mode:quick,to:'").concat(duration.to, "'))") : '';

    setGlobalStateString(_g);
  }, [duration]);

  function updateTimeValues() {
    return _updateTimeValues.apply(this, arguments);
  }

  function _updateTimeValues() {
    _updateTimeValues = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var recheck,
          _ref2,
          from,
          to,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              recheck = _args.length > 0 && _args[0] !== undefined ? _args[0] : true;

              if (!(timeFieldName !== undefined)) {
                _context.next = 9;
                break;
              }

              _context.next = 4;
              return getFullTimeRange(index, timeFieldName);

            case 4:
              _ref2 = _context.sent;
              from = _ref2.from;
              to = _ref2.to;
              setDuration({
                from: from === null ? duration.from : from,
                to: to === null ? duration.to : to
              }); // these links may have been drawn too quickly for the index to be ready
              // to give us the correct start and end times.
              // especially if the data was small.
              // so if the start and end were null, try again in 3s

              if (recheck && (from === null || to === null)) {
                setTimeout(function () {
                  updateTimeValues(false);
                }, RECHECK_DELAY_MS);
              }

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _updateTimeValues.apply(this, arguments);
  }

  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "l"
  }, createIndexPattern && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCard, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      size: "xxl",
      type: "discoverApp"
    }),
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.fileDatavisualizer.resultsLinks.viewIndexInDiscoverTitle",
      defaultMessage: "View index in Discover"
    }),
    description: "",
    href: "".concat(basePath.get(), "/app/kibana#/discover?&_a=(index:'").concat(indexPatternId, "')").concat(globalStateString)
  })), (0, _license.isFullLicense)() === true && timeFieldName !== undefined && showCreateJobLink && createIndexPattern && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCard, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      size: "xxl",
      type: "machineLearningApp"
    }),
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.fileDatavisualizer.resultsLinks.createNewMLJobTitle",
      defaultMessage: "Create new ML job"
    }),
    description: "",
    href: "#/jobs/new_job/step/job_type?index=".concat(indexPatternId).concat(globalStateString)
  })), createIndexPattern && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCard, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      size: "xxl",
      type: "dataVisualizer"
    }),
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.fileDatavisualizer.resultsLinks.openInDataVisualizerTitle",
      defaultMessage: "Open in Data Visualizer"
    }),
    description: "",
    href: "#/jobs/new_job/datavisualizer?index=".concat(indexPatternId).concat(globalStateString)
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCard, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      size: "xxl",
      type: "managementApp"
    }),
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.fileDatavisualizer.resultsLinks.indexManagementTitle",
      defaultMessage: "Index Management"
    }),
    description: "",
    href: "".concat(basePath.get(), "/app/kibana#/management/elasticsearch/index_management/indices/filter/").concat(index)
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCard, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      size: "xxl",
      type: "managementApp"
    }),
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.fileDatavisualizer.resultsLinks.indexPatternManagementTitle",
      defaultMessage: "Index Pattern Management"
    }),
    description: "",
    href: "".concat(basePath.get(), "/app/kibana#/management/kibana/index_patterns/").concat(createIndexPattern ? indexPatternId : '')
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCard, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      size: "xxl",
      type: "filebeatApp"
    }),
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.fileDatavisualizer.resultsLinks.fileBeatConfig",
      defaultMessage: "Create Filebeat configuration"
    }),
    description: "",
    onClick: showFilebeatFlyout
  })));
};

exports.ResultsLinks = ResultsLinks;

function getFullTimeRange(_x, _x2) {
  return _getFullTimeRange.apply(this, arguments);
}

function _getFullTimeRange() {
  _getFullTimeRange = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(index, timeFieldName) {
    var query, resp;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = {
              bool: {
                must: [{
                  query_string: {
                    analyze_wildcard: true,
                    query: '*'
                  }
                }]
              }
            };
            _context2.next = 3;
            return _ml_api_service.ml.getTimeFieldRange({
              index: index,
              timeFieldName: timeFieldName,
              query: query
            });

          case 3:
            resp = _context2.sent;
            return _context2.abrupt("return", {
              from: (0, _moment.default)(resp.start.epoch).toISOString(),
              to: (0, _moment.default)(resp.end.epoch).toISOString()
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getFullTimeRange.apply(this, arguments);
}