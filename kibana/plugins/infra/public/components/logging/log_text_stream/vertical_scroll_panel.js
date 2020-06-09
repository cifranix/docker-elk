"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerticalScrollPanel = exports.ASSUMED_SCROLLBAR_WIDTH = void 0;

var _d3Array = require("d3-array");

var _lodash = require("lodash");

var React = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  overflow-x: hidden;\n  overflow-y: scroll;\n  position: relative;\n  padding-right: ", "px;\n\n  & * {\n    overflow-anchor: none;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SCROLL_THROTTLE_INTERVAL = 250;
var ASSUMED_SCROLLBAR_WIDTH = 20;
exports.ASSUMED_SCROLLBAR_WIDTH = ASSUMED_SCROLLBAR_WIDTH;

var VerticalScrollPanel =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(VerticalScrollPanel, _React$PureComponent);

  function VerticalScrollPanel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, VerticalScrollPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(VerticalScrollPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "scrollRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "childRefs", new Map());

    _defineProperty(_assertThisInitialized(_this), "childDimensions", new Map());

    _defineProperty(_assertThisInitialized(_this), "nextScrollEventFromCenterTarget", false);

    _defineProperty(_assertThisInitialized(_this), "handleScroll", (0, _lodash.throttle)(function () {
      // If this event was fired by the centerTarget method modifying the scrollTop,
      // then don't send `fromScroll: true` to reportVisibleChildren. The rest of the
      // app needs to respond differently depending on whether the user is scrolling through
      // the pane manually, versus whether the pane is updating itself in response to new data
      _this.reportVisibleChildren(!_this.nextScrollEventFromCenterTarget);

      _this.nextScrollEventFromCenterTarget = false;
    }, SCROLL_THROTTLE_INTERVAL));

    _defineProperty(_assertThisInitialized(_this), "registerChild", function (key, element) {
      if (element === null) {
        _this.childRefs.delete(key);
      } else {
        _this.childRefs.set(key, element);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateChildDimensions", function () {
      _this.childDimensions = new Map((0, _lodash.sortBy)(Array.from(_this.childRefs.entries()).reduce(function (accumulatedDimensions, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            child = _ref2[1];

        var currentOffsetRect = child.getOffsetRect();

        if (currentOffsetRect !== null) {
          accumulatedDimensions.push([key, currentOffsetRect]);
        }

        return accumulatedDimensions;
      }, []), '1.top'));
    });

    _defineProperty(_assertThisInitialized(_this), "getVisibleChildren", function () {
      if (_this.scrollRef.current === null || _this.childDimensions.size <= 0) {
        return;
      }

      var _assertThisInitialize = _assertThisInitialized(_this),
          childDimensions = _assertThisInitialize.childDimensions,
          scrollViewHeight = _assertThisInitialize.props.height,
          scrollTop = _assertThisInitialize.scrollRef.current.scrollTop;

      return getVisibleChildren(Array.from(childDimensions.entries()), scrollViewHeight, scrollTop);
    });

    _defineProperty(_assertThisInitialized(_this), "getScrollPosition", function () {
      if (_this.scrollRef.current === null) {
        return;
      }

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          scrollViewHeight = _assertThisInitialize2.props.height,
          _assertThisInitialize3 = _assertThisInitialize2.scrollRef.current,
          scrollHeight = _assertThisInitialize3.scrollHeight,
          scrollTop = _assertThisInitialize3.scrollTop;

      return {
        pagesAbove: scrollTop / scrollViewHeight,
        pagesBelow: (scrollHeight - scrollTop - scrollViewHeight) / scrollViewHeight
      };
    });

    _defineProperty(_assertThisInitialized(_this), "reportVisibleChildren", function () {
      var fromScroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var onVisibleChildrenChange = _this.props.onVisibleChildrenChange;

      var visibleChildren = _this.getVisibleChildren();

      var scrollPosition = _this.getScrollPosition();

      if (!visibleChildren || !scrollPosition || typeof onVisibleChildrenChange !== 'function') {
        return;
      }

      onVisibleChildrenChange(_objectSpread({
        bottomChild: visibleChildren.bottomChild,
        middleChild: visibleChildren.middleChild,
        topChild: visibleChildren.topChild,
        fromScroll: fromScroll
      }, scrollPosition));
    });

    _defineProperty(_assertThisInitialized(_this), "centerTarget", function (target, offset) {
      var _assertThisInitialize4 = _assertThisInitialized(_this),
          scrollViewHeight = _assertThisInitialize4.props.height,
          childDimensions = _assertThisInitialize4.childDimensions,
          scrollRef = _assertThisInitialize4.scrollRef;

      if (scrollRef.current === null || !target || childDimensions.size <= 0) {
        return false;
      }

      var targetDimensions = childDimensions.get(target);

      if (targetDimensions) {
        var targetOffset = typeof offset === 'undefined' ? targetDimensions.height / 2 : offset; // Flag the scrollTop change that's about to happen as programmatic, as
        // opposed to being in direct response to user input

        _this.nextScrollEventFromCenterTarget = true;
        var currentScrollTop = scrollRef.current.scrollTop;
        var newScrollTop = targetDimensions.top + targetOffset - scrollViewHeight / 2;
        scrollRef.current.scrollTop = newScrollTop;
        return currentScrollTop !== newScrollTop;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "handleUpdatedChildren", function (target, offset) {
      _this.updateChildDimensions();

      var centerTargetWillReportChildren = false;

      if (!!target) {
        centerTargetWillReportChildren = _this.centerTarget(target, offset);
      }

      if (!centerTargetWillReportChildren) {
        _this.reportVisibleChildren();
      }
    });

    return _this;
  }

  _createClass(VerticalScrollPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleUpdatedChildren(this.props.target, undefined);
    }
  }, {
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps) {
      /** Center the target if:
       *  1. This component has just finished calculating its height after being first mounted
       *  2. The target prop changes
       */
      if (prevProps.height === 0 && this.props.height > 0 || prevProps.target !== this.props.target && this.props.target) {
        return {
          scrollOffset: undefined,
          scrollTarget: this.props.target
        };
      } else if (this.props.height > 0) {
        var _visibleChildren = this.getVisibleChildren();

        if (_visibleChildren) {
          return {
            scrollOffset: _visibleChildren.middleChildOffset,
            scrollTarget: _visibleChildren.middleChild
          };
        }
      }

      return {
        scrollOffset: undefined,
        scrollTarget: undefined
      };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.height !== this.props.height || prevProps.target !== this.props.target || prevProps.entriesCount !== this.props.entriesCount) {
        this.handleUpdatedChildren(snapshot.scrollTarget, snapshot.scrollOffset);
      }

      if (prevProps.isLocked && !this.props.isLocked && this.scrollRef.current) {
        this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.childRefs.clear();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          height = _this$props.height,
          width = _this$props.width,
          hideScrollbar = _this$props.hideScrollbar,
          dataTestSubj = _this$props['data-test-subj'];
      var scrollbarOffset = hideScrollbar ? ASSUMED_SCROLLBAR_WIDTH : 0;
      return React.createElement(ScrollPanelWrapper, {
        "data-test-subj": dataTestSubj,
        style: {
          height: height,
          width: width + scrollbarOffset
        },
        scrollbarOffset: scrollbarOffset,
        onScroll: this.handleScroll,
        ref: this.scrollRef
      }, typeof children === 'function' ? children(this.registerChild) : null);
    }
  }]);

  return VerticalScrollPanel;
}(React.PureComponent);

exports.VerticalScrollPanel = VerticalScrollPanel;

_defineProperty(VerticalScrollPanel, "defaultProps", {
  hideScrollbar: false
});

var ScrollPanelWrapper = _public.euiStyled.div(_templateObject(), function (props) {
  return props.scrollbarOffset || 0;
});

var getVisibleChildren = function getVisibleChildren(childDimensions, scrollViewHeight, scrollTop) {
  var middleChildIndex = Math.min(getChildIndexBefore(childDimensions, scrollTop + scrollViewHeight / 2), childDimensions.length - 1);
  var topChildIndex = Math.min(getChildIndexBefore(childDimensions, scrollTop, 0, middleChildIndex), childDimensions.length - 1);
  var bottomChildIndex = Math.min(getChildIndexBefore(childDimensions, scrollTop + scrollViewHeight, middleChildIndex), childDimensions.length - 1);
  return {
    bottomChild: childDimensions[bottomChildIndex][0],
    bottomChildOffset: childDimensions[bottomChildIndex][1].top - scrollTop - scrollViewHeight,
    middleChild: childDimensions[middleChildIndex][0],
    middleChildOffset: scrollTop + scrollViewHeight / 2 - childDimensions[middleChildIndex][1].top,
    topChild: childDimensions[topChildIndex][0],
    topChildOffset: childDimensions[topChildIndex][1].top - scrollTop
  };
};

var getChildIndexBefore = (0, _d3Array.bisector)(function (_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      key = _ref4[0],
      rect = _ref4[1];

  return rect.top + rect.height;
}).left;