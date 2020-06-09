"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDisplayedFeaturePrivileges = getDisplayedFeaturePrivileges;

var _eui = require("@elastic/eui");

var _find_test_subject = require("test_utils/find_test_subject");

var _privilege_summary_expanded_row = require("../privilege_summary_expanded_row");

var _feature_table_cell = require("../../feature_table_cell");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getSpaceKey = function getSpaceKey(entry) {
  return entry.spaces.join(', ');
};

function getDisplayedFeaturePrivileges(wrapper, role) {
  var allExpanderButtons = (0, _find_test_subject.findTestSubject)(wrapper, 'expandPrivilegeSummaryRow');
  allExpanderButtons.forEach(function (button) {
    return button.simulate('click');
  }); // each expanded row renders its own `EuiTableRow`, so there are 2 rows
  // for each feature: one for the primary feature privilege, and one for the sub privilege form

  var rows = wrapper.find(_eui.EuiTableRow);
  return rows.reduce(function (acc, row) {
    var expandedRow = row.find(_privilege_summary_expanded_row.PrivilegeSummaryExpandedRow);

    if (expandedRow.length > 0) {
      return _objectSpread({}, acc, {}, getDisplayedSubFeaturePrivileges(acc, expandedRow, role));
    } else {
      var _acc$feature$id;

      var feature = row.find(_feature_table_cell.FeatureTableCell).props().feature;
      var primaryFeaturePrivileges = (0, _find_test_subject.findTestSubject)(row, 'privilegeColumn');
      expect(primaryFeaturePrivileges).toHaveLength(role.kibana.length);
      acc[feature.id] = (_acc$feature$id = acc[feature.id]) !== null && _acc$feature$id !== void 0 ? _acc$feature$id : {};
      primaryFeaturePrivileges.forEach(function (primary, index) {
        var key = getSpaceKey(role.kibana[index]);
        acc[feature.id][key] = _objectSpread({}, acc[feature.id][key], {
          primaryFeaturePrivilege: primary.text().trim(),
          hasCustomizedSubFeaturePrivileges: (0, _find_test_subject.findTestSubject)(primary, 'additionalPrivilegesGranted').length > 0
        });
      });
      return acc;
    }
  }, {});
}

function getDisplayedSubFeaturePrivileges(displayedFeatures, expandedRow, role) {
  var _displayedFeatures$fe;

  var _expandedRow$props = expandedRow.props(),
      feature = _expandedRow$props.feature;

  var subFeatureEntries = (0, _find_test_subject.findTestSubject)(expandedRow, 'subFeatureEntry');
  displayedFeatures[feature.id] = (_displayedFeatures$fe = displayedFeatures[feature.id]) !== null && _displayedFeatures$fe !== void 0 ? _displayedFeatures$fe : {};
  subFeatureEntries.forEach(function (subFeatureEntry) {
    var subFeatureName = (0, _find_test_subject.findTestSubject)(subFeatureEntry, 'subFeatureName').text();
    var entryElements = (0, _find_test_subject.findTestSubject)(subFeatureEntry, 'entry', '|=');
    expect(entryElements).toHaveLength(role.kibana.length);
    role.kibana.forEach(function (entry, index) {
      var key = getSpaceKey(entry);
      var element = (0, _find_test_subject.findTestSubject)(expandedRow, "entry-".concat(index));
      var independentPrivileges = element.find('EuiFlexGroup[data-test-subj="independentPrivilege"]').reduce(function (acc2, flexGroup) {
        var privilegeName = (0, _find_test_subject.findTestSubject)(flexGroup, 'privilegeName').text();
        var isGranted = flexGroup.exists('EuiIconTip[type="check"]');

        if (isGranted) {
          return [].concat(_toConsumableArray(acc2), [privilegeName]);
        }

        return acc2;
      }, []);
      var mutuallyExclusivePrivileges = element.find('EuiFlexGroup[data-test-subj="mutexPrivilege"]').reduce(function (acc2, flexGroup) {
        var privilegeName = (0, _find_test_subject.findTestSubject)(flexGroup, 'privilegeName').text();
        var isGranted = flexGroup.exists('EuiIconTip[type="check"]');

        if (isGranted) {
          return [].concat(_toConsumableArray(acc2), [privilegeName]);
        }

        return acc2;
      }, []);
      displayedFeatures[feature.id][key] = _objectSpread({}, displayedFeatures[feature.id][key], {
        subFeaturesPrivileges: _objectSpread({}, displayedFeatures[feature.id][key].subFeaturesPrivileges, _defineProperty({}, subFeatureName, [].concat(_toConsumableArray(independentPrivileges), _toConsumableArray(mutuallyExclusivePrivileges))))
      });
    });
  });
  return displayedFeatures;
}