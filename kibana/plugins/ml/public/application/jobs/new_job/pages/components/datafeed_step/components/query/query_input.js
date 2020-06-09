"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _job_creator_context = require("../../../job_creator_context");

var _ml_job_editor = require("../../../../../../jobs_list/components/ml_job_editor");

var _description = require("./description");

var _validation_utils = require("../../../../../../../../../common/util/validation_utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EDITOR_HEIGHT = '400px';

var QueryInput = function QueryInput(_ref) {
  var setIsValidQuery = _ref.setIsValidQuery;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobCreatorUpdated = _useContext.jobCreatorUpdated;

  var jobCreator = jc;

  var _useState = (0, _react.useState)(JSON.stringify(jobCreator.query, null, 2)),
      _useState2 = _slicedToArray(_useState, 2),
      queryString = _useState2[0],
      setQueryString = _useState2[1];

  (0, _react.useEffect)(function () {
    var validJson = (0, _validation_utils.isValidJson)(queryString);
    setIsValidQuery(validJson);

    if (validJson) {
      jobCreator.query = JSON.parse(queryString);
      jobCreatorUpdate();
    }
  }, [queryString]);
  (0, _react.useEffect)(function () {
    if ((0, _validation_utils.isValidJson)(queryString)) {
      // the query object may have changed outside of this component,
      // compare the current query with the local queryString by reformatting both
      var query = JSON.parse(queryString);
      var newQueryString = JSON.stringify(query, null, 2);
      var actualQuery = JSON.stringify(jobCreator.query, null, 2);

      if (newQueryString !== actualQuery) {
        setQueryString(actualQuery);
      }
    }
  }, [jobCreatorUpdated]);
  (0, _react.useEffect)(function () {
    var validJson = (0, _validation_utils.isValidJson)(queryString);
    setIsValidQuery(validJson);
  }, []);

  function onChange(qs) {
    setQueryString(qs);
  }

  return _react.default.createElement(_description.Description, null, _react.default.createElement(_ml_job_editor.MLJobEditor, {
    value: queryString,
    height: EDITOR_HEIGHT,
    readOnly: false,
    onChange: onChange
  }));
};

exports.QueryInput = QueryInput;