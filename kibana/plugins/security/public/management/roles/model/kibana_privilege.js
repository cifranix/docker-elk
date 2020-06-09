"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaPrivilege = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KibanaPrivilege =
/*#__PURE__*/
function () {
  function KibanaPrivilege(id) {
    var actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, KibanaPrivilege);

    this.id = id;
    this.actions = actions;
  }

  _createClass(KibanaPrivilege, [{
    key: "grantsPrivilege",
    value: function grantsPrivilege(candidatePrivilege) {
      return this.checkActions(this.actions, candidatePrivilege.actions).hasAllRequested;
    }
  }, {
    key: "checkActions",
    value: function checkActions(knownActions, candidateActions) {
      var missing = candidateActions.filter(function (action) {
        return !knownActions.includes(action);
      });
      var hasAllRequested = knownActions.length > 0 && candidateActions.length > 0 && missing.length === 0;
      return {
        missing: missing,
        hasAllRequested: hasAllRequested
      };
    }
  }, {
    key: "name",
    get: function get() {
      return _lodash.default.capitalize(this.id);
    }
  }]);

  return KibanaPrivilege;
}();

exports.KibanaPrivilege = KibanaPrivilege;