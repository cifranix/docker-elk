"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestFlyout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RequestFlyout =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(RequestFlyout, _PureComponent);

  function RequestFlyout() {
    _classCallCheck(this, RequestFlyout);

    return _possibleConstructorReturn(this, _getPrototypeOf(RequestFlyout).apply(this, arguments));
  }

  _createClass(RequestFlyout, [{
    key: "getEsJson",
    value: function getEsJson(payload) {
      return JSON.stringify(payload, null, 2);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          id = _this$props.id,
          payload = _this$props.payload,
          close = _this$props.close;
      var endpoint = "PUT _watcher/watch/".concat(id || '<watchId>');
      var request = "".concat(endpoint, "\n").concat(this.getEsJson(payload));
      return _react.default.createElement(_eui.EuiFlyout, {
        maxWidth: 480,
        onClose: close
      }, _react.default.createElement(_eui.EuiFlyoutHeader, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, id ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.requestFlyout.namedTitle",
        defaultMessage: "Request for '{id}'",
        values: {
          id: id
        }
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.requestFlyout.unnamedTitle",
        defaultMessage: "Request"
      })))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.requestFlyout.descriptionText",
        defaultMessage: "This Elasticsearch request will create or update this watch."
      }))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCodeBlock, {
        language: "json",
        isCopyable: true
      }, request)), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
        iconType: "cross",
        onClick: close,
        flush: "left"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.requestFlyout.closeButtonLabel",
        defaultMessage: "Close"
      }))));
    }
  }]);

  return RequestFlyout;
}(_react.PureComponent);

exports.RequestFlyout = RequestFlyout;