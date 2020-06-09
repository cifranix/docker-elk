"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureTable = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _react2 = _interopRequireWildcard(require("react"));

var _change_all_privileges = require("./change_all_privileges");

var _feature_table_expanded_row = require("./feature_table_expanded_row");

var _constants = require("../constants");

var _feature_table_cell = require("../feature_table_cell");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FeatureTable =
/*#__PURE__*/
function (_Component) {
  _inherits(FeatureTable, _Component);

  function FeatureTable(props) {
    var _this;

    _classCallCheck(this, FeatureTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FeatureTable).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (featureId) {
      return function (featurePrivilegeId) {
        var privilege = featurePrivilegeId.substr("".concat(featureId, "_").length);

        if (privilege === _constants.NO_PRIVILEGE_VALUE) {
          _this.props.onChange(featureId, []);
        } else {
          _this.props.onChange(featureId, [privilege]);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getColumns", function () {
      var basePrivileges = _this.props.kibanaPrivileges.getBasePrivileges(_this.props.role.kibana[_this.props.privilegeIndex]);

      var columns = [];

      if (_this.props.canCustomizeSubFeaturePrivileges) {
        columns.push({
          width: '30px',
          isExpander: true,
          field: 'featureId',
          name: '',
          render: function render(featureId, record) {
            var feature = record.feature;
            var hasSubFeaturePrivileges = feature.getSubFeaturePrivileges().length > 0;

            if (!hasSubFeaturePrivileges) {
              return null;
            }

            return _react2.default.createElement(_eui.EuiButtonIcon, {
              onClick: function onClick() {
                return _this.toggleExpandedFeature(featureId);
              },
              "data-test-subj": "expandFeaturePrivilegeRow expandFeaturePrivilegeRow-".concat(featureId),
              "aria-label": _this.state.expandedFeatures.includes(featureId) ? 'Collapse' : 'Expand',
              iconType: _this.state.expandedFeatures.includes(featureId) ? 'arrowUp' : 'arrowDown'
            });
          }
        });
      }

      columns.push({
        field: 'feature',
        width: '200px',
        name: _i18n.i18n.translate('xpack.security.management.editRole.featureTable.enabledRoleFeaturesFeatureColumnTitle', {
          defaultMessage: 'Feature'
        }),
        render: function render(feature) {
          return _react2.default.createElement(_feature_table_cell.FeatureTableCell, {
            feature: feature
          });
        }
      }, {
        field: 'privilege',
        width: '200px',
        name: _react2.default.createElement("span", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.featureTable.enabledRoleFeaturesEnabledColumnTitle",
          defaultMessage: "Privilege"
        }), !_this.props.disabled && _react2.default.createElement(_change_all_privileges.ChangeAllPrivilegesControl, {
          privileges: basePrivileges,
          onChange: _this.onChangeAllFeaturePrivileges
        })),
        mobileOptions: {
          // Table isn't responsive, so skip rendering this for mobile. <ChangeAllPrivilegesControl /> isn't free...
          header: false
        },
        render: function render(roleEntry, record) {
          var feature = record.feature;

          if (feature.reserved) {
            return _react2.default.createElement(_eui.EuiText, {
              size: 's'
            }, feature.reserved.description);
          }

          var primaryFeaturePrivileges = feature.getPrimaryFeaturePrivileges();

          if (primaryFeaturePrivileges.length === 0) {
            return null;
          }

          var selectedPrivilegeId = _this.props.privilegeCalculator.getDisplayedPrimaryFeaturePrivilegeId(feature.id, _this.props.privilegeIndex);

          var options = primaryFeaturePrivileges.map(function (privilege) {
            return {
              id: "".concat(feature.id, "_").concat(privilege.id),
              label: privilege.name,
              isDisabled: _this.props.disabled
            };
          });
          options.push({
            id: "".concat(feature.id, "_").concat(_constants.NO_PRIVILEGE_VALUE),
            label: 'None',
            isDisabled: _this.props.disabled
          });

          var warningIcon = _react2.default.createElement(_eui.EuiIconTip, {
            type: "empty",
            content: null
          });

          if (_this.props.privilegeCalculator.hasCustomizedSubFeaturePrivileges(feature.id, _this.props.privilegeIndex)) {
            warningIcon = _react2.default.createElement(_eui.EuiIconTip, {
              type: "iInCircle",
              content: _react2.default.createElement(_react.FormattedMessage, {
                id: "xpack.security.management.editRole.featureTable.privilegeCustomizationTooltip",
                defaultMessage: "Feature has customized sub-feature privileges. Expand this row for more information."
              })
            });
          }

          return _react2.default.createElement(_eui.EuiFlexGroup, {
            alignItems: "center",
            gutterSize: "xs"
          }, _react2.default.createElement(_eui.EuiFlexItem, {
            grow: false
          }, warningIcon), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiButtonGroup, {
            name: "featurePrivilege_".concat(feature.id),
            "data-test-subj": "primaryFeaturePrivilegeControl",
            buttonSize: "compressed",
            color: 'primary',
            isFullWidth: true,
            options: options,
            idSelected: "".concat(feature.id, "_").concat(selectedPrivilegeId !== null && selectedPrivilegeId !== void 0 ? selectedPrivilegeId : _constants.NO_PRIVILEGE_VALUE),
            onChange: _this.onChange(feature.id)
          })));
        }
      });
      return columns;
    });

    _defineProperty(_assertThisInitialized(_this), "toggleExpandedFeature", function (featureId) {
      if (_this.state.expandedFeatures.includes(featureId)) {
        _this.setState({
          expandedFeatures: _this.state.expandedFeatures.filter(function (ef) {
            return ef !== featureId;
          })
        });
      } else {
        _this.setState({
          expandedFeatures: [].concat(_toConsumableArray(_this.state.expandedFeatures), [featureId])
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeAllFeaturePrivileges", function (privilege) {
      if (privilege === _constants.NO_PRIVILEGE_VALUE) {
        _this.props.onChangeAll([]);
      } else {
        _this.props.onChangeAll([privilege]);
      }
    });

    _this.state = {
      expandedFeatures: []
    };
    return _this;
  }

  _createClass(FeatureTable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          role = _this$props.role,
          kibanaPrivileges = _this$props.kibanaPrivileges;
      var featurePrivileges = kibanaPrivileges.getSecuredFeatures();
      var items = featurePrivileges.sort(function (feature1, feature2) {
        if (feature1.reserved && !feature2.reserved) {
          return 1;
        }

        if (feature2.reserved && !feature1.reserved) {
          return -1;
        }

        return 0;
      }).map(function (feature) {
        return {
          featureId: feature.id,
          feature: feature,
          inherited: [],
          effective: [],
          role: role
        };
      });
      return _react2.default.createElement(_eui.EuiInMemoryTable, {
        responsive: false,
        columns: this.getColumns(),
        itemId: 'featureId',
        itemIdToExpandedRowMap: this.state.expandedFeatures.reduce(function (acc, featureId) {
          var _this2$props$role$kib;

          return _objectSpread({}, acc, _defineProperty({}, featureId, _react2.default.createElement(_feature_table_expanded_row.FeatureTableExpandedRow, {
            feature: featurePrivileges.find(function (f) {
              return f.id === featureId;
            }),
            privilegeIndex: _this2.props.privilegeIndex,
            onChange: _this2.props.onChange,
            privilegeCalculator: _this2.props.privilegeCalculator,
            selectedFeaturePrivileges: (_this2$props$role$kib = _this2.props.role.kibana[_this2.props.privilegeIndex].feature[featureId]) !== null && _this2$props$role$kib !== void 0 ? _this2$props$role$kib : [],
            disabled: _this2.props.disabled
          })));
        }, {}),
        items: items
      });
    }
  }]);

  return FeatureTable;
}(_react2.Component);

exports.FeatureTable = FeatureTable;

_defineProperty(FeatureTable, "defaultProps", {
  privilegeIndex: -1,
  showLocks: true
});