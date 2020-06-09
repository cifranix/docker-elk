"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasPlugin = void 0;

var _operators = require("rxjs/operators");

var _routes = require("./routes");

var _collectors = require("./collectors");

var _sample_data = require("./sample_data");

var _setup_interpreter = require("./setup_interpreter");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CanvasPlugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "logger", void 0);

    this.logger = initializerContext.logger.get();
  }

  async setup(coreSetup, plugins) {
    plugins.features.registerFeature({
      id: 'canvas',
      name: 'Canvas',
      order: 400,
      icon: 'canvasApp',
      navLinkId: 'canvas',
      app: ['canvas', 'kibana'],
      catalogue: ['canvas'],
      privileges: {
        all: {
          app: ['canvas', 'kibana'],
          catalogue: ['canvas'],
          savedObject: {
            all: ['canvas-workpad', 'canvas-element'],
            read: ['index-pattern']
          },
          ui: ['save', 'show']
        },
        read: {
          app: ['canvas', 'kibana'],
          catalogue: ['canvas'],
          savedObject: {
            all: [],
            read: ['index-pattern', 'canvas-workpad', 'canvas-element']
          },
          ui: ['show']
        }
      }
    });
    const canvasRouter = coreSetup.http.createRouter();
    (0, _routes.initRoutes)({
      router: canvasRouter,
      logger: this.logger
    });
    (0, _sample_data.loadSampleData)(plugins.home.sampleData.addSavedObjectsToSampleDataset, plugins.home.sampleData.addAppLinksToSampleDataset); // we need the kibana index provided by global config for the Canvas usage collector

    const globalConfig = await this.initializerContext.config.legacy.globalConfig$.pipe((0, _operators.first)()).toPromise();
    (0, _collectors.registerCanvasUsageCollector)(plugins.usageCollection, globalConfig.kibana.index);
    (0, _setup_interpreter.setupInterpreter)(plugins.expressions);
  }

  start() {}

  stop() {}

}

exports.CanvasPlugin = CanvasPlugin;