"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRepository = exports.INVALID_NAME_CHARS = void 0;

var _text = require("../text");

var _constants = require("../../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INVALID_NAME_CHARS = ['"', '*', '\\', '<', '|', ',', '>', '/', '?'];
exports.INVALID_NAME_CHARS = INVALID_NAME_CHARS;

var isStringEmpty = function isStringEmpty(str) {
  return str ? !Boolean(str.trim()) : true;
};

var doesStringContainChar = function doesStringContainChar(string, char) {
  var chars = Array.isArray(char) ? char : [char];
  var total = chars.length;
  var containsChar = false;
  var charFound = null;

  for (var i = 0; i < total; i++) {
    if (string.includes(chars[i])) {
      containsChar = true;
      charFound = chars[i];
      break;
    }
  }

  return {
    containsChar: containsChar,
    charFound: charFound
  };
};

var validateRepository = function validateRepository(repository) {
  var validateSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var name = repository.name,
      type = repository.type,
      settings = repository.settings;
  var i18n = _text.textService.i18n;
  var validation = {
    isValid: true,
    errors: {}
  };

  if (validateSettings) {
    var settingsValidation = validateRepositorySettings(type, settings);

    if (Object.keys(settingsValidation).length) {
      validation.errors.settings = settingsValidation;
    }
  }

  if (isStringEmpty(name)) {
    validation.errors.name = [i18n.translate('xpack.snapshotRestore.repositoryValidation.nameRequired', {
      defaultMessage: 'Repository name is required.'
    })];
  }

  if (name.includes(' ')) {
    validation.errors.name = [i18n.translate('xpack.snapshotRestore.repositoryValidation.nameValidation.errorSpace', {
      defaultMessage: 'Spaces are not allowed in the name.'
    })];
  }

  var nameCharValidation = doesStringContainChar(name, INVALID_NAME_CHARS);

  if (nameCharValidation.containsChar) {
    validation.errors.name = [i18n.translate('xpack.snapshotRestore.repositoryValidation.nameValidation.invalidCharacter', {
      defaultMessage: 'Character "{char}" is not allowed in the name.',
      values: {
        char: nameCharValidation.charFound
      }
    })];
  }

  if (isStringEmpty(type) || type === _constants.REPOSITORY_TYPES.source && isStringEmpty(settings.delegateType)) {
    validation.errors.type = [i18n.translate('xpack.snapshotRestore.repositoryValidation.delegateTypeRequired', {
      defaultMessage: 'Type is required.'
    })];
  }

  if (Object.keys(validation.errors).length) {
    validation.isValid = false;
  }

  return validation;
};

exports.validateRepository = validateRepository;

var validateRepositorySettings = function validateRepositorySettings(type, settings) {
  switch (type) {
    case _constants.REPOSITORY_TYPES.fs:
      return validateFSRepositorySettings(settings);

    case _constants.REPOSITORY_TYPES.url:
      return validateReadonlyRepositorySettings(settings);

    case _constants.REPOSITORY_TYPES.source:
      return validateRepositorySettings(settings.delegateType, settings);

    case _constants.REPOSITORY_TYPES.s3:
      return validateS3RepositorySettings(settings);

    case _constants.REPOSITORY_TYPES.gcs:
      return validateGCSRepositorySettings(settings);

    case _constants.REPOSITORY_TYPES.hdfs:
      return validateHDFSRepositorySettings(settings);
    // No validation on settings needed for azure (all settings are optional)

    default:
      return {};
  }
};

var validateFSRepositorySettings = function validateFSRepositorySettings(settings) {
  var i18n = _text.textService.i18n;
  var validation = {};
  var location = settings.location;

  if (isStringEmpty(location)) {
    validation.location = [i18n.translate('xpack.snapshotRestore.repositoryValidation.locationRequired', {
      defaultMessage: 'Location is required.'
    })];
  }

  return validation;
};

var validateReadonlyRepositorySettings = function validateReadonlyRepositorySettings(settings) {
  var i18n = _text.textService.i18n;
  var validation = {};
  var url = settings.url;

  if (isStringEmpty(url)) {
    validation.url = [i18n.translate('xpack.snapshotRestore.repositoryValidation.urlRequired', {
      defaultMessage: 'URL is required.'
    })];
  }

  return validation;
};

var validateS3RepositorySettings = function validateS3RepositorySettings(settings) {
  var i18n = _text.textService.i18n;
  var validation = {};
  var bucket = settings.bucket;

  if (isStringEmpty(bucket)) {
    validation.bucket = [i18n.translate('xpack.snapshotRestore.repositoryValidation.bucketRequired', {
      defaultMessage: 'Bucket is required.'
    })];
  }

  return validation;
};

var validateGCSRepositorySettings = function validateGCSRepositorySettings(settings) {
  var i18n = _text.textService.i18n;
  var validation = {};
  var bucket = settings.bucket;

  if (isStringEmpty(bucket)) {
    validation.bucket = [i18n.translate('xpack.snapshotRestore.repositoryValidation.bucketRequired', {
      defaultMessage: 'Bucket is required.'
    })];
  }

  return validation;
};

var validateHDFSRepositorySettings = function validateHDFSRepositorySettings(settings) {
  var i18n = _text.textService.i18n;
  var validation = {};
  var uri = settings.uri,
      path = settings.path;

  if (isStringEmpty(uri)) {
    validation.uri = [i18n.translate('xpack.snapshotRestore.repositoryValidation.uriRequired', {
      defaultMessage: 'URI is required.'
    })];
  }

  if (isStringEmpty(path)) {
    validation.path = [i18n.translate('xpack.snapshotRestore.repositoryValidation.pathRequired', {
      defaultMessage: 'Path is required.'
    })];
  }

  return validation;
};