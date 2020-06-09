"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaPrivileges = void 0;

var _kibana_privilege = require("./kibana_privilege");

var _privilege_collection = require("./privilege_collection");

var _secured_feature = require("./secured_feature");

var _privilege_utils = require("../edit_role/privilege_utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function toBasePrivilege(entry) {
  var _entry = _slicedToArray(entry, 2),
      privilegeId = _entry[0],
      actions = _entry[1];

  return [privilegeId, new _kibana_privilege.KibanaPrivilege(privilegeId, actions)];
}

function recordsToBasePrivilegeMap(record) {
  return new Map(Object.entries(record).map(function (entry) {
    return toBasePrivilege(entry);
  }));
}

var KibanaPrivileges =
/*#__PURE__*/
function () {
  function KibanaPrivileges(rawKibanaPrivileges, features) {
    _classCallCheck(this, KibanaPrivileges);

    _defineProperty(this, "global", void 0);

    _defineProperty(this, "spaces", void 0);

    _defineProperty(this, "feature", void 0);

    this.global = recordsToBasePrivilegeMap(rawKibanaPrivileges.global);
    this.spaces = recordsToBasePrivilegeMap(rawKibanaPrivileges.space);
    this.feature = new Map(features.map(function (feature) {
      var rawPrivs = rawKibanaPrivileges.features[feature.id];
      return [feature.id, new _secured_feature.SecuredFeature(feature.toRaw(), rawPrivs)];
    }));
  }

  _createClass(KibanaPrivileges, [{
    key: "getBasePrivileges",
    value: function getBasePrivileges(entry) {
      if ((0, _privilege_utils.isGlobalPrivilegeDefinition)(entry)) {
        return Array.from(this.global.values());
      }

      return Array.from(this.spaces.values());
    }
  }, {
    key: "getSecuredFeature",
    value: function getSecuredFeature(featureId) {
      return this.feature.get(featureId);
    }
  }, {
    key: "getSecuredFeatures",
    value: function getSecuredFeatures() {
      return Array.from(this.feature.values());
    }
  }, {
    key: "createCollectionFromRoleKibanaPrivileges",
    value: function createCollectionFromRoleKibanaPrivileges(roleKibanaPrivileges) {
      var _this = this;

      var filterAssigned = function filterAssigned(assignedPrivileges) {
        return function (privilege) {
          return assignedPrivileges.includes(privilege.id);
        };
      };

      var privileges = roleKibanaPrivileges.map(function (entry) {
        var assignedBasePrivileges = _this.getBasePrivileges(entry).filter(filterAssigned(entry.base));

        var assignedFeaturePrivileges = Object.entries(entry.feature).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              featureId = _ref2[0],
              assignedFeaturePrivs = _ref2[1];

          return _this.getFeaturePrivileges(featureId).filter(filterAssigned(assignedFeaturePrivs));
        });
        return [assignedBasePrivileges, assignedFeaturePrivileges].flat(2);
      }).flat();
      return new _privilege_collection.PrivilegeCollection(privileges);
    }
  }, {
    key: "getFeaturePrivileges",
    value: function getFeaturePrivileges(featureId) {
      var _ref3, _this$getSecuredFeatu;

      return (_ref3 = (_this$getSecuredFeatu = this.getSecuredFeature(featureId)) === null || _this$getSecuredFeatu === void 0 ? void 0 : _this$getSecuredFeatu.getAllPrivileges()) !== null && _ref3 !== void 0 ? _ref3 : [];
    }
  }]);

  return KibanaPrivileges;
}();

exports.KibanaPrivileges = KibanaPrivileges;