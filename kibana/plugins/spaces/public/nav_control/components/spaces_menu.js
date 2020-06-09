"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpacesMenu = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _common = require("../../../common");

var _manage_spaces_button = require("./manage_spaces_button");

var _space_avatar = require("../../space_avatar");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var SpacesMenuUI =
/*#__PURE__*/
function (_Component) {
  _inherits(SpacesMenuUI, _Component);

  function SpacesMenuUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SpacesMenuUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SpacesMenuUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      searchTerm: '',
      allowSpacesListFocus: false
    });

    _defineProperty(_assertThisInitialized(_this), "getVisibleSpaces", function (searchTerm) {
      var spaces = _this.props.spaces;
      var filteredSpaces = spaces;

      if (searchTerm) {
        filteredSpaces = spaces.filter(function (space) {
          var name = space.name,
              _space$description = space.description,
              description = _space$description === void 0 ? '' : _space$description;
          return name.toLowerCase().indexOf(searchTerm) >= 0 || description.toLowerCase().indexOf(searchTerm) >= 0;
        });
      }

      return filteredSpaces;
    });

    _defineProperty(_assertThisInitialized(_this), "renderSpacesListPanel", function (items, searchTerm) {
      if (items.length === 0) {
        return _react2.default.createElement(_eui.EuiText, {
          color: "subdued",
          className: "eui-textCenter"
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.spaces.navControl.spacesMenu.noSpacesFoundTitle",
          defaultMessage: " no spaces found "
        }));
      }

      return _react2.default.createElement(_eui.EuiContextMenuPanel, {
        key: "spcMenuList",
        "data-search-term": searchTerm,
        className: "spcMenu__spacesList",
        hasFocus: _this.state.allowSpacesListFocus,
        initialFocusedItemIndex: _this.state.allowSpacesListFocus ? 0 : undefined,
        items: items
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSearchField", function () {
      var intl = _this.props.intl;
      return _react2.default.createElement("div", {
        key: "manageSpacesSearchField",
        className: "spcMenu__searchFieldWrapper"
      }, // @ts-ignore
      _react2.default.createElement(_eui.EuiFieldSearch, {
        placeholder: intl.formatMessage({
          id: 'xpack.spaces.navControl.spacesMenu.findSpacePlaceholder',
          defaultMessage: 'Find a space'
        }),
        incremental: true // FIXME needs updated typedef
        ,
        onSearch: _this.onSearch,
        onKeyDown: _this.onSearchKeyDown,
        onFocus: _this.onSearchFocus,
        compressed: true
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchKeyDown", function (e) {
      //  9: tab
      // 13: enter
      // 40: arrow-down
      var focusableKeyCodes = [9, 13, 40];
      var keyCode = e.keyCode;

      if (focusableKeyCodes.includes(keyCode)) {
        // Allows the spaces list panel to recieve focus. This enables keyboard and screen reader navigation
        _this.setState({
          allowSpacesListFocus: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchFocus", function () {
      _this.setState({
        allowSpacesListFocus: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderManageButton", function () {
      return _react2.default.createElement(_manage_spaces_button.ManageSpacesButton, {
        key: "manageSpacesButton",
        className: "spcMenu__manageButton",
        size: "s",
        onClick: _this.props.onManageSpacesClick,
        capabilities: _this.props.capabilities,
        navigateToApp: _this.props.navigateToApp
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", function (searchTerm) {
      _this.setState({
        searchTerm: searchTerm.trim().toLowerCase()
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSpaceMenuItem", function (space) {
      var icon = _react2.default.createElement(_space_avatar.SpaceAvatar, {
        space: space,
        size: 's'
      });

      return _react2.default.createElement(_eui.EuiContextMenuItem, {
        key: space.id,
        icon: icon,
        href: (0, _common.addSpaceIdToPath)(_this.props.serverBasePath, space.id, _common.ENTER_SPACE_PATH),
        toolTipTitle: space.description && space.name,
        toolTipContent: space.description
      }, space.name);
    });

    _defineProperty(_assertThisInitialized(_this), "renderPlaceholderMenuItem", function (key) {
      return _react2.default.createElement(_eui.EuiContextMenuItem, {
        key: key,
        disabled: true
      }, _react2.default.createElement(_eui.EuiLoadingContent, {
        lines: 1
      }));
    });

    return _this;
  }

  _createClass(SpacesMenuUI, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          intl = _this$props.intl,
          isLoading = _this$props.isLoading;
      var searchTerm = this.state.searchTerm;
      var items = isLoading ? [1, 2, 3].map(this.renderPlaceholderMenuItem) : this.getVisibleSpaces(searchTerm).map(this.renderSpaceMenuItem);
      var panelProps = {
        id: this.props.id,
        className: 'spcMenu',
        title: intl.formatMessage({
          id: 'xpack.spaces.navControl.spacesMenu.changeCurrentSpaceTitle',
          defaultMessage: 'Change current space'
        }),
        watchedItemProps: ['data-search-term']
      };

      if (this.props.spaces.length >= _common.SPACE_SEARCH_COUNT_THRESHOLD) {
        return _react2.default.createElement(_eui.EuiContextMenuPanel, panelProps, this.renderSearchField(), this.renderSpacesListPanel(items, searchTerm), this.renderManageButton());
      }

      items.push(this.renderManageButton());
      return _react2.default.createElement(_eui.EuiContextMenuPanel, _extends({}, panelProps, {
        items: items
      }));
    }
  }]);

  return SpacesMenuUI;
}(_react2.Component);

var SpacesMenu = (0, _react.injectI18n)(SpacesMenuUI);
exports.SpacesMenu = SpacesMenu;