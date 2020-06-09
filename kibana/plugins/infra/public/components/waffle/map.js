"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Map = void 0;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

var _nodes_to_wafflemap = require("../../containers/waffle/nodes_to_wafflemap");

var _type_guards = require("../../containers/waffle/type_guards");

var _auto_sizer = require("../auto_sizer");

var _group_of_groups = require("./group_of_groups");

var _group_of_nodes = require("./group_of_nodes");

var _legend = require("./legend");

var _apply_wafflemap_layout = require("./lib/apply_wafflemap_layout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-content: flex-start;\n  padding: 10px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 0 0%;\n  display: flex;\n  justify-content: flex-start;\n  flex-direction: column;\n  overflow-x: hidden;\n  overflow-y: auto;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Map = function Map(_ref) {
  var nodes = _ref.nodes,
      options = _ref.options,
      currentTime = _ref.currentTime,
      onFilter = _ref.onFilter,
      formatter = _ref.formatter,
      bounds = _ref.bounds,
      nodeType = _ref.nodeType,
      dataBounds = _ref.dataBounds;
  var map = (0, _nodes_to_wafflemap.nodesToWaffleMap)(nodes);
  return _react.default.createElement(_auto_sizer.AutoSizer, {
    content: true
  }, function (_ref2) {
    var measureRef = _ref2.measureRef,
        _ref2$content = _ref2.content,
        _ref2$content$width = _ref2$content.width,
        width = _ref2$content$width === void 0 ? 0 : _ref2$content$width,
        _ref2$content$height = _ref2$content.height,
        height = _ref2$content$height === void 0 ? 0 : _ref2$content$height;
    var groupsWithLayout = (0, _apply_wafflemap_layout.applyWaffleMapLayout)(map, width, height);
    return _react.default.createElement(WaffleMapOuterContainer, {
      ref: function ref(el) {
        return measureRef(el);
      },
      "data-test-subj": "waffleMap"
    }, _react.default.createElement(WaffleMapInnerContainer, null, groupsWithLayout.map(function (group) {
      if ((0, _type_guards.isWaffleMapGroupWithGroups)(group)) {
        return _react.default.createElement(_group_of_groups.GroupOfGroups, {
          onDrilldown: onFilter,
          key: group.id,
          options: options,
          group: group,
          formatter: formatter,
          bounds: bounds,
          nodeType: nodeType,
          currentTime: currentTime
        });
      }

      if ((0, _type_guards.isWaffleMapGroupWithNodes)(group)) {
        return _react.default.createElement(_group_of_nodes.GroupOfNodes, {
          key: group.id,
          options: options,
          group: group,
          onDrilldown: onFilter,
          formatter: formatter,
          isChild: false,
          bounds: bounds,
          nodeType: nodeType,
          currentTime: currentTime
        });
      }
    })), _react.default.createElement(_legend.Legend, {
      formatter: formatter,
      bounds: bounds,
      dataBounds: dataBounds,
      legend: options.legend
    }));
  });
};

exports.Map = Map;

var WaffleMapOuterContainer = _public.euiStyled.div(_templateObject());

var WaffleMapInnerContainer = _public.euiStyled.div(_templateObject2());