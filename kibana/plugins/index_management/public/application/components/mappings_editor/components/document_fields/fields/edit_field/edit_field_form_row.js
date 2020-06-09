"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditFieldFormRow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _shared_imports = require("../../../../shared_imports");

var _lib = require("../../../../lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EditFieldFormRow = _react.default.memo(function (_ref) {
  var title = _ref.title,
      description = _ref.description,
      docLink = _ref.docLink,
      defaultToggleValue = _ref.defaultToggleValue,
      formFieldPath = _ref.formFieldPath,
      children = _ref.children,
      _ref$withToggle = _ref.withToggle,
      withToggle = _ref$withToggle === void 0 ? true : _ref$withToggle,
      configPath = _ref.configPath;
  var form = (0, _shared_imports.useFormContext)();
  var initialVisibleState = withToggle === false ? true : defaultToggleValue !== undefined ? defaultToggleValue : formFieldPath !== undefined ? (0, _lib.getFieldConfig)(configPath ? configPath : formFieldPath).defaultValue : false;

  var _useState = (0, _react.useState)(initialVisibleState),
      _useState2 = _slicedToArray(_useState, 2),
      isContentVisible = _useState2[0],
      setIsContentVisible = _useState2[1];

  var isChildrenFunction = typeof children === 'function';

  var onToggle = function onToggle() {
    if (isContentVisible === true) {
      /**
       * We are hiding the children (and thus removing any form field from the DOM).
       * We need to reset the form to re-enable a possible disabled "save" button (from a previous validation error).
       */
      form.reset({
        resetValues: false
      });
    }

    setIsContentVisible(!isContentVisible);
  };

  var renderToggleInput = function renderToggleInput() {
    return formFieldPath === undefined ? _react.default.createElement(_eui.EuiSwitch, {
      label: title,
      checked: isContentVisible,
      onChange: onToggle,
      "data-test-subj": "input",
      showLabel: false
    }) : _react.default.createElement(_shared_imports.UseField, {
      path: formFieldPath,
      config: _objectSpread({}, (0, _lib.getFieldConfig)(configPath ? configPath : formFieldPath), {
        defaultValue: initialVisibleState
      })
    }, function (field) {
      return _react.default.createElement(_shared_imports.ToggleField, {
        field: field,
        euiFieldProps: {
          label: title,
          showLabel: false
        }
      });
    });
  };

  var renderContent = function renderContent() {
    var toggle = withToggle && _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      className: "mappingsEditor__editFieldFormRow__toggle"
    }, renderToggleInput());

    var controlsTitle = _react.default.createElement(_eui.EuiTitle, {
      size: "xs"
    }, _react.default.createElement("h3", null, title));

    var controlsDescription = description && _react.default.createElement(_eui.EuiText, {
      size: "s",
      color: "subdued",
      className: "mappingsEditor__editField__formRow__description"
    }, description);

    var controlsHeader = (controlsTitle || controlsDescription) && _react.default.createElement("div", {
      style: {
        paddingLeft: withToggle === false ? '0' : undefined
      }
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center",
      justifyContent: "spaceBetween"
    }, _react.default.createElement(_eui.EuiFlexItem, null, controlsTitle), docLink ? _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: docLink.text
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      href: docLink.href,
      target: "_blank",
      iconType: "help",
      "aria-label": docLink.text
    }))) : null), controlsDescription);

    var controls = (isContentVisible && children !== undefined || isChildrenFunction) && _react.default.createElement("div", {
      style: {
        paddingLeft: withToggle === false ? '0' : undefined
      }
    }, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), isChildrenFunction ? children(isContentVisible) : children);

    return _react.default.createElement(_eui.EuiFlexGroup, {
      className: "mappingsEditor__editField__formRow"
    }, toggle, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement("div", null, controlsHeader, controls)));
  };

  return formFieldPath ? _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: formFieldPath
  }, function (formData) {
    setIsContentVisible(formData[formFieldPath]);
    return renderContent();
  }) : renderContent();
});

exports.EditFieldFormRow = EditFieldFormRow;