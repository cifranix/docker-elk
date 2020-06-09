"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivilegesWrapper = exports.WithPrivileges = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _components = require("../../../components");

var _authorization_provider = require("./authorization_provider");

var _not_authorized_section = require("./not_authorized_section");

var _common = require("./common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WithPrivileges = function WithPrivileges(_ref) {
  var requiredPrivileges = _ref.privileges,
      children = _ref.children;

  var _useContext = (0, _react.useContext)(_authorization_provider.AuthorizationContext),
      isLoading = _useContext.isLoading,
      privileges = _useContext.privileges;

  var privilegesToArray = (0, _common.toArray)(requiredPrivileges).map(function (p) {
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
  var hasPrivilege = (0, _common.hasPrivilegeFactory)(privileges);
  var hasPrivileges = isLoading ? false : privilegesToArray.every(hasPrivilege);
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

var MissingClusterPrivileges = function MissingClusterPrivileges(_ref4) {
  var missingPrivileges = _ref4.missingPrivileges,
      privilegesCount = _ref4.privilegesCount;
  return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_not_authorized_section.NotAuthorizedSection, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.transform.app.deniedPrivilegeTitle",
      defaultMessage: "You're missing cluster privileges"
    }),
    message: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.transform.app.deniedPrivilegeDescription",
      defaultMessage: "To use this section of Transforms, you must have {privilegesCount, plural, one {this cluster privilege} other {these cluster privileges}}: {missingPrivileges}.",
      values: {
        missingPrivileges: missingPrivileges,
        privilegesCount: privilegesCount
      }
    })
  }));
};

var PrivilegesWrapper = function PrivilegesWrapper(_ref5) {
  var children = _ref5.children,
      privileges = _ref5.privileges;
  return _react.default.createElement(WithPrivileges, {
    privileges: privileges
  }, function (_ref6) {
    var isLoading = _ref6.isLoading,
        hasPrivileges = _ref6.hasPrivileges,
        privilegesMissing = _ref6.privilegesMissing;

    if (isLoading) {
      return _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.transform.app.checkingPrivilegesDescription",
        defaultMessage: "Checking privileges\u2026"
      }));
    }

    if (!hasPrivileges) {
      return _react.default.createElement(MissingClusterPrivileges, {
        missingPrivileges: privilegesMissing.cluster.join(', '),
        privilegesCount: privilegesMissing.cluster.length
      });
    }

    return _react.default.createElement(_react.default.Fragment, null, children);
  });
};

exports.PrivilegesWrapper = PrivilegesWrapper;