"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckupControls = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _types = require("../../types");

var _filter_bar = require("./filter_bar");

var _group_by_bar = require("./group_by_bar");

var _utils = require("../../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CheckupControls = function CheckupControls(_ref) {
  var allDeprecations = _ref.allDeprecations,
      loadingState = _ref.loadingState,
      loadData = _ref.loadData,
      currentFilter = _ref.currentFilter,
      onFilterChange = _ref.onFilterChange,
      onSearchChange = _ref.onSearchChange,
      availableGroupByOptions = _ref.availableGroupByOptions,
      currentGroupBy = _ref.currentGroupBy,
      onGroupByChange = _ref.onGroupByChange;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      searchTermError = _useState2[0],
      setSearchTermError = _useState2[1];

  var filterInvalid = Boolean(searchTermError);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    wrap: true,
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldSearch, {
    isInvalid: filterInvalid,
    "aria-label": _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.controls.searchBarPlaceholderAriaLabel', {
      defaultMessage: 'Filter'
    }),
    placeholder: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.controls.searchBarPlaceholder', {
      defaultMessage: 'Filter'
    }),
    onChange: function onChange(e) {
      var string = e.target.value;
      var errorMessage = (0, _utils.validateRegExpString)(string);

      if (errorMessage) {
        // Emit an empty search term to listeners if search term is invalid.
        onSearchChange('');
        setSearchTermError(errorMessage);
      } else {
        onSearchChange(e.target.value);

        if (searchTermError) {
          setSearchTermError(null);
        }
      }
    }
  })), _react.default.createElement(_filter_bar.FilterBar, {
    allDeprecations: allDeprecations,
    currentFilter: currentFilter,
    onFilterChange: onFilterChange
  }), _react.default.createElement(_group_by_bar.GroupByBar, {
    availableGroupByOptions: availableGroupByOptions,
    currentGroupBy: currentGroupBy,
    onGroupByChange: onGroupByChange
  }), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    onClick: loadData,
    iconType: "refresh",
    isLoading: loadingState === _types.LoadingState.Loading
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.checkupTab.controls.refreshButtonLabel",
    defaultMessage: "Refresh"
  }))))), filterInvalid && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiCallOut, {
    color: "danger",
    title: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.controls.filterErrorMessageLabel', {
      defaultMessage: 'Filter invalid: {searchTermError}',
      values: {
        searchTermError: searchTermError
      }
    }),
    iconType: "faceSad"
  })));
};

exports.CheckupControls = CheckupControls;