"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableView = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _nodes_to_wafflemap = require("../../containers/waffle/nodes_to_wafflemap");

var _field_to_display_name = require("../waffle/lib/field_to_display_name");

var _node_context_menu = require("../waffle/node_context_menu");

var _start_app = require("../../apps/start_app");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getGroupPaths = function getGroupPaths(path) {
  switch (path.length) {
    case 3:
      return path.slice(0, 2);

    case 2:
      return path.slice(0, 1);

    default:
      return [];
  }
};

var TableView = function TableView(props) {
  var nodes = props.nodes,
      options = props.options,
      formatter = props.formatter,
      currentTime = props.currentTime,
      nodeType = props.nodeType;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      openPopovers = _useState2[0],
      setOpenPopovers = _useState2[1];

  var openPopoverFor = (0, _react.useCallback)(function (id) {
    return function () {
      setOpenPopovers([].concat(_toConsumableArray(openPopovers), [id]));
    };
  }, [openPopovers]);
  var closePopoverFor = (0, _react.useCallback)(function (id) {
    return function () {
      if (openPopovers.includes(id)) {
        setOpenPopovers(openPopovers.filter(function (subject) {
          return subject !== id;
        }));
      }
    };
  }, [openPopovers]);
  (0, _react.useEffect)(function () {
    var el = document.getElementsByClassName(_start_app.CONTAINER_CLASSNAME)[0];

    if (el instanceof HTMLElement) {
      if (openPopovers.length > 0) {
        el.style.overflowY = 'hidden';
      } else {
        el.style.overflowY = 'auto';
      }
    }
  }, [openPopovers]);
  var columns = [{
    field: 'name',
    name: _i18n.i18n.translate('xpack.infra.tableView.columnName.name', {
      defaultMessage: 'Name'
    }),
    sortable: true,
    truncateText: true,
    textOnly: true,
    render: function render(value, item) {
      var tooltipText = item.node.id === value ? "".concat(value) : "".concat(value, " (").concat(item.node.id, ")"); // For the table we need to create a UniqueID that takes into to account the groupings
      // as well as the node name. There is the possibility that a node can be present in two
      // different groups and be on the screen at the same time.

      var uniqueID = [].concat(_toConsumableArray(item.node.path.map(function (p) {
        return p.value;
      })), [item.node.name]).join(':');
      return _react.default.createElement(_node_context_menu.NodeContextMenu, {
        node: item.node,
        nodeType: nodeType,
        closePopover: closePopoverFor(uniqueID),
        currentTime: currentTime,
        isPopoverOpen: openPopovers.includes(uniqueID),
        options: options,
        popoverPosition: "rightCenter"
      }, _react.default.createElement(_eui.EuiToolTip, {
        content: tooltipText
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: openPopoverFor(uniqueID)
      }, value)));
    }
  }].concat(_toConsumableArray(options.groupBy.map(function (grouping, index) {
    return {
      field: "group_".concat(index),
      name: (0, _field_to_display_name.fieldToName)(grouping && grouping.field || ''),
      sortable: true,
      truncateText: true,
      textOnly: true,
      render: function render(value) {
        var handleClick = function handleClick() {
          return props.onFilter("".concat(grouping.field, ":\"").concat(value, "\""));
        };

        return _react.default.createElement(_eui.EuiToolTip, {
          content: "Set Filter"
        }, _react.default.createElement(_eui.EuiButtonEmpty, {
          onClick: handleClick
        }, value));
      }
    };
  })), [{
    field: 'value',
    name: _i18n.i18n.translate('xpack.infra.tableView.columnName.last1m', {
      defaultMessage: 'Last 1m'
    }),
    sortable: true,
    truncateText: true,
    dataType: 'number',
    render: function render(value) {
      return _react.default.createElement("span", null, formatter(value));
    }
  }, {
    field: 'avg',
    name: _i18n.i18n.translate('xpack.infra.tableView.columnName.avg', {
      defaultMessage: 'Avg'
    }),
    sortable: true,
    truncateText: true,
    dataType: 'number',
    render: function render(value) {
      return _react.default.createElement("span", null, formatter(value));
    }
  }, {
    field: 'max',
    name: _i18n.i18n.translate('xpack.infra.tableView.columnName.max', {
      defaultMessage: 'Max'
    }),
    sortable: true,
    truncateText: true,
    dataType: 'number',
    render: function render(value) {
      return _react.default.createElement("span", null, formatter(value));
    }
  }]);
  var items = nodes.map(function (node) {
    var name = (0, _lodash.last)(node.path);
    return _objectSpread({
      name: name && name.label || 'unknown'
    }, getGroupPaths(node.path).reduce(function (acc, path, index) {
      return _objectSpread({}, acc, _defineProperty({}, "group_".concat(index), path.label));
    }, {}), {
      value: node.metric.value,
      avg: node.metric.avg,
      max: node.metric.max,
      node: (0, _nodes_to_wafflemap.createWaffleMapNode)(node)
    });
  });
  var initialSorting = {
    sort: {
      field: 'value',
      direction: 'desc'
    }
  };
  return _react.default.createElement(_eui.EuiInMemoryTable, {
    pagination: true,
    sorting: initialSorting,
    items: items,
    columns: columns
  });
};

exports.TableView = TableView;