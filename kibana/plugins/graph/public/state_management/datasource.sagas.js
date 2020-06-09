"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datasourceSaga = void 0;

var _effects = require("redux-saga/effects");

var _i18n = require("@kbn/i18n");

var _fields = require("./fields");

var _persistence = require("../services/persistence");

var _advanced_settings = require("./advanced_settings");

var _datasource = require("./datasource");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Saga loading field information when the datasource is switched. This will overwrite current settings
 * in fields.
 *
 * TODO: Carry over fields than can be carried over because they also exist in the target index pattern
 */
var datasourceSaga = function datasourceSaga(_ref) {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(fetchFields);

  var indexPatternProvider = _ref.indexPatternProvider,
      notifications = _ref.notifications,
      createWorkspace = _ref.createWorkspace,
      notifyAngular = _ref.notifyAngular;

  function fetchFields(action) {
    var indexPattern, advancedSettings;
    return regeneratorRuntime.wrap(function fetchFields$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _effects.call)(indexPatternProvider.get, action.payload.id);

          case 3:
            indexPattern = _context.sent;
            _context.next = 6;
            return (0, _effects.put)((0, _fields.loadFields)((0, _persistence.mapFields)(indexPattern)));

          case 6:
            _context.next = 8;
            return (0, _effects.put)((0, _datasource.datasourceLoaded)());

          case 8:
            _context.t0 = _advanced_settings.settingsSelector;
            _context.next = 11;
            return (0, _effects.select)();

          case 11:
            _context.t1 = _context.sent;
            advancedSettings = (0, _context.t0)(_context.t1);
            createWorkspace(indexPattern.title, advancedSettings);
            notifyAngular();
            _context.next = 22;
            break;

          case 17:
            _context.prev = 17;
            _context.t2 = _context["catch"](0);
            _context.next = 21;
            return (0, _effects.put)((0, _datasource.setDatasource)({
              type: 'none'
            }));

          case 21:
            notifications.toasts.addDanger(_i18n.i18n.translate('xpack.graph.loadWorkspace.missingIndexPatternErrorMessage', {
              defaultMessage: 'Index pattern not found'
            }));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _marked, null, [[0, 17]]);
  }

  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _effects.takeLatest)(_datasource.requestDatasource.match, fetchFields);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    })
  );
};

exports.datasourceSaga = datasourceSaga;