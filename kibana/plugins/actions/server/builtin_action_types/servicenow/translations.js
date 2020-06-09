"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIELD_INFORMATION = exports.UNEXPECTED_STATUS = exports.RETRY_POSTING = exports.ERROR_POSTING = exports.MAPPING_EMPTY = exports.NAME = exports.WHITE_LISTED_ERROR = exports.API_URL_REQUIRED = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const API_URL_REQUIRED = _i18n.i18n.translate('xpack.actions.builtin.servicenow.servicenowApiNullError', {
  defaultMessage: 'ServiceNow [apiUrl] is required'
});

exports.API_URL_REQUIRED = API_URL_REQUIRED;

const WHITE_LISTED_ERROR = message => _i18n.i18n.translate('xpack.actions.builtin.servicenow.servicenowApiWhitelistError', {
  defaultMessage: 'error configuring servicenow action: {message}',
  values: {
    message
  }
});

exports.WHITE_LISTED_ERROR = WHITE_LISTED_ERROR;

const NAME = _i18n.i18n.translate('xpack.actions.builtin.servicenowTitle', {
  defaultMessage: 'ServiceNow'
});

exports.NAME = NAME;

const MAPPING_EMPTY = _i18n.i18n.translate('xpack.actions.builtin.servicenow.emptyMapping', {
  defaultMessage: '[casesConfiguration.mapping]: expected non-empty but got empty'
});

exports.MAPPING_EMPTY = MAPPING_EMPTY;

const ERROR_POSTING = _i18n.i18n.translate('xpack.actions.builtin.servicenow.postingErrorMessage', {
  defaultMessage: 'error posting servicenow event'
});

exports.ERROR_POSTING = ERROR_POSTING;

const RETRY_POSTING = status => _i18n.i18n.translate('xpack.actions.builtin.servicenow.postingRetryErrorMessage', {
  defaultMessage: 'error posting servicenow event: http status {status}, retry later',
  values: {
    status
  }
});

exports.RETRY_POSTING = RETRY_POSTING;

const UNEXPECTED_STATUS = status => _i18n.i18n.translate('xpack.actions.builtin.servicenow.postingUnexpectedErrorMessage', {
  defaultMessage: 'error posting servicenow event: unexpected status {status}',
  values: {
    status
  }
});

exports.UNEXPECTED_STATUS = UNEXPECTED_STATUS;

const FIELD_INFORMATION = (mode, date, user) => {
  switch (mode) {
    case 'create':
      return _i18n.i18n.translate('xpack.actions.builtin.servicenow.informationCreated', {
        values: {
          date,
          user
        },
        defaultMessage: '(created at {date} by {user})'
      });

    case 'update':
      return _i18n.i18n.translate('xpack.actions.builtin.servicenow.informationUpdated', {
        values: {
          date,
          user
        },
        defaultMessage: '(updated at {date} by {user})'
      });

    case 'add':
      return _i18n.i18n.translate('xpack.actions.builtin.servicenow.informationAdded', {
        values: {
          date,
          user
        },
        defaultMessage: '(added at {date} by {user})'
      });

    default:
      return _i18n.i18n.translate('xpack.actions.builtin.servicenow.informationDefault', {
        values: {
          date,
          user
        },
        defaultMessage: '(created at {date} by {user})'
      });
  }
};

exports.FIELD_INFORMATION = FIELD_INFORMATION;