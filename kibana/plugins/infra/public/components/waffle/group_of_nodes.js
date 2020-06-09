"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupOfNodes = void 0;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

var _group_name = require("./group_name");

var _node = require("./node");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  background-color: rgba(0, 0, 0, 0.05);\n  flex-wrap: wrap;\n  justify-content: center;\n  padding: 20px 10px 10px;\n  border-radius: 4px;\n  border: 1px solid ", ";\n  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin: 0 10px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var GroupOfNodes = function GroupOfNodes(_ref) {
  var group = _ref.group,
      options = _ref.options,
      formatter = _ref.formatter,
      onDrilldown = _ref.onDrilldown,
      _ref$isChild = _ref.isChild,
      isChild = _ref$isChild === void 0 ? false : _ref$isChild,
      bounds = _ref.bounds,
      nodeType = _ref.nodeType,
      currentTime = _ref.currentTime;
  var width = group.width > 200 ? group.width : 200;
  return _react.default.createElement(GroupOfNodesContainer, {
    style: {
      width: width
    }
  }, _react.default.createElement(_group_name.GroupName, {
    group: group,
    onDrilldown: onDrilldown,
    isChild: isChild,
    options: options
  }), _react.default.createElement(Nodes, null, group.nodes.map(function (node) {
    return _react.default.createElement(_node.Node, {
      key: node.pathId,
      options: options,
      squareSize: group.squareSize,
      node: node,
      formatter: formatter,
      bounds: bounds,
      nodeType: nodeType,
      currentTime: currentTime
    });
  })));
};

exports.GroupOfNodes = GroupOfNodes;

var GroupOfNodesContainer = _public.euiStyled.div(_templateObject());

var Nodes = _public.euiStyled.div(_templateObject2(), function (props) {
  return props.theme.eui.euiBorderColor;
});