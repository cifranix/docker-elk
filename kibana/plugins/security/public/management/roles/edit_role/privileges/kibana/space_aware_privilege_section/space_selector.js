"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceSelector = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../../../../spaces/public");

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

var spaceToOption = function spaceToOption(space, currentSelection) {
  if (!space) {
    return;
  }

  return {
    id: "spaceOption_".concat(space.id),
    label: space.name,
    color: (0, _public.getSpaceColor)(space),
    disabled: currentSelection === 'global' && space.id !== '*' || currentSelection === 'spaces' && space.id === '*'
  };
};

var spaceIdToOption = function spaceIdToOption(spaces) {
  return function (s) {
    return spaceToOption(spaces.find(function (space) {
      return space.id === s;
    }));
  };
};

var SpaceSelector =
/*#__PURE__*/
function (_Component) {
  _inherits(SpaceSelector, _Component);

  function SpaceSelector() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SpaceSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SpaceSelector)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (selectedSpaces) {
      _this.props.onChange(selectedSpaces.map(function (s) {
        return s.id.split('spaceOption_')[1];
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getOptions", function () {
      var options = _this.props.spaces.map(function (space) {
        return spaceToOption(space, _this.props.selectedSpaceIds.includes('*') ? 'global' : _this.props.selectedSpaceIds.length > 0 ? 'spaces' : undefined);
      });

      return options.filter(Boolean);
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedOptions", function () {
      var options = _this.props.selectedSpaceIds.map(spaceIdToOption(_this.props.spaces));

      return options.filter(Boolean);
    });

    return _this;
  }

  _createClass(SpaceSelector, [{
    key: "render",
    value: function render() {
      var renderOption = function renderOption(option, searchValue, contentClassName) {
        var color = option.color,
            label = option.label;
        return _react.default.createElement(_eui.EuiHealth, {
          color: color
        }, _react.default.createElement("span", {
          className: contentClassName
        }, _react.default.createElement(_eui.EuiHighlight, {
          search: searchValue
        }, label)));
      };

      return _react.default.createElement(_eui.EuiComboBox, {
        "data-test-subj": 'spaceSelectorComboBox',
        "aria-label": _i18n.i18n.translate('xpack.security.management.editRole.spaceSelectorLabel', {
          defaultMessage: 'Spaces'
        }),
        fullWidth: true,
        options: this.getOptions(),
        renderOption: renderOption,
        selectedOptions: this.getSelectedOptions(),
        isDisabled: this.props.disabled,
        onChange: this.onChange
      });
    }
  }]);

  return SpaceSelector;
}(_react.Component);

exports.SpaceSelector = SpaceSelector;