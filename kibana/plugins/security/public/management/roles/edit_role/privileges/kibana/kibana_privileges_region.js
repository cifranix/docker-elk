"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaPrivilegesRegion = void 0;

var _react = _interopRequireWildcard(require("react"));

var _collapsible_panel = require("../../collapsible_panel");

var _simple_privilege_section = require("./simple_privilege_section");

var _space_aware_privilege_section = require("./space_aware_privilege_section");

var _transform_error_section = require("./transform_error_section");

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

var KibanaPrivilegesRegion =
/*#__PURE__*/
function (_Component) {
  _inherits(KibanaPrivilegesRegion, _Component);

  function KibanaPrivilegesRegion() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, KibanaPrivilegesRegion);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(KibanaPrivilegesRegion)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getForm", function () {
      var _this$props = _this.props,
          kibanaPrivileges = _this$props.kibanaPrivileges,
          role = _this$props.role,
          spacesEnabled = _this$props.spacesEnabled,
          canCustomizeSubFeaturePrivileges = _this$props.canCustomizeSubFeaturePrivileges,
          _this$props$spaces = _this$props.spaces,
          spaces = _this$props$spaces === void 0 ? [] : _this$props$spaces,
          uiCapabilities = _this$props.uiCapabilities,
          onChange = _this$props.onChange,
          editable = _this$props.editable,
          validator = _this$props.validator;

      if (role._transform_error && role._transform_error.includes('kibana')) {
        return _react.default.createElement(_transform_error_section.TransformErrorSection, null);
      }

      if (spacesEnabled) {
        return _react.default.createElement(_space_aware_privilege_section.SpaceAwarePrivilegeSection, {
          kibanaPrivileges: kibanaPrivileges,
          role: role,
          spaces: spaces,
          uiCapabilities: uiCapabilities,
          onChange: onChange,
          editable: editable,
          canCustomizeSubFeaturePrivileges: canCustomizeSubFeaturePrivileges,
          validator: validator
        });
      } else {
        return _react.default.createElement(_simple_privilege_section.SimplePrivilegeSection, {
          kibanaPrivileges: kibanaPrivileges,
          role: role,
          onChange: onChange,
          editable: editable,
          canCustomizeSubFeaturePrivileges: canCustomizeSubFeaturePrivileges
        });
      }
    });

    return _this;
  }

  _createClass(KibanaPrivilegesRegion, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_collapsible_panel.CollapsiblePanel, {
        iconType: 'logoKibana',
        title: 'Kibana'
      }, this.getForm());
    }
  }]);

  return KibanaPrivilegesRegion;
}(_react.Component);

exports.KibanaPrivilegesRegion = KibanaPrivilegesRegion;