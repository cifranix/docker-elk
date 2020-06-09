"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotState = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _constants = require("../../../../../constants");

var _app_context = require("../../../../../app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SnapshotState = function SnapshotState(_ref) {
  var _stateMap;

  var state = _ref.state;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var stateMap = (_stateMap = {}, _defineProperty(_stateMap, _constants.SNAPSHOT_STATE.IN_PROGRESS, {
    icon: _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "m"
    }),
    label: i18n.translate('xpack.snapshotRestore.snapshotState.inProgressLabel', {
      defaultMessage: 'Taking snapshot…'
    })
  }), _defineProperty(_stateMap, _constants.SNAPSHOT_STATE.SUCCESS, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      color: "success",
      type: "check"
    }),
    label: i18n.translate('xpack.snapshotRestore.snapshotState.completeLabel', {
      defaultMessage: 'Snapshot complete'
    })
  }), _defineProperty(_stateMap, _constants.SNAPSHOT_STATE.FAILED, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      color: "danger",
      type: "cross"
    }),
    label: i18n.translate('xpack.snapshotRestore.snapshotState.failedLabel', {
      defaultMessage: 'Snapshot failed'
    })
  }), _defineProperty(_stateMap, _constants.SNAPSHOT_STATE.PARTIAL, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      color: "warning",
      type: "alert"
    }),
    label: i18n.translate('xpack.snapshotRestore.snapshotState.partialLabel', {
      defaultMessage: 'Partial failure'
    }),
    tip: i18n.translate('xpack.snapshotRestore.snapshotState.partialTipDescription', {
      defaultMessage: "Global cluster state was stored, but at least one shard wasn't stored successfully. See the 'Failed indices' tab."
    })
  }), _defineProperty(_stateMap, _constants.SNAPSHOT_STATE.INCOMPATIBLE, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      color: "warning",
      type: "alert"
    }),
    label: i18n.translate('xpack.snapshotRestore.snapshotState.incompatibleLabel', {
      defaultMessage: 'Incompatible version'
    }),
    tip: i18n.translate('xpack.snapshotRestore.snapshotState.incompatibleTipDescription', {
      defaultMessage: "Snapshot was created with a version of Elasticsearch incompatible with the cluster's version."
    })
  }), _stateMap);

  if (!stateMap[state]) {
    // Help debug unexpected state.
    return state;
  }

  var _stateMap$state = stateMap[state],
      icon = _stateMap$state.icon,
      label = _stateMap$state.label,
      tip = _stateMap$state.tip;

  var iconTip = tip && _react.default.createElement(_react.Fragment, null, ' ', _react.default.createElement(_eui.EuiIconTip, {
    content: tip
  }));

  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs",
    alignItems: "center",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, icon), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("div", null, label, iconTip)));
};

exports.SnapshotState = SnapshotState;