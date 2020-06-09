"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkToHome = linkToHome;
exports.linkToRepositories = linkToRepositories;
exports.linkToRepository = linkToRepository;
exports.linkToEditRepository = linkToEditRepository;
exports.linkToAddRepository = linkToAddRepository;
exports.linkToSnapshots = linkToSnapshots;
exports.linkToSnapshot = linkToSnapshot;
exports.linkToRestoreSnapshot = linkToRestoreSnapshot;
exports.linkToPolicies = linkToPolicies;
exports.linkToPolicy = linkToPolicy;
exports.linkToEditPolicy = linkToEditPolicy;
exports.linkToAddPolicy = linkToAddPolicy;
exports.linkToRestoreStatus = linkToRestoreStatus;

var _constants = require("../../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function linkToHome() {
  return "#".concat(_constants.BASE_PATH);
}

function linkToRepositories() {
  return "#".concat(_constants.BASE_PATH, "/repositories");
}

function linkToRepository(repositoryName) {
  return "#".concat(_constants.BASE_PATH, "/repositories/").concat(encodeURIComponent(repositoryName));
}

function linkToEditRepository(repositoryName) {
  return "#".concat(_constants.BASE_PATH, "/edit_repository/").concat(encodeURIComponent(repositoryName));
}

function linkToAddRepository(redirect) {
  return "#".concat(_constants.BASE_PATH, "/add_repository").concat(redirect ? "?redirect=".concat(encodeURIComponent(redirect)) : '');
}

function linkToSnapshots(repositoryName, policyName) {
  if (repositoryName) {
    return "#".concat(_constants.BASE_PATH, "/snapshots?repository=").concat(encodeURIComponent(repositoryName));
  }

  if (policyName) {
    return "#".concat(_constants.BASE_PATH, "/snapshots?policy=").concat(encodeURIComponent(policyName));
  }

  return "#".concat(_constants.BASE_PATH, "/snapshots");
}

function linkToSnapshot(repositoryName, snapshotName) {
  return "#".concat(_constants.BASE_PATH, "/snapshots/").concat(encodeURIComponent(repositoryName), "/").concat(encodeURIComponent(snapshotName));
}

function linkToRestoreSnapshot(repositoryName, snapshotName) {
  return "#".concat(_constants.BASE_PATH, "/restore/").concat(encodeURIComponent(repositoryName), "/").concat(encodeURIComponent(snapshotName));
}

function linkToPolicies() {
  return "#".concat(_constants.BASE_PATH, "/policies");
}

function linkToPolicy(policyName) {
  return "#".concat(_constants.BASE_PATH, "/policies/").concat(encodeURIComponent(policyName));
}

function linkToEditPolicy(policyName) {
  return "#".concat(_constants.BASE_PATH, "/edit_policy/").concat(encodeURIComponent(policyName));
}

function linkToAddPolicy() {
  return "#".concat(_constants.BASE_PATH, "/add_policy");
}

function linkToRestoreStatus() {
  return "#".concat(_constants.BASE_PATH, "/restore_status");
}