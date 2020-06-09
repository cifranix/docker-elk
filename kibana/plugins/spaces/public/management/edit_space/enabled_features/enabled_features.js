"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnabledFeatures = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _feature_utils = require("../../lib/feature_utils");

var _section_panel = require("../section_panel");

var _feature_table = require("./feature_table");

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

var EnabledFeatures =
/*#__PURE__*/
function (_Component) {
  _inherits(EnabledFeatures, _Component);

  function EnabledFeatures() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EnabledFeatures);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EnabledFeatures)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getPanelTitle", function () {
      var featureCount = _this.props.features.length;
      var enabledCount = (0, _feature_utils.getEnabledFeatures)(_this.props.features, _this.props.space).length;
      var details = null;

      if (enabledCount === featureCount) {
        details = _react2.default.createElement(_eui.EuiText, {
          size: 's',
          style: {
            display: 'inline-block'
          }
        }, _react2.default.createElement("em", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.spaces.management.enabledSpaceFeatures.allFeaturesEnabledMessage",
          defaultMessage: "(all features visible)"
        })));
      } else if (enabledCount === 0) {
        details = _react2.default.createElement(_eui.EuiText, {
          color: "danger",
          size: 's',
          style: {
            display: 'inline-block'
          }
        }, _react2.default.createElement("em", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.spaces.management.enabledSpaceFeatures.noFeaturesEnabledMessage",
          defaultMessage: "(no features visible)"
        })));
      } else {
        details = _react2.default.createElement(_eui.EuiText, {
          size: 's',
          style: {
            display: 'inline-block'
          }
        }, _react2.default.createElement("em", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.spaces.management.enabledSpaceFeatures.someFeaturesEnabledMessage",
          defaultMessage: "({enabledCount} / {featureCount} features visible)",
          values: {
            enabledCount: enabledCount,
            featureCount: featureCount
          }
        })));
      }

      return _react2.default.createElement("span", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.enabledSpaceFeatures.enabledFeaturesSectionMessage",
        defaultMessage: "Customize feature display"
      }), ' ', details);
    });

    _defineProperty(_assertThisInitialized(_this), "getDescription", function () {
      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiText, {
        size: "s",
        color: "subdued"
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.enabledSpaceFeatures.notASecurityMechanismMessage",
        defaultMessage: "The feature is hidden in the UI, but is not disabled."
      })), _this.props.securityEnabled && _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.enabledSpaceFeatures.goToRolesLink",
        defaultMessage: "Want to secure access? Go to {rolesLink}.",
        values: {
          rolesLink: _react2.default.createElement(_eui.EuiLink, {
            href: "#/management/security/roles"
          }, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.spaces.management.enabledSpaceFeatures.rolesLinkText",
            defaultMessage: "Roles"
          }))
        }
      }))));
    });

    return _this;
  }

  _createClass(EnabledFeatures, [{
    key: "render",
    value: function render() {
      var description = _i18n.i18n.translate('xpack.spaces.management.manageSpacePage.customizeVisibleFeatures', {
        defaultMessage: 'Customize visible features'
      });

      return _react2.default.createElement(_section_panel.SectionPanel, {
        collapsible: true,
        initiallyCollapsed: true,
        title: this.getPanelTitle(),
        description: description,
        "data-test-subj": "enabled-features-panel"
      }, _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.enabledSpaceFeatures.enableFeaturesInSpaceMessage",
        defaultMessage: "Control which features are visible in this space."
      }))), _react2.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), this.getDescription()), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_feature_table.FeatureTable, {
        features: this.props.features,
        space: this.props.space,
        onChange: this.props.onChange
      }))));
    }
  }]);

  return EnabledFeatures;
}(_react2.Component);

exports.EnabledFeatures = EnabledFeatures;