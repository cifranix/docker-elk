"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExplorerDefaultState = getExplorerDefaultState;

var _index_patterns = require("../../../../../common/constants/index_patterns");

var _explorer_charts_container_service = require("../../explorer_charts/explorer_charts_container_service");

var _explorer_utils = require("../../explorer_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getDefaultIndexPattern() {
  return {
    title: _index_patterns.ML_RESULTS_INDEX_PATTERN,
    fields: []
  };
}

function getExplorerDefaultState() {
  return {
    annotationsData: [],
    bounds: undefined,
    chartsData: (0, _explorer_charts_container_service.getDefaultChartsData)(),
    fieldFormatsLoading: false,
    filterActive: false,
    filteredFields: [],
    filterPlaceHolder: undefined,
    indexPattern: getDefaultIndexPattern(),
    influencersFilterQuery: undefined,
    influencers: {},
    isAndOperator: false,
    loading: true,
    maskAll: false,
    noInfluencersConfigured: true,
    overallSwimlaneData: (0, _explorer_utils.getDefaultSwimlaneData)(),
    queryString: '',
    selectedCells: undefined,
    selectedJobs: null,
    swimlaneBucketInterval: undefined,
    swimlaneContainerWidth: 0,
    swimlaneLimit: 10,
    tableData: {
      anomalies: [],
      examplesByJobId: [''],
      interval: 0,
      jobIds: [],
      showViewSeriesLink: false
    },
    tableQueryString: '',
    viewByLoadedForTimeFormatted: null,
    viewBySwimlaneData: (0, _explorer_utils.getDefaultSwimlaneData)(),
    viewBySwimlaneDataLoading: false,
    viewBySwimlaneFieldName: undefined,
    viewBySwimlaneOptions: []
  };
}