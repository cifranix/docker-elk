"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivilegeSummaryExpandedRow = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PrivilegeSummaryExpandedRow = function PrivilegeSummaryExpandedRow(props) {
  return _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column"
  }, props.feature.getSubFeatures().map(function (subFeature) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: subFeature.name,
      "data-test-subj": "subFeatureEntry"
    }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
      size: "s",
      "data-test-subj": "subFeatureName"
    }, subFeature.name)), props.effectiveFeaturePrivileges.map(function (privs, index) {
      return _react.default.createElement(_eui.EuiFlexItem, {
        key: index,
        "data-test-subj": "entry-".concat(index)
      }, subFeature.getPrivilegeGroups().map(renderPrivilegeGroup(privs.subFeature)));
    })));
  }));

  function renderPrivilegeGroup(effectiveSubFeaturePrivileges) {
    return function (privilegeGroup, index) {
      switch (privilegeGroup.groupType) {
        case 'independent':
          return renderIndependentPrivilegeGroup(effectiveSubFeaturePrivileges, privilegeGroup, index);

        case 'mutually_exclusive':
          return renderMutuallyExclusivePrivilegeGroup(effectiveSubFeaturePrivileges, privilegeGroup, index);

        default:
          throw new Error("Unsupported privilege group type: ".concat(privilegeGroup.groupType));
      }
    };
  }

  function renderIndependentPrivilegeGroup(effectiveSubFeaturePrivileges, privilegeGroup, index) {
    return _react.default.createElement("div", {
      key: index
    }, privilegeGroup.privileges.map(function (privilege) {
      var isGranted = effectiveSubFeaturePrivileges.includes(privilege.id);
      return _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s",
        "data-test-subj": "independentPrivilege",
        key: privilege.id
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiIconTip, {
        type: isGranted ? 'check' : 'cross',
        color: isGranted ? 'primary' : 'danger',
        content: isGranted ? _i18n.i18n.translate('xpack.security.management.editRole.privilegeSummary.privilegeGrantedIconTip', {
          defaultMessage: 'Privilege is granted'
        }) : _i18n.i18n.translate('xpack.security.management.editRole.privilegeSummary.privilegeNotGrantedIconTip', {
          defaultMessage: 'Privilege is not granted'
        })
      })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
        size: "s",
        "data-test-subj": "privilegeName"
      }, privilege.name)));
    }));
  }

  function renderMutuallyExclusivePrivilegeGroup(effectiveSubFeaturePrivileges, privilegeGroup, index) {
    var _privilegeGroup$privi;

    var firstSelectedPrivilege = (_privilegeGroup$privi = privilegeGroup.privileges.find(function (p) {
      return effectiveSubFeaturePrivileges.includes(p.id);
    })) === null || _privilegeGroup$privi === void 0 ? void 0 : _privilegeGroup$privi.name;
    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s",
      key: index,
      "data-test-subj": "mutexPrivilege"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiIconTip, {
      type: firstSelectedPrivilege ? 'check' : 'cross',
      color: firstSelectedPrivilege ? 'primary' : 'danger',
      content: firstSelectedPrivilege ? 'Privilege is granted' : 'Privilege is not granted'
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
      size: "s",
      "data-test-subj": "privilegeName"
    }, firstSelectedPrivilege !== null && firstSelectedPrivilege !== void 0 ? firstSelectedPrivilege : 'None')));
  }
};

exports.PrivilegeSummaryExpandedRow = PrivilegeSummaryExpandedRow;