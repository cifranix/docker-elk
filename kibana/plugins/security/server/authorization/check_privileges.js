"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPrivilegesWithRequestFactory = checkPrivilegesWithRequestFactory;

var _lodash = require("lodash");

var _constants = require("../../common/constants");

var _resource_serializer = require("./resource_serializer");

var _validate_es_response = require("./validate_es_response");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function checkPrivilegesWithRequestFactory(actions, clusterClient, applicationName) {
  const hasIncompatibleVersion = applicationPrivilegesResponse => {
    return Object.values(applicationPrivilegesResponse).some(resource => !resource[actions.version] && resource[actions.login]);
  };

  return function checkPrivilegesWithRequest(request) {
    const checkPrivilegesAtResources = async (resources, privilegeOrPrivileges) => {
      const privileges = Array.isArray(privilegeOrPrivileges) ? privilegeOrPrivileges : [privilegeOrPrivileges];
      const allApplicationPrivileges = (0, _lodash.uniq)([actions.version, actions.login, ...privileges]);
      const hasPrivilegesResponse = await clusterClient.asScoped(request).callAsCurrentUser('shield.hasPrivileges', {
        body: {
          applications: [{
            application: applicationName,
            resources,
            privileges: allApplicationPrivileges
          }]
        }
      });
      (0, _validate_es_response.validateEsPrivilegeResponse)(hasPrivilegesResponse, applicationName, allApplicationPrivileges, resources);
      const applicationPrivilegesResponse = hasPrivilegesResponse.application[applicationName];

      if (hasIncompatibleVersion(applicationPrivilegesResponse)) {
        throw new Error('Multiple versions of Kibana are running against the same Elasticsearch cluster, unable to authorize user.');
      }

      return {
        hasAllRequested: hasPrivilegesResponse.has_all_requested,
        username: hasPrivilegesResponse.username,
        // we need to filter out the non requested privileges from the response
        resourcePrivileges: (0, _lodash.transform)(applicationPrivilegesResponse, (result, value, key) => {
          result[key] = (0, _lodash.pick)(value, privileges);
        })
      };
    };

    const checkPrivilegesAtResource = async (resource, privilegeOrPrivileges) => {
      const {
        hasAllRequested,
        username,
        resourcePrivileges
      } = await checkPrivilegesAtResources([resource], privilegeOrPrivileges);
      return {
        hasAllRequested,
        username,
        privileges: resourcePrivileges[resource]
      };
    };

    return {
      async atSpace(spaceId, privilegeOrPrivileges) {
        const spaceResource = _resource_serializer.ResourceSerializer.serializeSpaceResource(spaceId);

        return await checkPrivilegesAtResource(spaceResource, privilegeOrPrivileges);
      },

      async atSpaces(spaceIds, privilegeOrPrivileges) {
        const spaceResources = spaceIds.map(spaceId => _resource_serializer.ResourceSerializer.serializeSpaceResource(spaceId));
        const {
          hasAllRequested,
          username,
          resourcePrivileges
        } = await checkPrivilegesAtResources(spaceResources, privilegeOrPrivileges);
        return {
          hasAllRequested,
          username,
          // we need to turn the resource responses back into the space ids
          spacePrivileges: (0, _lodash.transform)(resourcePrivileges, (result, value, key) => {
            result[_resource_serializer.ResourceSerializer.deserializeSpaceResource(key)] = value;
          })
        };
      },

      async globally(privilegeOrPrivileges) {
        return await checkPrivilegesAtResource(_constants.GLOBAL_RESOURCE, privilegeOrPrivileges);
      }

    };
  };
}