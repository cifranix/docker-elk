"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDisplayedFeaturePrivileges = getDisplayedFeaturePrivileges;

var _eui = require("@elastic/eui");

var _find_test_subject = require("test_utils/find_test_subject");

var _sub_feature_form = require("../sub_feature_form");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getDisplayedFeaturePrivileges(wrapper) {
  var allExpanderButtons = (0, _find_test_subject.findTestSubject)(wrapper, 'expandFeaturePrivilegeRow');
  allExpanderButtons.forEach(function (button) {
    return button.simulate('click');
  }); // each expanded row renders its own `EuiTableRow`, so there are 2 rows
  // for each feature: one for the primary feature privilege, and one for the sub privilege form

  var rows = wrapper.find(_eui.EuiTableRow);
  return rows.reduce(function (acc, row) {
    var subFeaturePrivileges = [];
    var subFeatureForm = row.find(_sub_feature_form.SubFeatureForm);

    if (subFeatureForm.length > 0) {
      var _subFeatureForm$props = subFeatureForm.props(),
          featureId = _subFeatureForm$props.featureId;

      var independentPrivileges = subFeatureForm.find(_eui.EuiCheckbox).reduce(function (acc2, checkbox) {
        var _checkbox$props = checkbox.props(),
            privilegeId = _checkbox$props.id,
            checked = _checkbox$props.checked;

        return checked ? [].concat(_toConsumableArray(acc2), [privilegeId]) : acc2;
      }, []);
      var mutuallyExclusivePrivileges = subFeatureForm.find(_eui.EuiButtonGroup).reduce(function (acc2, subPrivButtonGroup) {
        var _subPrivButtonGroup$p = subPrivButtonGroup.props(),
            selectedSubPrivilege = _subPrivButtonGroup$p.idSelected;

        return selectedSubPrivilege && selectedSubPrivilege !== 'none' ? [].concat(_toConsumableArray(acc2), [selectedSubPrivilege]) : acc2;
      }, []);
      subFeaturePrivileges.push.apply(subFeaturePrivileges, _toConsumableArray(independentPrivileges).concat(_toConsumableArray(mutuallyExclusivePrivileges)));
      return _objectSpread({}, acc, _defineProperty({}, featureId, _objectSpread({}, acc[featureId], {
        subFeaturePrivileges: subFeaturePrivileges
      })));
    } else {
      var buttonGroup = row.find(_eui.EuiButtonGroup);

      var _buttonGroup$props = buttonGroup.props(),
          name = _buttonGroup$props.name,
          idSelected = _buttonGroup$props.idSelected;

      expect(name).toBeDefined();
      expect(idSelected).toBeDefined();

      var _featureId = name.substr("featurePrivilege_".length);

      var primaryFeaturePrivilege = idSelected.substr("".concat(_featureId, "_").length);
      return _objectSpread({}, acc, _defineProperty({}, _featureId, _objectSpread({}, acc[_featureId], {
        primaryFeaturePrivilege: primaryFeaturePrivilege
      })));
    }
  }, {});
}