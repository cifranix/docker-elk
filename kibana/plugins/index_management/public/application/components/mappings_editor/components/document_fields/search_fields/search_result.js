"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchResult = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactTinyVirtualList = _interopRequireDefault(require("react-tiny-virtual-list"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _mappings_state = require("../../../mappings_state");

var _search_result_item = require("./search_result_item");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ITEM_HEIGHT = 64;

var SearchResult = _react.default.memo(function (_ref) {
  var result = _ref.result,
      _ref$documentFieldsSt = _ref.documentFieldsState,
      status = _ref$documentFieldsSt.status,
      fieldToEdit = _ref$documentFieldsSt.fieldToEdit,
      virtualListStyle = _ref.style;
  var dispatch = (0, _mappings_state.useDispatch)();
  var listHeight = Math.min(result.length * ITEM_HEIGHT, 600);

  var clearSearch = function clearSearch() {
    dispatch({
      type: 'search:update',
      value: ''
    });
  };

  return result.length === 0 ? _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "search",
    title: _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.searchResult.emptyPromptTitle",
      defaultMessage: "No fields match your search"
    })),
    actions: _react.default.createElement(_eui.EuiButton, {
      onClick: clearSearch
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.searchResult.emptyPrompt.clearSearchButtonLabel",
      defaultMessage: "Clear search"
    }))
  }) : _react.default.createElement(_reactTinyVirtualList.default, {
    style: _objectSpread({
      overflowX: 'hidden'
    }, virtualListStyle),
    width: "100%",
    height: listHeight,
    itemCount: result.length,
    itemSize: ITEM_HEIGHT,
    overscanCount: 4,
    renderItem: function renderItem(_ref2) {
      var index = _ref2.index,
          style = _ref2.style;
      var item = result[index];
      return _react.default.createElement("div", {
        key: item.field.id,
        style: style
      }, _react.default.createElement(_search_result_item.SearchResultItem, {
        item: item,
        areActionButtonsVisible: status === 'idle',
        isDimmed: status === 'editingField' && fieldToEdit !== item.field.id,
        isHighlighted: status === 'editingField' && fieldToEdit === item.field.id
      }));
    }
  });
});

exports.SearchResult = SearchResult;