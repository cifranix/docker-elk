"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEstimateBucketSpan = useEstimateBucketSpan;
exports.ESTIMATE_STATUS = void 0;

var _react = require("react");

var _job_creator_context = require("../../../job_creator_context");

var _fields = require("../../../../../../../../../common/types/fields");

var _job_creator = require("../../../../../common/job_creator");

var _ml_api_service = require("../../../../../../../services/ml_api_service");

var _ml = require("../../../../../../../contexts/ml");

var _messagebar = require("../../../../../../../components/messagebar");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ESTIMATE_STATUS;
exports.ESTIMATE_STATUS = ESTIMATE_STATUS;

(function (ESTIMATE_STATUS) {
  ESTIMATE_STATUS[ESTIMATE_STATUS["NOT_RUNNING"] = 0] = "NOT_RUNNING";
  ESTIMATE_STATUS[ESTIMATE_STATUS["RUNNING"] = 1] = "RUNNING";
})(ESTIMATE_STATUS || (exports.ESTIMATE_STATUS = ESTIMATE_STATUS = {}));

function useEstimateBucketSpan() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate;

  var mlContext = (0, _ml.useMlContext)();

  var _useState = (0, _react.useState)(ESTIMATE_STATUS.NOT_RUNNING),
      _useState2 = _slicedToArray(_useState, 2),
      status = _useState2[0],
      setStatus = _useState2[1];

  var data = {
    aggTypes: jobCreator.aggregations.map(function (a) {
      return a.dslName;
    }),
    duration: {
      start: jobCreator.start,
      end: jobCreator.end
    },
    fields: jobCreator.fields.map(function (f) {
      return f.id === _fields.EVENT_RATE_FIELD_ID ? null : f.id;
    }),
    index: mlContext.currentIndexPattern.title,
    query: mlContext.combinedQuery,
    splitField: undefined,
    timeField: mlContext.currentIndexPattern.timeFieldName
  };

  if (((0, _job_creator.isMultiMetricJobCreator)(jobCreator) || (0, _job_creator.isPopulationJobCreator)(jobCreator)) && jobCreator.splitField !== null) {
    data.splitField = jobCreator.splitField.id;
  } else if ((0, _job_creator.isAdvancedJobCreator)(jobCreator)) {
    jobCreator.richDetectors.some(function (d) {
      if (d.partitionField !== null) {
        data.splitField = d.partitionField.id;
        return true;
      }

      if (d.overField !== null) {
        data.splitField = d.overField.id;
        return true;
      }

      if (d.byField !== null) {
        data.splitField = d.byField.id;
        return true;
      }
    });
  }

  function estimateBucketSpan() {
    return _estimateBucketSpan.apply(this, arguments);
  }

  function _estimateBucketSpan() {
    _estimateBucketSpan = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _ref, name, error, message;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setStatus(ESTIMATE_STATUS.RUNNING);
              _context.next = 3;
              return _ml_api_service.ml.estimateBucketSpan(data);

            case 3:
              _ref = _context.sent;
              name = _ref.name;
              error = _ref.error;
              message = _ref.message;
              setStatus(ESTIMATE_STATUS.NOT_RUNNING);

              if (error === true) {
                _messagebar.mlMessageBarService.notify.error(message);
              } else {
                jobCreator.bucketSpan = name;
                jobCreatorUpdate();
              }

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _estimateBucketSpan.apply(this, arguments);
  }

  return {
    status: status,
    estimateBucketSpan: estimateBucketSpan
  };
}