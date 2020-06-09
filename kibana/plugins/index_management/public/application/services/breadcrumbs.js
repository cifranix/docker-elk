"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.breadcrumbService = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("../../../common/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BreadcrumbService =
/*#__PURE__*/
function () {
  function BreadcrumbService() {
    _classCallCheck(this, BreadcrumbService);

    _defineProperty(this, "breadcrumbs", {
      home: []
    });

    _defineProperty(this, "setBreadcrumbsHandler", void 0);
  }

  _createClass(BreadcrumbService, [{
    key: "setup",
    value: function setup(setBreadcrumbsHandler) {
      this.setBreadcrumbsHandler = setBreadcrumbsHandler;
      this.breadcrumbs.home = [{
        text: _i18n.i18n.translate('xpack.idxMgmt.breadcrumb.homeLabel', {
          defaultMessage: 'Index Management'
        }),
        href: "#".concat(_constants.BASE_PATH)
      }];
      this.breadcrumbs.templates = [].concat(_toConsumableArray(this.breadcrumbs.home), [{
        text: _i18n.i18n.translate('xpack.idxMgmt.breadcrumb.templatesLabel', {
          defaultMessage: 'Templates'
        }),
        href: "#".concat(_constants.BASE_PATH, "templates")
      }]);
      this.breadcrumbs.templateCreate = [].concat(_toConsumableArray(this.breadcrumbs.templates), [{
        text: _i18n.i18n.translate('xpack.idxMgmt.breadcrumb.createTemplateLabel', {
          defaultMessage: 'Create template'
        })
      }]);
      this.breadcrumbs.templateEdit = [].concat(_toConsumableArray(this.breadcrumbs.templates), [{
        text: _i18n.i18n.translate('xpack.idxMgmt.breadcrumb.editTemplateLabel', {
          defaultMessage: 'Edit template'
        })
      }]);
      this.breadcrumbs.templateClone = [].concat(_toConsumableArray(this.breadcrumbs.templates), [{
        text: _i18n.i18n.translate('xpack.idxMgmt.breadcrumb.cloneTemplateLabel', {
          defaultMessage: 'Clone template'
        })
      }]);
    }
  }, {
    key: "setBreadcrumbs",
    value: function setBreadcrumbs(type) {
      if (!this.setBreadcrumbsHandler) {
        throw new Error("BreadcrumbService#setup() must be called first!");
      }

      var newBreadcrumbs = this.breadcrumbs[type] ? _toConsumableArray(this.breadcrumbs[type]) : _toConsumableArray(this.breadcrumbs.home); // Pop off last breadcrumb

      var lastBreadcrumb = newBreadcrumbs.pop(); // Put last breadcrumb back without href

      newBreadcrumbs.push(_objectSpread({}, lastBreadcrumb, {
        href: undefined
      }));
      this.setBreadcrumbsHandler(newBreadcrumbs);
    }
  }]);

  return BreadcrumbService;
}();

var breadcrumbService = new BreadcrumbService();
exports.breadcrumbService = breadcrumbService;