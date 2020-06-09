"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainControls = MainControls;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function MainControls(_ref) {
  var toggleRequestFlyout = _ref.toggleRequestFlyout,
      isRequestFlyoutOpen = _ref.isRequestFlyoutOpen,
      reset = _ref.reset,
      links = _ref.links,
      isNavDrawerLocked = _ref.isNavDrawerLocked;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isHelpOpen = _useState2[0],
      setIsHelpOpen = _useState2[1];

  var items = [_react.default.createElement(_eui.EuiContextMenuItem, {
    key: "walkthrough",
    icon: "popout",
    href: links.painlessWalkthrough,
    target: "_blank",
    onClick: function onClick() {
      return setIsHelpOpen(false);
    }
  }, _i18n.i18n.translate('xpack.painlessLab.walkthroughButtonLabel', {
    defaultMessage: 'Walkthrough'
  })), _react.default.createElement(_eui.EuiContextMenuItem, {
    key: "api",
    icon: "popout",
    href: links.painlessAPIReference,
    target: "_blank",
    onClick: function onClick() {
      return setIsHelpOpen(false);
    }
  }, _i18n.i18n.translate('xpack.painlessLab.apiReferenceButtonLabel', {
    defaultMessage: 'API reference'
  })), _react.default.createElement(_eui.EuiContextMenuItem, {
    key: "languageSpec",
    icon: "popout",
    href: links.painlessLangSpec,
    target: "_blank",
    onClick: function onClick() {
      return setIsHelpOpen(false);
    }
  }, _i18n.i18n.translate('xpack.painlessLab.languageSpecButtonLabel', {
    defaultMessage: 'Language spec'
  })), _react.default.createElement(_eui.EuiContextMenuItem, {
    key: "reset",
    icon: "bolt",
    onClick: function onClick() {
      reset();
      setIsHelpOpen(false);
    }
  }, _i18n.i18n.translate('xpack.painlessLab.resetButtonLabel', {
    defaultMessage: 'Reset script'
  }))];
  var classes = (0, _classnames.default)('painlessLab__bottomBar', {
    'painlessLab__bottomBar-isNavDrawerLocked': isNavDrawerLocked
  });
  return _react.default.createElement(_eui.EuiBottomBar, {
    paddingSize: "s",
    className: classes
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    justifyContent: "flexStart"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "painlessLabHelpContextMenu",
    button: _react.default.createElement(_eui.EuiButtonEmpty, {
      size: "s",
      iconType: "help",
      iconSide: "left",
      color: "ghost",
      onClick: function onClick() {
        return setIsHelpOpen(!isHelpOpen);
      }
    }, _i18n.i18n.translate('xpack.painlessLab.helpButtonLabel', {
      defaultMessage: 'Help'
    })),
    isOpen: isHelpOpen,
    closePopover: function closePopover() {
      return setIsHelpOpen(false);
    },
    panelPaddingSize: "none",
    withTitle: true,
    anchorPosition: "upRight"
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    items: items
  }))))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    color: "ghost",
    onClick: toggleRequestFlyout,
    "data-test-subj": "btnViewRequest"
  }, isRequestFlyoutOpen ? _i18n.i18n.translate('xpack.painlessLab.hideRequestButtonLabel', {
    defaultMessage: 'Hide API request'
  }) : _i18n.i18n.translate('xpack.painlessLab.showRequestButtonLabel', {
    defaultMessage: 'Show API request'
  })))));
}