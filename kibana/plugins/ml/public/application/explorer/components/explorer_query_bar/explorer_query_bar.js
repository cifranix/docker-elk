"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKqlQueryValues = getKqlQueryValues;
exports.ExplorerQueryBar = exports.DEFAULT_QUERY_LANG = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../../src/plugins/data/public");

var _search = require("../../../../../common/constants/search");

var _explorer_dashboard_service = require("../../explorer_dashboard_service");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_QUERY_LANG = _search.SEARCH_QUERY_LANGUAGE.KUERY;
exports.DEFAULT_QUERY_LANG = DEFAULT_QUERY_LANG;

function getKqlQueryValues(_ref) {
  var _influencersFilterQue;

  var inputString = _ref.inputString,
      queryLanguage = _ref.queryLanguage,
      indexPattern = _ref.indexPattern;
  var influencersFilterQuery = {};
  var filteredFields = [];

  var ast = _public.esKuery.fromKueryExpression(inputString);

  var isAndOperator = ast && ast.function === 'and'; // if ast.type == 'function' then layout of ast.arguments:
  // [{ arguments: [ { type: 'literal', value: 'AAL' } ] },{ arguments: [ { type: 'literal', value: 'AAL' } ] }]

  if (ast && Array.isArray(ast.arguments)) {
    ast.arguments.forEach(function (arg) {
      if (arg.arguments !== undefined) {
        arg.arguments.forEach(function (nestedArg) {
          if (typeof nestedArg.value === 'string') {
            filteredFields.push(nestedArg.value);
          }
        });
      } else if (typeof arg.value === 'string') {
        filteredFields.push(arg.value);
      }
    });
  }

  if (queryLanguage === _search.SEARCH_QUERY_LANGUAGE.KUERY) {
    influencersFilterQuery = _public.esKuery.toElasticsearchQuery(_public.esKuery.fromKueryExpression(inputString), indexPattern);
  } else if (queryLanguage === _search.SEARCH_QUERY_LANGUAGE.LUCENE) {
    influencersFilterQuery = _public.esQuery.luceneStringToDsl(inputString);
  }

  var clearSettings = ((_influencersFilterQue = influencersFilterQuery) === null || _influencersFilterQue === void 0 ? void 0 : _influencersFilterQue.match_all) && Object.keys(influencersFilterQuery.match_all).length === 0;
  return {
    clearSettings: clearSettings,
    settings: {
      filterQuery: influencersFilterQuery,
      queryString: inputString,
      tableQueryString: inputString,
      isAndOperator: isAndOperator,
      filteredFields: filteredFields
    }
  };
}

function getInitSearchInputState(_ref2) {
  var filterActive = _ref2.filterActive,
      queryString = _ref2.queryString;

  if (queryString !== undefined && filterActive === true) {
    return {
      language: _search.SEARCH_QUERY_LANGUAGE.KUERY,
      query: queryString
    };
  } else {
    return {
      query: '',
      language: DEFAULT_QUERY_LANG
    };
  }
}

var ExplorerQueryBar = function ExplorerQueryBar(_ref3) {
  var filterActive = _ref3.filterActive,
      filterIconTriggeredQuery = _ref3.filterIconTriggeredQuery,
      filterPlaceHolder = _ref3.filterPlaceHolder,
      indexPattern = _ref3.indexPattern,
      queryString = _ref3.queryString,
      updateLanguage = _ref3.updateLanguage;

  // The internal state of the input query bar updated on every key stroke.
  var _useState = (0, _react.useState)(getInitSearchInputState({
    filterActive: filterActive,
    queryString: queryString
  })),
      _useState2 = _slicedToArray(_useState, 2),
      searchInput = _useState2[0],
      setSearchInput = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      errorMessage = _useState4[0],
      setErrorMessage = _useState4[1];

  (0, _react.useEffect)(function () {
    if (filterIconTriggeredQuery !== undefined) {
      setSearchInput({
        language: searchInput.language,
        query: filterIconTriggeredQuery
      });
    }
  }, [filterIconTriggeredQuery]);

  var searchChangeHandler = function searchChangeHandler(query) {
    if (searchInput.language !== query.language) {
      updateLanguage(query.language);
    }

    setSearchInput(query);
  };

  var applyInfluencersFilterQuery = function applyInfluencersFilterQuery(query) {
    try {
      var _getKqlQueryValues = getKqlQueryValues({
        inputString: query.query,
        queryLanguage: query.language,
        indexPattern: indexPattern
      }),
          clearSettings = _getKqlQueryValues.clearSettings,
          settings = _getKqlQueryValues.settings;

      if (clearSettings === true) {
        _explorer_dashboard_service.explorerService.clearInfluencerFilterSettings();
      } else {
        _explorer_dashboard_service.explorerService.setInfluencerFilterSettings(settings);
      }
    } catch (e) {
      console.log('Invalid query syntax in search bar', e); // eslint-disable-line no-console

      setErrorMessage({
        query: query.query,
        message: e.message
      });
    }
  };

  return _react.default.createElement(_eui.EuiInputPopover, {
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
      onSubmit: applyInfluencersFilterQuery,
      placeholder: filterPlaceHolder,
      disableAutoFocus: true,
      dataTestSubj: "explorerQueryInput",
      languageSwitcherPopoverAnchorPosition: "rightDown"
    }),
    isOpen: (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.query) === searchInput.query && (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message) !== ''
  }, _react.default.createElement(_eui.EuiCode, null, _i18n.i18n.translate('xpack.ml.explorer.invalidKuerySyntaxErrorMessageQueryBar', {
    defaultMessage: 'Invalid query'
  }), ': ', errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message.split('\n')[0]));
};

exports.ExplorerQueryBar = ExplorerQueryBar;