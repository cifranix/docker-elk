"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLicenseUpdate = createLicenseUpdate;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _has_license_info_changed = require("./has_license_info_changed");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createLicenseUpdate(trigger$, stop$, fetcher, initialValues) {
  const triggerRefresh$ = trigger$.pipe((0, _operators.switchMap)(fetcher));
  const manuallyFetched$ = new _rxjs.Subject();
  const fetched$ = (0, _rxjs.merge)(triggerRefresh$, manuallyFetched$).pipe((0, _operators.takeUntil)(stop$), (0, _operators.publishReplay)(1) // have to cast manually as pipe operator cannot return ConnectableObservable
  // https://github.com/ReactiveX/rxjs/issues/2972
  );
  const fetchSubscription = fetched$.connect();
  stop$.subscribe({
    complete: () => fetchSubscription.unsubscribe()
  });
  const initialValues$ = initialValues ? (0, _rxjs.from)([undefined, initialValues]) : (0, _rxjs.from)([undefined]);
  const license$ = (0, _rxjs.merge)(initialValues$, fetched$).pipe((0, _operators.pairwise)(), (0, _operators.filter)(([previous, next]) => (0, _has_license_info_changed.hasLicenseInfoChanged)(previous, next)), (0, _operators.map)(([, next]) => next));
  return {
    license$,

    async refreshManually() {
      const license = await fetcher();
      manuallyFetched$.next(license);
      return license;
    }

  };
}