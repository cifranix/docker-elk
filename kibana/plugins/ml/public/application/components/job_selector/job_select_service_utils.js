"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGroupsFromJobs = getGroupsFromJobs;
exports.getTimeRangeFromSelection = getTimeRangeFromSelection;
exports.normalizeTimes = normalizeTimes;

var _i18n = require("@kbn/i18n");

var _moment = _interopRequireDefault(require("moment"));

var _d = _interopRequireDefault(require("d3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getGroupsFromJobs(jobs) {
  var groups = {};
  var groupsMap = {};
  jobs.forEach(function (job) {
    // Organize job by group
    if (job.groups !== undefined) {
      job.groups.forEach(function (g) {
        if (groups[g] === undefined) {
          groups[g] = {
            id: g,
            jobIds: [job.job_id],
            timeRange: {
              to: job.timeRange.to,
              toMoment: null,
              from: job.timeRange.from,
              fromMoment: null,
              fromPx: job.timeRange.fromPx,
              toPx: job.timeRange.toPx,
              widthPx: null
            }
          };
          groupsMap[g] = [job.job_id];
        } else {
          groups[g].jobIds.push(job.job_id);
          groupsMap[g].push(job.job_id); // keep track of earliest 'from' / latest 'to' for group range

          if (groups[g].timeRange.to === null || job.timeRange.to > groups[g].timeRange.to) {
            groups[g].timeRange.to = job.timeRange.to;
            groups[g].timeRange.toMoment = job.timeRange.toMoment;
          }

          if (groups[g].timeRange.from === null || job.timeRange.from < groups[g].timeRange.from) {
            groups[g].timeRange.from = job.timeRange.from;
            groups[g].timeRange.fromMoment = job.timeRange.fromMoment;
          }

          if (groups[g].timeRange.toPx === null || job.timeRange.toPx > groups[g].timeRange.toPx) {
            groups[g].timeRange.toPx = job.timeRange.toPx;
          }

          if (groups[g].timeRange.fromPx === null || job.timeRange.fromPx < groups[g].timeRange.fromPx) {
            groups[g].timeRange.fromPx = job.timeRange.fromPx;
          }
        }
      });
    }
  });
  Object.keys(groups).forEach(function (groupId) {
    var group = groups[groupId];
    group.timeRange.widthPx = group.timeRange.toPx - group.timeRange.fromPx;
    group.timeRange.toMoment = (0, _moment.default)(group.timeRange.to);
    group.timeRange.fromMoment = (0, _moment.default)(group.timeRange.from); // create label

    var fromString = group.timeRange.fromMoment.format('MMM Do YYYY, HH:mm');
    var toString = group.timeRange.toMoment.format('MMM Do YYYY, HH:mm');
    group.timeRange.label = _i18n.i18n.translate('xpack.ml.jobSelectList.groupTimeRangeLabel', {
      defaultMessage: '{fromString} to {toString}',
      values: {
        fromString: fromString,
        toString: toString
      }
    });
  });
  return {
    groups: Object.keys(groups).map(function (g) {
      return groups[g];
    }),
    groupsMap: groupsMap
  };
}

function getTimeRangeFromSelection(jobs, selection) {
  if (jobs.length > 0) {
    var times = [];
    jobs.forEach(function (job) {
      if (selection.includes(job.job_id)) {
        if (job.timeRange.from !== undefined) {
          times.push(job.timeRange.from);
        }

        if (job.timeRange.to !== undefined) {
          times.push(job.timeRange.to);
        }
      }
    });

    if (times.length) {
      var extent = _d.default.extent(times);

      var selectedTime = {
        from: (0, _moment.default)(extent[0]).toISOString(),
        to: (0, _moment.default)(extent[1]).toISOString()
      };
      return selectedTime;
    }
  }
}

function normalizeTimes(jobs, dateFormatTz, ganttBarWidth) {
  var jobsWithTimeRange = jobs.filter(function (job) {
    return job.timeRange.to !== undefined && job.timeRange.from !== undefined;
  });
  var min = Math.min.apply(Math, _toConsumableArray(jobsWithTimeRange.map(function (job) {
    return +job.timeRange.from;
  })));
  var max = Math.max.apply(Math, _toConsumableArray(jobsWithTimeRange.map(function (job) {
    return +job.timeRange.to;
  })));

  var ganttScale = _d.default.scale.linear().domain([min, max]).range([1, ganttBarWidth]);

  jobs.forEach(function (job) {
    if (job.timeRange.to !== undefined && job.timeRange.from !== undefined) {
      job.timeRange.fromPx = ganttScale(job.timeRange.from);
      job.timeRange.toPx = ganttScale(job.timeRange.to);
      job.timeRange.widthPx = job.timeRange.toPx - job.timeRange.fromPx; // Ensure at least 1 px in width so it's always visible

      if (job.timeRange.widthPx < 1) {
        job.timeRange.widthPx = 1;
      }

      job.timeRange.toMoment = (0, _moment.default)(job.timeRange.to).tz(dateFormatTz);
      job.timeRange.fromMoment = (0, _moment.default)(job.timeRange.from).tz(dateFormatTz);
      var fromString = job.timeRange.fromMoment.format('MMM Do YYYY, HH:mm');

      var _toString = job.timeRange.toMoment.format('MMM Do YYYY, HH:mm');

      job.timeRange.label = _i18n.i18n.translate('xpack.ml.jobSelector.jobTimeRangeLabel', {
        defaultMessage: '{fromString} to {toString}',
        values: {
          fromString: fromString,
          toString: _toString
        }
      });
    } else {
      job.timeRange.widthPx = 0;
      job.timeRange.fromPx = 0;
      job.timeRange.toPx = 0;
      job.timeRange.label = _i18n.i18n.translate('xpack.ml.jobSelector.noResultsForJobLabel', {
        defaultMessage: 'No results'
      });
    }
  });
  return jobs;
}