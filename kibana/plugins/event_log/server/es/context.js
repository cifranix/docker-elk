"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEsContext = createEsContext;

var _names = require("./names");

var _init = require("./init");

var _cluster_client_adapter = require("./cluster_client_adapter");

var _ready_signal = require("../lib/ready_signal");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createEsContext(params) {
  return new EsContextImpl(params);
}

class EsContextImpl {
  constructor(params) {
    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "esNames", void 0);

    _defineProperty(this, "esAdapter", void 0);

    _defineProperty(this, "readySignal", void 0);

    _defineProperty(this, "initialized", void 0);

    this.logger = params.logger;
    this.esNames = (0, _names.getEsNames)(params.indexNameRoot);
    this.readySignal = (0, _ready_signal.createReadySignal)();
    this.initialized = false;
    this.esAdapter = new _cluster_client_adapter.ClusterClientAdapter({
      logger: params.logger,
      clusterClient: params.clusterClient
    });
  }

  initialize() {
    // only run the initialization method once
    if (this.initialized) return;
    this.initialized = true;
    this.logger.debug('initializing EsContext');
    setImmediate(async () => {
      try {
        await this._initialize();
        this.logger.debug('readySignal.signal(true)');
        this.readySignal.signal(true);
      } catch (err) {
        this.logger.debug('readySignal.signal(false)');
        this.readySignal.signal(false);
      }
    });
  }

  async waitTillReady() {
    return await this.readySignal.wait();
  }

  async _initialize() {
    await (0, _init.initializeEs)(this);
  }

}