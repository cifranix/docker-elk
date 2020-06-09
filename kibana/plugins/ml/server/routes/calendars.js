"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calendars = calendars;

var _configSchema = require("@kbn/config-schema");

var _error_wrapper = require("../client/error_wrapper");

var _calendars_schema = require("./schemas/calendars_schema");

var _calendar = require("../models/calendar");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getAllCalendars(context) {
  const cal = new _calendar.CalendarManager(context.ml.mlClient.callAsCurrentUser);
  return cal.getAllCalendars();
}

function getCalendar(context, calendarId) {
  const cal = new _calendar.CalendarManager(context.ml.mlClient.callAsCurrentUser);
  return cal.getCalendar(calendarId);
}

function newCalendar(context, calendar) {
  const cal = new _calendar.CalendarManager(context.ml.mlClient.callAsCurrentUser);
  return cal.newCalendar(calendar);
}

function updateCalendar(context, calendarId, calendar) {
  const cal = new _calendar.CalendarManager(context.ml.mlClient.callAsCurrentUser);
  return cal.updateCalendar(calendarId, calendar);
}

function deleteCalendar(context, calendarId) {
  const cal = new _calendar.CalendarManager(context.ml.mlClient.callAsCurrentUser);
  return cal.deleteCalendar(calendarId);
}

function getCalendarsByIds(context, calendarIds) {
  const cal = new _calendar.CalendarManager(context.ml.mlClient.callAsCurrentUser);
  return cal.getCalendarsByIds(calendarIds);
}

function calendars({
  router,
  mlLicense
}) {
  // Gets calendars - size limit has been explicitly set to 1000
  router.get({
    path: '/api/ml/calendars',
    validate: false
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const resp = await getAllCalendars(context);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  router.get({
    path: '/api/ml/calendars/{calendarIds}',
    validate: {
      params: _configSchema.schema.object({
        calendarIds: _configSchema.schema.string()
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    let returnValue;

    try {
      const calendarIds = request.params.calendarIds.split(',');

      if (calendarIds.length === 1) {
        returnValue = await getCalendar(context, calendarIds[0]);
      } else {
        returnValue = await getCalendarsByIds(context, calendarIds);
      }

      return response.ok({
        body: returnValue
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  router.put({
    path: '/api/ml/calendars',
    validate: {
      body: _configSchema.schema.object({ ..._calendars_schema.calendarSchema
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const body = request.body;
      const resp = await newCalendar(context, body);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  router.put({
    path: '/api/ml/calendars/{calendarId}',
    validate: {
      params: _configSchema.schema.object({
        calendarId: _configSchema.schema.string()
      }),
      body: _configSchema.schema.object({ ..._calendars_schema.calendarSchema
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        calendarId
      } = request.params;
      const body = request.body;
      const resp = await updateCalendar(context, calendarId, body);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  router.delete({
    path: '/api/ml/calendars/{calendarId}',
    validate: {
      params: _configSchema.schema.object({
        calendarId: _configSchema.schema.string()
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        calendarId
      } = request.params;
      const resp = await deleteCalendar(context, calendarId);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
}