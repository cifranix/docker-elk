"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransformUiPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _register_feature = require("./register_feature");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TransformUiPlugin =
/*#__PURE__*/
function () {
  function TransformUiPlugin() {
    _classCallCheck(this, TransformUiPlugin);
  }

  _createClass(TransformUiPlugin, [{
    key: "setup",
    value: function setup(coreSetup, pluginsSetup) {
      var management = pluginsSetup.management,
          home = pluginsSetup.home; // Register management section

      var esSection = management.sections.getSection('elasticsearch');

      if (esSection !== undefined) {
        esSection.registerApp({
          id: 'transform',
          title: _i18n.i18n.translate('xpack.transform.appTitle', {
            defaultMessage: 'Transforms'
          }),
          order: 3,
          mount: function () {
            var _mount = _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee(params) {
              var _ref, mountManagementSection;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return import('./app/mount_management_section');

                    case 2:
                      _ref = _context.sent;
                      mountManagementSection = _ref.mountManagementSection;
                      return _context.abrupt("return", mountManagementSection(coreSetup, params));

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            function mount(_x) {
              return _mount.apply(this, arguments);
            }

            return mount;
          }()
        });
      }

      (0, _register_feature.registerFeature)(home);
    }
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return TransformUiPlugin;
}();

exports.TransformUiPlugin = TransformUiPlugin;