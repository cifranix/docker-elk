"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLicenseCache = setLicenseCache;
exports.checkFullLicense = checkFullLicense;
exports.checkBasicLicense = checkBasicLicense;
exports.hasLicenseExpired = hasLicenseExpired;
exports.isFullLicense = isFullLicense;

var _ml_client_license = require("./ml_client_license");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mlLicense = null;
/**
 * Create a new mlLicense and cache it for later checks
 *
 * @export
 * @param {LicensingPluginSetup} licensingSetup
 * @returns {MlClientLicense}
 */

function setLicenseCache(licensingSetup) {
  mlLicense = new _ml_client_license.MlClientLicense();
  mlLicense.setup(licensingSetup.license$);
  return mlLicense;
}
/**
 * Used as routing resolver to stop the loading of a page if the current license
 * is a trial, platinum or enterprise.
 *
 * @export
 * @returns {Promise<void>} Promise which resolves if the license is trial, platinum or enterprise and rejects if it isn't.
 */


function checkFullLicense() {
  return _checkFullLicense.apply(this, arguments);
}
/**
 * Used as routing resolver to stop the loading of a page if the current license
 * is at least basic.
 *
 * @export
 * @returns {Promise<void>} Promise resolves if the license is at least basic and rejects if it isn't.
 */


function _checkFullLicense() {
  _checkFullLicense = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(mlLicense === null)) {
              _context.next = 3;
              break;
            }

            // this should never happen
            console.error('ML Licensing not initialized'); // eslint-disable-line

            return _context.abrupt("return", Promise.reject());

          case 3:
            return _context.abrupt("return", mlLicense.fullLicenseResolver());

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _checkFullLicense.apply(this, arguments);
}

function checkBasicLicense() {
  return _checkBasicLicense.apply(this, arguments);
}
/**
 * Check to see if the current license has expired
 *
 * @export
 * @returns {boolean}
 */


function _checkBasicLicense() {
  _checkBasicLicense = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(mlLicense === null)) {
              _context2.next = 3;
              break;
            }

            // this should never happen
            console.error('ML Licensing not initialized'); // eslint-disable-line

            return _context2.abrupt("return", Promise.reject());

          case 3:
            return _context2.abrupt("return", mlLicense.basicLicenseResolver());

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _checkBasicLicense.apply(this, arguments);
}

function hasLicenseExpired() {
  return mlLicense !== null && mlLicense.hasLicenseExpired();
}
/**
 * Check to see if the current license is trial, platinum or enterprise.
 *
 * @export
 * @returns {boolean}
 */


function isFullLicense() {
  return mlLicense !== null && mlLicense.isFullLicense();
}