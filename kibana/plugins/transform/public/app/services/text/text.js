"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textService = void 0;

var _i18n = require("@kbn/i18n");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TextService =
/*#__PURE__*/
function () {
  function TextService() {
    _classCallCheck(this, TextService);

    _defineProperty(this, "breadcrumbs", {});
  }

  _createClass(TextService, [{
    key: "init",
    value: function init() {
      this.breadcrumbs = {
        home: _i18n.i18n.translate('xpack.transform.home.breadcrumbTitle', {
          defaultMessage: 'Transforms'
        }),
        cloneTransform: _i18n.i18n.translate('xpack.transform.cloneTransform.breadcrumbTitle', {
          defaultMessage: 'Clone transform'
        }),
        createTransform: _i18n.i18n.translate('xpack.transform.createTransform.breadcrumbTitle', {
          defaultMessage: 'Create transform'
        })
      };
    }
  }, {
    key: "getSizeNotationHelpText",
    value: function getSizeNotationHelpText() {
      return _i18n.i18n.translate('xpack.transform.transformForm.sizeNotationPlaceholder', {
        defaultMessage: 'Examples: {example1}, {example2}, {example3}, {example4}',
        values: {
          example1: '1g',
          example2: '10mb',
          example3: '5k',
          example4: '1024B'
        }
      });
    }
  }]);

  return TextService;
}();

var textService = new TextService();
exports.textService = textService;