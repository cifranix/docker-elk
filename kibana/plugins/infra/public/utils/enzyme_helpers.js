"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountHook = void 0;

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _testUtils = require("react-dom/test-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Allows for execution of hooks inside of a test component which records the
 * returned values.
 *
 * @param body A function that calls the hook and returns data derived from it
 * @param WrapperComponent A component that, if provided, will be wrapped
 * around the test component. This can be useful to provide context values.
 * @return {ReactHookWrapper} An object providing access to the hook state and
 * functions to interact with it.
 */
var mountHook = function mountHook(body, WrapperComponent) {
  var initialArgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var hookValueCallback = jest.fn();
  var component;

  var act = function act(actor) {
    (0, _testUtils.act)(function () {
      actor(getLastHookValue(), function (args) {
        return component.setProps(args);
      });
      component.update();
    });
  };

  var getLastHookValue = function getLastHookValue() {
    var calls = hookValueCallback.mock.calls;

    if (calls.length <= 0) {
      throw Error('No recent hook value present.');
    }

    return calls[calls.length - 1][0];
  };

  var HookComponent = function HookComponent(props) {
    hookValueCallback(body(props));
    return null;
  };

  var TestComponent = function TestComponent(args) {
    return WrapperComponent ? _react.default.createElement(WrapperComponent, null, _react.default.createElement(HookComponent, args)) : _react.default.createElement(HookComponent, args);
  };

  (0, _testUtils.act)(function () {
    component = (0, _enzyme.mount)(_react.default.createElement(TestComponent, initialArgs));
  });
  return {
    act: act,
    component: component,
    getLastHookValue: getLastHookValue,
    hookValueCallback: hookValueCallback
  };
};

exports.mountHook = mountHook;