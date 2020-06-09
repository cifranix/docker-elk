"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypeFromAction = getTypeFromAction;
exports.saveWatch = saveWatch;
exports.onWatchSave = onWatchSave;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _constants = require("../../../../common/constants");

var _api = require("../../lib/api");

var _navigation = require("../../lib/navigation");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get the type from an action where a key defines its type.
 * eg: { email: { ... } } | { slack: { ... } }
 */
function getTypeFromAction(action) {
  var actionKeys = Object.keys(action);
  var type;
  Object.keys(_constants.ACTION_TYPES).forEach(function (k) {
    if (actionKeys.includes(_constants.ACTION_TYPES[k])) {
      type = _constants.ACTION_TYPES[k];
    }
  });
  return type ? type : _constants.ACTION_TYPES.UNKNOWN;
}

function getPropsFromAction(type, action) {
  if (type === _constants.ACTION_TYPES.SLACK) {
    // Slack action has its props inside the "message" object
    return action[type].message;
  }

  if (type === _constants.ACTION_TYPES.JIRA) {
    // Jira action has its required props inside the "fields" object
    var jiraAction = {};
    jiraAction.projectKey = (0, _lodash.get)(action[type], 'fields.project.key');
    jiraAction.issueType = (0, _lodash.get)(action[type], 'fields.issuetype.name');
    jiraAction.summary = (0, _lodash.get)(action[type], 'fields.summary');
    return jiraAction;
  }

  return action[type];
}
/**
 * Actions instances are not automatically added to the Watch _actions_ Array
 * when we add them in the JSON watch editor. This method takes takes care of it.
 */


function createActionsForWatch(watchInstance) {
  watchInstance.resetActions();
  Object.keys(watchInstance.watch.actions).forEach(function (k) {
    var action = watchInstance.watch.actions[k];
    var type = getTypeFromAction(action);

    var actionProps = _objectSpread({}, getPropsFromAction(type, action), {
      ignoreDefaults: true
    });

    watchInstance.createAction(type, actionProps);
  });
  return watchInstance;
}

function saveWatch(_x, _x2) {
  return _saveWatch.apply(this, arguments);
}

function _saveWatch() {
  _saveWatch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(watch, toasts) {
    var _ref;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _api.createWatch)(watch);

          case 3:
            toasts.addSuccess(_i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.saveSuccessNotificationText', {
              defaultMessage: "Saved '{watchDisplayName}'",
              values: {
                watchDisplayName: watch.displayName
              }
            }));
            (0, _navigation.goToWatchList)();
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {
              error: (_ref = _context.t0 === null || _context.t0 === void 0 ? void 0 : _context.t0.response.data) !== null && _ref !== void 0 ? _ref : _context.t0.body || _context.t0
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _saveWatch.apply(this, arguments);
}

function onWatchSave(_x3, _x4) {
  return _onWatchSave.apply(this, arguments);
}

function _onWatchSave() {
  _onWatchSave = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(watch, toasts) {
    var watchActions, watchData, actionsErrors;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            watchActions = watch.watch && watch.watch.actions;
            watchData = watchActions ? createActionsForWatch(watch) : watch;

            if (!(watchData.type === _constants.WATCH_TYPES.JSON)) {
              _context2.next = 7;
              break;
            }

            actionsErrors = watchData.actions.reduce(function (actionsErrorsAcc, action) {
              if (action.validate) {
                var _ref2;

                var errors = action.validate();
                var errorKeys = Object.keys(errors);
                var hasErrors = !!errorKeys.find(function (errorKey) {
                  return errors[errorKey].length >= 1;
                });

                if (!hasErrors) {
                  return actionsErrorsAcc;
                }

                var newErrors = errorKeys.map(function (errorKey) {
                  return errors[errorKey];
                });
                var newErrorsFlattened = newErrors && newErrors.length ? (_ref2 = []).concat.apply(_ref2, _toConsumableArray(newErrors)) : [];
                return [].concat(_toConsumableArray(actionsErrorsAcc), _toConsumableArray(newErrorsFlattened));
              }

              return actionsErrorsAcc;
            }, []);

            if (!(actionsErrors.length > 0)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", {
              error: {
                data: {
                  message: actionsErrors,
                  error: 'validation'
                }
              }
            });

          case 6:
            return _context2.abrupt("return", saveWatch(watchData, toasts));

          case 7:
            return _context2.abrupt("return", saveWatch(watchData, toasts));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _onWatchSave.apply(this, arguments);
}