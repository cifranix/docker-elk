"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LicenseState = void 0;

var _i18n = require("@kbn/i18n");

var _utils = require("../../../../../src/core/utils");

var _plugin = require("../constants/plugin");

var _errors = require("./errors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LicenseState {
  constructor(license$) {
    _defineProperty(this, "licenseInformation", this.checkLicense(undefined));

    _defineProperty(this, "subscription", void 0);

    _defineProperty(this, "license", void 0);

    this.subscription = license$.subscribe(this.updateInformation.bind(this));
  }

  updateInformation(license) {
    this.license = license;
    this.licenseInformation = this.checkLicense(license);
  }

  clean() {
    this.subscription.unsubscribe();
  }

  getLicenseInformation() {
    return this.licenseInformation;
  }

  isLicenseValidForActionType(actionType) {
    var _this$license;

    if (!((_this$license = this.license) === null || _this$license === void 0 ? void 0 : _this$license.isAvailable)) {
      return {
        isValid: false,
        reason: 'unavailable'
      };
    }

    const check = this.license.check(actionType.id, actionType.minimumLicenseRequired);

    switch (check.state) {
      case 'expired':
        return {
          isValid: false,
          reason: 'expired'
        };

      case 'invalid':
        return {
          isValid: false,
          reason: 'invalid'
        };

      case 'unavailable':
        return {
          isValid: false,
          reason: 'unavailable'
        };

      case 'valid':
        return {
          isValid: true
        };

      default:
        return (0, _utils.assertNever)(check.state);
    }
  }

  ensureLicenseForActionType(actionType) {
    const check = this.isLicenseValidForActionType(actionType);

    if (check.isValid) {
      return;
    }

    switch (check.reason) {
      case 'unavailable':
        throw new _errors.ActionTypeDisabledError(_i18n.i18n.translate('xpack.actions.serverSideErrors.unavailableLicenseErrorMessage', {
          defaultMessage: 'Action type {actionTypeId} is disabled because license information is not available at this time.',
          values: {
            actionTypeId: actionType.id
          }
        }), 'license_unavailable');

      case 'expired':
        throw new _errors.ActionTypeDisabledError(_i18n.i18n.translate('xpack.actions.serverSideErrors.expirerdLicenseErrorMessage', {
          defaultMessage: 'Action type {actionTypeId} is disabled because your {licenseType} license has expired.',
          values: {
            actionTypeId: actionType.id,
            licenseType: this.license.type
          }
        }), 'license_expired');

      case 'invalid':
        throw new _errors.ActionTypeDisabledError(_i18n.i18n.translate('xpack.actions.serverSideErrors.invalidLicenseErrorMessage', {
          defaultMessage: 'Action type {actionTypeId} is disabled because your {licenseType} license does not support it. Please upgrade your license.',
          values: {
            actionTypeId: actionType.id,
            licenseType: this.license.type
          }
        }), 'license_invalid');

      default:
        (0, _utils.assertNever)(check.reason);
    }
  }

  checkLicense(license) {
    if (!(license === null || license === void 0 ? void 0 : license.isAvailable)) {
      return {
        showAppLink: true,
        enableAppLink: false,
        message: _i18n.i18n.translate('xpack.actions.serverSideErrors.unavailableLicenseInformationErrorMessage', {
          defaultMessage: 'Actions is unavailable - license information is not available at this time.'
        })
      };
    }

    const check = license.check(_plugin.PLUGIN.ID, _plugin.PLUGIN.MINIMUM_LICENSE_REQUIRED);

    switch (check.state) {
      case 'expired':
        return {
          showAppLink: true,
          enableAppLink: false,
          message: check.message || ''
        };

      case 'invalid':
      case 'unavailable':
        return {
          showAppLink: false,
          enableAppLink: false,
          message: check.message || ''
        };

      case 'valid':
        return {
          showAppLink: true,
          enableAppLink: true,
          message: ''
        };

      default:
        return (0, _utils.assertNever)(check.state);
    }
  }

}

exports.LicenseState = LicenseState;