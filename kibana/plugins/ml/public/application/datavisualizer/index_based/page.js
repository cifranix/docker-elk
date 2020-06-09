"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _public = require("../../../../../../../src/plugins/data/public");

var _navigation_menu = require("../../components/navigation_menu");

var _field_types = require("../../../../common/constants/field_types");

var _search = require("../../../../common/constants/search");

var _license = require("../../license");

var _check_privilege = require("../../privilege/check_privilege");

var _check_ml_nodes = require("../../ml_nodes_check/check_ml_nodes");

var _full_time_range_selector = require("../../components/full_time_range_selector");

var _timefilter_refresh_service = require("../../services/timefilter_refresh_service");

var _ml = require("../../contexts/ml");

var _field_types_utils = require("../../util/field_types_utils");

var _kibana = require("../../contexts/kibana");

var _index_utils = require("../../util/index_utils");

var _time_buckets = require("../../util/time_buckets");

var _url_state = require("../../util/url_state");

var _actions_panel = require("./components/actions_panel");

var _fields_panel = require("./components/fields_panel");

var _search_panel = require("./components/search_panel");

var _data_loader = require("./data_loader");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultSearchQuery = {
  match_all: {}
};

function getDefaultPageState() {
  return {
    searchString: '',
    searchQuery: defaultSearchQuery,
    searchQueryLanguage: _search.SEARCH_QUERY_LANGUAGE.KUERY,
    samplerShardSize: 5000,
    overallStats: {
      totalCount: 0,
      aggregatableExistsFields: [],
      aggregatableNotExistsFields: [],
      nonAggregatableExistsFields: [],
      nonAggregatableNotExistsFields: []
    },
    metricConfigs: [],
    totalMetricFieldCount: 0,
    populatedMetricFieldCount: 0,
    showAllMetrics: false,
    nonMetricConfigs: [],
    totalNonMetricFieldCount: 0,
    populatedNonMetricFieldCount: 0,
    showAllNonMetrics: false,
    nonMetricShowFieldType: '*'
  };
}

var Page = function Page() {
  var _globalState$time, _globalState$time2, _globalState$refreshI, _globalState$refreshI2;

  var mlContext = (0, _ml.useMlContext)();
  var combinedQuery = mlContext.combinedQuery,
      currentIndexPattern = mlContext.currentIndexPattern,
      currentSavedSearch = mlContext.currentSavedSearch,
      kibanaConfig = mlContext.kibanaConfig;
  var timefilter = (0, _kibana.useTimefilter)({
    timeRangeSelector: currentIndexPattern.timeFieldName !== undefined,
    autoRefreshSelector: true
  });
  var dataLoader = new _data_loader.DataLoader(currentIndexPattern, kibanaConfig);

  var _useUrlState = (0, _url_state.useUrlState)('_g'),
      _useUrlState2 = _slicedToArray(_useUrlState, 2),
      globalState = _useUrlState2[0],
      setGlobalState = _useUrlState2[1];

  (0, _react.useEffect)(function () {
    if ((globalState === null || globalState === void 0 ? void 0 : globalState.time) !== undefined) {
      timefilter.setTime({
        from: globalState.time.from,
        to: globalState.time.to
      });
    }
  }, [globalState === null || globalState === void 0 ? void 0 : (_globalState$time = globalState.time) === null || _globalState$time === void 0 ? void 0 : _globalState$time.from, globalState === null || globalState === void 0 ? void 0 : (_globalState$time2 = globalState.time) === null || _globalState$time2 === void 0 ? void 0 : _globalState$time2.to]);
  (0, _react.useEffect)(function () {
    if ((globalState === null || globalState === void 0 ? void 0 : globalState.refreshInterval) !== undefined) {
      timefilter.setRefreshInterval(globalState.refreshInterval);
    }
  }, [globalState === null || globalState === void 0 ? void 0 : (_globalState$refreshI = globalState.refreshInterval) === null || _globalState$refreshI === void 0 ? void 0 : _globalState$refreshI.pause, globalState === null || globalState === void 0 ? void 0 : (_globalState$refreshI2 = globalState.refreshInterval) === null || _globalState$refreshI2 === void 0 ? void 0 : _globalState$refreshI2.value]);

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      lastRefresh = _useState2[0],
      setLastRefresh = _useState2[1];

  (0, _react.useEffect)(function () {
    (0, _index_utils.timeBasedIndexCheck)(currentIndexPattern, true);
  }, []); // Obtain the list of non metric field types which appear in the index pattern.

  var indexedFieldTypes = [];
  var indexPatternFields = currentIndexPattern.fields;
  indexPatternFields.forEach(function (field) {
    if (field.scripted !== true) {
      var dataVisualizerType = (0, _field_types_utils.kbnTypeToMLJobType)(field);

      if (dataVisualizerType !== undefined && !indexedFieldTypes.includes(dataVisualizerType) && dataVisualizerType !== _field_types.ML_JOB_FIELD_TYPES.NUMBER) {
        indexedFieldTypes.push(dataVisualizerType);
      }
    }
  });
  indexedFieldTypes = indexedFieldTypes.sort();
  var defaults = getDefaultPageState();
  var showActionsPanel = (0, _license.isFullLicense)() && (0, _check_privilege.checkPermission)('canCreateJob') && (0, _check_ml_nodes.mlNodesAvailable)() && currentIndexPattern.timeFieldName !== undefined;

  var _extractSearchData = extractSearchData(currentSavedSearch),
      initSearchQuery = _extractSearchData.searchQuery,
      initSearchString = _extractSearchData.searchString,
      initQueryLanguage = _extractSearchData.queryLanguage;

  var _useState3 = (0, _react.useState)(initSearchString),
      _useState4 = _slicedToArray(_useState3, 2),
      searchString = _useState4[0],
      setSearchString = _useState4[1];

  var _useState5 = (0, _react.useState)(initSearchQuery),
      _useState6 = _slicedToArray(_useState5, 2),
      searchQuery = _useState6[0],
      setSearchQuery = _useState6[1];

  var _useState7 = (0, _react.useState)(initQueryLanguage),
      _useState8 = _slicedToArray(_useState7, 2),
      searchQueryLanguage = _useState8[0],
      setSearchQueryLanguage = _useState8[1];

  var _useState9 = (0, _react.useState)(defaults.samplerShardSize),
      _useState10 = _slicedToArray(_useState9, 2),
      samplerShardSize = _useState10[0],
      setSamplerShardSize = _useState10[1]; // TODO - type overallStats and stats


  var _useState11 = (0, _react.useState)(defaults.overallStats),
      _useState12 = _slicedToArray(_useState11, 2),
      overallStats = _useState12[0],
      setOverallStats = _useState12[1];

  var _useState13 = (0, _react.useState)(defaults.metricConfigs),
      _useState14 = _slicedToArray(_useState13, 2),
      metricConfigs = _useState14[0],
      setMetricConfigs = _useState14[1];

  var _useState15 = (0, _react.useState)(defaults.totalMetricFieldCount),
      _useState16 = _slicedToArray(_useState15, 2),
      totalMetricFieldCount = _useState16[0],
      setTotalMetricFieldCount = _useState16[1];

  var _useState17 = (0, _react.useState)(defaults.populatedMetricFieldCount),
      _useState18 = _slicedToArray(_useState17, 2),
      populatedMetricFieldCount = _useState18[0],
      setPopulatedMetricFieldCount = _useState18[1];

  var _useState19 = (0, _react.useState)(defaults.showAllMetrics),
      _useState20 = _slicedToArray(_useState19, 2),
      showAllMetrics = _useState20[0],
      setShowAllMetrics = _useState20[1];

  var _useState21 = (0, _react.useState)(defaults.metricFieldQuery),
      _useState22 = _slicedToArray(_useState21, 2),
      metricFieldQuery = _useState22[0],
      setMetricFieldQuery = _useState22[1];

  var _useState23 = (0, _react.useState)(defaults.nonMetricConfigs),
      _useState24 = _slicedToArray(_useState23, 2),
      nonMetricConfigs = _useState24[0],
      setNonMetricConfigs = _useState24[1];

  var _useState25 = (0, _react.useState)(defaults.totalNonMetricFieldCount),
      _useState26 = _slicedToArray(_useState25, 2),
      totalNonMetricFieldCount = _useState26[0],
      setTotalNonMetricFieldCount = _useState26[1];

  var _useState27 = (0, _react.useState)(defaults.populatedNonMetricFieldCount),
      _useState28 = _slicedToArray(_useState27, 2),
      populatedNonMetricFieldCount = _useState28[0],
      setPopulatedNonMetricFieldCount = _useState28[1];

  var _useState29 = (0, _react.useState)(defaults.showAllNonMetrics),
      _useState30 = _slicedToArray(_useState29, 2),
      showAllNonMetrics = _useState30[0],
      setShowAllNonMetrics = _useState30[1];

  var _useState31 = (0, _react.useState)(defaults.nonMetricShowFieldType),
      _useState32 = _slicedToArray(_useState31, 2),
      nonMetricShowFieldType = _useState32[0],
      setNonMetricShowFieldType = _useState32[1];

  var _useState33 = (0, _react.useState)(defaults.nonMetricFieldQuery),
      _useState34 = _slicedToArray(_useState33, 2),
      nonMetricFieldQuery = _useState34[0],
      setNonMetricFieldQuery = _useState34[1];

  (0, _react.useEffect)(function () {
    var timeUpdateSubscription = (0, _rxjs.merge)(timefilter.getTimeUpdate$(), _timefilter_refresh_service.mlTimefilterRefresh$).subscribe(function () {
      setGlobalState({
        time: timefilter.getTime(),
        refreshInterval: timefilter.getRefreshInterval()
      });
      setLastRefresh(Date.now());
    });
    return function () {
      timeUpdateSubscription.unsubscribe();
    };
  });
  (0, _react.useEffect)(function () {
    loadOverallStats();
  }, [searchQuery, samplerShardSize, lastRefresh]);
  (0, _react.useEffect)(function () {
    createMetricCards();
    createNonMetricCards();
  }, [overallStats]);
  (0, _react.useEffect)(function () {
    loadMetricFieldStats();
  }, [metricConfigs]);
  (0, _react.useEffect)(function () {
    loadNonMetricFieldStats();
  }, [nonMetricConfigs]);
  (0, _react.useEffect)(function () {
    createMetricCards();
  }, [showAllMetrics, metricFieldQuery]);
  (0, _react.useEffect)(function () {
    createNonMetricCards();
  }, [showAllNonMetrics, nonMetricShowFieldType, nonMetricFieldQuery]);
  /**
   * Extract query data from the saved search object.
   */

  function extractSearchData(savedSearch) {
    if (!savedSearch) {
      return {
        searchQuery: defaults.searchQuery,
        searchString: defaults.searchString,
        queryLanguage: defaults.searchQueryLanguage
      };
    }

    var _getQueryFromSavedSea = (0, _index_utils.getQueryFromSavedSearch)(savedSearch),
        query = _getQueryFromSavedSea.query;

    var queryLanguage = query.language;
    var qryString = query.query;
    var qry;

    if (queryLanguage === _search.SEARCH_QUERY_LANGUAGE.KUERY) {
      var ast = _public.esKuery.fromKueryExpression(qryString);

      qry = _public.esKuery.toElasticsearchQuery(ast, currentIndexPattern);
    } else {
      qry = _public.esQuery.luceneStringToDsl(qryString);

      _public.esQuery.decorateQuery(qry, kibanaConfig.get('query:queryString:options'));
    }

    return {
      searchQuery: qry,
      searchString: qryString,
      queryLanguage: queryLanguage
    };
  }

  function loadOverallStats() {
    return _loadOverallStats.apply(this, arguments);
  }

  function _loadOverallStats() {
    _loadOverallStats = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var tf, earliest, latest, activeBounds, allStats;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tf = timefilter;
              activeBounds = tf.getActiveBounds();

              if (!(currentIndexPattern.timeFieldName !== undefined && activeBounds === undefined)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              if (currentIndexPattern.timeFieldName !== undefined) {
                earliest = activeBounds.min.valueOf();
                latest = activeBounds.max.valueOf();
              }

              _context.prev = 5;
              _context.next = 8;
              return dataLoader.loadOverallData(searchQuery, samplerShardSize, earliest, latest);

            case 8:
              allStats = _context.sent;
              setOverallStats(allStats);
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](5);
              dataLoader.displayError(_context.t0);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 12]]);
    }));
    return _loadOverallStats.apply(this, arguments);
  }

  function loadMetricFieldStats() {
    return _loadMetricFieldStats.apply(this, arguments);
  }

  function _loadMetricFieldStats() {
    _loadMetricFieldStats = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var configsToLoad, existMetricFields, buckets, tf, earliest, latest, bounds, BAR_TARGET, aggInterval, metricFieldStats, configs;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(metricConfigs.length === 0)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              configsToLoad = metricConfigs.filter(function (config) {
                return config.existsInDocs === true && config.loading === true;
              });

              if (!(configsToLoad.length === 0)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return");

            case 5:
              // Pass the field name, type and cardinality in the request.
              // Top values will be obtained on a sample if cardinality > 100000.
              existMetricFields = configsToLoad.map(function (config) {
                var props = {
                  fieldName: config.fieldName,
                  type: config.type,
                  cardinality: 0
                };

                if (config.stats !== undefined && config.stats.cardinality !== undefined) {
                  props.cardinality = config.stats.cardinality;
                }

                return props;
              }); // Obtain the interval to use for date histogram aggregations
              // (such as the document count chart). Aim for 75 bars.

              buckets = new _time_buckets.TimeBuckets();
              tf = timefilter;

              if (currentIndexPattern.timeFieldName !== undefined) {
                earliest = tf.getActiveBounds().min.valueOf();
                latest = tf.getActiveBounds().max.valueOf();
              }

              bounds = tf.getActiveBounds();
              BAR_TARGET = 75;
              buckets.setInterval('auto');
              buckets.setBounds(bounds);
              buckets.setBarTarget(BAR_TARGET);
              aggInterval = buckets.getInterval();
              _context2.prev = 15;
              _context2.next = 18;
              return dataLoader.loadFieldStats(searchQuery, samplerShardSize, earliest, latest, existMetricFields, aggInterval.expression);

            case 18:
              metricFieldStats = _context2.sent;
              // Add the metric stats to the existing stats in the corresponding config.
              configs = [];
              metricConfigs.forEach(function (config) {
                var configWithStats = _objectSpread({}, config);

                if (config.fieldName !== undefined) {
                  configWithStats.stats = _objectSpread({}, configWithStats.stats, {}, metricFieldStats.find(function (fieldStats) {
                    return fieldStats.fieldName === config.fieldName;
                  }));
                } else {
                  // Document count card.
                  configWithStats.stats = metricFieldStats.find(function (fieldStats) {
                    return fieldStats.fieldName === undefined;
                  }); // Add earliest / latest of timefilter for setting x axis domain.

                  configWithStats.stats.timeRangeEarliest = earliest;
                  configWithStats.stats.timeRangeLatest = latest;
                }

                configWithStats.loading = false;
                configs.push(configWithStats);
              });
              setMetricConfigs(configs);
              _context2.next = 27;
              break;

            case 24:
              _context2.prev = 24;
              _context2.t0 = _context2["catch"](15);
              dataLoader.displayError(_context2.t0);

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[15, 24]]);
    }));
    return _loadMetricFieldStats.apply(this, arguments);
  }

  function loadNonMetricFieldStats() {
    return _loadNonMetricFieldStats.apply(this, arguments);
  }

  function _loadNonMetricFieldStats() {
    _loadNonMetricFieldStats = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var configsToLoad, existNonMetricFields, tf, earliest, latest, nonMetricFieldStats, configs;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(nonMetricConfigs.length === 0)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              configsToLoad = nonMetricConfigs.filter(function (config) {
                return config.existsInDocs === true && config.loading === true;
              });

              if (!(configsToLoad.length === 0)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return");

            case 5:
              // Pass the field name, type and cardinality in the request.
              // Top values will be obtained on a sample if cardinality > 100000.
              existNonMetricFields = configsToLoad.map(function (config) {
                var props = {
                  fieldName: config.fieldName,
                  type: config.type,
                  cardinality: 0
                };

                if (config.stats !== undefined && config.stats.cardinality !== undefined) {
                  props.cardinality = config.stats.cardinality;
                }

                return props;
              });
              tf = timefilter;

              if (currentIndexPattern.timeFieldName !== undefined) {
                earliest = tf.getActiveBounds().min.valueOf();
                latest = tf.getActiveBounds().max.valueOf();
              }

              _context3.prev = 8;
              _context3.next = 11;
              return dataLoader.loadFieldStats(searchQuery, samplerShardSize, earliest, latest, existNonMetricFields);

            case 11:
              nonMetricFieldStats = _context3.sent;
              // Add the field stats to the existing stats in the corresponding config.
              configs = [];
              nonMetricConfigs.forEach(function (config) {
                var configWithStats = _objectSpread({}, config);

                if (config.fieldName !== undefined) {
                  configWithStats.stats = _objectSpread({}, configWithStats.stats, {}, nonMetricFieldStats.find(function (fieldStats) {
                    return fieldStats.fieldName === config.fieldName;
                  }));
                }

                configWithStats.loading = false;
                configs.push(configWithStats);
              });
              setNonMetricConfigs(configs);
              _context3.next = 20;
              break;

            case 17:
              _context3.prev = 17;
              _context3.t0 = _context3["catch"](8);
              dataLoader.displayError(_context3.t0);

            case 20:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[8, 17]]);
    }));
    return _loadNonMetricFieldStats.apply(this, arguments);
  }

  function createMetricCards() {
    var configs = [];
    var aggregatableExistsFields = overallStats.aggregatableExistsFields || [];
    var allMetricFields = indexPatternFields.filter(function (f) {
      return f.type === _public.KBN_FIELD_TYPES.NUMBER && f.displayName !== undefined && dataLoader.isDisplayField(f.displayName) === true;
    });

    if (metricFieldQuery !== undefined) {
      var metricFieldRegexp = new RegExp("(".concat(metricFieldQuery, ")"), 'gi');
      allMetricFields = allMetricFields.filter(function (f) {
        var addField = f.displayName !== undefined && !!f.displayName.match(metricFieldRegexp);
        return addField;
      });
    }

    var metricExistsFields = allMetricFields.filter(function (f) {
      return aggregatableExistsFields.find(function (existsF) {
        return existsF.fieldName === f.displayName;
      });
    }); // Add a config for 'document count', identified by no field name if indexpattern is time based.

    var allFieldCount = allMetricFields.length;
    var popFieldCount = metricExistsFields.length;

    if (currentIndexPattern.timeFieldName !== undefined) {
      configs.push({
        type: _field_types.ML_JOB_FIELD_TYPES.NUMBER,
        existsInDocs: true,
        loading: true,
        aggregatable: true
      });
      allFieldCount++;
      popFieldCount++;
    } // Add on 1 for the document count card.


    setTotalMetricFieldCount(allFieldCount);
    setPopulatedMetricFieldCount(popFieldCount);

    if (allMetricFields.length === metricExistsFields.length && showAllMetrics === false) {
      setShowAllMetrics(true);
      return;
    }

    var aggregatableFields = overallStats.aggregatableExistsFields;

    if (allMetricFields.length !== metricExistsFields.length && showAllMetrics === true) {
      aggregatableFields = aggregatableFields.concat(overallStats.aggregatableNotExistsFields);
    }

    var metricFieldsToShow = showAllMetrics === true ? allMetricFields : metricExistsFields;
    metricFieldsToShow.forEach(function (field) {
      var fieldData = aggregatableFields.find(function (f) {
        return f.fieldName === field.displayName;
      });

      if (fieldData !== undefined) {
        var metricConfig = _objectSpread({}, fieldData, {
          fieldFormat: field.format,
          type: _field_types.ML_JOB_FIELD_TYPES.NUMBER,
          loading: true,
          aggregatable: true
        });

        configs.push(metricConfig);
      }
    });
    setMetricConfigs(configs);
  }

  function createNonMetricCards() {
    var allNonMetricFields = [];

    if (nonMetricShowFieldType === '*') {
      allNonMetricFields = indexPatternFields.filter(function (f) {
        return f.type !== _public.KBN_FIELD_TYPES.NUMBER && f.displayName !== undefined && dataLoader.isDisplayField(f.displayName) === true;
      });
    } else {
      if (nonMetricShowFieldType === _field_types.ML_JOB_FIELD_TYPES.TEXT || nonMetricShowFieldType === _field_types.ML_JOB_FIELD_TYPES.KEYWORD) {
        var aggregatableCheck = nonMetricShowFieldType === _field_types.ML_JOB_FIELD_TYPES.KEYWORD ? true : false;
        allNonMetricFields = indexPatternFields.filter(function (f) {
          return f.displayName !== undefined && dataLoader.isDisplayField(f.displayName) === true && f.type === _public.KBN_FIELD_TYPES.STRING && f.aggregatable === aggregatableCheck;
        });
      } else {
        allNonMetricFields = indexPatternFields.filter(function (f) {
          return f.type === nonMetricShowFieldType && f.displayName !== undefined && dataLoader.isDisplayField(f.displayName) === true;
        });
      }
    } // If a field filter has been entered, perform another filter on the entered regexp.


    if (nonMetricFieldQuery !== undefined) {
      var nonMetricFieldRegexp = new RegExp("(".concat(nonMetricFieldQuery, ")"), 'gi');
      allNonMetricFields = allNonMetricFields.filter(function (f) {
        return f.displayName !== undefined && f.displayName.match(nonMetricFieldRegexp);
      });
    } // Obtain the list of all non-metric fields which appear in documents
    // (aggregatable or not aggregatable).


    var populatedNonMetricFields = []; // Kibana index pattern non metric fields.

    var nonMetricFieldData = []; // Basic non metric field data loaded from requesting overall stats.

    var aggregatableExistsFields = overallStats.aggregatableExistsFields || [];
    var nonAggregatableExistsFields = overallStats.nonAggregatableExistsFields || [];
    allNonMetricFields.forEach(function (f) {
      var checkAggregatableField = aggregatableExistsFields.find(function (existsField) {
        return existsField.fieldName === f.displayName;
      });

      if (checkAggregatableField !== undefined) {
        populatedNonMetricFields.push(f);
        nonMetricFieldData.push(checkAggregatableField);
      } else {
        var checkNonAggregatableField = nonAggregatableExistsFields.find(function (existsField) {
          return existsField.fieldName === f.displayName;
        });

        if (checkNonAggregatableField !== undefined) {
          populatedNonMetricFields.push(f);
          nonMetricFieldData.push(checkNonAggregatableField);
        }
      }
    });
    setTotalNonMetricFieldCount(allNonMetricFields.length);
    setPopulatedNonMetricFieldCount(nonMetricFieldData.length);

    if (allNonMetricFields.length === nonMetricFieldData.length && showAllNonMetrics === false) {
      setShowAllNonMetrics(true);
      return;
    }

    if (allNonMetricFields.length !== nonMetricFieldData.length && showAllNonMetrics === true) {
      // Combine the field data obtained from Elasticsearch into a single array.
      nonMetricFieldData = nonMetricFieldData.concat(overallStats.aggregatableNotExistsFields, overallStats.nonAggregatableNotExistsFields);
    }

    var nonMetricFieldsToShow = showAllNonMetrics === true ? allNonMetricFields : populatedNonMetricFields;
    var configs = [];
    nonMetricFieldsToShow.forEach(function (field) {
      var fieldData = nonMetricFieldData.find(function (f) {
        return f.fieldName === field.displayName;
      });

      var nonMetricConfig = _objectSpread({}, fieldData, {
        fieldFormat: field.format,
        aggregatable: field.aggregatable,
        scripted: field.scripted,
        loading: fieldData.existsInDocs
      }); // Map the field type from the Kibana index pattern to the field type
      // used in the data visualizer.


      var dataVisualizerType = (0, _field_types_utils.kbnTypeToMLJobType)(field);

      if (dataVisualizerType !== undefined) {
        nonMetricConfig.type = dataVisualizerType;
      } else {
        // Add a flag to indicate that this is one of the 'other' Kibana
        // field types that do not yet have a specific card type.
        nonMetricConfig.type = field.type;
        nonMetricConfig.isUnsupportedType = true;
      }

      configs.push(nonMetricConfig);
    });
    setNonMetricConfigs(configs);
  }

  var wizardPanelWidth = '280px';
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_navigation_menu.NavigationMenu, {
    tabId: "datavisualizer"
  }), _react.default.createElement(_eui.EuiPage, {
    "data-test-subj": "mlPageIndexDataVisualizer"
  }, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", null, currentIndexPattern.title))), currentIndexPattern.timeFieldName !== undefined && _react.default.createElement(_eui.EuiPageContentHeaderSection, {
    "data-test-subj": "mlDataVisualizerTimeRangeSelectorSection"
  }, _react.default.createElement(_full_time_range_selector.FullTimeRangeSelector, {
    indexPattern: currentIndexPattern,
    query: combinedQuery,
    disabled: false
  })))), showActionsPanel === true && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      width: wizardPanelWidth
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiPageContentBody, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_search_panel.SearchPanel, {
    indexPattern: currentIndexPattern,
    searchString: searchString,
    setSearchString: setSearchString,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    searchQueryLanguage: searchQueryLanguage,
    setSearchQueryLanguage: setSearchQueryLanguage,
    samplerShardSize: samplerShardSize,
    setSamplerShardSize: setSamplerShardSize,
    totalCount: overallStats.totalCount
  }), _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m"
  }, _react.default.createElement(_eui.EuiFlexItem, null, totalMetricFieldCount > 0 && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_fields_panel.FieldsPanel, {
    title: _i18n.i18n.translate('xpack.ml.datavisualizer.page.metricsPanelTitle', {
      defaultMessage: 'Metrics'
    }),
    totalFieldCount: totalMetricFieldCount,
    populatedFieldCount: populatedMetricFieldCount,
    fieldTypes: [_field_types.ML_JOB_FIELD_TYPES.NUMBER],
    showFieldType: _field_types.ML_JOB_FIELD_TYPES.NUMBER,
    showAllFields: showAllMetrics,
    setShowAllFields: setShowAllMetrics,
    fieldSearchBarQuery: metricFieldQuery,
    setFieldSearchBarQuery: setMetricFieldQuery,
    fieldVisConfigs: metricConfigs
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  })), _react.default.createElement(_fields_panel.FieldsPanel, {
    title: _i18n.i18n.translate('xpack.ml.datavisualizer.page.fieldsPanelTitle', {
      defaultMessage: 'Fields'
    }),
    totalFieldCount: totalNonMetricFieldCount,
    populatedFieldCount: populatedNonMetricFieldCount,
    showAllFields: showAllNonMetrics,
    setShowAllFields: setShowAllNonMetrics,
    fieldTypes: indexedFieldTypes,
    showFieldType: nonMetricShowFieldType,
    setShowFieldType: setNonMetricShowFieldType,
    fieldSearchBarQuery: nonMetricFieldQuery,
    setFieldSearchBarQuery: setNonMetricFieldQuery,
    fieldVisConfigs: nonMetricConfigs
  }))))), showActionsPanel === true && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      width: wizardPanelWidth
    }
  }, _react.default.createElement(_actions_panel.ActionsPanel, {
    indexPattern: currentIndexPattern
  })))))));
};

exports.Page = Page;