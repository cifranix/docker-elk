"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSchema = exports.DEFAULT_POLL_INTERVAL = exports.DEFAULT_MAX_WORKERS = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const DEFAULT_MAX_WORKERS = 10;
exports.DEFAULT_MAX_WORKERS = DEFAULT_MAX_WORKERS;
const DEFAULT_POLL_INTERVAL = 3000;
exports.DEFAULT_POLL_INTERVAL = DEFAULT_POLL_INTERVAL;

const configSchema = _configSchema.schema.object({
  enabled: _configSchema.schema.boolean({
    defaultValue: true
  }),

  /* The maximum number of times a task will be attempted before being abandoned as failed */
  max_attempts: _configSchema.schema.number({
    defaultValue: 3,
    min: 1
  }),

  /* How often, in milliseconds, the task manager will look for more work. */
  poll_interval: _configSchema.schema.number({
    defaultValue: DEFAULT_POLL_INTERVAL,
    min: 100
  }),

  /* How many requests can Task Manager buffer before it rejects new requests. */
  request_capacity: _configSchema.schema.number({
    // a nice round contrived number, feel free to change as we learn how it behaves
    defaultValue: 1000,
    min: 1
  }),

  /* The name of the index used to store task information. */
  index: _configSchema.schema.string({
    defaultValue: '.kibana_task_manager',
    validate: val => {
      if (val.toLowerCase() === '.tasks') {
        return `"${val}" is an invalid Kibana Task Manager index, as it is already in use by the ElasticSearch Tasks Manager`;
      }
    }
  }),

  /* The maximum number of tasks that this Kibana instance will run simultaneously. */
  max_workers: _configSchema.schema.number({
    defaultValue: DEFAULT_MAX_WORKERS,
    // disable the task manager rather than trying to specify it with 0 workers
    min: 1
  })
});

exports.configSchema = configSchema;