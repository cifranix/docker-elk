"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceStateKeyInQueryString = exports.getParamFromQueryString = exports.getQueryStringFromLocation = exports.decodeRisonUrlState = exports.UrlStateContainer = void 0;

var _queryString = require("query-string");

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _risonNode = require("rison-node");

var _public = require("../../../../../src/plugins/kibana_utils/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var UrlStateContainerLifecycle =
/*#__PURE__*/
function (_React$Component) {
  _inherits(UrlStateContainerLifecycle, _React$Component);

  function UrlStateContainerLifecycle() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, UrlStateContainerLifecycle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(UrlStateContainerLifecycle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "replaceStateInLocation", (0, _lodash.throttle)(function (urlState) {
      var _this$props = _this.props,
          history = _this$props.history,
          location = _this$props.location,
          urlStateKey = _this$props.urlStateKey;
      var newLocation = replaceQueryStringInLocation(location, replaceStateKeyInQueryString(urlStateKey, urlState)(getQueryStringFromLocation(location)));

      if (newLocation !== location) {
        history.replace(newLocation);
      }
    }, 1000));

    _defineProperty(_assertThisInitialized(_this), "handleInitialize", function (location) {
      var _this$props2 = _this.props,
          onInitialize = _this$props2.onInitialize,
          mapToUrlState = _this$props2.mapToUrlState,
          urlStateKey = _this$props2.urlStateKey,
          urlState = _this$props2.urlState;

      if (!onInitialize || !mapToUrlState) {
        return;
      }

      var newUrlStateString = getParamFromQueryString(getQueryStringFromLocation(location), urlStateKey);
      var newUrlState = mapToUrlState(decodeRisonUrlState(newUrlStateString)); // When the newURLState is empty we can assume that the state will becoming
      // from the urlState initially. By setting populateWithIntialState to true
      // this will now serialize the initial urlState into the URL when the page is
      // loaded.

      if (!newUrlState && _this.props.populateWithInitialState) {
        _this.replaceStateInLocation(urlState);

        onInitialize(urlState);
      } else {
        onInitialize(newUrlState);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleLocationChange", function (prevLocation, newLocation) {
      var _this$props3 = _this.props,
          onChange = _this$props3.onChange,
          mapToUrlState = _this$props3.mapToUrlState,
          urlStateKey = _this$props3.urlStateKey;

      if (!onChange || !mapToUrlState) {
        return;
      }

      var previousUrlStateString = getParamFromQueryString(getQueryStringFromLocation(prevLocation), urlStateKey);
      var newUrlStateString = getParamFromQueryString(getQueryStringFromLocation(newLocation), urlStateKey);

      if (previousUrlStateString !== newUrlStateString) {
        var _previousUrlState = mapToUrlState(decodeRisonUrlState(previousUrlStateString));

        var newUrlState = mapToUrlState(decodeRisonUrlState(newUrlStateString));

        if (typeof newUrlState !== 'undefined') {
          onChange(newUrlState, _previousUrlState);
        }
      }
    });

    return _this;
  }

  _createClass(UrlStateContainerLifecycle, [{
    key: "render",
    value: function render() {
      return null;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref) {
      var prevLocation = _ref.location,
          prevUrlState = _ref.urlState;
      var _this$props4 = this.props,
          history = _this$props4.history,
          location = _this$props4.location,
          urlState = _this$props4.urlState;

      if (urlState !== prevUrlState) {
        this.replaceStateInLocation(urlState);
      }

      if (history.action === 'POP' && location !== prevLocation) {
        this.handleLocationChange(prevLocation, location);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var location = this.props.location;
      this.handleInitialize(location);
    }
  }]);

  return UrlStateContainerLifecycle;
}(_react.default.Component);

var UrlStateContainer = function UrlStateContainer(props) {
  return _react.default.createElement(_reactRouterDom.Route, null, function (_ref2) {
    var history = _ref2.history,
        location = _ref2.location;
    return _react.default.createElement(UrlStateContainerLifecycle, _extends({
      history: history,
      location: location
    }, props));
  });
};

exports.UrlStateContainer = UrlStateContainer;

var decodeRisonUrlState = function decodeRisonUrlState(value) {
  try {
    return value ? (0, _risonNode.decode)(value) : undefined;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('rison decoder error')) {
      return {};
    }

    throw error;
  }
};

exports.decodeRisonUrlState = decodeRisonUrlState;

var encodeRisonUrlState = function encodeRisonUrlState(state) {
  return (0, _risonNode.encode)(state);
};

var getQueryStringFromLocation = function getQueryStringFromLocation(location) {
  return location.search.substring(1);
};

exports.getQueryStringFromLocation = getQueryStringFromLocation;

var getParamFromQueryString = function getParamFromQueryString(queryString, key) {
  var parsedQueryString = (0, _queryString.parse)(queryString, {
    sort: false
  });
  var queryParam = parsedQueryString[key];
  return Array.isArray(queryParam) ? queryParam[0] : queryParam;
};

exports.getParamFromQueryString = getParamFromQueryString;

var replaceStateKeyInQueryString = function replaceStateKeyInQueryString(stateKey, urlState) {
  return function (queryString) {
    var previousQueryValues = (0, _queryString.parse)(queryString, {
      sort: false
    });
    var encodedUrlState = typeof urlState !== 'undefined' ? encodeRisonUrlState(urlState) : undefined;
    return (0, _queryString.stringify)(_public.url.encodeQuery(_objectSpread({}, previousQueryValues, _defineProperty({}, stateKey, encodedUrlState))), {
      sort: false,
      encode: false
    });
  };
};

exports.replaceStateKeyInQueryString = replaceStateKeyInQueryString;

var replaceQueryStringInLocation = function replaceQueryStringInLocation(location, queryString) {
  if (queryString === getQueryStringFromLocation(location)) {
    return location;
  } else {
    return _objectSpread({}, location, {
      search: "?".concat(queryString)
    });
  }
};