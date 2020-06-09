"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStartTransforms = void 0;

var _i18n = require("@kbn/i18n");

var _app_dependencies = require("../app_dependencies");

var _common = require("../common");

var _use_api = require("./use_api");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useStartTransforms = function useStartTransforms() {
  var toastNotifications = (0, _app_dependencies.useToastNotifications)();
  var api = (0, _use_api.useApi)();
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(transforms) {
        var transformsInfo, results, transformId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                transformsInfo = transforms.map(function (tf) {
                  return {
                    id: tf.config.id,
                    state: tf.stats.state
                  };
                });
                _context.next = 3;
                return api.startTransforms(transformsInfo);

              case 3:
                results = _context.sent;

                for (transformId in results) {
                  // hasOwnProperty check to ensure only properties on object itself, and not its prototypes
                  if (results.hasOwnProperty(transformId)) {
                    if (results[transformId].success === true) {
                      toastNotifications.addSuccess(_i18n.i18n.translate('xpack.transform.transformList.startTransformSuccessMessage', {
                        defaultMessage: 'Request to start transform {transformId} acknowledged.',
                        values: {
                          transformId: transformId
                        }
                      }));
                    } else {
                      toastNotifications.addDanger(_i18n.i18n.translate('xpack.transform.transformList.startTransformErrorMessage', {
                        defaultMessage: 'An error occurred starting the transform {transformId}',
                        values: {
                          transformId: transformId
                        }
                      }));
                    }
                  }
                }

                _common.refreshTransformList$.next(_common.REFRESH_TRANSFORM_LIST_STATE.REFRESH);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

exports.useStartTransforms = useStartTransforms;