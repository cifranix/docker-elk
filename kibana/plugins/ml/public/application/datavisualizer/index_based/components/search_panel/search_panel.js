"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _search = require("../../../../../../common/constants/search");

var _public = require("../../../../../../../../../src/plugins/data/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var searchSizeOptions = [1000, 5000, 10000, 100000, -1].map(function (v) {
  return {
    value: String(v),
    inputDisplay: v > 0 ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.datavisualizer.searchPanel.sampleSizeOptionLabel",
      defaultMessage: "Sample size (per shard): {wrappedValue}",
      values: {
        wrappedValue: _react.default.createElement("b", null, v)
      }
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.datavisualizer.searchPanel.allOptionLabel",
      defaultMessage: "Search all"
    })
  };
});

var SearchPanel = function SearchPanel(_ref) {
  var indexPattern = _ref.indexPattern,
      searchString = _ref.searchString,
      setSearchString = _ref.setSearchString,
      searchQuery = _ref.searchQuery,
      setSearchQuery = _ref.setSearchQuery,
      searchQueryLanguage = _ref.searchQueryLanguage,
      setSearchQueryLanguage = _ref.setSearchQueryLanguage,
      samplerShardSize = _ref.samplerShardSize,
      setSamplerShardSize = _ref.setSamplerShardSize,
      totalCount = _ref.totalCount;

  // The internal state of the input query bar updated on every key stroke.
  var _useState = (0, _react.useState)({
    query: searchString || '',
    language: searchQueryLanguage
  }),
      _useState2 = _slicedToArray(_useState, 2),
      searchInput = _useState2[0],
      setSearchInput = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      errorMessage = _useState4[0],
      setErrorMessage = _useState4[1];

  var searchHandler = function searchHandler(query) {
    var filterQuery;

    try {
      if (query.language === _search.SEARCH_QUERY_LANGUAGE.KUERY) {
        filterQuery = _public.esKuery.toElasticsearchQuery(_public.esKuery.fromKueryExpression(query.query), indexPattern);
      } else if (query.language === _search.SEARCH_QUERY_LANGUAGE.LUCENE) {
        filterQuery = _public.esQuery.luceneStringToDsl(query.query);
      } else {
        filterQuery = {};
      }

      setSearchQuery(filterQuery);
      setSearchString(query.query);
      setSearchQueryLanguage(query.language);
    } catch (e) {
      console.log('Invalid syntax', JSON.stringify(e, null, 2)); // eslint-disable-line no-console

      setErrorMessage({
        query: query.query,
        message: e.message
      });
    }
  };

  var searchChangeHandler = function searchChangeHandler(query) {
    return setSearchInput(query);
  };

  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    alignItems: "center",
    "data-test-subj": "mlDataVisualizerSearchPanel"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiInputPopover, {
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
      onSubmit: searchHandler,
      placeholder: _i18n.i18n.translate('xpack.ml.datavisualizer.searchPanel.queryBarPlaceholderText', {
        defaultMessage: 'Search… (e.g. status:200 AND extension:"PHP")'
      }),
      disableAutoFocus: true,
      dataTestSubj: "transformQueryInput",
      languageSwitcherPopoverAnchorPosition: "rightDown"
    }),
    isOpen: (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.query) === searchInput.query && (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message) !== ''
  }, _react.default.createElement(_eui.EuiCode, null, _i18n.i18n.translate('xpack.ml.datavisualizer.searchPanel.invalidKuerySyntaxErrorMessageQueryBar', {
    defaultMessage: 'Invalid query'
  }), ': ', errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message.split('\n')[0]))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      width: 270
    }
  }, _react.default.createElement(_eui.EuiSuperSelect, {
    options: searchSizeOptions,
    valueOfSelected: String(samplerShardSize),
    onChange: function onChange(value) {
      return setSamplerShardSize(+value);
    },
    "aria-label": _i18n.i18n.translate('xpack.ml.datavisualizer.searchPanel.sampleSizeAriaLabel', {
      defaultMessage: 'Select number of documents to sample'
    }),
    "data-test-subj": "mlDataVisualizerShardSizeSelect"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIconTip, {
    content: _i18n.i18n.translate('xpack.ml.datavisualizer.searchPanel.queryBarPlaceholder', {
      defaultMessage: 'Selecting a smaller sample size will reduce query run times and the load on the cluster.'
    }),
    position: "right"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.datavisualizer.searchPanel.documentsPerShardLabel",
    defaultMessage: "Total documents: {wrappedTotalCount}",
    values: {
      wrappedTotalCount: _react.default.createElement("b", {
        "data-test-subj": "mlDataVisualizerTotalDocCount"
      }, totalCount)
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }));
};

exports.SearchPanel = SearchPanel;