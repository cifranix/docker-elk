"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubFeaturePrivilegeGroup = void 0;

var _sub_feature_privilege = require("./sub_feature_privilege");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SubFeaturePrivilegeGroup =
/*#__PURE__*/
function () {
  function SubFeaturePrivilegeGroup(config) {
    var actionMapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SubFeaturePrivilegeGroup);

    this.config = config;
    this.actionMapping = actionMapping;
  }

  _createClass(SubFeaturePrivilegeGroup, [{
    key: "groupType",
    get: function get() {
      return this.config.groupType;
    }
  }, {
    key: "privileges",
    get: function get() {
      var _this = this;

      return this.config.privileges.map(function (p) {
        return new _sub_feature_privilege.SubFeaturePrivilege(p, _this.actionMapping[p.id] || []);
      });
    }
  }]);

  return SubFeaturePrivilegeGroup;
}();

exports.SubFeaturePrivilegeGroup = SubFeaturePrivilegeGroup;