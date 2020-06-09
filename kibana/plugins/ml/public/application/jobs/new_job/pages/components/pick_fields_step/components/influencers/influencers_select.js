"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfluencersSelect = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _job_creator_context = require("../../../job_creator_context");

var _general = require("../../../../../common/job_creator/util/general");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var InfluencersSelect = function InfluencersSelect(_ref) {
  var fields = _ref.fields,
      changeHandler = _ref.changeHandler,
      selectedInfluencers = _ref.selectedInfluencers;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator;

  var options = [].concat(_toConsumableArray((0, _general.createFieldOptions)(fields, jobCreator.additionalFields)), _toConsumableArray((0, _general.createMlcategoryFieldOption)(jobCreator.categorizationFieldName)));
  var selection = selectedInfluencers.map(function (i) {
    return {
      label: i
    };
  });

  function onChange(selectedOptions) {
    changeHandler(selectedOptions.map(function (o) {
      return o.label;
    }));
  }

  return _react.default.createElement(_eui.EuiComboBox, {
    options: options,
    selectedOptions: selection,
    onChange: onChange,
    isClearable: false,
    "data-test-subj": "mlInfluencerSelect"
  });
};

exports.InfluencersSelect = InfluencersSelect;