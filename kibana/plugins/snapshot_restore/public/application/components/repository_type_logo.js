"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryTypeLogo = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _constants = require("../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var RepositoryTypeLogo = function RepositoryTypeLogo(_ref) {
  var _typeLogoMap;

  var type = _ref.type,
      rest = _objectWithoutProperties(_ref, ["type"]);

  var typeLogoMap = (_typeLogoMap = {}, _defineProperty(_typeLogoMap, _constants.REPOSITORY_TYPES.fs, 'storage'), _defineProperty(_typeLogoMap, _constants.REPOSITORY_TYPES.url, 'eye'), _defineProperty(_typeLogoMap, _constants.REPOSITORY_TYPES.azure, 'logoAzure'), _defineProperty(_typeLogoMap, _constants.REPOSITORY_TYPES.gcs, 'logoGCP'), _defineProperty(_typeLogoMap, _constants.REPOSITORY_TYPES.hdfs, 'logoApache'), _defineProperty(_typeLogoMap, _constants.REPOSITORY_TYPES.s3, 'logoAWS'), _typeLogoMap);
  return _react.default.createElement(_eui.EuiIcon, _extends({
    type: typeLogoMap[type] || 'folderOpen'
  }, rest));
};

exports.RepositoryTypeLogo = RepositoryTypeLogo;