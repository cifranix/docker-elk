"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpacesManager = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SpacesManager =
/*#__PURE__*/
function () {
  function SpacesManager(http) {
    _classCallCheck(this, SpacesManager);

    this.http = http;

    _defineProperty(this, "activeSpace$", new _rxjs.BehaviorSubject(null));

    _defineProperty(this, "serverBasePath", void 0);

    _defineProperty(this, "onActiveSpaceChange$", void 0);

    this.serverBasePath = http.basePath.serverBasePath;
    this.onActiveSpaceChange$ = this.activeSpace$.asObservable().pipe((0, _operators.skipWhile)(function (v) {
      return v == null;
    }));
    this.refreshActiveSpace();
  }

  _createClass(SpacesManager, [{
    key: "getSpaces",
    value: function () {
      var _getSpaces = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(purpose) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.http.get('/api/spaces/space', {
                  query: {
                    purpose: purpose
                  }
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getSpaces(_x) {
        return _getSpaces.apply(this, arguments);
      }

      return getSpaces;
    }()
  }, {
    key: "getSpace",
    value: function () {
      var _getSpace = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.http.get("/api/spaces/space/".concat(encodeURIComponent(id)));

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSpace(_x2) {
        return _getSpace.apply(this, arguments);
      }

      return getSpace;
    }()
  }, {
    key: "getActiveSpace",
    value: function getActiveSpace() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$forceRefresh = _ref.forceRefresh,
          forceRefresh = _ref$forceRefresh === void 0 ? false : _ref$forceRefresh;

      if (this.isAnonymousPath()) {
        throw new Error("Cannot retrieve the active space for anonymous paths");
      }

      if (!forceRefresh && this.activeSpace$.value) {
        return Promise.resolve(this.activeSpace$.value);
      }

      return this.http.get('/internal/spaces/_active_space');
    }
  }, {
    key: "createSpace",
    value: function () {
      var _createSpace = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(space) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.http.post("/api/spaces/space", {
                  body: JSON.stringify(space)
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createSpace(_x3) {
        return _createSpace.apply(this, arguments);
      }

      return createSpace;
    }()
  }, {
    key: "updateSpace",
    value: function () {
      var _updateSpace = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(space) {
        var activeSpaceId;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.http.put("/api/spaces/space/".concat(encodeURIComponent(space.id)), {
                  query: {
                    overwrite: true
                  },
                  body: JSON.stringify(space)
                });

              case 2:
                _context4.next = 4;
                return this.getActiveSpace();

              case 4:
                activeSpaceId = _context4.sent.id;

                if (space.id === activeSpaceId) {
                  this.refreshActiveSpace();
                }

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateSpace(_x4) {
        return _updateSpace.apply(this, arguments);
      }

      return updateSpace;
    }()
  }, {
    key: "deleteSpace",
    value: function () {
      var _deleteSpace = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(space) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.http.delete("/api/spaces/space/".concat(encodeURIComponent(space.id)));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteSpace(_x5) {
        return _deleteSpace.apply(this, arguments);
      }

      return deleteSpace;
    }()
  }, {
    key: "copySavedObjects",
    value: function () {
      var _copySavedObjects = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(objects, spaces, includeReferences, overwrite) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.http.post('/api/spaces/_copy_saved_objects', {
                  body: JSON.stringify({
                    objects: objects,
                    spaces: spaces,
                    includeReferences: includeReferences,
                    overwrite: overwrite
                  })
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function copySavedObjects(_x6, _x7, _x8, _x9) {
        return _copySavedObjects.apply(this, arguments);
      }

      return copySavedObjects;
    }()
  }, {
    key: "resolveCopySavedObjectsErrors",
    value: function () {
      var _resolveCopySavedObjectsErrors = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(objects, retries, includeReferences) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this.http.post("/api/spaces/_resolve_copy_saved_objects_errors", {
                  body: JSON.stringify({
                    objects: objects,
                    includeReferences: includeReferences,
                    retries: retries
                  })
                }));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function resolveCopySavedObjectsErrors(_x10, _x11, _x12) {
        return _resolveCopySavedObjectsErrors.apply(this, arguments);
      }

      return resolveCopySavedObjectsErrors;
    }()
  }, {
    key: "redirectToSpaceSelector",
    value: function redirectToSpaceSelector() {
      window.location.href = "".concat(this.serverBasePath, "/spaces/space_selector");
    }
  }, {
    key: "refreshActiveSpace",
    value: function () {
      var _refreshActiveSpace = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var activeSpace;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this.isAnonymousPath()) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return");

              case 2:
                _context8.next = 4;
                return this.getActiveSpace({
                  forceRefresh: true
                });

              case 4:
                activeSpace = _context8.sent;
                this.activeSpace$.next(activeSpace);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function refreshActiveSpace() {
        return _refreshActiveSpace.apply(this, arguments);
      }

      return refreshActiveSpace;
    }()
  }, {
    key: "isAnonymousPath",
    value: function isAnonymousPath() {
      return this.http.anonymousPaths.isAnonymous(window.location.pathname);
    }
  }]);

  return SpacesManager;
}();

exports.SpacesManager = SpacesManager;