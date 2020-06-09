"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.documentationService = void 0;

var _constants = require("../components/mappings_editor/constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DocumentationService =
/*#__PURE__*/
function () {
  function DocumentationService() {
    var _this = this;

    _classCallCheck(this, DocumentationService);

    _defineProperty(this, "esDocsBase", '');

    _defineProperty(this, "kibanaDocsBase", '');

    _defineProperty(this, "getTypeDocLink", function (type) {
      var docType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'main';
      var typeDefinition = _constants.TYPE_DEFINITION[type];

      if (!typeDefinition || !typeDefinition.documentation || !typeDefinition.documentation[docType]) {
        return undefined;
      }

      return "".concat(_this.esDocsBase).concat(typeDefinition.documentation[docType]);
    });
  }

  _createClass(DocumentationService, [{
    key: "setup",
    value: function setup(docLinks) {
      var DOC_LINK_VERSION = docLinks.DOC_LINK_VERSION,
          ELASTIC_WEBSITE_URL = docLinks.ELASTIC_WEBSITE_URL;
      var docsBase = "".concat(ELASTIC_WEBSITE_URL, "guide/en");
      this.esDocsBase = "".concat(docsBase, "/elasticsearch/reference/").concat(DOC_LINK_VERSION);
      this.kibanaDocsBase = "".concat(docsBase, "/kibana/").concat(DOC_LINK_VERSION);
    }
  }, {
    key: "getSettingsDocumentationLink",
    value: function getSettingsDocumentationLink() {
      return "".concat(this.esDocsBase, "/index-modules.html#index-modules-settings");
    }
  }, {
    key: "getMappingDocumentationLink",
    value: function getMappingDocumentationLink() {
      return "".concat(this.esDocsBase, "/mapping.html");
    }
  }, {
    key: "getRoutingLink",
    value: function getRoutingLink() {
      return "".concat(this.esDocsBase, "/mapping-routing-field.html");
    }
  }, {
    key: "getTemplatesDocumentationLink",
    value: function getTemplatesDocumentationLink() {
      return "".concat(this.esDocsBase, "/indices-templates.html");
    }
  }, {
    key: "getIdxMgmtDocumentationLink",
    value: function getIdxMgmtDocumentationLink() {
      return "".concat(this.kibanaDocsBase, "/managing-indices.html");
    }
  }, {
    key: "getMappingTypesLink",
    value: function getMappingTypesLink() {
      return "".concat(this.esDocsBase, "/mapping-types.html");
    }
  }, {
    key: "getDynamicMappingLink",
    value: function getDynamicMappingLink() {
      return "".concat(this.esDocsBase, "/dynamic-field-mapping.html");
    }
  }, {
    key: "getPercolatorQueryLink",
    value: function getPercolatorQueryLink() {
      return "".concat(this.esDocsBase, "/query-dsl-percolate-query.html");
    }
  }, {
    key: "getRankFeatureQueryLink",
    value: function getRankFeatureQueryLink() {
      return "".concat(this.esDocsBase, "/rank-feature.html");
    }
  }, {
    key: "getMetaFieldLink",
    value: function getMetaFieldLink() {
      return "".concat(this.esDocsBase, "/mapping-meta-field.html");
    }
  }, {
    key: "getDynamicTemplatesLink",
    value: function getDynamicTemplatesLink() {
      return "".concat(this.esDocsBase, "/dynamic-templates.html");
    }
  }, {
    key: "getMappingSourceFieldLink",
    value: function getMappingSourceFieldLink() {
      return "".concat(this.esDocsBase, "/mapping-source-field.html");
    }
  }, {
    key: "getDisablingMappingSourceFieldLink",
    value: function getDisablingMappingSourceFieldLink() {
      return "".concat(this.esDocsBase, "/mapping-source-field.html#disable-source-field");
    }
  }, {
    key: "getNullValueLink",
    value: function getNullValueLink() {
      return "".concat(this.esDocsBase, "/null-value.html");
    }
  }, {
    key: "getTermVectorLink",
    value: function getTermVectorLink() {
      return "".concat(this.esDocsBase, "/term-vector.html");
    }
  }, {
    key: "getStoreLink",
    value: function getStoreLink() {
      return "".concat(this.esDocsBase, "/mapping-store.html");
    }
  }, {
    key: "getSimilarityLink",
    value: function getSimilarityLink() {
      return "".concat(this.esDocsBase, "/similarity.html");
    }
  }, {
    key: "getNormsLink",
    value: function getNormsLink() {
      return "".concat(this.esDocsBase, "/norms.html");
    }
  }, {
    key: "getIndexLink",
    value: function getIndexLink() {
      return "".concat(this.esDocsBase, "/mapping-index.html");
    }
  }, {
    key: "getIgnoreMalformedLink",
    value: function getIgnoreMalformedLink() {
      return "".concat(this.esDocsBase, "/ignore-malformed.html");
    }
  }, {
    key: "getFormatLink",
    value: function getFormatLink() {
      return "".concat(this.esDocsBase, "/mapping-date-format.html");
    }
  }, {
    key: "getEagerGlobalOrdinalsLink",
    value: function getEagerGlobalOrdinalsLink() {
      return "".concat(this.esDocsBase, "/eager-global-ordinals.html");
    }
  }, {
    key: "getDocValuesLink",
    value: function getDocValuesLink() {
      return "".concat(this.esDocsBase, "/doc-values.html");
    }
  }, {
    key: "getCopyToLink",
    value: function getCopyToLink() {
      return "".concat(this.esDocsBase, "/copy-to.html");
    }
  }, {
    key: "getCoerceLink",
    value: function getCoerceLink() {
      return "".concat(this.esDocsBase, "/coerce.html");
    }
  }, {
    key: "getBoostLink",
    value: function getBoostLink() {
      return "".concat(this.esDocsBase, "/mapping-boost.html");
    }
  }, {
    key: "getNormalizerLink",
    value: function getNormalizerLink() {
      return "".concat(this.esDocsBase, "/normalizer.html");
    }
  }, {
    key: "getIgnoreAboveLink",
    value: function getIgnoreAboveLink() {
      return "".concat(this.esDocsBase, "/ignore-above.html");
    }
  }, {
    key: "getFielddataLink",
    value: function getFielddataLink() {
      return "".concat(this.esDocsBase, "/fielddata.html");
    }
  }, {
    key: "getFielddataFrequencyLink",
    value: function getFielddataFrequencyLink() {
      return "".concat(this.esDocsBase, "/fielddata.html#field-data-filtering");
    }
  }, {
    key: "getEnablingFielddataLink",
    value: function getEnablingFielddataLink() {
      return "".concat(this.esDocsBase, "/fielddata.html#before-enabling-fielddata");
    }
  }, {
    key: "getIndexPhrasesLink",
    value: function getIndexPhrasesLink() {
      return "".concat(this.esDocsBase, "/index-phrases.html");
    }
  }, {
    key: "getIndexPrefixesLink",
    value: function getIndexPrefixesLink() {
      return "".concat(this.esDocsBase, "/index-prefixes.html");
    }
  }, {
    key: "getPositionIncrementGapLink",
    value: function getPositionIncrementGapLink() {
      return "".concat(this.esDocsBase, "/position-increment-gap.html");
    }
  }, {
    key: "getAnalyzerLink",
    value: function getAnalyzerLink() {
      return "".concat(this.esDocsBase, "/analyzer.html");
    }
  }, {
    key: "getDateFormatLink",
    value: function getDateFormatLink() {
      return "".concat(this.esDocsBase, "/mapping-date-format.html");
    }
  }, {
    key: "getIndexOptionsLink",
    value: function getIndexOptionsLink() {
      return "".concat(this.esDocsBase, "/index-options.html");
    }
  }, {
    key: "getAlternativeToMappingTypesLink",
    value: function getAlternativeToMappingTypesLink() {
      return "".concat(this.esDocsBase, "/removal-of-types.html#_alternatives_to_mapping_types");
    }
  }, {
    key: "getJoinMultiLevelsPerformanceLink",
    value: function getJoinMultiLevelsPerformanceLink() {
      return "".concat(this.esDocsBase, "/parent-join.html#_parent_join_and_performance");
    }
  }, {
    key: "getDynamicLink",
    value: function getDynamicLink() {
      return "".concat(this.esDocsBase, "/dynamic.html");
    }
  }, {
    key: "getEnabledLink",
    value: function getEnabledLink() {
      return "".concat(this.esDocsBase, "/enabled.html");
    }
  }, {
    key: "getWellKnownTextLink",
    value: function getWellKnownTextLink() {
      return 'http://docs.opengeospatial.org/is/12-063r5/12-063r5.html';
    }
  }, {
    key: "getRootLocaleLink",
    value: function getRootLocaleLink() {
      return 'https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#ROOT';
    }
  }]);

  return DocumentationService;
}();

var documentationService = new DocumentationService();
exports.documentationService = documentationService;