"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeDetails = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../../../../../../common/constants");

var _azure_details = require("./azure_details");

var _default_details = require("./default_details");

var _fs_details = require("./fs_details");

var _gcs_details = require("./gcs_details");

var _hdfs_details = require("./hdfs_details");

var _readonly_details = require("./readonly_details");

var _s3_details = require("./s3_details");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TypeDetails = function TypeDetails(_ref) {
  var repository = _ref.repository;
  var type = repository.type,
      settings = repository.settings;

  switch (type) {
    case _constants.REPOSITORY_TYPES.fs:
      return _react.default.createElement(_fs_details.FSDetails, {
        repository: repository
      });

    case _constants.REPOSITORY_TYPES.url:
      return _react.default.createElement(_readonly_details.ReadonlyDetails, {
        repository: repository
      });

    case _constants.REPOSITORY_TYPES.source:
      var delegateType = settings.delegateType;

      var delegatedRepository = _objectSpread({}, repository, {
        type: delegateType
      });

      return _react.default.createElement(TypeDetails, {
        repository: delegatedRepository
      });

    case _constants.REPOSITORY_TYPES.azure:
      return _react.default.createElement(_azure_details.AzureDetails, {
        repository: repository
      });

    case _constants.REPOSITORY_TYPES.gcs:
      return _react.default.createElement(_gcs_details.GCSDetails, {
        repository: repository
      });

    case _constants.REPOSITORY_TYPES.hdfs:
      return _react.default.createElement(_hdfs_details.HDFSDetails, {
        repository: repository
      });

    case _constants.REPOSITORY_TYPES.s3:
      return _react.default.createElement(_s3_details.S3Details, {
        repository: repository
      });

    default:
      return _react.default.createElement(_default_details.DefaultDetails, {
        repository: repository
      });
  }
};

exports.TypeDetails = TypeDetails;