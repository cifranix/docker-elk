"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedDetectors = void 0;

var _react = _interopRequireWildcard(require("react"));

var _job_creator_context = require("../../../job_creator_context");

var _new_job_capabilities_service = require("../../../../../../../services/new_job_capabilities_service");

var _metric_selector = require("./metric_selector");

var _detector_list = require("./detector_list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var emptyRichDetector = {
  agg: null,
  field: null,
  byField: null,
  overField: null,
  partitionField: null,
  excludeFrequent: null,
  description: null,
  customRules: null
};

var AdvancedDetectors = function AdvancedDetectors(_ref) {
  var setIsValid = _ref.setIsValid;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate;

  var jobCreator = jc;
  var fields = _new_job_capabilities_service.newJobCapsService.fields,
      aggs = _new_job_capabilities_service.newJobCapsService.aggs;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      modalPayload = _useState2[0],
      setModalPayload = _useState2[1];

  function closeModal() {
    setModalPayload(null);
  }

  function detectorChangeHandler(dtr, index) {
    if (index === undefined) {
      jobCreator.addDetector(dtr.agg, dtr.field, dtr.byField, dtr.overField, dtr.partitionField, dtr.excludeFrequent, dtr.description);
    } else {
      jobCreator.editDetector(dtr.agg, dtr.field, dtr.byField, dtr.overField, dtr.partitionField, dtr.excludeFrequent, dtr.description, index);
    }

    jobCreatorUpdate();
    setModalPayload(null);
  }

  function showModal() {
    setModalPayload({
      detector: emptyRichDetector
    });
  }

  function onDeleteJob(i) {
    jobCreator.removeDetector(i);
    jobCreatorUpdate();
  }

  function onEditJob(i) {
    var dtr = jobCreator.richDetectors[i];

    if (dtr !== undefined) {
      setModalPayload({
        detector: dtr,
        index: i
      });
    }
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_detector_list.DetectorList, {
    isActive: true,
    onEditJob: onEditJob,
    onDeleteJob: onDeleteJob
  }), _react.default.createElement(_metric_selector.MetricSelector, {
    payload: modalPayload,
    fields: fields,
    aggs: aggs,
    detectorChangeHandler: detectorChangeHandler,
    showModal: showModal,
    closeModal: closeModal
  }));
};

exports.AdvancedDetectors = AdvancedDetectors;