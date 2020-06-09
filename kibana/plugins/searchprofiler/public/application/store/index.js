"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "useStore", {
  enumerable: true,
  get: function get() {
    return _store.useStore;
  }
});
Object.defineProperty(exports, "State", {
  enumerable: true,
  get: function get() {
    return _store.State;
  }
});
Object.defineProperty(exports, "Action", {
  enumerable: true,
  get: function get() {
    return _reducer.Action;
  }
});

var _store = require("./store");

var _reducer = require("./reducer");