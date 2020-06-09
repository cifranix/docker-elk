"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatasetsList = void 0;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../../../observability/public");

var _log_analysis = require("../../../../../../common/log_analysis");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  margin-bottom: 2.5px;\n  margin-top: 1px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DatasetsList = function DatasetsList(_ref) {
  var datasets = _ref.datasets;
  return _react.default.createElement("ul", null, datasets.map(function (dataset) {
    var datasetLabel = (0, _log_analysis.getFriendlyNameForPartitionId)(dataset.name);
    return _react.default.createElement("li", {
      key: datasetLabel
    }, _react.default.createElement(DatasetLabel, null, datasetLabel));
  }));
};
/*
 * These aim at aligning the list with the EuiHealth list in the neighboring
 * column.
 */


exports.DatasetsList = DatasetsList;

var DatasetLabel = _public.euiStyled.div(_templateObject());