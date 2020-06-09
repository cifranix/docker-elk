"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportingAPIClient = void 0;

var _queryString = require("query-string");

var _risonNode = _interopRequireDefault(require("rison-node"));

var _job_completion_notifications = require("./job_completion_notifications");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ReportingAPIClient =
/*#__PURE__*/
function () {
  function ReportingAPIClient(http) {
    var _this = this;

    _classCallCheck(this, ReportingAPIClient);

    _defineProperty(this, "http", void 0);

    _defineProperty(this, "list", function () {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var jobIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var query = {
        page: page
      };

      if (jobIds.length > 0) {
        // Only getting the first 10, to prevent URL overflows
        query.ids = jobIds.slice(0, 10).join(',');
      }

      return _this.http.get("".concat(_constants.API_LIST_URL, "/list"), {
        query: query,
        asSystemRequest: true
      });
    });

    _defineProperty(this, "findForJobIds", function (jobIds) {
      return _this.http.fetch("".concat(_constants.API_LIST_URL, "/list"), {
        query: {
          page: 0,
          ids: jobIds.join(',')
        },
        method: 'GET'
      });
    });

    _defineProperty(this, "getReportingJobPath", function (exportType, jobParams) {
      var params = (0, _queryString.stringify)({
        jobParams: _risonNode.default.encode(jobParams)
      });
      return "".concat(_this.http.basePath.prepend(_constants.API_BASE_GENERATE), "/").concat(exportType, "?").concat(params);
    });

    _defineProperty(this, "createReportingJob",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(exportType, jobParams) {
        var jobParamsRison, resp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                jobParamsRison = _risonNode.default.encode(jobParams);
                _context.next = 3;
                return _this.http.post("".concat(_constants.API_BASE_GENERATE, "/").concat(exportType), {
                  method: 'POST',
                  body: JSON.stringify({
                    jobParams: jobParamsRison
                  })
                });

              case 3:
                resp = _context.sent;
                (0, _job_completion_notifications.add)(resp.job.id);
                return _context.abrupt("return", resp);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(this, "getManagementLink", function () {
      return _this.http.basePath.prepend(_constants.REPORTING_MANAGEMENT_HOME);
    });

    _defineProperty(this, "getDownloadLink", function (jobId) {
      return _this.http.basePath.prepend("".concat(_constants.API_LIST_URL, "/download/").concat(jobId));
    });

    _defineProperty(this, "getServerBasePath", function () {
      return _this.http.basePath.serverBasePath;
    });

    this.http = http;
  }

  _createClass(ReportingAPIClient, [{
    key: "getReportURL",
    value: function getReportURL(jobId) {
      var apiBaseUrl = this.http.basePath.prepend(_constants.API_LIST_URL);
      var downloadLink = "".concat(apiBaseUrl, "/download/").concat(jobId);
      return downloadLink;
    }
  }, {
    key: "downloadReport",
    value: function downloadReport(jobId) {
      var location = this.getReportURL(jobId);
      window.open(location);
    }
  }, {
    key: "deleteReport",
    value: function () {
      var _deleteReport = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(jobId) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.http.delete("".concat(_constants.API_LIST_URL, "/delete/").concat(jobId), {
                  asSystemRequest: true
                });

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function deleteReport(_x3) {
        return _deleteReport.apply(this, arguments);
      }

      return deleteReport;
    }()
  }, {
    key: "total",
    value: function total() {
      return this.http.get("".concat(_constants.API_LIST_URL, "/count"), {
        asSystemRequest: true
      });
    }
  }, {
    key: "getContent",
    value: function getContent(jobId) {
      return this.http.get("".concat(_constants.API_LIST_URL, "/output/").concat(jobId), {
        asSystemRequest: true
      });
    }
  }, {
    key: "getInfo",
    value: function getInfo(jobId) {
      return this.http.get("".concat(_constants.API_LIST_URL, "/info/").concat(jobId), {
        asSystemRequest: true
      });
    }
  }]);

  return ReportingAPIClient;
}();

exports.ReportingAPIClient = ReportingAPIClient;