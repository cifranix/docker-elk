"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeSettings = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _constants = require("../../../../../common/constants");

var _app_context = require("../../../app_context");

var _index = require("../../index");

var _azure_settings = require("./azure_settings");

var _fs_settings = require("./fs_settings");

var _gcs_settings = require("./gcs_settings");

var _hdfs_settings = require("./hdfs_settings");

var _readonly_settings = require("./readonly_settings");

var _s3_settings = require("./s3_settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TypeSettings = function TypeSettings(_ref) {
  var _typeSettingsMap;

  var repository = _ref.repository,
      updateRepository = _ref.updateRepository,
      settingErrors = _ref.settingErrors;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var type = repository.type,
      settings = repository.settings;

  var updateRepositorySettings = function updateRepositorySettings(updatedSettings, replaceSettings) {
    if (replaceSettings) {
      updateRepository({
        settings: updatedSettings
      });
    } else {
      updateRepository({
        settings: _objectSpread({}, settings, {}, updatedSettings)
      });
    }
  };

  var typeSettingsMap = (_typeSettingsMap = {}, _defineProperty(_typeSettingsMap, _constants.REPOSITORY_TYPES.fs, _fs_settings.FSSettings), _defineProperty(_typeSettingsMap, _constants.REPOSITORY_TYPES.url, _readonly_settings.ReadonlySettings), _defineProperty(_typeSettingsMap, _constants.REPOSITORY_TYPES.azure, _azure_settings.AzureSettings), _defineProperty(_typeSettingsMap, _constants.REPOSITORY_TYPES.gcs, _gcs_settings.GCSSettings), _defineProperty(_typeSettingsMap, _constants.REPOSITORY_TYPES.hdfs, _hdfs_settings.HDFSSettings), _defineProperty(_typeSettingsMap, _constants.REPOSITORY_TYPES.s3, _s3_settings.S3Settings), _typeSettingsMap);

  var renderTypeSettings = function renderTypeSettings(repositoryType) {
    if (!repositoryType) {
      return null;
    }

    var RepositorySettings = typeSettingsMap[repositoryType];

    if (RepositorySettings) {
      return _react.default.createElement(RepositorySettings, {
        repository: repository,
        updateRepositorySettings: updateRepositorySettings,
        settingErrors: settingErrors
      });
    }

    return _react.default.createElement(_index.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryForm.errorUnknownRepositoryTypesTitle",
        defaultMessage: "Unknown repository type"
      }),
      error: {
        error: i18n.translate('xpack.snapshotRestore.repositoryForm.errorUnknownRepositoryTypesMessage', {
          defaultMessage: "The repository type '{type}' is not supported.",
          values: {
            type: repositoryType
          }
        })
      }
    });
  };

  return type === _constants.REPOSITORY_TYPES.source ? renderTypeSettings(settings.delegateType) : renderTypeSettings(type);
};

exports.TypeSettings = TypeSettings;