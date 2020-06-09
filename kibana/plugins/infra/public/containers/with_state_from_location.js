"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToRisonAppLocation = exports.mapRisonAppLocationToState = exports.withStateFromLocation = void 0;

var _queryString = require("query-string");

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _risonNode = require("rison-node");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withStateFromLocation = function withStateFromLocation(_ref) {
  var mapLocationToState = _ref.mapLocationToState,
      mapStateToLocation = _ref.mapStateToLocation;
  return function (WrappedComponent) {
    var _class, _temp;

    var wrappedName = WrappedComponent.displayName || WrappedComponent.name;
    return (0, _reactRouterDom.withRouter)((_temp = _class =
    /*#__PURE__*/
    function (_React$PureComponent) {
      _inherits(WithStateFromLocation, _React$PureComponent);

      function WithStateFromLocation() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, WithStateFromLocation);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithStateFromLocation)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_this), "pushStateInLocation", function (state) {
          var _this$props = _this.props,
              history = _this$props.history,
              location = _this$props.location;
          var newLocation = mapStateToLocation(state, _this.props.location);

          if (newLocation !== location) {
            history.push(newLocation);
          }
        });

        _defineProperty(_assertThisInitialized(_this), "replaceStateInLocation", function (state) {
          var _this$props2 = _this.props,
              history = _this$props2.history,
              location = _this$props2.location;
          var newLocation = mapStateToLocation(state, _this.props.location);

          if (newLocation !== location) {
            history.replace(newLocation);
          }
        });

        return _this;
      }

      _createClass(WithStateFromLocation, [{
        key: "render",
        value: function render() {
          var location = this.props.location;
          var otherProps = (0, _lodash.omit)(this.props, ['location', 'history', 'match', 'staticContext']);
          var stateFromLocation = mapLocationToState(location);
          return (// @ts-ignore
            _react.default.createElement(WrappedComponent, _extends({}, otherProps, stateFromLocation, {
              pushStateInLocation: this.pushStateInLocation,
              replaceStateInLocation: this.replaceStateInLocation
            }))
          );
        }
      }]);

      return WithStateFromLocation;
    }(_react.default.PureComponent), _defineProperty(_class, "displayName", "WithStateFromLocation(".concat(wrappedName, ")")), _temp));
  };
};

exports.withStateFromLocation = withStateFromLocation;

var decodeRisonAppState = function decodeRisonAppState(queryValues) {
  try {
    return queryValues && queryValues._a ? (0, _risonNode.decode_object)(queryValues._a) : {};
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('rison decoder error')) {
      return {};
    }

    throw error;
  }
};

var encodeRisonAppState = function encodeRisonAppState(state) {
  return {
    _a: (0, _risonNode.encode_object)(state)
  };
};

var mapRisonAppLocationToState = function mapRisonAppLocationToState() {
  var mapState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (state) {
    return state;
  };
  return function (location) {
    var queryValues = (0, _queryString.parse)(location.search.substring(1), {
      sort: false
    });
    var decodedState = decodeRisonAppState(queryValues);
    return mapState(decodedState);
  };
};

exports.mapRisonAppLocationToState = mapRisonAppLocationToState;

var mapStateToRisonAppLocation = function mapStateToRisonAppLocation() {
  var mapState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (state) {
    return state;
  };
  return function (state, location) {
    var previousQueryValues = (0, _queryString.parse)(location.search.substring(1), {
      sort: false
    });
    var previousState = decodeRisonAppState(previousQueryValues);
    var encodedState = encodeRisonAppState(_objectSpread({}, previousState, {}, mapState(state)));
    var newQueryValues = (0, _queryString.stringify)(_objectSpread({}, previousQueryValues, {}, encodedState), {
      sort: false
    });
    return _objectSpread({}, location, {
      search: "?".concat(newQueryValues)
    });
  };
};

exports.mapStateToRisonAppLocation = mapStateToRisonAppLocation;