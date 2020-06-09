"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterManager = void 0;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FilterManager {
  constructor(client) {
    _defineProperty(this, "_client", void 0);

    this._client = client;
  }

  async getFilter(filterId) {
    try {
      const [JOBS, FILTERS] = [0, 1];
      const results = await Promise.all([this._client('ml.jobs'), this._client('ml.filters', {
        filterId
      })]);

      if (results[FILTERS] && results[FILTERS].filters.length) {
        let filtersInUse = {};

        if (results[JOBS] && results[JOBS].jobs) {
          filtersInUse = this.buildFiltersInUse(results[JOBS].jobs);
        }

        const filter = results[FILTERS].filters[0];
        filter.used_by = filtersInUse[filter.filter_id];
        return filter;
      } else {
        throw _boom.default.notFound(`Filter with the id "${filterId}" not found`);
      }
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  }

  async getAllFilters() {
    try {
      const filtersResp = await this._client('ml.filters');
      return filtersResp.filters;
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  }

  async getAllFilterStats() {
    try {
      const [JOBS, FILTERS] = [0, 1];
      const results = await Promise.all([this._client('ml.jobs'), this._client('ml.filters')]); // Build a map of filter_ids against jobs and detectors using that filter.

      let filtersInUse = {};

      if (results[JOBS] && results[JOBS].jobs) {
        filtersInUse = this.buildFiltersInUse(results[JOBS].jobs);
      } // For each filter, return just
      //  filter_id
      //  description
      //  item_count
      //  jobs using the filter


      const filterStats = [];

      if (results[FILTERS] && results[FILTERS].filters) {
        results[FILTERS].filters.forEach(filter => {
          const stats = {
            filter_id: filter.filter_id,
            description: filter.description,
            item_count: filter.items.length,
            used_by: filtersInUse[filter.filter_id]
          };
          filterStats.push(stats);
        });
      }

      return filterStats;
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  }

  async newFilter(filter) {
    const filterId = filter.filterId;
    delete filter.filterId;

    try {
      // Returns the newly created filter.
      return await this._client('ml.addFilter', {
        filterId,
        body: filter
      });
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  }

  async updateFilter(filterId, filter) {
    try {
      const body = {
        filter_id: filterId
      };

      if (filter.description !== undefined) {
        body.description = filter.description;
      }

      if (filter.addItems !== undefined) {
        body.add_items = filter.addItems;
      }

      if (filter.removeItems !== undefined) {
        body.remove_items = filter.removeItems;
      } // Returns the newly updated filter.


      return await this._client('ml.updateFilter', {
        filterId,
        body
      });
    } catch (error) {
      throw _boom.default.badRequest(error);
    }
  }

  async deleteFilter(filterId) {
    return this._client('ml.deleteFilter', {
      filterId
    });
  }

  buildFiltersInUse(jobsList) {
    // Build a map of filter_ids against jobs and detectors using that filter.
    const filtersInUse = {};
    jobsList.forEach(job => {
      const detectors = job.analysis_config.detectors;
      detectors.forEach(detector => {
        if (detector.custom_rules) {
          const rules = detector.custom_rules;
          rules.forEach(rule => {
            if (rule.scope) {
              const ruleScope = rule.scope;
              const scopeFields = Object.keys(ruleScope);
              scopeFields.forEach(scopeField => {
                const filter = ruleScope[scopeField];
                const filterId = filter.filter_id;

                if (filtersInUse[filterId] === undefined) {
                  filtersInUse[filterId] = {
                    jobs: [],
                    detectors: []
                  };
                }

                const jobs = filtersInUse[filterId].jobs;
                const dtrs = filtersInUse[filterId].detectors;
                const jobId = job.job_id; // Label the detector with the job it comes from.

                const detectorLabel = `${detector.detector_description} (${jobId})`;

                if (jobs.indexOf(jobId) === -1) {
                  jobs.push(jobId);
                }

                if (dtrs.indexOf(detectorLabel) === -1) {
                  dtrs.push(detectorLabel);
                }
              });
            }
          });
        }
      });
    });
    return filtersInUse;
  }

}

exports.FilterManager = FilterManager;