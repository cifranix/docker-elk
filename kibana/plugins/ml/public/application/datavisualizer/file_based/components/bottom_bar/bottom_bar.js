"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../file_datavisualizer_view/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Bottom bar component for Data Visualizer page.
 */
var BottomBar = function BottomBar(_ref) {
  var mode = _ref.mode,
      onChangeMode = _ref.onChangeMode,
      onCancel = _ref.onCancel,
      disableImport = _ref.disableImport;

  if (mode === _constants.MODE.READ) {
    return _react.default.createElement(_eui.EuiBottomBar, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: disableImport ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.fileDatavisualizer.bottomBar.missingImportPrivilegesMessage",
        defaultMessage: "You don't have the privileges required to import data"
      }) : null
    }, _react.default.createElement(_eui.EuiButton, {
      fill: true,
      isDisabled: disableImport,
      onClick: function onClick() {
        return onChangeMode(_constants.MODE.IMPORT);
      },
      "data-test-subj": "mlFileDataVisOpenImportPageButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.fileDatavisualizer.bottomBar.readMode.importButtonLabel",
      defaultMessage: "Import"
    })))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      color: "ghost",
      onClick: function onClick() {
        return onCancel();
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.fileDatavisualizer.bottomBar.readMode.cancelButtonLabel",
      defaultMessage: "Cancel"
    })))));
  } else {
    return _react.default.createElement(_eui.EuiBottomBar, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButton, {
      color: "ghost",
      onClick: function onClick() {
        return onChangeMode(_constants.MODE.READ);
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.fileDatavisualizer.bottomBar.backButtonLabel",
      defaultMessage: "Back"
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      color: "ghost",
      onClick: function onClick() {
        return onCancel();
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.fileDatavisualizer.bottomBar.cancelButtonLabel",
      defaultMessage: "Cancel"
    })))));
  }
};

exports.BottomBar = BottomBar;