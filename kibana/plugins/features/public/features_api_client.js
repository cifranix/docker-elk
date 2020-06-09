"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeaturesAPIClient = void 0;

var _ = require(".");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FeaturesAPIClient =
/*#__PURE__*/
function () {
  function FeaturesAPIClient(http) {
    _classCallCheck(this, FeaturesAPIClient);

    this.http = http;
  }

  _createClass(FeaturesAPIClient, [{
    key: "getFeatures",
    value: function () {
      var _getFeatures = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var features;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.http.get('/api/features');

              case 2:
                features = _context.sent;
                return _context.abrupt("return", features.map(function (config) {
                  return new _.Feature(config);
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getFeatures() {
        return _getFeatures.apply(this, arguments);
      }

      return getFeatures;
    }()
  }]);

  return FeaturesAPIClient;
}();

exports.FeaturesAPIClient = FeaturesAPIClient;