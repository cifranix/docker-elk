"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _test_data = require("./test_data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react2.storiesOf)('components/ActionWizard', module).add('default', function () {
  return _react.default.createElement(_test_data.Demo, {
    actionFactories: [_test_data.dashboardDrilldownActionFactory, _test_data.urlDrilldownActionFactory]
  });
}).add('Only one factory is available', function () {
  return (// to make sure layout doesn't break
    _react.default.createElement(_test_data.Demo, {
      actionFactories: [_test_data.dashboardDrilldownActionFactory]
    })
  );
}).add('Long list of action factories', function () {
  return (// to make sure layout doesn't break
    _react.default.createElement(_test_data.Demo, {
      actionFactories: [_test_data.dashboardDrilldownActionFactory, _test_data.urlDrilldownActionFactory, _test_data.dashboardDrilldownActionFactory, _test_data.urlDrilldownActionFactory, _test_data.dashboardDrilldownActionFactory, _test_data.urlDrilldownActionFactory, _test_data.dashboardDrilldownActionFactory, _test_data.urlDrilldownActionFactory]
    })
  );
});