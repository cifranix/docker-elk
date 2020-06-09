"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageService = void 0;

var _monaco = require("@kbn/ui-shared-deps/monaco");

var _workerMain = _interopRequireDefault(require("raw-loader!monaco-editor/min/vs/base/worker/workerMain.js"));

var _lib = require("../lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LANGUAGE_ID = 'painless'; // Safely check whether these globals are present

var CAN_CREATE_WORKER = typeof Blob === 'function' && typeof Worker === 'function';

var LanguageService =
/*#__PURE__*/
function () {
  function LanguageService() {
    _classCallCheck(this, LanguageService);

    _defineProperty(this, "originalMonacoEnvironment", void 0);
  }

  _createClass(LanguageService, [{
    key: "setup",
    value: function setup() {
      _monaco.monaco.languages.register({
        id: LANGUAGE_ID
      });

      _monaco.monaco.languages.setMonarchTokensProvider(LANGUAGE_ID, _lib.monacoPainlessLang);

      if (CAN_CREATE_WORKER) {
        this.originalMonacoEnvironment = window.MonacoEnvironment;
        window.MonacoEnvironment = {
          getWorker: function getWorker() {
            var blob = new Blob([_workerMain.default], {
              type: 'application/javascript'
            });
            return new Worker(window.URL.createObjectURL(blob));
          }
        };
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (CAN_CREATE_WORKER) {
        window.MonacoEnvironment = this.originalMonacoEnvironment;
      }
    }
  }]);

  return LanguageService;
}();

exports.LanguageService = LanguageService;