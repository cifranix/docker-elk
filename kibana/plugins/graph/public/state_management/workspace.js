"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillWorkspaceSaga = exports.fillWorkspace = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

var _i18n = require("@kbn/i18n");

var _effects = require("redux-saga/effects");

var _datasource = require("./datasource");

var _fields = require("./fields");

var _fetch_top_nodes = require("../services/fetch_top_nodes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var actionCreator = (0, _typescriptFsa.default)('x-pack/graph');
var fillWorkspace = actionCreator('FILL_WORKSPACE');
/**
 * Saga handling filling in top terms into workspace.
 *
 * It will load the top terms of the selected fields, add them to the workspace and fill in the connections.
 */

exports.fillWorkspace = fillWorkspace;

var fillWorkspaceSaga = function fillWorkspaceSaga(_ref) {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(fetchNodes);

  var getWorkspace = _ref.getWorkspace,
      setWorkspaceInitialized = _ref.setWorkspaceInitialized,
      notifyAngular = _ref.notifyAngular,
      http = _ref.http,
      notifications = _ref.notifications;

  function fetchNodes() {
    var workspace, state, fields, datasource, topTermNodes, message;
    return regeneratorRuntime.wrap(function fetchNodes$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            workspace = getWorkspace();

            if (workspace) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            _context.next = 6;
            return (0, _effects.select)();

          case 6:
            state = _context.sent;
            fields = (0, _fields.selectedFieldsSelector)(state);
            datasource = (0, _datasource.datasourceSelector)(state).current;

            if (!(datasource.type === 'none')) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return");

          case 11:
            _context.next = 13;
            return (0, _effects.call)(_fetch_top_nodes.fetchTopNodes, http.post, datasource.title, fields);

          case 13:
            topTermNodes = _context.sent;
            workspace.mergeGraph({
              nodes: topTermNodes,
              edges: []
            });
            setWorkspaceInitialized();
            notifyAngular();
            workspace.fillInGraph(fields.length * 10);
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](0);
            message = 'body' in _context.t0 ? _context.t0.body.message : _context.t0.message;
            notifications.toasts.addDanger({
              title: _i18n.i18n.translate('xpack.graph.fillWorkspaceError', {
                defaultMessage: 'Fetching top terms failed: {message}',
                values: {
                  message: message
                }
              })
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _marked, null, [[0, 20]]);
  }

  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _effects.takeLatest)(fillWorkspace.match, fetchNodes);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    })
  );
};

exports.fillWorkspaceSaga = fillWorkspaceSaga;