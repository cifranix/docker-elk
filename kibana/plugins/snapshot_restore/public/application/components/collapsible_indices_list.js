"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsibleIndicesList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CollapsibleIndicesList = function CollapsibleIndicesList(_ref) {
  var indices = _ref.indices;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isShowingFullIndicesList = _useState2[0],
      setIsShowingFullIndicesList = _useState2[1];

  var displayIndices = indices ? typeof indices === 'string' ? indices.split(',') : indices : undefined;
  var hiddenIndicesCount = displayIndices && displayIndices.length > 10 ? displayIndices.length - 10 : 0;
  return _react.default.createElement(_react.default.Fragment, null, displayIndices ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("ul", null, (isShowingFullIndicesList ? displayIndices : _toConsumableArray(displayIndices).splice(0, 10)).map(function (index) {
    return _react.default.createElement("li", {
      key: index
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "xs"
    }, _react.default.createElement("span", null, index)));
  }))), hiddenIndicesCount ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_eui.EuiLink, {
    onClick: function onClick() {
      return isShowingFullIndicesList ? setIsShowingFullIndicesList(false) : setIsShowingFullIndicesList(true);
    }
  }, isShowingFullIndicesList ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.indicesList.indicesCollapseAllLink",
    defaultMessage: "Hide {count, plural, one {# index} other {# indices}}",
    values: {
      count: hiddenIndicesCount
    }
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.indicesList.indicesExpandAllLink",
    defaultMessage: "Show {count, plural, one {# index} other {# indices}}",
    values: {
      count: hiddenIndicesCount
    }
  }), ' ', _react.default.createElement(_eui.EuiIcon, {
    type: isShowingFullIndicesList ? 'arrowUp' : 'arrowDown'
  }))) : null) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.indicesList.allIndicesValue",
    defaultMessage: "All indices"
  }));
};

exports.CollapsibleIndicesList = CollapsibleIndicesList;