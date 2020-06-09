"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithPrivileges = void 0;

var _react = require("react");

var _authorization_provider = require("./authorization_provider");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var toArray = function toArray(value) {
  return Array.isArray(value) ? value : [value];
};

var WithPrivileges = function WithPrivileges(_ref) {
  var requiredPrivileges = _ref.privileges,
      children = _ref.children;

  var _useContext = (0, _react.useContext)(_authorization_provider.AuthorizationContext),
      isLoading = _useContext.isLoading,
      privileges = _useContext.privileges;

  var privilegesToArray = toArray(requiredPrivileges).map(function (p) {
    var _p$split = p.split('.'),
        _p$split2 = _slicedToArray(_p$split, 2),
        section = _p$split2[0],
        privilege = _p$split2[1];

    if (!privilege) {
      // Oh! we forgot to use the dot "." notation.
      throw new Error('Required privilege must have the format "section.privilege"');
    }

    return [section, privilege];
  });
  var hasPrivileges = isLoading ? false : privilegesToArray.every(function (privilege) {
    var _privilege = _slicedToArray(privilege, 2),
        section = _privilege[0],
        requiredPrivilege = _privilege[1];

    if (!privileges.missingPrivileges[section]) {
      // if the section does not exist in our missingPriviledges, everything is OK
      return true;
    }

    if (privileges.missingPrivileges[section].length === 0) {
      return true;
    }

    if (requiredPrivilege === '*') {
      // If length > 0 and we require them all... KO
      return false;
    } // If we require _some_ privilege, we make sure that the one
    // we require is *not* in the missingPrivilege array


    return !privileges.missingPrivileges[section].includes(requiredPrivilege);
  });
  var privilegesMissing = privilegesToArray.reduce(function (acc, _ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        section = _ref3[0],
        privilege = _ref3[1];

    if (privilege === '*') {
      acc[section] = privileges.missingPrivileges[section] || [];
    } else if (privileges.missingPrivileges[section] && privileges.missingPrivileges[section].includes(privilege)) {
      var missing = acc[section] || [];
      acc[section] = [].concat(_toConsumableArray(missing), [privilege]);
    }

    return acc;
  }, {});
  return children({
    isLoading: isLoading,
    hasPrivileges: hasPrivileges,
    privilegesMissing: privilegesMissing
  });
};

exports.WithPrivileges = WithPrivileges;