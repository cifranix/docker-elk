"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateJobLinkCard = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Component for rendering a card which links to the Create Job page, displaying an
// icon, card title, description and link.
var CreateJobLinkCard = function CreateJobLinkCard(_ref) {
  var icon = _ref.icon,
      iconAreaLabel = _ref.iconAreaLabel,
      title = _ref.title,
      description = _ref.description,
      onClick = _ref.onClick,
      href = _ref.href,
      isDisabled = _ref.isDisabled,
      dateTestSubj = _ref['data-test-subj'];

  var linkHrefAndOnClickProps = _objectSpread({}, href ? {
    href: href
  } : {}, {}, onClick ? {
    onClick: onClick
  } : {});

  return _react.default.createElement(_eui.EuiPanel, {
    style: {
      cursor: isDisabled ? 'not-allowed' : undefined
    }
  }, _react.default.createElement(_eui.EuiLink, _extends({
    style: {
      display: 'block',
      pointerEvents: isDisabled ? 'none' : undefined,
      background: 'transparent',
      outline: 'none'
    },
    "data-test-subj": dateTestSubj,
    color: "subdued"
  }, linkHrefAndOnClickProps), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "l",
    responsive: true
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      paddingTop: '8px'
    }
  }, typeof icon === 'string' ? _react.default.createElement(_eui.EuiIcon, {
    size: "xl",
    type: icon,
    "aria-label": iconAreaLabel
  }) : icon), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, title)), _react.default.createElement(_eui.EuiText, {
    color: "subdued"
  }, _react.default.createElement("p", null, description))))));
};

exports.CreateJobLinkCard = CreateJobLinkCard;