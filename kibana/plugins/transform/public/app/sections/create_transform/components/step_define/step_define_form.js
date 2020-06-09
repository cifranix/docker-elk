"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultStepDefineState = getDefaultStepDefineState;
exports.applyTransformConfigToDefineState = applyTransformConfigToDefineState;
exports.getAggNameConflictToastMessages = getAggNameConflictToastMessages;
exports.StepDefineForm = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _public = require("../../../../../../../../../src/plugins/data/public");

var _pivot_preview = require("../../../../components/pivot_preview");

var _use_documentation_links = require("../../../../hooks/use_documentation_links");

var _use_x_json_mode = require("../../../../hooks/use_x_json_mode");

var _app_dependencies = require("../../../../app_dependencies");

var _common = require("../../../../../../common/types/common");

var _aggregation_dropdown = require("../aggregation_dropdown");

var _aggregation_list = require("../aggregation_list");

var _group_by_list = require("../group_by_list");

var _source_index_preview = require("../source_index_preview");

var _switch_modal = require("./switch_modal");

var _common2 = require("../../../../common");

var _common3 = require("./common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultSearch = '*';
var QUERY_LANGUAGE_KUERY = 'kuery';
var QUERY_LANGUAGE_LUCENE = 'lucene';

function getDefaultStepDefineState(searchItems) {
  return {
    aggList: {},
    groupByList: {},
    isAdvancedPivotEditorEnabled: false,
    isAdvancedSourceEditorEnabled: false,
    searchLanguage: QUERY_LANGUAGE_KUERY,
    searchString: undefined,
    searchQuery: searchItems.savedSearch !== undefined ? searchItems.combinedQuery : defaultSearch,
    sourceConfigUpdated: false,
    valid: false
  };
}

function applyTransformConfigToDefineState(state, transformConfig) {
  // apply the transform configuration to wizard DEFINE state
  if (transformConfig !== undefined) {
    // transform aggregations config to wizard state
    state.aggList = Object.keys(transformConfig.pivot.aggregations).reduce(function (aggList, aggName) {
      var aggConfig = transformConfig.pivot.aggregations[aggName];
      var agg = Object.keys(aggConfig)[0];
      aggList[aggName] = _objectSpread({}, aggConfig[agg], {
        agg: agg,
        aggName: aggName,
        dropDownName: aggName
      });
      return aggList;
    }, {}); // transform group by config to wizard state

    state.groupByList = Object.keys(transformConfig.pivot.group_by).reduce(function (groupByList, groupByName) {
      var groupByConfig = transformConfig.pivot.group_by[groupByName];
      var groupBy = Object.keys(groupByConfig)[0];
      groupByList[groupByName] = _objectSpread({
        agg: groupBy,
        aggName: groupByName,
        dropDownName: groupByName
      }, groupByConfig[groupBy]);
      return groupByList;
    }, {}); // only apply the query from the transform config to wizard state if it's not the default query

    var query = transformConfig.source.query;

    if (query !== undefined && !(0, _lodash.isEqual)(query, _common2.matchAllQuery)) {
      state.isAdvancedSourceEditorEnabled = true;
      state.searchQuery = query;
      state.sourceConfigUpdated = true;
    } // applying a transform config to wizard state will always result in a valid configuration


    state.valid = true;
  }

  return state;
}

function getAggNameConflictToastMessages(aggName, aggList, groupByList) {
  if (aggList[aggName] !== undefined) {
    return [_i18n.i18n.translate('xpack.transform.stepDefineForm.aggExistsErrorMessage', {
      defaultMessage: "An aggregation configuration with the name '{aggName}' already exists.",
      values: {
        aggName: aggName
      }
    })];
  }

  if (groupByList[aggName] !== undefined) {
    return [_i18n.i18n.translate('xpack.transform.stepDefineForm.groupByExistsErrorMessage', {
      defaultMessage: "A group by configuration with the name '{aggName}' already exists.",
      values: {
        aggName: aggName
      }
    })];
  }

  var conflicts = []; // check the new aggName against existing aggs and groupbys

  var aggNameSplit = aggName.split('.');
  var aggNameCheck;
  aggNameSplit.forEach(function (aggNamePart) {
    aggNameCheck = aggNameCheck === undefined ? aggNamePart : "".concat(aggNameCheck, ".").concat(aggNamePart);

    if (aggList[aggNameCheck] !== undefined || groupByList[aggNameCheck] !== undefined) {
      conflicts.push(_i18n.i18n.translate('xpack.transform.stepDefineForm.nestedConflictErrorMessage', {
        defaultMessage: "Couldn't add configuration '{aggName}' because of a nesting conflict with '{aggNameCheck}'.",
        values: {
          aggName: aggName,
          aggNameCheck: aggNameCheck
        }
      }));
    }
  });

  if (conflicts.length > 0) {
    return conflicts;
  } // check all aggs against new aggName


  Object.keys(aggList).some(function (aggListName) {
    var aggListNameSplit = aggListName.split('.');
    var aggListNameCheck;
    return aggListNameSplit.some(function (aggListNamePart) {
      aggListNameCheck = aggListNameCheck === undefined ? aggListNamePart : "".concat(aggListNameCheck, ".").concat(aggListNamePart);

      if (aggListNameCheck === aggName) {
        conflicts.push(_i18n.i18n.translate('xpack.transform.stepDefineForm.nestedAggListConflictErrorMessage', {
          defaultMessage: "Couldn't add configuration '{aggName}' because of a nesting conflict with '{aggListName}'.",
          values: {
            aggName: aggName,
            aggListName: aggListName
          }
        }));
        return true;
      }

      return false;
    });
  });

  if (conflicts.length > 0) {
    return conflicts;
  } // check all group-bys against new aggName


  Object.keys(groupByList).some(function (groupByListName) {
    var groupByListNameSplit = groupByListName.split('.');
    var groupByListNameCheck;
    return groupByListNameSplit.some(function (groupByListNamePart) {
      groupByListNameCheck = groupByListNameCheck === undefined ? groupByListNamePart : "".concat(groupByListNameCheck, ".").concat(groupByListNamePart);

      if (groupByListNameCheck === aggName) {
        conflicts.push(_i18n.i18n.translate('xpack.transform.stepDefineForm.nestedGroupByListConflictErrorMessage', {
          defaultMessage: "Couldn't add configuration '{aggName}' because of a nesting conflict with '{groupByListName}'.",
          values: {
            aggName: aggName,
            groupByListName: groupByListName
          }
        }));
        return true;
      }

      return false;
    });
  });
  return conflicts;
}

var StepDefineForm = _react.default.memo(function (_ref) {
  var _ref$overrides = _ref.overrides,
      overrides = _ref$overrides === void 0 ? {} : _ref$overrides,
      onChange = _ref.onChange,
      searchItems = _ref.searchItems;
  var toastNotifications = (0, _app_dependencies.useToastNotifications)();

  var _useDocumentationLink = (0, _use_documentation_links.useDocumentationLinks)(),
      esQueryDsl = _useDocumentationLink.esQueryDsl,
      esTransformPivot = _useDocumentationLink.esTransformPivot;

  var defaults = _objectSpread({}, getDefaultStepDefineState(searchItems), {}, overrides); // The internal state of the input query bar updated on every key stroke.


  var _useState = (0, _react.useState)({
    query: defaults.searchString || '',
    language: defaults.searchLanguage
  }),
      _useState2 = _slicedToArray(_useState, 2),
      searchInput = _useState2[0],
      setSearchInput = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      errorMessage = _useState4[0],
      setErrorMessage = _useState4[1]; // The state of the input query bar updated on every submit and to be exposed.


  var _useState5 = (0, _react.useState)(defaults.searchLanguage),
      _useState6 = _slicedToArray(_useState5, 2),
      searchLanguage = _useState6[0],
      setSearchLanguage = _useState6[1];

  var _useState7 = (0, _react.useState)(defaults.searchString),
      _useState8 = _slicedToArray(_useState7, 2),
      searchString = _useState8[0],
      setSearchString = _useState8[1];

  var _useState9 = (0, _react.useState)(defaults.searchQuery),
      _useState10 = _slicedToArray(_useState9, 2),
      searchQuery = _useState10[0],
      setSearchQuery = _useState10[1];

  var indexPattern = searchItems.indexPattern;

  var searchChangeHandler = function searchChangeHandler(query) {
    return setSearchInput(query);
  };

  var searchSubmitHandler = function searchSubmitHandler(query) {
    setSearchLanguage(query.language);
    setSearchString(query.query !== '' ? query.query : undefined);

    try {
      switch (query.language) {
        case QUERY_LANGUAGE_KUERY:
          setSearchQuery(_public.esKuery.toElasticsearchQuery(_public.esKuery.fromKueryExpression(query.query), indexPattern));
          return;

        case QUERY_LANGUAGE_LUCENE:
          setSearchQuery(_public.esQuery.luceneStringToDsl(query.query));
          return;
      }
    } catch (e) {
      console.log('Invalid syntax', JSON.stringify(e, null, 2)); // eslint-disable-line no-console

      setErrorMessage({
        query: query.query,
        message: e.message
      });
    }
  }; // The list of selected group by fields


  var _useState11 = (0, _react.useState)(defaults.groupByList),
      _useState12 = _slicedToArray(_useState11, 2),
      groupByList = _useState12[0],
      setGroupByList = _useState12[1];

  var _getPivotDropdownOpti = (0, _common3.getPivotDropdownOptions)(indexPattern),
      groupByOptions = _getPivotDropdownOpti.groupByOptions,
      groupByOptionsData = _getPivotDropdownOpti.groupByOptionsData,
      aggOptions = _getPivotDropdownOpti.aggOptions,
      aggOptionsData = _getPivotDropdownOpti.aggOptionsData;

  var addGroupBy = function addGroupBy(d) {
    var label = d[0].label;
    var config = groupByOptionsData[label];
    var aggName = config.aggName;
    var aggNameConflictMessages = getAggNameConflictToastMessages(aggName, aggList, groupByList);

    if (aggNameConflictMessages.length > 0) {
      aggNameConflictMessages.forEach(function (m) {
        return toastNotifications.addDanger(m);
      });
      return;
    }

    groupByList[aggName] = config;
    setGroupByList(_objectSpread({}, groupByList));
  };

  var updateGroupBy = function updateGroupBy(previousAggName, item) {
    var groupByListWithoutPrevious = _objectSpread({}, groupByList);

    delete groupByListWithoutPrevious[previousAggName];
    var aggNameConflictMessages = getAggNameConflictToastMessages(item.aggName, aggList, groupByListWithoutPrevious);

    if (aggNameConflictMessages.length > 0) {
      aggNameConflictMessages.forEach(function (m) {
        return toastNotifications.addDanger(m);
      });
      return;
    }

    groupByListWithoutPrevious[item.aggName] = item;
    setGroupByList(_objectSpread({}, groupByListWithoutPrevious));
  };

  var deleteGroupBy = function deleteGroupBy(aggName) {
    delete groupByList[aggName];
    setGroupByList(_objectSpread({}, groupByList));
  }; // The list of selected aggregations


  var _useState13 = (0, _react.useState)(defaults.aggList),
      _useState14 = _slicedToArray(_useState13, 2),
      aggList = _useState14[0],
      setAggList = _useState14[1];

  var addAggregation = function addAggregation(d) {
    var label = d[0].label;
    var config = aggOptionsData[label];
    var aggName = config.aggName;
    var aggNameConflictMessages = getAggNameConflictToastMessages(aggName, aggList, groupByList);

    if (aggNameConflictMessages.length > 0) {
      aggNameConflictMessages.forEach(function (m) {
        return toastNotifications.addDanger(m);
      });
      return;
    }

    aggList[aggName] = config;
    setAggList(_objectSpread({}, aggList));
  };

  var updateAggregation = function updateAggregation(previousAggName, item) {
    var aggListWithoutPrevious = _objectSpread({}, aggList);

    delete aggListWithoutPrevious[previousAggName];
    var aggNameConflictMessages = getAggNameConflictToastMessages(item.aggName, aggListWithoutPrevious, groupByList);

    if (aggNameConflictMessages.length > 0) {
      aggNameConflictMessages.forEach(function (m) {
        return toastNotifications.addDanger(m);
      });
      return;
    }

    aggListWithoutPrevious[item.aggName] = item;
    setAggList(_objectSpread({}, aggListWithoutPrevious));
  };

  var deleteAggregation = function deleteAggregation(aggName) {
    delete aggList[aggName];
    setAggList(_objectSpread({}, aggList));
  };

  var pivotAggsArr = (0, _common.dictionaryToArray)(aggList);
  var pivotGroupByArr = (0, _common.dictionaryToArray)(groupByList);
  var pivotQuery = (0, _common2.getPivotQuery)(searchQuery); // Advanced editor for pivot config state

  var _useState15 = (0, _react.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      isAdvancedEditorSwitchModalVisible = _useState16[0],
      setAdvancedEditorSwitchModalVisible = _useState16[1];

  var _useState17 = (0, _react.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      isAdvancedPivotEditorApplyButtonEnabled = _useState18[0],
      setAdvancedPivotEditorApplyButtonEnabled = _useState18[1];

  var _useState19 = (0, _react.useState)(defaults.isAdvancedPivotEditorEnabled),
      _useState20 = _slicedToArray(_useState19, 2),
      isAdvancedPivotEditorEnabled = _useState20[0],
      setAdvancedPivotEditorEnabled = _useState20[1]; // Advanced editor for source config state


  var _useState21 = (0, _react.useState)(defaults.sourceConfigUpdated),
      _useState22 = _slicedToArray(_useState21, 2),
      sourceConfigUpdated = _useState22[0],
      setSourceConfigUpdated = _useState22[1];

  var _useState23 = (0, _react.useState)(false),
      _useState24 = _slicedToArray(_useState23, 2),
      isAdvancedSourceEditorSwitchModalVisible = _useState24[0],
      setAdvancedSourceEditorSwitchModalVisible = _useState24[1];

  var _useState25 = (0, _react.useState)(defaults.isAdvancedSourceEditorEnabled),
      _useState26 = _slicedToArray(_useState25, 2),
      isAdvancedSourceEditorEnabled = _useState26[0],
      setAdvancedSourceEditorEnabled = _useState26[1];

  var _useState27 = (0, _react.useState)(false),
      _useState28 = _slicedToArray(_useState27, 2),
      isAdvancedSourceEditorApplyButtonEnabled = _useState28[0],
      setAdvancedSourceEditorApplyButtonEnabled = _useState28[1];

  var previewRequest = (0, _common2.getPreviewRequestBody)(indexPattern.title, pivotQuery, pivotGroupByArr, pivotAggsArr); // pivot config

  var stringifiedPivotConfig = JSON.stringify(previewRequest.pivot, null, 2);

  var _useState29 = (0, _react.useState)(stringifiedPivotConfig),
      _useState30 = _slicedToArray(_useState29, 2),
      advancedEditorConfigLastApplied = _useState30[0],
      setAdvancedEditorConfigLastApplied = _useState30[1];

  var _useXJsonMode = (0, _use_x_json_mode.useXJsonMode)(stringifiedPivotConfig),
      convertToJson = _useXJsonMode.convertToJson,
      setAdvancedEditorConfig = _useXJsonMode.setXJson,
      advancedEditorConfig = _useXJsonMode.xJson;

  (0, _react.useEffect)(function () {
    setAdvancedEditorConfig(stringifiedPivotConfig);
  }, [setAdvancedEditorConfig, stringifiedPivotConfig]); // source config

  var stringifiedSourceConfig = JSON.stringify(previewRequest.source.query, null, 2);

  var _useState31 = (0, _react.useState)(stringifiedSourceConfig),
      _useState32 = _slicedToArray(_useState31, 2),
      advancedEditorSourceConfigLastApplied = _useState32[0],
      setAdvancedEditorSourceConfigLastApplied = _useState32[1];

  var _useState33 = (0, _react.useState)(stringifiedSourceConfig),
      _useState34 = _slicedToArray(_useState33, 2),
      advancedEditorSourceConfig = _useState34[0],
      setAdvancedEditorSourceConfig = _useState34[1];

  var applyAdvancedSourceEditorChanges = function applyAdvancedSourceEditorChanges() {
    var sourceConfig = JSON.parse(advancedEditorSourceConfig);
    var prettySourceConfig = JSON.stringify(sourceConfig, null, 2);
    setSearchQuery(sourceConfig);
    setSourceConfigUpdated(true);
    setAdvancedEditorSourceConfig(prettySourceConfig);
    setAdvancedEditorSourceConfigLastApplied(prettySourceConfig);
    setAdvancedSourceEditorApplyButtonEnabled(false);
  };

  var applyAdvancedPivotEditorChanges = function applyAdvancedPivotEditorChanges() {
    var pivotConfig = JSON.parse(convertToJson(advancedEditorConfig));
    var newGroupByList = {};

    if (pivotConfig !== undefined && pivotConfig.group_by !== undefined) {
      Object.entries(pivotConfig.group_by).forEach(function (d) {
        var aggName = d[0];
        var aggConfig = d[1];
        var aggConfigKeys = Object.keys(aggConfig);
        var agg = aggConfigKeys[0];
        newGroupByList[aggName] = _objectSpread({}, aggConfig[agg], {
          agg: agg,
          aggName: aggName,
          dropDownName: ''
        });
      });
    }

    setGroupByList(newGroupByList);
    var newAggList = {};

    if (pivotConfig !== undefined && pivotConfig.aggregations !== undefined) {
      Object.entries(pivotConfig.aggregations).forEach(function (d) {
        var aggName = d[0];
        var aggConfig = d[1];
        var aggConfigKeys = Object.keys(aggConfig);
        var agg = aggConfigKeys[0];
        newAggList[aggName] = _objectSpread({}, aggConfig[agg], {
          agg: agg,
          aggName: aggName,
          dropDownName: ''
        });
      });
    }

    setAggList(newAggList);
    setAdvancedEditorConfigLastApplied(advancedEditorConfig);
    setAdvancedPivotEditorApplyButtonEnabled(false);
  };

  var toggleAdvancedEditor = function toggleAdvancedEditor() {
    setAdvancedEditorConfig(advancedEditorConfig);
    setAdvancedPivotEditorEnabled(!isAdvancedPivotEditorEnabled);
    setAdvancedPivotEditorApplyButtonEnabled(false);

    if (isAdvancedPivotEditorEnabled === false) {
      setAdvancedEditorConfigLastApplied(advancedEditorConfig);
    }
  }; // If switching to KQL after updating via editor - reset search


  var toggleAdvancedSourceEditor = function toggleAdvancedSourceEditor() {
    var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (reset === true) {
      setSearchQuery(defaultSearch);
      setSourceConfigUpdated(false);
    }

    if (isAdvancedSourceEditorEnabled === false) {
      setAdvancedEditorSourceConfigLastApplied(advancedEditorSourceConfig);
    }

    setAdvancedSourceEditorEnabled(!isAdvancedSourceEditorEnabled);
    setAdvancedSourceEditorApplyButtonEnabled(false);
  };

  var advancedEditorHelpText = _react.default.createElement(_react.Fragment, null, _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedEditorHelpText', {
    defaultMessage: 'The advanced editor allows you to edit the pivot configuration of the transform.'
  }), ' ', _react.default.createElement(_eui.EuiLink, {
    href: esTransformPivot,
    target: "_blank"
  }, _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedEditorHelpTextLink', {
    defaultMessage: 'Learn more about available options.'
  })));

  var advancedSourceEditorHelpText = _react.default.createElement(_react.Fragment, null, _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedSourceEditorHelpText', {
    defaultMessage: 'The advanced editor allows you to edit the source query clause of the transform.'
  }), ' ', _react.default.createElement(_eui.EuiLink, {
    href: esQueryDsl,
    target: "_blank"
  }, _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedEditorHelpTextLink', {
    defaultMessage: 'Learn more about available options.'
  })));

  var valid = pivotGroupByArr.length > 0 && pivotAggsArr.length > 0;
  (0, _react.useEffect)(function () {
    var previewRequestUpdate = (0, _common2.getPreviewRequestBody)(indexPattern.title, pivotQuery, pivotGroupByArr, pivotAggsArr);
    var stringifiedSourceConfigUpdate = JSON.stringify(previewRequestUpdate.source.query, null, 2);
    setAdvancedEditorSourceConfig(stringifiedSourceConfigUpdate);
    onChange({
      aggList: aggList,
      groupByList: groupByList,
      isAdvancedPivotEditorEnabled: isAdvancedPivotEditorEnabled,
      isAdvancedSourceEditorEnabled: isAdvancedSourceEditorEnabled,
      searchLanguage: searchLanguage,
      searchString: searchString,
      searchQuery: searchQuery,
      sourceConfigUpdated: sourceConfigUpdated,
      valid: valid
    }); // custom comparison

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [JSON.stringify(pivotAggsArr), JSON.stringify(pivotGroupByArr), isAdvancedPivotEditorEnabled, isAdvancedSourceEditorEnabled, searchLanguage, searchString, searchQuery, valid]); // TODO This should use the actual value of `indices.query.bool.max_clause_count`

  var maxIndexFields = 1024;
  var numIndexFields = indexPattern.fields.length;
  var disabledQuery = numIndexFields > maxIndexFields;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    className: "transform__stepDefineForm"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "transform__stepDefineFormLeftColumn"
  }, _react.default.createElement("div", {
    "data-test-subj": "transformStepDefineForm"
  }, _react.default.createElement(_eui.EuiForm, null, searchItems.savedSearch === undefined && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineForm.indexPatternLabel', {
      defaultMessage: 'Index pattern'
    }),
    helpText: disabledQuery ? _i18n.i18n.translate('xpack.transform.stepDefineForm.indexPatternHelpText', {
      defaultMessage: 'An optional query for this index pattern is not supported. The number of supported index fields is {maxIndexFields} whereas this index has {numIndexFields} fields.',
      values: {
        maxIndexFields: maxIndexFields,
        numIndexFields: numIndexFields
      }
    }) : ''
  }, _react.default.createElement("span", null, indexPattern.title)), !disabledQuery && _react.default.createElement(_react.Fragment, null, !isAdvancedSourceEditorEnabled && _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineForm.queryLabel', {
      defaultMessage: 'Query'
    }),
    helpText: _i18n.i18n.translate('xpack.transform.stepDefineForm.queryHelpText', {
      defaultMessage: 'Use a query to filter the source data (optional).'
    })
  }, _react.default.createElement(_eui.EuiInputPopover, {
    style: {
      maxWidth: '100%'
    },
    closePopover: function closePopover() {
      return setErrorMessage(undefined);
    },
    input: _react.default.createElement(_public.QueryStringInput, {
      bubbleSubmitEvent: true,
      query: searchInput,
      indexPatterns: [indexPattern],
      onChange: searchChangeHandler,
      onSubmit: searchSubmitHandler,
      placeholder: searchInput.language === QUERY_LANGUAGE_KUERY ? _i18n.i18n.translate('xpack.transform.stepDefineForm.queryPlaceholderKql', {
        defaultMessage: 'e.g. {example}',
        values: {
          example: 'method : "GET" or status : "404"'
        }
      }) : _i18n.i18n.translate('xpack.transform.stepDefineForm.queryPlaceholderLucene', {
        defaultMessage: 'e.g. {example}',
        values: {
          example: 'method:GET OR status:404'
        }
      }),
      disableAutoFocus: true,
      dataTestSubj: "transformQueryInput",
      languageSwitcherPopoverAnchorPosition: "rightDown"
    }),
    isOpen: (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.query) === searchInput.query && (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message) !== ''
  }, _react.default.createElement(_eui.EuiCode, null, _i18n.i18n.translate('xpack.transform.stepDefineForm.invalidKuerySyntaxErrorMessageQueryBar', {
    defaultMessage: 'Invalid query'
  }), ': ', errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message.split('\n')[0]))))), isAdvancedSourceEditorEnabled && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedSourceEditorLabel', {
      defaultMessage: 'Source query clause'
    }),
    helpText: advancedSourceEditorHelpText
  }, _react.default.createElement(_eui.EuiPanel, {
    grow: false,
    paddingSize: "none"
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    mode: "json",
    width: "100%",
    value: advancedEditorSourceConfig,
    onChange: function onChange(d) {
      setSearchString(undefined);
      setAdvancedEditorSourceConfig(d); // Disable the "Apply"-Button if the config hasn't changed.

      if (advancedEditorSourceConfigLastApplied === d) {
        setAdvancedSourceEditorApplyButtonEnabled(false);
        return;
      } // Try to parse the string passed on from the editor.
      // If parsing fails, the "Apply"-Button will be disabled


      try {
        JSON.parse(d);
        setAdvancedSourceEditorApplyButtonEnabled(true);
      } catch (e) {
        setAdvancedSourceEditorApplyButtonEnabled(false);
      }
    },
    setOptions: {
      fontSize: '12px'
    },
    theme: "textmate",
    "aria-label": _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedSourceEditorAriaLabel', {
      defaultMessage: 'Advanced query editor'
    })
  })))), searchItems.savedSearch === undefined && _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSwitch, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedEditorSourceConfigSwitchLabel', {
      defaultMessage: 'Advanced query editor'
    }),
    checked: isAdvancedSourceEditorEnabled,
    onChange: function onChange() {
      if (isAdvancedSourceEditorEnabled && sourceConfigUpdated) {
        setAdvancedSourceEditorSwitchModalVisible(true);
        return;
      }

      toggleAdvancedSourceEditor();
    },
    "data-test-subj": "transformAdvancedQueryEditorSwitch"
  }), isAdvancedSourceEditorSwitchModalVisible && _react.default.createElement(_switch_modal.SwitchModal, {
    onCancel: function onCancel() {
      return setAdvancedSourceEditorSwitchModalVisible(false);
    },
    onConfirm: function onConfirm() {
      setAdvancedSourceEditorSwitchModalVisible(false);
      toggleAdvancedSourceEditor(true);
    },
    type: 'source'
  })), isAdvancedSourceEditorEnabled && _react.default.createElement(_eui.EuiButton, {
    size: "s",
    fill: true,
    onClick: applyAdvancedSourceEditorChanges,
    disabled: !isAdvancedSourceEditorApplyButtonEnabled
  }, _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedSourceEditorApplyButtonText', {
    defaultMessage: 'Apply changes'
  })))), searchItems.savedSearch !== undefined && searchItems.savedSearch.id !== undefined && _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineForm.savedSearchLabel', {
      defaultMessage: 'Saved search'
    })
  }, _react.default.createElement("span", null, searchItems.savedSearch.title)), !isAdvancedPivotEditorEnabled && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineForm.groupByLabel', {
      defaultMessage: 'Group by'
    })
  }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_group_by_list.GroupByListForm, {
    list: groupByList,
    options: groupByOptionsData,
    onChange: updateGroupBy,
    deleteHandler: deleteGroupBy
  }), _react.default.createElement(_aggregation_dropdown.DropDown, {
    changeHandler: addGroupBy,
    options: groupByOptions,
    placeholder: _i18n.i18n.translate('xpack.transform.stepDefineForm.groupByPlaceholder', {
      defaultMessage: 'Add a group by field ...'
    }),
    testSubj: "transformGroupBySelection"
  }))), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineForm.aggregationsLabel', {
      defaultMessage: 'Aggregations'
    })
  }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_aggregation_list.AggListForm, {
    list: aggList,
    options: aggOptionsData,
    onChange: updateAggregation,
    deleteHandler: deleteAggregation
  }), _react.default.createElement(_aggregation_dropdown.DropDown, {
    changeHandler: addAggregation,
    options: aggOptions,
    placeholder: _i18n.i18n.translate('xpack.transform.stepDefineForm.aggregationsPlaceholder', {
      defaultMessage: 'Add an aggregation ...'
    }),
    testSubj: "transformAggregationSelection"
  })))), isAdvancedPivotEditorEnabled && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedEditorLabel', {
      defaultMessage: 'Pivot configuration object'
    }),
    helpText: advancedEditorHelpText
  }, _react.default.createElement(_eui.EuiPanel, {
    grow: false,
    paddingSize: "none"
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    "data-test-subj": "transformAdvancedPivotEditor",
    mode: _use_x_json_mode.xJsonMode,
    width: "100%",
    value: advancedEditorConfig,
    onChange: function onChange(d) {
      setAdvancedEditorConfig(d); // Disable the "Apply"-Button if the config hasn't changed.

      if (advancedEditorConfigLastApplied === d) {
        setAdvancedPivotEditorApplyButtonEnabled(false);
        return;
      } // Try to parse the string passed on from the editor.
      // If parsing fails, the "Apply"-Button will be disabled


      try {
        JSON.parse(convertToJson(d));
        setAdvancedPivotEditorApplyButtonEnabled(true);
      } catch (e) {
        setAdvancedPivotEditorApplyButtonEnabled(false);
      }
    },
    setOptions: {
      fontSize: '12px'
    },
    theme: "textmate",
    "aria-label": _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedEditorAriaLabel', {
      defaultMessage: 'Advanced pivot editor'
    })
  })))), _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSwitch, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedEditorSwitchLabel', {
      defaultMessage: 'Advanced pivot editor'
    }),
    checked: isAdvancedPivotEditorEnabled,
    onChange: function onChange() {
      if (isAdvancedPivotEditorEnabled && (isAdvancedPivotEditorApplyButtonEnabled || advancedEditorConfig !== advancedEditorConfigLastApplied)) {
        setAdvancedEditorSwitchModalVisible(true);
        return;
      }

      toggleAdvancedEditor();
    },
    "data-test-subj": "transformAdvancedPivotEditorSwitch"
  }), isAdvancedEditorSwitchModalVisible && _react.default.createElement(_switch_modal.SwitchModal, {
    onCancel: function onCancel() {
      return setAdvancedEditorSwitchModalVisible(false);
    },
    onConfirm: function onConfirm() {
      setAdvancedEditorSwitchModalVisible(false);
      toggleAdvancedEditor();
    },
    type: 'pivot'
  })), isAdvancedPivotEditorEnabled && _react.default.createElement(_eui.EuiButton, {
    size: "s",
    fill: true,
    onClick: applyAdvancedPivotEditorChanges,
    disabled: !isAdvancedPivotEditorApplyButtonEnabled
  }, _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedEditorApplyButtonText', {
    defaultMessage: 'Apply changes'
  })))), !valid && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFormHelpText, {
    style: {
      maxWidth: '320px'
    }
  }, _i18n.i18n.translate('xpack.transform.stepDefineForm.formHelp', {
    defaultMessage: 'Transforms are scalable and automated processes for pivoting. Choose at least one group-by and aggregation to get started.'
  })))))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      maxWidth: 'calc(100% - 468px)'
    }
  }, _react.default.createElement(_source_index_preview.SourceIndexPreview, {
    indexPattern: searchItems.indexPattern,
    query: pivotQuery
  }), _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_pivot_preview.PivotPreview, {
    aggs: aggList,
    groupBy: groupByList,
    indexPatternTitle: searchItems.indexPattern.title,
    query: pivotQuery
  })));
});

exports.StepDefineForm = StepDefineForm;