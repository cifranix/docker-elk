"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENT_LOGGED_PREFIX = exports.EventLogger = void 0;

var _configSchema = require("@kbn/config-schema");

var _lodash = require("lodash");

var _types = require("./types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EventLogger {
  constructor(ctorParams) {
    _defineProperty(this, "esContext", void 0);

    _defineProperty(this, "eventLogService", void 0);

    _defineProperty(this, "initialProperties", void 0);

    _defineProperty(this, "systemLogger", void 0);

    this.esContext = ctorParams.esContext;
    this.eventLogService = ctorParams.eventLogService;
    this.initialProperties = ctorParams.initialProperties;
    this.systemLogger = ctorParams.systemLogger;
  }

  startTiming(event) {
    if (event == null) return;
    event.event = event.event || {};
    event.event.start = new Date().toISOString();
  }

  stopTiming(event) {
    if ((event === null || event === void 0 ? void 0 : event.event) == null) return;
    const start = getEventStart(event);
    if (start == null || isNaN(start)) return;
    const end = Date.now();
    event.event.end = new Date(end).toISOString();
    event.event.duration = (end - start) * 1000 * 1000; // nanoseconds
  } // non-blocking, but spawns an async task to do the work


  logEvent(eventProperties) {
    if (!this.eventLogService.isEnabled()) return;
    const event = {};
    const fixedProperties = {
      '@timestamp': new Date().toISOString(),
      ecs: {
        version: _types.ECS_VERSION
      },
      kibana: {
        server_uuid: this.eventLogService.kibanaUUID
      }
    }; // merge the initial properties and event properties

    (0, _lodash.merge)(event, this.initialProperties, eventProperties, fixedProperties);
    let validatedEvent;

    try {
      validatedEvent = validateEvent(this.eventLogService, event);
    } catch (err) {
      this.systemLogger.warn(`invalid event logged: ${err.message}`);
      return;
    }

    const doc = {
      index: this.esContext.esNames.alias,
      body: validatedEvent
    };

    if (this.eventLogService.isIndexingEntries()) {
      indexEventDoc(this.esContext, doc);
    }

    if (this.eventLogService.isLoggingEntries()) {
      logEventDoc(this.systemLogger, doc);
    }
  }

} // return the epoch millis of the start date, or null; may be NaN if garbage


exports.EventLogger = EventLogger;

function getEventStart(event) {
  var _event$event;

  if ((event === null || event === void 0 ? void 0 : (_event$event = event.event) === null || _event$event === void 0 ? void 0 : _event$event.start) == null) return null;
  return Date.parse(event.event.start);
}

const RequiredEventSchema = _configSchema.schema.object({
  provider: _configSchema.schema.string({
    minLength: 1
  }),
  action: _configSchema.schema.string({
    minLength: 1
  })
});

function validateEvent(eventLogService, event) {
  if ((event === null || event === void 0 ? void 0 : event.event) == null) {
    throw new Error(`no "event" property`);
  } // ensure there are provider/action properties in event as strings


  const requiredProps = {
    provider: event.event.provider,
    action: event.event.action
  }; // will throw an error if structure doesn't validate

  const {
    provider,
    action
  } = RequiredEventSchema.validate(requiredProps);

  if (!eventLogService.isProviderActionRegistered(provider, action)) {
    throw new Error(`unregistered provider/action: "${provider}" / "${action}"`);
  } // could throw an error


  return _types.EventSchema.validate(event);
}

const EVENT_LOGGED_PREFIX = `event logged: `;
exports.EVENT_LOGGED_PREFIX = EVENT_LOGGED_PREFIX;

function logEventDoc(logger, doc) {
  setImmediate(() => {
    logger.info(`${EVENT_LOGGED_PREFIX}${JSON.stringify(doc.body)}`);
  });
}

function indexEventDoc(esContext, doc) {
  // TODO:
  // the setImmediate() on an async function is a little overkill, but,
  // setImmediate() may be tweakable via node params, whereas async
  // tweaking is in the v8 params realm, which is very dicey.
  // Long-term, we should probably create an in-memory queue for this, so
  // we can explictly see/set the queue lengths.
  // already verified this.clusterClient isn't null above
  setImmediate(async () => {
    try {
      await indexLogEventDoc(esContext, doc);
    } catch (err) {
      esContext.logger.warn(`error writing event doc: ${err.message}`);
      writeLogEventDocOnError(esContext, doc);
    }
  });
} // whew, the thing that actually writes the event log document!


async function indexLogEventDoc(esContext, doc) {
  esContext.logger.debug(`writing to event log: ${JSON.stringify(doc)}`);
  await esContext.waitTillReady();
  await esContext.esAdapter.indexDocument(doc);
  esContext.logger.debug(`writing to event log complete`);
} // TODO: write log entry to a bounded queue buffer


function writeLogEventDocOnError(esContext, doc) {
  esContext.logger.warn(`unable to write event doc: ${JSON.stringify(doc)}`);
}