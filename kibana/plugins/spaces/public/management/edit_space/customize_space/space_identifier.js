"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceIdentifier = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SpaceIdentifierUI =
/*#__PURE__*/
function (_Component) {
  _inherits(SpaceIdentifierUI, _Component);

  function SpaceIdentifierUI(props) {
    var _this;

    _classCallCheck(this, SpaceIdentifierUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpaceIdentifierUI).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "textFieldRef", null);

    _defineProperty(_assertThisInitialized(_this), "getLabel", function () {
      if (!_this.props.editable) {
        return _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.spaces.management.spaceIdentifier.urlIdentifierTitle",
          defaultMessage: "URL identifier"
        }));
      }

      var editLinkText = _this.state.editing ? _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.spaceIdentifier.resetSpaceNameLinkText",
        defaultMessage: "[reset]"
      }) : _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.spaceIdentifier.customizeSpaceLinkText",
        defaultMessage: "[customize]"
      });
      var editLinkLabel = _this.state.editing ? _this.props.intl.formatMessage({
        id: 'xpack.spaces.management.spaceIdentifier.resetSpaceNameLinkLabel',
        defaultMessage: 'Reset the URL identifier'
      }) : _this.props.intl.formatMessage({
        id: 'xpack.spaces.management.spaceIdentifier.customizeSpaceNameLinkLabel',
        defaultMessage: 'Customize the URL identifier'
      });
      return _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.spaceIdentifier.urlIdentifierLabel",
        defaultMessage: "URL identifier "
      }), _react2.default.createElement(_eui.EuiLink, {
        onClick: _this.onEditClick,
        "aria-label": editLinkLabel
      }, editLinkText));
    });

    _defineProperty(_assertThisInitialized(_this), "getHelpText", function () {
      var identifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.intl.formatMessage({
        id: 'xpack.spaces.management.spaceIdentifier.emptySpaceIdentifierText',
        defaultMessage: 'awesome-space'
      });
      return _react2.default.createElement("p", {
        className: "eui-textBreakAll"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.spaceIdentifier.kibanaURLForSpaceIdentifierDescription",
        defaultMessage: "Example: https://my-kibana.example{spaceIdentifier}/app/kibana.",
        values: {
          spaceIdentifier: _react2.default.createElement("strong", null, "/s/", identifier)
        }
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onEditClick", function () {
      var currentlyEditing = _this.state.editing;

      if (currentlyEditing) {
        // "Reset" clicked. Create space identifier based on the space name.
        var resetIdentifier = (0, _lib.toSpaceIdentifier)(_this.props.space.name);

        _this.setState({
          editing: false
        });

        _this.props.onChange(resetIdentifier);
      } else {
        _this.setState({
          editing: true
        }, function () {
          if (_this.textFieldRef) {
            _this.textFieldRef.focus();
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      if (!_this.state.editing) {
        return;
      }

      _this.props.onChange(e.target.value);
    });

    _this.state = {
      editing: false
    };
    return _this;
  }

  _createClass(SpaceIdentifierUI, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var intl = this.props.intl;
      var _this$props$space$id = this.props.space.id,
          id = _this$props$space$id === void 0 ? '' : _this$props$space$id;
      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiFormRow, _extends({
        label: this.getLabel(),
        helpText: this.getHelpText(id)
      }, this.props.validator.validateURLIdentifier(this.props.space), {
        fullWidth: true
      }), _react2.default.createElement(_eui.EuiFieldText, {
        readOnly: !this.state.editing,
        placeholder: this.state.editing || !this.props.editable ? undefined : intl.formatMessage({
          id: 'xpack.spaces.management.spaceIdentifier.urlIdentifierGeneratedFromSpaceNameTooltip',
          defaultMessage: 'awesome-space'
        }),
        value: id,
        onChange: this.onChange,
        inputRef: function inputRef(ref) {
          return _this2.textFieldRef = ref;
        },
        fullWidth: true
      })));
    }
  }]);

  return SpaceIdentifierUI;
}(_react2.Component);

var SpaceIdentifier = (0, _react.injectI18n)(SpaceIdentifierUI);
exports.SpaceIdentifier = SpaceIdentifier;