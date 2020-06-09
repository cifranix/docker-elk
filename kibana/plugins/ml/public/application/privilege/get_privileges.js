"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrivileges = getPrivileges;
exports.getManageMlPrivileges = getManageMlPrivileges;

var _ml_api_service = require("../services/ml_api_service");

var _upgrade_service = require("../services/upgrade_service");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getPrivileges() {
  return new Promise(function (resolve, reject) {
    _ml_api_service.ml.checkMlPrivileges().then(function (resp) {
      if (resp.upgradeInProgress === true) {
        (0, _upgrade_service.setUpgradeInProgress)(true);
      }

      resolve(resp);
    }).catch(function () {
      reject();
    });
  });
}

function getManageMlPrivileges() {
  return new Promise(function (resolve, reject) {
    _ml_api_service.ml.checkManageMLPrivileges().then(function (resp) {
      if (resp.upgradeInProgress === true) {
        (0, _upgrade_service.setUpgradeInProgress)(true);
      }

      resolve(resp);
    }).catch(function () {
      reject();
    });
  });
}