"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecurityLicenseService = void 0;

var _operators = require("rxjs/operators");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SecurityLicenseService {
  constructor() {
    _defineProperty(this, "licenseSubscription", void 0);
  }

  setup({
    license$
  }) {
    let rawLicense;
    this.licenseSubscription = license$.subscribe(nextRawLicense => {
      rawLicense = nextRawLicense;
    });
    return {
      license: Object.freeze({
        isEnabled: () => this.isSecurityEnabledFromRawLicense(rawLicense),
        getFeatures: () => this.calculateFeaturesFromRawLicense(rawLicense),
        features$: license$.pipe((0, _operators.map)(nextRawLicense => this.calculateFeaturesFromRawLicense(nextRawLicense)))
      })
    };
  }

  stop() {
    if (this.licenseSubscription) {
      this.licenseSubscription.unsubscribe();
      this.licenseSubscription = undefined;
    }
  }

  isSecurityEnabledFromRawLicense(rawLicense) {
    if (!rawLicense) {
      return false;
    }

    const securityFeature = rawLicense.getFeature('security');
    return securityFeature !== undefined && securityFeature.isAvailable && securityFeature.isEnabled;
  }

  calculateFeaturesFromRawLicense(rawLicense) {
    // If, for some reason, we cannot get license information from Elasticsearch,
    // assume worst-case and lock user at login screen.
    if (!(rawLicense === null || rawLicense === void 0 ? void 0 : rawLicense.isAvailable)) {
      return {
        showLogin: true,
        allowLogin: false,
        showLinks: false,
        showRoleMappingsManagement: false,
        allowRoleDocumentLevelSecurity: false,
        allowRoleFieldLevelSecurity: false,
        allowRbac: false,
        allowSubFeaturePrivileges: false,
        layout: rawLicense !== undefined && !(rawLicense === null || rawLicense === void 0 ? void 0 : rawLicense.isAvailable) ? 'error-xpack-unavailable' : 'error-es-unavailable'
      };
    }

    if (!this.isSecurityEnabledFromRawLicense(rawLicense)) {
      return {
        showLogin: false,
        allowLogin: false,
        showLinks: false,
        showRoleMappingsManagement: false,
        allowRoleDocumentLevelSecurity: false,
        allowRoleFieldLevelSecurity: false,
        allowRbac: false,
        allowSubFeaturePrivileges: false
      };
    }

    const isLicenseGoldOrBetter = rawLicense.hasAtLeast('gold');
    const isLicensePlatinumOrBetter = rawLicense.hasAtLeast('platinum');
    return {
      showLogin: true,
      allowLogin: true,
      showLinks: true,
      showRoleMappingsManagement: isLicenseGoldOrBetter,
      allowSubFeaturePrivileges: isLicenseGoldOrBetter,
      // Only platinum and trial licenses are compliant with field- and document-level security.
      allowRoleDocumentLevelSecurity: isLicensePlatinumOrBetter,
      allowRoleFieldLevelSecurity: isLicensePlatinumOrBetter,
      allowRbac: true
    };
  }

}

exports.SecurityLicenseService = SecurityLicenseService;