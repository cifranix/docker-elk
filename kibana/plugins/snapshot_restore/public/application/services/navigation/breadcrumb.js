"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.breadcrumbService = void 0;

var _text = require("../text");

var _ = require("./");

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
      management: [],
      home: [],
      snapshots: [],
      repositories: [],
      policies: [],
      restore_status: [],
      repositoryAdd: [],
      repositoryEdit: [],
      restoreSnapshot: [],
      policyAdd: [],
      policyEdit: []
    });

    _defineProperty(this, "setBreadcrumbsHandler", void 0);
  }

  _createClass(BreadcrumbService, [{
    key: "setup",
    value: function setup(setBreadcrumbsHandler) {
      this.setBreadcrumbsHandler = setBreadcrumbsHandler; // Home and sections

      this.breadcrumbs.home = [{
        text: _text.textService.breadcrumbs.home,
        href: (0, _.linkToHome)()
      }];
      this.breadcrumbs.snapshots = [].concat(_toConsumableArray(this.breadcrumbs.home), [{
        text: _text.textService.breadcrumbs.snapshots,
        href: (0, _.linkToSnapshots)()
      }]);
      this.breadcrumbs.repositories = [].concat(_toConsumableArray(this.breadcrumbs.home), [{
        text: _text.textService.breadcrumbs.repositories,
        href: (0, _.linkToRepositories)()
      }]);
      this.breadcrumbs.policies = [].concat(_toConsumableArray(this.breadcrumbs.home), [{
        text: _text.textService.breadcrumbs.policies,
        href: (0, _.linkToPolicies)()
      }]);
      this.breadcrumbs.restore_status = [].concat(_toConsumableArray(this.breadcrumbs.home), [{
        text: _text.textService.breadcrumbs.restore_status,
        href: (0, _.linkToRestoreStatus)()
      }]); // Inner pages

      this.breadcrumbs.repositoryAdd = [].concat(_toConsumableArray(this.breadcrumbs.repositories), [{
        text: _text.textService.breadcrumbs.repositoryAdd
      }]);
      this.breadcrumbs.repositoryEdit = [].concat(_toConsumableArray(this.breadcrumbs.repositories), [{
        text: _text.textService.breadcrumbs.repositoryEdit
      }]);
      this.breadcrumbs.restoreSnapshot = [].concat(_toConsumableArray(this.breadcrumbs.snapshots), [{
        text: _text.textService.breadcrumbs.restoreSnapshot
      }]);
      this.breadcrumbs.policyAdd = [].concat(_toConsumableArray(this.breadcrumbs.policies), [{
        text: _text.textService.breadcrumbs.policyAdd
      }]);
      this.breadcrumbs.policyEdit = [].concat(_toConsumableArray(this.breadcrumbs.policies), [{
        text: _text.textService.breadcrumbs.policyEdit
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