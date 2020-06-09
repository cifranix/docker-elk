"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeFindCustomElementsRoute = initializeFindCustomElementsRoute;

var _configSchema = require("@kbn/config-schema");

var _constants = require("../../../../../legacy/plugins/canvas/common/lib/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initializeFindCustomElementsRoute(deps) {
  const {
    router
  } = deps;
  router.get({
    path: `${_constants.API_ROUTE_CUSTOM_ELEMENT}/find`,
    validate: {
      query: _configSchema.schema.object({
        name: _configSchema.schema.string(),
        page: _configSchema.schema.maybe(_configSchema.schema.number()),
        perPage: _configSchema.schema.number()
      })
    }
  }, async (context, request, response) => {
    const savedObjectsClient = context.core.savedObjects.client;
    const {
      name,
      page,
      perPage
    } = request.query;

    try {
      const customElements = await savedObjectsClient.find({
        type: _constants.CUSTOM_ELEMENT_TYPE,
        sortField: '@timestamp',
        sortOrder: 'desc',
        search: name ? `${name}* | ${name}` : '*',
        searchFields: ['name'],
        fields: ['id', 'name', 'displayName', 'help', 'image', 'content', '@created', '@timestamp'],
        page,
        perPage
      });
      return response.ok({
        body: {
          total: customElements.total,
          customElements: customElements.saved_objects.map(hit => ({
            id: hit.id,
            ...hit.attributes
          }))
        }
      });
    } catch (error) {
      return response.ok({
        body: {
          total: 0,
          customElements: []
        }
      });
    }
  });
}