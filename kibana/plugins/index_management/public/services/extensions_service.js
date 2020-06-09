"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtensionsService = void 0;

var _i18n = require("@kbn/i18n");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExtensionsService =
/*#__PURE__*/
function () {
  function ExtensionsService() {
    _classCallCheck(this, ExtensionsService);

    _defineProperty(this, "_summaries", []);

    _defineProperty(this, "_actions", []);

    _defineProperty(this, "_banners", []);

    _defineProperty(this, "_filters", []);

    _defineProperty(this, "_badges", [{
      matchIndex: function matchIndex(index) {
        return index.isFrozen;
      },
      label: _i18n.i18n.translate('xpack.idxMgmt.frozenBadgeLabel', {
        defaultMessage: 'Frozen'
      }),
      filterExpression: 'isFrozen:true',
      color: 'primary'
    }]);

    _defineProperty(this, "_toggles", []);

    _defineProperty(this, "service", void 0);
  }

  _createClass(ExtensionsService, [{
    key: "setup",
    value: function setup() {
      this.service = {
        addAction: this.addAction.bind(this),
        addBadge: this.addBadge.bind(this),
        addBanner: this.addBanner.bind(this),
        addFilter: this.addFilter.bind(this),
        addSummary: this.addSummary.bind(this),
        addToggle: this.addToggle.bind(this)
      };
      return this.service;
    }
  }, {
    key: "addSummary",
    value: function addSummary(summary) {
      this._summaries.push(summary);
    }
  }, {
    key: "addAction",
    value: function addAction(action) {
      this._actions.push(action);
    }
  }, {
    key: "addBanner",
    value: function addBanner(banner) {
      this._banners.push(banner);
    }
  }, {
    key: "addFilter",
    value: function addFilter(filter) {
      this._filters.push(filter);
    }
  }, {
    key: "addBadge",
    value: function addBadge(badge) {
      this._badges.push(badge);
    }
  }, {
    key: "addToggle",
    value: function addToggle(toggle) {
      this._toggles.push(toggle);
    }
  }, {
    key: "summaries",
    get: function get() {
      return this._summaries;
    }
  }, {
    key: "actions",
    get: function get() {
      return this._actions;
    }
  }, {
    key: "banners",
    get: function get() {
      return this._banners;
    }
  }, {
    key: "filters",
    get: function get() {
      return this._filters;
    }
  }, {
    key: "badges",
    get: function get() {
      return this._badges;
    }
  }, {
    key: "toggles",
    get: function get() {
      return this._toggles;
    }
  }]);

  return ExtensionsService;
}();

exports.ExtensionsService = ExtensionsService;