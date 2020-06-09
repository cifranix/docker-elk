"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.docTitleService = void 0;

var _text = require("../text");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DocTitleService =
/*#__PURE__*/
function () {
  function DocTitleService() {
    _classCallCheck(this, DocTitleService);

    _defineProperty(this, "changeDocTitleHandler", function () {});
  }

  _createClass(DocTitleService, [{
    key: "setup",
    value: function setup(_changeDocTitleHandler) {
      this.changeDocTitleHandler = _changeDocTitleHandler;
    }
  }, {
    key: "setTitle",
    value: function setTitle(page) {
      if (!page || page === 'home') {
        this.changeDocTitleHandler("".concat(_text.textService.breadcrumbs.home));
      } else if (_text.textService.breadcrumbs[page]) {
        this.changeDocTitleHandler("".concat(_text.textService.breadcrumbs[page], " - ").concat(_text.textService.breadcrumbs.home));
      }
    }
  }]);

  return DocTitleService;
}();

var docTitleService = new DocTitleService();
exports.docTitleService = docTitleService;