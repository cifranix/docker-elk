"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumnData = getColumnData;
exports.getTrailingControlColumns = getTrailingControlColumns;
exports.MAX_COLUMNS = exports.OTHER_CLASS_ID = exports.ACTUAL_CLASS_ID = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ACTUAL_CLASS_ID = 'actual_class';
exports.ACTUAL_CLASS_ID = ACTUAL_CLASS_ID;
var OTHER_CLASS_ID = 'other';
exports.OTHER_CLASS_ID = OTHER_CLASS_ID;
var MAX_COLUMNS = 6;
exports.MAX_COLUMNS = MAX_COLUMNS;

function getColumnData(confusionMatrixData) {
  var colData = [];
  var columns = [{
    id: ACTUAL_CLASS_ID,
    display: _react.default.createElement("span", null)
  }];
  var showOther = false;
  confusionMatrixData.forEach(function (classData) {
    var otherCount = classData.other_predicted_class_doc_count;

    if (otherCount > 0) {
      showOther = true;
    }

    var col = {
      actual_class: classData.actual_class,
      actual_class_doc_count: classData.actual_class_doc_count,
      other: otherCount
    };
    var predictedClasses = classData.predicted_classes || [];
    columns.push({
      id: classData.actual_class
    });

    for (var i = 0; i < predictedClasses.length; i++) {
      var predictedClass = predictedClasses[i].predicted_class;
      var predictedClassCount = predictedClasses[i].count;
      col[predictedClass] = predictedClassCount;
    }

    colData.push(col);
  });

  if (showOther) {
    columns.push({
      id: OTHER_CLASS_ID
    });
  }

  return {
    columns: columns,
    columnData: colData
  };
}

function getTrailingControlColumns(numColumns, setShowFullColumns) {
  return [{
    id: 'actions',
    width: 60,
    headerCellRender: function headerCellRender() {
      return _react.default.createElement("span", null, "".concat(numColumns, " more"));
    },
    rowCellRender: function RowCellRender() {
      var _useState = (0, _react.useState)(false),
          _useState2 = _slicedToArray(_useState, 2),
          isPopoverOpen = _useState2[0],
          setIsPopoverOpen = _useState2[1];

      return _react.default.createElement(_eui.EuiPopover, {
        isOpen: isPopoverOpen,
        anchorPosition: "upCenter",
        button: _react.default.createElement(_eui.EuiButtonIcon, {
          "aria-label": _i18n.i18n.translate('xpack.ml.dataframe.analytics.classificationExploration.showActions', {
            defaultMessage: 'Show actions'
          }),
          iconType: "boxesHorizontal",
          color: "text",
          onClick: function onClick() {
            return setIsPopoverOpen(!isPopoverOpen);
          }
        }),
        closePopover: function closePopover() {
          return setIsPopoverOpen(false);
        },
        ownFocus: true
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: function onClick() {
          return setShowFullColumns(true);
        }
      }, _react.default.createElement(_eui.EuiText, {
        size: "s",
        grow: false,
        textAlign: "center"
      }, _i18n.i18n.translate('xpack.ml.dataframe.analytics.classificationExploration.showAllColumns', {
        defaultMessage: 'Show all columns'
      }))));
    }
  }];
}