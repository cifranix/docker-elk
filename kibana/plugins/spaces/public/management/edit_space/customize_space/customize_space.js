"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomizeSpace = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _react2 = _interopRequireWildcard(require("react"));

var _common = require("../../../../common");

var _space_avatar = require("../../../space_avatar");

var _lib = require("../../lib");

var _section_panel = require("../section_panel");

var _customize_space_avatar = require("./customize_space_avatar");

var _space_identifier = require("./space_identifier");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CustomizeSpace =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomizeSpace, _Component);

  function CustomizeSpace() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CustomizeSpace);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomizeSpace)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      customizingAvatar: false,
      usingCustomIdentifier: false
    });

    _defineProperty(_assertThisInitialized(_this), "togglePopover", function () {
      _this.setState({
        customizingAvatar: !_this.state.customizingAvatar
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      _this.setState({
        customizingAvatar: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getPanelDescription", function () {
      return _this.props.editingExistingSpace ? _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.manageSpacePage.customizeSpacePanelUrlIdentifierNotEditable",
        defaultMessage: "The url identifier cannot be changed."
      })) : _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.manageSpacePage.customizeSpacePanelUrlIdentifierEditable",
        defaultMessage: "Note the URL identifier. You cannot change it after you create the space."
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onNameChange", function (e) {
      if (!_this.props.space) {
        return;
      }

      var canUpdateId = !_this.props.editingExistingSpace && !_this.state.usingCustomIdentifier;
      var id = _this.props.space.id;

      if (canUpdateId) {
        id = (0, _lib.toSpaceIdentifier)(e.target.value);
      }

      _this.props.onChange(_objectSpread({}, _this.props.space, {
        name: e.target.value,
        id: id
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onDescriptionChange", function (e) {
      _this.props.onChange(_objectSpread({}, _this.props.space, {
        description: e.target.value
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onSpaceIdentifierChange", function (updatedIdentifier) {
      var usingCustomIdentifier = updatedIdentifier !== (0, _lib.toSpaceIdentifier)(_this.props.space.name);

      _this.setState({
        usingCustomIdentifier: usingCustomIdentifier
      });

      _this.props.onChange(_objectSpread({}, _this.props.space, {
        id: (0, _lib.toSpaceIdentifier)(updatedIdentifier)
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onAvatarChange", function (space) {
      _this.props.onChange(space);
    });

    return _this;
  }

  _createClass(CustomizeSpace, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          validator = _this$props.validator,
          editingExistingSpace = _this$props.editingExistingSpace;
      var _this$props$space = this.props.space,
          _this$props$space$nam = _this$props$space.name,
          name = _this$props$space$nam === void 0 ? '' : _this$props$space$nam,
          _this$props$space$des = _this$props$space.description,
          description = _this$props$space$des === void 0 ? '' : _this$props$space$des;

      var panelTitle = _i18n.i18n.translate('xpack.spaces.management.manageSpacePage.customizeSpaceTitle', {
        defaultMessage: 'Customize your space'
      });

      var extraPopoverProps = {
        initialFocus: 'input[name="spaceInitials"]'
      };
      return _react2.default.createElement(_section_panel.SectionPanel, {
        collapsible: false,
        title: panelTitle,
        description: panelTitle
      }, _react2.default.createElement(_eui.EuiDescribedFormGroup, {
        title: _react2.default.createElement(_eui.EuiTitle, {
          size: "xs"
        }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.spaces.management.manageSpacePage.customizeSpacePanelDescription",
          defaultMessage: "Name your space and customize its avatar."
        }))),
        description: this.getPanelDescription(),
        fullWidth: true
      }, _react2.default.createElement(_eui.EuiFlexGroup, {
        responsive: false
      }, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, _extends({
        label: _i18n.i18n.translate('xpack.spaces.management.manageSpacePage.nameFormRowLabel', {
          defaultMessage: 'Name'
        })
      }, validator.validateSpaceName(this.props.space), {
        fullWidth: true
      }), _react2.default.createElement(_eui.EuiFieldText, {
        name: "name",
        placeholder: _i18n.i18n.translate('xpack.spaces.management.manageSpacePage.awesomeSpacePlaceholder', {
          defaultMessage: 'Awesome space'
        }),
        value: name,
        onChange: this.onNameChange,
        fullWidth: true
      }))), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.spaces.management.manageSpacePage.avatarFormRowLabel', {
          defaultMessage: 'Avatar'
        })
      }, _react2.default.createElement(_eui.EuiPopover, _extends({
        id: "customizeAvatarPopover",
        button: _react2.default.createElement("button", {
          title: _i18n.i18n.translate('xpack.spaces.management.manageSpacePage.clickToCustomizeTooltip', {
            defaultMessage: 'Click to customize this space avatar'
          }),
          onClick: this.togglePopover
        }, _react2.default.createElement(_space_avatar.SpaceAvatar, {
          space: this.props.space,
          size: "l"
        })),
        closePopover: this.closePopover
      }, extraPopoverProps, {
        ownFocus: true,
        isOpen: this.state.customizingAvatar
      }), _react2.default.createElement("div", {
        style: {
          maxWidth: 240
        }
      }, _react2.default.createElement(_customize_space_avatar.CustomizeSpaceAvatar, {
        space: this.props.space,
        onChange: this.onAvatarChange
      })))))), _react2.default.createElement(_eui.EuiSpacer, null), this.props.space && (0, _common.isReservedSpace)(this.props.space) ? null : _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_space_identifier.SpaceIdentifier, {
        space: this.props.space,
        editable: !editingExistingSpace,
        onChange: this.onSpaceIdentifierChange,
        validator: validator
      })), _react2.default.createElement(_eui.EuiFormRow, _extends({
        label: _i18n.i18n.translate('xpack.spaces.management.manageSpacePage.spaceDescriptionFormRowLabel', {
          defaultMessage: 'Description (optional)'
        }),
        helpText: _i18n.i18n.translate('xpack.spaces.management.manageSpacePage.spaceDescriptionHelpText', {
          defaultMessage: 'The description appears on the Space selection screen.'
        })
      }, validator.validateSpaceDescription(this.props.space), {
        fullWidth: true
      }), _react2.default.createElement(_eui.EuiTextArea, {
        name: "description",
        value: description,
        onChange: this.onDescriptionChange,
        fullWidth: true,
        rows: 2
      }))));
    }
  }]);

  return CustomizeSpace;
}(_react2.Component);

exports.CustomizeSpace = CustomizeSpace;