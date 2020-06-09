"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestoreSnapshotStepSettings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../constants");

var _documentation = require("../../../services/documentation");

var _app_context = require("../../../app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RestoreSnapshotStepSettings = function RestoreSnapshotStepSettings(_ref) {
  var restoreSettings = _ref.restoreSettings,
      updateRestoreSettings = _ref.updateRestoreSettings,
      errors = _ref.errors;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var indexSettings = restoreSettings.indexSettings,
      ignoreIndexSettings = restoreSettings.ignoreIndexSettings; // State for index setting toggles

  var _useState = (0, _react.useState)(Boolean(indexSettings)),
      _useState2 = _slicedToArray(_useState, 2),
      isUsingIndexSettings = _useState2[0],
      setIsUsingIndexSettings = _useState2[1];

  var _useState3 = (0, _react.useState)(Boolean(ignoreIndexSettings)),
      _useState4 = _slicedToArray(_useState3, 2),
      isUsingIgnoreIndexSettings = _useState4[0],
      setIsUsingIgnoreIndexSettings = _useState4[1]; // Caching state for togglable settings


  var _useState5 = (0, _react.useState)({
    indexSettings: indexSettings || '{}',
    ignoreIndexSettings: ignoreIndexSettings ? _toConsumableArray(ignoreIndexSettings) : []
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      cachedRestoreSettings = _useState6[0],
      setCachedRestoreSettings = _useState6[1]; // List of settings for ignore settings combobox suggestions, using a state because users can add custom settings


  var _useState7 = (0, _react.useState)(_toConsumableArray(new Set((ignoreIndexSettings || []).concat(_toConsumableArray(_constants.REMOVE_INDEX_SETTINGS_SUGGESTIONS).sort()))).map(function (setting) {
    return {
      label: setting
    };
  })),
      _useState8 = _slicedToArray(_useState7, 2),
      ignoreIndexSettingsOptions = _useState8[0],
      setIgnoreIndexSettingsOptions = _useState8[1]; // Index settings doc link


  var indexSettingsDocLink = _react.default.createElement(_eui.EuiLink, {
    href: _documentation.documentationLinksService.getIndexSettingsUrl(),
    target: "_blank"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.restoreForm.stepSettings.indexSettingsDocLinkText",
    defaultMessage: "Learn more."
  }));

  return _react.default.createElement("div", {
    className: "snapshotRestore__restoreForm__stepSettings"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.restoreForm.stepSettingsTitle",
    defaultMessage: "Index settings"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "right",
    href: _documentation.documentationLinksService.getRestoreIndexSettingsUrl(),
    target: "_blank",
    iconType: "help"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.restoreForm.stepSettings.docsButtonLabel",
    defaultMessage: "Index settings docs"
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepSettings.indexSettingsTitle",
      defaultMessage: "Modify index settings"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepSettings.indexSettingsDescription",
      defaultMessage: "Overrides index settings during restore. {docLink}",
      values: {
        docLink: indexSettingsDocLink
      }
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true,
    fullWidth: true
  }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSwitch, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepSettings.indexSettingsLabel",
      defaultMessage: "Modify index settings"
    }),
    checked: isUsingIndexSettings,
    onChange: function onChange(e) {
      var isChecked = e.target.checked;

      if (isChecked) {
        setIsUsingIndexSettings(true);
        updateRestoreSettings({
          indexSettings: cachedRestoreSettings.indexSettings
        });
      } else {
        setIsUsingIndexSettings(false);
        updateRestoreSettings({
          indexSettings: undefined
        });
      }
    }
  }), !isUsingIndexSettings ? null : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepSettings.indexSettingsEditorLabel",
      defaultMessage: "Index settings"
    }),
    fullWidth: true,
    isInvalid: Boolean(errors.indexSettings),
    error: errors.indexSettings,
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepSettings.indexSettingsEditorDescription",
      defaultMessage: "Use JSON format: {format}",
      values: {
        format: _react.default.createElement(_eui.EuiCode, null, '{ "index.number_of_replicas": 0 }')
      }
    })
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    mode: "json",
    theme: "textmate",
    width: "100%",
    value: indexSettings,
    setOptions: {
      showLineNumbers: false,
      tabSize: 2,
      maxLines: Infinity
    },
    editorProps: {
      $blockScrolling: Infinity
    },
    showGutter: false,
    minLines: 6,
    maxLines: 15,
    "aria-label": i18n.translate('xpack.snapshotRestore.restoreForm.stepSettings.indexSettingsAriaLabel', {
      defaultMessage: 'Index settings to modify'
    }),
    onChange: function onChange(value) {
      updateRestoreSettings({
        indexSettings: value
      });
      setCachedRestoreSettings(_objectSpread({}, cachedRestoreSettings, {
        indexSettings: value
      }));
    }
  })))))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepSettings.ignoreIndexSettingsTitle",
      defaultMessage: "Reset index settings"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepSettings.ignoreIndexSettingsDescription",
      defaultMessage: "Resets selected settings to default during restore. {docLink}",
      values: {
        docLink: indexSettingsDocLink
      }
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true,
    fullWidth: true
  }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSwitch, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepSettings.ignoreIndexSettingsLabel",
      defaultMessage: "Reset index settings"
    }),
    checked: isUsingIgnoreIndexSettings,
    onChange: function onChange(e) {
      var isChecked = e.target.checked;

      if (isChecked) {
        setIsUsingIgnoreIndexSettings(true);
        updateRestoreSettings({
          ignoreIndexSettings: _toConsumableArray(cachedRestoreSettings.ignoreIndexSettings || [])
        });
      } else {
        setIsUsingIgnoreIndexSettings(false);
        updateRestoreSettings({
          ignoreIndexSettings: undefined
        });
      }
    }
  }), !isUsingIgnoreIndexSettings ? null : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepSettings.selectIgnoreIndexSettingsLabel",
      defaultMessage: "Select settings"
    }),
    isInvalid: Boolean(errors.ignoreIndexSettings),
    error: errors.ignoreIndexSettings
  }, _react.default.createElement(_eui.EuiComboBox, {
    placeholder: i18n.translate('xpack.snapshotRestore.restoreForm.stepSettings.ignoreIndexSettingsPlaceholder', {
      defaultMessage: 'Select or type index settings'
    }),
    options: ignoreIndexSettingsOptions,
    selectedOptions: ignoreIndexSettings ? ignoreIndexSettingsOptions.filter(function (_ref2) {
      var label = _ref2.label;
      return ignoreIndexSettings.includes(label);
    }) : [],
    onChange: function onChange(selectedOptions) {
      var newIgnoreIndexSettings = selectedOptions.map(function (_ref3) {
        var label = _ref3.label;
        return label;
      });
      updateRestoreSettings({
        ignoreIndexSettings: newIgnoreIndexSettings
      });
      setCachedRestoreSettings(_objectSpread({}, cachedRestoreSettings, {
        ignoreIndexSettings: newIgnoreIndexSettings
      }));
    },
    onCreateOption: function onCreateOption(newIndexSetting, flattenedOptions) {
      var normalizedSettingName = newIndexSetting.trim().toLowerCase();

      if (!normalizedSettingName) {
        return;
      }

      var isCustomSetting = !Boolean(flattenedOptions.find(function (_ref4) {
        var label = _ref4.label;
        return label === normalizedSettingName;
      }));

      if (isCustomSetting) {
        setIgnoreIndexSettingsOptions([{
          label: normalizedSettingName
        }].concat(_toConsumableArray(ignoreIndexSettingsOptions)));
      }

      updateRestoreSettings({
        ignoreIndexSettings: [].concat(_toConsumableArray(ignoreIndexSettings || []), [normalizedSettingName])
      });
      setCachedRestoreSettings(_objectSpread({}, cachedRestoreSettings, {
        ignoreIndexSettings: [].concat(_toConsumableArray(ignoreIndexSettings || []), [normalizedSettingName])
      }));
    },
    isClearable: true
  })))))));
};

exports.RestoreSnapshotStepSettings = RestoreSnapshotStepSettings;