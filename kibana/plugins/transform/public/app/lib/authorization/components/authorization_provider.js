"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthorizationProvider = exports.AuthorizationContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _hooks = require("../../../hooks");

var _common = require("./common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialCapabalities = {
  canGetTransform: false,
  canDeleteTransform: false,
  canPreviewTransform: false,
  canCreateTransform: false,
  canStartStopTransform: false
};
var initialValue = {
  isLoading: true,
  apiError: null,
  privileges: {
    hasAllPrivileges: false,
    missingPrivileges: {}
  },
  capabilities: initialCapabalities
};
var AuthorizationContext = (0, _react.createContext)(_objectSpread({}, initialValue));
exports.AuthorizationContext = AuthorizationContext;

var AuthorizationProvider = function AuthorizationProvider(_ref) {
  var privilegesEndpoint = _ref.privilegesEndpoint,
      children = _ref.children;

  var _useRequest = (0, _hooks.useRequest)({
    path: privilegesEndpoint,
    method: 'get'
  }),
      isLoading = _useRequest.isLoading,
      error = _useRequest.error,
      privilegesData = _useRequest.data;

  var value = {
    isLoading: isLoading,
    privileges: isLoading ? _objectSpread({}, initialValue.privileges) : privilegesData,
    capabilities: _objectSpread({}, initialCapabalities),
    apiError: error ? error : null
  };
  var hasPrivilege = (0, _common.hasPrivilegeFactory)(value.privileges);
  value.capabilities.canGetTransform = hasPrivilege(['cluster', 'cluster:monitor/transform/get']) && hasPrivilege(['cluster', 'cluster:monitor/transform/stats/get']);
  value.capabilities.canCreateTransform = hasPrivilege(['cluster', 'cluster:admin/transform/put']);
  value.capabilities.canDeleteTransform = hasPrivilege(['cluster', 'cluster:admin/transform/delete']);
  value.capabilities.canPreviewTransform = hasPrivilege(['cluster', 'cluster:admin/transform/preview']);
  value.capabilities.canStartStopTransform = hasPrivilege(['cluster', 'cluster:admin/transform/start']) && hasPrivilege(['cluster', 'cluster:admin/transform/start_task']) && hasPrivilege(['cluster', 'cluster:admin/transform/stop']);
  return _react.default.createElement(AuthorizationContext.Provider, {
    value: _objectSpread({}, value)
  }, children);
};

exports.AuthorizationProvider = AuthorizationProvider;