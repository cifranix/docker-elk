"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphVisualization = GraphVisualization;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _d = _interopRequireDefault(require("d3"));

var _eui = require("@elastic/eui");

var _persistence = require("../../services/persistence");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function registerZooming(element) {
  var blockScroll = function blockScroll() {
    _d.default.event.preventDefault();
  };

  _d.default.select(element).on('mousewheel', blockScroll).on('DOMMouseScroll', blockScroll).call(_d.default.behavior.zoom().on('zoom', function () {
    var event = _d.default.event;

    _d.default.select(element).select('g').attr('transform', 'translate(' + event.translate + ')' + 'scale(' + event.scale + ')').attr('style', 'stroke-width: ' + 1 / event.scale);
  }));
}

function GraphVisualization(_ref) {
  var nodes = _ref.nodes,
      edges = _ref.edges,
      edgeClick = _ref.edgeClick,
      nodeClick = _ref.nodeClick;
  var svgRoot = (0, _react.useRef)(null);
  return _react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "gphGraph",
    width: "100%",
    height: "100%",
    pointerEvents: "all",
    id: "graphSvg",
    ref: function ref(element) {
      if (element && svgRoot.current !== element) {
        svgRoot.current = element;
        registerZooming(element);
      }
    }
  }, _react.default.createElement("g", null, _react.default.createElement("g", null, edges && edges.map(function (edge) {
    return _react.default.createElement("line", {
      key: "".concat((0, _persistence.makeNodeId)(edge.source.data.field, edge.source.data.term), "-").concat((0, _persistence.makeNodeId)(edge.target.data.field, edge.target.data.term)),
      x1: edge.topSrc.kx,
      y1: edge.topSrc.ky,
      x2: edge.topTarget.kx,
      y2: edge.topTarget.ky,
      onClick: function onClick() {
        edgeClick(edge);
      },
      className: (0, _classnames.default)('gphEdge', {
        'gphEdge--selected': edge.isSelected
      }),
      style: {
        strokeWidth: edge.width
      },
      strokeLinecap: "round"
    });
  })), nodes && nodes.filter(function (node) {
    return !node.parent;
  }).map(function (node) {
    return _react.default.createElement("g", {
      key: (0, _persistence.makeNodeId)(node.data.field, node.data.term),
      onClick: function onClick(e) {
        nodeClick(node, e);
      },
      onMouseDown: function onMouseDown(e) {
        // avoid selecting text when selecting nodes
        if (e.ctrlKey || e.shiftKey) {
          e.preventDefault();
        }
      },
      className: "gphNode"
    }, _react.default.createElement("circle", {
      cx: node.kx,
      cy: node.ky,
      r: node.scaledSize,
      className: (0, _classnames.default)('gphNode__circle', {
        'gphNode__circle--selected': node.isSelected
      }),
      style: {
        fill: node.color
      }
    }), node.icon && _react.default.createElement("text", {
      className: (0, _classnames.default)('fa gphNode__text', {
        'gphNode__text--inverse': _eui.isColorDark.apply(void 0, _toConsumableArray((0, _eui.hexToRgb)(node.color)))
      }),
      transform: "translate(0,5)",
      textAnchor: "middle",
      x: node.kx,
      y: node.ky
    }, node.icon.code), node.label.length < 30 && _react.default.createElement("text", {
      className: "gphNode__label",
      textAnchor: "middle",
      transform: "translate(0,22)",
      x: node.kx,
      y: node.ky
    }, node.label), node.label.length >= 30 && _react.default.createElement("foreignObject", {
      width: "100",
      height: "20",
      transform: "translate(-50,15)",
      x: node.kx,
      y: node.ky
    }, _react.default.createElement("p", {
      className: "gphNode__label gphNode__label--html gphNoUserSelect"
    }, node.label)), node.numChildren > 0 && _react.default.createElement("g", null, _react.default.createElement("circle", {
      r: "5",
      className: "gphNode__markerCircle",
      transform: "translate(10,10)",
      cx: node.kx,
      cy: node.ky
    }), _react.default.createElement("text", {
      className: "gphNode__markerText",
      textAnchor: "middle",
      transform: "translate(10,12)",
      x: node.kx,
      y: node.ky
    }, node.numChildren)));
  })));
}