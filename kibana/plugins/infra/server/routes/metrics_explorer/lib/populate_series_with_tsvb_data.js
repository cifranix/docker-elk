"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateSeriesWithTSVBData = void 0;

var _lodash = require("lodash");

var _create_metrics_model = require("./create_metrics_model");

var _calculate_metric_interval = require("../../../utils/calculate_metric_interval");

var _get_dataset_for_field = require("./get_dataset_for_field");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const populateSeriesWithTSVBData = (request, options, framework, requestContext) => async series => {
  // IF there are no metrics selected then we should return an empty result.
  if (options.metrics.length === 0) {
    return { ...series,
      columns: [],
      rows: []
    };
  } // Set the filter for the group by or match everything


  const filters = options.groupBy ? [{
    match: {
      [options.groupBy]: series.id
    }
  }] : [];

  if (options.filterQuery) {
    try {
      const filterQuery = JSON.parse(options.filterQuery);
      filters.push(filterQuery);
    } catch (error) {
      filters.push({
        query_string: {
          query: options.filterQuery,
          analyze_wildcard: true
        }
      });
    }
  }

  const timerange = {
    min: options.timerange.from,
    max: options.timerange.to
  }; // Create the TSVB model based on the request options

  const model = (0, _create_metrics_model.createMetricModel)(options);
  const modules = await Promise.all((0, _lodash.uniq)(options.metrics.filter(m => m.field)).map(async m => await (0, _get_dataset_for_field.getDatasetForField)(framework, requestContext, m.field, options.indexPattern)));
  const calculatedInterval = await (0, _calculate_metric_interval.calculateMetricInterval)(framework, requestContext, {
    indexPattern: options.indexPattern,
    timestampField: options.timerange.field,
    timerange: options.timerange
  }, modules.filter(m => m));

  if (calculatedInterval) {
    model.interval = `>=${calculatedInterval}s`;
  } // Get TSVB results using the model, timerange and filters


  const tsvbResults = await framework.makeTSVBRequest(requestContext, request, model, timerange, filters); // If there is no data `custom` will not exist.

  if (!tsvbResults.custom) {
    return { ...series,
      columns: [],
      rows: []
    };
  } // Setup the dynamic columns and row attributes depending on if the user is doing a group by
  // and multiple metrics


  const attributeColumns = options.groupBy != null ? [{
    name: 'groupBy',
    type: 'string'
  }] : [];
  const metricColumns = options.metrics.map((m, i) => ({
    name: `metric_${i}`,
    type: 'number'
  }));
  const rowAttributes = options.groupBy != null ? {
    groupBy: series.id
  } : {}; // To support multiple metrics, there are multiple TSVB series which need to be combined
  // into one MetricExplorerRow (Canvas row). This is done by collecting all the timestamps
  // across each TSVB series. Then for each timestamp we find the values and create a
  // MetricsExplorerRow.

  const timestamps = tsvbResults.custom.series.reduce((currentTimestamps, tsvbSeries) => (0, _lodash.union)(currentTimestamps, tsvbSeries.data.map(row => row[0])).sort(), []); // Combine the TSVB series for multiple metrics.

  const rows = timestamps.map(timestamp => {
    return tsvbResults.custom.series.reduce((currentRow, tsvbSeries) => {
      const matches = tsvbSeries.data.find(d => d[0] === timestamp);

      if (matches) {
        return { ...currentRow,
          [tsvbSeries.id]: matches[1]
        };
      }

      return currentRow;
    }, {
      timestamp,
      ...rowAttributes
    });
  });
  return { ...series,
    rows,
    columns: [{
      name: 'timestamp',
      type: 'date'
    }, ...metricColumns, ...attributeColumns]
  };
};

exports.populateSeriesWithTSVBData = populateSeriesWithTSVBData;