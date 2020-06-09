"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filters = void 0;

var _http_service = require("../http_service");

var _index = require("./index");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var filters = {
  filters: function filters(obj) {
    var filterId = obj && obj.filterId ? "/".concat(obj.filterId) : '';
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/filters").concat(filterId),
      method: 'GET'
    });
  },
  filtersStats: function filtersStats() {
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/filters/_stats"),
      method: 'GET'
    });
  },
  addFilter: function addFilter(filterId, description, items) {
    var body = JSON.stringify({
      filterId: filterId,
      description: description,
      items: items
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/filters"),
      method: 'PUT',
      body: body
    });
  },
  updateFilter: function updateFilter(filterId, description, addItems, removeItems) {
    var body = JSON.stringify(_objectSpread({}, description !== undefined ? {
      description: description
    } : {}, {}, addItems !== undefined ? {
      addItems: addItems
    } : {}, {}, removeItems !== undefined ? {
      removeItems: removeItems
    } : {}));
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/filters/").concat(filterId),
      method: 'PUT',
      body: body
    });
  },
  deleteFilter: function deleteFilter(filterId) {
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/filters/").concat(filterId),
      method: 'DELETE'
    });
  }
};
exports.filters = filters;