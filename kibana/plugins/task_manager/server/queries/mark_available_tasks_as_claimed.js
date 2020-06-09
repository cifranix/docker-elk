"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskWithLessThanMaxAttempts = taskWithLessThanMaxAttempts;
exports.tasksClaimedByOwner = tasksClaimedByOwner;
exports.updateFields = exports.SortByRunAtAndRetryAt = exports.RunningOrClaimingTaskWithExpiredRetryAt = exports.InactiveTasks = exports.IdleTaskWithExpiredRunAt = exports.TaskWithSchedule = void 0;

var _query_clauses = require("./query_clauses");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const TaskWithSchedule = {
  exists: {
    field: 'task.schedule'
  }
};
exports.TaskWithSchedule = TaskWithSchedule;

function taskWithLessThanMaxAttempts(type, maxAttempts) {
  return {
    bool: {
      must: [{
        term: {
          'task.taskType': type
        }
      }, {
        range: {
          'task.attempts': {
            lt: maxAttempts
          }
        }
      }]
    }
  };
}

function tasksClaimedByOwner(taskManagerId) {
  return (0, _query_clauses.mustBeAllOf)({
    term: {
      'task.ownerId': taskManagerId
    }
  }, {
    term: {
      'task.status': 'claiming'
    }
  });
}

const IdleTaskWithExpiredRunAt = {
  bool: {
    must: [{
      term: {
        'task.status': 'idle'
      }
    }, {
      range: {
        'task.runAt': {
          lte: 'now'
        }
      }
    }]
  }
}; // TODO: Fix query clauses to support this

exports.IdleTaskWithExpiredRunAt = IdleTaskWithExpiredRunAt;
const InactiveTasks = {
  bool: {
    must_not: [{
      bool: {
        should: [{
          term: {
            'task.status': 'running'
          }
        }, {
          term: {
            'task.status': 'claiming'
          }
        }],
        must: {
          range: {
            'task.retryAt': {
              gt: 'now'
            }
          }
        }
      }
    }]
  }
};
exports.InactiveTasks = InactiveTasks;
const RunningOrClaimingTaskWithExpiredRetryAt = {
  bool: {
    must: [{
      bool: {
        should: [{
          term: {
            'task.status': 'running'
          }
        }, {
          term: {
            'task.status': 'claiming'
          }
        }]
      }
    }, {
      range: {
        'task.retryAt': {
          lte: 'now'
        }
      }
    }]
  }
};
exports.RunningOrClaimingTaskWithExpiredRetryAt = RunningOrClaimingTaskWithExpiredRetryAt;
const SortByRunAtAndRetryAt = {
  _script: {
    type: 'number',
    order: 'asc',
    script: {
      lang: 'painless',
      source: `
if (doc['task.retryAt'].size()!=0) {
  return doc['task.retryAt'].value.toInstant().toEpochMilli();
}
if (doc['task.runAt'].size()!=0) {
  return doc['task.runAt'].value.toInstant().toEpochMilli();
}
    `
    }
  }
};
exports.SortByRunAtAndRetryAt = SortByRunAtAndRetryAt;

const updateFields = fieldUpdates => ({
  source: Object.keys(fieldUpdates).map(field => `ctx._source.task.${field}=params.${field};`).join(' '),
  lang: 'painless',
  params: fieldUpdates
});

exports.updateFields = updateFields;