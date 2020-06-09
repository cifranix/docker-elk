"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manageAngularLifecycle = void 0;

var _reactDom = require("react-dom");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var manageAngularLifecycle = function manageAngularLifecycle($scope, $route, elem) {
  var lastRoute = $route.current;
  var deregister = $scope.$on('$locationChangeSuccess', function () {
    var currentRoute = $route.current;

    if (lastRoute.$$route.template === currentRoute.$$route.template) {
      $route.current = lastRoute;
    }
  });
  $scope.$on('$destroy', function () {
    if (deregister) {
      deregister();
    }

    if (elem) {
      (0, _reactDom.unmountComponentAtNode)(elem);
    }
  });
};

exports.manageAngularLifecycle = manageAngularLifecycle;