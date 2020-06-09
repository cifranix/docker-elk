"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRefreshInterval = void 0;

var _react = require("react");

var _constants = require("../../../../../../common/constants");

var _common = require("../../../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useRefreshInterval = function useRefreshInterval(setBlockRefresh) {
  var _useRefreshTransformL = (0, _common.useRefreshTransformList)(),
      refresh = _useRefreshTransformL.refresh;

  (0, _react.useEffect)(function () {
    var interval = setInterval(refresh, _constants.DEFAULT_REFRESH_INTERVAL_MS); // useEffect cleanup

    return function () {
      clearInterval(interval);
    }; // custom comparison
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // [] as comparator makes sure this only runs once
};

exports.useRefreshInterval = useRefreshInterval;