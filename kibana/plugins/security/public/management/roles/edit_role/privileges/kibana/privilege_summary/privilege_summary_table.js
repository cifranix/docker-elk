"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivilegeSummaryTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _privilege_utils = require("../../../privilege_utils");

var _feature_table_cell = require("../feature_table_cell");

var _space_column_header = require("./space_column_header");

var _privilege_summary_expanded_row = require("./privilege_summary_expanded_row");

var _privilege_summary_calculator = require("./privilege_summary_calculator");

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

function getColumnKey(entry) {
  return "privilege_entry_".concat(entry.spaces.join('|'));
}

var PrivilegeSummaryTable = function PrivilegeSummaryTable(props) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      expandedFeatures = _useState2[0],
      setExpandedFeatures = _useState2[1];

  var calculator = new _privilege_summary_calculator.PrivilegeSummaryCalculator(props.kibanaPrivileges, props.role);

  var toggleExpandedFeature = function toggleExpandedFeature(featureId) {
    if (expandedFeatures.includes(featureId)) {
      setExpandedFeatures(expandedFeatures.filter(function (ef) {
        return ef !== featureId;
      }));
    } else {
      setExpandedFeatures([].concat(_toConsumableArray(expandedFeatures), [featureId]));
    }
  };

  var featureColumn = {
    name: 'Feature',
    field: 'feature',
    render: function render(feature) {
      return _react.default.createElement(_feature_table_cell.FeatureTableCell, {
        feature: feature
      });
    }
  };
  var rowExpanderColumn = {
    align: 'right',
    width: '40px',
    isExpander: true,
    field: 'featureId',
    name: '',
    render: function render(featureId, record) {
      var feature = record.feature;
      var hasSubFeaturePrivileges = feature.getSubFeaturePrivileges().length > 0;

      if (!hasSubFeaturePrivileges) {
        return null;
      }

      return _react.default.createElement(_eui.EuiButtonIcon, {
        onClick: function onClick() {
          return toggleExpandedFeature(featureId);
        },
        "data-test-subj": "expandPrivilegeSummaryRow",
        "aria-label": expandedFeatures.includes(featureId) ? 'Collapse' : 'Expand',
        iconType: expandedFeatures.includes(featureId) ? 'arrowUp' : 'arrowDown'
      });
    }
  };

  var rawKibanaPrivileges = _toConsumableArray(props.role.kibana).sort(function (entry1, entry2) {
    if ((0, _privilege_utils.isGlobalPrivilegeDefinition)(entry1)) {
      return -1;
    }

    if ((0, _privilege_utils.isGlobalPrivilegeDefinition)(entry2)) {
      return 1;
    }

    return 0;
  });

  var privilegeColumns = rawKibanaPrivileges.map(function (entry) {
    var key = getColumnKey(entry);
    return {
      name: _react.default.createElement(_space_column_header.SpaceColumnHeader, {
        entry: entry,
        spaces: props.spaces
      }),
      field: key,
      render: function render(kibanaPrivilege, record) {
        var _ref;

        var _kibanaPrivilege$reco = kibanaPrivilege[record.featureId],
            primary = _kibanaPrivilege$reco.primary,
            hasCustomizedSubFeaturePrivileges = _kibanaPrivilege$reco.hasCustomizedSubFeaturePrivileges;
        var iconTip = null;

        if (hasCustomizedSubFeaturePrivileges) {
          iconTip = _react.default.createElement(_eui.EuiIconTip, {
            size: "s",
            type: "iInCircle",
            content: _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
              id: "xpack.security.management.editRole.privilegeSummary.additionalPrivilegesGrantedIconTip",
              defaultMessage: "Additional privileges granted. Expand this row for more information."
            }))
          });
        } else {
          iconTip = _react.default.createElement(_eui.EuiIcon, {
            size: "s",
            type: "empty"
          });
        }

        return _react.default.createElement("span", {
          "data-test-subj": "privilegeColumn ".concat(hasCustomizedSubFeaturePrivileges ? 'additionalPrivilegesGranted' : '')
        }, (_ref = primary === null || primary === void 0 ? void 0 : primary.name) !== null && _ref !== void 0 ? _ref : 'None', " ", iconTip);
      }
    };
  });
  var columns = [];

  if (props.canCustomizeSubFeaturePrivileges) {
    columns.push(rowExpanderColumn);
  }

  columns.push.apply(columns, [featureColumn].concat(_toConsumableArray(privilegeColumns)));
  var privileges = rawKibanaPrivileges.reduce(function (acc, entry) {
    return _objectSpread({}, acc, _defineProperty({}, getColumnKey(entry), calculator.getEffectiveFeaturePrivileges(entry)));
  }, {});
  var items = props.kibanaPrivileges.getSecuredFeatures().map(function (feature) {
    return _objectSpread({
      feature: feature,
      featureId: feature.id
    }, privileges);
  });
  return _react.default.createElement(_eui.EuiInMemoryTable, {
    columns: columns,
    items: items,
    itemId: "featureId",
    rowProps: function rowProps(record) {
      return {
        'data-test-subj': "summaryTableRow-".concat(record.featureId)
      };
    },
    itemIdToExpandedRowMap: expandedFeatures.reduce(function (acc, featureId) {
      return _objectSpread({}, acc, _defineProperty({}, featureId, _react.default.createElement(_privilege_summary_expanded_row.PrivilegeSummaryExpandedRow, {
        feature: props.kibanaPrivileges.getSecuredFeature(featureId),
        effectiveFeaturePrivileges: Object.values(privileges).map(function (p) {
          return p[featureId];
        })
      })));
    }, {})
  });
};

exports.PrivilegeSummaryTable = PrivilegeSummaryTable;