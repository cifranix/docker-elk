"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mlInMemoryTableFactory = mlInMemoryTableFactory;
exports.ProgressBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _types = require("./types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// The built in loading progress bar of EuiInMemoryTable causes a full DOM replacement
// of the table and doesn't play well with auto-refreshing. That's why we're displaying
// our own progress bar on top of the table. `EuiProgress` after `isLoading` displays
// the loading indicator. The variation after `!isLoading` displays an empty progress
// bar fixed to 0%. Without it, the display would vertically jump when showing/hiding
// the progress bar.
var ProgressBar = function ProgressBar(_ref) {
  var _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading;
  return _react.default.createElement(_react.Fragment, null, isLoading && _react.default.createElement(_eui.EuiProgress, {
    className: "mlAnalyticsProgressBar",
    size: "xs",
    color: "primary"
  }), !isLoading && _react.default.createElement(_eui.EuiProgress, {
    className: "mlAnalyticsProgressBar",
    value: 0,
    max: 100,
    size: "xs"
  }));
}; // copied from EUI to be available to the extended getDerivedStateFromProps()


exports.ProgressBar = ProgressBar;

function findColumnByProp(columns, prop, value) {
  for (var i = 0; i < columns.length; i++) {
    var column = columns[i];

    if (column[prop] === value) {
      return column;
    }
  }
} // copied from EUI to be available to the extended getDerivedStateFromProps()


var getInitialSorting = function getInitialSorting(columns, sorting) {
  if (!sorting || !sorting.sort) {
    return {
      sortName: undefined,
      sortDirection: undefined
    };
  }

  var _sorting$sort = sorting.sort,
      sortable = _sorting$sort.field,
      sortDirection = _sorting$sort.direction; // sortable could be a column's `field` or its `name`
  // for backwards compatibility `field` must be checked first

  var sortColumn = findColumnByProp(columns, 'field', sortable);

  if (sortColumn == null) {
    sortColumn = findColumnByProp(columns, 'name', sortable);
  }

  if (sortColumn == null) {
    return {
      sortName: undefined,
      sortDirection: undefined
    };
  }

  var sortName = sortColumn.name;
  return {
    sortName: sortName,
    sortDirection: sortDirection
  };
};

function mlInMemoryTableFactory() {
  var MlInMemoryTableBasic = (0, _types.mlInMemoryTableBasicFactory)();
  return (
    /*#__PURE__*/
    function (_MlInMemoryTableBasic) {
      _inherits(MlInMemoryTable, _MlInMemoryTableBasic);

      function MlInMemoryTable() {
        _classCallCheck(this, MlInMemoryTable);

        return _possibleConstructorReturn(this, _getPrototypeOf(MlInMemoryTable).apply(this, arguments));
      }

      _createClass(MlInMemoryTable, null, [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(nextProps, prevState) {
          var derivedState = _objectSpread({}, prevState.prevProps, {
            pageIndex: nextProps.pagination.initialPageIndex,
            pageSize: nextProps.pagination.initialPageSize
          });

          if (nextProps.items !== prevState.prevProps.items) {
            Object.assign(derivedState, {
              prevProps: {
                items: nextProps.items
              }
            });
          }

          var _getInitialSorting = getInitialSorting(nextProps.columns, nextProps.sorting),
              sortName = _getInitialSorting.sortName,
              sortDirection = _getInitialSorting.sortDirection;

          if (sortName !== prevState.prevProps.sortName || sortDirection !== prevState.prevProps.sortDirection) {
            Object.assign(derivedState, {
              sortName: sortName,
              sortDirection: sortDirection
            });
          }

          return derivedState;
        }
      }]);

      return MlInMemoryTable;
    }(MlInMemoryTableBasic)
  );
}