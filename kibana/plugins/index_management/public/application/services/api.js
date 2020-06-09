"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadIndices = loadIndices;
exports.reloadIndices = reloadIndices;
exports.closeIndices = closeIndices;
exports.deleteIndices = deleteIndices;
exports.openIndices = openIndices;
exports.refreshIndices = refreshIndices;
exports.flushIndices = flushIndices;
exports.forcemergeIndices = forcemergeIndices;
exports.clearCacheIndices = clearCacheIndices;
exports.freezeIndices = freezeIndices;
exports.unfreezeIndices = unfreezeIndices;
exports.loadIndexSettings = loadIndexSettings;
exports.updateIndexSettings = updateIndexSettings;
exports.loadIndexStats = loadIndexStats;
exports.loadIndexMapping = loadIndexMapping;
exports.loadIndexData = loadIndexData;
exports.useLoadIndexTemplates = useLoadIndexTemplates;
exports.deleteTemplates = deleteTemplates;
exports.useLoadIndexTemplate = useLoadIndexTemplate;
exports.saveTemplate = saveTemplate;
exports.updateTemplate = updateTemplate;
exports.setUiMetricService = void 0;

var _constants = require("../../../common/constants");

var _constants2 = require("../constants");

var _use_request = require("./use_request");

var _http = require("./http");

var _mappings_editor = require("../components/mappings_editor");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Temporary hack to provide the uiMetricService instance to this file.
// TODO: Refactor and export an ApiService instance through the app dependencies context
var uiMetricService;

var setUiMetricService = function setUiMetricService(_uiMetricService) {
  uiMetricService = _uiMetricService;
}; // End hack


exports.setUiMetricService = setUiMetricService;

function loadIndices() {
  return _loadIndices.apply(this, arguments);
}

function _loadIndices() {
  _loadIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _http.httpService.httpClient.get("".concat(_constants.API_BASE_PATH, "/indices"));

          case 2:
            response = _context.sent;
            return _context.abrupt("return", response.data ? response.data : response);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadIndices.apply(this, arguments);
}

function reloadIndices(_x) {
  return _reloadIndices.apply(this, arguments);
}

function _reloadIndices() {
  _reloadIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(indexNames) {
    var body, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = JSON.stringify({
              indexNames: indexNames
            });
            _context2.next = 3;
            return _http.httpService.httpClient.post("".concat(_constants.API_BASE_PATH, "/indices/reload"), {
              body: body
            });

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response.data ? response.data : response);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _reloadIndices.apply(this, arguments);
}

function closeIndices(_x2) {
  return _closeIndices.apply(this, arguments);
}

function _closeIndices() {
  _closeIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(indices) {
    var body, response, eventName;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = JSON.stringify({
              indices: indices
            });
            _context3.next = 3;
            return _http.httpService.httpClient.post("".concat(_constants.API_BASE_PATH, "/indices/close"), {
              body: body
            });

          case 3:
            response = _context3.sent;
            // Only track successful requests.
            eventName = indices.length > 1 ? _constants.UIM_INDEX_CLOSE_MANY : _constants.UIM_INDEX_CLOSE;
            uiMetricService.trackMetric('count', eventName);
            return _context3.abrupt("return", response);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _closeIndices.apply(this, arguments);
}

function deleteIndices(_x3) {
  return _deleteIndices.apply(this, arguments);
}

function _deleteIndices() {
  _deleteIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(indices) {
    var body, response, eventName;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            body = JSON.stringify({
              indices: indices
            });
            _context4.next = 3;
            return _http.httpService.httpClient.post("".concat(_constants.API_BASE_PATH, "/indices/delete"), {
              body: body
            });

          case 3:
            response = _context4.sent;
            // Only track successful requests.
            eventName = indices.length > 1 ? _constants.UIM_INDEX_DELETE_MANY : _constants.UIM_INDEX_DELETE;
            uiMetricService.trackMetric('count', eventName);
            return _context4.abrupt("return", response);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _deleteIndices.apply(this, arguments);
}

function openIndices(_x4) {
  return _openIndices.apply(this, arguments);
}

function _openIndices() {
  _openIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(indices) {
    var body, response, eventName;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            body = JSON.stringify({
              indices: indices
            });
            _context5.next = 3;
            return _http.httpService.httpClient.post("".concat(_constants.API_BASE_PATH, "/indices/open"), {
              body: body
            });

          case 3:
            response = _context5.sent;
            // Only track successful requests.
            eventName = indices.length > 1 ? _constants.UIM_INDEX_OPEN_MANY : _constants.UIM_INDEX_OPEN;
            uiMetricService.trackMetric('count', eventName);
            return _context5.abrupt("return", response);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _openIndices.apply(this, arguments);
}

function refreshIndices(_x5) {
  return _refreshIndices.apply(this, arguments);
}

function _refreshIndices() {
  _refreshIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(indices) {
    var body, response, eventName;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            body = JSON.stringify({
              indices: indices
            });
            _context6.next = 3;
            return _http.httpService.httpClient.post("".concat(_constants.API_BASE_PATH, "/indices/refresh"), {
              body: body
            });

          case 3:
            response = _context6.sent;
            // Only track successful requests.
            eventName = indices.length > 1 ? _constants.UIM_INDEX_REFRESH_MANY : _constants.UIM_INDEX_REFRESH;
            uiMetricService.trackMetric('count', eventName);
            return _context6.abrupt("return", response);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _refreshIndices.apply(this, arguments);
}

function flushIndices(_x6) {
  return _flushIndices.apply(this, arguments);
}

function _flushIndices() {
  _flushIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(indices) {
    var body, response, eventName;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            body = JSON.stringify({
              indices: indices
            });
            _context7.next = 3;
            return _http.httpService.httpClient.post("".concat(_constants.API_BASE_PATH, "/indices/flush"), {
              body: body
            });

          case 3:
            response = _context7.sent;
            // Only track successful requests.
            eventName = indices.length > 1 ? _constants.UIM_INDEX_FLUSH_MANY : _constants.UIM_INDEX_FLUSH;
            uiMetricService.trackMetric('count', eventName);
            return _context7.abrupt("return", response);

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _flushIndices.apply(this, arguments);
}

function forcemergeIndices(_x7, _x8) {
  return _forcemergeIndices.apply(this, arguments);
}

function _forcemergeIndices() {
  _forcemergeIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(indices, maxNumSegments) {
    var body, response, eventName;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            body = JSON.stringify({
              indices: indices,
              maxNumSegments: maxNumSegments
            });
            _context8.next = 3;
            return _http.httpService.httpClient.post("".concat(_constants.API_BASE_PATH, "/indices/forcemerge"), {
              body: body
            });

          case 3:
            response = _context8.sent;
            // Only track successful requests.
            eventName = indices.length > 1 ? _constants.UIM_INDEX_FORCE_MERGE_MANY : _constants.UIM_INDEX_FORCE_MERGE;
            uiMetricService.trackMetric('count', eventName);
            return _context8.abrupt("return", response);

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _forcemergeIndices.apply(this, arguments);
}

function clearCacheIndices(_x9) {
  return _clearCacheIndices.apply(this, arguments);
}

function _clearCacheIndices() {
  _clearCacheIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(indices) {
    var body, response, eventName;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            body = JSON.stringify({
              indices: indices
            });
            _context9.next = 3;
            return _http.httpService.httpClient.post("".concat(_constants.API_BASE_PATH, "/indices/clear_cache"), {
              body: body
            });

          case 3:
            response = _context9.sent;
            // Only track successful requests.
            eventName = indices.length > 1 ? _constants.UIM_INDEX_CLEAR_CACHE_MANY : _constants.UIM_INDEX_CLEAR_CACHE;
            uiMetricService.trackMetric('count', eventName);
            return _context9.abrupt("return", response);

          case 7:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _clearCacheIndices.apply(this, arguments);
}

function freezeIndices(_x10) {
  return _freezeIndices.apply(this, arguments);
}

function _freezeIndices() {
  _freezeIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(indices) {
    var body, response, eventName;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            body = JSON.stringify({
              indices: indices
            });
            _context10.next = 3;
            return _http.httpService.httpClient.post("".concat(_constants.API_BASE_PATH, "/indices/freeze"), {
              body: body
            });

          case 3:
            response = _context10.sent;
            // Only track successful requests.
            eventName = indices.length > 1 ? _constants.UIM_INDEX_FREEZE_MANY : _constants.UIM_INDEX_FREEZE;
            uiMetricService.trackMetric('count', eventName);
            return _context10.abrupt("return", response);

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _freezeIndices.apply(this, arguments);
}

function unfreezeIndices(_x11) {
  return _unfreezeIndices.apply(this, arguments);
}

function _unfreezeIndices() {
  _unfreezeIndices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(indices) {
    var body, response, eventName;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            body = JSON.stringify({
              indices: indices
            });
            _context11.next = 3;
            return _http.httpService.httpClient.post("".concat(_constants.API_BASE_PATH, "/indices/unfreeze"), {
              body: body
            });

          case 3:
            response = _context11.sent;
            // Only track successful requests.
            eventName = indices.length > 1 ? _constants.UIM_INDEX_UNFREEZE_MANY : _constants.UIM_INDEX_UNFREEZE;
            uiMetricService.trackMetric('count', eventName);
            return _context11.abrupt("return", response);

          case 7:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _unfreezeIndices.apply(this, arguments);
}

function loadIndexSettings(_x12) {
  return _loadIndexSettings.apply(this, arguments);
}

function _loadIndexSettings() {
  _loadIndexSettings = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(indexName) {
    var response;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _http.httpService.httpClient.get("".concat(_constants.API_BASE_PATH, "/settings/").concat(encodeURIComponent(indexName)));

          case 2:
            response = _context12.sent;
            return _context12.abrupt("return", response);

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _loadIndexSettings.apply(this, arguments);
}

function updateIndexSettings(_x13, _x14) {
  return _updateIndexSettings.apply(this, arguments);
}

function _updateIndexSettings() {
  _updateIndexSettings = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(indexName, body) {
    var response;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _http.httpService.httpClient.put("".concat(_constants.API_BASE_PATH, "/settings/").concat(encodeURIComponent(indexName)), {
              body: JSON.stringify(body)
            });

          case 2:
            response = _context13.sent;
            // Only track successful requests.
            uiMetricService.trackMetric('count', _constants.UIM_UPDATE_SETTINGS);
            return _context13.abrupt("return", response);

          case 5:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _updateIndexSettings.apply(this, arguments);
}

function loadIndexStats(_x15) {
  return _loadIndexStats.apply(this, arguments);
}

function _loadIndexStats() {
  _loadIndexStats = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14(indexName) {
    var response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _http.httpService.httpClient.get("".concat(_constants.API_BASE_PATH, "/stats/").concat(encodeURIComponent(indexName)));

          case 2:
            response = _context14.sent;
            return _context14.abrupt("return", response);

          case 4:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _loadIndexStats.apply(this, arguments);
}

function loadIndexMapping(_x16) {
  return _loadIndexMapping.apply(this, arguments);
}

function _loadIndexMapping() {
  _loadIndexMapping = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee15(indexName) {
    var response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _http.httpService.httpClient.get("".concat(_constants.API_BASE_PATH, "/mapping/").concat(encodeURIComponent(indexName)));

          case 2:
            response = _context15.sent;
            return _context15.abrupt("return", response);

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _loadIndexMapping.apply(this, arguments);
}

function loadIndexData(_x17, _x18) {
  return _loadIndexData.apply(this, arguments);
}

function _loadIndexData() {
  _loadIndexData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee16(type, indexName) {
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.t0 = type;
            _context16.next = _context16.t0 === _constants2.TAB_MAPPING ? 3 : _context16.t0 === _constants2.TAB_SETTINGS ? 4 : _context16.t0 === _constants2.TAB_STATS ? 5 : 6;
            break;

          case 3:
            return _context16.abrupt("return", loadIndexMapping(indexName));

          case 4:
            return _context16.abrupt("return", loadIndexSettings(indexName));

          case 5:
            return _context16.abrupt("return", loadIndexStats(indexName));

          case 6:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _loadIndexData.apply(this, arguments);
}

function useLoadIndexTemplates() {
  return (0, _use_request.useRequest)({
    path: "".concat(_constants.API_BASE_PATH, "/templates"),
    method: 'get'
  });
}

function deleteTemplates(_x19) {
  return _deleteTemplates.apply(this, arguments);
}

function _deleteTemplates() {
  _deleteTemplates = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee17(names) {
    var result, uimActionType;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            result = (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "/templates/").concat(names.map(function (name) {
                return encodeURIComponent(name);
              }).join(',')),
              method: 'delete'
            });
            uimActionType = names.length > 1 ? _constants.UIM_TEMPLATE_DELETE_MANY : _constants.UIM_TEMPLATE_DELETE;
            uiMetricService.trackMetric('count', uimActionType);
            return _context17.abrupt("return", result);

          case 4:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return _deleteTemplates.apply(this, arguments);
}

function useLoadIndexTemplate(name) {
  return (0, _use_request.useRequest)({
    path: "".concat(_constants.API_BASE_PATH, "/templates/").concat(encodeURIComponent(name)),
    method: 'get'
  });
}

function saveTemplate(_x20, _x21) {
  return _saveTemplate.apply(this, arguments);
}

function _saveTemplate() {
  _saveTemplate = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee18(template, isClone) {
    var includeTypeName, result, uimActionType;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            includeTypeName = (0, _mappings_editor.doMappingsHaveType)(template.mappings);
            _context18.next = 3;
            return (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "/templates"),
              method: 'put',
              body: JSON.stringify(template),
              query: {
                include_type_name: includeTypeName
              }
            });

          case 3:
            result = _context18.sent;
            uimActionType = isClone ? _constants.UIM_TEMPLATE_CLONE : _constants.UIM_TEMPLATE_CREATE;
            uiMetricService.trackMetric('count', uimActionType);
            return _context18.abrupt("return", result);

          case 7:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _saveTemplate.apply(this, arguments);
}

function updateTemplate(_x22) {
  return _updateTemplate.apply(this, arguments);
}

function _updateTemplate() {
  _updateTemplate = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee19(template) {
    var includeTypeName, name, result;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            includeTypeName = (0, _mappings_editor.doMappingsHaveType)(template.mappings);
            name = template.name;
            _context19.next = 4;
            return (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "/templates/").concat(encodeURIComponent(name)),
              method: 'put',
              body: JSON.stringify(template),
              query: {
                include_type_name: includeTypeName
              }
            });

          case 4:
            result = _context19.sent;
            uiMetricService.trackMetric('count', _constants.UIM_TEMPLATE_UPDATE);
            return _context19.abrupt("return", result);

          case 7:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));
  return _updateTemplate.apply(this, arguments);
}