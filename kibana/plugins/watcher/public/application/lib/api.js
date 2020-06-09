"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ackWatchAction = exports.useLoadSettings = exports.useGetWatchVisualizationData = exports.loadIndexPatterns = exports.executeWatch = exports.createWatch = exports.fetchFields = exports.getMatchingIndices = exports.loadWatch = exports.activateWatch = exports.deactivateWatch = exports.deleteWatches = exports.useLoadWatchHistoryDetail = exports.useLoadWatchHistory = exports.useLoadWatchDetail = exports.useLoadWatches = exports.getSavedObjectsClient = exports.setSavedObjectsClient = exports.getHttpClient = exports.setHttpClient = void 0;

var _settings = require("../models/settings");

var _watch = require("../models/watch");

var _watch_history_item = require("../models/watch_history_item");

var _watch_status = require("../models/watch_status");

var _use_request = require("./use_request");

var _constants = require("../../../common/constants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var httpClient;

var setHttpClient = function setHttpClient(anHttpClient) {
  httpClient = anHttpClient;
};

exports.setHttpClient = setHttpClient;

var getHttpClient = function getHttpClient() {
  return httpClient;
};

exports.getHttpClient = getHttpClient;
var savedObjectsClient;

var setSavedObjectsClient = function setSavedObjectsClient(aSavedObjectsClient) {
  savedObjectsClient = aSavedObjectsClient;
};

exports.setSavedObjectsClient = setSavedObjectsClient;

var getSavedObjectsClient = function getSavedObjectsClient() {
  return savedObjectsClient;
};

exports.getSavedObjectsClient = getSavedObjectsClient;
var basePath = _constants.ROUTES.API_ROOT;

var useLoadWatches = function useLoadWatches(pollIntervalMs) {
  return (0, _use_request.useRequest)({
    path: "".concat(basePath, "/watches"),
    method: 'get',
    pollIntervalMs: pollIntervalMs,
    deserializer: function deserializer(_ref) {
      var _ref$watches = _ref.watches,
          watches = _ref$watches === void 0 ? [] : _ref$watches;
      return watches.map(function (watch) {
        return _watch.Watch.fromUpstreamJson(watch);
      });
    }
  });
};

exports.useLoadWatches = useLoadWatches;

var useLoadWatchDetail = function useLoadWatchDetail(id) {
  return (0, _use_request.useRequest)({
    path: "".concat(basePath, "/watch/").concat(id),
    method: 'get',
    deserializer: function deserializer(_ref2) {
      var _ref2$watch = _ref2.watch,
          watch = _ref2$watch === void 0 ? {} : _ref2$watch;
      return _watch.Watch.fromUpstreamJson(watch);
    }
  });
};

exports.useLoadWatchDetail = useLoadWatchDetail;

var useLoadWatchHistory = function useLoadWatchHistory(id, startTime) {
  return (0, _use_request.useRequest)({
    query: startTime ? {
      startTime: startTime
    } : undefined,
    path: "".concat(basePath, "/watch/").concat(id, "/history"),
    method: 'get',
    deserializer: function deserializer(_ref3) {
      var _ref3$watchHistoryIte = _ref3.watchHistoryItems,
          watchHistoryItems = _ref3$watchHistoryIte === void 0 ? [] : _ref3$watchHistoryIte;
      return watchHistoryItems.map(function (historyItem) {
        return _watch_history_item.WatchHistoryItem.fromUpstreamJson(historyItem);
      });
    }
  });
};

exports.useLoadWatchHistory = useLoadWatchHistory;

var useLoadWatchHistoryDetail = function useLoadWatchHistoryDetail(id) {
  return (0, _use_request.useRequest)({
    path: !id ? '' : "".concat(basePath, "/history/").concat(id),
    method: 'get',
    deserializer: function deserializer(_ref4) {
      var watchHistoryItem = _ref4.watchHistoryItem;
      return _watch_history_item.WatchHistoryItem.fromUpstreamJson(watchHistoryItem);
    }
  });
};

exports.useLoadWatchHistoryDetail = useLoadWatchHistoryDetail;

var deleteWatches =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(watchIds) {
    var body, _ref6, results;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = JSON.stringify({
              watchIds: watchIds
            });
            _context.next = 3;
            return getHttpClient().post("".concat(basePath, "/watches/delete"), {
              body: body
            });

          case 3:
            _ref6 = _context.sent;
            results = _ref6.results;
            return _context.abrupt("return", results);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function deleteWatches(_x) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteWatches = deleteWatches;

var deactivateWatch =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(id) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", (0, _use_request.sendRequest)({
              path: "".concat(basePath, "/watch/").concat(id, "/deactivate"),
              method: 'put'
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deactivateWatch(_x2) {
    return _ref7.apply(this, arguments);
  };
}();

exports.deactivateWatch = deactivateWatch;

var activateWatch =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(id) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", (0, _use_request.sendRequest)({
              path: "".concat(basePath, "/watch/").concat(id, "/activate"),
              method: 'put'
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function activateWatch(_x3) {
    return _ref8.apply(this, arguments);
  };
}();

exports.activateWatch = activateWatch;

var loadWatch =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(id) {
    var _ref10, watch;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getHttpClient().get("".concat(basePath, "/watch/").concat(id));

          case 2:
            _ref10 = _context4.sent;
            watch = _ref10.watch;
            return _context4.abrupt("return", _watch.Watch.fromUpstreamJson(watch));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function loadWatch(_x4) {
    return _ref9.apply(this, arguments);
  };
}();

exports.loadWatch = loadWatch;

var getMatchingIndices =
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(pattern) {
    var body, _ref12, indices;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!pattern.startsWith('*')) {
              pattern = "*".concat(pattern);
            }

            if (!pattern.endsWith('*')) {
              pattern = "".concat(pattern, "*");
            }

            body = JSON.stringify({
              pattern: pattern
            });
            _context5.next = 5;
            return getHttpClient().post("".concat(basePath, "/indices"), {
              body: body
            });

          case 5:
            _ref12 = _context5.sent;
            indices = _ref12.indices;
            return _context5.abrupt("return", indices);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getMatchingIndices(_x5) {
    return _ref11.apply(this, arguments);
  };
}();

exports.getMatchingIndices = getMatchingIndices;

var fetchFields =
/*#__PURE__*/
function () {
  var _ref13 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(indexes) {
    var _ref14, fields;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getHttpClient().post("".concat(basePath, "/fields"), {
              body: JSON.stringify({
                indexes: indexes
              })
            });

          case 2:
            _ref14 = _context6.sent;
            fields = _ref14.fields;
            return _context6.abrupt("return", fields);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function fetchFields(_x6) {
    return _ref13.apply(this, arguments);
  };
}();

exports.fetchFields = fetchFields;

var createWatch =
/*#__PURE__*/
function () {
  var _ref15 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(watch) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return getHttpClient().put("".concat(basePath, "/watch/").concat(watch.id), {
              body: JSON.stringify(watch.upstreamJson)
            });

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function createWatch(_x7) {
    return _ref15.apply(this, arguments);
  };
}();

exports.createWatch = createWatch;

var executeWatch =
/*#__PURE__*/
function () {
  var _ref16 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(executeWatchDetails, watch) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", (0, _use_request.sendRequest)({
              path: "".concat(basePath, "/watch/execute"),
              method: 'put',
              body: JSON.stringify({
                executeDetails: executeWatchDetails.upstreamJson,
                watch: watch.upstreamJson
              })
            }));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function executeWatch(_x8, _x9) {
    return _ref16.apply(this, arguments);
  };
}();

exports.executeWatch = executeWatch;

var loadIndexPatterns =
/*#__PURE__*/
function () {
  var _ref17 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    var _ref18, savedObjects;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getSavedObjectsClient().find({
              type: 'index-pattern',
              fields: ['title'],
              perPage: 10000
            });

          case 2:
            _ref18 = _context9.sent;
            savedObjects = _ref18.savedObjects;
            return _context9.abrupt("return", savedObjects);

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function loadIndexPatterns() {
    return _ref17.apply(this, arguments);
  };
}();

exports.loadIndexPatterns = loadIndexPatterns;

var useGetWatchVisualizationData = function useGetWatchVisualizationData(watchModel, visualizeOptions) {
  return (0, _use_request.useRequest)({
    path: "".concat(basePath, "/watch/visualize"),
    method: 'post',
    body: JSON.stringify({
      watch: watchModel.upstreamJson,
      options: visualizeOptions.upstreamJson
    }),
    deserializer: function deserializer(data) {
      return data === null || data === void 0 ? void 0 : data.visualizeData;
    }
  });
};

exports.useGetWatchVisualizationData = useGetWatchVisualizationData;

var useLoadSettings = function useLoadSettings() {
  return (0, _use_request.useRequest)({
    path: "".concat(basePath, "/settings"),
    method: 'get',
    deserializer: function deserializer(data) {
      return _settings.Settings.fromUpstreamJson(data);
    }
  });
};

exports.useLoadSettings = useLoadSettings;

var ackWatchAction =
/*#__PURE__*/
function () {
  var _ref19 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(watchId, actionId) {
    var _ref20, watchStatus;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return getHttpClient().put("".concat(basePath, "/watch/").concat(watchId, "/action/").concat(actionId, "/acknowledge"));

          case 2:
            _ref20 = _context10.sent;
            watchStatus = _ref20.watchStatus;
            return _context10.abrupt("return", _watch_status.WatchStatus.fromUpstreamJson(watchStatus));

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function ackWatchAction(_x10, _x11) {
    return _ref19.apply(this, arguments);
  };
}();

exports.ackWatchAction = ackWatchAction;