"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApi = createApi;

var _lodash = require("lodash");

var _boom = _interopRequireDefault(require("boom"));

var _configSchema = require("@kbn/config-schema");

var t = _interopRequireWildcard(require("io-ts"));

var _PathReporter = require("io-ts/lib/PathReporter");

var _Either = require("fp-ts/lib/Either");

var _json_rt = require("../../../common/runtime_types/json_rt");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const debugRt = t.partial({
  _debug: _json_rt.jsonRt.pipe(t.boolean)
});

function createApi() {
  const factoryFns = [];
  const api = {
    _S: {},

    add(fn) {
      factoryFns.push(fn);
      return this;
    },

    init(core, {
      config$,
      logger,
      __LEGACY
    }) {
      const router = core.http.createRouter();
      let config = {};
      config$.subscribe(val => {
        config = val;
      });
      factoryFns.forEach(fn => {
        const {
          params = {},
          path,
          options = {
            tags: ['access:apm']
          },
          method,
          handler
        } = fn(core);
        const routerMethod = (method || 'GET').toLowerCase(); // For all runtime types with props, we create an exact
        // version that will strip all keys that are unvalidated.

        const bodyRt = params.body && 'props' in params.body ? t.exact(params.body) : params.body;
        const rts = {
          // Add _debug query parameter to all routes
          query: params.query ? t.exact(t.intersection([params.query, debugRt])) : t.exact(debugRt),
          path: params.path ? t.exact(params.path) : t.strict({}),
          body: bodyRt || t.null
        };

        const anyObject = _configSchema.schema.object({}, {
          unknowns: 'allow'
        });

        router[routerMethod]({
          path,
          options,
          validate: {
            // `body` can be null, but `validate` expects non-nullable types
            // if any validation is defined. Not having validation currently
            // means we don't get the payload. See
            // https://github.com/elastic/kibana/issues/50179
            body: _configSchema.schema.nullable(anyObject),
            params: anyObject,
            query: anyObject
          }
        }, async (context, request, response) => {
          try {
            const paramMap = {
              path: request.params,
              body: request.body,
              query: {
                _debug: 'false',
                ...request.query
              }
            };
            const parsedParams = Object.keys(rts).reduce((acc, key) => {
              const codec = rts[key];
              const value = paramMap[key];
              const result = codec.decode(value);

              if ((0, _Either.isLeft)(result)) {
                throw _boom.default.badRequest(_PathReporter.PathReporter.report(result)[0]);
              } // `io-ts` has stripped unvalidated keys, so we can compare
              // the output with the input to see if all object keys are
              // known and validated.


              const strippedKeys = (0, _lodash.difference)(Object.keys(value || {}), Object.keys(result.right || {}));

              if (strippedKeys.length) {
                throw _boom.default.badRequest(`Unknown keys specified: ${strippedKeys}`);
              }

              const parsedValue = result.right;
              return { ...acc,
                [key]: parsedValue
              };
            }, {});
            const data = await handler({
              request,
              context: { ...context,
                __LEGACY,
                // Only return values for parameters that have runtime types,
                // but always include query as _debug is always set even if
                // it's not defined in the route.
                params: (0, _lodash.pick)(parsedParams, ...Object.keys(params), 'query'),
                config,
                logger
              }
            });
            return response.ok({
              body: data
            });
          } catch (error) {
            if (_boom.default.isBoom(error)) {
              return convertBoomToKibanaResponse(error, response);
            }

            throw error;
          }
        });
      });
    }

  };
  return api;
}

function convertBoomToKibanaResponse(error, response) {
  const opts = {
    body: error.message
  };

  switch (error.output.statusCode) {
    case 404:
      return response.notFound(opts);

    case 400:
      return response.badRequest(opts);

    case 403:
      return response.forbidden(opts);

    default:
      return response.custom({
        statusCode: error.output.statusCode,
        ...opts
      });
  }
}