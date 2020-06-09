"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EsVersionPrecheck = exports.verifyAllMatchKibanaVersion = exports.getAllNodeVersions = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _lodash = require("lodash");

var _semver = require("semver");

var _version = require("../../common/version");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Returns an array of all the unique Elasticsearch Node Versions in the Elasticsearch cluster.
 * @param request
 */
const getAllNodeVersions = async callCluster => {
  // Get the version information for all nodes in the cluster.
  const {
    nodes
  } = await callCluster('nodes.info', {
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
    const error = new _boom.default(`There are some nodes running a different version of Elasticsearch`, {
      // 426 means "Upgrade Required" and is used when semver compatibility is not met.
      statusCode: 426
    });
    error.output.payload.attributes = {
      allNodesUpgraded: !numSameVersion
    };
    throw error;
  }
};

exports.verifyAllMatchKibanaVersion = verifyAllMatchKibanaVersion;
const EsVersionPrecheck = {
  assign: 'esVersionCheck',

  async method(request) {
    const {
      callWithRequest
    } = request.server.plugins.elasticsearch.getCluster('admin');
    const callCluster = callWithRequest.bind(callWithRequest, request);
    let allNodeVersions;

    try {
      allNodeVersions = await getAllNodeVersions(callCluster);
    } catch (e) {
      if (e.status === 403) {
        throw _boom.default.forbidden(e.message);
      }

      throw e;
    } // This will throw if there is an issue


    verifyAllMatchKibanaVersion(allNodeVersions);
    return true;
  }

};
exports.EsVersionPrecheck = EsVersionPrecheck;