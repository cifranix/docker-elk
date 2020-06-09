"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvaluatePanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _kibana = require("../../../../../contexts/kibana");

var _error_callout = require("../error_callout");

var _common = require("../../../../common");

var _fields = require("../../../../common/fields");

var _columns = require("../../../analytics_management/components/analytics_list/columns");

var _analytics = require("../../../../common/analytics");

var _loading_panel = require("../loading_panel");

var _column_data = require("./column_data");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultPanelWidth = 500;
var SUBSET_TITLE;

(function (SUBSET_TITLE) {
  SUBSET_TITLE["TRAINING"] = "training";
  SUBSET_TITLE["TESTING"] = "testing";
  SUBSET_TITLE["ENTIRE"] = "entire";
})(SUBSET_TITLE || (SUBSET_TITLE = {}));

var entireDatasetHelpText = _i18n.i18n.translate('xpack.ml.dataframe.analytics.classificationExploration.confusionMatrixEntireHelpText', {
  defaultMessage: 'Normalized confusion matrix for entire dataset'
});

var testingDatasetHelpText = _i18n.i18n.translate('xpack.ml.dataframe.analytics.classificationExploration.confusionMatrixTestingHelpText', {
  defaultMessage: 'Normalized confusion matrix for testing dataset'
});

var trainingDatasetHelpText = _i18n.i18n.translate('xpack.ml.dataframe.analytics.classificationExploration.confusionMatrixTrainingHelpText', {
  defaultMessage: 'Normalized confusion matrix for training dataset'
});

function getHelpText(dataSubsetTitle) {
  var helpText = entireDatasetHelpText;

  if (dataSubsetTitle === SUBSET_TITLE.TESTING) {
    helpText = testingDatasetHelpText;
  } else if (dataSubsetTitle === SUBSET_TITLE.TRAINING) {
    helpText = trainingDatasetHelpText;
  }

  return helpText;
}

var EvaluatePanel = function EvaluatePanel(_ref) {
  var jobConfig = _ref.jobConfig,
      jobStatus = _ref.jobStatus,
      searchQuery = _ref.searchQuery;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      docLinks = _useMlKibana.services.docLinks;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      confusionMatrixData = _useState4[0],
      setConfusionMatrixData = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      columns = _useState6[0],
      setColumns = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      columnsData = _useState8[0],
      setColumnsData = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      showFullColumns = _useState10[0],
      setShowFullColumns = _useState10[1];

  var _useState11 = (0, _react.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      popoverContents = _useState12[0],
      setPopoverContents = _useState12[1];

  var _useState13 = (0, _react.useState)(null),
      _useState14 = _slicedToArray(_useState13, 2),
      docsCount = _useState14[0],
      setDocsCount = _useState14[1];

  var _useState15 = (0, _react.useState)(null),
      _useState16 = _slicedToArray(_useState15, 2),
      error = _useState16[0],
      setError = _useState16[1];

  var _useState17 = (0, _react.useState)(SUBSET_TITLE.ENTIRE),
      _useState18 = _slicedToArray(_useState17, 2),
      dataSubsetTitle = _useState18[0],
      setDataSubsetTitle = _useState18[1];

  var _useState19 = (0, _react.useState)(defaultPanelWidth),
      _useState20 = _slicedToArray(_useState19, 2),
      panelWidth = _useState20[0],
      setPanelWidth = _useState20[1]; // Column visibility


  var _useState21 = (0, _react.useState)(function () {
    return columns.map(function (_ref2) {
      var id = _ref2.id;
      return id;
    });
  }),
      _useState22 = _slicedToArray(_useState21, 2),
      visibleColumns = _useState22[0],
      setVisibleColumns = _useState22[1];

  var index = jobConfig.dest.index;
  var dependentVariable = (0, _common.getDependentVar)(jobConfig.analysis);
  var predictionFieldName = (0, _common.getPredictionFieldName)(jobConfig.analysis); // default is 'ml'

  var resultsField = jobConfig.dest.results_field;
  var requiresKeyword = false;

  var loadData =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref4) {
      var isTrainingClause, _ref4$ignoreDefaultQu, ignoreDefaultQuery, evalData, docsCountResp, _evalData$eval, _evalData$eval$classi, _evalData$eval$classi2, confusionMatrix;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              isTrainingClause = _ref4.isTrainingClause, _ref4$ignoreDefaultQu = _ref4.ignoreDefaultQuery, ignoreDefaultQuery = _ref4$ignoreDefaultQu === void 0 ? true : _ref4$ignoreDefaultQu;
              setIsLoading(true);

              try {
                requiresKeyword = (0, _fields.isKeywordAndTextType)(dependentVariable);
              } catch (e) {
                // Additional error handling due to missing field type is handled by loadEvalData
                console.error('Unable to load new field types', error); // eslint-disable-line no-console
              }

              _context.next = 5;
              return (0, _common.loadEvalData)({
                isTraining: false,
                index: index,
                dependentVariable: dependentVariable,
                resultsField: resultsField,
                predictionFieldName: predictionFieldName,
                searchQuery: searchQuery,
                ignoreDefaultQuery: ignoreDefaultQuery,
                jobType: _analytics.ANALYSIS_CONFIG_TYPE.CLASSIFICATION,
                requiresKeyword: requiresKeyword
              });

            case 5:
              evalData = _context.sent;
              _context.next = 8;
              return (0, _common.loadDocsCount)({
                isTraining: false,
                searchQuery: searchQuery,
                resultsField: resultsField,
                destIndex: jobConfig.dest.index
              });

            case 8:
              docsCountResp = _context.sent;

              if (evalData.success === true && evalData.eval && (0, _analytics.isClassificationEvaluateResponse)(evalData.eval)) {
                confusionMatrix = (_evalData$eval = evalData.eval) === null || _evalData$eval === void 0 ? void 0 : (_evalData$eval$classi = _evalData$eval.classification) === null || _evalData$eval$classi === void 0 ? void 0 : (_evalData$eval$classi2 = _evalData$eval$classi.multiclass_confusion_matrix) === null || _evalData$eval$classi2 === void 0 ? void 0 : _evalData$eval$classi2.confusion_matrix;
                setError(null);
                setConfusionMatrixData(confusionMatrix || []);
                setIsLoading(false);
              } else {
                setIsLoading(false);
                setConfusionMatrixData([]);
                setError(evalData.error);
              }

              if (docsCountResp.success === true) {
                setDocsCount(docsCountResp.docsCount);
              } else {
                setDocsCount(null);
              }

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function loadData(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var resizeHandler = function resizeHandler() {
    var _document$getElementB;

    var tablePanelWidth = ((_document$getElementB = document.getElementById('mlDataFrameAnalyticsTableResultsPanel')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.clientWidth) || defaultPanelWidth; // Keep the evaluate panel width slightly smaller than the results table
    // to ensure results table can resize correctly. Temporary workaround DataGrid issue with flex

    var newWidth = tablePanelWidth - 8;
    setPanelWidth(newWidth);
  };

  (0, _react.useEffect)(function () {
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    return function () {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (confusionMatrixData.length > 0) {
      var _getColumnData = (0, _column_data.getColumnData)(confusionMatrixData),
          derivedColumns = _getColumnData.columns,
          columnData = _getColumnData.columnData; // Initialize all columns as visible


      setVisibleColumns(function () {
        return derivedColumns.map(function (_ref5) {
          var id = _ref5.id;
          return id;
        });
      });
      setColumns(derivedColumns);
      setColumnsData(columnData);
      setPopoverContents({
        numeric: function numeric(_ref6) {
          var _children$props, _children$props2;

          var cellContentsElement = _ref6.cellContentsElement,
              children = _ref6.children;
          var rowIndex = children === null || children === void 0 ? void 0 : (_children$props = children.props) === null || _children$props === void 0 ? void 0 : _children$props.rowIndex;
          var colId = children === null || children === void 0 ? void 0 : (_children$props2 = children.props) === null || _children$props2 === void 0 ? void 0 : _children$props2.columnId;
          var gridItem = columnData[rowIndex];

          if (gridItem !== undefined && colId !== _column_data.ACTUAL_CLASS_ID) {
            // @ts-ignore
            var count = gridItem[colId];
            return "".concat(count, " / ").concat(gridItem.actual_class_doc_count, " * 100 = ").concat(cellContentsElement.textContent);
          }

          return cellContentsElement.textContent;
        }
      });
    }
  }, [confusionMatrixData]);
  (0, _react.useEffect)(function () {
    var hasIsTrainingClause = (0, _analytics.isResultsSearchBoolQuery)(searchQuery) && searchQuery.bool.must.filter(function (clause) {
      return clause.match && clause.match["".concat(resultsField, ".is_training")] !== undefined;
    });
    var isTrainingClause = hasIsTrainingClause && hasIsTrainingClause[0] && hasIsTrainingClause[0].match["".concat(resultsField, ".is_training")];
    var noTrainingQuery = isTrainingClause === false || isTrainingClause === undefined;

    if (noTrainingQuery) {
      setDataSubsetTitle(SUBSET_TITLE.ENTIRE);
    } else {
      setDataSubsetTitle(isTrainingClause && isTrainingClause.query === 'true' ? SUBSET_TITLE.TRAINING : SUBSET_TITLE.TESTING);
    }

    loadData({
      isTrainingClause: isTrainingClause
    });
  }, [JSON.stringify(searchQuery)]);

  var renderCellValue = function renderCellValue(_ref7) {
    var rowIndex = _ref7.rowIndex,
        columnId = _ref7.columnId,
        setCellProps = _ref7.setCellProps;
    var cellValue = columnsData[rowIndex][columnId];
    var actualCount = columnsData[rowIndex] && columnsData[rowIndex].actual_class_doc_count;
    var accuracy = '0%';

    if (columnId !== _column_data.ACTUAL_CLASS_ID && actualCount) {
      accuracy = cellValue / actualCount; // round to 2 decimal places without converting to string;

      accuracy = Math.round(accuracy * 100) / 100;
      accuracy = "".concat(Math.round(accuracy * 100), "%");
    } // eslint-disable-next-line react-hooks/rules-of-hooks


    (0, _react.useEffect)(function () {
      if (columnId !== _column_data.ACTUAL_CLASS_ID) {
        setCellProps({
          style: {
            backgroundColor: "rgba(0, 179, 164, ".concat(accuracy, ")")
          }
        });
      }
    }, [rowIndex, columnId, setCellProps]);
    return _react.default.createElement("span", null, columnId === _column_data.ACTUAL_CLASS_ID ? cellValue : accuracy);
  };

  if (isLoading === true) {
    return _react.default.createElement(_loading_panel.LoadingPanel, null);
  }

  var ELASTIC_WEBSITE_URL = docLinks.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = docLinks.DOC_LINK_VERSION;
  var showTrailingColumns = columnsData.length > _column_data.MAX_COLUMNS;
  var extraColumns = columnsData.length - _column_data.MAX_COLUMNS;
  var shownColumns = showTrailingColumns === true && showFullColumns === false ? columns.slice(0, _column_data.MAX_COLUMNS + 1) : columns;
  var rowCount = showTrailingColumns === true && showFullColumns === false ? _column_data.MAX_COLUMNS : columnsData.length;
  return _react.default.createElement(_eui.EuiPanel, {
    "data-test-subj": "mlDFAnalyticsClassificationExplorationEvaluatePanel",
    style: {
      width: "".concat(panelWidth, "px")
    }
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("span", null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.classificationExploration.evaluateJobIdTitle', {
    defaultMessage: 'Evaluation of classification job ID {jobId}',
    values: {
      jobId: jobConfig.id
    }
  })))), jobStatus !== undefined && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("span", null, (0, _columns.getTaskStateBadge)(jobStatus))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSpacer, null)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    target: "_blank",
    iconType: "help",
    iconSide: "left",
    color: "primary",
    href: "".concat(ELASTIC_WEBSITE_URL, "guide/en/machine-learning/").concat(DOC_LINK_VERSION, "/ml-dfanalytics-evaluate.html#ml-dfanalytics-classification")
  }, _i18n.i18n.translate('xpack.ml.dataframe.analytics.classificationExploration.classificationDocsLink', {
    defaultMessage: 'Classification evaluation docs '
  }))))), error !== null && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_error_callout.ErrorCallout, {
    error: error
  })), error === null && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xxs"
  }, _react.default.createElement("span", null, getHelpText(dataSubsetTitle))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIconTip, {
    anchorClassName: "mlDataFrameAnalyticsClassificationInfoTooltip",
    content: _i18n.i18n.translate('xpack.ml.dataframe.analytics.classificationExploration.confusionMatrixTooltip', {
      defaultMessage: 'The multi-class confusion matrix contains the number of occurrences where the analysis classified data points correctly with their actual class as well as the number of occurrences where it misclassified them with another class'
    })
  })))), docsCount !== null && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.dataframe.analytics.classificationExploration.generalizationDocsCount",
    defaultMessage: "{docsCount, plural, one {# doc} other {# docs}} evaluated",
    values: {
      docsCount: docsCount
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    style: {
      paddingLeft: '5%',
      paddingRight: '5%'
    }
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    className: "mlDataFrameAnalyticsClassification__actualLabel",
    helpText: _i18n.i18n.translate('xpack.ml.dataframe.analytics.classificationExploration.confusionMatrixActualLabel', {
      defaultMessage: 'Actual label'
    })
  }, _react.default.createElement(_react.Fragment, null))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, columns.length > 0 && columnsData.length > 0 && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column",
    justifyContent: "center",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    helpText: _i18n.i18n.translate('xpack.ml.dataframe.analytics.classificationExploration.confusionMatrixPredictedLabel', {
      defaultMessage: 'Predicted label'
    })
  }, _react.default.createElement(_react.Fragment, null))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      width: '90%'
    }
  }, _react.default.createElement(_eui.EuiDataGrid, {
    "data-test-subj": "mlDFAnalyticsClassificationExplorationConfusionMatrix",
    "aria-label": _i18n.i18n.translate('xpack.ml.dataframe.analytics.classificationExploration.confusionMatrixLabel', {
      defaultMessage: 'Classification confusion matrix'
    }),
    columns: shownColumns,
    columnVisibility: {
      visibleColumns: visibleColumns,
      setVisibleColumns: setVisibleColumns
    },
    rowCount: rowCount,
    renderCellValue: renderCellValue,
    inMemory: {
      level: 'sorting'
    },
    toolbarVisibility: {
      showColumnSelector: true,
      showStyleSelector: false,
      showFullScreenSelector: false,
      showSortSelector: false
    },
    popoverContents: popoverContents,
    gridStyle: {
      rowHover: 'none'
    },
    trailingControlColumns: showTrailingColumns === true && showFullColumns === false ? (0, _column_data.getTrailingControlColumns)(extraColumns, setShowFullColumns) : undefined
  }))))))))));
};

exports.EvaluatePanel = EvaluatePanel;