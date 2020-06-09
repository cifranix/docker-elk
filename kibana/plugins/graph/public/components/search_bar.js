"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchBarComponent = SearchBarComponent;
exports.SearchBar = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _reactRedux = require("react-redux");

var _source_modal = require("../services/source_modal");

var _state_management = require("../state_management");

var _public = require("../../../../../src/plugins/kibana_react/public");

var _public2 = require("../../../../../src/plugins/data/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function queryToString(query, indexPattern) {
  if (query.language === 'kuery' && typeof query.query === 'string') {
    var dsl = _public2.esKuery.toElasticsearchQuery(_public2.esKuery.fromKueryExpression(query.query), indexPattern); // JSON representation of query will be handled by existing logic.
    // TODO clean this up and handle it in the data fetch layer once
    // it moved to typescript.


    return JSON.stringify(dsl);
  }

  if (typeof query.query === 'string') {
    return query.query;
  }

  return JSON.stringify(query.query);
}

function SearchBarComponent(props) {
  var currentDatasource = props.currentDatasource,
      onQuerySubmit = props.onQuerySubmit,
      isLoading = props.isLoading,
      onIndexPatternSelected = props.onIndexPatternSelected,
      initialQuery = props.initialQuery,
      indexPatternProvider = props.indexPatternProvider,
      confirmWipeWorkspace = props.confirmWipeWorkspace;

  var _useState = (0, _react.useState)({
    language: 'kuery',
    query: initialQuery || ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      query = _useState2[0],
      setQuery = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      currentIndexPattern = _useState4[0],
      setCurrentIndexPattern = _useState4[1];

  (0, _react.useEffect)(function () {
    function fetchPattern() {
      return _fetchPattern.apply(this, arguments);
    }

    function _fetchPattern() {
      _fetchPattern = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!currentDatasource) {
                  _context.next = 8;
                  break;
                }

                _context.t0 = setCurrentIndexPattern;
                _context.next = 4;
                return indexPatternProvider.get(currentDatasource.id);

              case 4:
                _context.t1 = _context.sent;
                (0, _context.t0)(_context.t1);
                _context.next = 9;
                break;

              case 8:
                setCurrentIndexPattern(undefined);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _fetchPattern.apply(this, arguments);
    }

    fetchPattern();
  }, [currentDatasource, indexPatternProvider]);
  var kibana = (0, _public.useKibana)();
  var services = kibana.services,
      overlays = kibana.overlays;
  var savedObjects = services.savedObjects,
      uiSettings = services.uiSettings;
  if (!overlays) return null;
  return _react.default.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();

      if (!isLoading && currentIndexPattern) {
        onQuerySubmit(queryToString(query, currentIndexPattern));
      }
    }
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_public2.QueryStringInput, {
    disableAutoFocus: true,
    bubbleSubmitEvent: true,
    indexPatterns: currentIndexPattern ? [currentIndexPattern] : [],
    placeholder: _i18n.i18n.translate('xpack.graph.bar.searchFieldPlaceholder', {
      defaultMessage: 'Search your data and add to graph'
    }),
    query: query,
    prepend: _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.graph.bar.pickSourceTooltip', {
        defaultMessage: 'Select a data source to begin graphing relationships.'
      })
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      size: "xs",
      className: "gphSearchBar__datasourceButton",
      "data-test-subj": "graphDatasourceButton",
      onClick: function onClick() {
        confirmWipeWorkspace(function () {
          return (0, _source_modal.openSourceModal)({
            overlays: overlays,
            savedObjects: savedObjects,
            uiSettings: uiSettings
          }, onIndexPatternSelected);
        }, _i18n.i18n.translate('xpack.graph.clearWorkspace.confirmText', {
          defaultMessage: 'If you change data sources, your current fields and vertices will be reset.'
        }), {
          confirmButtonText: _i18n.i18n.translate('xpack.graph.clearWorkspace.confirmButtonLabel', {
            defaultMessage: 'Change data source'
          }),
          title: _i18n.i18n.translate('xpack.graph.clearWorkspace.modalTitle', {
            defaultMessage: 'Unsaved changes'
          })
        });
      }
    }, currentIndexPattern ? currentIndexPattern.title : // This branch will be shown if the user exits the
    // initial picker modal
    _i18n.i18n.translate('xpack.graph.bar.pickSourceLabel', {
      defaultMessage: 'Select a data source'
    }))),
    onChange: setQuery
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    type: "submit",
    disabled: isLoading || !currentIndexPattern,
    "data-test-subj": "graph-explore-button"
  }, _i18n.i18n.translate('xpack.graph.bar.exploreLabel', {
    defaultMessage: 'Graph'
  })))));
}

var SearchBar = (0, _reactRedux.connect)(function (state) {
  var datasource = (0, _state_management.datasourceSelector)(state);
  return {
    currentDatasource: datasource.current.type === 'indexpattern' ? datasource.current : undefined
  };
}, function (dispatch) {
  return {
    onIndexPatternSelected: function onIndexPatternSelected(indexPattern) {
      dispatch((0, _state_management.requestDatasource)({
        type: 'indexpattern',
        id: indexPattern.id,
        title: indexPattern.attributes.title
      }));
    }
  };
})(SearchBarComponent);
exports.SearchBar = SearchBar;