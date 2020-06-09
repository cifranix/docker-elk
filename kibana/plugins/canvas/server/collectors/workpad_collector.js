"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.summarizeWorkpads = summarizeWorkpads;
exports.workpadCollector = void 0;

var _lodash = require("lodash");

var _constants = require("../../../../legacy/plugins/canvas/common/lib/constants");

var _collector_helpers = require("./collector_helpers");

var _common = require("../../../../../src/plugins/expressions/common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
  Gather statistic about the given workpads
  @param workpadDocs a collection of workpad documents
  @returns Workpad Telemetry Data
*/
function summarizeWorkpads(workpadDocs) {
  const functionSet = new Set();

  if (workpadDocs.length === 0) {
    return {};
  } // make a summary of info about each workpad


  const workpadsInfo = workpadDocs.map(workpad => {
    let pages = {
      count: 0
    };

    try {
      pages = {
        count: workpad.pages.length
      };
    } catch (err) {
      // eslint-disable-next-line
      console.warn(err, workpad);
    }

    const elementCounts = workpad.pages.reduce((accum, page) => accum.concat(page.elements.length), []);
    const functionCounts = workpad.pages.reduce((accum, page) => {
      return page.elements.map(element => {
        const ast = (0, _common.parseExpression)(element.expression);
        (0, _collector_helpers.collectFns)(ast, cFunction => {
          functionSet.add(cFunction);
        });
        return ast.chain.length; // get the number of parts in the expression
      });
    }, []);
    return {
      pages,
      elementCounts,
      functionCounts
    };
  }); // combine together info from across the workpads

  const combinedWorkpadsInfo = workpadsInfo.reduce((accum, pageInfo) => {
    const {
      pages,
      elementCounts,
      functionCounts
    } = pageInfo;
    return {
      pageMin: pages.count < accum.pageMin ? pages.count : accum.pageMin,
      pageMax: pages.count > accum.pageMax ? pages.count : accum.pageMax,
      pageCounts: accum.pageCounts.concat(pages.count),
      elementCounts: accum.elementCounts.concat(elementCounts),
      functionCounts: accum.functionCounts.concat(functionCounts)
    };
  }, {
    pageMin: Infinity,
    pageMax: -Infinity,
    pageCounts: [],
    elementCounts: [],
    functionCounts: []
  });
  const {
    pageCounts,
    pageMin,
    pageMax,
    elementCounts,
    functionCounts
  } = combinedWorkpadsInfo;
  const pageTotal = (0, _lodash.sum)(pageCounts);
  const elementsTotal = (0, _lodash.sum)(elementCounts);
  const functionsTotal = (0, _lodash.sum)(functionCounts);
  const pagesInfo = workpadsInfo.length > 0 ? {
    total: pageTotal,
    per_workpad: {
      avg: pageTotal / pageCounts.length,
      min: pageMin,
      max: pageMax
    }
  } : undefined;
  const elementsInfo = pageTotal > 0 ? {
    total: elementsTotal,
    per_page: {
      avg: elementsTotal / elementCounts.length,
      min: (0, _lodash.min)(elementCounts),
      max: (0, _lodash.max)(elementCounts)
    }
  } : undefined;
  const functionsInfo = elementsTotal > 0 ? {
    total: functionsTotal,
    in_use: Array.from(functionSet),
    per_element: {
      avg: functionsTotal / functionCounts.length,
      min: (0, _lodash.min)(functionCounts),
      max: (0, _lodash.max)(functionCounts)
    }
  } : undefined;
  return {
    workpads: {
      total: workpadsInfo.length
    },
    pages: pagesInfo,
    elements: elementsInfo,
    functions: functionsInfo
  };
}

const workpadCollector = async function (kibanaIndex, callCluster) {
  const searchParams = {
    size: 10000,
    // elasticsearch index.max_result_window default value
    index: kibanaIndex,
    ignoreUnavailable: true,
    filterPath: ['hits.hits._source.canvas-workpad', '-hits.hits._source.canvas-workpad.assets'],
    body: {
      query: {
        bool: {
          filter: {
            term: {
              type: _constants.CANVAS_TYPE
            }
          }
        }
      }
    }
  };
  const esResponse = await callCluster('search', searchParams);

  if ((0, _lodash.get)(esResponse, 'hits.hits.length') > 0) {
    const workpads = esResponse.hits.hits.map(hit => hit._source[_constants.CANVAS_TYPE]);
    return summarizeWorkpads(workpads);
  }

  return {};
};

exports.workpadCollector = workpadCollector;