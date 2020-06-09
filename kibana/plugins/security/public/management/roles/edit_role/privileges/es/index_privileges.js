"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPrivileges = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _model = require("../../../../../../common/model");

var _index_privilege_form = require("./index_privilege_form");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IndexPrivileges =
/*#__PURE__*/
function (_Component) {
  _inherits(IndexPrivileges, _Component);

  function IndexPrivileges(props) {
    var _this;

    _classCallCheck(this, IndexPrivileges);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IndexPrivileges).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "addIndexPrivilege", function () {
      var role = _this.props.role;
      var newIndices = [].concat(_toConsumableArray(role.elasticsearch.indices), [{
        names: [],
        privileges: [],
        field_security: {
          grant: ['*']
        }
      }]);

      _this.props.onChange(_objectSpread({}, _this.props.role, {
        elasticsearch: _objectSpread({}, _this.props.role.elasticsearch, {
          indices: newIndices
        })
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onIndexPrivilegeChange", function (privilegeIndex) {
      return function (updatedPrivilege) {
        var role = _this.props.role;
        var indices = role.elasticsearch.indices;

        var newIndices = _toConsumableArray(indices);

        newIndices[privilegeIndex] = updatedPrivilege;

        _this.props.onChange(_objectSpread({}, _this.props.role, {
          elasticsearch: _objectSpread({}, _this.props.role.elasticsearch, {
            indices: newIndices
          })
        }));

        _this.loadAvailableFields(newIndices);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onIndexPrivilegeDelete", function (privilegeIndex) {
      return function () {
        var role = _this.props.role;

        var newIndices = _toConsumableArray(role.elasticsearch.indices);

        newIndices.splice(privilegeIndex, 1);

        _this.props.onChange(_objectSpread({}, _this.props.role, {
          elasticsearch: _objectSpread({}, _this.props.role.elasticsearch, {
            indices: newIndices
          })
        }));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "isPlaceholderPrivilege", function (indexPrivilege) {
      return indexPrivilege.names.length === 0;
    });

    _defineProperty(_assertThisInitialized(_this), "loadFieldsForPattern",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(pattern) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (pattern) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", _defineProperty({}, pattern, []));

              case 2:
                _context.prev = 2;
                _context.t0 = _defineProperty;
                _context.t1 = {};
                _context.t2 = pattern;
                _context.next = 8;
                return _this.props.indicesAPIClient.getFields(pattern);

              case 8:
                _context.t3 = _context.sent;
                return _context.abrupt("return", (0, _context.t0)(_context.t1, _context.t2, _context.t3));

              case 12:
                _context.prev = 12;
                _context.t4 = _context["catch"](2);
                return _context.abrupt("return", _defineProperty({}, pattern, []));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 12]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _this.state = {
      availableFields: {}
    };
    return _this;
  }

  _createClass(IndexPrivileges, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadAvailableFields(this.props.role.elasticsearch.indices);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$role$elas = this.props.role.elasticsearch.indices,
          indices = _this$props$role$elas === void 0 ? [] : _this$props$role$elas;
      var _this$props = this.props,
          indexPatterns = _this$props.indexPatterns,
          license = _this$props.license,
          availableIndexPrivileges = _this$props.availableIndexPrivileges;

      var _license$getFeatures = license.getFeatures(),
          allowRoleDocumentLevelSecurity = _license$getFeatures.allowRoleDocumentLevelSecurity,
          allowRoleFieldLevelSecurity = _license$getFeatures.allowRoleFieldLevelSecurity;

      var props = {
        indexPatterns: indexPatterns,
        // If editing an existing role while that has been disabled, always show the FLS/DLS fields because currently
        // a role is only marked as disabled if it has FLS/DLS setup (usually before the user changed to a license that
        // doesn't permit FLS/DLS).
        allowDocumentLevelSecurity: allowRoleDocumentLevelSecurity || !(0, _model.isRoleEnabled)(this.props.role),
        allowFieldLevelSecurity: allowRoleFieldLevelSecurity || !(0, _model.isRoleEnabled)(this.props.role),
        isRoleReadOnly: (0, _model.isRoleReadOnly)(this.props.role)
      };
      var forms = indices.map(function (indexPrivilege, idx) {
        return _react.default.createElement(_index_privilege_form.IndexPrivilegeForm, _extends({
          key: idx
        }, props, {
          formIndex: idx,
          validator: _this2.props.validator,
          availableIndexPrivileges: availableIndexPrivileges,
          indexPrivilege: indexPrivilege,
          availableFields: _this2.state.availableFields[indexPrivilege.names.join(',')],
          onChange: _this2.onIndexPrivilegeChange(idx),
          onDelete: _this2.onIndexPrivilegeDelete(idx)
        }));
      });
      return _react.default.createElement(_react.Fragment, null, forms);
    }
  }, {
    key: "loadAvailableFields",
    value: function loadAvailableFields(privileges) {
      var _this3 = this;

      // readonly roles cannot be edited, and therefore do not need to fetch available fields.
      if ((0, _model.isRoleReadOnly)(this.props.role)) {
        return;
      }

      var patterns = privileges.map(function (index) {
        return index.names.join(',');
      });
      var cachedPatterns = Object.keys(this.state.availableFields);

      var patternsToFetch = _lodash.default.difference(patterns, cachedPatterns);

      var fetchRequests = patternsToFetch.map(this.loadFieldsForPattern);
      Promise.all(fetchRequests).then(function (response) {
        _this3.setState({
          availableFields: _objectSpread({}, _this3.state.availableFields, {}, response.reduce(function (acc, o) {
            return _objectSpread({}, acc, {}, o);
          }, {}))
        });
      });
    }
  }]);

  return IndexPrivileges;
}(_react.Component);

exports.IndexPrivileges = IndexPrivileges;