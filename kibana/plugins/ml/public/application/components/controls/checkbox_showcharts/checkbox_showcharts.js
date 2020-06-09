"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxShowCharts = exports.useShowCharts = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _make_id = _interopRequireDefault(require("@elastic/eui/lib/components/form/form_row/make_id"));

var _react2 = require("@kbn/i18n/react");

var _url_state = require("../../../util/url_state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SHOW_CHARTS_DEFAULT = true;
var SHOW_CHARTS_APP_STATE_NAME = 'mlShowCharts';

var useShowCharts = function useShowCharts() {
  var _useUrlState = (0, _url_state.useUrlState)('_a'),
      _useUrlState2 = _slicedToArray(_useUrlState, 2),
      appState = _useUrlState2[0],
      setAppState = _useUrlState2[1];

  return [(appState === null || appState === void 0 ? void 0 : appState.mlShowCharts) !== undefined ? appState === null || appState === void 0 ? void 0 : appState.mlShowCharts : SHOW_CHARTS_DEFAULT, function (d) {
    return setAppState(SHOW_CHARTS_APP_STATE_NAME, d);
  }];
};

exports.useShowCharts = useShowCharts;

var CheckboxShowCharts = function CheckboxShowCharts() {
  var _useShowCharts = useShowCharts(),
      _useShowCharts2 = _slicedToArray(_useShowCharts, 2),
      showCharts = _useShowCharts2[0],
      setShowCarts = _useShowCharts2[1];

  var onChange = function onChange(e) {
    setShowCarts(e.target.checked);
  };

  return _react.default.createElement(_eui.EuiCheckbox, {
    id: (0, _make_id.default)(),
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.controls.checkboxShowCharts.showChartsCheckboxLabel",
      defaultMessage: "Show charts"
    }),
    checked: showCharts,
    onChange: onChange
  });
};

exports.CheckboxShowCharts = CheckboxShowCharts;