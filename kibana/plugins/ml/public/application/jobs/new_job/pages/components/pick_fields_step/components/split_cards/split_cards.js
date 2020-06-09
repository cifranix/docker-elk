"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplitCards = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _new_job = require("../../../../../../../../../common/constants/new_job");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var SplitCards = (0, _react.memo)(function (_ref) {
  var fieldValues = _ref.fieldValues,
      splitField = _ref.splitField,
      children = _ref.children,
      numberOfDetectors = _ref.numberOfDetectors,
      jobType = _ref.jobType,
      _ref$animate = _ref.animate,
      animate = _ref$animate === void 0 ? false : _ref$animate;
  var panels = [];

  function storePanels(panel, marginBottom) {
    if (panel !== null) {
      if (animate === false) {
        panel.style.marginBottom = "".concat(marginBottom, "px");
      }

      panels.push({
        panel: panel,
        marginBottom: marginBottom
      });
    }
  }

  function getBackPanels() {
    panels.length = 0;

    var fieldValuesCopy = _toConsumableArray(fieldValues);

    fieldValuesCopy.shift();
    var margin = 5;
    var sideMargins = fieldValuesCopy.map(function (f, i) {
      return margin += 10 - i;
    }).reverse();

    if (animate === true) {
      setTimeout(function () {
        panels.forEach(function (p) {
          return p.panel.style.marginBottom = "".concat(p.marginBottom, "px");
        });
      }, 100);
    }

    var SPACING = 100;
    var SPLIT_HEIGHT_MULTIPLIER = 1.6;
    return fieldValuesCopy.map(function (fieldName, i) {
      var diff = (i + 1) * (SPLIT_HEIGHT_MULTIPLIER * (10 / fieldValuesCopy.length));
      var marginBottom = -SPACING + diff;
      var sideMargin = sideMargins[i];

      var style = _objectSpread({
        height: "".concat(SPACING, "px"),
        marginBottom: "-".concat(SPACING, "px"),
        marginLeft: "".concat(sideMargin, "px"),
        marginRight: "".concat(sideMargin, "px")
      }, animate ? {
        transition: 'margin 0.5s'
      } : {});

      return _react.default.createElement("div", {
        key: fieldName,
        ref: function ref(_ref2) {
          return storePanels(_ref2, marginBottom);
        },
        style: style
      }, _react.default.createElement(_eui.EuiPanel, {
        paddingSize: "m",
        style: {
          paddingTop: '4px'
        },
        "data-test-subj": "mlSplitCard back"
      }, _react.default.createElement("div", {
        style: {
          fontWeight: 'bold',
          fontSize: 'small'
        },
        "data-test-subj": "mlSplitCardTitle"
      }, fieldName)));
    });
  }

  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "mlDataSplit"
  }, (fieldValues.length === 0 || numberOfDetectors === 0) && _react.default.createElement(_react.default.Fragment, null, children), fieldValues.length > 0 && numberOfDetectors > 0 && splitField !== null && _react.default.createElement(_react.Fragment, null, jobType === _new_job.JOB_TYPE.MULTI_METRIC && _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
    style: {
      fontSize: 'small'
    },
    "data-test-subj": "mlDataSplitTitle ".concat(splitField.name)
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.splitCards.dataSplitBy",
    defaultMessage: "Data split by {field}",
    values: {
      field: splitField.name
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  })), getBackPanels(), _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "m",
    style: {
      paddingTop: '4px'
    },
    "data-test-subj": "mlSplitCard front"
  }, _react.default.createElement("div", {
    style: {
      fontWeight: 'bold',
      fontSize: 'small'
    },
    "data-test-subj": "mlSplitCardTitle"
  }, fieldValues[0]), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "s"
  }), _react.default.createElement(_react.default.Fragment, null, children)))));
});
exports.SplitCards = SplitCards;