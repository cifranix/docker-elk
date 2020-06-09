"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCapabilityFailureMessage = createCapabilityFailureMessage;
exports.hasPrivilegeFactory = exports.toArray = void 0;

var _i18n = require("@kbn/i18n");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isPrivileges(arg) {
  return _typeof(arg) === 'object' && arg !== null && arg.hasOwnProperty('hasAllPrivileges') && typeof arg.hasAllPrivileges === 'boolean' && arg.hasOwnProperty('missingPrivileges') && _typeof(arg.missingPrivileges) === 'object' && arg.missingPrivileges !== null;
}

var toArray = function toArray(value) {
  return Array.isArray(value) ? value : [value];
};

exports.toArray = toArray;

var hasPrivilegeFactory = function hasPrivilegeFactory(privileges) {
  return function (privilege) {
    var _privilege = _slicedToArray(privilege, 2),
        section = _privilege[0],
        requiredPrivilege = _privilege[1];

    if (isPrivileges(privileges) && !privileges.missingPrivileges[section]) {
      // if the section does not exist in our missingPrivileges, everything is OK
      return true;
    }

    if (isPrivileges(privileges) && privileges.missingPrivileges[section].length === 0) {
      return true;
    }

    if (requiredPrivilege === '*') {
      // If length > 0 and we require them all... KO
      return false;
    } // If we require _some_ privilege, we make sure that the one
    // we require is *not* in the missingPrivilege array


    return isPrivileges(privileges) && !privileges.missingPrivileges[section].includes(requiredPrivilege);
  };
}; // create the text for button's tooltips if the user
// doesn't have the permission to press that button


exports.hasPrivilegeFactory = hasPrivilegeFactory;

function createCapabilityFailureMessage(capability) {
  var message = '';

  switch (capability) {
    case 'canCreateTransform':
      message = _i18n.i18n.translate('xpack.transform.capability.noPermission.createTransformTooltip', {
        defaultMessage: 'You do not have permission to create transforms.'
      });
      break;

    case 'canStartStopTransform':
      message = _i18n.i18n.translate('xpack.transform.capability.noPermission.startOrStopTransformTooltip', {
        defaultMessage: 'You do not have permission to start or stop transforms.'
      });
      break;

    case 'canDeleteTransform':
      message = _i18n.i18n.translate('xpack.transform.capability.noPermission.deleteTransformTooltip', {
        defaultMessage: 'You do not have permission to delete transforms.'
      });
      break;
  }

  return _i18n.i18n.translate('xpack.transform.capability.pleaseContactAdministratorTooltip', {
    defaultMessage: '{message} Please contact your administrator.',
    values: {
      message: message
    }
  });
}