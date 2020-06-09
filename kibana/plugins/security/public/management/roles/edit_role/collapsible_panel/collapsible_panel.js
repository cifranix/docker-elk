"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsiblePanel = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var CollapsiblePanel =
/*#__PURE__*/
function (_Component) {
  _inherits(CollapsiblePanel, _Component);

  function CollapsiblePanel(props) {
    var _this;

    _classCallCheck(this, CollapsiblePanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CollapsiblePanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      collapsed: false
    });

    _defineProperty(_assertThisInitialized(_this), "getTitle", function () {
      return _react2.default.createElement(_eui.EuiFlexGroup, {
        alignItems: 'baseline',
        gutterSize: "s",
        responsive: false
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiTitle, null, _react2.default.createElement("h2", null, _this.props.iconType && _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiIcon, {
        type: _this.props.iconType,
        size: 'xl',
        className: 'collapsiblePanel__logo'
      }), ' '), _this.props.title))), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiLink, {
        onClick: _this.toggleCollapsed
      }, _this.state.collapsed ? _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.collapsiblePanel.showLinkText",
        defaultMessage: "show"
      }) : _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.collapsiblePanel.hideLinkText",
        defaultMessage: "hide"
      }))));
    });

    _defineProperty(_assertThisInitialized(_this), "getForm", function () {
      if (_this.state.collapsed) {
        return null;
      }

      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, null), _this.props.children);
    });

    _defineProperty(_assertThisInitialized(_this), "toggleCollapsed", function () {
      _this.setState({
        collapsed: !_this.state.collapsed
      });
    });

    _this.state = {
      collapsed: props.initiallyCollapsed || false
    };
    return _this;
  }

  _createClass(CollapsiblePanel, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_eui.EuiPanel, null, this.getTitle(), this.getForm());
    }
  }]);

  return CollapsiblePanel;
}(_react2.Component);

exports.CollapsiblePanel = CollapsiblePanel;