"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecuredFeature = void 0;

var _common = require("../../../../../features/common");

var _primary_feature_privilege = require("./primary_feature_privilege");

var _secured_sub_feature = require("./secured_sub_feature");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SecuredFeature =
/*#__PURE__*/
function (_Feature) {
  _inherits(SecuredFeature, _Feature);

  function SecuredFeature(config) {
    var _ref3, _this$config$subFeatu, _ref6, _this$config$subFeatu2;

    var _this;

    var actionMapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SecuredFeature);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SecuredFeature).call(this, config));

    _defineProperty(_assertThisInitialized(_this), "primaryFeaturePrivileges", void 0);

    _defineProperty(_assertThisInitialized(_this), "minimalPrimaryFeaturePrivileges", void 0);

    _defineProperty(_assertThisInitialized(_this), "subFeaturePrivileges", void 0);

    _defineProperty(_assertThisInitialized(_this), "securedSubFeatures", void 0);

    _this.primaryFeaturePrivileges = Object.entries(_this.config.privileges || {}).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          id = _ref2[0],
          privilege = _ref2[1];

      return new _primary_feature_privilege.PrimaryFeaturePrivilege(id, privilege, actionMapping[id]);
    });

    if ((_ref3 = (_this$config$subFeatu = _this.config.subFeatures) === null || _this$config$subFeatu === void 0 ? void 0 : _this$config$subFeatu.length) !== null && _ref3 !== void 0 ? _ref3 : 0 > 0) {
      _this.minimalPrimaryFeaturePrivileges = Object.entries(_this.config.privileges || {}).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            id = _ref5[0],
            privilege = _ref5[1];

        return new _primary_feature_privilege.PrimaryFeaturePrivilege("minimal_".concat(id), privilege, actionMapping["minimal_".concat(id)]);
      });
    } else {
      _this.minimalPrimaryFeaturePrivileges = [];
    }

    _this.securedSubFeatures = (_ref6 = (_this$config$subFeatu2 = _this.config.subFeatures) === null || _this$config$subFeatu2 === void 0 ? void 0 : _this$config$subFeatu2.map(function (sf) {
      return new _secured_sub_feature.SecuredSubFeature(sf, actionMapping);
    })) !== null && _ref6 !== void 0 ? _ref6 : [];
    _this.subFeaturePrivileges = _this.securedSubFeatures.reduce(function (acc, subFeature) {
      return [].concat(_toConsumableArray(acc), _toConsumableArray(subFeature.privilegeIterator()));
    }, []);
    return _this;
  }

  _createClass(SecuredFeature, [{
    key: "getPrivilegesTooltip",
    value: function getPrivilegesTooltip() {
      return this.config.privilegesTooltip;
    }
  }, {
    key: "getAllPrivileges",
    value: function getAllPrivileges() {
      return [].concat(_toConsumableArray(this.primaryFeaturePrivileges), _toConsumableArray(this.minimalPrimaryFeaturePrivileges), _toConsumableArray(this.subFeaturePrivileges));
    }
  }, {
    key: "getPrimaryFeaturePrivileges",
    value: function getPrimaryFeaturePrivileges() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        includeMinimalFeaturePrivileges: false
      },
          includeMinimalFeaturePrivileges = _ref7.includeMinimalFeaturePrivileges;

      return includeMinimalFeaturePrivileges ? [this.primaryFeaturePrivileges, this.minimalPrimaryFeaturePrivileges].flat() : _toConsumableArray(this.primaryFeaturePrivileges);
    }
  }, {
    key: "getMinimalFeaturePrivileges",
    value: function getMinimalFeaturePrivileges() {
      return _toConsumableArray(this.minimalPrimaryFeaturePrivileges);
    }
  }, {
    key: "getSubFeaturePrivileges",
    value: function getSubFeaturePrivileges() {
      return _toConsumableArray(this.subFeaturePrivileges);
    }
  }, {
    key: "getSubFeatures",
    value: function getSubFeatures() {
      return _toConsumableArray(this.securedSubFeatures);
    }
  }]);

  return SecuredFeature;
}(_common.Feature);

exports.SecuredFeature = SecuredFeature;