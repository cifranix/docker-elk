"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateValidationMessages = populateValidationMessages;
exports.checkForExistingJobAndGroupIds = checkForExistingJobAndGroupIds;

var _i18n = require("@kbn/i18n");

var _validation = require("../../../../../../common/constants/validation");

var _ml_server_info = require("../../../../services/ml_server_info");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function populateValidationMessages(validationResults, basicValidations, jobConfig, datafeedConfig) {
  var limits = (0, _ml_server_info.getNewJobLimits)();

  if (validationResults.contains('job_id_empty')) {
    basicValidations.jobId.valid = false;
  } else if (validationResults.contains('job_id_invalid')) {
    basicValidations.jobId.valid = false;

    var msg = _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.jobNameAllowedCharactersDescription', {
      defaultMessage: 'Job ID can contain lowercase alphanumeric (a-z and 0-9), hyphens or underscores; ' + 'must start and end with an alphanumeric character'
    });

    basicValidations.jobId.message = msg;
  } else if (validationResults.contains('job_id_invalid_max_length')) {
    basicValidations.jobId.valid = false;
    basicValidations.jobId.message = _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.jobIdInvalidMaxLengthErrorMessage', {
      defaultMessage: 'Job ID must be no more than {maxLength, plural, one {# character} other {# characters}} long.',
      values: {
        maxLength: _validation.JOB_ID_MAX_LENGTH
      }
    });
  } else if (validationResults.contains('job_id_already_exists')) {
    basicValidations.jobId.valid = false;

    var _msg = _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.jobNameAlreadyExists', {
      defaultMessage: 'Job ID already exists. A job ID cannot be the same as an existing job or group.'
    });

    basicValidations.jobId.message = _msg;
  }

  if (validationResults.contains('job_group_id_invalid')) {
    basicValidations.groupIds.valid = false;

    var _msg2 = _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.jobGroupAllowedCharactersDescription', {
      defaultMessage: 'Job group names can contain lowercase alphanumeric (a-z and 0-9), hyphens or underscores; ' + 'must start and end with an alphanumeric character'
    });

    basicValidations.groupIds.message = _msg2;
  } else if (validationResults.contains('job_group_id_invalid_max_length')) {
    basicValidations.groupIds.valid = false;
    basicValidations.groupIds.message = _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.jobGroupMaxLengthDescription', {
      defaultMessage: 'Job group name must be no more than {maxLength, plural, one {# character} other {# characters}} long.',
      values: {
        maxLength: _validation.JOB_ID_MAX_LENGTH
      }
    });
  } else if (validationResults.contains('job_group_id_already_exists')) {
    basicValidations.groupIds.valid = false;

    var _msg3 = _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.groupNameAlreadyExists', {
      defaultMessage: 'Group ID already exists. A group ID cannot be the same as an existing job or group.'
    });

    basicValidations.groupIds.message = _msg3;
  }

  if (validationResults.contains('model_memory_limit_units_invalid')) {
    basicValidations.modelMemoryLimit.valid = false;
    var str = "".concat(_validation.ALLOWED_DATA_UNITS.slice(0, _validation.ALLOWED_DATA_UNITS.length - 1).join(', '), " or ").concat(_toConsumableArray(_validation.ALLOWED_DATA_UNITS).pop());

    var _msg4 = _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.modelMemoryLimitUnitsInvalidErrorMessage', {
      defaultMessage: 'Model memory limit data unit unrecognized. It must be {str}',
      values: {
        str: str
      }
    });

    basicValidations.modelMemoryLimit.message = _msg4;
  }

  if (validationResults.contains('model_memory_limit_invalid')) {
    basicValidations.modelMemoryLimit.valid = false;
    var maxModelMemoryLimit = (limits.max_model_memory_limit || '').toUpperCase();

    var _msg5 = _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.modelMemoryLimitRangeInvalidErrorMessage', {
      defaultMessage: 'Model memory limit cannot be higher than the maximum value of {maxModelMemoryLimit}',
      values: {
        maxModelMemoryLimit: maxModelMemoryLimit
      }
    });

    basicValidations.modelMemoryLimit.message = _msg5;
  }

  if (validationResults.contains('detectors_duplicates')) {
    basicValidations.duplicateDetectors.valid = false;

    var _msg6 = _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.duplicatedDetectorsErrorMessage', {
      defaultMessage: 'Duplicate detectors were found.'
    });

    basicValidations.duplicateDetectors.message = _msg6;
  }

  if (validationResults.contains('bucket_span_empty')) {
    basicValidations.bucketSpan.valid = false;

    var _msg7 = _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.bucketSpanMustBeSetErrorMessage', {
      defaultMessage: 'Bucket span must be set'
    });

    basicValidations.bucketSpan.message = _msg7;
  } else if (validationResults.contains('bucket_span_invalid')) {
    basicValidations.bucketSpan.valid = false;
    basicValidations.bucketSpan.message = invalidTimeFormatMessage(jobConfig.analysis_config.bucket_span);
  }

  if (validationResults.contains('query_empty')) {
    basicValidations.query.valid = false;

    var _msg8 = _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.queryCannotBeEmpty', {
      defaultMessage: 'Datafeed query cannot be empty.'
    });

    basicValidations.query.message = _msg8;
  } else if (validationResults.contains('query_invalid')) {
    basicValidations.query.valid = false;

    var _msg9 = _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.queryIsInvalidEsQuery', {
      defaultMessage: 'Datafeed query must be a valid elasticsearch query.'
    });

    basicValidations.query.message = _msg9;
  }

  if (validationResults.contains('query_delay_invalid')) {
    basicValidations.queryDelay.valid = false;
    basicValidations.queryDelay.message = invalidTimeFormatMessage(datafeedConfig.query_delay);
  }

  if (validationResults.contains('frequency_invalid')) {
    basicValidations.frequency.valid = false;
    basicValidations.frequency.message = invalidTimeFormatMessage(datafeedConfig.frequency);
  }
}

function checkForExistingJobAndGroupIds(jobId, groupIds, existingJobsAndGroups) {
  var messages = []; // check that job id does not already exist as a job or group or a newly created group

  if (existingJobsAndGroups.jobIds.includes(jobId) || existingJobsAndGroups.groupIds.includes(jobId) || groupIds.includes(jobId)) {
    messages.push({
      id: 'job_id_already_exists'
    });
  } // check that groups that have been newly added in this job do not already exist as job ids


  var newGroups = groupIds.filter(function (g) {
    return !existingJobsAndGroups.groupIds.includes(g);
  });

  if (existingJobsAndGroups.jobIds.some(function (g) {
    return newGroups.includes(g);
  })) {
    messages.push({
      id: 'job_group_id_already_exists'
    });
  }

  return {
    messages: messages,
    valid: messages.length === 0,
    contains: function contains(id) {
      return messages.some(function (m) {
        return id === m.id;
      });
    },
    find: function find(id) {
      return messages.find(function (m) {
        return id === m.id;
      });
    }
  };
}

function invalidTimeFormatMessage(value) {
  return _i18n.i18n.translate('xpack.ml.newJob.wizard.validateJob.frequencyInvalidTimeIntervalFormatErrorMessage', {
    defaultMessage: '{value} is not a valid time interval format e.g. {tenMinutes}, {oneHour}. It also needs to be higher than zero.',
    values: {
      value: value,
      tenMinutes: '10m',
      oneHour: '1h'
    }
  });
}