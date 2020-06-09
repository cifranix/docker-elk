"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "eventLogServiceMock", {
  enumerable: true,
  get: function () {
    return _event_log_service.eventLogServiceMock;
  }
});
Object.defineProperty(exports, "eventLoggerMock", {
  enumerable: true,
  get: function () {
    return _event_logger.eventLoggerMock;
  }
});
exports.eventLogMock = void 0;

var _event_log_service = require("./event_log_service.mock");

var _event_logger = require("./event_logger.mock");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createSetupMock = () => {
  return _event_log_service.eventLogServiceMock.create();
};

const createStartMock = () => {
  return undefined;
};

const eventLogMock = {
  createSetup: createSetupMock,
  createStart: createStartMock
};
exports.eventLogMock = eventLogMock;