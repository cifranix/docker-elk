"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrilldownsPlugin = void 0;

var _service = require("./service");

var _actions = require("./actions");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DrilldownsPlugin =
/*#__PURE__*/
function () {
  function DrilldownsPlugin() {
    _classCallCheck(this, DrilldownsPlugin);

    _defineProperty(this, "service", new _service.DrilldownService());
  }

  _createClass(DrilldownsPlugin, [{
    key: "setup",
    value: function setup(core, plugins) {
      this.service.bootstrap(core, plugins);
      return this.service;
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      return {};
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return DrilldownsPlugin;
}();

exports.DrilldownsPlugin = DrilldownsPlugin;