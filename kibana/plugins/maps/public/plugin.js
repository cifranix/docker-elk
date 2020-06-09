"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapsPlugin = void 0;

var _map_view = require("./inspector/views/map_view");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @internal */
var MapsPlugin =
/*#__PURE__*/
function () {
  function MapsPlugin() {
    _classCallCheck(this, MapsPlugin);
  }

  _createClass(MapsPlugin, [{
    key: "setup",
    value: function setup(core, plugins) {
      plugins.inspector.registerView(_map_view.MapView);
    }
  }, {
    key: "start",
    value: function start(core, plugins) {}
  }]);

  return MapsPlugin;
}();

exports.MapsPlugin = MapsPlugin;