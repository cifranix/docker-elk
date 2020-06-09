"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggersActionsProvider = exports.TriggerActionsContext = void 0;

var React = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TriggerActionsContext = React.createContext({
  triggersActionsUI: null
});
exports.TriggerActionsContext = TriggerActionsContext;

var TriggersActionsProvider = function TriggersActionsProvider(props) {
  return React.createElement(TriggerActionsContext.Provider, {
    value: {
      triggersActionsUI: props.triggersActionsUI
    }
  }, props.children);
};

exports.TriggersActionsProvider = TriggersActionsProvider;