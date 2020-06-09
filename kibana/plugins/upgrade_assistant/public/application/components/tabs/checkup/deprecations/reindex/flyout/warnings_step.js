"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WarningsFlyoutStep = exports.idForWarning = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _types = require("../../../../../../../../common/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var idForWarning = function idForWarning(warning) {
  return "reindexWarning-".concat(warning);
};

exports.idForWarning = idForWarning;

var WarningCheckbox = function WarningCheckbox(_ref) {
  var checkedIds = _ref.checkedIds,
      warning = _ref.warning,
      label = _ref.label,
      onChange = _ref.onChange,
      description = _ref.description,
      documentationUrl = _ref.documentationUrl;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_eui.EuiCheckbox, {
    id: idForWarning(warning),
    label: _react.default.createElement("strong", null, label),
    checked: checkedIds[idForWarning(warning)],
    onChange: onChange
  }), _react.default.createElement("p", {
    className: "upgWarningsStep__warningDescription"
  }, description, _react.default.createElement("br", null), _react.default.createElement(_eui.EuiLink, {
    href: documentationUrl,
    target: "_blank"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.warningsStep.documentationLinkLabel",
    defaultMessage: "Documentation"
  })))), _react.default.createElement(_eui.EuiSpacer, null));
};

/**
 * Displays warning text about destructive changes required to reindex this index. The user
 * must acknowledge each change before being allowed to proceed.
 */
var WarningsFlyoutStep =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WarningsFlyoutStep, _React$Component);

  function WarningsFlyoutStep(props) {
    var _this;

    _classCallCheck(this, WarningsFlyoutStep);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WarningsFlyoutStep).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      var optionId = e.target.id;

      var nextCheckedIds = _objectSpread({}, _this.state.checkedIds, {}, _defineProperty({}, optionId, !_this.state.checkedIds[optionId]));

      _this.setState({
        checkedIds: nextCheckedIds
      });
    });

    _this.state = {
      checkedIds: props.warnings.reduce(function (checkedIds, warning) {
        checkedIds[idForWarning(warning)] = false;
        return checkedIds;
      }, {})
    };
    return _this;
  }

  _createClass(WarningsFlyoutStep, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          warnings = _this$props.warnings,
          closeFlyout = _this$props.closeFlyout,
          advanceNextStep = _this$props.advanceNextStep,
          renderGlobalCallouts = _this$props.renderGlobalCallouts;
      var checkedIds = this.state.checkedIds; // Do not allow to proceed until all checkboxes are checked.

      var blockAdvance = Object.values(checkedIds).filter(function (v) {
        return v;
      }).length < warnings.length;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlyoutBody, null, renderGlobalCallouts(), _react.default.createElement(_eui.EuiCallOut, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.warningsStep.destructiveCallout.calloutTitle",
          defaultMessage: "This index requires destructive changes that can't be undone"
        }),
        color: "danger",
        iconType: "alert"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.warningsStep.destructiveCallout.calloutDetail",
        defaultMessage: "Back up your index, then proceed with the reindex by accepting each breaking change."
      }))), _react.default.createElement(_eui.EuiSpacer, null), warnings.includes(_types.ReindexWarning.customTypeName) && _react.default.createElement(WarningCheckbox, {
        checkedIds: checkedIds,
        onChange: this.onChange,
        warning: _types.ReindexWarning.customTypeName,
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.warningsStep.customTypeNameWarningTitle",
          defaultMessage: "Mapping type will be changed to {defaultType}",
          values: {
            defaultType: _react.default.createElement(_eui.EuiCode, null, "_doc")
          }
        }),
        description: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.warningsStep.customTypeNameWarningDetail",
          defaultMessage: "Mapping types are no longer supported in 8.x. This index mapping does not use the default type name, {defaultType}, and will be updated when reindexed. Ensure no application code or scripts rely on a different type.",
          values: {
            defaultType: _react.default.createElement(_eui.EuiCode, null, "_doc")
          }
        }),
        documentationUrl: "https://www.elastic.co/guide/en/elasticsearch/reference/7.0/removal-of-types.html"
      }), warnings.includes(_types.ReindexWarning.apmReindex) && _react.default.createElement(WarningCheckbox, {
        checkedIds: checkedIds,
        onChange: this.onChange,
        warning: _types.ReindexWarning.apmReindex,
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.warningsStep.apmReindexWarningTitle",
          defaultMessage: "This index will be converted to ECS format"
        }),
        description: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.warningsStep.apmReindexWarningDetail",
          defaultMessage: "Starting in version 7.0.0, APM data will be represented in the Elastic Common Schema. Historical APM data will not visible until it's reindexed."
        }),
        documentationUrl: "https://www.elastic.co/guide/en/apm/get-started/master/apm-release-notes.html"
      })), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        iconType: "cross",
        onClick: closeFlyout,
        flush: "left"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.cancelButtonLabel",
        defaultMessage: "Cancel"
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        fill: true,
        color: "danger",
        onClick: advanceNextStep,
        disabled: blockAdvance
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.continueButtonLabel",
        defaultMessage: "Continue with reindex"
      }))))));
    }
  }]);

  return WarningsFlyoutStep;
}(_react.default.Component);

exports.WarningsFlyoutStep = WarningsFlyoutStep;