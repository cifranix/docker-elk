"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentTitle = void 0;

var _react = _interopRequireDefault(require("react"));

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

var wrapWithSharedState = function wrapWithSharedState() {
  var titles = [];
  var TITLE_SUFFIX = ' - Kibana';
  return (
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(_class, _React$Component);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
      }

      _createClass(_class, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this = this;

          this.setState(function () {
            return {
              index: titles.push('') - 1
            };
          }, function () {
            _this.pushTitle(_this.getTitle(_this.props.title));

            _this.updateDocumentTitle();
          });
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          this.pushTitle(this.getTitle(this.props.title));
          this.updateDocumentTitle();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.removeTitle();
          this.updateDocumentTitle();
        }
      }, {
        key: "render",
        value: function render() {
          return null;
        }
      }, {
        key: "getTitle",
        value: function getTitle(title) {
          return typeof title === 'function' ? title(titles[this.state.index - 1]) : title;
        }
      }, {
        key: "pushTitle",
        value: function pushTitle(title) {
          titles[this.state.index] = title;
        }
      }, {
        key: "removeTitle",
        value: function removeTitle() {
          titles.pop();
        }
      }, {
        key: "updateDocumentTitle",
        value: function updateDocumentTitle() {
          var title = (titles[titles.length - 1] || '') + TITLE_SUFFIX;

          if (title !== document.title) {
            document.title = title;
          }
        }
      }]);

      return _class;
    }(_react.default.Component)
  );
};

var DocumentTitle = wrapWithSharedState();
exports.DocumentTitle = DocumentTitle;