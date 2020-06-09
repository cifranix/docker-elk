"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceAvatar = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _common = require("../../common");

var _space_attributes = require("./space_attributes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SpaceAvatar = function SpaceAvatar(props) {
  var space = props.space,
      size = props.size,
      announceSpaceName = props.announceSpaceName,
      rest = _objectWithoutProperties(props, ["space", "size", "announceSpaceName"]);

  var spaceName = space.name ? space.name.trim() : '';
  var spaceColor = (0, _space_attributes.getSpaceColor)(space);
  return _react.default.createElement(_eui.EuiAvatar, _extends({
    type: "space",
    "data-test-subj": "space-avatar-".concat(space.id),
    name: spaceName
  }, !announceSpaceName && {
    // provide empty aria-label so EUI doesn't try to provide its own
    'aria-label': '',
    'aria-hidden': true
  }, {
    size: size || 'm',
    initialsLength: _common.MAX_SPACE_INITIALS,
    initials: (0, _space_attributes.getSpaceInitials)(space),
    color: (0, _eui.isValidHex)(spaceColor) ? spaceColor : '',
    imageUrl: (0, _space_attributes.getSpaceImageUrl)(space)
  }, rest));
};

exports.SpaceAvatar = SpaceAvatar;
SpaceAvatar.defaultProps = {
  announceSpaceName: true
};