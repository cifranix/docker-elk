"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ByFieldSelector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _split_field_select = require("./split_field_select");

var _job_creator_context = require("../../../job_creator_context");

var _new_job_capabilities_service = require("../../../../../../../services/new_job_capabilities_service");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ByFieldSelector = function ByFieldSelector(_ref) {
  var detectorIndex = _ref.detectorIndex;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobCreatorUpdated = _useContext.jobCreatorUpdated;

  var jobCreator = jc;
  var allCategoryFields = _new_job_capabilities_service.newJobCapsService.categoryFields;

  var _useState = (0, _react.useState)(jobCreator.getByField(detectorIndex)),
      _useState2 = _slicedToArray(_useState, 2),
      byField = _useState2[0],
      setByField = _useState2[1];

  var categoryFields = useFilteredCategoryFields(allCategoryFields, jobCreator, jobCreatorUpdated);
  (0, _react.useEffect)(function () {
    jobCreator.setByField(byField, detectorIndex); // add the by field to the influencers

    if (byField !== null && jobCreator.influencers.includes(byField.name) === false) {
      jobCreator.addInfluencer(byField.name);
    }

    jobCreatorUpdate();
  }, [byField]);
  (0, _react.useEffect)(function () {
    var bf = jobCreator.getByField(detectorIndex);
    setByField(bf);
  }, [jobCreatorUpdated]);
  return _react.default.createElement(_split_field_select.SplitFieldSelect, {
    fields: categoryFields,
    changeHandler: setByField,
    selectedField: byField,
    isClearable: true,
    testSubject: "mlByFieldSelect",
    placeholder: _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.populationField.placeholder', {
      defaultMessage: 'Split data'
    })
  });
}; // remove the split (over) field from the by field options


exports.ByFieldSelector = ByFieldSelector;

function useFilteredCategoryFields(allCategoryFields, jobCreator, jobCreatorUpdated) {
  var _useState3 = (0, _react.useState)(allCategoryFields),
      _useState4 = _slicedToArray(_useState3, 2),
      fields = _useState4[0],
      setFields = _useState4[1];

  (0, _react.useEffect)(function () {
    var sf = jobCreator.splitField;

    if (sf !== null) {
      setFields(allCategoryFields.filter(function (f) {
        return f.name !== sf.name;
      }));
    } else {
      setFields(allCategoryFields);
    }
  }, [jobCreatorUpdated]);
  return fields;
}