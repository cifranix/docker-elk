"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeLibs = composeLibs;

var _apolloCacheInmemory = require("apollo-cache-inmemory");

var _apolloClient = _interopRequireDefault(require("apollo-client"));

var _apolloLink = require("apollo-link");

var _apolloLinkHttp = require("apollo-link-http");

var _apolloLinkState = require("apollo-link-state");

var _introspection = _interopRequireDefault(require("./graphql/introspection.json"));

var _kibana_observable_api = require("./lib/adapters/observable_api/kibana_observable_api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function composeLibs(core) {
  var cache = new _apolloCacheInmemory.InMemoryCache({
    addTypename: false,
    fragmentMatcher: new _apolloCacheInmemory.IntrospectionFragmentMatcher({
      introspectionQueryResultData: _introspection.default
    })
  });
  var observableApi = new _kibana_observable_api.InfraKibanaObservableApiAdapter({
    basePath: core.http.basePath.get()
  });

  var wrappedFetch = function wrappedFetch(path, options) {
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(resolve, reject) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // core.http.fetch isn't 100% compatible with the Fetch API and will
                // throw Errors on 401s. This top level try / catch handles those scenarios.
                try {
                  core.http.fetch(path, _objectSpread({}, options, {
                    // Set headers to undefined due to this bug: https://github.com/apollographql/apollo-link/issues/249,
                    // Apollo will try to set a "content-type" header which will conflict with the "Content-Type" header that
                    // core.http.fetch correctly sets.
                    headers: undefined,
                    asResponse: true
                  })).then(function (res) {
                    if (!res.response) {
                      return reject();
                    } // core.http.fetch will parse the Response and set a body before handing it back. As such .text() / .json()
                    // will have already been called on the Response instance. However, Apollo will also want to call
                    // .text() / .json() on the instance, as it expects the raw Response instance, rather than core's wrapper.
                    // .text() / .json() can only be called once, and an Error will be thrown if those methods are accessed again.
                    // This hacks around that by setting up a new .text() method that will restringify the JSON response we already have.
                    // This does result in an extra stringify / parse cycle, which isn't ideal, but as we only have a few endpoints left using
                    // GraphQL this shouldn't create excessive overhead.
                    // Ref: https://github.com/apollographql/apollo-link/blob/master/packages/apollo-link-http/src/httpLink.ts#L134
                    // and
                    // https://github.com/apollographql/apollo-link/blob/master/packages/apollo-link-http-common/src/index.ts#L125


                    return resolve(_objectSpread({}, res.response, {
                      text: function text() {
                        return new Promise(
                        /*#__PURE__*/
                        function () {
                          var _ref2 = _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee(resolveText, rejectText) {
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    if (!res.body) {
                                      _context.next = 4;
                                      break;
                                    }

                                    return _context.abrupt("return", resolveText(JSON.stringify(res.body)));

                                  case 4:
                                    return _context.abrupt("return", rejectText());

                                  case 5:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x3, _x4) {
                            return _ref2.apply(this, arguments);
                          };
                        }());
                      }
                    }));
                  });
                } catch (error) {
                  reject(error);
                }

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  };

  var HttpLink = (0, _apolloLinkHttp.createHttpLink)({
    fetch: wrappedFetch,
    uri: "/api/infra/graphql"
  });
  var graphQLOptions = {
    cache: cache,
    link: _apolloLink.ApolloLink.from([(0, _apolloLinkState.withClientState)({
      cache: cache,
      resolvers: {}
    }), HttpLink])
  };
  var apolloClient = new _apolloClient.default(graphQLOptions);
  var libs = {
    apolloClient: apolloClient,
    observableApi: observableApi
  };
  return libs;
}