"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaffleGroupByControls = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _custom_field_panel = require("./custom_field_panel");

var _public = require("../../../../observability/public");

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 320px;\n  & .euiContextMenuItem__text {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  isPopoverOpen: false
};
var WaffleGroupByControls = (_temp = _class =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(WaffleGroupByControls, _React$PureComponent);

  function WaffleGroupByControls() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WaffleGroupByControls);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WaffleGroupByControls)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", initialState);

    _defineProperty(_assertThisInitialized(_this), "handleRemove", function (field) {
      return function () {
        var groupBy = _this.props.groupBy;

        _this.props.onChange(groupBy.filter(function (g) {
          return g.field !== field;
        }));

        var options = _this.props.customOptions.filter(function (g) {
          return g.field !== field;
        });

        _this.props.onChangeCustomOptions(options); // We need to close the panel after we rmeove the pill icon otherwise
        // it will remain open because the click is still captured by the EuiFilterButton


        setTimeout(function () {
          return _this.handleClose();
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.setState({
        isPopoverOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleToggle", function () {
      _this.setState(function (state) {
        return {
          isPopoverOpen: !state.isPopoverOpen
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCustomField", function (field) {
      var options = [].concat(_toConsumableArray(_this.props.customOptions), [{
        text: field,
        field: field
      }]);

      _this.props.onChangeCustomOptions(options);

      var fn = _this.handleClick(field);

      fn();
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (field) {
      return function () {
        var groupBy = _this.props.groupBy;

        if (groupBy.some(function (g) {
          return g.field === field;
        })) {
          _this.handleRemove(field)();
        } else if (_this.props.groupBy.length < 2) {
          _this.props.onChange([].concat(_toConsumableArray(groupBy), [{
            field: field
          }]));
        }

        _this.handleClose();
      };
    });

    return _this;
  }

  _createClass(WaffleGroupByControls, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          nodeType = _this$props.nodeType,
          groupBy = _this$props.groupBy;
      var customOptions = this.props.customOptions.map(function (option) {
        return _objectSpread({}, option, {
          toolTipContent: option.text
        });
      });
      var options = this.props.options.concat(customOptions);

      if (!options.length) {
        throw Error(_i18n.i18n.translate('xpack.infra.waffle.unableToSelectGroupErrorMessage', {
          defaultMessage: 'Unable to select group by options for {nodeType}',
          values: {
            nodeType: nodeType
          }
        }));
      }

      var isMaxGroupingsSelected = groupBy.length >= 2;

      var maxGroupByTooltip = _i18n.i18n.translate('xpack.infra.waffle.maxGroupByTooltip', {
        defaultMessage: 'Only two groupings can be selected at a time'
      });

      var panels = [{
        id: 'firstPanel',
        title: _i18n.i18n.translate('xpack.infra.waffle.selectTwoGroupingsTitle', {
          defaultMessage: 'Select up to two groupings'
        }),
        items: [{
          name: _i18n.i18n.translate('xpack.infra.waffle.customGroupByOptionName', {
            defaultMessage: 'Custom field'
          }),
          disabled: isMaxGroupingsSelected,
          toolTipContent: isMaxGroupingsSelected ? maxGroupByTooltip : null,
          icon: 'empty',
          panel: 'customPanel'
        }].concat(_toConsumableArray(options.map(function (o) {
          var icon = groupBy.some(function (g) {
            return g.field === o.field;
          }) ? 'check' : 'empty';
          var panel = {
            name: o.text,
            onClick: _this2.handleClick(o.field),
            icon: icon
          };

          if (o.toolTipContent) {
            panel.toolTipContent = o.toolTipContent;
          }

          if (isMaxGroupingsSelected && icon === 'empty') {
            panel.toolTipContent = maxGroupByTooltip;
            panel.disabled = true;
          }

          return panel;
        })))
      }, {
        id: 'customPanel',
        title: _i18n.i18n.translate('xpack.infra.waffle.customGroupByPanelTitle', {
          defaultMessage: 'Group By Custom Field'
        }),
        width: 685,
        content: _react2.default.createElement(_custom_field_panel.CustomFieldPanel, {
          currentOptions: this.props.customOptions,
          onSubmit: this.handleCustomField,
          fields: this.props.fields
        })
      }];
      var buttonBody = groupBy.length > 0 ? groupBy.map(function (g) {
        return options.find(function (o) {
          return o.field === g.field;
        });
      }).filter(function (o) {
        return o != null;
      }) // In this map the `o && o.field` is totally unnecessary but Typescript is
      // too stupid to realize that the filter above prevents the next map from being null
      .map(function (o) {
        return _react2.default.createElement(_eui.EuiBadge, {
          key: o && o.field
        }, o && o.text);
      }) : _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.infra.waffle.groupByAllTitle",
        defaultMessage: "All"
      });

      var button = _react2.default.createElement(_eui.EuiFilterButton, {
        iconType: "arrowDown",
        onClick: this.handleToggle
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.infra.waffle.groupByButtonLabel",
        defaultMessage: "Group By: "
      }), buttonBody);

      return _react2.default.createElement(_eui.EuiFilterGroup, null, _react2.default.createElement(_eui.EuiPopover, {
        isOpen: this.state.isPopoverOpen,
        id: "groupByPanel",
        button: button,
        panelPaddingSize: "none",
        closePopover: this.handleClose
      }, _react2.default.createElement(StyledContextMenu, {
        initialPanelId: "firstPanel",
        panels: panels
      })));
    }
  }]);

  return WaffleGroupByControls;
}(_react2.default.PureComponent), _defineProperty(_class, "displayName", 'WaffleGroupByControls'), _temp);
exports.WaffleGroupByControls = WaffleGroupByControls;
var StyledContextMenu = (0, _public.euiStyled)(_eui.EuiContextMenu)(_templateObject());