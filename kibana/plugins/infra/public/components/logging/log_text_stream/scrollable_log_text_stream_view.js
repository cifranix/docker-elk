"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollableLogTextStreamView = void 0;

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _public = require("../../../../../observability/public");

var _handlers = require("../../../utils/handlers");

var _auto_sizer = require("../../auto_sizer");

var _empty_states = require("../../empty_states");

var _loading = require("../../loading");

var _item = require("./item");

var _column_headers = require("./column_headers");

var _loading_item_view = require("./loading_item_view");

var _jump_to_tail = require("./jump_to_tail");

var _log_entry_row = require("./log_entry_row");

var _measurable_item_view = require("./measurable_item_view");

var _vertical_scroll_panel = require("./vertical_scroll_panel");

var _log_entry_column = require("./log_entry_column");

var _log_date_row = require("./log_date_row");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  overflow: hidden;\n  flex: 1 1 0%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  overflow: hidden;\n  display: flex;\n  flex: 1 1 0%;\n  flex-direction: column;\n  align-items: stretch;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ScrollableLogTextStreamView =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ScrollableLogTextStreamView, _React$PureComponent);

  _createClass(ScrollableLogTextStreamView, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var hasNewTarget = nextProps.target && nextProps.target !== prevState.target;
      var hasItems = nextProps.items.length > 0; // Prevent new entries from being appended and moving the stream forward when
      // the user has scrolled up during live streaming

      var nextItems = hasItems && prevState.isScrollLocked ? prevState.items : nextProps.items;

      if (nextProps.isStreaming && hasItems) {
        return {
          target: nextProps.target,
          targetId: (0, _item.getStreamItemId)(nextProps.items[nextProps.items.length - 1]),
          items: nextItems
        };
      } else if (hasNewTarget && hasItems) {
        return {
          target: nextProps.target,
          targetId: (0, _item.getStreamItemId)((0, _item.getStreamItemBeforeTimeKey)(nextProps.items, nextProps.target)),
          items: nextItems
        };
      } else if (!hasItems) {
        return {
          target: null,
          targetId: null,
          items: []
        };
      } else if (hasItems && (nextItems.length !== prevState.items.length || nextItems[0] !== prevState.items[0])) {
        return _objectSpread({}, prevState, {
          items: nextItems
        });
      }

      return null;
    }
  }]);

  function ScrollableLogTextStreamView(props) {
    var _this;

    _classCallCheck(this, ScrollableLogTextStreamView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ScrollableLogTextStreamView).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleOpenFlyout", function (id) {
      _this.props.setFlyoutItem(id);

      _this.props.setFlyoutVisibility(true);
    });

    _defineProperty(_assertThisInitialized(_this), "handleReload", function () {
      var reloadItems = _this.props.reloadItems;

      if (reloadItems) {
        reloadItems();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleVisibleChildrenChange", (0, _handlers.callWithoutRepeats)(function (_ref) {
      var topChild = _ref.topChild,
          middleChild = _ref.middleChild,
          bottomChild = _ref.bottomChild,
          pagesAbove = _ref.pagesAbove,
          pagesBelow = _ref.pagesBelow,
          fromScroll = _ref.fromScroll;

      if (fromScroll && _this.props.isStreaming) {
        _this.setState({
          isScrollLocked: pagesBelow !== 0
        });
      }

      _this.props.reportVisibleInterval({
        endKey: (0, _item.parseStreamItemId)(bottomChild),
        middleKey: (0, _item.parseStreamItemId)(middleChild),
        pagesAfterEnd: pagesBelow,
        pagesBeforeStart: pagesAbove,
        startKey: (0, _item.parseStreamItemId)(topChild),
        fromScroll: fromScroll
      });
    }));

    _defineProperty(_assertThisInitialized(_this), "handleJumpToTail", function () {
      var items = _this.props.items;
      var lastItemTarget = (0, _item.getStreamItemId)(items[items.length - 1]);

      _this.setState({
        targetId: lastItemTarget,
        isScrollLocked: false
      });
    });

    _this.state = {
      target: null,
      targetId: null,
      items: props.items,
      isScrollLocked: false
    };
    return _this;
  }

  _createClass(ScrollableLogTextStreamView, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          columnConfigurations = _this$props.columnConfigurations,
          currentHighlightKey = _this$props.currentHighlightKey,
          hasMoreAfterEnd = _this$props.hasMoreAfterEnd,
          hasMoreBeforeStart = _this$props.hasMoreBeforeStart,
          highlightedItem = _this$props.highlightedItem,
          isLoadingMore = _this$props.isLoadingMore,
          isReloading = _this$props.isReloading,
          isStreaming = _this$props.isStreaming,
          scale = _this$props.scale,
          wrap = _this$props.wrap,
          startDateExpression = _this$props.startDateExpression,
          endDateExpression = _this$props.endDateExpression,
          lastLoadedTime = _this$props.lastLoadedTime,
          updateDateRange = _this$props.updateDateRange,
          startLiveStreaming = _this$props.startLiveStreaming;
      var _this$state = this.state,
          targetId = _this$state.targetId,
          items = _this$state.items,
          isScrollLocked = _this$state.isScrollLocked;
      var hasItems = items.length > 0;
      return _react2.default.createElement(ScrollableLogTextStreamViewWrapper, null, isReloading && (!isStreaming || !hasItems) ? _react2.default.createElement(_loading.InfraLoadingPanel, {
        width: "100%",
        height: "100%",
        text: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.infra.logs.scrollableLogTextStreamView.loadingEntriesLabel",
          defaultMessage: "Loading entries"
        })
      }) : !hasItems ? _react2.default.createElement(_empty_states.NoData, {
        titleText: _i18n.i18n.translate('xpack.infra.logs.emptyView.noLogMessageTitle', {
          defaultMessage: 'There are no log messages to display.'
        }),
        bodyText: _i18n.i18n.translate('xpack.infra.logs.emptyView.noLogMessageDescription', {
          defaultMessage: 'Try adjusting your filter.'
        }),
        refetchText: _i18n.i18n.translate('xpack.infra.logs.emptyView.checkForNewDataButtonLabel', {
          defaultMessage: 'Check for new data'
        }),
        onRefetch: this.handleReload,
        testString: "logsNoDataPrompt"
      }) : _react2.default.createElement(WithColumnWidths, {
        columnConfigurations: columnConfigurations,
        scale: scale
      }, function (_ref2) {
        var columnWidths = _ref2.columnWidths,
            CharacterDimensionsProbe = _ref2.CharacterDimensionsProbe;
        return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(CharacterDimensionsProbe, null), _react2.default.createElement(_column_headers.LogColumnHeaders, {
          columnConfigurations: columnConfigurations,
          columnWidths: columnWidths
        }), _react2.default.createElement(_auto_sizer.AutoSizer, {
          bounds: true,
          content: true,
          detectAnyWindowResize: "height"
        }, function (_ref3) {
          var measureRef = _ref3.measureRef,
              _ref3$bounds$height = _ref3.bounds.height,
              height = _ref3$bounds$height === void 0 ? 0 : _ref3$bounds$height,
              _ref3$content$width = _ref3.content.width,
              width = _ref3$content$width === void 0 ? 0 : _ref3$content$width;
          return _react2.default.createElement(ScrollPanelSizeProbe, {
            ref: measureRef
          }, _react2.default.createElement(_vertical_scroll_panel.VerticalScrollPanel, {
            height: height,
            width: width,
            onVisibleChildrenChange: _this2.handleVisibleChildrenChange,
            target: targetId,
            hideScrollbar: true,
            "data-test-subj": 'logStream',
            isLocked: isScrollLocked,
            entriesCount: items.length
          }, function (registerChild) {
            return items.length > 0 ? _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_loading_item_view.LogTextStreamLoadingItemView, {
              position: "start",
              isLoading: isLoadingMore,
              hasMore: hasMoreBeforeStart,
              timestamp: items[0].logEntry.cursor.time,
              isStreaming: false,
              startDateExpression: startDateExpression,
              endDateExpression: endDateExpression,
              onExtendRange: function onExtendRange(newDateExpression) {
                return updateDateRange({
                  startDateExpression: newDateExpression
                });
              }
            }), items.map(function (item, idx) {
              var currentTimestamp = item.logEntry.cursor.time;
              var showDate = false;

              if (idx > 0) {
                var prevTimestamp = items[idx - 1].logEntry.cursor.time;
                showDate = !(0, _moment.default)(currentTimestamp).isSame(prevTimestamp, 'day');
              }

              return _react2.default.createElement(_react2.Fragment, {
                key: (0, _item.getStreamItemId)(item)
              }, showDate && _react2.default.createElement(_log_date_row.LogDateRow, {
                timestamp: currentTimestamp
              }), _react2.default.createElement(_measurable_item_view.MeasurableItemView, {
                register: registerChild,
                registrationKey: (0, _item.getStreamItemId)(item)
              }, function (itemMeasureRef) {
                return _react2.default.createElement(_log_entry_row.LogEntryRow, {
                  columnConfigurations: columnConfigurations,
                  columnWidths: columnWidths,
                  openFlyoutWithItem: _this2.handleOpenFlyout,
                  boundingBoxRef: itemMeasureRef,
                  logEntry: item.logEntry,
                  highlights: item.highlights,
                  isActiveHighlight: !!currentHighlightKey && currentHighlightKey.gid === item.logEntry.id,
                  scale: scale,
                  wrap: wrap,
                  isHighlighted: highlightedItem ? item.logEntry.id === highlightedItem : false
                });
              }));
            }), _react2.default.createElement(_loading_item_view.LogTextStreamLoadingItemView, {
              position: "end",
              isLoading: isStreaming || isLoadingMore,
              hasMore: hasMoreAfterEnd,
              isStreaming: isStreaming,
              timestamp: isStreaming && lastLoadedTime ? lastLoadedTime.valueOf() : items[items.length - 1].logEntry.cursor.time,
              startDateExpression: startDateExpression,
              endDateExpression: endDateExpression,
              onExtendRange: function onExtendRange(newDateExpression) {
                return updateDateRange({
                  endDateExpression: newDateExpression
                });
              },
              onStreamStart: function onStreamStart() {
                return startLiveStreaming();
              }
            }), isScrollLocked && _react2.default.createElement(_jump_to_tail.LogTextStreamJumpToTail, {
              width: width,
              onClickJump: _this2.handleJumpToTail
            })) : null;
          }));
        }));
      }));
    }
  }]);

  return ScrollableLogTextStreamView;
}(_react2.default.PureComponent);
/**
 * If the above component wasn't a class component, this wouldn't be necessary
 * since the `useColumnWidths` hook could have been used directly.
 */


exports.ScrollableLogTextStreamView = ScrollableLogTextStreamView;

var WithColumnWidths = function WithColumnWidths(_ref4) {
  var children = _ref4.children,
      columnConfigurations = _ref4.columnConfigurations,
      scale = _ref4.scale;
  var childParams = (0, _log_entry_column.useColumnWidths)({
    columnConfigurations: columnConfigurations,
    scale: scale
  });
  return children(childParams);
};

var ScrollableLogTextStreamViewWrapper = _public.euiStyled.div(_templateObject());

var ScrollPanelSizeProbe = _public.euiStyled.div(_templateObject2());