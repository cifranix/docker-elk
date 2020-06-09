"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsContextMenu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _snapshot_api = require("../../../../common/http_api/snapshot_api");

var _types = require("../../../../common/inventory_models/types");

var _get_custom_metric_label = require("./get_custom_metric_label");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var MetricsContextMenu = function MetricsContextMenu(_ref) {
  var onClose = _ref.onClose,
      onChange = _ref.onChange,
      metric = _ref.metric,
      options = _ref.options,
      customMetrics = _ref.customMetrics;
  var id = _snapshot_api.SnapshotCustomMetricInputRT.is(metric) && metric.id ? metric.id : metric.type;
  var handleClick = (0, _react.useCallback)(function (val) {
    if (!_types.SnapshotMetricTypeRT.is(val)) {
      var selectedMetric = customMetrics.find(function (m) {
        return m.id === val;
      });

      if (selectedMetric) {
        onChange(selectedMetric);
      }
    } else {
      onChange({
        type: val
      });
    }

    onClose();
  }, [customMetrics, onChange, onClose]);
  var panels = [{
    id: 0,
    title: '',
    items: [].concat(_toConsumableArray(options.map(function (o) {
      var icon = o.value === id ? 'check' : 'empty';
      var panel = {
        name: o.text,
        onClick: function onClick() {
          return handleClick(o.value);
        },
        icon: icon
      };
      return panel;
    })), _toConsumableArray(customMetrics.map(function (m) {
      var icon = m.id === id ? 'check' : 'empty';
      var panel = {
        name: (0, _get_custom_metric_label.getCustomMetricLabel)(m),
        onClick: function onClick() {
          return handleClick(m.id);
        },
        icon: icon
      };
      return panel;
    })))
  }];
  return _react.default.createElement(_eui.EuiContextMenu, {
    initialPanelId: 0,
    panels: panels
  });
};

exports.MetricsContextMenu = MetricsContextMenu;