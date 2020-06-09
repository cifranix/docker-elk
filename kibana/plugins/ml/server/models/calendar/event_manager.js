"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventManager = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _calendars = require("../../../common/constants/calendars");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EventManager {
  constructor(client) {
    _defineProperty(this, "_client", void 0);

    this._client = client;
  }

  async getCalendarEvents(calendarId) {
    try {
      const resp = await this._client('ml.events', {
        calendarId
      });
      return resp.events;
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  } // jobId is optional


  async getAllEvents(jobId) {
    const calendarId = _calendars.GLOBAL_CALENDAR;

    try {
      const resp = await this._client('ml.events', {
        calendarId,
        jobId
      });
      return resp.events;
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  }

  async addEvents(calendarId, events) {
    const body = {
      events
    };

    try {
      return await this._client('ml.addEvent', {
        calendarId,
        body
      });
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  }

  async deleteEvent(calendarId, eventId) {
    return this._client('ml.deleteEvent', {
      calendarId,
      eventId
    });
  }

  isEqual(ev1, ev2) {
    return ev1.event_id === ev2.event_id && ev1.description === ev2.description && ev1.start_time === ev2.start_time && ev1.end_time === ev2.end_time;
  }

}

exports.EventManager = EventManager;