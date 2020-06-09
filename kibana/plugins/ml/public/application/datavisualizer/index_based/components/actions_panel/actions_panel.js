"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionsPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _create_job_link_card = require("../../../../components/create_job_link_card");

var _data_recognizer = require("../../../../components/data_recognizer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ActionsPanel = function ActionsPanel(_ref) {
  var indexPattern = _ref.indexPattern;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      recognizerResultsCount = _useState2[0],
      setRecognizerResultsCount = _useState2[1];

  var recognizerResults = {
    count: 0,
    onChange: function onChange() {
      setRecognizerResultsCount(recognizerResults.count);
    }
  };

  function openAdvancedJobWizard() {
    // TODO - pass the search string to the advanced job page as well as the index pattern
    //       (add in with new advanced job wizard?)
    window.open("#/jobs/new_job/advanced?index=".concat(indexPattern), '_self');
  } // Note we use display:none for the DataRecognizer section as it needs to be
  // passed the recognizerResults object, and then run the recognizer check which
  // controls whether the recognizer section is ultimately displayed.


  return _react.default.createElement("div", {
    "data-test-subj": "mlDataVisualizerActionsPanel"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.datavisualizer.actionsPanel.createJobTitle",
    defaultMessage: "Create Job"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement("div", {
    style: recognizerResultsCount === 0 ? {
      display: 'none'
    } : {}
  }, _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.datavisualizer.actionsPanel.selectKnownConfigurationDescription",
    defaultMessage: "Select known configurations for recognized data:"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "l",
    responsive: true,
    wrap: true
  }, _react.default.createElement(_data_recognizer.DataRecognizer, {
    indexPattern: indexPattern,
    savedSearch: null,
    results: recognizerResults
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  })), _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.datavisualizer.actionsPanel.createJobDescription",
    defaultMessage: "Use the Advanced job wizard to create a job to find anomalies in this data:"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_create_job_link_card.CreateJobLinkCard, {
    icon: "createAdvancedJob",
    title: _i18n.i18n.translate('xpack.ml.datavisualizer.actionsPanel.advancedTitle', {
      defaultMessage: 'Advanced'
    }),
    description: _i18n.i18n.translate('xpack.ml.datavisualizer.actionsPanel.advancedDescription', {
      defaultMessage: 'Use the full range of options to create a job for more advanced use cases'
    }),
    onClick: openAdvancedJobWizard,
    href: "#/jobs/new_job/advanced?index=".concat(indexPattern),
    "data-test-subj": "mlDataVisualizerCreateAdvancedJobCard"
  }));
};

exports.ActionsPanel = ActionsPanel;