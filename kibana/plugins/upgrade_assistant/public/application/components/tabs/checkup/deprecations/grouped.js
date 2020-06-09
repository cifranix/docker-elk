"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupedDeprecations = exports.DeprecationAccordion = exports.filterDeps = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _types = require("../../../types");

var _count_summary = require("./count_summary");

var _health = require("./health");

var _list = require("./list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// exported only for testing
var filterDeps = function filterDeps(level) {
  var search = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var conditions = [];

  if (level !== _types.LevelFilterOption.all) {
    conditions.push(function (dep) {
      return dep.level === level;
    });
  }

  if (search.length > 0) {
    // Change everything to lower case for a case-insensitive comparison
    conditions.push(function (dep) {
      try {
        var searchReg = new RegExp(search.toLowerCase());
        return Boolean(dep.message.toLowerCase().match(searchReg) || dep.details && dep.details.toLowerCase().match(searchReg) || dep.index && dep.index.toLowerCase().match(searchReg) || dep.node && dep.node.toLowerCase().match(searchReg));
      } catch (e) {
        // ignore any regexp errors.
        return true;
      }
    });
  } // Return true if every condition function returns true (boolean AND)


  return function (dep) {
    return conditions.map(function (c) {
      return c(dep);
    }).every(function (t) {
      return t;
    });
  };
};
/**
 * A single accordion item for a grouped deprecation item.
 */


exports.filterDeps = filterDeps;

var DeprecationAccordion = function DeprecationAccordion(_ref) {
  var id = _ref.id,
      deprecations = _ref.deprecations,
      title = _ref.title,
      currentGroupBy = _ref.currentGroupBy,
      forceExpand = _ref.forceExpand;
  var hasIndices = Boolean(currentGroupBy === _types.GroupByOption.message && deprecations.filter(function (d) {
    return d.index;
  }).length);
  var numIndices = hasIndices ? deprecations.length : null;
  return _react.default.createElement(_eui.EuiAccordion, {
    id: id,
    className: "upgDeprecations__item",
    initialIsOpen: forceExpand,
    buttonContent: _react.default.createElement("span", {
      className: "upgDeprecations__itemName"
    }, title),
    extraAction: _react.default.createElement("div", null, hasIndices && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiBadge, {
      color: "hollow"
    }, _react.default.createElement("span", {
      "data-test-subj": "indexCount"
    }, numIndices), ' ', _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.upgradeAssistant.checkupTab.indicesBadgeLabel",
      defaultMessage: "{numIndices, plural, one {index} other {indices}}",
      values: {
        numIndices: numIndices
      }
    })), "\u2003"), _react.default.createElement(_health.DeprecationHealth, {
      single: currentGroupBy === _types.GroupByOption.message,
      deprecations: deprecations
    }))
  }, _react.default.createElement(_list.DeprecationList, {
    deprecations: deprecations,
    currentGroupBy: currentGroupBy
  }));
};

exports.DeprecationAccordion = DeprecationAccordion;
var PER_PAGE = 25;
/**
 * Collection of calculated fields based on props, extracted for reuse in
 * `render` and `getDerivedStateFromProps`.
 */

var CalcFields = {
  filteredDeprecations: function filteredDeprecations(props) {
    var _props$allDeprecation = props.allDeprecations,
        allDeprecations = _props$allDeprecation === void 0 ? [] : _props$allDeprecation,
        currentFilter = props.currentFilter,
        search = props.search;
    return allDeprecations.filter(filterDeps(currentFilter, search));
  },
  groups: function groups(props) {
    var currentGroupBy = props.currentGroupBy;
    return (0, _lodash.groupBy)(CalcFields.filteredDeprecations(props), currentGroupBy);
  },
  numPages: function numPages(props) {
    return Math.ceil(Object.keys(CalcFields.groups(props)).length / PER_PAGE);
  }
};
/**
 * Displays groups of deprecation messages in an accordion.
 */

var GroupedDeprecations =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GroupedDeprecations, _React$Component);

  function GroupedDeprecations() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GroupedDeprecations);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GroupedDeprecations)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      forceExpand: false,
      // `expandNumber` is used as workaround to force EuiAccordion to re-render by
      // incrementing this number (used as a key) when expand all or collapse all is clicked.
      expandNumber: 0,
      currentPage: 0
    });

    _defineProperty(_assertThisInitialized(_this), "setExpand", function (forceExpand) {
      _this.setState({
        forceExpand: forceExpand,
        expandNumber: _this.state.expandNumber + 1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setPage", function (currentPage) {
      return _this.setState({
        currentPage: currentPage
      });
    });

    return _this;
  }

  _createClass(GroupedDeprecations, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          currentGroupBy = _this$props.currentGroupBy,
          _this$props$allDeprec = _this$props.allDeprecations,
          allDeprecations = _this$props$allDeprec === void 0 ? [] : _this$props$allDeprec;
      var _this$state = this.state,
          forceExpand = _this$state.forceExpand,
          expandNumber = _this$state.expandNumber,
          currentPage = _this$state.currentPage;
      var filteredDeprecations = CalcFields.filteredDeprecations(this.props);
      var groups = CalcFields.groups(this.props);
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
        responsive: false,
        alignItems: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        flush: "left",
        size: "s",
        onClick: function onClick() {
          return _this2.setExpand(true);
        },
        "data-test-subj": "expandAll"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.controls.expandAllButtonLabel",
        defaultMessage: "Expand all"
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        flush: "left",
        size: "s",
        onClick: function onClick() {
          return _this2.setExpand(false);
        },
        "data-test-subj": "collapseAll"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.controls.collapseAllButtonLabel",
        defaultMessage: "Collapse all"
      }))), _react.default.createElement(_eui.EuiFlexItem, null), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_count_summary.DeprecationCountSummary, {
        allDeprecations: allDeprecations,
        deprecations: filteredDeprecations
      }))), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement("div", {
        className: "upgDeprecations"
      }, Object.keys(groups).sort() // Apply pagination
      .slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE).map(function (groupName) {
        return [_react.default.createElement(DeprecationAccordion, _extends({
          key: expandNumber,
          id: "depgroup-".concat(groupName),
          title: groupName,
          deprecations: groups[groupName]
        }, {
          currentGroupBy: currentGroupBy,
          forceExpand: forceExpand
        }))];
      }), Object.keys(groups).length > PER_PAGE && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceAround"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiPagination, {
        pageCount: CalcFields.numPages(this.props),
        activePage: currentPage,
        onPageClick: this.setPage
      }))))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, _ref2) {
      var currentPage = _ref2.currentPage;

      // If filters change and the currentPage is now bigger than the num of pages we're going to show,
      // reset the current page to 0.
      if (currentPage >= CalcFields.numPages(nextProps)) {
        return {
          currentPage: 0
        };
      } else {
        return null;
      }
    }
  }]);

  return GroupedDeprecations;
}(_react.default.Component);

exports.GroupedDeprecations = GroupedDeprecations;