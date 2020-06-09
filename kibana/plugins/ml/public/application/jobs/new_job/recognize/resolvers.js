"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkViewOrCreateJobs = checkViewOrCreateJobs;
exports.checkForSavedObjects = void 0;

var _i18n = require("@kbn/i18n");

var _dependency_cache = require("../../../util/dependency_cache");

var _job_service = require("../../../services/job_service");

var _ml_api_service = require("../../../services/ml_api_service");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Checks whether the jobs in a data recognizer module have been created.
 * Redirects to the Anomaly Explorer to view the jobs if they have been created,
 * or the recognizer job wizard for the module if not.
 */
function checkViewOrCreateJobs(moduleId, indexPatternId) {
  return new Promise(function (resolve, reject) {
    // Load the module, and check if the job(s) in the module have been created.
    // If so, load the jobs in the Anomaly Explorer.
    // Otherwise open the data recognizer wizard for the module.
    // Always want to call reject() so as not to load original page.
    _ml_api_service.ml.dataRecognizerModuleJobsExist({
      moduleId: moduleId
    }).then(function (resp) {
      if (resp.jobsExist === true) {
        var resultsPageUrl = _job_service.mlJobService.createResultsUrlForJobs(resp.jobs, 'explorer');

        window.location.href = resultsPageUrl;
        reject();
      } else {
        window.location.href = "#/jobs/new_job/recognize?id=".concat(moduleId, "&index=").concat(indexPatternId);
        reject();
      }
    }).catch(function (err) {
      // eslint-disable-next-line no-console
      console.error("Error checking whether jobs in module ".concat(moduleId, " exists"), err);
      var toastNotifications = (0, _dependency_cache.getToastNotifications)();
      toastNotifications.addWarning({
        title: _i18n.i18n.translate('xpack.ml.newJob.recognize.moduleCheckJobsExistWarningTitle', {
          defaultMessage: 'Error checking module {moduleId}',
          values: {
            moduleId: moduleId
          }
        }),
        text: _i18n.i18n.translate('xpack.ml.newJob.recognize.moduleCheckJobsExistWarningDescription', {
          defaultMessage: 'An error occurred trying to check whether the jobs in the module have been created.'
        })
      });
      window.location.href = '#/jobs';
      reject();
    });
  });
}
/**
 * Gets kibana objects with an existence check.
 */


var checkForSavedObjects =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(objects) {
    var savedObjectsClient;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            savedObjectsClient = (0, _dependency_cache.getSavedObjectsClient)();
            _context2.prev = 1;
            _context2.next = 4;
            return Object.keys(objects).reduce(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(prevPromise, type) {
                var acc, _ref3, savedObjects;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return prevPromise;

                      case 2:
                        acc = _context.sent;
                        _context.next = 5;
                        return savedObjectsClient.find({
                          type: type,
                          perPage: 1000
                        });

                      case 5:
                        _ref3 = _context.sent;
                        savedObjects = _ref3.savedObjects;
                        acc[type] = objects[type].map(function (obj) {
                          var find = savedObjects.find(function (savedObject) {
                            return savedObject.attributes.title === obj.title;
                          });
                          return _objectSpread({}, obj, {
                            exists: !!find,
                            id: !!find && find.id || obj.id
                          });
                        });
                        return _context.abrupt("return", Promise.resolve(acc));

                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2, _x3) {
                return _ref2.apply(this, arguments);
              };
            }(), Promise.resolve({}));

          case 4:
            return _context2.abrupt("return", _context2.sent);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            // eslint-disable-next-line no-console
            console.error('Could not load saved objects', _context2.t0);

          case 10:
            return _context2.abrupt("return", Promise.resolve(objects));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));

  return function checkForSavedObjects(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkForSavedObjects = checkForSavedObjects;