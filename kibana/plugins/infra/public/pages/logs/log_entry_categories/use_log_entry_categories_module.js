"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogEntryCategoriesModuleContext = exports.LogEntryCategoriesModuleProvider = exports.useLogEntryCategoriesModule = void 0;

var _constate = _interopRequireDefault(require("constate"));

var _react = require("react");

var _log_analysis = require("../../../containers/logs/log_analysis");

var _module_descriptor = require("./module_descriptor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useLogEntryCategoriesModule = function useLogEntryCategoriesModule(_ref) {
  var indexPattern = _ref.indexPattern,
      sourceId = _ref.sourceId,
      spaceId = _ref.spaceId,
      timestampField = _ref.timestampField;
  var sourceConfiguration = (0, _react.useMemo)(function () {
    return {
      indices: indexPattern.split(','),
      sourceId: sourceId,
      spaceId: spaceId,
      timestampField: timestampField
    };
  }, [indexPattern, sourceId, spaceId, timestampField]);
  return (0, _log_analysis.useLogAnalysisModule)({
    moduleDescriptor: _module_descriptor.logEntryCategoriesModule,
    sourceConfiguration: sourceConfiguration
  });
};

exports.useLogEntryCategoriesModule = useLogEntryCategoriesModule;

var _createContainer = (0, _constate.default)(useLogEntryCategoriesModule),
    _createContainer2 = _slicedToArray(_createContainer, 2),
    LogEntryCategoriesModuleProvider = _createContainer2[0],
    useLogEntryCategoriesModuleContext = _createContainer2[1];

exports.useLogEntryCategoriesModuleContext = useLogEntryCategoriesModuleContext;
exports.LogEntryCategoriesModuleProvider = LogEntryCategoriesModuleProvider;