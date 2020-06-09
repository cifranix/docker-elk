"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpacesPopoverList = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _react2 = _interopRequireWildcard(require("react"));

var _public = require("../../../../../../spaces/public");

var _common = require("../../../../../../spaces/common");

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

var SpacesPopoverList =
/*#__PURE__*/
function (_Component) {
  _inherits(SpacesPopoverList, _Component);

  function SpacesPopoverList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SpacesPopoverList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SpacesPopoverList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      searchTerm: '',
      allowSpacesListFocus: false,
      isPopoverOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "getMenuPanel", function () {
      var searchTerm = _this.state.searchTerm;

      var items = _this.getVisibleSpaces(searchTerm).map(_this.renderSpaceMenuItem);

      var panelProps = {
        className: 'spcMenu',
        title: _i18n.i18n.translate('xpack.security.management.editRole.spacesPopoverList.popoverTitle', {
          defaultMessage: 'Spaces'
        }),
        watchedItemProps: ['data-search-term']
      };

      if (_this.props.spaces.length >= _common.SPACE_SEARCH_COUNT_THRESHOLD) {
        return _react2.default.createElement(_eui.EuiContextMenuPanel, panelProps, _this.renderSearchField(), _this.renderSpacesListPanel(items, searchTerm));
      }

      return _react2.default.createElement(_eui.EuiContextMenuPanel, _extends({}, panelProps, {
        items: items
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onButtonClick", function () {
      _this.setState({
        isPopoverOpen: !_this.state.isPopoverOpen,
        searchTerm: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      _this.setState({
        isPopoverOpen: false,
        searchTerm: ''
      });
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
          id: "xpack.security.management.editRole.spacesPopoverList.noSpacesFoundTitle",
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
      return _react2.default.createElement("div", {
        key: "manageSpacesSearchField",
        className: "spcMenu__searchFieldWrapper"
      }, _react2.default.createElement(_eui.EuiFieldSearch, {
        placeholder: _i18n.i18n.translate('xpack.security.management.editRole.spacesPopoverList.findSpacePlaceholder', {
          defaultMessage: 'Find a space'
        }),
        incremental: true,
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

    _defineProperty(_assertThisInitialized(_this), "onSearch", function (searchTerm) {
      _this.setState({
        searchTerm: searchTerm.trim().toLowerCase()
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSpaceMenuItem", function (space) {
      var icon = _react2.default.createElement(_public.SpaceAvatar, {
        space: space,
        size: 's'
      });

      return _react2.default.createElement(_eui.EuiContextMenuItem, {
        key: space.id,
        icon: icon,
        toolTipTitle: space.description && space.name,
        toolTipContent: space.description
      }, space.name);
    });

    return _this;
  }

  _createClass(SpacesPopoverList, [{
    key: "render",
    value: function render() {
      var button = _react2.default.createElement(_eui.EuiButtonEmpty, {
        size: 'xs',
        onClick: this.onButtonClick
      }, _react2.default.createElement("span", {
        className: "secSpacesPopoverList__buttonText"
      }, this.props.buttonText));

      return _react2.default.createElement(_eui.EuiPopover, {
        id: 'spacesPopoverList',
        button: button,
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        panelPaddingSize: "none",
        anchorPosition: "downLeft",
        ownFocus: true
      }, this.getMenuPanel());
    }
  }]);

  return SpacesPopoverList;
}(_react2.Component);

exports.SpacesPopoverList = SpacesPopoverList;