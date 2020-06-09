"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.versionCheckHandlerWrapper = exports.esVersionCheck = exports.verifyAllMatchKibanaVersion = exports.getAllNodeVersions = void 0;

var _lodash = require("lodash");

var _semver = require("semver");

var _version = require("../../common/version");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Returns an array of all the unique Elasticsearch Node Versions in the Elasticsearch cluster.
 */
const getAllNodeVersions = async adminClient => {
  // Get the version information for all nodes in the cluster.
  const {
    nodes
  } = await adminClient.callAsInternalUser('nodes.info', {
    filterPath: 'nodes.*.version'
  });
  const versionStrings = Object.values(nodes).map(({
    version
  }) => version);
  return (0, _lodash.uniq)(versionStrings).sort().map(version => new _semver.SemVer(version));
};

exports.getAllNodeVersions = getAllNodeVersions;

const verifyAllMatchKibanaVersion = allNodeVersions => {
  // Determine if all nodes in the cluster are running the same major version as Kibana.
  const numDifferentVersion = allNodeVersions.filter(esNodeVersion => esNodeVersion.major !== _version.CURRENT_VERSION.major).length;
  const numSameVersion = allNodeVersions.filter(esNodeVersion => esNodeVersion.major === _version.CURRENT_VERSION.major).length;

  if (numDifferentVersion) {
    return {
      allNodesMatch: false,
      // If Kibana is talking to nodes and none have the same major version as Kibana, they must a be of
      // a higher major version.
      allNodesUpgraded: numSameVersion === 0
    };
  }

  return {
    allNodesMatch: true,
    allNodesUpgraded: false
  };
};
/**
 * This is intended as controller/handler level code so it knows about HTTP
 */


exports.verifyAllMatchKibanaVersion = verifyAllMatchKibanaVersion;

const esVersionCheck = async (ctx, response) => {
  const {
    adminClient
  } = ctx.core.elasticsearch;
  let allNodeVersions;

  try {
    allNodeVersions = await getAllNodeVersions(adminClient);
  } catch (e) {
    if (e.status === 403) {
      return response.forbidden({
        body: e.message
      });
    }

    throw e;
  }

  const result = verifyAllMatchKibanaVersion(allNodeVersions);

  if (!result.allNodesMatch) {
    return response.customError({
      // 426 means "Upgrade Required" and is used when semver compatibility is not met.
      statusCode: 426,
      body: {
        message: 'There are some nodes running a different version of Elasticsearch',
        attributes: {
          allNodesUpgraded: result.allNodesUpgraded
        }
      }
    });
  }
};

exports.esVersionCheck = esVersionCheck;

const versionCheckHandlerWrapper = handler => async (ctx, request, response) => {
  const errorResponse = await esVersionCheck(ctx, response);

  if (errorResponse) {
    return errorResponse;
  }

  return handler(ctx, request, response);
};

exports.versionCheckHandlerWrapper = versionCheckHandlerWrapper;