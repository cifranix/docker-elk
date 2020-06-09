"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHighlightTreeNode = void 0;

var _react = require("react");

var _uuid = _interopRequireDefault(require("uuid"));

var _highlight_context = require("./highlight_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useHighlightTreeNode = function useHighlightTreeNode() {
  var idRef = (0, _react.useRef)(_uuid.default.v4());

  var _useHighlightContext = (0, _highlight_context.useHighlightContext)(),
      selectedRow = _useHighlightContext.selectedRow,
      setStore = _useHighlightContext.setStore;

  var highlight = function highlight(value) {
    setStore(_objectSpread({
      id: idRef.current
    }, value));
  };

  var isHighlighted = function isHighlighted() {
    return selectedRow === idRef.current;
  };

  return {
    id: idRef.current,
    highlight: highlight,
    isHighlighted: isHighlighted
  };
};

exports.useHighlightTreeNode = useHighlightTreeNode;