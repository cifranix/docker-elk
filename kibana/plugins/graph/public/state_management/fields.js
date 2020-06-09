"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncNodeStyleSaga = exports.syncFieldsSaga = exports.updateSaveButtonSaga = exports.hasFieldsSelector = exports.liveResponseFieldsSelector = exports.selectedFieldsSelector = exports.fieldsSelector = exports.fieldMapSelector = exports.fieldsReducer = exports.deselectField = exports.selectField = exports.updateFieldProperties = exports.loadFields = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

var _dist = require("typescript-fsa-reducers/dist");

var _reselect = require("reselect");

var _effects = require("redux-saga/effects");

var _global = require("./global");

var _datasource = require("./datasource");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actionCreator = (0, _typescriptFsa.default)('x-pack/graph/fields');
var loadFields = actionCreator('LOAD_FIELDS');
exports.loadFields = loadFields;
var updateFieldProperties = actionCreator('UPDATE_FIELD_PROPERTIES');
exports.updateFieldProperties = updateFieldProperties;
var selectField = actionCreator('SELECT_FIELD');
exports.selectField = selectField;
var deselectField = actionCreator('DESELECT_FIELD');
exports.deselectField = deselectField;
var initialFields = {};
var fieldsReducer = (0, _dist.reducerWithInitialState)(initialFields).case(_global.reset, function () {
  return initialFields;
}).case(_datasource.setDatasource, function () {
  return initialFields;
}).case(loadFields, function (_currentFields, newFields) {
  var newFieldMap = {};
  newFields.forEach(function (field) {
    newFieldMap[field.name] = field;
  });
  return newFieldMap;
}).case(updateFieldProperties, function (fields, _ref) {
  var fieldName = _ref.fieldName,
      fieldProperties = _ref.fieldProperties;
  return _objectSpread({}, fields, _defineProperty({}, fieldName, _objectSpread({}, fields[fieldName], {}, fieldProperties)));
}).case(selectField, function (fields, fieldName) {
  return _objectSpread({}, fields, _defineProperty({}, fieldName, _objectSpread({}, fields[fieldName], {
    selected: true
  })));
}).case(deselectField, function (fields, fieldName) {
  return _objectSpread({}, fields, _defineProperty({}, fieldName, _objectSpread({}, fields[fieldName], {
    selected: false
  })));
}).build();
exports.fieldsReducer = fieldsReducer;

var fieldMapSelector = function fieldMapSelector(state) {
  return state.fields;
};

exports.fieldMapSelector = fieldMapSelector;
var fieldsSelector = (0, _reselect.createSelector)(fieldMapSelector, function (fields) {
  return Object.values(fields);
});
exports.fieldsSelector = fieldsSelector;
var selectedFieldsSelector = (0, _reselect.createSelector)(fieldsSelector, function (fields) {
  return fields.filter(function (field) {
    return field.selected;
  });
});
exports.selectedFieldsSelector = selectedFieldsSelector;
var liveResponseFieldsSelector = (0, _reselect.createSelector)(selectedFieldsSelector, function (fields) {
  return fields.filter(function (field) {
    return field.hopSize && field.hopSize > 0;
  });
});
exports.liveResponseFieldsSelector = liveResponseFieldsSelector;
var hasFieldsSelector = (0, _reselect.createSelector)(selectedFieldsSelector, function (fields) {
  return fields.length > 0;
});
/**
 * Saga making notifying angular when fields are selected to re-calculate the state of the save button.
 *
 * Won't be necessary once the workspace is moved to redux
 */

exports.hasFieldsSelector = hasFieldsSelector;

var updateSaveButtonSaga = function updateSaveButtonSaga(_ref2) {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(notify);

  var notifyAngular = _ref2.notifyAngular;

  function notify() {
    return regeneratorRuntime.wrap(function notify$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            notifyAngular();

          case 1:
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
              return (0, _effects.takeLatest)((0, _helpers.matchesOne)(selectField, deselectField), notify);

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
 * Saga making sure the fields in the store are always synced with the fields
 * known to the workspace.
 *
 * Won't be necessary once the workspace is moved to redux
 */


exports.updateSaveButtonSaga = updateSaveButtonSaga;

var syncFieldsSaga = function syncFieldsSaga(_ref3) {
  var _marked2 =
  /*#__PURE__*/
  regeneratorRuntime.mark(syncFields);

  var getWorkspace = _ref3.getWorkspace,
      setLiveResponseFields = _ref3.setLiveResponseFields;

  function syncFields() {
    var workspace, currentState;
    return regeneratorRuntime.wrap(function syncFields$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            workspace = getWorkspace();

            if (workspace) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return");

          case 3:
            _context3.next = 5;
            return (0, _effects.select)();

          case 5:
            currentState = _context3.sent;
            workspace.options.vertex_fields = selectedFieldsSelector(currentState);
            setLiveResponseFields(liveResponseFieldsSelector(currentState));

          case 8:
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
              return (0, _effects.takeEvery)((0, _helpers.matchesOne)(loadFields, selectField, deselectField, updateFieldProperties), syncFields);

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee2);
    })
  );
};
/**
 * Saga making sure the field styles (icons and colors) are applied to nodes currently active
 * in the workspace.
 *
 * Won't be necessary once the workspace is moved to redux
 */


exports.syncFieldsSaga = syncFieldsSaga;

var syncNodeStyleSaga = function syncNodeStyleSaga(_ref4) {
  var _marked3 =
  /*#__PURE__*/
  regeneratorRuntime.mark(syncNodeStyle);

  var getWorkspace = _ref4.getWorkspace,
      notifyAngular = _ref4.notifyAngular;

  function syncNodeStyle(action) {
    var workspace, newColor, newIcon, selectedFields;
    return regeneratorRuntime.wrap(function syncNodeStyle$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            workspace = getWorkspace();

            if (workspace) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return");

          case 3:
            newColor = action.payload.fieldProperties.color;

            if (newColor) {
              workspace.nodes.forEach(function (node) {
                if (node.data.field === action.payload.fieldName) {
                  node.color = newColor;
                }
              });
            }

            newIcon = action.payload.fieldProperties.icon;

            if (newIcon) {
              workspace.nodes.forEach(function (node) {
                if (node.data.field === action.payload.fieldName) {
                  node.icon = newIcon;
                }
              });
            }

            notifyAngular();
            _context5.t0 = selectedFieldsSelector;
            _context5.next = 11;
            return (0, _effects.select)();

          case 11:
            _context5.t1 = _context5.sent;
            selectedFields = (0, _context5.t0)(_context5.t1);
            workspace.options.vertex_fields = selectedFields;

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _marked3);
  }

  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return (0, _effects.takeLatest)(updateFieldProperties.match, syncNodeStyle);

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee3);
    })
  );
};

exports.syncNodeStyleSaga = syncNodeStyleSaga;