"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopCategories = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _job_creator_context = require("../../../job_creator_context");

var _ml_api_service = require("../../../../../../../services/ml_api_service");

var _categorization_job = require("../../../../../../../../../common/constants/categorization_job");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TopCategories = function TopCategories() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      resultsLoader = _useContext.resultsLoader;

  var jobCreator = jc;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      tableRow = _useState2[0],
      setTableRow = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      totalCategories = _useState4[0],
      setTotalCategories = _useState4[1];

  function setResultsWrapper(results) {
    loadTopCats();
  }

  function loadTopCats() {
    return _loadTopCats.apply(this, arguments);
  }

  function _loadTopCats() {
    _loadTopCats = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var results;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _ml_api_service.ml.jobs.topCategories(jobCreator.jobId, _categorization_job.NUMBER_OF_CATEGORY_EXAMPLES);

            case 2:
              results = _context.sent;
              setTableRow(results.categories.map(function (c) {
                var _c$category$examples;

                return {
                  count: c.count,
                  example: ((_c$category$examples = c.category.examples) === null || _c$category$examples === void 0 ? void 0 : _c$category$examples.length) ? c.category.examples[0] : ''
                };
              }));
              setTotalCategories(results.total);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _loadTopCats.apply(this, arguments);
  }

  (0, _react.useEffect)(function () {
    // subscribe to result updates
    var resultsSubscription = resultsLoader.subscribeToResults(setResultsWrapper);
    return function () {
      resultsSubscription.unsubscribe();
    };
  }, []);
  var columns = [].concat(_toConsumableArray(jobCreator.modelPlot ? [{
    field: 'count',
    name: 'count',
    width: '100px',
    render: function render(count) {
      return _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react.default.createElement("code", null, count));
    }
  }] : []), [{
    field: 'example',
    name: 'Example',
    render: function render(example) {
      return _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react.default.createElement("code", null, example));
    }
  }]);
  return _react.default.createElement(_react.default.Fragment, null, totalCategories > 0 && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.categorizationTotalCategories",
    defaultMessage: "Total categories: {totalCategories}",
    values: {
      totalCategories: totalCategories
    }
  })), _react.default.createElement(_eui.EuiBasicTable, {
    columns: columns,
    items: tableRow
  })));
};

exports.TopCategories = TopCategories;