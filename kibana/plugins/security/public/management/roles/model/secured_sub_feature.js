"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecuredSubFeature = void 0;

var _common = require("../../../../../features/common");

var _sub_feature_privilege = require("./sub_feature_privilege");

var _sub_feature_privilege_group = require("./sub_feature_privilege_group");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SecuredSubFeature =
/*#__PURE__*/
function (_SubFeature) {
  _inherits(SecuredSubFeature, _SubFeature);

  function SecuredSubFeature(config) {
    var _this;

    var actionMapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SecuredSubFeature);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SecuredSubFeature).call(this, config));
    _this.actionMapping = actionMapping;

    _defineProperty(_assertThisInitialized(_this), "privileges", void 0);

    _this.privileges = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _this.privilegeIterator()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _privilege = _step.value;

        _this.privileges.push(_privilege);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _this;
  }

  _createClass(SecuredSubFeature, [{
    key: "getPrivilegeGroups",
    value: function getPrivilegeGroups() {
      var _this2 = this;

      return this.privilegeGroups.map(function (pg) {
        return new _sub_feature_privilege_group.SubFeaturePrivilegeGroup(pg, _this2.actionMapping);
      });
    }
  }, {
    key: "privilegeIterator",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function privilegeIterator() {
      var _this3 = this;

      var _ref,
          _ref$predicate,
          predicate,
          _iteratorNormalCompletion2,
          _didIteratorError2,
          _iteratorError2,
          _iterator2,
          _step2,
          group,
          _args = arguments;

      return regeneratorRuntime.wrap(function privilegeIterator$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref$predicate = _ref.predicate, predicate = _ref$predicate === void 0 ? function () {
                return true;
              } : _ref$predicate;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 4;
              _iterator2 = this.privilegeGroups[Symbol.iterator]();

            case 6:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 12;
                break;
              }

              group = _step2.value;
              return _context.delegateYield(group.privileges.map(function (gp) {
                return new _sub_feature_privilege.SubFeaturePrivilege(gp, _this3.actionMapping[gp.id]);
              }).filter(function (privilege) {
                return predicate(privilege, _this3);
              }), "t0", 9);

            case 9:
              _iteratorNormalCompletion2 = true;
              _context.next = 6;
              break;

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t1 = _context["catch"](4);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t1;

            case 18:
              _context.prev = 18;
              _context.prev = 19;

              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }

            case 21:
              _context.prev = 21;

              if (!_didIteratorError2) {
                _context.next = 24;
                break;
              }

              throw _iteratorError2;

            case 24:
              return _context.finish(21);

            case 25:
              return _context.finish(18);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, privilegeIterator, this, [[4, 14, 18, 26], [19,, 21, 25]]);
    })
  }]);

  return SecuredSubFeature;
}(_common.SubFeature);

exports.SecuredSubFeature = SecuredSubFeature;