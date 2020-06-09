"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CasePlugin = void 0;

var _operators = require("rxjs/operators");

var _api = require("./routes/api");

var _saved_object_types = require("./saved_object_types");

var _services = require("./services");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createConfig$(context) {
  return context.config.create().pipe((0, _operators.map)(config => config));
}

class CasePlugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "log", void 0);

    this.log = this.initializerContext.logger.get();
  }

  async setup(core, plugins) {
    const config = await createConfig$(this.initializerContext).pipe((0, _operators.first)()).toPromise();

    if (!config.enabled) {
      return;
    }

    core.savedObjects.registerType(_saved_object_types.caseSavedObjectType);
    core.savedObjects.registerType(_saved_object_types.caseCommentSavedObjectType);
    core.savedObjects.registerType(_saved_object_types.caseConfigureSavedObjectType);
    core.savedObjects.registerType(_saved_object_types.caseUserActionSavedObjectType);
    const caseServicePlugin = new _services.CaseService(this.log);
    const caseConfigureServicePlugin = new _services.CaseConfigureService(this.log);
    const userActionServicePlugin = new _services.CaseUserActionService(this.log);
    this.log.debug(`Setting up Case Workflow with core contract [${Object.keys(core)}] and plugins [${Object.keys(plugins)}]`);
    const caseService = await caseServicePlugin.setup({
      authentication: plugins.security != null ? plugins.security.authc : null
    });
    const caseConfigureService = await caseConfigureServicePlugin.setup();
    const userActionService = await userActionServicePlugin.setup();
    const router = core.http.createRouter();
    (0, _api.initCaseApi)({
      caseConfigureService,
      caseService,
      userActionService,
      router
    });
  }

  start() {
    this.log.debug(`Starting Case Workflow`);
  }

  stop() {
    this.log.debug(`Stopping Case Workflow`);
  }

}

exports.CasePlugin = CasePlugin;