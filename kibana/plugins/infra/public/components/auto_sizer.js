"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoSizer = void 0;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AutoSizer =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(AutoSizer, _React$PureComponent);

  function AutoSizer(props) {
    var _this;

    _classCallCheck(this, AutoSizer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoSizer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "element", null);

    _defineProperty(_assertThisInitialized(_this), "resizeObserver", null);

    _defineProperty(_assertThisInitialized(_this), "windowWidth", -1);

    _defineProperty(_assertThisInitialized(_this), "windowHeight", -1);

    _defineProperty(_assertThisInitialized(_this), "state", {
      boundsMeasurement: {
        height: void 0,
        width: void 0
      },
      contentMeasurement: {
        height: void 0,
        width: void 0
      }
    });

    _defineProperty(_assertThisInitialized(_this), "measure", function (entry) {
      if (!_this.element) {
        return;
      }

      var _this$props = _this.props,
          _this$props$content = _this$props.content,
          content = _this$props$content === void 0 ? true : _this$props$content,
          _this$props$bounds = _this$props.bounds,
          bounds = _this$props$bounds === void 0 ? false : _this$props$bounds;
      var _this$state = _this.state,
          previousBoundsMeasurement = _this$state.boundsMeasurement,
          previousContentMeasurement = _this$state.contentMeasurement;
      var boundsRect = bounds ? _this.element.getBoundingClientRect() : null;
      var boundsMeasurement = boundsRect ? {
        height: boundsRect.height,
        width: boundsRect.width
      } : previousBoundsMeasurement;

      if (_this.props.detectAnyWindowResize && boundsMeasurement) {
        if (boundsMeasurement.width && _this.windowWidth !== -1 && _this.windowWidth > window.innerWidth) {
          var gap = _this.windowWidth - window.innerWidth;
          boundsMeasurement.width = boundsMeasurement.width - gap;
        }

        if (boundsMeasurement.height && _this.windowHeight !== -1 && _this.windowHeight > window.innerHeight) {
          var _gap = _this.windowHeight - window.innerHeight;

          boundsMeasurement.height = boundsMeasurement.height - _gap;
        }
      }

      _this.windowWidth = window.innerWidth;
      _this.windowHeight = window.innerHeight;
      var contentRect = content && entry ? entry.contentRect : null;
      var contentMeasurement = contentRect && entry ? {
        height: entry.contentRect.height,
        width: entry.contentRect.width
      } : previousContentMeasurement;

      if ((0, _lodash.isEqual)(boundsMeasurement, previousBoundsMeasurement) && (0, _lodash.isEqual)(contentMeasurement, previousContentMeasurement)) {
        return;
      }

      requestAnimationFrame(function () {
        if (!_this.resizeObserver) {
          return;
        }

        _this.setState({
          boundsMeasurement: boundsMeasurement,
          contentMeasurement: contentMeasurement
        });

        if (_this.props.onResize) {
          _this.props.onResize({
            bounds: boundsMeasurement,
            content: contentMeasurement
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateMeasurement", function () {
      return requestAnimationFrame(function () {
        var detectAnyWindowResize = _this.props.detectAnyWindowResize;
        if (!detectAnyWindowResize) return;

        switch (detectAnyWindowResize) {
          case 'height':
            if (_this.windowHeight !== window.innerHeight) {
              _this.measure(null);
            }

            break;

          case 'width':
            if (_this.windowWidth !== window.innerWidth) {
              _this.measure(null);
            }

            break;

          default:
            _this.measure(null);

        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "storeRef", function (element) {
      if (_this.element && _this.resizeObserver) {
        _this.resizeObserver.unobserve(_this.element);
      }

      if (element && _this.resizeObserver) {
        _this.resizeObserver.observe(element);
      }

      _this.element = element;
    });

    if (_this.props.detectAnyWindowResize) {
      window.addEventListener('resize', _this.updateMeasurement);
    }

    _this.resizeObserver = new _resizeObserverPolyfill.default(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === _this.element) {
          _this.measure(entry);
        }
      });
    });
    return _this;
  }

  _createClass(AutoSizer, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }

      if (this.props.detectAnyWindowResize) {
        window.removeEventListener('resize', this.updateMeasurement);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var _this$state2 = this.state,
          boundsMeasurement = _this$state2.boundsMeasurement,
          contentMeasurement = _this$state2.contentMeasurement;
      return children({
        bounds: boundsMeasurement,
        content: contentMeasurement,
        measureRef: this.storeRef
      });
    }
  }]);

  return AutoSizer;
}(_react.default.PureComponent);

exports.AutoSizer = AutoSizer;