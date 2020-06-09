"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedSettingsSubtitle = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AdvancedSettingsSubtitle = function AdvancedSettingsSubtitle(props) {
  var _useState = (0, _react2.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      activeSpace = _useState2[0],
      setActiveSpace = _useState2[1];

  (0, _react2.useEffect)(function () {
    props.getActiveSpace().then(function (space) {
      return setActiveSpace(space);
    });
  }, [props]);
  if (!activeSpace) return null;
  return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, {
    size: 'm'
  }), _react2.default.createElement(_eui.EuiCallOut, {
    color: "primary",
    iconType: "spacesApp",
    title: _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.spaces.management.advancedSettingsSubtitle.applyingSettingsOnPageToSpaceDescription",
      defaultMessage: "The settings on this page apply to the {spaceName} space, unless otherwise specified.",
      values: {
        spaceName: _react2.default.createElement("strong", null, activeSpace.name)
      }
    }))
  }));
};

exports.AdvancedSettingsSubtitle = AdvancedSettingsSubtitle;