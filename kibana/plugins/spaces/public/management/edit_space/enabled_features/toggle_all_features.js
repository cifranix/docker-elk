"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleAllFeatures = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

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

var options = [{
  id: 'show',
  text: _i18n.i18n.translate('xpack.spaces.management.showAllFeaturesText', {
    defaultMessage: 'Show all'
  })
}, {
  id: 'hide',
  text: _i18n.i18n.translate('xpack.spaces.management.hideAllFeaturesText', {
    defaultMessage: 'Hide all'
  })
}];

var ToggleAllFeatures =
/*#__PURE__*/
function (_Component) {
  _inherits(ToggleAllFeatures, _Component);

  function ToggleAllFeatures() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ToggleAllFeatures);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ToggleAllFeatures)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isPopoverOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (selection) {
      _this.props.onChange(selection === 'show');

      _this.setState({
        isPopoverOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onButtonClick", function () {
      _this.setState({
        isPopoverOpen: !_this.state.isPopoverOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      _this.setState({
        isPopoverOpen: false
      });
    });

    return _this;
  }

  _createClass(ToggleAllFeatures, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var button = _react2.default.createElement(_eui.EuiLink, {
        onClick: this.onButtonClick,
        className: 'spcToggleAllFeatures__changeAllLink'
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.toggleAllFeaturesLink",
        defaultMessage: "(change all)"
      }));

      var items = options.map(function (item) {
        return _react2.default.createElement(_eui.EuiContextMenuItem, {
          "data-test-subj": "spc-toggle-all-features-".concat(item.id),
          key: item.id,
          onClick: function onClick() {
            _this2.onSelect(item.id);
          },
          disabled: _this2.props.disabled
        }, item.text);
      });
      return _react2.default.createElement(_eui.EuiPopover, {
        id: 'changeAllFeatureVisibilityPopover',
        button: button,
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        panelPaddingSize: "none",
        anchorPosition: "downLeft"
      }, _react2.default.createElement(_eui.EuiContextMenuPanel, {
        items: items
      }));
    }
  }]);

  return ToggleAllFeatures;
}(_react2.Component);

exports.ToggleAllFeatures = ToggleAllFeatures;