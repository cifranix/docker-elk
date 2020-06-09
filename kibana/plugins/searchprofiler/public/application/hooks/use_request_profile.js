"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRequestProfile = void 0;

var _i18n = require("@kbn/i18n");

var _app_context = require("../contexts/app_context");

var _utils = require("../utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var extractProfilerErrorMessage = function extractProfilerErrorMessage(e) {
  var _e$body, _e$body$attributes, _e$body$attributes$er, _e$body2;

  if ((_e$body = e.body) === null || _e$body === void 0 ? void 0 : (_e$body$attributes = _e$body.attributes) === null || _e$body$attributes === void 0 ? void 0 : (_e$body$attributes$er = _e$body$attributes.error) === null || _e$body$attributes$er === void 0 ? void 0 : _e$body$attributes$er.reason) {
    var _e$body$attributes$er2 = e.body.attributes.error,
        reason = _e$body$attributes$er2.reason,
        line = _e$body$attributes$er2.line,
        col = _e$body$attributes$er2.col;

    if (typeof line === 'number' && typeof col === 'number') {
      return "".concat(reason, " at line: ").concat(line - 1, " col: ").concat(col);
    }
  }

  if ((_e$body2 = e.body) === null || _e$body2 === void 0 ? void 0 : _e$body2.message) {
    return e.body.message;
  }

  return;
};

var useRequestProfile = function useRequestProfile() {
  var _useAppContext = (0, _app_context.useAppContext)(),
      http = _useAppContext.http,
      notifications = _useAppContext.notifications,
      getLicenseStatus = _useAppContext.getLicenseStatus;

  var licenseEnabled = getLicenseStatus().valid;
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref2) {
        var query, index, _checkForParseErrors, error, parsed, payload, resp, profilerErrorMessage;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = _ref2.query, index = _ref2.index;

                if (licenseEnabled) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", {
                  data: null
                });

              case 3:
                _checkForParseErrors = (0, _utils.checkForParseErrors)(query), error = _checkForParseErrors.error, parsed = _checkForParseErrors.parsed;

                if (!error) {
                  _context.next = 7;
                  break;
                }

                notifications.addError(error, {
                  title: _i18n.i18n.translate('xpack.searchProfiler.errorToastTitle', {
                    defaultMessage: 'JSON parse error'
                  })
                });
                return _context.abrupt("return", {
                  data: null
                });

              case 7:
                if (!(parsed.profile && parsed.profile.shards)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  data: parsed.profile.shards
                });

              case 9:
                payload = {
                  query: parsed
                };

                if (index == null || index === '') {
                  payload.index = '_all';
                } else {
                  payload.index = index;
                }

                _context.prev = 11;
                _context.next = 14;
                return http.post('../api/searchprofiler/profile', {
                  body: JSON.stringify(payload),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

              case 14:
                resp = _context.sent;

                if (resp.ok) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", {
                  data: null,
                  error: resp.err.msg
                });

              case 17:
                return _context.abrupt("return", {
                  data: resp.resp.profile.shards
                });

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](11);
                profilerErrorMessage = extractProfilerErrorMessage(_context.t0);

                if (profilerErrorMessage) {
                  notifications.addError(_context.t0, {
                    title: _context.t0.message,
                    toastMessage: profilerErrorMessage
                  });
                } else {
                  // Otherwise just report the original error
                  notifications.addError(_context.t0, {
                    title: _i18n.i18n.translate('xpack.searchProfiler.errorSomethingWentWrongTitle', {
                      defaultMessage: 'Something went wrong'
                    })
                  });
                }

                return _context.abrupt("return", {
                  data: null
                });

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[11, 20]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

exports.useRequestProfile = useRequestProfile;