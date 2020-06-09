"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _create_default_space = require("./lib/create_default_space");

var _saved_objects_client_wrapper_factory = require("./lib/saved_objects_client/saved_objects_client_wrapper_factory");

var _audit_logger = require("./lib/audit_logger");

var _spaces_tutorial_context_factory = require("./lib/spaces_tutorial_context_factory");

var _usage_collection = require("./usage_collection");

var _spaces_service = require("./spaces_service");

var _request_interceptors = require("./lib/request_interceptors");

var _external = require("./routes/api/external");

var _internal = require("./routes/api/internal");

var _views = require("./routes/views");

var _capabilities = require("./capabilities");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Plugin {
  constructor(initializerContext) {
    _defineProperty(this, "pluginId", 'spaces');

    _defineProperty(this, "config$", void 0);

    _defineProperty(this, "kibanaIndexConfig$", void 0);

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "legacyAPI", void 0);

    _defineProperty(this, "getLegacyAPI", () => {
      if (!this.legacyAPI) {
        throw new Error('Legacy API is not registered!');
      }

      return this.legacyAPI;
    });

    _defineProperty(this, "spacesAuditLogger", void 0);

    _defineProperty(this, "getSpacesAuditLogger", () => {
      if (!this.spacesAuditLogger) {
        this.spacesAuditLogger = new _audit_logger.SpacesAuditLogger(this.getLegacyAPI().auditLogger.create(this.pluginId));
      }

      return this.spacesAuditLogger;
    });

    this.config$ = initializerContext.config.create();
    this.kibanaIndexConfig$ = initializerContext.config.legacy.globalConfig$;
    this.log = initializerContext.logger.get();
  }

  async start() {}

  async setup(core, plugins) {
    const service = new _spaces_service.SpacesService(this.log, this.getLegacyAPI);
    const spacesService = await service.setup({
      http: core.http,
      elasticsearch: core.elasticsearch,
      authorization: plugins.security ? plugins.security.authz : null,
      getSpacesAuditLogger: this.getSpacesAuditLogger,
      config$: this.config$
    });
    const viewRouter = core.http.createRouter();
    (0, _views.initSpacesViewsRoutes)({
      viewRouter,
      cspHeader: core.http.csp.header
    });
    const externalRouter = core.http.createRouter();
    (0, _external.initExternalSpacesApi)({
      externalRouter,
      log: this.log,
      getSavedObjects: () => this.getLegacyAPI().savedObjects,
      spacesService
    });
    const internalRouter = core.http.createRouter();
    (0, _internal.initInternalSpacesApi)({
      internalRouter,
      spacesService
    });
    (0, _request_interceptors.initSpacesRequestInterceptors)({
      http: core.http,
      log: this.log,
      spacesService,
      features: plugins.features
    });
    (0, _capabilities.setupCapabilities)(core, spacesService, this.log);

    if (plugins.usageCollection) {
      (0, _usage_collection.registerSpacesUsageCollector)(plugins.usageCollection, {
        kibanaIndexConfig$: this.kibanaIndexConfig$,
        features: plugins.features,
        licensing: plugins.licensing
      });
    }

    if (plugins.security) {
      plugins.security.registerSpacesService(spacesService);
    }

    if (plugins.home) {
      plugins.home.tutorials.addScopedTutorialContextFactory((0, _spaces_tutorial_context_factory.createSpacesTutorialContextFactory)(spacesService));
    }

    return {
      spacesService,
      __legacyCompat: {
        registerLegacyAPI: legacyAPI => {
          this.legacyAPI = legacyAPI;
          this.setupLegacyComponents(spacesService);
        },
        createDefaultSpace: async () => {
          return await (0, _create_default_space.createDefaultSpace)({
            esClient: core.elasticsearch.adminClient,
            savedObjects: this.getLegacyAPI().savedObjects
          });
        }
      }
    };
  }

  stop() {}

  setupLegacyComponents(spacesService) {
    const legacyAPI = this.getLegacyAPI();
    const {
      addScopedSavedObjectsClientWrapperFactory,
      types
    } = legacyAPI.savedObjects;
    addScopedSavedObjectsClientWrapperFactory(Number.MIN_SAFE_INTEGER, 'spaces', (0, _saved_objects_client_wrapper_factory.spacesSavedObjectsClientWrapperFactory)(spacesService, types));
  }

}

exports.Plugin = Plugin;