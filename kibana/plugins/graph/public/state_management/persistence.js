"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savingSaga = exports.loadingSaga = exports.saveWorkspace = exports.loadSavedWorkspace = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

var _i18n = require("@kbn/i18n");

var _effects = require("redux-saga/effects");

var _datasource = require("./datasource");

var _fields = require("./fields");

var _advanced_settings = require("./advanced_settings");

var _url_templates = require("./url_templates");

var _persistence = require("../services/persistence");

var _meta_data = require("./meta_data");

var _save_modal = require("../services/save_modal");

var _url = require("../services/url");

var _saved_workspace_utils = require("../helpers/saved_workspace_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var actionCreator = (0, _typescriptFsa.default)('x-pack/graph');
var loadSavedWorkspace = actionCreator('LOAD_WORKSPACE');
exports.loadSavedWorkspace = loadSavedWorkspace;
var saveWorkspace = actionCreator('SAVE_WORKSPACE');
/**
 * Saga handling loading of a saved workspace.
 *
 * It will load the index pattern associated with the saved object and deserialize all properties
 * into the store. Existing state will be overwritten.
 */

exports.saveWorkspace = saveWorkspace;

var loadingSaga = function loadingSaga(_ref) {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(deserializeWorkspace);

  var createWorkspace = _ref.createWorkspace,
      getWorkspace = _ref.getWorkspace,
      indexPatterns = _ref.indexPatterns,
      notifications = _ref.notifications,
      indexPatternProvider = _ref.indexPatternProvider;

  function deserializeWorkspace(action) {
    var selectedIndex, indexPattern, initialSettings, _savedWorkspaceToAppS, urlTemplates, advancedSettings, allFields;

    return regeneratorRuntime.wrap(function deserializeWorkspace$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            selectedIndex = (0, _persistence.lookupIndexPattern)(action.payload, indexPatterns);

            if (selectedIndex) {
              _context.next = 4;
              break;
            }

            notifications.toasts.addDanger(_i18n.i18n.translate('xpack.graph.loadWorkspace.missingIndexPatternErrorMessage', {
              defaultMessage: 'Index pattern not found'
            }));
            return _context.abrupt("return");

          case 4:
            _context.next = 6;
            return (0, _effects.call)(indexPatternProvider.get, selectedIndex.id);

          case 6:
            indexPattern = _context.sent;
            _context.t0 = _advanced_settings.settingsSelector;
            _context.next = 10;
            return (0, _effects.select)();

          case 10:
            _context.t1 = _context.sent;
            initialSettings = (0, _context.t0)(_context.t1);
            createWorkspace(selectedIndex.attributes.title, initialSettings);
            _savedWorkspaceToAppS = (0, _persistence.savedWorkspaceToAppState)(action.payload, indexPattern, // workspace won't be null because it's created in the same call stack
            getWorkspace()), urlTemplates = _savedWorkspaceToAppS.urlTemplates, advancedSettings = _savedWorkspaceToAppS.advancedSettings, allFields = _savedWorkspaceToAppS.allFields; // put everything in the store

            _context.next = 16;
            return (0, _effects.put)((0, _meta_data.updateMetaData)({
              title: action.payload.title,
              description: action.payload.description,
              savedObjectId: action.payload.id
            }));

          case 16:
            _context.next = 18;
            return (0, _effects.put)((0, _datasource.setDatasource)({
              type: 'indexpattern',
              id: selectedIndex.id,
              title: selectedIndex.attributes.title
            }));

          case 18:
            _context.next = 20;
            return (0, _effects.put)((0, _fields.loadFields)(allFields));

          case 20:
            _context.next = 22;
            return (0, _effects.put)((0, _advanced_settings.updateSettings)(advancedSettings));

          case 22:
            _context.next = 24;
            return (0, _effects.put)((0, _url_templates.loadTemplates)(urlTemplates));

          case 24:
            getWorkspace().runLayout();

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _marked);
  }

  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _effects.takeLatest)(loadSavedWorkspace.match, deserializeWorkspace);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    })
  );
};
/**
 * Saga handling saving of current state.
 *
 * It will serialize everything and save it using the saved objects client
 */


exports.loadingSaga = loadingSaga;

var savingSaga = function savingSaga(deps) {
  var _marked2 =
  /*#__PURE__*/
  regeneratorRuntime.mark(persistWorkspace);

  function persistWorkspace() {
    var savedWorkspace, state, workspace, selectedDatasource, savedObjectId;
    return regeneratorRuntime.wrap(function persistWorkspace$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            savedWorkspace = deps.getSavedWorkspace();
            _context3.next = 3;
            return (0, _effects.select)();

          case 3:
            state = _context3.sent;
            workspace = deps.getWorkspace();
            selectedDatasource = (0, _datasource.datasourceSelector)(state).current;

            if (!(!workspace || selectedDatasource.type === 'none')) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return");

          case 8:
            _context3.next = 10;
            return (0, _effects.cps)(showModal, {
              deps: deps,
              workspace: workspace,
              savedWorkspace: savedWorkspace,
              state: state,
              selectedDatasource: selectedDatasource
            });

          case 10:
            savedObjectId = _context3.sent;

            if (!savedObjectId) {
              _context3.next = 14;
              break;
            }

            _context3.next = 14;
            return (0, _effects.put)((0, _meta_data.updateMetaData)({
              savedObjectId: savedObjectId
            }));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _marked2);
  }

  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _effects.takeLatest)(saveWorkspace.match, persistWorkspace);

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee2);
    })
  );
};

exports.savingSaga = savingSaga;

function showModal(_ref2, savingCallback) {
  var deps = _ref2.deps,
      workspace = _ref2.workspace,
      savedWorkspace = _ref2.savedWorkspace,
      state = _ref2.state,
      selectedDatasource = _ref2.selectedDatasource;

  var saveWorkspaceHandler =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(saveOptions, userHasConfirmedSaveWorkspaceData, services) {
      var canSaveData, _id, title, text;

      return regeneratorRuntime.wrap(function _callee3$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              canSaveData = deps.savePolicy === 'configAndData' || deps.savePolicy === 'configAndDataWithConsent' && userHasConfirmedSaveWorkspaceData;
              (0, _persistence.appStateToSavedWorkspace)(savedWorkspace, {
                workspace: workspace,
                urlTemplates: (0, _url_templates.templatesSelector)(state),
                advancedSettings: (0, _advanced_settings.settingsSelector)(state),
                selectedIndex: selectedDatasource,
                selectedFields: (0, _fields.selectedFieldsSelector)(state)
              }, canSaveData);
              _context5.prev = 2;
              _context5.next = 5;
              return (0, _saved_workspace_utils.saveSavedWorkspace)(savedWorkspace, saveOptions, services);

            case 5:
              _id = _context5.sent;

              if (_id) {
                title = _i18n.i18n.translate('xpack.graph.saveWorkspace.successNotificationTitle', {
                  defaultMessage: 'Saved "{workspaceTitle}"',
                  values: {
                    workspaceTitle: savedWorkspace.title
                  }
                });

                if (!canSaveData && workspace.nodes.length > 0) {
                  text = _i18n.i18n.translate('xpack.graph.saveWorkspace.successNotification.noDataSavedText', {
                    defaultMessage: 'The configuration was saved, but the data was not saved'
                  });
                }

                deps.notifications.toasts.addSuccess({
                  title: title,
                  text: text,
                  'data-test-subj': 'saveGraphSuccess'
                });

                if (savedWorkspace.id !== (0, _meta_data.metaDataSelector)(state).savedObjectId) {
                  deps.changeUrl((0, _url.getEditPath)(savedWorkspace));
                }
              }

              savingCallback(null, _id);
              return _context5.abrupt("return", {
                id: _id
              });

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](2);
              deps.notifications.toasts.addDanger(_i18n.i18n.translate('xpack.graph.saveWorkspace.savingErrorMessage', {
                defaultMessage: 'Failed to save workspace: {message}',
                values: {
                  message: _context5.t0
                }
              }));
              return _context5.abrupt("return", {
                error: _context5.t0
              });

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee3, null, [[2, 11]]);
    }));

    return function saveWorkspaceHandler(_x, _x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  (0, _save_modal.openSaveModal)({
    savePolicy: deps.savePolicy,
    hasData: workspace.nodes.length > 0 || workspace.blacklistedNodes.length > 0,
    workspace: savedWorkspace,
    showSaveModal: deps.showSaveModal,
    saveWorkspace: saveWorkspaceHandler,
    I18nContext: deps.I18nContext,
    services: {
      savedObjectsClient: deps.savedObjectsClient,
      overlays: deps.overlays
    }
  });
}