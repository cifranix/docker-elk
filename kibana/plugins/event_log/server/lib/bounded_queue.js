"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBoundedQueue = createBoundedQueue;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const CLOSE_TO_FULL_PERCENT = 0.9;

function createBoundedQueue(params) {
  if (params.maxLength <= 0) throw new Error(`invalid bounded queue maxLength ${params.maxLength}`);
  return new BoundedQueue(params);
}

class BoundedQueue {
  constructor(params) {
    _defineProperty(this, "_maxLength", void 0);

    _defineProperty(this, "_buffer", void 0);

    _defineProperty(this, "_onDiscarded", void 0);

    _defineProperty(this, "_logger", void 0);

    this._maxLength = params.maxLength;
    this._buffer = [];
    this._onDiscarded = params.onDiscarded;
    this._logger = params.logger;
  }

  get maxLength() {
    return this._maxLength;
  }

  get length() {
    return this._buffer.length;
  }

  isEmpty() {
    return this._buffer.length === 0;
  }

  isFull() {
    return this._buffer.length >= this._maxLength;
  }

  isCloseToFull() {
    return this._buffer.length / this._maxLength >= CLOSE_TO_FULL_PERCENT;
  }

  push(object) {
    this.ensureRoom();

    this._buffer.push(object);
  }

  pull(count) {
    if (count <= 0) throw new Error(`invalid pull count ${count}`);
    return this._buffer.splice(0, count);
  }

  ensureRoom() {
    if (this.length < this._maxLength) return;
    const discarded = this.pull(this.length - this._maxLength + 1);

    for (const object of discarded) {
      try {
        this._onDiscarded(object);
      } catch (err) {
        this._logger.warn(`error discarding circular buffer entry: ${err.message}`);
      }
    }
  }

}