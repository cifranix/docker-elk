"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaffleMetricControls = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _snapshot_api = require("../../../../common/http_api/snapshot_api");

var _custom_metric_form = require("./custom_metric_form");

var _get_custom_metric_label = require("./get_custom_metric_label");

var _metrics_context_menu = require("./metrics_context_menu");

var _mode_switcher = require("./mode_switcher");

var _metrics_edit_mode = require("./metrics_edit_mode");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WaffleMetricControls = function WaffleMetricControls(_ref) {
  var _options$find;

  var fields = _ref.fields,
      onChange = _ref.onChange,
      onChangeCustomMetrics = _ref.onChangeCustomMetrics,
      metric = _ref.metric,
      options = _ref.options,
      customMetrics = _ref.customMetrics;

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setPopoverState = _useState2[1];

  var _useState3 = (0, _react2.useState)('pick'),
      _useState4 = _slicedToArray(_useState3, 2),
      mode = _useState4[0],
      setMode = _useState4[1];

  var _useState5 = (0, _react2.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      editModeCustomMetrics = _useState6[0],
      setEditModeCustomMetrics = _useState6[1];

  var _useState7 = (0, _react2.useState)(),
      _useState8 = _slicedToArray(_useState7, 2),
      editCustomMetric = _useState8[0],
      setEditCustomMetric = _useState8[1];

  var handleClose = (0, _react2.useCallback)(function () {
    setPopoverState(false);
  }, [setPopoverState]);
  var handleToggle = (0, _react2.useCallback)(function () {
    setPopoverState(!isPopoverOpen);
  }, [isPopoverOpen]);
  var handleCustomMetric = (0, _react2.useCallback)(function (newMetric) {
    onChangeCustomMetrics([].concat(_toConsumableArray(customMetrics), [newMetric]));
    onChange(newMetric);
    setMode('pick');
  }, [customMetrics, onChange, onChangeCustomMetrics, setMode]);
  var setModeToEdit = (0, _react2.useCallback)(function () {
    setMode('edit');
    setEditModeCustomMetrics(customMetrics);
  }, [customMetrics]);
  var setModeToAdd = (0, _react2.useCallback)(function () {
    setMode('addMetric');
  }, [setMode]);
  var setModeToPick = (0, _react2.useCallback)(function () {
    setMode('pick');
    setEditModeCustomMetrics([]);
  }, [setMode]);
  var handleDeleteCustomMetric = (0, _react2.useCallback)(function (m) {
    // If the metric we are deleting is the currently selected metric
    // we need to change to the default.
    if (_snapshot_api.SnapshotCustomMetricInputRT.is(metric) && m.id === metric.id) {
      onChange({
        type: options[0].value
      });
    } // Filter out the deleted metric from the editbale.


    var newMetrics = editModeCustomMetrics.filter(function (v) {
      return v.id !== m.id;
    });
    setEditModeCustomMetrics(newMetrics);
  }, [editModeCustomMetrics, metric, onChange, options]);
  var handleEditCustomMetric = (0, _react2.useCallback)(function (currentMetric) {
    var newMetrics = customMetrics.map(function (m) {
      return m.id === currentMetric.id && currentMetric || m;
    });
    onChangeCustomMetrics(newMetrics);
    setModeToPick();
    setEditCustomMetric(void 0);
    setEditModeCustomMetrics([]);
  }, [customMetrics, onChangeCustomMetrics, setModeToPick]);
  var handleSelectMetricToEdit = (0, _react2.useCallback)(function (currentMetric) {
    setEditCustomMetric(currentMetric);
    setMode('editMetric');
  }, [setMode, setEditCustomMetric]);
  var handleSaveEdit = (0, _react2.useCallback)(function () {
    onChangeCustomMetrics(editModeCustomMetrics);
    setMode('pick');
  }, [editModeCustomMetrics, onChangeCustomMetrics]);

  if (!options.length || !metric.type) {
    throw Error(_i18n.i18n.translate('xpack.infra.waffle.unableToSelectMetricErrorTitle', {
      defaultMessage: 'Unable to select options or value for metric.'
    }));
  }

  var id = _snapshot_api.SnapshotCustomMetricInputRT.is(metric) && metric.id ? metric.id : metric.type;
  var currentLabel = _snapshot_api.SnapshotCustomMetricInputRT.is(metric) ? (0, _get_custom_metric_label.getCustomMetricLabel)(metric) : (_options$find = options.find(function (o) {
    return o.value === id;
  })) === null || _options$find === void 0 ? void 0 : _options$find.text;

  if (!currentLabel) {
    return null;
  }

  var button = _react2.default.createElement(_eui.EuiFilterButton, {
    iconType: "arrowDown",
    onClick: handleToggle
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.waffle.metricButtonLabel",
    defaultMessage: "Metric: {selectedMetric}",
    values: {
      selectedMetric: currentLabel
    }
  }));

  return _react2.default.createElement(_eui.EuiFilterGroup, null, _react2.default.createElement(_eui.EuiPopover, {
    isOpen: isPopoverOpen,
    id: "metricsPanel",
    button: button,
    anchorPosition: "downLeft",
    panelPaddingSize: "none",
    closePopover: handleClose
  }, mode === 'pick' ? _react2.default.createElement(_metrics_context_menu.MetricsContextMenu, {
    onChange: onChange,
    onClose: handleClose,
    metric: metric,
    customMetrics: customMetrics,
    options: options
  }) : null, mode === 'addMetric' ? _react2.default.createElement(_custom_metric_form.CustomMetricForm, {
    fields: fields,
    customMetrics: customMetrics,
    onChange: handleCustomMetric,
    onCancel: setModeToPick
  }) : null, mode === 'editMetric' ? _react2.default.createElement(_custom_metric_form.CustomMetricForm, {
    metric: editCustomMetric,
    fields: fields,
    customMetrics: customMetrics,
    onChange: handleEditCustomMetric,
    onCancel: setModeToEdit
  }) : null, mode === 'edit' ? _react2.default.createElement(_metrics_edit_mode.MetricsEditMode, {
    customMetrics: editModeCustomMetrics,
    options: options,
    onEdit: handleSelectMetricToEdit,
    onDelete: handleDeleteCustomMetric
  }) : null, _react2.default.createElement(_mode_switcher.ModeSwitcher, {
    onEditCancel: setModeToPick,
    onEdit: setModeToEdit,
    onAdd: setModeToAdd,
    mode: mode,
    onSave: handleSaveEdit,
    customMetrics: customMetrics
  })));
};

exports.WaffleMetricControls = WaffleMetricControls;