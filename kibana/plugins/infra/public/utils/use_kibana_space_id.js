"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKibanaSpaceId = void 0;

var _Either = require("fp-ts/lib/Either");

var _pipeable = require("fp-ts/lib/pipeable");

var rt = _interopRequireWildcard(require("io-ts"));

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useKibanaSpaceId = function useKibanaSpaceId() {
  var _kibana$services$inje;

  var kibana = (0, _public.useKibana)(); // NOTE: The injectedMetadata service will be deprecated at some point. We should migrate
  // this to the client side Spaces plugin when it becomes available.

  var activeSpace = (_kibana$services$inje = kibana.services.injectedMetadata) === null || _kibana$services$inje === void 0 ? void 0 : _kibana$services$inje.getInjectedVar('activeSpace');
  return (0, _pipeable.pipe)(activeSpaceRT.decode(activeSpace), (0, _Either.fold)(function () {
    return 'default';
  }, function (decodedActiveSpace) {
    return decodedActiveSpace.space.id;
  }));
};

exports.useKibanaSpaceId = useKibanaSpaceId;
var activeSpaceRT = rt.type({
  space: rt.type({
    id: rt.string
  })
});