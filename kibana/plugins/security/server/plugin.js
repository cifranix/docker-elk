"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _utils = require("../../../../src/core/utils");

var _authentication = require("./authentication");

var _authorization = require("./authorization");

var _config = require("./config");

var _routes = require("./routes");

var _licensing = require("../common/licensing");

var _saved_objects = require("./saved_objects");

var _audit = require("./audit");

var _elasticsearch_client_plugin = require("./elasticsearch_client_plugin");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Represents Security Plugin instance that will be managed by the Kibana plugin system.
 */
class Plugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "clusterClient", void 0);

    _defineProperty(this, "spacesService", Symbol('not accessed'));

    _defineProperty(this, "securityLicenseService", void 0);

    _defineProperty(this, "legacyAPI", void 0);

    _defineProperty(this, "getLegacyAPI", () => {
      if (!this.legacyAPI) {
        throw new Error('Legacy API is not registered!');
      }

      return this.legacyAPI;
    });

    _defineProperty(this, "getSpacesService", () => {
      // Changing property value from Symbol to undefined denotes the fact that property was accessed.
      if (!this.wasSpacesServiceAccessed()) {
        this.spacesService = undefined;
      }

      return this.spacesService;
    });

    this.logger = this.initializerContext.logger.get();
  }

  async setup(core, {
    features,
    licensing
  }) {
    const [config, legacyConfig] = await (0, _rxjs.combineLatest)([this.initializerContext.config.create().pipe((0, _operators.map)(rawConfig => (0, _config.createConfig)(rawConfig, this.initializerContext.logger.get('config'), {
      isTLSEnabled: core.http.isTlsEnabled
    }))), this.initializerContext.config.legacy.globalConfig$]).pipe((0, _operators.first)()).toPromise();
    this.clusterClient = core.elasticsearch.createClient('security', {
      plugins: [_elasticsearch_client_plugin.elasticsearchClientPlugin]
    });
    this.securityLicenseService = new _licensing.SecurityLicenseService();
    const {
      license
    } = this.securityLicenseService.setup({
      license$: licensing.license$
    });
    const authc = await (0, _authentication.setupAuthentication)({
      http: core.http,
      clusterClient: this.clusterClient,
      config,
      license,
      loggers: this.initializerContext.logger
    });
    const authz = await (0, _authorization.setupAuthorization)({
      http: core.http,
      clusterClient: this.clusterClient,
      license,
      loggers: this.initializerContext.logger,
      kibanaIndexName: legacyConfig.kibana.index,
      packageVersion: this.initializerContext.env.packageInfo.version,
      getSpacesService: this.getSpacesService,
      featuresService: features
    });
    (0, _saved_objects.setupSavedObjects)({
      auditLogger: new _audit.SecurityAuditLogger(() => this.getLegacyAPI().auditLogger),
      authz,
      savedObjects: core.savedObjects
    });
    core.capabilities.registerSwitcher(authz.disableUnauthorizedCapabilities);
    (0, _routes.defineRoutes)({
      router: core.http.createRouter(),
      basePath: core.http.basePath,
      logger: this.initializerContext.logger.get('routes'),
      clusterClient: this.clusterClient,
      config,
      authc,
      authz,
      csp: core.http.csp,
      license
    });
    return (0, _utils.deepFreeze)({
      authc,
      authz: {
        actions: authz.actions,
        checkPrivilegesWithRequest: authz.checkPrivilegesWithRequest,
        mode: authz.mode
      },
      registerSpacesService: service => {
        if (this.wasSpacesServiceAccessed()) {
          throw new Error('Spaces service has been accessed before registration.');
        }

        this.spacesService = service;
      },
      __legacyCompat: {
        registerLegacyAPI: legacyAPI => this.legacyAPI = legacyAPI,
        registerPrivilegesWithCluster: async () => await authz.registerPrivilegesWithCluster(),
        license
      }
    });
  }

  start() {
    this.logger.debug('Starting plugin');
  }

  stop() {
    this.logger.debug('Stopping plugin');

    if (this.clusterClient) {
      this.clusterClient.close();
      this.clusterClient = undefined;
    }

    if (this.securityLicenseService) {
      this.securityLicenseService.stop();
      this.securityLicenseService = undefined;
    }
  }

  wasSpacesServiceAccessed() {
    return typeof this.spacesService !== 'symbol';
  }

}

exports.Plugin = Plugin;