"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsSideNav = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  z-index: 1;\n  height: 88vh;\n  padding-left: 16px;\n  margin-left: -16px;\n  overflow-y: auto;\n  overflow-x: hidden;\n"]);

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

var MetricsSideNav = function MetricsSideNav(_ref) {
  var loading = _ref.loading,
      name = _ref.name,
      items = _ref.items;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpenOnMobile = _useState2[0],
      setMobileState = _useState2[1];

  var toggle = (0, _react.useCallback)(function () {
    setMobileState(!isOpenOnMobile);
  }, [isOpenOnMobile]);
  var content = loading ? null : _react.default.createElement(_eui.EuiSideNav, {
    items: items
  });
  var mobileContent = loading ? null : _react.default.createElement(_eui.EuiSideNav, {
    items: items,
    mobileTitle: name,
    toggleOpenOnMobile: toggle,
    isOpenOnMobile: isOpenOnMobile
  });
  return _react.default.createElement(_eui.EuiPageSideBar, null, _react.default.createElement(_eui.EuiHideFor, {
    sizes: ['xs', 's']
  }, _react.default.createElement(SideNavContainer, null, content)), _react.default.createElement(_eui.EuiShowFor, {
    sizes: ['xs', 's']
  }, mobileContent));
};

exports.MetricsSideNav = MetricsSideNav;

var SideNavContainer = _public.euiStyled.div(_templateObject());