"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonitorDurationChart = void 0;

var _helper = require("../helper");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Fetches data used to populate monitor charts
 */
const getMonitorDurationChart = async ({
  callES,
  dynamicSettings,
  dateStart,
  dateEnd,
  monitorId
}) => {
  var _ref, _result$aggregations, _result$aggregations$;

  const params = {
    index: dynamicSettings.heartbeatIndices,
    body: {
      query: {
        bool: {
          filter: [{
            range: {
              '@timestamp': {
                gte: dateStart,
                lte: dateEnd
              }
            }
          }, {
            term: {
              'monitor.id': monitorId
            }
          }, {
            range: {
              'monitor.duration.us': {
                gt: 0
              }
            }
          }]
        }
      },
      size: 0,
      aggs: {
        timeseries: {
          date_histogram: {
            field: '@timestamp',
            fixed_interval: (0, _helper.getHistogramIntervalFormatted)(dateStart, dateEnd),
            min_doc_count: 0
          },
          aggs: {
            location: {
              terms: {
                field: 'observer.geo.name',
                missing: 'N/A'
              },
              aggs: {
                duration: {
                  stats: {
                    field: 'monitor.duration.us'
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  const result = await callES('search', params);
  const dateHistogramBuckets = (_ref = result === null || result === void 0 ? void 0 : (_result$aggregations = result.aggregations) === null || _result$aggregations === void 0 ? void 0 : (_result$aggregations$ = _result$aggregations.timeseries) === null || _result$aggregations$ === void 0 ? void 0 : _result$aggregations$.buckets) !== null && _ref !== void 0 ? _ref : [];
  /**
   * The code below is responsible for formatting the aggregation data we fetched above in a way
   * that the chart components used by the client understands.
   * There are five required values. Two are lists of points that conform to a simple (x,y) structure.
   *
   * The third list is for an area chart expressing a range, and it requires an (x,y,y0) structure,
   * where y0 is the min value for the point and y is the max.
   */

  const monitorChartsData = {
    locationDurationLines: []
  };
  /**
   * The following section of code enables us to provide buckets per location
   * that have a `null` value if there is no data at the given timestamp.
   *
   * We maintain two `Set`s. One is per bucket, the other is persisted for the
   * entire collection. At the end of a bucket's evaluation, if there was no object
   * parsed for a given location line that was already started, we insert an element
   * to the given line with a null value. Without this, our charts on the client will
   * display a continuous line for each of the points they are provided.
   */
  // a set of all the locations found for this result

  const resultLocations = new Set();
  const linesByLocation = {};
  dateHistogramBuckets.forEach(dateHistogramBucket => {
    const x = dateHistogramBucket.key; // a set of all the locations for the current bucket

    const bucketLocations = new Set();
    dateHistogramBucket.location.buckets.forEach(locationBucket => {
      var _ref2, _ref3, _locationBucket$durat;

      const locationName = locationBucket.key; // store the location name in each set

      bucketLocations.add(locationName);
      resultLocations.add(locationName); // create a new line for this location if it doesn't exist

      let currentLine = (_ref2 = linesByLocation === null || linesByLocation === void 0 ? void 0 : linesByLocation[locationName]) !== null && _ref2 !== void 0 ? _ref2 : undefined;

      if (!currentLine) {
        currentLine = {
          name: locationName,
          line: []
        };
        linesByLocation[locationName] = currentLine;
        monitorChartsData.locationDurationLines.push(currentLine);
      } // add the entry for the current location's duration average


      currentLine.line.push({
        x,
        y: (_ref3 = locationBucket === null || locationBucket === void 0 ? void 0 : (_locationBucket$durat = locationBucket.duration) === null || _locationBucket$durat === void 0 ? void 0 : _locationBucket$durat.avg) !== null && _ref3 !== void 0 ? _ref3 : null
      });
    }); // if there are more lines in the result than are represented in the current bucket,
    // we must add null entries

    if (dateHistogramBucket.location.buckets.length < resultLocations.size) {
      resultLocations.forEach(resultLocation => {
        // the current bucket had no value for this location, insert a null value
        if (!bucketLocations.has(resultLocation)) {
          const locationLine = monitorChartsData.locationDurationLines.find(({
            name
          }) => name === resultLocation); // in practice, there should always be a line present, but `find` can return `undefined`

          if (locationLine) {
            // this will create a gap in the line like we desire
            locationLine.line.push({
              x,
              y: null
            });
          }
        }
      });
    }
  });
  return monitorChartsData;
};

exports.getMonitorDurationChart = getMonitorDurationChart;