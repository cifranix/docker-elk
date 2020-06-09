"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategorizationDetector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _aggregation_types = require("../../../../../../../../../common/constants/aggregation_types");

var _job_creator_context = require("../../../job_creator_context");

var _detector_cards = require("./detector_cards");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CategorizationDetector = function CategorizationDetector() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobCreatorUpdated = _useContext.jobCreatorUpdated;

  var jobCreator = jc;

  var _useState = (0, _react.useState)(jobCreator.selectedDetectorType),
      _useState2 = _slicedToArray(_useState, 2),
      categorizationDetectorType = _useState2[0],
      setCategorizationDetectorType = _useState2[1];

  (0, _react.useEffect)(function () {
    if (categorizationDetectorType !== jobCreator.selectedDetectorType) {
      jobCreator.setDetectorType(categorizationDetectorType);
      jobCreatorUpdate();
    }
  }, [categorizationDetectorType]);
  (0, _react.useEffect)(function () {
    setCategorizationDetectorType(jobCreator.selectedDetectorType);
  }, [jobCreatorUpdated]);

  function onCountSelection() {
    setCategorizationDetectorType(_aggregation_types.ML_JOB_AGGREGATION.COUNT);
  }

  function onRareSelection() {
    setCategorizationDetectorType(_aggregation_types.ML_JOB_AGGREGATION.RARE);
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.categorizationDetectorSelect.title",
    defaultMessage: "Categorization detector"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "l",
    style: {
      maxWidth: '824px'
    }
  }, _react.default.createElement(_detector_cards.CountCard, {
    onClick: onCountSelection,
    isSelected: categorizationDetectorType === _aggregation_types.ML_JOB_AGGREGATION.COUNT
  }), _react.default.createElement(_detector_cards.RareCard, {
    onClick: onRareSelection,
    isSelected: categorizationDetectorType === _aggregation_types.ML_JOB_AGGREGATION.RARE
  })));
};

exports.CategorizationDetector = CategorizationDetector;