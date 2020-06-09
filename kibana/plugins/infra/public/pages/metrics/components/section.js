"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Section = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _side_nav_context = require("../lib/side_nav_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Section = function Section(_ref) {
  var children = _ref.children,
      metrics = _ref.metrics,
      navLabel = _ref.navLabel,
      sectionLabel = _ref.sectionLabel,
      onChangeRangeTime = _ref.onChangeRangeTime,
      isLiveStreaming = _ref.isLiveStreaming,
      stopLiveStreaming = _ref.stopLiveStreaming;

  var _useContext = (0, _react.useContext)(_side_nav_context.SideNavContext),
      addNavItem = _useContext.addNavItem;

  var subNavItems = _react.Children.toArray(children).reduce(function (accumulatedChildren, child) {
    var _ref2;

    if (!(0, _react.isValidElement)(child)) {
      return accumulatedChildren;
    }

    var metric = (_ref2 = metrics === null || metrics === void 0 ? void 0 : metrics.find(function (m) {
      return m.id === child.props.id;
    })) !== null && _ref2 !== void 0 ? _ref2 : null;

    if (metric === null) {
      return accumulatedChildren;
    }

    return [].concat(_toConsumableArray(accumulatedChildren), [{
      id: child.props.id,
      name: child.props.label,
      onClick: function onClick() {
        var el = document.getElementById(child.props.id);

        if (el) {
          el.scrollIntoView();
        }
      }
    }]);
  }, []);

  var childrenWithProps = _react.Children.map(children, function (child) {
    return (0, _react.isValidElement)(child) ? (0, _react.cloneElement)(child, {
      metrics: metrics,
      onChangeRangeTime: onChangeRangeTime,
      isLiveStreaming: isLiveStreaming,
      stopLiveStreaming: stopLiveStreaming
    }) : null;
  });

  if (metrics && subNavItems.length) {
    addNavItem({
      id: navLabel,
      name: navLabel,
      items: subNavItems
    });
    return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", null, sectionLabel)), childrenWithProps);
  }

  return null;
};

exports.Section = Section;