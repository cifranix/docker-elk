"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startTracingSpan = exports.tracingSpanRT = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const tracingSpanRT = rt.type({
  duration: rt.number,
  id: rt.string,
  name: rt.string,
  start: rt.number
});
exports.tracingSpanRT = tracingSpanRT;

const startTracingSpan = name => {
  const initialState = {
    duration: Number.POSITIVE_INFINITY,
    id: _uuid.default.v4(),
    name,
    start: Date.now()
  };
  return (endTime = Date.now()) => ({ ...initialState,
    duration: endTime - initialState.start
  });
};

exports.startTracingSpan = startTracingSpan;