"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavControlPopover = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _space_avatar = require("../space_avatar");

var _spaces_description = require("./components/spaces_description");

var _spaces_menu = require("./components/spaces_menu");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var popoutContentId = 'headerSpacesMenuContent';

var NavControlPopover =
/*#__PURE__*/
function (_Component) {
  _inherits(NavControlPopover, _Component);

  function NavControlPopover(props) {
    var _this;

    _classCallCheck(this, NavControlPopover);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NavControlPopover).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "activeSpace$", void 0);

    _defineProperty(_assertThisInitialized(_this), "getActiveSpaceButton", function () {
      var activeSpace = _this.state.activeSpace;

      if (!activeSpace) {
        return _this.getButton(_react.default.createElement(_eui.EuiLoadingSpinner, {
          size: "m"
        }), 'loading');
      }

      return _this.getButton(_react.default.createElement(_space_avatar.SpaceAvatar, {
        space: activeSpace,
        size: 's',
        className: 'spaceNavGraphic'
      }), activeSpace.name);
    });

    _defineProperty(_assertThisInitialized(_this), "getButton", function (linkIcon, linkTitle) {
      return _react.default.createElement(_eui.EuiHeaderSectionItemButton, {
        "aria-controls": popoutContentId,
        "aria-expanded": _this.state.showSpaceSelector,
        "aria-haspopup": "true",
        "aria-label": linkTitle,
        title: linkTitle,
        onClick: _this.toggleSpaceSelector
      }, linkIcon);
    });

    _defineProperty(_assertThisInitialized(_this), "toggleSpaceSelector", function () {
      var isOpening = !_this.state.showSpaceSelector;

      if (isOpening) {
        _this.loadSpaces();
      }

      _this.setState({
        showSpaceSelector: !_this.state.showSpaceSelector
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeSpaceSelector", function () {
      _this.setState({
        showSpaceSelector: false
      });
    });

    _this.state = {
      showSpaceSelector: false,
      loading: false,
      activeSpace: null,
      spaces: []
    };
    return _this;
  }

  _createClass(NavControlPopover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.activeSpace$ = this.props.spacesManager.onActiveSpaceChange$.subscribe({
        next: function next(activeSpace) {
          _this2.setState({
            activeSpace: activeSpace
          });
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.activeSpace$) {
        this.activeSpace$.unsubscribe();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var button = this.getActiveSpaceButton();

      if (!button) {
        return null;
      }

      var element;

      if (!this.state.loading && this.state.spaces.length < 2) {
        element = _react.default.createElement(_spaces_description.SpacesDescription, {
          id: popoutContentId,
          onManageSpacesClick: this.toggleSpaceSelector,
          capabilities: this.props.capabilities,
          navigateToApp: this.props.navigateToApp
        });
      } else {
        element = _react.default.createElement(_spaces_menu.SpacesMenu, {
          id: popoutContentId,
          spaces: this.state.spaces,
          isLoading: this.state.loading,
          serverBasePath: this.props.serverBasePath,
          onManageSpacesClick: this.toggleSpaceSelector,
          capabilities: this.props.capabilities,
          navigateToApp: this.props.navigateToApp
        });
      }

      return _react.default.createElement(_eui.EuiPopover, {
        id: 'spcMenuPopover',
        "data-test-subj": "spacesNavSelector",
        button: button,
        isOpen: this.state.showSpaceSelector,
        closePopover: this.closeSpaceSelector,
        anchorPosition: this.props.anchorPosition,
        panelPaddingSize: "none",
        repositionOnScroll: true,
        withTitle: this.props.anchorPosition.includes('down'),
        ownFocus: true
      }, element);
    }
  }, {
    key: "loadSpaces",
    value: function () {
      var _loadSpaces = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var spacesManager, spaces;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                spacesManager = this.props.spacesManager;

                if (!this.state.loading) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                this.setState({
                  loading: true
                });
                _context.next = 6;
                return spacesManager.getSpaces();

              case 6:
                spaces = _context.sent;
                this.setState({
                  spaces: spaces,
                  loading: false
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadSpaces() {
        return _loadSpaces.apply(this, arguments);
      }

      return loadSpaces;
    }()
  }]);

  return NavControlPopover;
}(_react.Component);

exports.NavControlPopover = NavControlPopover;