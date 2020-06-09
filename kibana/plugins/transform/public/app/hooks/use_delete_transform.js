"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeleteTransforms = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _shared_imports = require("../../shared_imports");

var _app_dependencies = require("../app_dependencies");

var _common = require("../common");

var _components = require("../components");

var _use_api = require("./use_api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useDeleteTransforms = function useDeleteTransforms() {
  var _useAppDependencies = (0, _app_dependencies.useAppDependencies)(),
      overlays = _useAppDependencies.overlays;

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
                _context.prev = 1;
                _context.next = 4;
                return api.deleteTransforms(transformsInfo);

              case 4:
                results = _context.sent;

                for (transformId in results) {
                  // hasOwnProperty check to ensure only properties on object itself, and not its prototypes
                  if (results.hasOwnProperty(transformId)) {
                    if (results[transformId].success === true) {
                      toastNotifications.addSuccess(_i18n.i18n.translate('xpack.transform.transformList.deleteTransformSuccessMessage', {
                        defaultMessage: 'Request to delete transform {transformId} acknowledged.',
                        values: {
                          transformId: transformId
                        }
                      }));
                    } else {
                      toastNotifications.addDanger(_i18n.i18n.translate('xpack.transform.transformList.deleteTransformErrorMessage', {
                        defaultMessage: 'An error occurred deleting the transform {transformId}',
                        values: {
                          transformId: transformId
                        }
                      }));
                    }
                  }
                }

                _common.refreshTransformList$.next(_common.REFRESH_TRANSFORM_LIST_STATE.REFRESH);

                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                toastNotifications.addDanger({
                  title: _i18n.i18n.translate('xpack.transform.transformList.deleteTransformGenericErrorMessage', {
                    defaultMessage: 'An error occurred calling the API endpoint to delete transforms.'
                  }),
                  text: (0, _public.toMountPoint)(_react.default.createElement(_components.ToastNotificationText, {
                    overlays: overlays,
                    text: (0, _shared_imports.getErrorMessage)(_context.t0)
                  }))
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

exports.useDeleteTransforms = useDeleteTransforms;