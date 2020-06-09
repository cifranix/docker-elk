"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivilegeSummaryCalculator = void 0;

var _privilege_utils = require("../../../privilege_utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PrivilegeSummaryCalculator =
/*#__PURE__*/
function () {
  function PrivilegeSummaryCalculator(kibanaPrivileges, role) {
    _classCallCheck(this, PrivilegeSummaryCalculator);

    this.kibanaPrivileges = kibanaPrivileges;
    this.role = role;
  }

  _createClass(PrivilegeSummaryCalculator, [{
    key: "getEffectiveFeaturePrivileges",
    value: function getEffectiveFeaturePrivileges(entry) {
      var _this = this;

      var assignedPrivileges = this.collectAssignedPrivileges(entry);
      var features = this.kibanaPrivileges.getSecuredFeatures();
      return features.reduce(function (acc, feature) {
        var displayedPrimaryFeaturePrivilege = _this.getDisplayedPrimaryFeaturePrivilege(assignedPrivileges, feature);

        var effectiveSubPrivileges = feature.getSubFeaturePrivileges().filter(function (ap) {
          return assignedPrivileges.grantsPrivilege(ap);
        });

        var hasCustomizedSubFeaturePrivileges = _this.hasCustomizedSubFeaturePrivileges(feature, displayedPrimaryFeaturePrivilege, entry);

        return _objectSpread({}, acc, _defineProperty({}, feature.id, {
          primary: displayedPrimaryFeaturePrivilege,
          hasCustomizedSubFeaturePrivileges: hasCustomizedSubFeaturePrivileges,
          subFeature: effectiveSubPrivileges.map(function (p) {
            return p.id;
          })
        }));
      }, {});
    }
  }, {
    key: "hasCustomizedSubFeaturePrivileges",
    value: function hasCustomizedSubFeaturePrivileges(feature, displayedPrimaryFeaturePrivilege, entry) {
      var formPrivileges = this.collectAssignedPrivileges(entry);
      return feature.getSubFeaturePrivileges().some(function (sfp) {
        var _ref;

        var isGranted = formPrivileges.grantsPrivilege(sfp);
        var isGrantedByDisplayedPrimary = (_ref = displayedPrimaryFeaturePrivilege === null || displayedPrimaryFeaturePrivilege === void 0 ? void 0 : displayedPrimaryFeaturePrivilege.grantsPrivilege(sfp)) !== null && _ref !== void 0 ? _ref : isGranted; // if displayed primary is derived from base, then excluded sub-feature-privs should not count.

        return isGranted !== isGrantedByDisplayedPrimary;
      });
    }
  }, {
    key: "getDisplayedPrimaryFeaturePrivilege",
    value: function getDisplayedPrimaryFeaturePrivilege(assignedPrivileges, feature) {
      var primaryFeaturePrivileges = feature.getPrimaryFeaturePrivileges();
      var minimalPrimaryFeaturePrivileges = feature.getMinimalFeaturePrivileges();
      var hasMinimalPrivileges = feature.subFeatures.length > 0;
      var effectivePrivilege = primaryFeaturePrivileges.find(function (pfp) {
        var isPrimaryGranted = assignedPrivileges.grantsPrivilege(pfp);

        if (!isPrimaryGranted && hasMinimalPrivileges) {
          var correspondingMinimal = minimalPrimaryFeaturePrivileges.find(function (mpfp) {
            return mpfp.id === pfp.getMinimalPrivilegeId();
          });
          return assignedPrivileges.grantsPrivilege(correspondingMinimal);
        }

        return isPrimaryGranted;
      });
      return effectivePrivilege;
    }
  }, {
    key: "collectAssignedPrivileges",
    value: function collectAssignedPrivileges(entry) {
      if ((0, _privilege_utils.isGlobalPrivilegeDefinition)(entry)) {
        return this.kibanaPrivileges.createCollectionFromRoleKibanaPrivileges([entry]);
      }

      var globalPrivilege = this.locateGlobalPrivilege(this.role);
      return this.kibanaPrivileges.createCollectionFromRoleKibanaPrivileges(globalPrivilege ? [globalPrivilege, entry] : [entry]);
    }
  }, {
    key: "locateGlobalPrivilege",
    value: function locateGlobalPrivilege(role) {
      return role.kibana.find(function (entry) {
        return (0, _privilege_utils.isGlobalPrivilegeDefinition)(entry);
      });
    }
  }]);

  return PrivilegeSummaryCalculator;
}();

exports.PrivilegeSummaryCalculator = PrivilegeSummaryCalculator;