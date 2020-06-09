"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureTable = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _lodash = _interopRequireDefault(require("lodash"));

var _react2 = _interopRequireWildcard(require("react"));

var _toggle_all_features = require("./toggle_all_features");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var FeatureTable =
/*#__PURE__*/
function (_Component) {
  _inherits(FeatureTable, _Component);

  function FeatureTable() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FeatureTable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FeatureTable)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (featureId) {
      return function (e) {
        var updatedSpace = _objectSpread({}, _this.props.space);

        var disabledFeatures = updatedSpace.disabledFeatures || [];
        var isFeatureEnabled = e.target.checked;

        if (isFeatureEnabled) {
          disabledFeatures = disabledFeatures.filter(function (feature) {
            return feature !== featureId;
          });
        } else {
          disabledFeatures = _lodash.default.uniq([].concat(_toConsumableArray(disabledFeatures), [featureId]));
        }

        updatedSpace.disabledFeatures = disabledFeatures;

        _this.props.onChange(updatedSpace);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeAll", function (visible) {
      var updatedSpace = _objectSpread({}, _this.props.space);

      if (visible) {
        updatedSpace.disabledFeatures = [];
      } else {
        updatedSpace.disabledFeatures = _this.props.features.map(function (feature) {
          return feature.id;
        });
      }

      _this.props.onChange(updatedSpace);
    });

    _defineProperty(_assertThisInitialized(_this), "getColumns", function () {
      return [{
        field: 'feature',
        name: _i18n.i18n.translate('xpack.spaces.management.enabledSpaceFeaturesFeatureColumnTitle', {
          defaultMessage: 'Feature'
        }),
        render: function render(feature, _item) {
          return _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement(_eui.EuiIcon, {
            size: "m",
            type: feature.icon
          }), "\u2002 ", feature.name);
        }
      }, {
        field: 'space',
        width: '150',
        name: _react2.default.createElement("span", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.spaces.management.enabledSpaceFeaturesEnabledColumnTitle",
          defaultMessage: "Show?"
        }), _react2.default.createElement(_toggle_all_features.ToggleAllFeatures, {
          onChange: _this.onChangeAll
        })),
        render: function render(spaceEntry, record) {
          var checked = !(spaceEntry.disabledFeatures && spaceEntry.disabledFeatures.includes(record.feature.id));
          return _react2.default.createElement(_eui.EuiSwitch, {
            id: record.feature.id,
            checked: checked,
            onChange: _this.onChange(record.feature.id),
            label: "".concat(record.feature.name, " visible"),
            showLabel: false
          });
        }
      }];
    });

    return _this;
  }

  _createClass(FeatureTable, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          space = _this$props.space,
          features = _this$props.features;
      var items = features.map(function (feature) {
        return {
          feature: feature,
          space: space
        };
      });
      return _react2.default.createElement(_eui.EuiInMemoryTable, {
        columns: this.getColumns(),
        items: items
      });
    }
  }]);

  return FeatureTable;
}(_react2.Component);

exports.FeatureTable = FeatureTable;