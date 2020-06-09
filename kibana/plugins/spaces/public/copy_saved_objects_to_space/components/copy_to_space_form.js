"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyToSpaceForm = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _selectable_spaces_control = require("./selectable_spaces_control");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CopyToSpaceForm = function CopyToSpaceForm(props) {
  var setOverwrite = function setOverwrite(overwrite) {
    return props.onUpdate(_objectSpread({}, props.copyOptions, {
      overwrite: overwrite
    }));
  };

  var setSelectedSpaceIds = function setSelectedSpaceIds(selectedSpaceIds) {
    return props.onUpdate(_objectSpread({}, props.copyOptions, {
      selectedSpaceIds: selectedSpaceIds
    }));
  };

  return _react.default.createElement("div", {
    "data-test-subj": "copy-to-space-form"
  }, _react.default.createElement(_eui.EuiListGroup, {
    className: "spcCopyToSpaceOptionsView",
    flush: true
  }, _react.default.createElement(_eui.EuiListGroupItem, {
    className: "spcCopyToSpaceIncludeRelated",
    iconType: 'check',
    label: _react.default.createElement("span", {
      className: "spcCopyToSpaceIncludeRelated__label"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpace.includeRelatedFormLabel",
      defaultMessage: "Including related saved objects"
    }))
  })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiSwitch, {
    "data-test-subj": "cts-form-overwrite",
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpace.automaticallyOverwrite",
      defaultMessage: "Automatically overwrite all saved objects"
    }),
    checked: props.copyOptions.overwrite,
    onChange: function onChange(e) {
      return setOverwrite(e.target.checked);
    }
  }), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpace.selectSpacesLabel",
      defaultMessage: "Select spaces to copy into"
    }),
    fullWidth: true
  }, _react.default.createElement(_selectable_spaces_control.SelectableSpacesControl, {
    spaces: props.spaces,
    selectedSpaceIds: props.copyOptions.selectedSpaceIds,
    onChange: function onChange(selection) {
      return setSelectedSpaceIds(selection);
    }
  })));
};

exports.CopyToSpaceForm = CopyToSpaceForm;