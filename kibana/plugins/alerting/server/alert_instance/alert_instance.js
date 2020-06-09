"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertInstance = void 0;

var _common = require("../../common");

var _lib = require("../lib");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AlertInstance {
  constructor({
    state = {},
    meta = {}
  } = {}) {
    _defineProperty(this, "scheduledExecutionOptions", void 0);

    _defineProperty(this, "meta", void 0);

    _defineProperty(this, "state", void 0);

    this.state = state;
    this.meta = meta;
  }

  hasScheduledActions() {
    return this.scheduledExecutionOptions !== undefined;
  }

  isThrottled(throttle) {
    if (this.scheduledExecutionOptions === undefined) {
      return false;
    }

    const throttleMills = throttle ? (0, _lib.parseDuration)(throttle) : 0;
    const actionGroup = this.scheduledExecutionOptions.actionGroup;

    if (this.meta.lastScheduledActions && this.meta.lastScheduledActions.group === actionGroup && this.meta.lastScheduledActions.date.getTime() + throttleMills > Date.now()) {
      return true;
    }

    return false;
  }

  getScheduledActionOptions() {
    return this.scheduledExecutionOptions;
  }

  unscheduleActions() {
    this.scheduledExecutionOptions = undefined;
    return this;
  }

  getState() {
    return this.state;
  }

  scheduleActions(actionGroup, context = {}) {
    if (this.hasScheduledActions()) {
      throw new Error('Alert instance execution has already been scheduled, cannot schedule twice');
    }

    this.scheduledExecutionOptions = {
      actionGroup,
      context,
      state: this.state
    };
    return this;
  }

  replaceState(state) {
    this.state = state;
    return this;
  }

  updateLastScheduledActions(group) {
    this.meta.lastScheduledActions = {
      group,
      date: new Date()
    };
  }
  /**
   * Used to serialize alert instance state
   */


  toJSON() {
    return _common.rawAlertInstance.encode(this.toRaw());
  }

  toRaw() {
    return {
      state: this.state,
      meta: this.meta
    };
  }

}

exports.AlertInstance = AlertInstance;