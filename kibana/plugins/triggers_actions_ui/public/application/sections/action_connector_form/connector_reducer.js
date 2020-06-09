"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectorReducer = void 0;

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connectorReducer = function connectorReducer(state, action) {
  var command = action.command,
      payload = action.payload;
  var connector = state.connector;

  switch (command.type) {
    case 'setConnector':
      {
        var key = payload.key,
            value = payload.value;

        if (key === 'connector') {
          return _objectSpread({}, state, {
            connector: value
          });
        } else {
          return state;
        }
      }

    case 'setProperty':
      {
        var _key = payload.key,
            _value = payload.value;

        if ((0, _lodash.isEqual)(connector[_key], _value)) {
          return state;
        } else {
          return _objectSpread({}, state, {
            connector: _objectSpread({}, connector, _defineProperty({}, _key, _value))
          });
        }
      }

    case 'setConfigProperty':
      {
        var _key2 = payload.key,
            _value2 = payload.value;

        if ((0, _lodash.isEqual)(connector.config[_key2], _value2)) {
          return state;
        } else {
          return _objectSpread({}, state, {
            connector: _objectSpread({}, connector, {
              config: _objectSpread({}, connector.config, _defineProperty({}, _key2, _value2))
            })
          });
        }
      }

    case 'setSecretsProperty':
      {
        var _key3 = payload.key,
            _value3 = payload.value;

        if ((0, _lodash.isEqual)(connector.secrets[_key3], _value3)) {
          return state;
        } else {
          return _objectSpread({}, state, {
            connector: _objectSpread({}, connector, {
              secrets: _objectSpread({}, connector.secrets, _defineProperty({}, _key3, _value3))
            })
          });
        }
      }
  }
};

exports.connectorReducer = connectorReducer;