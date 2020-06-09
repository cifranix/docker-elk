"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubFeatureForm = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var SubFeatureForm = function SubFeatureForm(props) {
  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, props.subFeature.name)), _react.default.createElement(_eui.EuiFlexItem, null, props.subFeature.getPrivilegeGroups().map(renderPrivilegeGroup)));

  function renderPrivilegeGroup(privilegeGroup, index) {
    switch (privilegeGroup.groupType) {
      case 'independent':
        return renderIndependentPrivilegeGroup(privilegeGroup, index);

      case 'mutually_exclusive':
        return renderMutuallyExclusivePrivilegeGroup(privilegeGroup, index);

      default:
        throw new Error("Unsupported privilege group type: ".concat(privilegeGroup.groupType));
    }
  }

  function renderIndependentPrivilegeGroup(privilegeGroup, index) {
    return _react.default.createElement("div", {
      key: index
    }, privilegeGroup.privileges.map(function (privilege) {
      var isGranted = props.privilegeCalculator.isIndependentSubFeaturePrivilegeGranted(props.featureId, privilege.id, props.privilegeIndex);
      return _react.default.createElement(_eui.EuiCheckbox, {
        key: privilege.id,
        id: "".concat(props.featureId, "_").concat(privilege.id),
        label: privilege.name,
        "data-test-subj": "independentSubFeaturePrivilegeControl",
        onChange: function onChange(e) {
          var checked = e.target.checked;

          if (checked) {
            props.onChange([].concat(_toConsumableArray(props.selectedFeaturePrivileges), [privilege.id]));
          } else {
            props.onChange(props.selectedFeaturePrivileges.filter(function (sp) {
              return sp !== privilege.id;
            }));
          }
        },
        checked: isGranted,
        disabled: props.disabled,
        compressed: true
      });
    }));
  }

  function renderMutuallyExclusivePrivilegeGroup(privilegeGroup, index) {
    var _ref;

    var firstSelectedPrivilege = props.privilegeCalculator.getSelectedMutuallyExclusiveSubFeaturePrivilege(props.featureId, privilegeGroup, props.privilegeIndex);

    var options = _toConsumableArray(privilegeGroup.privileges.map(function (privilege, privilegeIndex) {
      return {
        id: privilege.id,
        label: privilege.name,
        isDisabled: props.disabled
      };
    }));

    options.push({
      id: _constants.NO_PRIVILEGE_VALUE,
      label: 'None',
      isDisabled: props.disabled
    });
    return _react.default.createElement(_eui.EuiButtonGroup, {
      key: index,
      buttonSize: "compressed",
      "data-test-subj": "mutexSubFeaturePrivilegeControl",
      options: options,
      idSelected: (_ref = firstSelectedPrivilege === null || firstSelectedPrivilege === void 0 ? void 0 : firstSelectedPrivilege.id) !== null && _ref !== void 0 ? _ref : _constants.NO_PRIVILEGE_VALUE,
      isDisabled: props.disabled,
      onChange: function onChange(selectedPrivilegeId) {
        // Deselect all privileges which belong to this mutually-exclusive group
        var privilegesWithoutGroupEntries = props.selectedFeaturePrivileges.filter(function (sp) {
          return !privilegeGroup.privileges.some(function (privilege) {
            return privilege.id === sp;
          });
        }); // fire on-change with the newly selected privilege

        if (selectedPrivilegeId === _constants.NO_PRIVILEGE_VALUE) {
          props.onChange(privilegesWithoutGroupEntries);
        } else {
          props.onChange([].concat(_toConsumableArray(privilegesWithoutGroupEntries), [selectedPrivilegeId]));
        }
      }
    });
  }
};

exports.SubFeatureForm = SubFeatureForm;