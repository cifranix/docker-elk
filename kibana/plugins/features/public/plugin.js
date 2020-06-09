"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeaturesPlugin = void 0;

var _features_api_client = require("./features_api_client");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FeaturesPlugin =
/*#__PURE__*/
function () {
  function FeaturesPlugin() {
    _classCallCheck(this, FeaturesPlugin);

    _defineProperty(this, "apiClient", void 0);
  }

  _createClass(FeaturesPlugin, [{
    key: "setup",
    value: function setup(core) {
      this.apiClient = new _features_api_client.FeaturesAPIClient(core.http);
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      return {
        getFeatures: function getFeatures() {
          return _this.apiClient.getFeatures();
        }
      };
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return FeaturesPlugin;
}();

exports.FeaturesPlugin = FeaturesPlugin;