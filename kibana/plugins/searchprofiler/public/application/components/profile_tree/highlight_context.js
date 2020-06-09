"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHighlightContext = exports.HighlightContextProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var HighlightContext = (0, _react.createContext)(null);

var HighlightContextProvider = function HighlightContextProvider(_ref) {
  var children = _ref.children,
      onHighlight = _ref.onHighlight;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      selectedRow = _useState2[0],
      setSelectedRow = _useState2[1];

  return _react.default.createElement(HighlightContext.Provider, {
    value: {
      selectedRow: selectedRow,
      setStore: function setStore(_ref2) {
        var id = _ref2.id,
            onHighlightChangeArgs = _objectWithoutProperties(_ref2, ["id"]);

        onHighlight(onHighlightChangeArgs);
        setSelectedRow(id);
      }
    }
  }, children);
};

exports.HighlightContextProvider = HighlightContextProvider;

var useHighlightContext = function useHighlightContext() {
  var ctx = (0, _react.useContext)(HighlightContext);

  if (ctx == null) {
    throw new Error("useHighlightContext must be called inside HighlightContext");
  }

  return ctx;
};

exports.useHighlightContext = useHighlightContext;