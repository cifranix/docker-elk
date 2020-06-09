"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _operators = require("rxjs/operators");

var _event_log_service = require("./event_log_service");

var _es = require("./es");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PROVIDER = 'eventLog';
const ACTIONS = {
  starting: 'starting',
  stopping: 'stopping'
};

class Plugin {
  constructor(context) {
    this.context = context;

    _defineProperty(this, "config$", void 0);

    _defineProperty(this, "systemLogger", void 0);

    _defineProperty(this, "eventLogService", void 0);

    _defineProperty(this, "esContext", void 0);

    _defineProperty(this, "eventLogger", void 0);

    _defineProperty(this, "globalConfig$", void 0);

    this.systemLogger = this.context.logger.get();
    this.config$ = this.context.config.create();
    this.globalConfig$ = this.context.config.legacy.globalConfig$;
  }

  async setup(core) {
    const globalConfig = await this.globalConfig$.pipe((0, _operators.first)()).toPromise();
    const kibanaIndex = globalConfig.kibana.index;
    this.systemLogger.debug('setting up plugin');
    const config = await this.config$.pipe((0, _operators.first)()).toPromise();
    this.esContext = (0, _es.createEsContext)({
      logger: this.systemLogger,
      // TODO: get index prefix from config.get(kibana.index)
      indexNameRoot: kibanaIndex,
      clusterClient: core.elasticsearch.adminClient
    });
    this.eventLogService = new _event_log_service.EventLogService({
      config,
      esContext: this.esContext,
      systemLogger: this.systemLogger,
      kibanaUUID: core.uuid.getInstanceUuid()
    });
    this.eventLogService.registerProviderActions(PROVIDER, Object.values(ACTIONS));
    this.eventLogger = this.eventLogService.getLogger({
      event: {
        provider: PROVIDER
      }
    });
    return this.eventLogService;
  }

  async start(core) {
    this.systemLogger.debug('starting plugin');
    if (!this.esContext) throw new Error('esContext not initialized');
    if (!this.eventLogger) throw new Error('eventLogger not initialized');
    if (!this.eventLogService) throw new Error('eventLogService not initialized'); // launches initialization async

    if (this.eventLogService.isIndexingEntries()) {
      this.esContext.initialize();
    } // will log the event after initialization


    this.eventLogger.logEvent({
      event: {
        action: ACTIONS.starting
      },
      message: 'eventLog starting'
    });
  }

  stop() {
    this.systemLogger.debug('stopping plugin');
    if (!this.eventLogger) throw new Error('eventLogger not initialized'); // note that it's unlikely this event would ever be written,
    // when Kibana is actuaelly stopping, as it's written asynchronously

    this.eventLogger.logEvent({
      event: {
        action: ACTIONS.stopping
      },
      message: 'eventLog stopping'
    });
  }

}

exports.Plugin = Plugin;