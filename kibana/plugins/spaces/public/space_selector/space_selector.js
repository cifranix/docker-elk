"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSpaceSelectorApp = exports.SpaceSelector = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _components = require("./components");

var _constants = require("../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var SpaceSelector =
/*#__PURE__*/
function (_Component) {
  _inherits(SpaceSelector, _Component);

  function SpaceSelector(props) {
    var _this;

    _classCallCheck(this, SpaceSelector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpaceSelector).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "headerRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "setHeaderRef", function (ref) {
      _this.headerRef = ref; // forcing focus of header for screen readers to announce on page load

      if (_this.headerRef) {
        _this.headerRef.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getSearchField", function () {
      if (!_this.state.spaces || _this.state.spaces.length < _constants.SPACE_SEARCH_COUNT_THRESHOLD) {
        return null;
      }

      return _react2.default.createElement(_eui.EuiFlexItem, {
        className: "spcSpaceSelector__searchHolder"
      }, // @ts-ignore onSearch doesn't exist on EuiFieldSearch
      _react2.default.createElement(_eui.EuiFieldSearch, {
        className: "spcSpaceSelector__searchField",
        placeholder: _i18n.i18n.translate('xpack.spaces.spaceSelector.findSpacePlaceholder', {
          defaultMessage: 'Find a space'
        }),
        incremental: true,
        onSearch: _this.onSearch
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", function () {
      var searchTerm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      _this.setState({
        searchTerm: searchTerm.trim().toLowerCase()
      });
    });

    _this.state = {
      loading: false,
      searchTerm: '',
      spaces: []
    };
    return _this;
  }

  _createClass(SpaceSelector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.state.spaces.length === 0) {
        this.loadSpaces();
      }
    }
  }, {
    key: "loadSpaces",
    value: function loadSpaces() {
      var _this2 = this;

      this.setState({
        loading: true
      });
      var spacesManager = this.props.spacesManager;
      spacesManager.getSpaces().then(function (spaces) {
        _this2.setState({
          loading: false,
          spaces: spaces
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          spaces = _this$state.spaces,
          searchTerm = _this$state.searchTerm;
      var filteredSpaces = spaces;

      if (searchTerm) {
        filteredSpaces = spaces.filter(function (space) {
          return space.name.toLowerCase().indexOf(searchTerm) >= 0 || (space.description || '').toLowerCase().indexOf(searchTerm) >= 0;
        });
      }

      return _react2.default.createElement(_eui.EuiPage, {
        className: "spcSpaceSelector",
        "data-test-subj": "kibanaSpaceSelector"
      }, _react2.default.createElement(_eui.EuiPageBody, null, _react2.default.createElement(_eui.EuiPageHeader, {
        className: "spcSpaceSelector__heading"
      }, _react2.default.createElement(_eui.EuiSpacer, {
        size: "xxl"
      }), _react2.default.createElement("span", {
        className: "spcSpaceSelector__logo"
      }, _react2.default.createElement(_eui.EuiIcon, {
        size: "xxl",
        type: "logoElastic"
      })), _react2.default.createElement(_eui.EuiTitle, {
        size: "l"
      }, _react2.default.createElement("h1", {
        tabIndex: 0,
        ref: this.setHeaderRef
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.spaceSelector.selectSpacesTitle",
        defaultMessage: "Select your space"
      }))), _react2.default.createElement(_eui.EuiText, {
        size: "s",
        color: "subdued"
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.spaceSelector.changeSpaceAnytimeAvailabilityText",
        defaultMessage: "You can change your space at anytime"
      })))), _react2.default.createElement(_eui.EuiPageContent, {
        className: "spcSpaceSelector__pageContent"
      }, _react2.default.createElement(_eui.EuiFlexGroup // @ts-ignore
      , {
        direction: "column",
        alignItems: "center",
        responsive: false
      }, this.getSearchField()), _react2.default.createElement(_eui.EuiSpacer, {
        size: "xl"
      }), this.state.loading && _react2.default.createElement(_eui.EuiLoadingSpinner, {
        size: "xl"
      }), !this.state.loading && _react2.default.createElement(_components.SpaceCards, {
        spaces: filteredSpaces,
        serverBasePath: this.props.serverBasePath
      }), !this.state.loading && filteredSpaces.length === 0 && _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiText, {
        color: "subdued" // @ts-ignore
        ,
        textAlign: "center"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.spaceSelector.noSpacesMatchSearchCriteriaDescription",
        defaultMessage: "No spaces match search criteria"
      }))))));
    }
  }]);

  return SpaceSelector;
}(_react2.Component);

exports.SpaceSelector = SpaceSelector;

var renderSpaceSelectorApp = function renderSpaceSelectorApp(i18nStart, el, props) {
  _reactDom.default.render(_react2.default.createElement(i18nStart.Context, null, _react2.default.createElement(SpaceSelector, props)), el);

  return function () {
    return _reactDom.default.unmountComponentAtNode(el);
  };
};

exports.renderSpaceSelectorApp = renderSpaceSelectorApp;