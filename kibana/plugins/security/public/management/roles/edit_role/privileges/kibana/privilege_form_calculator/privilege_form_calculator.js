"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivilegeFormCalculator = void 0;

var _privilege_utils = require("../../../privilege_utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Calculator responsible for determining the displayed and effective privilege values for the following interfaces:
 * - <PrivilegeSpaceForm> and children
 * - <PrivilegeSpaceTable> and children
 */
var PrivilegeFormCalculator =
/*#__PURE__*/
function () {
  function PrivilegeFormCalculator(kibanaPrivileges, role) {
    _classCallCheck(this, PrivilegeFormCalculator);

    this.kibanaPrivileges = kibanaPrivileges;
    this.role = role;
  }
  /**
   * Returns the assigned base privilege.
   * If more than one base privilege is assigned, the most permissive privilege will be returned.
   * If no base privileges are assigned, then this will return `undefined`.
   *
   * @param privilegeIndex the index of the kibana privileges role component
   */


  _createClass(PrivilegeFormCalculator, [{
    key: "getBasePrivilege",
    value: function getBasePrivilege(privilegeIndex) {
      var entry = this.role.kibana[privilegeIndex];
      var basePrivileges = this.kibanaPrivileges.getBasePrivileges(entry);
      return basePrivileges.find(function (bp) {
        return entry.base.includes(bp.id);
      });
    }
    /**
     * Returns the ID of the *displayed* Primary Feature Privilege for the indicated feature and privilege index.
     * If the effective primary feature privilege is a "minimal" version, then this returns the corresponding non-minimal version.
     *
     * @example
     * The following kibana privilege entry will return `read`:
     * ```ts
     * const entry = {
     *    base: [],
     *    feature: {
     *       some_feature: ['minimal_read'],
     *    }
     * }
     * ```
     *
     * @param featureId the feature id to get the Primary Feature KibanaPrivilege for.
     * @param privilegeIndex the index of the kibana privileges role component
     */

  }, {
    key: "getDisplayedPrimaryFeaturePrivilegeId",
    value: function getDisplayedPrimaryFeaturePrivilegeId(featureId, privilegeIndex) {
      var _this$getDisplayedPri;

      return (_this$getDisplayedPri = this.getDisplayedPrimaryFeaturePrivilege(featureId, privilegeIndex)) === null || _this$getDisplayedPri === void 0 ? void 0 : _this$getDisplayedPri.id;
    }
    /**
     * Determines if the indicated feature has sub-feature privilege assignments which differ from the "displayed" primary feature privilege.
     *
     * @param featureId the feature id
     * @param privilegeIndex the index of the kibana privileges role component
     */

  }, {
    key: "hasCustomizedSubFeaturePrivileges",
    value: function hasCustomizedSubFeaturePrivileges(featureId, privilegeIndex) {
      var feature = this.kibanaPrivileges.getSecuredFeature(featureId);
      var displayedPrimary = this.getDisplayedPrimaryFeaturePrivilege(featureId, privilegeIndex);
      var formPrivileges = this.kibanaPrivileges.createCollectionFromRoleKibanaPrivileges([this.role.kibana[privilegeIndex]]);
      return feature.getSubFeaturePrivileges().some(function (sfp) {
        var _ref;

        var isGranted = formPrivileges.grantsPrivilege(sfp);
        var isGrantedByDisplayedPrimary = (_ref = displayedPrimary === null || displayedPrimary === void 0 ? void 0 : displayedPrimary.grantsPrivilege(sfp)) !== null && _ref !== void 0 ? _ref : isGranted;
        return isGranted !== isGrantedByDisplayedPrimary;
      });
    }
    /**
     * Returns the most permissive effective Primary Feature KibanaPrivilege, including the minimal versions.
     *
     * @param featureId the feature id
     * @param privilegeIndex the index of the kibana privileges role component
     */

  }, {
    key: "getEffectivePrimaryFeaturePrivilege",
    value: function getEffectivePrimaryFeaturePrivilege(featureId, privilegeIndex) {
      var feature = this.kibanaPrivileges.getSecuredFeature(featureId);
      var basePrivilege = this.getBasePrivilege(privilegeIndex);
      var selectedFeaturePrivileges = this.getSelectedFeaturePrivileges(featureId, privilegeIndex);
      return feature.getPrimaryFeaturePrivileges({
        includeMinimalFeaturePrivileges: true
      }).find(function (fp) {
        return selectedFeaturePrivileges.includes(fp.id) || (basePrivilege === null || basePrivilege === void 0 ? void 0 : basePrivilege.grantsPrivilege(fp));
      });
    }
    /**
     * Determines if the indicated sub-feature privilege is granted.
     *
     * @param featureId the feature id
     * @param privilegeId the sub feature privilege id
     * @param privilegeIndex the index of the kibana privileges role component
     */

  }, {
    key: "isIndependentSubFeaturePrivilegeGranted",
    value: function isIndependentSubFeaturePrivilegeGranted(featureId, privilegeId, privilegeIndex) {
      var kibanaPrivilege = this.role.kibana[privilegeIndex];
      var feature = this.kibanaPrivileges.getSecuredFeature(featureId);
      var subFeaturePrivilege = feature.getSubFeaturePrivileges().find(function (ap) {
        return ap.id === privilegeId;
      });
      var assignedPrivileges = this.kibanaPrivileges.createCollectionFromRoleKibanaPrivileges([kibanaPrivilege]);
      return assignedPrivileges.grantsPrivilege(subFeaturePrivilege);
    }
    /**
     * Returns the most permissive effective privilege within the indicated mutually-exclusive sub feature privilege group.
     *
     * @param featureId the feature id
     * @param subFeatureGroup the mutually-exclusive sub feature group
     * @param privilegeIndex the index of the kibana privileges role component
     */

  }, {
    key: "getSelectedMutuallyExclusiveSubFeaturePrivilege",
    value: function getSelectedMutuallyExclusiveSubFeaturePrivilege(featureId, subFeatureGroup, privilegeIndex) {
      var kibanaPrivilege = this.role.kibana[privilegeIndex];
      var assignedPrivileges = this.kibanaPrivileges.createCollectionFromRoleKibanaPrivileges([kibanaPrivilege]);
      return subFeatureGroup.privileges.find(function (p) {
        return assignedPrivileges.grantsPrivilege(p);
      });
    }
    /**
     * Determines if the indicated feature is capable of having its sub-feature privileges customized.
     *
     * @param featureId the feature id
     * @param privilegeIndex the index of the kibana privileges role component
     */

  }, {
    key: "canCustomizeSubFeaturePrivileges",
    value: function canCustomizeSubFeaturePrivileges(featureId, privilegeIndex) {
      var selectedFeaturePrivileges = this.getSelectedFeaturePrivileges(featureId, privilegeIndex);
      var feature = this.kibanaPrivileges.getSecuredFeature(featureId);
      return feature.getPrimaryFeaturePrivileges({
        includeMinimalFeaturePrivileges: true
      }).some(function (apfp) {
        return selectedFeaturePrivileges.includes(apfp.id);
      });
    }
    /**
     * Returns an updated set of feature privileges based on the toggling of the "Customize sub-feature privileges" control.
     *
     * @param featureId the feature id
     * @param privilegeIndex  the index of the kibana privileges role component
     * @param willBeCustomizing flag indicating if this feature is about to have its sub-feature privileges customized or not
     */

  }, {
    key: "updateSelectedFeaturePrivilegesForCustomization",
    value: function updateSelectedFeaturePrivilegesForCustomization(featureId, privilegeIndex, willBeCustomizing) {
      var primary = this.getDisplayedPrimaryFeaturePrivilege(featureId, privilegeIndex);
      var selectedFeaturePrivileges = this.getSelectedFeaturePrivileges(featureId, privilegeIndex);

      if (!primary) {
        return selectedFeaturePrivileges;
      }

      var nextPrivileges = [];

      if (willBeCustomizing) {
        var feature = this.kibanaPrivileges.getSecuredFeature(featureId);
        var startingPrivileges = feature.getSubFeaturePrivileges().filter(function (ap) {
          return primary.grantsPrivilege(ap);
        }).map(function (p) {
          return p.id;
        });
        nextPrivileges.push.apply(nextPrivileges, [primary.getMinimalPrivilegeId()].concat(_toConsumableArray(startingPrivileges)));
      } else {
        nextPrivileges.push(primary.id);
      }

      return nextPrivileges;
    }
    /**
     * Determines if the indicated privilege entry is less permissive than the configured "global" entry for the role.
     * @param privilegeIndex the index of the kibana privileges role component
     */

  }, {
    key: "hasSupersededInheritedPrivileges",
    value: function hasSupersededInheritedPrivileges(privilegeIndex) {
      var global = this.locateGlobalPrivilege(this.role);
      var entry = this.role.kibana[privilegeIndex];

      if ((0, _privilege_utils.isGlobalPrivilegeDefinition)(entry) || !global) {
        return false;
      }

      var globalPrivileges = this.kibanaPrivileges.createCollectionFromRoleKibanaPrivileges([global]);
      var formPrivileges = this.kibanaPrivileges.createCollectionFromRoleKibanaPrivileges([entry]);
      var hasAssignedBasePrivileges = this.kibanaPrivileges.getBasePrivileges(entry).some(function (base) {
        return entry.base.includes(base.id);
      });
      var featuresWithDirectlyAssignedPrivileges = this.kibanaPrivileges.getSecuredFeatures().filter(function (feature) {
        return feature.getAllPrivileges().some(function (privilege) {
          var _entry$feature$featur;

          return (_entry$feature$featur = entry.feature[feature.id]) === null || _entry$feature$featur === void 0 ? void 0 : _entry$feature$featur.includes(privilege.id);
        });
      });
      var hasSupersededBasePrivileges = hasAssignedBasePrivileges && this.kibanaPrivileges.getBasePrivileges(entry).some(function (privilege) {
        return globalPrivileges.grantsPrivilege(privilege) && !formPrivileges.grantsPrivilege(privilege);
      });
      var hasSupersededFeaturePrivileges = featuresWithDirectlyAssignedPrivileges.some(function (feature) {
        return feature.getAllPrivileges().some(function (fp) {
          return globalPrivileges.grantsPrivilege(fp) && !formPrivileges.grantsPrivilege(fp);
        });
      });
      return hasSupersededBasePrivileges || hasSupersededFeaturePrivileges;
    }
    /**
     * Returns the *displayed* Primary Feature Privilege for the indicated feature and privilege index.
     * If the effective primary feature privilege is a "minimal" version, then this returns the corresponding non-minimal version.
     *
     * @example
     * The following kibana privilege entry will return `read`:
     * ```ts
     * const entry = {
     *    base: [],
     *    feature: {
     *       some_feature: ['minimal_read'],
     *    }
     * }
     * ```
     *
     * @param featureId the feature id to get the Primary Feature KibanaPrivilege for.
     * @param privilegeIndex the index of the kibana privileges role component
     */

  }, {
    key: "getDisplayedPrimaryFeaturePrivilege",
    value: function getDisplayedPrimaryFeaturePrivilege(featureId, privilegeIndex) {
      var feature = this.kibanaPrivileges.getSecuredFeature(featureId);
      var basePrivilege = this.getBasePrivilege(privilegeIndex);
      var selectedFeaturePrivileges = this.getSelectedFeaturePrivileges(featureId, privilegeIndex);
      return feature.getPrimaryFeaturePrivileges().find(function (fp) {
        var correspondingMinimalPrivilegeId = fp.getMinimalPrivilegeId();
        var correspendingMinimalPrivilege = feature.getMinimalFeaturePrivileges().find(function (mp) {
          return mp.id === correspondingMinimalPrivilegeId;
        }); // There are two cases where the minimal privileges aren't available:
        // 1. The feature has no registered sub-features
        // 2. Sub-feature privileges cannot be customized. When this is the case, the minimal privileges aren't registered with ES,
        // so they end up represented in the UI as an empty privilege. Empty privileges cannot be granted other privileges, so if we
        // encounter a minimal privilege that isn't granted by it's correspending primary, then we know we've encountered this scenario.

        var hasMinimalPrivileges = feature.subFeatures.length > 0 && fp.grantsPrivilege(correspendingMinimalPrivilege);
        return selectedFeaturePrivileges.includes(fp.id) || hasMinimalPrivileges && selectedFeaturePrivileges.includes(correspondingMinimalPrivilegeId) || (basePrivilege === null || basePrivilege === void 0 ? void 0 : basePrivilege.grantsPrivilege(fp));
      });
    }
  }, {
    key: "getSelectedFeaturePrivileges",
    value: function getSelectedFeaturePrivileges(featureId, privilegeIndex) {
      var _this$role$kibana$pri;

      return (_this$role$kibana$pri = this.role.kibana[privilegeIndex].feature[featureId]) !== null && _this$role$kibana$pri !== void 0 ? _this$role$kibana$pri : [];
    }
  }, {
    key: "locateGlobalPrivilege",
    value: function locateGlobalPrivilege(role) {
      return role.kibana.find(function (entry) {
        return (0, _privilege_utils.isGlobalPrivilegeDefinition)(entry);
      });
    }
  }]);

  return PrivilegeFormCalculator;
}();

exports.PrivilegeFormCalculator = PrivilegeFormCalculator;