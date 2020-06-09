"use strict";

var React = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@storybook/react");

var _ = require(".");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable no-console */
(0, _react2.storiesOf)('components/FlyoutCreateDrilldown', module).add('default', function () {
  return React.createElement(_.FlyoutCreateDrilldown, {
    context: {}
  });
}).add('open in flyout', function () {
  return React.createElement(_eui.EuiFlyout, null, React.createElement(_.FlyoutCreateDrilldown, {
    context: {}
  }));
});