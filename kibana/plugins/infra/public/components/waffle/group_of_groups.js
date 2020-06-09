"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupOfGroups = void 0;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

var _group_name = require("./group_name");

var _group_of_nodes = require("./group_of_nodes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  background-color: rgba(0, 0, 0, 0.05);\n  flex-wrap: wrap;\n  justify-content: center;\n  padding: 20px 10px 10px;\n  border-radius: 4px;\n  border: 1px solid ", ";\n  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin: 0 10px;\n  width: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var GroupOfGroups = function GroupOfGroups(props) {
  return _react.default.createElement(GroupOfGroupsContainer, null, _react.default.createElement(_group_name.GroupName, {
    group: props.group,
    onDrilldown: props.onDrilldown,
    options: props.options
  }), _react.default.createElement(Groups, null, props.group.groups.map(function (group) {
    return _react.default.createElement(_group_of_nodes.GroupOfNodes, {
      isChild: true,
      key: group.id,
      onDrilldown: props.onDrilldown,
      options: props.options,
      group: group,
      formatter: props.formatter,
      bounds: props.bounds,
      nodeType: props.nodeType,
      currentTime: props.currentTime
    });
  })));
};

exports.GroupOfGroups = GroupOfGroups;

var GroupOfGroupsContainer = _public.euiStyled.div(_templateObject());

var Groups = _public.euiStyled.div(_templateObject2(), function (props) {
  return props.theme.eui.euiBorderColor;
});