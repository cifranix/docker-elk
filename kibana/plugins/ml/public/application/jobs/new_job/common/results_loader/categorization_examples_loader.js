"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategorizationExamplesLoader = void 0;

var _ml_api_service = require("../../../../services/ml_api_service");

var _categorization_job = require("../../../../../../common/constants/categorization_job");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CategorizationExamplesLoader =
/*#__PURE__*/
function () {
  function CategorizationExamplesLoader(jobCreator, indexPattern, query) {
    _classCallCheck(this, CategorizationExamplesLoader);

    _defineProperty(this, "_jobCreator", void 0);

    _defineProperty(this, "_indexPatternTitle", '');

    _defineProperty(this, "_timeFieldName", '');

    _defineProperty(this, "_query", {});

    this._jobCreator = jobCreator;
    this._indexPatternTitle = indexPattern.title;
    this._query = query;

    if (typeof indexPattern.timeFieldName === 'string') {
      this._timeFieldName = indexPattern.timeFieldName;
    }
  }

  _createClass(CategorizationExamplesLoader, [{
    key: "loadExamples",
    value: function () {
      var _loadExamples = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var analyzer, categorizationFieldName, resp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                analyzer = this._jobCreator.categorizationAnalyzer;
                categorizationFieldName = this._jobCreator.categorizationFieldName;

                if (!(categorizationFieldName === null)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", {
                  examples: [],
                  sampleSize: 0,
                  overallValidStatus: _categorization_job.CATEGORY_EXAMPLES_VALIDATION_STATUS.INVALID,
                  validationChecks: []
                });

              case 4:
                _context.next = 6;
                return _ml_api_service.ml.jobs.categorizationFieldExamples(this._indexPatternTitle, this._query, _categorization_job.NUMBER_OF_CATEGORY_EXAMPLES, categorizationFieldName, this._timeFieldName, this._jobCreator.start, this._jobCreator.end, analyzer);

              case 6:
                resp = _context.sent;
                return _context.abrupt("return", resp);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadExamples() {
        return _loadExamples.apply(this, arguments);
      }

      return loadExamples;
    }()
  }]);

  return CategorizationExamplesLoader;
}();

exports.CategorizationExamplesLoader = CategorizationExamplesLoader;