"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockGraphStore = createMockGraphStore;

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _redux = require("redux");

var _store = require("./store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jest.mock('ui/new_platform');

/**
 * Creates a graph store with original reducers registered but mocked out dependencies.
 * This can be used to test a component in a realistic stateful setting and to test sagas
 * in their natural habitat by passing them in via options in the `sagas` array.
 *
 * The existing mocks are as barebone as possible, if you need specific values to be returned
 * from mocked dependencies, you can pass in `mockedDepsOverwrites` via options.
 */
function createMockGraphStore(_ref) {
  var _ref$sagas = _ref.sagas,
      sagas = _ref$sagas === void 0 ? [] : _ref$sagas,
      _ref$mockedDepsOverwr = _ref.mockedDepsOverwrites,
      mockedDepsOverwrites = _ref$mockedDepsOverwr === void 0 ? {} : _ref$mockedDepsOverwr,
      initialStateOverwrites = _ref.initialStateOverwrites;
  var workspaceMock = {
    runLayout: jest.fn(),
    nodes: [],
    edges: [],
    options: {},
    blacklistedNodes: []
  };
  var savedWorkspace = {
    save: jest.fn()
  };

  var mockedDeps = _objectSpread({
    addBasePath: jest.fn(function (url) {
      return url;
    }),
    changeUrl: jest.fn(),
    chrome: {
      setBreadcrumbs: jest.fn()
    },
    createWorkspace: jest.fn(),
    getWorkspace: jest.fn(function () {
      return workspaceMock;
    }),
    getSavedWorkspace: jest.fn(function () {
      return savedWorkspace;
    }),
    indexPatternProvider: {
      get: jest.fn(function () {
        return Promise.resolve({});
      })
    },
    indexPatterns: [{
      id: '123',
      attributes: {
        title: 'test-pattern'
      }
    }],
    I18nContext: jest.fn().mockImplementation(function (_ref2) {
      var children = _ref2.children;
      return children;
    }),
    notifications: {
      toasts: {
        addDanger: jest.fn(),
        addSuccess: jest.fn()
      }
    },
    http: {},
    notifyAngular: jest.fn(),
    savePolicy: 'configAndData',
    showSaveModal: jest.fn(),
    setLiveResponseFields: jest.fn(),
    setUrlTemplates: jest.fn(),
    setWorkspaceInitialized: jest.fn(),
    overlays: {
      openModal: jest.fn()
    },
    savedObjectsClient: {
      find: jest.fn(),
      get: jest.fn()
    }
  }, mockedDepsOverwrites);

  var sagaMiddleware = (0, _reduxSaga.default)();
  var rootReducer = (0, _store.createRootReducer)(mockedDeps.addBasePath);

  var initializedRootReducer = function initializedRootReducer(state, action) {
    return rootReducer(state || initialStateOverwrites, action);
  };

  var store = (0, _redux.createStore)(initializedRootReducer, (0, _redux.applyMiddleware)(sagaMiddleware));
  store.dispatch = jest.fn(store.dispatch);
  sagas.forEach(function (sagaCreator) {
    sagaMiddleware.run(sagaCreator(mockedDeps));
  });
  return {
    store: store,
    mockedDeps: mockedDeps
  };
}