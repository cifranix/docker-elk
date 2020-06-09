"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarManager = void 0;

var _lodash = require("lodash");

var _boom = _interopRequireDefault(require("boom"));

var _event_manager = require("./event_manager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CalendarManager {
  constructor(client) {
    _defineProperty(this, "_client", void 0);

    _defineProperty(this, "_eventManager", void 0);

    this._client = client;
    this._eventManager = new _event_manager.EventManager(client);
  }

  async getCalendar(calendarId) {
    try {
      const resp = await this._client('ml.calendars', {
        calendarId
      });
      const calendars = resp.calendars;

      if (calendars.length) {
        const calendar = calendars[0];
        calendar.events = await this._eventManager.getCalendarEvents(calendarId);
        return calendar;
      } else {
        throw _boom.default.notFound(`Calendar with the id "${calendarId}" not found`);
      }
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  }

  async getAllCalendars() {
    try {
      const calendarsResp = await this._client('ml.calendars');
      const events = await this._eventManager.getAllEvents();
      const calendars = calendarsResp.calendars;
      calendars.forEach(cal => cal.events = []); // loop events and combine with related calendars

      events.forEach(event => {
        const calendar = calendars.find(cal => cal.calendar_id === event.calendar_id);

        if (calendar) {
          calendar.events.push(event);
        }
      });
      return calendars;
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  }
  /**
   * Gets a list of calendar objects based on provided ids.
   * @param calendarIds
   * @returns {Promise<*>}
   */


  async getCalendarsByIds(calendarIds) {
    try {
      const calendars = await this.getAllCalendars();
      return calendars.filter(calendar => calendarIds.includes(calendar.calendar_id));
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  }

  async newCalendar(calendar) {
    const calendarId = calendar.calendarId;
    const events = calendar.events;
    delete calendar.calendarId;
    delete calendar.events;

    try {
      await this._client('ml.addCalendar', {
        calendarId,
        body: calendar
      });

      if (events.length) {
        await this._eventManager.addEvents(calendarId, events);
      } // return the newly created calendar


      return await this.getCalendar(calendarId);
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  }

  async updateCalendar(calendarId, calendar) {
    const origCalendar = await this.getCalendar(calendarId);

    try {
      // update job_ids
      const jobsToAdd = (0, _lodash.difference)(calendar.job_ids, origCalendar.job_ids);
      const jobsToRemove = (0, _lodash.difference)(origCalendar.job_ids, calendar.job_ids); // workout the differences between the original events list and the new one
      // if an event has no event_id, it must be new

      const eventsToAdd = calendar.events.filter(event => origCalendar.events.find(e => this._eventManager.isEqual(e, event)) === undefined); // if an event in the original calendar cannot be found, it must have been deleted

      const eventsToRemove = origCalendar.events.filter(event => calendar.events.find(e => this._eventManager.isEqual(e, event)) === undefined); // note, both of the loops below could be removed if the add and delete endpoints
      // allowed multiple job_ids
      // add all new jobs

      if (jobsToAdd.length) {
        await this._client('ml.addJobToCalendar', {
          calendarId,
          jobId: jobsToAdd.join(',')
        });
      } // remove all removed jobs


      if (jobsToRemove.length) {
        await this._client('ml.removeJobFromCalendar', {
          calendarId,
          jobId: jobsToRemove.join(',')
        });
      } // add all new events


      if (eventsToAdd.length !== 0) {
        await this._eventManager.addEvents(calendarId, eventsToAdd);
      } // remove all removed events


      await Promise.all(eventsToRemove.map(async event => {
        await this._eventManager.deleteEvent(calendarId, event.event_id);
      }));
    } catch (error) {
      throw _boom.default.badRequest(error);
    } // return the updated calendar


    return await this.getCalendar(calendarId);
  }

  async deleteCalendar(calendarId) {
    return this._client('ml.deleteCalendar', {
      calendarId
    });
  }

}

exports.CalendarManager = CalendarManager;