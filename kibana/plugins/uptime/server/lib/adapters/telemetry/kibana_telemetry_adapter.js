"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaTelemetryAdapter = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _saved_objects = require("../../saved_objects");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// seconds in an hour
const BUCKET_SIZE = 3600; // take buckets in the last day

const BUCKET_NUMBER = 24;

class KibanaTelemetryAdapter {
  static initUsageCollector(usageCollector, getSavedObjectsClient) {
    return usageCollector.makeUsageCollector({
      type: 'uptime',
      fetch: async callCluster => {
        const savedObjectsClient = getSavedObjectsClient();

        if (savedObjectsClient) {
          this.countNoOfUniqueMonitorAndLocations(callCluster, savedObjectsClient);
        }

        const report = this.getReport();
        return {
          last_24_hours: {
            hits: { ...report
            }
          }
        };
      },
      isReady: () => typeof getSavedObjectsClient() !== 'undefined'
    });
  }

  static countPageView(pageView) {
    if (pageView.refreshTelemetryHistory) {
      this.collector = {};
    }

    const bucketId = this.getBucketToIncrement();
    const bucket = this.collector[bucketId];

    if (pageView.page === 'Overview') {
      bucket.overview_page += 1;
    }

    if (pageView.page === 'Monitor') {
      bucket.monitor_page += 1;
    }

    if (pageView.page === 'Settings') {
      bucket.settings_page += 1;
    }

    this.updateDateData(pageView, bucket);
    return bucket;
  }

  static updateDateData({
    dateStart,
    dateEnd,
    autoRefreshEnabled,
    autorefreshInterval
  }, bucket) {
    const prevDateStart = [...bucket.dateRangeStart].pop();

    if (!prevDateStart || prevDateStart !== dateStart) {
      bucket.dateRangeStart.push(dateStart);
      bucket.dateRangeEnd.push(dateEnd);
    } else {
      const prevDateEnd = [...bucket.dateRangeEnd].pop();

      if (!prevDateEnd || prevDateEnd !== dateEnd) {
        bucket.dateRangeStart.push(dateStart);
        bucket.dateRangeEnd.push(dateEnd);
      }
    }

    const prevAutorefreshInterval = [...bucket.autorefreshInterval].pop();

    if (!prevAutorefreshInterval || prevAutorefreshInterval !== autorefreshInterval) {
      bucket.autorefreshInterval.push(autorefreshInterval);
    }

    bucket.autoRefreshEnabled = autoRefreshEnabled;
  }

  static async countNoOfUniqueMonitorAndLocations(callCluster, savedObjectsClient) {
    var _ref, _result$aggregations, _result$aggregations$, _ref2, _result$aggregations2, _result$aggregations3, _result$aggregations4, _result$aggregations5, _result$aggregations6, _ref3, _ref4, _ref5, _monitorNameStats$avg, _ref6, _ref7, _ref8, _locationNameStats$av;

    const dynamicSettings = await _saved_objects.savedObjectsAdapter.getUptimeDynamicSettings(savedObjectsClient);
    const params = {
      index: dynamicSettings.heartbeatIndices,
      body: {
        query: {
          bool: {
            must: [{
              range: {
                '@timestamp': {
                  gte: 'now-1d/d',
                  lt: 'now'
                }
              }
            }]
          }
        },
        size: 0,
        aggs: {
          unique_monitors: {
            cardinality: {
              field: 'monitor.id'
            }
          },
          unique_locations: {
            cardinality: {
              field: 'observer.geo.name',
              missing: 'N/A'
            }
          },
          monitor_name: {
            string_stats: {
              field: 'monitor.name'
            }
          },
          observer_loc_name: {
            string_stats: {
              field: 'observer.geo.name'
            }
          },
          monitors: {
            terms: {
              field: 'monitor.id',
              size: 1000
            },
            aggs: {
              docs: {
                top_hits: {
                  size: 1,
                  _source: ['monitor.timespan']
                }
              }
            }
          }
        }
      }
    };
    const result = await callCluster('search', params);
    const numberOfUniqueMonitors = (_ref = result === null || result === void 0 ? void 0 : (_result$aggregations = result.aggregations) === null || _result$aggregations === void 0 ? void 0 : (_result$aggregations$ = _result$aggregations.unique_monitors) === null || _result$aggregations$ === void 0 ? void 0 : _result$aggregations$.value) !== null && _ref !== void 0 ? _ref : 0;
    const numberOfUniqueLocations = (_ref2 = result === null || result === void 0 ? void 0 : (_result$aggregations2 = result.aggregations) === null || _result$aggregations2 === void 0 ? void 0 : (_result$aggregations3 = _result$aggregations2.unique_locations) === null || _result$aggregations3 === void 0 ? void 0 : _result$aggregations3.value) !== null && _ref2 !== void 0 ? _ref2 : 0;
    const monitorNameStats = result === null || result === void 0 ? void 0 : (_result$aggregations4 = result.aggregations) === null || _result$aggregations4 === void 0 ? void 0 : _result$aggregations4.monitor_name;
    const locationNameStats = result === null || result === void 0 ? void 0 : (_result$aggregations5 = result.aggregations) === null || _result$aggregations5 === void 0 ? void 0 : _result$aggregations5.observer_loc_name;
    const uniqueMonitors = result === null || result === void 0 ? void 0 : (_result$aggregations6 = result.aggregations) === null || _result$aggregations6 === void 0 ? void 0 : _result$aggregations6.monitors.buckets;
    const bucketId = this.getBucketToIncrement();
    const bucket = this.collector[bucketId];
    bucket.no_of_unique_monitors = numberOfUniqueMonitors;
    bucket.no_of_unique_observer_locations = numberOfUniqueLocations;
    bucket.no_of_unique_observer_locations = numberOfUniqueLocations;
    bucket.monitor_name_stats = {
      min_length: (_ref3 = monitorNameStats === null || monitorNameStats === void 0 ? void 0 : monitorNameStats.min_length) !== null && _ref3 !== void 0 ? _ref3 : 0,
      max_length: (_ref4 = monitorNameStats === null || monitorNameStats === void 0 ? void 0 : monitorNameStats.max_length) !== null && _ref4 !== void 0 ? _ref4 : 0,
      avg_length: +((_ref5 = monitorNameStats === null || monitorNameStats === void 0 ? void 0 : (_monitorNameStats$avg = monitorNameStats.avg_length) === null || _monitorNameStats$avg === void 0 ? void 0 : _monitorNameStats$avg.toFixed(2)) !== null && _ref5 !== void 0 ? _ref5 : 0)
    };
    bucket.observer_location_name_stats = {
      min_length: (_ref6 = locationNameStats === null || locationNameStats === void 0 ? void 0 : locationNameStats.min_length) !== null && _ref6 !== void 0 ? _ref6 : 0,
      max_length: (_ref7 = locationNameStats === null || locationNameStats === void 0 ? void 0 : locationNameStats.max_length) !== null && _ref7 !== void 0 ? _ref7 : 0,
      avg_length: +((_ref8 = locationNameStats === null || locationNameStats === void 0 ? void 0 : (_locationNameStats$av = locationNameStats.avg_length) === null || _locationNameStats$av === void 0 ? void 0 : _locationNameStats$av.toFixed(2)) !== null && _ref8 !== void 0 ? _ref8 : 0)
    };
    bucket.monitor_frequency = this.getMonitorsFrequency(uniqueMonitors);
    return bucket;
  }

  static getMonitorsFrequency(uniqueMonitors = []) {
    const frequencies = [];
    uniqueMonitors.map(item => {
      var _ref9, _docs$hits, _docs$hits$hits;

      return (_ref9 = (_docs$hits = item.docs.hits) === null || _docs$hits === void 0 ? void 0 : (_docs$hits$hits = _docs$hits.hits) === null || _docs$hits$hits === void 0 ? void 0 : _docs$hits$hits[0]) !== null && _ref9 !== void 0 ? _ref9 : {};
    }).forEach(monitor => {
      var _monitor$_source, _monitor$_source$moni;

      const timespan = monitor === null || monitor === void 0 ? void 0 : (_monitor$_source = monitor._source) === null || _monitor$_source === void 0 ? void 0 : (_monitor$_source$moni = _monitor$_source.monitor) === null || _monitor$_source$moni === void 0 ? void 0 : _monitor$_source$moni.timespan;

      if (timespan) {
        const timeDiffSec = _moment.default.duration((0, _moment.default)(timespan.lt).diff((0, _moment.default)(timespan.gte))).asSeconds();

        frequencies.push(timeDiffSec);
      }
    });
    return frequencies;
  }

  static getReport() {
    const minBucket = this.getCollectorWindow();
    Object.keys(this.collector).map(key => parseInt(key, 10)).filter(key => key < minBucket).forEach(oldBucket => {
      delete this.collector[oldBucket];
    });
    return Object.values(this.collector).reduce((acc, cum) => ({ ...cum,
      overview_page: acc.overview_page + cum.overview_page,
      monitor_page: acc.monitor_page + cum.monitor_page,
      settings_page: acc.settings_page + cum.settings_page
    }), {
      overview_page: 0,
      monitor_page: 0,
      settings_page: 0
    });
  }

  static getBucket() {
    const nowInSeconds = Math.round(Date.now() / 1000);
    return nowInSeconds - nowInSeconds % BUCKET_SIZE;
  }

  static getBucketToIncrement() {
    const bucketId = this.getBucket();

    if (!this.collector[bucketId]) {
      this.collector[bucketId] = {
        overview_page: 0,
        monitor_page: 0,
        no_of_unique_monitors: 0,
        settings_page: 0,
        monitor_frequency: [],
        monitor_name_stats: {
          min_length: 0,
          max_length: 0,
          avg_length: 0
        },
        no_of_unique_observer_locations: 0,
        observer_location_name_stats: {
          min_length: 0,
          max_length: 0,
          avg_length: 0
        },
        dateRangeStart: [],
        dateRangeEnd: [],
        autoRefreshEnabled: false,
        autorefreshInterval: []
      };
    }

    return bucketId;
  }

  static getCollectorWindow() {
    return this.getBucket() - BUCKET_SIZE * (BUCKET_NUMBER - 1);
  }

}

exports.KibanaTelemetryAdapter = KibanaTelemetryAdapter;

_defineProperty(KibanaTelemetryAdapter, "registerUsageCollector", (usageCollector, getSavedObjectsClient) => {
  if (!usageCollector) {
    return;
  }

  const collector = KibanaTelemetryAdapter.initUsageCollector(usageCollector, getSavedObjectsClient);
  usageCollector.registerCollector(collector);
});

_defineProperty(KibanaTelemetryAdapter, "collector", {});