"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogsPageProviders = void 0;

var _react = _interopRequireDefault(require("react"));

var _log_analysis = require("../../containers/logs/log_analysis");

var _source = require("../../containers/source");

var _source_id = require("../../containers/source_id");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var LogsPageProviders = function LogsPageProviders(_ref) {
  var children = _ref.children;

  var _useSourceId = (0, _source_id.useSourceId)(),
      _useSourceId2 = _slicedToArray(_useSourceId, 1),
      sourceId = _useSourceId2[0];

  return _react.default.createElement(_source.SourceProvider, {
    sourceId: sourceId
  }, _react.default.createElement(_log_analysis.LogAnalysisCapabilitiesProvider, null, children));
};

exports.LogsPageProviders = LogsPageProviders;