"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCluster = exports.getMockConfig = exports.getMockThrowingTaskFetch = exports.getMockTaskFetch = exports.getMockCallWithInternal = exports.getMockEs = exports.getMockTaskInstance = void 0;

var _rxjs = require("rxjs");

var _server = require("../../../task_manager/server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getMockTaskInstance = (overrides = {}) => ({
  state: {
    runs: 0,
    stats: {}
  },
  taskType: 'test',
  params: {},
  id: '',
  scheduledAt: new Date(),
  attempts: 1,
  status: _server.TaskStatus.Idle,
  runAt: new Date(),
  startedAt: null,
  retryAt: null,
  ownerId: null,
  ...overrides
});

exports.getMockTaskInstance = getMockTaskInstance;
const defaultMockSavedObjects = [{
  _id: 'visualization:coolviz-123',
  _source: {
    type: 'visualization',
    visualization: {
      visState: '{"type": "shell_beads"}'
    }
  }
}];
const defaultMockTaskDocs = [getMockTaskInstance()];

const getMockEs = (mockCallWithInternal = getMockCallWithInternal()) => ({
  createClient: () => ({
    callAsInternalUser: mockCallWithInternal
  })
});

exports.getMockEs = getMockEs;

const getMockCallWithInternal = (hits = defaultMockSavedObjects) => {
  return () => {
    return Promise.resolve({
      hits: {
        hits
      }
    });
  };
};

exports.getMockCallWithInternal = getMockCallWithInternal;

const getMockTaskFetch = (docs = defaultMockTaskDocs) => {
  return {
    fetch: jest.fn(fetchOpts => {
      return Promise.resolve({
        docs,
        searchAfter: []
      });
    })
  };
};

exports.getMockTaskFetch = getMockTaskFetch;

const getMockThrowingTaskFetch = throws => {
  return {
    fetch: jest.fn(fetchOpts => {
      throw throws;
    })
  };
};

exports.getMockThrowingTaskFetch = getMockThrowingTaskFetch;

const getMockConfig = () => {
  return (0, _rxjs.of)({
    kibana: {
      index: ''
    }
  });
};

exports.getMockConfig = getMockConfig;

const getCluster = () => ({
  callWithInternalUser: getMockCallWithInternal()
});

exports.getCluster = getCluster;