"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUiFiltersES = getUiFiltersES;

var _get_environment_ui_filter_es = require("./get_environment_ui_filter_es");

var _config = require("../../ui_filters/local_ui_filters/config");

var _server = require("../../../../../../../src/plugins/data/server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getUiFiltersES(indexPattern, uiFilters) {
  const {
    kuery,
    environment,
    ...localFilterValues
  } = uiFilters;

  const mappedFilters = _config.localUIFilterNames.filter(name => name in localFilterValues).map(filterName => {
    const field = _config.localUIFilters[filterName];
    const value = localFilterValues[filterName];
    return {
      terms: {
        [field.fieldName]: value
      }
    };
  }); // remove undefined items from list


  const esFilters = [getKueryUiFilterES(indexPattern, uiFilters.kuery), (0, _get_environment_ui_filter_es.getEnvironmentUiFilterES)(uiFilters.environment)].filter(filter => !!filter).concat(mappedFilters);
  return esFilters;
}

function getKueryUiFilterES(indexPattern, kuery) {
  if (!kuery || !indexPattern) {
    return;
  }

  const ast = _server.esKuery.fromKueryExpression(kuery);

  return _server.esKuery.toElasticsearchQuery(ast, indexPattern);
}