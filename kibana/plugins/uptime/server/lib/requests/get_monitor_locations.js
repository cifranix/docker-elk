"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonitorLocations = void 0;

var _constants = require("../../../../../legacy/plugins/uptime/common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getMonitorLocations = async ({
  callES,
  dynamicSettings,
  monitorId,
  dateStart,
  dateEnd
}) => {
  var _ref, _result$aggregations, _result$aggregations$;

  const params = {
    index: dynamicSettings.heartbeatIndices,
    body: {
      size: 0,
      query: {
        bool: {
          filter: [{
            match: {
              'monitor.id': monitorId
            }
          }, {
            exists: {
              field: 'summary'
            }
          }, {
            range: {
              '@timestamp': {
                gte: dateStart,
                lte: dateEnd
              }
            }
          }]
        }
      },
      aggs: {
        location: {
          terms: {
            field: 'observer.geo.name',
            missing: '__location_missing__'
          },
          aggs: {
            most_recent: {
              top_hits: {
                size: 1,
                sort: {
                  '@timestamp': {
                    order: 'desc'
                  }
                },
                _source: ['monitor', 'summary', 'observer', '@timestamp']
              }
            }
          }
        }
      }
    }
  };
  const result = await callES('search', params);
  const locations = (_ref = result === null || result === void 0 ? void 0 : (_result$aggregations = result.aggregations) === null || _result$aggregations === void 0 ? void 0 : (_result$aggregations$ = _result$aggregations.location) === null || _result$aggregations$ === void 0 ? void 0 : _result$aggregations$.buckets) !== null && _ref !== void 0 ? _ref : [];

  const getGeo = locGeo => {
    if (locGeo) {
      const {
        name,
        location
      } = locGeo;
      const latLon = location === null || location === void 0 ? void 0 : location.trim().split(',');
      return {
        name,
        location: latLon ? {
          lat: latLon[0],
          lon: latLon[1]
        } : undefined
      };
    } else {
      return {
        name: _constants.UNNAMED_LOCATION
      };
    }
  };

  const monLocs = [];
  locations.forEach(loc => {
    var _mostRecentLocation$o;

    const mostRecentLocation = loc.most_recent.hits.hits[0]._source;
    const location = {
      summary: mostRecentLocation === null || mostRecentLocation === void 0 ? void 0 : mostRecentLocation.summary,
      geo: getGeo(mostRecentLocation === null || mostRecentLocation === void 0 ? void 0 : (_mostRecentLocation$o = mostRecentLocation.observer) === null || _mostRecentLocation$o === void 0 ? void 0 : _mostRecentLocation$o.geo),
      timestamp: mostRecentLocation['@timestamp']
    };
    monLocs.push(location);
  });
  return {
    monitorId,
    locations: monLocs
  };
};

exports.getMonitorLocations = getMonitorLocations;