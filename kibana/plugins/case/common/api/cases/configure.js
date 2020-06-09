"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaseConfigureResponseRt = exports.CaseConfigureAttributesRt = exports.CasesConfigurePatchRt = exports.CasesConfigureRequestRt = exports.CasesConnectorConfigurationRT = exports.CasesConfigurationRT = exports.CasesConfigurationMapsRT = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _user = require("../user");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * This types below are related to the service now configuration
 * mapping between our case and service-now
 *
 */
const ActionTypeRT = rt.union([rt.literal('append'), rt.literal('nothing'), rt.literal('overwrite')]);
const CaseFieldRT = rt.union([rt.literal('title'), rt.literal('description'), rt.literal('comments')]);
const ThirdPartyFieldRT = rt.union([rt.literal('comments'), rt.literal('description'), rt.literal('not_mapped'), rt.literal('short_description')]);
const CasesConfigurationMapsRT = rt.type({
  source: CaseFieldRT,
  target: ThirdPartyFieldRT,
  action_type: ActionTypeRT
});
exports.CasesConfigurationMapsRT = CasesConfigurationMapsRT;
const CasesConfigurationRT = rt.type({
  mapping: rt.array(CasesConfigurationMapsRT)
});
exports.CasesConfigurationRT = CasesConfigurationRT;
const CasesConnectorConfigurationRT = rt.type({
  cases_configuration: CasesConfigurationRT // version: rt.string,

});
exports.CasesConnectorConfigurationRT = CasesConnectorConfigurationRT;
// TO DO we will need to add this type rt.literal('close-by-thrid-party')
const ClosureTypeRT = rt.union([rt.literal('close-by-user'), rt.literal('close-by-pushing')]);
const CasesConfigureBasicRt = rt.type({
  connector_id: rt.string,
  connector_name: rt.string,
  closure_type: ClosureTypeRT
});
const CasesConfigureRequestRt = CasesConfigureBasicRt;
exports.CasesConfigureRequestRt = CasesConfigureRequestRt;
const CasesConfigurePatchRt = rt.intersection([rt.partial(CasesConfigureBasicRt.props), rt.type({
  version: rt.string
})]);
exports.CasesConfigurePatchRt = CasesConfigurePatchRt;
const CaseConfigureAttributesRt = rt.intersection([CasesConfigureBasicRt, rt.type({
  created_at: rt.string,
  created_by: _user.UserRT,
  updated_at: rt.union([rt.string, rt.null]),
  updated_by: rt.union([_user.UserRT, rt.null])
})]);
exports.CaseConfigureAttributesRt = CaseConfigureAttributesRt;
const CaseConfigureResponseRt = rt.intersection([CaseConfigureAttributesRt, rt.type({
  version: rt.string
})]);
exports.CaseConfigureResponseRt = CaseConfigureResponseRt;