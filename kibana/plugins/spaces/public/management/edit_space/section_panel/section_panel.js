"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionPanel = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

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

var SectionPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(SectionPanel, _Component);

  function SectionPanel(props) {
    var _this;

    _classCallCheck(this, SectionPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SectionPanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      collapsed: false
    });

    _defineProperty(_assertThisInitialized(_this), "getTitle", function () {
      var showLinkText = _i18n.i18n.translate('xpack.spaces.management.collapsiblePanel.showLinkText', {
        defaultMessage: 'show'
      });

      var hideLinkText = _i18n.i18n.translate('xpack.spaces.management.collapsiblePanel.hideLinkText', {
        defaultMessage: 'hide'
      });

      var showLinkDescription = _i18n.i18n.translate('xpack.spaces.management.collapsiblePanel.showLinkDescription', {
        defaultMessage: 'show {title}',
        values: {
          title: _this.props.description
        }
      });

      var hideLinkDescription = _i18n.i18n.translate('xpack.spaces.management.collapsiblePanel.hideLinkDescription', {
        defaultMessage: 'hide {title}',
        values: {
          title: _this.props.description
        }
      });

      return _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: 'baseline',
        gutterSize: "s",
        responsive: false
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "m"
      }, _react.default.createElement("h2", null, _this.props.iconType && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiIcon, {
        type: _this.props.iconType,
        size: 'xl',
        className: 'collapsiblePanel__logo'
      }), ' '), _this.props.title))), _this.props.collapsible && _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiLink, {
        "data-test-subj": "show-hide-section-link",
        onClick: _this.toggleCollapsed,
        "aria-label": _this.state.collapsed ? showLinkDescription : hideLinkDescription
      }, _this.state.collapsed ? showLinkText : hideLinkText)));
    });

    _defineProperty(_assertThisInitialized(_this), "getForm", function () {
      if (_this.state.collapsed) {
        return null;
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _this.props.children);
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

  _createClass(SectionPanel, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_eui.EuiPanel, null, this.getTitle(), this.getForm());
    }
  }]);

  return SectionPanel;
}(_react.Component);

exports.SectionPanel = SectionPanel;