"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.documentationLinksService = void 0;

var _constants = require("../../../../common/constants");

var _constants2 = require("../../constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DocumentationLinksService =
/*#__PURE__*/
function () {
  function DocumentationLinksService() {
    _classCallCheck(this, DocumentationLinksService);

    _defineProperty(this, "esDocBasePath", '');

    _defineProperty(this, "esPluginDocBasePath", '');
  }

  _createClass(DocumentationLinksService, [{
    key: "setup",
    value: function setup(docLinks) {
      var DOC_LINK_VERSION = docLinks.DOC_LINK_VERSION,
          ELASTIC_WEBSITE_URL = docLinks.ELASTIC_WEBSITE_URL;
      var docsBase = "".concat(ELASTIC_WEBSITE_URL, "guide/en");
      this.esDocBasePath = "".concat(docsBase, "/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/");
      this.esPluginDocBasePath = "".concat(docsBase, "/elasticsearch/plugins/").concat(DOC_LINK_VERSION, "/");
    }
  }, {
    key: "getRepositoryPluginDocUrl",
    value: function getRepositoryPluginDocUrl() {
      return "".concat(this.esPluginDocBasePath).concat(_constants2.REPOSITORY_DOC_PATHS.plugins);
    }
  }, {
    key: "getRepositoryTypeDocUrl",
    value: function getRepositoryTypeDocUrl(type) {
      switch (type) {
        case _constants.REPOSITORY_TYPES.fs:
          return "".concat(this.esDocBasePath).concat(_constants2.REPOSITORY_DOC_PATHS.fs);

        case _constants.REPOSITORY_TYPES.url:
          return "".concat(this.esDocBasePath).concat(_constants2.REPOSITORY_DOC_PATHS.url);

        case _constants.REPOSITORY_TYPES.source:
          return "".concat(this.esDocBasePath).concat(_constants2.REPOSITORY_DOC_PATHS.source);

        case _constants.REPOSITORY_TYPES.s3:
          return "".concat(this.esPluginDocBasePath).concat(_constants2.REPOSITORY_DOC_PATHS.s3);

        case _constants.REPOSITORY_TYPES.hdfs:
          return "".concat(this.esPluginDocBasePath).concat(_constants2.REPOSITORY_DOC_PATHS.hdfs);

        case _constants.REPOSITORY_TYPES.azure:
          return "".concat(this.esPluginDocBasePath).concat(_constants2.REPOSITORY_DOC_PATHS.azure);

        case _constants.REPOSITORY_TYPES.gcs:
          return "".concat(this.esPluginDocBasePath).concat(_constants2.REPOSITORY_DOC_PATHS.gcs);

        default:
          return "".concat(this.esDocBasePath).concat(_constants2.REPOSITORY_DOC_PATHS.default);
      }
    }
  }, {
    key: "getSnapshotDocUrl",
    value: function getSnapshotDocUrl() {
      return "".concat(this.esDocBasePath, "snapshots-take-snapshot.html");
    }
  }, {
    key: "getRestoreDocUrl",
    value: function getRestoreDocUrl() {
      return "".concat(this.esDocBasePath, "snapshots-restore-snapshot.html");
    }
  }, {
    key: "getRestoreIndexSettingsUrl",
    value: function getRestoreIndexSettingsUrl() {
      return "".concat(this.esDocBasePath, "snapshots-restore-snapshot.html#_changing_index_settings_during_restore");
    }
  }, {
    key: "getIndexSettingsUrl",
    value: function getIndexSettingsUrl() {
      return "".concat(this.esDocBasePath, "index-modules.html");
    }
  }, {
    key: "getDateMathIndexNamesUrl",
    value: function getDateMathIndexNamesUrl() {
      return "".concat(this.esDocBasePath, "date-math-index-names.html");
    }
  }, {
    key: "getSlmUrl",
    value: function getSlmUrl() {
      return "".concat(this.esDocBasePath, "slm-api-put.html");
    }
  }, {
    key: "getCronUrl",
    value: function getCronUrl() {
      return "".concat(this.esDocBasePath, "trigger-schedule.html#schedule-cron");
    }
  }]);

  return DocumentationLinksService;
}();

var documentationLinksService = new DocumentationLinksService();
exports.documentationLinksService = documentationLinksService;