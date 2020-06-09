"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActions = void 0;

var _react = _interopRequireDefault(require("react"));

var _common = require("../../../../../../common");

var _action_clone = require("./action_clone");

var _action_start = require("./action_start");

var _action_stop = require("./action_stop");

var _action_delete = require("./action_delete");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getActions = function getActions(_ref) {
  var forceDisable = _ref.forceDisable;
  return [{
    isPrimary: true,
    render: function render(item) {
      if (item.stats.state === _common.TRANSFORM_STATE.STOPPED) {
        return _react.default.createElement(_action_start.StartAction, {
          items: [item],
          forceDisable: forceDisable
        });
      }

      return _react.default.createElement(_action_stop.StopAction, {
        items: [item],
        forceDisable: forceDisable
      });
    }
  }, {
    render: function render(item) {
      return _react.default.createElement(_action_clone.CloneAction, {
        itemId: item.id
      });
    }
  }, {
    render: function render(item) {
      return _react.default.createElement(_action_delete.DeleteAction, {
        items: [item],
        forceDisable: forceDisable
      });
    }
  }];
};

exports.getActions = getActions;