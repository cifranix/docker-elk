"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "initialLoadingState", {
  enumerable: true,
  get: function get() {
    return _loading_state.initialLoadingState;
  }
});
Object.defineProperty(exports, "LoadingState", {
  enumerable: true,
  get: function get() {
    return _loading_state.LoadingState;
  }
});
Object.defineProperty(exports, "isManualLoadingPolicy", {
  enumerable: true,
  get: function get() {
    return _loading_policy.isManualLoadingPolicy;
  }
});
Object.defineProperty(exports, "isIntervalLoadingPolicy", {
  enumerable: true,
  get: function get() {
    return _loading_policy.isIntervalLoadingPolicy;
  }
});
Object.defineProperty(exports, "LoadingPolicy", {
  enumerable: true,
  get: function get() {
    return _loading_policy.LoadingPolicy;
  }
});
Object.defineProperty(exports, "createRunningProgressReducer", {
  enumerable: true,
  get: function get() {
    return _loading_progress.createRunningProgressReducer;
  }
});
Object.defineProperty(exports, "createIdleProgressReducer", {
  enumerable: true,
  get: function get() {
    return _loading_progress.createIdleProgressReducer;
  }
});
Object.defineProperty(exports, "isIdleLoadingProgress", {
  enumerable: true,
  get: function get() {
    return _loading_progress.isIdleLoadingProgress;
  }
});
Object.defineProperty(exports, "isRunningLoadingProgress", {
  enumerable: true,
  get: function get() {
    return _loading_progress.isRunningLoadingProgress;
  }
});
Object.defineProperty(exports, "LoadingProgress", {
  enumerable: true,
  get: function get() {
    return _loading_progress.LoadingProgress;
  }
});
Object.defineProperty(exports, "createFailureResult", {
  enumerable: true,
  get: function get() {
    return _loading_result.createFailureResult;
  }
});
Object.defineProperty(exports, "createFailureResultReducer", {
  enumerable: true,
  get: function get() {
    return _loading_result.createFailureResultReducer;
  }
});
Object.defineProperty(exports, "createSuccessResult", {
  enumerable: true,
  get: function get() {
    return _loading_result.createSuccessResult;
  }
});
Object.defineProperty(exports, "createSuccessResultReducer", {
  enumerable: true,
  get: function get() {
    return _loading_result.createSuccessResultReducer;
  }
});
Object.defineProperty(exports, "getTimeOrDefault", {
  enumerable: true,
  get: function get() {
    return _loading_result.getTimeOrDefault;
  }
});
Object.defineProperty(exports, "isExhaustedLoadingResult", {
  enumerable: true,
  get: function get() {
    return _loading_result.isExhaustedLoadingResult;
  }
});
Object.defineProperty(exports, "isFailureLoadingResult", {
  enumerable: true,
  get: function get() {
    return _loading_result.isFailureLoadingResult;
  }
});
Object.defineProperty(exports, "isSuccessLoadingResult", {
  enumerable: true,
  get: function get() {
    return _loading_result.isSuccessLoadingResult;
  }
});
Object.defineProperty(exports, "isUninitializedLoadingResult", {
  enumerable: true,
  get: function get() {
    return _loading_result.isUninitializedLoadingResult;
  }
});
Object.defineProperty(exports, "LoadingResult", {
  enumerable: true,
  get: function get() {
    return _loading_result.LoadingResult;
  }
});

var _loading_state = require("./loading_state");

var _loading_policy = require("./loading_policy");

var _loading_progress = require("./loading_progress");

var _loading_result = require("./loading_result");