"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewTab = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _version = require("../../../../../common/version");

var _error_banner = require("../../error_banner");

var _types = require("../../types");

var _steps = require("./steps");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OverviewTab = function OverviewTab(props) {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiText, {
    grow: false
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.overviewTab.tabDetail",
    defaultMessage: "This assistant helps you prepare your cluster and indices for Elasticsearch {nextEsVersion} For other issues that need your attention, see the Elasticsearch logs.",
    values: {
      nextEsVersion: "".concat(_version.NEXT_MAJOR_VERSION, ".x")
    }
  }))), _react.default.createElement(_eui.EuiSpacer, null), props.alertBanner && _react.default.createElement(_react.Fragment, null, props.alertBanner, _react.default.createElement(_eui.EuiSpacer, null)), _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiPageContentBody, null, props.loadingState === _types.LoadingState.Success && _react.default.createElement(_steps.Steps, props), props.loadingState === _types.LoadingState.Loading && _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, null))), props.loadingState === _types.LoadingState.Error && _react.default.createElement(_error_banner.LoadingErrorBanner, {
    loadingError: props.loadingError
  }))));
};

exports.OverviewTab = OverviewTab;