"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaFramework = void 0;

var _apolloServerCore = require("apollo-server-core");

var _configSchema = require("@kbn/config-schema");

var _server = require("../../../../../../../src/plugins/data/server");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class KibanaFramework {
  constructor(core, config, plugins) {
    _defineProperty(this, "router", void 0);

    _defineProperty(this, "plugins", void 0);

    this.router = core.http.createRouter();
    this.plugins = plugins;
  }

  registerRoute(config, handler) {
    const defaultOptions = {
      tags: ['access:infra']
    };
    const routeConfig = {
      path: config.path,
      validate: config.validate,
      // Currently we have no use of custom options beyond tags, this can be extended
      // beyond defaultOptions if it's needed.
      options: defaultOptions
    };

    switch (config.method) {
      case 'get':
        this.router.get(routeConfig, handler);
        break;

      case 'post':
        this.router.post(routeConfig, handler);
        break;

      case 'delete':
        this.router.delete(routeConfig, handler);
        break;

      case 'put':
        this.router.put(routeConfig, handler);
        break;
    }
  }

  registerGraphQLEndpoint(routePath, gqlSchema) {
    // These endpoints are validated by GraphQL at runtime and with GraphQL generated types
    const body = _configSchema.schema.object({}, {
      unknowns: 'allow'
    });

    const routeOptions = {
      path: `/api/infra${routePath}`,
      validate: {
        body
      },
      options: {
        tags: ['access:infra']
      }
    };

    async function handler(context, request, response) {
      try {
        const query = request.route.method === 'post' ? request.body : request.query;
        const gqlResponse = await (0, _apolloServerCore.runHttpQuery)([context, request], {
          method: request.route.method.toUpperCase(),
          options: (req, rawReq) => ({
            context: {
              req,
              rawReq
            },
            schema: gqlSchema
          }),
          query
        });
        return response.ok({
          body: gqlResponse,
          headers: {
            'content-type': 'application/json'
          }
        });
      } catch (error) {
        const errorBody = {
          message: error.message
        };

        if ('HttpQueryError' !== error.name) {
          return response.internalError({
            body: errorBody
          });
        }

        if (error.isGraphQLError === true) {
          return response.customError({
            statusCode: error.statusCode,
            body: errorBody,
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }

        const {
          headers = [],
          statusCode = 500
        } = error;
        return response.customError({
          statusCode,
          headers,
          body: errorBody
        });
      }
    }

    this.router.post(routeOptions, handler);
    this.router.get(routeOptions, handler);
  }

  async callWithRequest(requestContext, endpoint, params) {
    const {
      elasticsearch,
      uiSettings
    } = requestContext.core;
    const includeFrozen = await uiSettings.client.get('search:includeFrozen');

    if (endpoint === 'msearch') {
      const maxConcurrentShardRequests = await uiSettings.client.get('courier:maxConcurrentShardRequests');

      if (maxConcurrentShardRequests > 0) {
        params = { ...params,
          max_concurrent_shard_requests: maxConcurrentShardRequests
        };
      }
    }

    const frozenIndicesParams = ['search', 'msearch'].includes(endpoint) ? {
      ignore_throttled: !includeFrozen
    } : {};
    return elasticsearch.dataClient.callAsCurrentUser(endpoint, { ...params,
      ...frozenIndicesParams
    });
  }

  getIndexPatternsService(requestContext) {
    return new _server.IndexPatternsFetcher((...rest) => {
      rest[1] = rest[1] || {};
      rest[1].allowNoIndices = true;
      return requestContext.core.elasticsearch.adminClient.callAsCurrentUser(...rest);
    });
  }

  getSpaceId(request) {
    const spacesPlugin = this.plugins.spaces;

    if (spacesPlugin && spacesPlugin.spacesService && typeof spacesPlugin.spacesService.getSpaceId === 'function') {
      return spacesPlugin.spacesService.getSpaceId(request);
    } else {
      return 'default';
    }
  }

  async makeTSVBRequest(requestContext, rawRequest, model, timerange, filters) {
    const {
      getVisData
    } = this.plugins.metrics;

    if (typeof getVisData !== 'function') {
      throw new Error('TSVB is not available');
    }

    const options = {
      timerange,
      panels: [model],
      filters
    };
    return getVisData(requestContext, rawRequest, options);
  }

}

exports.KibanaFramework = KibanaFramework;