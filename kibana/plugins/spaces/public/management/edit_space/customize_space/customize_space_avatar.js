"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomizeSpaceAvatar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _dataurl = require("../../../../common/lib/dataurl");

var _space_avatar = require("../../../space_avatar");

var _common = require("../../../../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CustomizeSpaceAvatar =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomizeSpaceAvatar, _Component);

  function CustomizeSpaceAvatar(props) {
    var _this;

    _classCallCheck(this, CustomizeSpaceAvatar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomizeSpaceAvatar).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "initialsRef", null);

    _defineProperty(_assertThisInitialized(_this), "handleImageUpload", function (imgUrl) {
      var thisInstance = _assertThisInitialized(_this);

      var image = new Image();
      image.addEventListener('load', function () {
        var MAX_IMAGE_SIZE = 64;
        var imgDimx = image.width;
        var imgDimy = image.height;

        if (imgDimx <= MAX_IMAGE_SIZE && imgDimy <= MAX_IMAGE_SIZE) {
          thisInstance.storeImageChanges(imgUrl);
        } else {
          var imageCanvas = document.createElement('canvas');
          var canvasContext = imageCanvas.getContext('2d');

          if (imgDimx >= imgDimy) {
            imageCanvas.width = MAX_IMAGE_SIZE;
            imageCanvas.height = Math.floor(imgDimy * MAX_IMAGE_SIZE / imgDimx);

            if (canvasContext) {
              canvasContext.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
              var resizedImageUrl = imageCanvas.toDataURL();
              thisInstance.storeImageChanges(resizedImageUrl);
            }
          } else {
            imageCanvas.height = MAX_IMAGE_SIZE;
            imageCanvas.width = Math.floor(imgDimx * MAX_IMAGE_SIZE / imgDimy);

            if (canvasContext) {
              canvasContext.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);

              var _resizedImageUrl = imageCanvas.toDataURL();

              thisInstance.storeImageChanges(_resizedImageUrl);
            }
          }
        }
      }, false);
      image.src = imgUrl;
    });

    _defineProperty(_assertThisInitialized(_this), "onFileUpload", function (files) {
      if (files == null) return;
      var file = files[0];

      if (_dataurl.imageTypes.indexOf(file.type) > -1) {
        (0, _dataurl.encode)(file).then(function (dataurl) {
          return _this.handleImageUpload(dataurl);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "initialsInputRef", function (ref) {
      if (ref) {
        _this.initialsRef = ref;

        _this.initialsRef.addEventListener('focus', _this.onInitialsFocus);

        _this.initialsRef.addEventListener('blur', _this.onInitialsBlur);
      } else {
        if (_this.initialsRef) {
          _this.initialsRef.removeEventListener('focus', _this.onInitialsFocus);

          _this.initialsRef.removeEventListener('blur', _this.onInitialsBlur);

          _this.initialsRef = null;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onInitialsFocus", function () {
      _this.setState({
        initialsHasFocus: true,
        pendingInitials: (0, _space_avatar.getSpaceInitials)(_this.props.space)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onInitialsBlur", function () {
      _this.setState({
        initialsHasFocus: false,
        pendingInitials: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onInitialsChange", function (e) {
      var initials = (e.target.value || '').substring(0, _common.MAX_SPACE_INITIALS);

      _this.setState({
        pendingInitials: initials
      });

      _this.props.onChange(_objectSpread({}, _this.props.space, {
        initials: initials
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onColorChange", function (color) {
      _this.props.onChange(_objectSpread({}, _this.props.space, {
        color: color
      }));
    });

    _this.state = {
      initialsHasFocus: false
    };
    return _this;
  }

  _createClass(CustomizeSpaceAvatar, [{
    key: "storeImageChanges",
    value: function storeImageChanges(imageUrl) {
      this.props.onChange(_objectSpread({}, this.props.space, {
        imageUrl: imageUrl
      }));
    } //
    // images below 64x64 pixels are left untouched
    // images above that threshold are resized
    //

  }, {
    key: "render",
    value: function render() {
      var space = this.props.space;
      var _this$state = this.state,
          initialsHasFocus = _this$state.initialsHasFocus,
          pendingInitials = _this$state.pendingInitials;
      var spaceColor = (0, _space_avatar.getSpaceColor)(space);
      var isInvalidSpaceColor = !(0, _eui.isValidHex)(spaceColor) && spaceColor !== '';
      return _react.default.createElement("form", {
        onSubmit: function onSubmit() {
          return false;
        }
      }, _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.spaces.management.customizeSpaceAvatar.initialItemsFormRowLabel', {
          defaultMessage: 'Initials (2 max)'
        })
      }, _react.default.createElement(_eui.EuiFieldText, {
        inputRef: this.initialsInputRef,
        name: "spaceInitials" // allows input to be cleared or otherwise invalidated while user is editing the initials,
        // without defaulting to the derived initials provided by `getSpaceInitials`
        ,
        value: initialsHasFocus ? pendingInitials || '' : (0, _space_avatar.getSpaceInitials)(space),
        onChange: this.onInitialsChange,
        disabled: this.props.space.imageUrl && this.props.space.imageUrl !== '' ? true : false
      })), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.spaces.management.customizeSpaceAvatar.colorFormRowLabel', {
          defaultMessage: 'Color'
        }),
        isInvalid: isInvalidSpaceColor
      }, _react.default.createElement(_eui.EuiColorPicker, {
        color: spaceColor,
        onChange: this.onColorChange,
        isInvalid: isInvalidSpaceColor
      })), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), this.filePickerOrImage());
    }
  }, {
    key: "removeImageUrl",
    value: function removeImageUrl() {
      this.props.onChange(_objectSpread({}, this.props.space, {
        imageUrl: ''
      }));
    }
  }, {
    key: "filePickerOrImage",
    value: function filePickerOrImage() {
      var _this2 = this;

      if (!this.props.space.imageUrl) {
        return _react.default.createElement(_eui.EuiFormRow, {
          label: _i18n.i18n.translate('xpack.spaces.management.customizeSpaceAvatar.imageUrl', {
            defaultMessage: 'Custom image'
          })
        }, _react.default.createElement(_eui.EuiFilePicker, {
          display: "default",
          initialPromptText: _i18n.i18n.translate('xpack.spaces.management.customizeSpaceAvatar.selectImageUrl', {
            defaultMessage: 'Select image file'
          }),
          onChange: this.onFileUpload,
          accept: _dataurl.imageTypes.join(',')
        }));
      } else {
        return _react.default.createElement(_eui.EuiFlexItem, {
          grow: true
        }, _react.default.createElement(_eui.EuiButton, {
          onClick: function onClick() {
            return _this2.removeImageUrl();
          },
          color: "danger",
          iconType: "trash"
        }, _i18n.i18n.translate('xpack.spaces.management.customizeSpaceAvatar.removeImage', {
          defaultMessage: 'Remove custom image'
        })));
      }
    }
  }]);

  return CustomizeSpaceAvatar;
}(_react.Component);

exports.CustomizeSpaceAvatar = CustomizeSpaceAvatar;