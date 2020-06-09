"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileUploadPlugin = void 0;

var _json_upload_and_parse = require("./components/json_upload_and_parse");

var _kibana_services = require("./kibana_services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FileUploadPlugin =
/*#__PURE__*/
function () {
  function FileUploadPlugin() {
    _classCallCheck(this, FileUploadPlugin);
  }

  _createClass(FileUploadPlugin, [{
    key: "setup",
    value: function setup(core, plugins) {
      (0, _kibana_services.setupInitServicesAndConstants)(core);
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      (0, _kibana_services.startInitServicesAndConstants)(core, plugins);
      return {
        JsonUploadAndParse: _json_upload_and_parse.JsonUploadAndParse
      };
    }
  }]);

  return FileUploadPlugin;
}();

exports.FileUploadPlugin = FileUploadPlugin;