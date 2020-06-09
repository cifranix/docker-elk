"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alertReducer = void 0;

var _lodash = require("lodash");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var alertReducer = function alertReducer(state, action) {
  var command = action.command,
      payload = action.payload;
  var alert = state.alert;

  switch (command.type) {
    case 'setAlert':
      {
        var key = payload.key,
            value = payload.value;

        if (key === 'alert') {
          return _objectSpread({}, state, {
            alert: value
          });
        } else {
          return state;
        }
      }

    case 'setProperty':
      {
        var _key = payload.key,
            _value = payload.value;

        if ((0, _lodash.isEqual)(alert[_key], _value)) {
          return state;
        } else {
          return _objectSpread({}, state, {
            alert: _objectSpread({}, alert, _defineProperty({}, _key, _value))
          });
        }
      }

    case 'setScheduleProperty':
      {
        var _key2 = payload.key,
            _value2 = payload.value;

        if ((0, _lodash.isEqual)(alert.schedule[_key2], _value2)) {
          return state;
        } else {
          return _objectSpread({}, state, {
            alert: _objectSpread({}, alert, {
              schedule: _objectSpread({}, alert.schedule, _defineProperty({}, _key2, _value2))
            })
          });
        }
      }

    case 'setAlertParams':
      {
        var _key3 = payload.key,
            _value3 = payload.value;

        if ((0, _lodash.isEqual)(alert.params[_key3], _value3)) {
          return state;
        } else {
          return _objectSpread({}, state, {
            alert: _objectSpread({}, alert, {
              params: _objectSpread({}, alert.params, _defineProperty({}, _key3, _value3))
            })
          });
        }
      }

    case 'setAlertActionParams':
      {
        var _key4 = payload.key,
            _value4 = payload.value,
            index = payload.index;

        if (index === undefined || (0, _lodash.isEqual)(alert.actions[index][_key4], _value4)) {
          return state;
        } else {
          var oldAction = alert.actions.splice(index, 1)[0];

          var updatedAction = _objectSpread({}, oldAction, {
            params: _objectSpread({}, oldAction.params, _defineProperty({}, _key4, _value4))
          });

          alert.actions.splice(index, 0, updatedAction);
          return _objectSpread({}, state, {
            alert: _objectSpread({}, alert, {
              actions: _toConsumableArray(alert.actions)
            })
          });
        }
      }

    case 'setAlertActionProperty':
      {
        var _key5 = payload.key,
            _value5 = payload.value,
            _index = payload.index;

        if (_index === undefined || (0, _lodash.isEqual)(alert.actions[_index][_key5], _value5)) {
          return state;
        } else {
          var _oldAction = alert.actions.splice(_index, 1)[0];

          var _updatedAction = _objectSpread({}, _oldAction, _defineProperty({}, _key5, _value5));

          alert.actions.splice(_index, 0, _updatedAction);
          return _objectSpread({}, state, {
            alert: _objectSpread({}, alert, {
              actions: _toConsumableArray(alert.actions)
            })
          });
        }
      }
  }
};

exports.alertReducer = alertReducer;