"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpacesService = void 0;

var _operators = require("rxjs/operators");

var _server = require("../../../../../src/core/server");

var _spaces_client = require("../lib/spaces_client");

var _spaces_url_parser = require("../../common/lib/spaces_url_parser");

var _constants = require("../../common/constants");

var _namespace = require("../lib/utils/namespace");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SpacesService {
  constructor(log, getLegacyAPI) {
    this.log = log;
    this.getLegacyAPI = getLegacyAPI;

    _defineProperty(this, "configSubscription$", void 0);
  }

  async setup({
    http,
    elasticsearch,
    authorization,
    config$,
    getSpacesAuditLogger
  }) {
    const getSpaceId = request => {
      // Currently utilized by reporting
      const isFakeRequest = typeof request.getBasePath === 'function';
      const basePath = isFakeRequest ? request.getBasePath() : http.basePath.get(request);
      const spaceId = (0, _spaces_url_parser.getSpaceIdFromPath)(basePath, http.basePath.serverBasePath);
      return spaceId;
    };

    const getScopedClient = async request => {
      return config$.pipe((0, _operators.map)(config => {
        const internalRepository = this.getLegacyAPI().savedObjects.getSavedObjectsRepository(elasticsearch.adminClient.callAsInternalUser, ['space']);
        const callCluster = elasticsearch.adminClient.asScoped(request).callAsCurrentUser;
        const callWithRequestRepository = this.getLegacyAPI().savedObjects.getSavedObjectsRepository(callCluster, ['space']);
        return new _spaces_client.SpacesClient(getSpacesAuditLogger(), message => {
          this.log.debug(message);
        }, authorization, callWithRequestRepository, config, internalRepository, request);
      }), (0, _operators.take)(1)).toPromise();
    };

    return {
      getSpaceId,
      getBasePath: spaceId => {
        if (!spaceId) {
          throw new TypeError(`spaceId is required to retrieve base path`);
        }

        return (0, _spaces_url_parser.addSpaceIdToPath)(http.basePath.serverBasePath, spaceId);
      },
      isInDefaultSpace: request => {
        const spaceId = getSpaceId(request);
        return spaceId === _constants.DEFAULT_SPACE_ID;
      },
      spaceIdToNamespace: _namespace.spaceIdToNamespace,
      namespaceToSpaceId: _namespace.namespaceToSpaceId,
      scopedClient: getScopedClient,
      getActiveSpace: async request => {
        const spaceId = getSpaceId(request);
        const spacesClient = await getScopedClient(request instanceof _server.KibanaRequest ? request : _server.KibanaRequest.from(request));
        return spacesClient.get(spaceId);
      }
    };
  }

  async stop() {
    if (this.configSubscription$) {
      this.configSubscription$.unsubscribe();
      this.configSubscription$ = undefined;
    }
  }

}

exports.SpacesService = SpacesService;