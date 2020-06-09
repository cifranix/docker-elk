"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivilegeSpaceTable = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _public = require("../../../../../../../../spaces/public");

var _model = require("../../../../../../../common/model");

var _spaces_popover_list = require("../../../spaces_popover_list");

var _privilege_display = require("./privilege_display");

var _privilege_utils = require("../../../privilege_utils");

var _constants = require("../constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SPACES_DISPLAY_COUNT = 4;

var PrivilegeSpaceTable =
/*#__PURE__*/
function (_Component) {
  _inherits(PrivilegeSpaceTable, _Component);

  function PrivilegeSpaceTable() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PrivilegeSpaceTable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PrivilegeSpaceTable)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      expandedSpacesGroups: []
    });

    _defineProperty(_assertThisInitialized(_this), "renderKibanaPrivileges", function () {
      var _this$props = _this.props,
          privilegeCalculator = _this$props.privilegeCalculator,
          displaySpaces = _this$props.displaySpaces;

      var spacePrivileges = _this.getSortedPrivileges();

      var rows = spacePrivileges.map(function (spacePrivs, privilegeIndex) {
        var spaces = spacePrivs.spaces.map(function (spaceId) {
          return displaySpaces.find(function (space) {
            return space.id === spaceId;
          }) || {
            id: spaceId,
            name: spaceId,
            disabledFeatures: [],
            deleted: true
          };
        });
        return {
          spaces: spaces,
          privilegeIndex: privilegeIndex,
          isGlobal: (0, _privilege_utils.isGlobalPrivilegeDefinition)(spacePrivs),
          privileges: {
            spaces: spacePrivs.spaces,
            base: spacePrivs.base || [],
            feature: spacePrivs.feature || {},
            reserved: spacePrivs._reserved || []
          }
        };
      });

      var getExtraBadgeProps = function getExtraBadgeProps(space) {
        if (space.deleted) {
          return {
            iconType: 'trash'
          };
        }

        return {};
      };

      var columns = [{
        field: 'spaces',
        name: 'Spaces',
        width: '60%',
        render: function render(spaces, record) {
          var isExpanded = _this.state.expandedSpacesGroups.includes(record.privilegeIndex);

          var displayedSpaces = isExpanded ? spaces : spaces.slice(0, SPACES_DISPLAY_COUNT);
          var button = null;

          if (record.isGlobal) {
            button = _react2.default.createElement(_spaces_popover_list.SpacesPopoverList, {
              spaces: _this.props.displaySpaces.filter(function (s) {
                return s.id !== '*';
              }),
              buttonText: _i18n.i18n.translate('xpack.security.management.editRole.spacePrivilegeTable.showAllSpacesLink', {
                defaultMessage: 'show spaces'
              })
            });
          } else if (spaces.length > displayedSpaces.length) {
            button = _react2.default.createElement(_eui.EuiButtonEmpty, {
              size: "xs",
              onClick: function onClick() {
                return _this.toggleExpandSpacesGroup(record.privilegeIndex);
              }
            }, _react2.default.createElement(_react.FormattedMessage, {
              id: "xpack.security.management.editRole.spacePrivilegeTable.showNMoreSpacesLink",
              defaultMessage: "+{count} more",
              values: {
                count: spaces.length - displayedSpaces.length
              }
            }));
          } else if (isExpanded) {
            button = _react2.default.createElement(_eui.EuiButtonEmpty, {
              size: "xs",
              onClick: function onClick() {
                return _this.toggleExpandSpacesGroup(record.privilegeIndex);
              }
            }, _react2.default.createElement(_react.FormattedMessage, {
              id: "xpack.security.management.editRole.spacePrivilegeTable.showLessSpacesLink",
              defaultMessage: "show less"
            }));
          }

          return _react2.default.createElement("div", null, _react2.default.createElement("span", {
            "data-test-subj": "spacesColumn"
          }, displayedSpaces.map(function (space) {
            return _react2.default.createElement(_eui.EuiBadge, _extends({
              key: space.id
            }, getExtraBadgeProps(space), {
              color: (0, _public.getSpaceColor)(space)
            }), space.name);
          })), button);
        }
      }, {
        field: 'privileges',
        name: 'Privileges',
        render: function render(privileges, record) {
          var _ref, _privilegeCalculator$;

          if (privileges.reserved.length > 0) {
            return _react2.default.createElement(_privilege_display.PrivilegeDisplay, {
              privilege: privileges.reserved,
              "data-test-subj": "privilegeColumn"
            });
          }

          var icon = _react2.default.createElement(_eui.EuiIcon, {
            type: "empty",
            size: "s"
          });

          if (privilegeCalculator.hasSupersededInheritedPrivileges(record.privilegeIndex)) {
            icon = _react2.default.createElement("span", {
              "data-test-subj": "spaceTablePrivilegeSupersededWarning"
            }, _react2.default.createElement(_eui.EuiIconTip, {
              type: "alert",
              size: "s",
              content: _react2.default.createElement(_react.FormattedMessage, {
                id: "xpack.security.management.editRole.spacePrivilegeTable.supersededPrivilegeWarning",
                defaultMessage: "Privileges are superseded by configured global privilege. View the privilege summary to see effective privileges."
              })
            }));
          }

          return _react2.default.createElement(_eui.EuiFlexGroup, {
            gutterSize: "xs",
            alignItems: "center"
          }, _react2.default.createElement(_eui.EuiFlexItem, {
            grow: false
          }, icon), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_privilege_display.PrivilegeDisplay, {
            privilege: (_ref = (_privilegeCalculator$ = privilegeCalculator.getBasePrivilege(record.privilegeIndex)) === null || _privilegeCalculator$ === void 0 ? void 0 : _privilegeCalculator$.id) !== null && _ref !== void 0 ? _ref : _constants.CUSTOM_PRIVILEGE_VALUE,
            "data-test-subj": "privilegeColumn"
          })));
        }
      }];

      if (!_this.props.disabled) {
        columns.push({
          name: 'Actions',
          actions: [{
            render: function render(record) {
              return _react2.default.createElement(_eui.EuiButtonIcon, {
                "aria-label": _i18n.i18n.translate('xpack.security.management.editRole.spacePrivilegeTable.editPrivilegesLabel', {
                  defaultMessage: "Edit privileges for the following spaces: {spaceNames}.",
                  values: {
                    spaceNames: record.spaces.map(function (s) {
                      return s.name;
                    }).join(', ')
                  }
                }),
                color: 'primary',
                iconType: 'pencil',
                onClick: function onClick() {
                  return _this.props.onEdit(record.privilegeIndex);
                }
              });
            }
          }, {
            render: function render(record) {
              return _react2.default.createElement(_eui.EuiButtonIcon, {
                "aria-label": _i18n.i18n.translate('xpack.security.management.editRole.spacePrivilegeTable.deletePrivilegesLabel', {
                  defaultMessage: "Delete privileges for the following spaces: {spaceNames}.",
                  values: {
                    spaceNames: record.spaces.map(function (s) {
                      return s.name;
                    }).join(', ')
                  }
                }),
                color: 'danger',
                iconType: 'trash',
                onClick: function onClick() {
                  return _this.onDeleteSpacePrivilege(record);
                }
              });
            }
          }]
        });
      }

      return _react2.default.createElement(_eui.EuiInMemoryTable, {
        columns: columns,
        items: rows,
        hasActions: true,
        rowProps: function rowProps(item) {
          return {
            className: (0, _privilege_utils.isGlobalPrivilegeDefinition)(item.privileges) ? 'secPrivilegeTable__row--isGlobalSpace' : ''
          };
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getSortedPrivileges", function () {
      var spacePrivileges = _this.props.role.kibana;
      return spacePrivileges.sort(function (priv1, priv2) {
        return (0, _privilege_utils.isGlobalPrivilegeDefinition)(priv1) ? -1 : (0, _privilege_utils.isGlobalPrivilegeDefinition)(priv2) ? 1 : 0;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleExpandSpacesGroup", function (privilegeIndex) {
      if (_this.state.expandedSpacesGroups.includes(privilegeIndex)) {
        _this.setState({
          expandedSpacesGroups: _this.state.expandedSpacesGroups.filter(function (i) {
            return i !== privilegeIndex;
          })
        });
      } else {
        _this.setState({
          expandedSpacesGroups: [].concat(_toConsumableArray(_this.state.expandedSpacesGroups), [privilegeIndex])
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDeleteSpacePrivilege", function (item) {
      var roleCopy = (0, _model.copyRole)(_this.props.role);
      roleCopy.kibana.splice(item.privilegeIndex, 1);

      _this.props.onChange(roleCopy);

      _this.setState({
        expandedSpacesGroups: _this.state.expandedSpacesGroups.filter(function (i) {
          return i !== item.privilegeIndex;
        })
      });
    });

    return _this;
  }

  _createClass(PrivilegeSpaceTable, [{
    key: "render",
    value: function render() {
      return this.renderKibanaPrivileges();
    }
  }]);

  return PrivilegeSpaceTable;
}(_react2.Component);

exports.PrivilegeSpaceTable = PrivilegeSpaceTable;