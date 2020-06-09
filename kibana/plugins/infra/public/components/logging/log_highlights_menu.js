"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogHighlightsMenu = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _react2 = _interopRequireWildcard(require("react"));

var _public = require("../../../../observability/public");

var _use_visibility_state = require("../../utils/use_visibility_state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: 300px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding-left: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var LogHighlightsMenu = function LogHighlightsMenu(_ref) {
  var onChange = _ref.onChange,
      isLoading = _ref.isLoading,
      activeHighlights = _ref.activeHighlights,
      hasPreviousHighlight = _ref.hasPreviousHighlight,
      goToPreviousHighlight = _ref.goToPreviousHighlight,
      hasNextHighlight = _ref.hasNextHighlight,
      goToNextHighlight = _ref.goToNextHighlight;

  var _useVisibilityState = (0, _use_visibility_state.useVisibilityState)(false),
      isPopoverOpen = _useVisibilityState.isVisible,
      closePopover = _useVisibilityState.hide,
      togglePopover = _useVisibilityState.toggle; // Input field state


  var _useState = (0, _react2.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      highlightTerm = _useState2[0],
      _setHighlightTerm = _useState2[1];

  var debouncedOnChange = (0, _react2.useMemo)(function () {
    return (0, _lodash.debounce)(onChange, 275);
  }, [onChange]);
  var setHighlightTerm = (0, _react2.useCallback)(function (valueOrUpdater) {
    return _setHighlightTerm(function (previousHighlightTerm) {
      var newHighlightTerm = typeof valueOrUpdater === 'function' ? valueOrUpdater(previousHighlightTerm) : valueOrUpdater;

      if (newHighlightTerm !== previousHighlightTerm) {
        debouncedOnChange([newHighlightTerm]);
      }

      return newHighlightTerm;
    });
  }, [debouncedOnChange]);
  var changeHighlightTerm = (0, _react2.useCallback)(function (e) {
    var value = e.target.value;
    setHighlightTerm(value);
  }, [setHighlightTerm]);
  var clearHighlightTerm = (0, _react2.useCallback)(function () {
    return setHighlightTerm('');
  }, [setHighlightTerm]);

  var button = _react2.default.createElement(_eui.EuiButtonEmpty, {
    color: "text",
    size: "xs",
    iconType: "brush",
    onClick: togglePopover
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.highlights.highlightsPopoverButtonLabel",
    defaultMessage: "Highlights"
  }), activeHighlights ? _react2.default.createElement(ActiveHighlightsIndicator, null) : null);

  return _react2.default.createElement(_eui.EuiPopover, {
    id: "popover",
    button: button,
    isOpen: isPopoverOpen,
    closePopover: closePopover,
    ownFocus: true
  }, _react2.default.createElement(LogHighlightsMenuContent, null, _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s"
  }, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFieldText, {
    placeholder: termsFieldLabel,
    fullWidth: true,
    value: highlightTerm,
    onChange: changeHighlightTerm,
    isLoading: isLoading,
    "aria-label": termsFieldLabel
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": goToPreviousHighlightLabel,
    iconType: "arrowUp",
    onClick: goToPreviousHighlight,
    title: goToPreviousHighlightLabel,
    isDisabled: !hasPreviousHighlight
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": goToNextHighlightLabel,
    iconType: "arrowDown",
    onClick: goToNextHighlight,
    title: goToNextHighlightLabel,
    isDisabled: !hasNextHighlight
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": clearTermsButtonLabel,
    color: "danger",
    isDisabled: highlightTerm === '',
    iconType: "trash",
    onClick: clearHighlightTerm,
    title: clearTermsButtonLabel
  })))));
};

exports.LogHighlightsMenu = LogHighlightsMenu;

var termsFieldLabel = _i18n.i18n.translate('xpack.infra.logs.highlights.highlightTermsFieldLabel', {
  defaultMessage: 'Terms to highlight'
});

var clearTermsButtonLabel = _i18n.i18n.translate('xpack.infra.logs.highlights.clearHighlightTermsButtonLabel', {
  defaultMessage: 'Clear terms to highlight'
});

var goToPreviousHighlightLabel = _i18n.i18n.translate('xpack.infra.logs.highlights.goToPreviousHighlightButtonLabel', {
  defaultMessage: 'Jump to previous highlight'
});

var goToNextHighlightLabel = _i18n.i18n.translate('xpack.infra.logs.highlights.goToNextHighlightButtonLabel', {
  defaultMessage: 'Jump to next highlight'
});

var ActiveHighlightsIndicator = (0, _public.euiStyled)(_eui.EuiIcon).attrs(function (_ref2) {
  var theme = _ref2.theme;
  return {
    type: 'checkInCircleFilled',
    size: 'm',
    color: theme.eui.euiColorAccent
  };
})(_templateObject(), function (props) {
  return props.theme.eui.paddingSizes.xs;
});

var LogHighlightsMenuContent = _public.euiStyled.div(_templateObject2());