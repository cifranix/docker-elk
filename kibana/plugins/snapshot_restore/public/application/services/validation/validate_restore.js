"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRestore = void 0;

var _constants = require("../../constants");

var _text = require("../text");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var isStringEmpty = function isStringEmpty(str) {
  return str ? !Boolean(str.trim()) : true;
};

var validateRestore = function validateRestore(restoreSettings) {
  var i18n = _text.textService.i18n;
  var indices = restoreSettings.indices,
      renamePattern = restoreSettings.renamePattern,
      renameReplacement = restoreSettings.renameReplacement,
      indexSettings = restoreSettings.indexSettings,
      ignoreIndexSettings = restoreSettings.ignoreIndexSettings;
  var validation = {
    isValid: true,
    errors: {
      indices: [],
      renamePattern: [],
      renameReplacement: [],
      indexSettings: [],
      ignoreIndexSettings: []
    }
  };

  if (typeof indices === 'string' && indices.trim().length === 0) {
    validation.errors.indices.push(i18n.translate('xpack.snapshotRestore.restoreValidation.indexPatternRequiredError', {
      defaultMessage: 'At least one index pattern is required.'
    }));
  }

  if (Array.isArray(indices) && indices.length === 0) {
    validation.errors.indices.push(i18n.translate('xpack.snapshotRestore.restoreValidation.indicesRequiredError', {
      defaultMessage: 'You must select at least one index.'
    }));
  }

  if (renamePattern !== undefined && isStringEmpty(renamePattern)) {
    validation.errors.renamePattern.push(i18n.translate('xpack.snapshotRestore.restoreValidation.renamePatternRequiredError', {
      defaultMessage: 'Capture pattern is required.'
    }));
  }

  if (renameReplacement !== undefined && isStringEmpty(renameReplacement)) {
    validation.errors.renameReplacement.push(i18n.translate('xpack.snapshotRestore.restoreValidation.renameReplacementRequiredError', {
      defaultMessage: 'Replacement pattern is required.'
    }));
  }

  if (typeof indexSettings === 'string') {
    try {
      var parsedIndexSettings = JSON.parse(indexSettings);
      var modifiedSettings = Object.keys(parsedIndexSettings);
      var modifiedSettingsCount = modifiedSettings.length;
      var unmodifiableSettings = modifiedSettingsCount > 0 ? modifiedSettings.filter(function (setting) {
        return _constants.UNMODIFIABLE_INDEX_SETTINGS.includes(setting);
      }) : null;

      if (modifiedSettingsCount === 0) {
        validation.errors.indexSettings.push(i18n.translate('xpack.snapshotRestore.restoreValidation.indexSettingsRequiredError', {
          defaultMessage: 'At least one setting is required.'
        }));
      }

      if (unmodifiableSettings && unmodifiableSettings.length > 0) {
        validation.errors.indexSettings.push(i18n.translate('xpack.snapshotRestore.restoreValidation.indexSettingsNotModifiableError', {
          defaultMessage: 'You can’t modify: {settings}',
          // @ts-ignore Bug filed: https://github.com/elastic/kibana/issues/39299
          values: {
            settings: unmodifiableSettings.map(function (setting, index) {
              return index === 0 ? "".concat(setting, " ") : setting;
            })
          }
        }));
      }
    } catch (e) {
      validation.errors.indexSettings.push(i18n.translate('xpack.snapshotRestore.restoreValidation.indexSettingsInvalidError', {
        defaultMessage: 'Invalid JSON format'
      }));
    }
  }

  if (Array.isArray(ignoreIndexSettings)) {
    var ignoredSettingsCount = ignoreIndexSettings.length;
    var unremovableSettings = ignoredSettingsCount > 0 ? ignoreIndexSettings.filter(function (setting) {
      return _constants.UNREMOVABLE_INDEX_SETTINGS.includes(setting);
    }) : null;

    if (ignoredSettingsCount === 0) {
      validation.errors.ignoreIndexSettings.push(i18n.translate('xpack.snapshotRestore.restoreValidation.ignoreIndexSettingsRequiredError', {
        defaultMessage: 'At least one setting is required.'
      }));
    }

    if (unremovableSettings && unremovableSettings.length > 0) {
      validation.errors.ignoreIndexSettings.push(i18n.translate('xpack.snapshotRestore.restoreValidation.indexSettingsNotRemovableError', {
        defaultMessage: 'You can’t reset: {settings}',
        // @ts-ignore Bug filed: https://github.com/elastic/kibana/issues/39299
        values: {
          settings: unremovableSettings.map(function (setting, index) {
            return index === 0 ? "".concat(setting, " ") : setting;
          })
        }
      }));
    }
  } // Remove fields with no errors


  validation.errors = Object.entries(validation.errors).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return value.length > 0;
  }).reduce(function (errs, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    errs[key] = value;
    return errs;
  }, {}); // Set overall validations status

  if (Object.keys(validation.errors).length > 0) {
    validation.isValid = false;
  }

  return validation;
};

exports.validateRestore = validateRestore;