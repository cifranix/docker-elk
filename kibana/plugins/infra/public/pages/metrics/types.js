"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisSectionPropsRT = exports.SeriesOverridesRT = exports.SeriesOverridesObjectRT = void 0;

var _ioTs = _interopRequireDefault(require("io-ts"));

var _types = require("../../../common/inventory_models/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ChartTypesRT = _ioTs.default.keyof({
  area: null,
  bar: null,
  line: null
});

var SeriesOverridesObjectRT = _ioTs.default.intersection([_ioTs.default.type({
  color: _ioTs.default.string
}), _ioTs.default.partial({
  name: _ioTs.default.string,
  formatter: _types.InventoryFormatterTypeRT,
  formatterTemplate: _ioTs.default.string,
  gaugeMax: _ioTs.default.number,
  type: ChartTypesRT
})]);

exports.SeriesOverridesObjectRT = SeriesOverridesObjectRT;

var SeriesOverridesRT = _ioTs.default.record(_ioTs.default.string, _ioTs.default.union([_ioTs.default.undefined, SeriesOverridesObjectRT]));

exports.SeriesOverridesRT = SeriesOverridesRT;

var VisSectionPropsRT = _ioTs.default.partial({
  type: ChartTypesRT,
  stacked: _ioTs.default.boolean,
  formatter: _types.InventoryFormatterTypeRT,
  formatterTemplate: _ioTs.default.string,
  seriesOverrides: SeriesOverridesRT
});

exports.VisSectionPropsRT = VisSectionPropsRT;