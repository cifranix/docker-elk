"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePolicy = void 0;

var _text = require("../text");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var isStringEmpty = function isStringEmpty(str) {
  return str ? !Boolean(str.trim()) : true;
}; // strExcludeDate is the concat results of the SnapshotName ...{...}>... without the date
// This way we can check only the SnapshotName portion for lowercasing
// For example: <logstash-{now/d}> would give strExcludeDate = <logstash->


var isSnapshotNameNotLowerCase = function isSnapshotNameNotLowerCase(str) {
  var strExcludeDate = str.substring(0, str.search('{')) + str.substring(str.search('}>') + 1, str.length);
  return strExcludeDate !== strExcludeDate.toLowerCase() ? true : false;
};

var validatePolicy = function validatePolicy(policy, validationHelperData) {
  var i18n = _text.textService.i18n;
  var name = policy.name,
      snapshotName = policy.snapshotName,
      schedule = policy.schedule,
      repository = policy.repository,
      config = policy.config,
      retention = policy.retention;
  var managedRepository = validationHelperData.managedRepository,
      isEditing = validationHelperData.isEditing,
      policyName = validationHelperData.policyName;
  var validation = {
    isValid: true,
    errors: {
      name: [],
      snapshotName: [],
      schedule: [],
      repository: [],
      indices: [],
      expireAfterValue: [],
      minCount: [],
      maxCount: []
    }
  };

  if (isStringEmpty(name)) {
    validation.errors.name.push(i18n.translate('xpack.snapshotRestore.policyValidation.nameRequiredErroMessage', {
      defaultMessage: 'Policy name is required.'
    }));
  }

  if (isStringEmpty(snapshotName)) {
    validation.errors.snapshotName.push(i18n.translate('xpack.snapshotRestore.policyValidation.snapshotNameRequiredErrorMessage', {
      defaultMessage: 'Snapshot name is required.'
    }));
  }

  if (isSnapshotNameNotLowerCase(snapshotName)) {
    validation.errors.snapshotName.push(i18n.translate('xpack.snapshotRestore.policyValidation.snapshotNameLowerCaseErrorMessage', {
      defaultMessage: 'Snapshot name needs to be lowercase.'
    }));
  }

  if (isStringEmpty(schedule)) {
    validation.errors.schedule.push(i18n.translate('xpack.snapshotRestore.policyValidation.scheduleRequiredErrorMessage', {
      defaultMessage: 'Schedule is required.'
    }));
  }

  if (isStringEmpty(repository)) {
    validation.errors.repository.push(i18n.translate('xpack.snapshotRestore.policyValidation.repositoryRequiredErrorMessage', {
      defaultMessage: 'Repository is required.'
    }));
  }

  if (config && typeof config.indices === 'string' && config.indices.trim().length === 0) {
    validation.errors.indices.push(i18n.translate('xpack.snapshotRestore.policyValidation.indexPatternRequiredErrorMessage', {
      defaultMessage: 'At least one index pattern is required.'
    }));
  }

  if (config && Array.isArray(config.indices) && config.indices.length === 0) {
    validation.errors.indices.push(i18n.translate('xpack.snapshotRestore.policyValidation.indicesRequiredErrorMessage', {
      defaultMessage: 'You must select at least one index.'
    }));
  }

  if (retention && retention.minCount && retention.maxCount && retention.minCount > retention.maxCount) {
    validation.errors.minCount.push(i18n.translate('xpack.snapshotRestore.policyValidation.invalidMinCountErrorMessage', {
      defaultMessage: 'Minimum count cannot be greater than maximum count.'
    }));
  }

  if (managedRepository && managedRepository.name === repository && managedRepository.policy && !(isEditing && managedRepository.policy === policyName)) {
    validation.errors.repository.push(i18n.translate('xpack.snapshotRestore.policyValidation.invalidRepoErrorMessage', {
      defaultMessage: 'Policy "{policyName}" is already associated with this repository.',
      values: {
        policyName: managedRepository.policy
      }
    }));
  }

  if (retention && retention.expireAfterValue && retention.expireAfterValue < 0) {
    validation.errors.expireAfterValue.push(i18n.translate('xpack.snapshotRestore.policyValidation.invalidNegativeDeleteAfterErrorMessage', {
      defaultMessage: 'Delete after cannot be negative.'
    }));
  }

  if (retention && retention.minCount && retention.minCount < 0) {
    validation.errors.minCount.push(i18n.translate('xpack.snapshotRestore.policyValidation.invalidNegativeMinCountErrorMessage', {
      defaultMessage: 'Minimum count cannot be negative.'
    }));
  }

  if (retention && retention.maxCount && retention.maxCount < 0) {
    validation.errors.maxCount.push(i18n.translate('xpack.snapshotRestore.policyValidation.invalidNegativeMaxCountErrorMessage', {
      defaultMessage: 'Maximum count cannot be negative.'
    }));
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

exports.validatePolicy = validatePolicy;