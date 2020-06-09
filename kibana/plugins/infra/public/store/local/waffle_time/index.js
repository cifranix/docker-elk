"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  waffleTimeActions: true,
  waffleTimeSelectors: true
};
exports.waffleTimeSelectors = exports.waffleTimeActions = void 0;

var waffleTimeActions = _interopRequireWildcard(require("./actions"));

exports.waffleTimeActions = waffleTimeActions;

var waffleTimeSelectors = _interopRequireWildcard(require("./selectors"));

exports.waffleTimeSelectors = waffleTimeSelectors;

var _epic = require("./epic");

Object.keys(_epic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _epic[key];
    }
  });
});

var _reducer = require("./reducer");

Object.keys(_reducer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reducer[key];
    }
  });
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }