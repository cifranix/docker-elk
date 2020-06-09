"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mlFieldFormatService = void 0;

var _job_utils = require("../../../common/util/job_utils");

var _index_utils = require("../util/index_utils");

var _job_service = require("./job_service");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Service for accessing FieldFormat objects configured for a Kibana index pattern
// for use in formatting the actual and typical values from anomalies.
var FieldFormatService =
/*#__PURE__*/
function () {
  function FieldFormatService() {
    _classCallCheck(this, FieldFormatService);

    _defineProperty(this, "indexPatternIdsByJob", {});

    _defineProperty(this, "formatsByJob", {});
  }

  _createClass(FieldFormatService, [{
    key: "populateFormats",
    // Populate the service with the FieldFormats for the list of jobs with the
    // specified IDs. List of Kibana index patterns is passed, with a title
    // attribute set in each pattern which will be compared to the index pattern
    // configured in the datafeed of each job.
    // Builds a map of Kibana FieldFormats (plugins/data/common/field_formats)
    // against detector index by job ID.
    value: function populateFormats(jobIds) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        // Populate a map of index pattern IDs against job ID, by finding the ID of the index
        // pattern with a title attribute which matches the index configured in the datafeed.
        // If a Kibana index pattern has not been created
        // for this index, then no custom field formatting will occur.
        jobIds.forEach(function (jobId) {
          var jobObj = _job_service.mlJobService.getJob(jobId);

          var datafeedIndices = jobObj.datafeed_config.indices;
          var id = (0, _index_utils.getIndexPatternIdFromName)(datafeedIndices.length ? datafeedIndices[0] : '');

          if (id !== null) {
            _this.indexPatternIdsByJob[jobId] = id;
          }
        });
        var promises = jobIds.map(function (jobId) {
          return Promise.all([_this.getFormatsForJob(jobId)]);
        });
        Promise.all(promises).then(function (fmtsByJobByDetector) {
          fmtsByJobByDetector.forEach(function (formatsByDetector, i) {
            _this.formatsByJob[jobIds[i]] = formatsByDetector[0];
          });
          resolve(_this.formatsByJob);
        }).catch(function (err) {
          reject({
            formats: {},
            err: err
          });
        });
      });
    } // Return the FieldFormat to use for formatting values from
    // the detector from the job with the specified ID.

  }, {
    key: "getFieldFormat",
    value: function getFieldFormat(jobId, detectorIndex) {
      if (this.formatsByJob.hasOwnProperty(jobId)) {
        return this.formatsByJob[jobId][detectorIndex];
      }
    } // Utility for returning the FieldFormat from a full populated Kibana index pattern object
    // containing the list of fields by name with their formats.

  }, {
    key: "getFieldFormatFromIndexPattern",
    value: function getFieldFormatFromIndexPattern(fullIndexPattern, fieldName, esAggName) {
      // Don't use the field formatter for distinct count detectors as
      // e.g. distinct_count(clientip) should be formatted as a count, not as an IP address.
      var fieldFormat;

      if (esAggName !== 'cardinality') {
        var fieldList = fullIndexPattern.fields;
        var field = fieldList.getByName(fieldName);

        if (field !== undefined) {
          fieldFormat = field.format;
        }
      }

      return fieldFormat;
    }
  }, {
    key: "getFormatsForJob",
    value: function getFormatsForJob(jobId) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var jobObj = _job_service.mlJobService.getJob(jobId);

        var detectors = jobObj.analysis_config.detectors || [];
        var formatsByDetector = [];
        var indexPatternId = _this2.indexPatternIdsByJob[jobId];

        if (indexPatternId !== undefined) {
          // Load the full index pattern configuration to obtain the formats of each field.
          (0, _index_utils.getIndexPatternById)(indexPatternId).then(function (indexPatternData) {
            // Store the FieldFormat for each job by detector_index.
            var fieldList = indexPatternData.fields;
            detectors.forEach(function (dtr) {
              var esAgg = (0, _job_utils.mlFunctionToESAggregation)(dtr.function); // distinct_count detectors should fall back to the default
              // formatter as the values are just counts.

              if (dtr.field_name !== undefined && esAgg !== 'cardinality') {
                var field = fieldList.getByName(dtr.field_name);

                if (field !== undefined) {
                  formatsByDetector[dtr.detector_index] = field.format;
                }
              }
            });
            resolve(formatsByDetector);
          }).catch(function (err) {
            reject(err);
          });
        } else {
          resolve(formatsByDetector);
        }
      });
    }
  }]);

  return FieldFormatService;
}();

var mlFieldFormatService = new FieldFormatService();
exports.mlFieldFormatService = mlFieldFormatService;