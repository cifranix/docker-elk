"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRootReducer = createRootReducer;
exports.createGraphStore = void 0;

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _redux = require("redux");

var _fields = require("./fields");

var _url_templates = require("./url_templates");

var _advanced_settings = require("./advanced_settings");

var _datasource = require("./datasource");

var _datasource2 = require("./datasource.sagas");

var _persistence = require("./persistence");

var _meta_data = require("./meta_data");

var _workspace = require("./workspace");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createRootReducer(addBasePath) {
  return (0, _redux.combineReducers)({
    fields: _fields.fieldsReducer,
    urlTemplates: (0, _url_templates.urlTemplatesReducer)(addBasePath),
    advancedSettings: _advanced_settings.advancedSettingsReducer,
    datasource: _datasource.datasourceReducer,
    metaData: _meta_data.metaDataReducer
  });
}

function registerSagas(sagaMiddleware, deps) {
  sagaMiddleware.run((0, _datasource2.datasourceSaga)(deps));
  sagaMiddleware.run((0, _persistence.loadingSaga)(deps));
  sagaMiddleware.run((0, _persistence.savingSaga)(deps));
  sagaMiddleware.run((0, _fields.syncFieldsSaga)(deps));
  sagaMiddleware.run((0, _fields.syncNodeStyleSaga)(deps));
  sagaMiddleware.run((0, _advanced_settings.syncSettingsSaga)(deps));
  sagaMiddleware.run((0, _fields.updateSaveButtonSaga)(deps));
  sagaMiddleware.run((0, _meta_data.syncBreadcrumbSaga)(deps));
  sagaMiddleware.run((0, _url_templates.syncTemplatesSaga)(deps));
  sagaMiddleware.run((0, _workspace.fillWorkspaceSaga)(deps));
}

var createGraphStore = function createGraphStore(deps) {
  var sagaMiddleware = (0, _reduxSaga.default)();
  var rootReducer = createRootReducer(deps.addBasePath);
  var store = (0, _redux.createStore)(rootReducer, (0, _redux.applyMiddleware)(sagaMiddleware));
  registerSagas(sagaMiddleware, deps);
  return store;
};

exports.createGraphStore = createGraphStore;