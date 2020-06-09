"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UMKibanaBackendFrameworkAdapter = void 0;

var _configSchema = require("@kbn/config-schema");

var _apolloServerCore = require("apollo-server-core");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class UMKibanaBackendFrameworkAdapter {
  constructor(server) {
    this.server = server;
    this.server = server;
  }

  registerRoute({
    handler,
    method,
    options,
    path,
    validate
  }) {
    const routeDefinition = {
      path,
      validate,
      options
    };

    switch (method) {
      case 'GET':
        this.server.route.get(routeDefinition, handler);
        break;

      case 'POST':
        this.server.route.post(routeDefinition, handler);
        break;

      default:
        throw new Error(`Handler for method ${method} is not defined`);
    }
  }

  registerGraphQLEndpoint(routePath, schema) {
    this.server.route.post({
      path: routePath,
      validate: {
        body: _configSchema.schema.object({
          operationName: _configSchema.schema.nullable(_configSchema.schema.string()),
          query: _configSchema.schema.string(),
          variables: _configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.any())
        })
      },
      options: {
        tags: ['access:uptime-read']
      }
    }, async (context, request, resp) => {
      const {
        core: {
          elasticsearch: {
            dataClient: {
              callAsCurrentUser
            }
          }
        }
      } = context;
      const options = {
        graphQLOptions: _req => {
          return {
            context: { ...context,
              APICaller: callAsCurrentUser,
              savedObjectsClient: context.core.savedObjects.client
            },
            schema
          };
        },
        path: routePath,
        route: {
          tags: ['access:uptime-read']
        }
      };

      try {
        const query = request.body;
        const graphQLResponse = await (0, _apolloServerCore.runHttpQuery)([request], {
          method: 'POST',
          options: options.graphQLOptions,
          query
        });
        return resp.ok({
          body: graphQLResponse,
          headers: {
            'content-type': 'application/json'
          }
        });
      } catch (error) {
        if (error.isGraphQLError === true) {
          return resp.internalError({
            body: {
              message: error.message
            },
            headers: {
              'content-type': 'application/json'
            }
          });
        }

        return resp.internalError();
      }
    });
  }

}

exports.UMKibanaBackendFrameworkAdapter = UMKibanaBackendFrameworkAdapter;