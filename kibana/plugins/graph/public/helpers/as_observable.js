"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asAngularSyncedObservable = asAngularSyncedObservable;

var Rx = _interopRequireWildcard(require("rxjs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * This is a helper to tie state updates that happen somewhere else back to an angular scope.
 * It is roughly comparable to `reactDirective`, but does not have to be used from within a
 * template.
 *
 * This is a temporary solution until the state management is moved outside of Angular.
 *
 * @param collectProps Function that collects properties from the scope that should be passed
 * into the observable. All functions passed along will be wrapped to cause an angular digest cycle
 * and refresh the observable afterwards with a new call to `collectProps`. By doing so, angular
 * can react to changes made outside of it and the results are passed back via the observable
 * @param angularDigest The `$digest` function of the scope.
 */
function asAngularSyncedObservable(collectProps, angularDigest) {
  var boundCollectProps = function boundCollectProps() {
    var collectedProps = collectProps();
    Object.keys(collectedProps).forEach(function (key) {
      var currentValue = collectedProps[key];

      if (typeof currentValue === 'function') {
        collectedProps[key] = function () {
          currentValue.apply(void 0, arguments);
          angularDigest();
          subject$.next(boundCollectProps());
        };
      }
    });
    return collectedProps;
  };

  var subject$ = new Rx.BehaviorSubject(boundCollectProps());
  return subject$.asObservable();
}