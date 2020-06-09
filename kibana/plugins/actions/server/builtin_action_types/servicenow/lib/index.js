"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceNow = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const validStatusCodes = [200, 201];

class ServiceNow {
  constructor(instance) {
    this.instance = instance;

    _defineProperty(this, "incidentUrl", void 0);

    _defineProperty(this, "commentUrl", void 0);

    _defineProperty(this, "userUrl", void 0);

    _defineProperty(this, "axios", void 0);

    if (!this.instance || !this.instance.url || !this.instance.username || !this.instance.password) {
      throw Error('[Action][ServiceNow]: Wrong configuration.');
    }

    this.incidentUrl = `${this.instance.url}/${_constants.INCIDENT_URL}`;
    this.commentUrl = `${this.instance.url}/${_constants.COMMENT_URL}`;
    this.userUrl = `${this.instance.url}/${_constants.USER_URL}`;
    this.axios = _axios.default.create({
      auth: {
        username: this.instance.username,
        password: this.instance.password
      }
    });
  }

  _throwIfNotAlive(status, contentType) {
    if (!validStatusCodes.includes(status) || !contentType.includes('application/json')) {
      throw new Error('[ServiceNow]: Instance is not alive.');
    }
  }

  async _request({
    url,
    method = 'get',
    data = {}
  }) {
    const res = await this.axios(url, {
      method,
      data
    });

    this._throwIfNotAlive(res.status, res.headers['content-type']);

    return res;
  }

  _patch({
    url,
    data
  }) {
    return this._request({
      url,
      method: 'patch',
      data
    });
  }

  _addTimeZoneToDate(date, timezone = 'GMT') {
    return `${date} GMT`;
  }

  _getErrorMessage(msg) {
    return `[Action][ServiceNow]: ${msg}`;
  }

  _getIncidentViewURL(id) {
    return `${this.instance.url}/${_constants.VIEW_INCIDENT_URL}${id}`;
  }

  async getUserID() {
    try {
      const res = await this._request({
        url: `${this.userUrl}${this.instance.username}`
      });
      return res.data.result[0].sys_id;
    } catch (error) {
      throw new Error(this._getErrorMessage(`Unable to get user id. Error: ${error.message}`));
    }
  }

  async getIncident(incidentId) {
    try {
      const res = await this._request({
        url: `${this.incidentUrl}/${incidentId}`
      });
      return { ...res.data.result
      };
    } catch (error) {
      throw new Error(this._getErrorMessage(`Unable to get incident with id ${incidentId}. Error: ${error.message}`));
    }
  }

  async createIncident(incident) {
    try {
      const res = await this._request({
        url: `${this.incidentUrl}`,
        method: 'post',
        data: { ...incident
        }
      });
      return {
        number: res.data.result.number,
        incidentId: res.data.result.sys_id,
        pushedDate: new Date(this._addTimeZoneToDate(res.data.result.sys_created_on)).toISOString(),
        url: this._getIncidentViewURL(res.data.result.sys_id)
      };
    } catch (error) {
      throw new Error(this._getErrorMessage(`Unable to create incident. Error: ${error.message}`));
    }
  }

  async updateIncident(incidentId, incident) {
    try {
      const res = await this._patch({
        url: `${this.incidentUrl}/${incidentId}`,
        data: { ...incident
        }
      });
      return {
        number: res.data.result.number,
        incidentId: res.data.result.sys_id,
        pushedDate: new Date(this._addTimeZoneToDate(res.data.result.sys_updated_on)).toISOString(),
        url: this._getIncidentViewURL(res.data.result.sys_id)
      };
    } catch (error) {
      throw new Error(this._getErrorMessage(`Unable to update incident with id ${incidentId}. Error: ${error.message}`));
    }
  }

  async batchCreateComments(incidentId, comments, field) {
    // Create comments sequentially.
    const promises = comments.reduce(async (prevPromise, currentComment) => {
      const totalComments = await prevPromise;
      const res = await this.createComment(incidentId, currentComment, field);
      return [...totalComments, res];
    }, Promise.resolve([]));
    const res = await promises;
    return res;
  }

  async createComment(incidentId, comment, field) {
    try {
      const res = await this._patch({
        url: `${this.commentUrl}/${incidentId}`,
        data: {
          [field]: comment.comment
        }
      });
      return {
        commentId: comment.commentId,
        pushedDate: new Date(this._addTimeZoneToDate(res.data.result.sys_updated_on)).toISOString()
      };
    } catch (error) {
      throw new Error(this._getErrorMessage(`Unable to create comment at incident with id ${incidentId}. Error: ${error.message}`));
    }
  }

}

exports.ServiceNow = ServiceNow;