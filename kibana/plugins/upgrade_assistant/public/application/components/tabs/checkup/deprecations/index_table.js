"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexDeprecationTable = exports.IndexDeprecationTableUI = void 0;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _button = require("./default_fields/button");

var _reindex = require("./reindex");

var _app_context = require("../../../../app_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PAGE_SIZES = [10, 25, 50, 100, 250, 500, 1000];

var IndexDeprecationTableUI =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IndexDeprecationTableUI, _React$Component);

  function IndexDeprecationTableUI(props) {
    var _this;

    _classCallCheck(this, IndexDeprecationTableUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IndexDeprecationTableUI).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onTableChange", function (tableProps) {
      _this.setState({
        sortField: tableProps.sort.field,
        sortDirection: tableProps.sort.direction,
        pageIndex: tableProps.page.index,
        pageSize: tableProps.page.size
      });
    });

    _this.state = {
      sortField: 'index',
      sortDirection: 'asc',
      pageIndex: 0,
      pageSize: 10
    };
    return _this;
  }

  _createClass(IndexDeprecationTableUI, [{
    key: "render",
    value: function render() {
      var intl = this.props.intl;
      var _this$state = this.state,
          pageIndex = _this$state.pageIndex,
          pageSize = _this$state.pageSize,
          sortField = _this$state.sortField,
          sortDirection = _this$state.sortDirection;
      var columns = [{
        field: 'index',
        name: intl.formatMessage({
          id: 'xpack.upgradeAssistant.checkupTab.deprecations.indexTable.indexColumnLabel',
          defaultMessage: 'Index'
        }),
        sortable: true
      }, {
        field: 'details',
        name: intl.formatMessage({
          id: 'xpack.upgradeAssistant.checkupTab.deprecations.indexTable.detailsColumnLabel',
          defaultMessage: 'Details'
        })
      }];
      var actionsColumn = this.generateActionsColumn();

      if (actionsColumn) {
        columns.push(actionsColumn);
      }

      var sorting = {
        sort: {
          field: sortField,
          direction: sortDirection
        }
      };

      var pagination = _objectSpread({
        pageIndex: pageIndex,
        pageSize: pageSize
      }, this.pageSizeOptions());

      return _react.default.createElement(_eui.EuiBasicTable, {
        items: this.getRows(),
        columns: columns,
        sorting: sorting,
        pagination: pagination,
        onChange: this.onTableChange,
        hasActions: false
      });
    }
  }, {
    key: "getRows",
    value: function getRows() {
      var _this$state2 = this.state,
          sortField = _this$state2.sortField,
          sortDirection = _this$state2.sortDirection,
          pageIndex = _this$state2.pageIndex,
          pageSize = _this$state2.pageSize;
      var indices = this.props.indices;
      var sorted = (0, _lodash.sortBy)(indices, sortField);

      if (sortDirection === 'desc') {
        sorted = sorted.reverse();
      }

      var start = pageIndex * pageSize;
      return sorted.slice(start, start + pageSize);
    }
  }, {
    key: "pageSizeOptions",
    value: function pageSizeOptions() {
      var indices = this.props.indices;
      var totalItemCount = indices.length; // If we only have that smallest page size, don't show any page size options.

      if (totalItemCount <= PAGE_SIZES[0]) {
        return {
          totalItemCount: totalItemCount,
          pageSizeOptions: [],
          hidePerPageOptions: true
        };
      } // Keep a size option if the # of items is larger than the previous option.
      // This avoids having a long list of useless page sizes.


      var pageSizeOptions = PAGE_SIZES.filter(function (perPage, idx) {
        return idx === 0 || totalItemCount > PAGE_SIZES[idx - 1];
      });
      return {
        totalItemCount: totalItemCount,
        pageSizeOptions: pageSizeOptions,
        hidePerPageOptions: false
      };
    }
  }, {
    key: "generateActionsColumn",
    value: function generateActionsColumn() {
      // NOTE: this naive implementation assumes all indices in the table are
      // should show the reindex button. This should work for known usecases.
      var indices = this.props.indices;
      var showReindexButton = indices.find(function (i) {
        return i.reindex === true;
      });
      var showNeedsDefaultFieldsButton = indices.find(function (i) {
        return i.needsDefaultFields === true;
      });

      if (!showReindexButton && !showNeedsDefaultFieldsButton) {
        return null;
      }

      return {
        actions: [{
          render: function render(indexDep) {
            if (showReindexButton) {
              return _react.default.createElement(_app_context.AppContext.Consumer, null, function (_ref) {
                var http = _ref.http,
                    docLinks = _ref.docLinks;
                return _react.default.createElement(_reindex.ReindexButton, {
                  docLinks: docLinks,
                  reindexBlocker: indexDep.blockerForReindexing,
                  indexName: indexDep.index,
                  http: http
                });
              });
            } else {
              return _react.default.createElement(_app_context.AppContext.Consumer, null, function (_ref2) {
                var http = _ref2.http;
                return _react.default.createElement(_button.FixDefaultFieldsButton, {
                  indexName: indexDep.index,
                  http: http
                });
              });
            }
          }
        }]
      };
    }
  }]);

  return IndexDeprecationTableUI;
}(_react.default.Component);

exports.IndexDeprecationTableUI = IndexDeprecationTableUI;
var IndexDeprecationTable = (0, _react2.injectI18n)(IndexDeprecationTableUI);
exports.IndexDeprecationTable = IndexDeprecationTable;