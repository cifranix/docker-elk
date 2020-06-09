"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Influencers = void 0;

var _react = _interopRequireWildcard(require("react"));

var _influencers_select = require("./influencers_select");

var _job_creator_context = require("../../../job_creator_context");

var _new_job_capabilities_service = require("../../../../../../../services/new_job_capabilities_service");

var _job_creator = require("../../../../../common/job_creator");

var _description = require("./description");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Influencers = function Influencers() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobCreatorUpdated = _useContext.jobCreatorUpdated;

  var jobCreator = jc;
  var fields = _new_job_capabilities_service.newJobCapsService.fields;

  var _useState = (0, _react.useState)(_toConsumableArray(jobCreator.influencers)),
      _useState2 = _slicedToArray(_useState, 2),
      influencers = _useState2[0],
      setInfluencers = _useState2[1];

  (0, _react.useEffect)(function () {
    jobCreator.removeAllInfluencers();
    influencers.forEach(function (i) {
      return jobCreator.addInfluencer(i);
    });

    if (jobCreator instanceof _job_creator.MultiMetricJobCreator) {
      jobCreator.calculateModelMemoryLimit();
    }

    jobCreatorUpdate();
  }, [influencers.join()]);
  (0, _react.useEffect)(function () {
    setInfluencers(_toConsumableArray(jobCreator.influencers));
  }, [jobCreatorUpdated]);
  return _react.default.createElement(_description.Description, null, _react.default.createElement(_influencers_select.InfluencersSelect, {
    fields: fields,
    changeHandler: setInfluencers,
    selectedInfluencers: influencers
  }));
};

exports.Influencers = Influencers;