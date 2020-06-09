"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _config = require("./config");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Plugin {
  // @ts-ignore-next-line TODO(rylnd): use it or lose it
  constructor(context) {
    _defineProperty(this, "name", 'siem');

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "config$", void 0);

    const {
      logger
    } = context;
    this.logger = logger.get();
    this.logger.debug('plugin initialized');
    this.config$ = (0, _config.createConfig$)(context);
  }

  setup(core, plugins) {
    this.logger.debug('plugin setup');
  }

  start() {
    this.logger.debug('plugin started');
  }

  stop() {
    this.logger.debug('plugin stopped');
  }

}

exports.Plugin = Plugin;