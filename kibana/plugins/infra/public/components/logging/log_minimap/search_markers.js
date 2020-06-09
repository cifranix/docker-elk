"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchMarkers = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _d3Scale = require("d3-scale");

var React = _interopRequireWildcard(require("react"));

var _search_marker = require("./search_marker");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SearchMarkers =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(SearchMarkers, _React$PureComponent);

  function SearchMarkers() {
    _classCallCheck(this, SearchMarkers);

    return _possibleConstructorReturn(this, _getPrototypeOf(SearchMarkers).apply(this, arguments));
  }

  _createClass(SearchMarkers, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          buckets = _this$props.buckets,
          start = _this$props.start,
          end = _this$props.end,
          width = _this$props.width,
          height = _this$props.height,
          jumpToTarget = _this$props.jumpToTarget,
          className = _this$props.className;
      var classes = (0, _classnames.default)('minimapSearchMarkers', className);

      if (start >= end || height <= 0 || Object.keys(buckets).length <= 0) {
        return null;
      }

      var yScale = (0, _d3Scale.scaleTime)().domain([start, end]).range([0, height]);
      return React.createElement("g", {
        transform: "translate(".concat(width / 2, ", 0)"),
        className: classes
      }, buckets.map(function (bucket) {
        return React.createElement("g", {
          key: "".concat(bucket.representativeKey.time, ":").concat(bucket.representativeKey.tiebreaker),
          transform: "translate(0, ".concat(yScale(bucket.start), ")")
        }, React.createElement(_search_marker.SearchMarker, {
          bucket: bucket,
          height: yScale(bucket.end) - yScale(bucket.start),
          width: width,
          jumpToTarget: jumpToTarget
        }));
      }));
    }
  }]);

  return SearchMarkers;
}(React.PureComponent);

exports.SearchMarkers = SearchMarkers;