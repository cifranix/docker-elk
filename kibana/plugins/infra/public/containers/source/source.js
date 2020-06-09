"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSourceContext = exports.SourceProvider = exports.Source = exports.useSource = exports.pickIndexPattern = void 0;

var _constate = _interopRequireDefault(require("constate"));

var _react = require("react");

var _apollo_context = require("../../utils/apollo_context");

var _use_tracked_promise = require("../../utils/use_tracked_promise");

var _create_source = require("./create_source.gql_query");

var _query_source = require("./query_source.gql_query");

var _update_source = require("./update_source.gql_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var pickIndexPattern = function pickIndexPattern(source, type) {
  if (!source) {
    return 'unknown-index';
  }

  if (type === 'logs') {
    return source.configuration.logAlias;
  }

  if (type === 'metrics') {
    return source.configuration.metricAlias;
  }

  return "".concat(source.configuration.logAlias, ",").concat(source.configuration.metricAlias);
};

exports.pickIndexPattern = pickIndexPattern;

var useSource = function useSource(_ref) {
  var sourceId = _ref.sourceId;
  var apolloClient = (0, _apollo_context.useApolloClient)();

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      source = _useState2[0],
      setSource = _useState2[1];

  var _useTrackedPromise = (0, _use_tracked_promise.useTrackedPromise)({
    cancelPreviousOn: 'resolution',
    createPromise: function () {
      var _createPromise = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (apolloClient) {
                  _context.next = 2;
                  break;
                }

                throw new _apollo_context.DependencyError('Failed to load source: No apollo client available.');

              case 2:
                _context.next = 4;
                return apolloClient.query({
                  fetchPolicy: 'no-cache',
                  query: _query_source.sourceQuery,
                  variables: {
                    sourceId: sourceId
                  }
                });

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createPromise() {
        return _createPromise.apply(this, arguments);
      }

      return createPromise;
    }(),
    onResolve: function onResolve(response) {
      setSource(response.data.source);
    }
  }, [apolloClient, sourceId]),
      _useTrackedPromise2 = _slicedToArray(_useTrackedPromise, 2),
      loadSourceRequest = _useTrackedPromise2[0],
      loadSource = _useTrackedPromise2[1];

  var _useTrackedPromise3 = (0, _use_tracked_promise.useTrackedPromise)({
    createPromise: function () {
      var _createPromise2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(sourceProperties) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (apolloClient) {
                  _context2.next = 2;
                  break;
                }

                throw new _apollo_context.DependencyError('Failed to create source configuration: No apollo client available.');

              case 2:
                _context2.next = 4;
                return apolloClient.mutate({
                  mutation: _create_source.createSourceMutation,
                  fetchPolicy: 'no-cache',
                  variables: {
                    sourceId: sourceId,
                    sourceProperties: sourceProperties
                  }
                });

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createPromise(_x) {
        return _createPromise2.apply(this, arguments);
      }

      return createPromise;
    }(),
    onResolve: function onResolve(response) {
      if (response.data) {
        setSource(response.data.createSource.source);
      }
    }
  }, [apolloClient, sourceId]),
      _useTrackedPromise4 = _slicedToArray(_useTrackedPromise3, 2),
      createSourceConfigurationRequest = _useTrackedPromise4[0],
      createSourceConfiguration = _useTrackedPromise4[1];

  var _useTrackedPromise5 = (0, _use_tracked_promise.useTrackedPromise)({
    createPromise: function () {
      var _createPromise3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(sourceProperties) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (apolloClient) {
                  _context3.next = 2;
                  break;
                }

                throw new _apollo_context.DependencyError('Failed to update source configuration: No apollo client available.');

              case 2:
                _context3.next = 4;
                return apolloClient.mutate({
                  mutation: _update_source.updateSourceMutation,
                  fetchPolicy: 'no-cache',
                  variables: {
                    sourceId: sourceId,
                    sourceProperties: sourceProperties
                  }
                });

              case 4:
                return _context3.abrupt("return", _context3.sent);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createPromise(_x2) {
        return _createPromise3.apply(this, arguments);
      }

      return createPromise;
    }(),
    onResolve: function onResolve(response) {
      if (response.data) {
        setSource(response.data.updateSource.source);
      }
    }
  }, [apolloClient, sourceId]),
      _useTrackedPromise6 = _slicedToArray(_useTrackedPromise5, 2),
      updateSourceConfigurationRequest = _useTrackedPromise6[0],
      updateSourceConfiguration = _useTrackedPromise6[1];

  var createDerivedIndexPattern = function createDerivedIndexPattern(type) {
    return {
      fields: source ? source.status.indexFields : [],
      title: pickIndexPattern(source, type)
    };
  };

  var isLoading = (0, _react.useMemo)(function () {
    return [loadSourceRequest.state, createSourceConfigurationRequest.state, updateSourceConfigurationRequest.state].some(function (state) {
      return state === 'pending';
    });
  }, [loadSourceRequest.state, createSourceConfigurationRequest.state, updateSourceConfigurationRequest.state]);
  var isUninitialized = (0, _react.useMemo)(function () {
    return loadSourceRequest.state === 'uninitialized';
  }, [loadSourceRequest.state]);
  var sourceExists = (0, _react.useMemo)(function () {
    return source ? !!source.version : undefined;
  }, [source]);
  var logIndicesExist = (0, _react.useMemo)(function () {
    return source && source.status && source.status.logIndicesExist;
  }, [source]);
  var metricIndicesExist = (0, _react.useMemo)(function () {
    return source && source.status && source.status.metricIndicesExist;
  }, [source]);
  (0, _react.useEffect)(function () {
    loadSource();
  }, [loadSource, sourceId]);
  return {
    createSourceConfiguration: createSourceConfiguration,
    createDerivedIndexPattern: createDerivedIndexPattern,
    logIndicesExist: logIndicesExist,
    isLoading: isLoading,
    isLoadingSource: loadSourceRequest.state === 'pending',
    isUninitialized: isUninitialized,
    hasFailedLoadingSource: loadSourceRequest.state === 'rejected',
    loadSource: loadSource,
    loadSourceFailureMessage: loadSourceRequest.state === 'rejected' ? "".concat(loadSourceRequest.value) : undefined,
    metricIndicesExist: metricIndicesExist,
    source: source,
    sourceExists: sourceExists,
    sourceId: sourceId,
    updateSourceConfiguration: updateSourceConfiguration,
    version: source && source.version ? source.version : undefined
  };
};

exports.useSource = useSource;
var Source = (0, _constate.default)(useSource);
exports.Source = Source;

var _Source = _slicedToArray(Source, 2),
    SourceProvider = _Source[0],
    useSourceContext = _Source[1];

exports.useSourceContext = useSourceContext;
exports.SourceProvider = SourceProvider;