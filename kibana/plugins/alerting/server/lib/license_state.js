"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyApiAccessFactory = verifyApiAccessFactory;
exports.LicenseState = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _i18n = require("@kbn/i18n");

var _utils = require("../../../../../src/core/utils");

var _plugin = require("../constants/plugin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LicenseState {
  constructor(license$) {
    _defineProperty(this, "licenseInformation", this.checkLicense(undefined));

    _defineProperty(this, "subscription", void 0);

    this.subscription = license$.subscribe(this.updateInformation.bind(this));
  }

  updateInformation(license) {
    this.licenseInformation = this.checkLicense(license);
  }

  clean() {
    this.subscription.unsubscribe();
  }

  getLicenseInformation() {
    return this.licenseInformation;
  }

  checkLicense(license) {
    if (!license || !license.isAvailable) {
      return {
        showAppLink: true,
        enableAppLink: false,
        message: _i18n.i18n.translate('xpack.alerting.serverSideErrors.unavailableLicenseInformationErrorMessage', {
          defaultMessage: 'Alerting is unavailable - license information is not available at this time.'
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

function verifyApiAccessFactory(licenseState) {
  function verifyApiAccess() {
    const licenseCheckResults = licenseState.getLicenseInformation();

    if (licenseCheckResults.showAppLink && licenseCheckResults.enableAppLink) {
      return null;
    }

    throw _boom.default.forbidden(licenseCheckResults.message);
  }

  return verifyApiAccess;
}