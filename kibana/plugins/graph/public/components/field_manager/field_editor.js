"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldEditor = FieldEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _classnames = _interopRequireDefault(require("classnames"));

var _style_choices = require("../../helpers/style_choices");

var _legacy_icon = require("../legacy_icon");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function FieldEditor(_ref) {
  var initialField = _ref.field,
      updateFieldProperties = _ref.updateFieldProperties,
      selectField = _ref.selectField,
      deselectField = _ref.deselectField,
      allFields = _ref.allFields;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(initialField),
      _useState4 = _slicedToArray(_useState3, 2),
      currentField = _useState4[0],
      setCurrentField = _useState4[1];

  var color = currentField.color,
      hopSize = currentField.hopSize,
      lastValidHopSize = currentField.lastValidHopSize,
      icon = currentField.icon,
      fieldName = currentField.name;
  var isDisabled = initialField.hopSize === 0; // update local field copy if changed from the outside

  (0, _react.useEffect)(function () {
    if (currentField !== initialField) {
      setCurrentField(initialField);
    } // this hook only updates on change of the prop
    // it's meant to reset the internal state on changes outside of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [initialField]);

  function updateField() {
    var name = currentField.name,
        selected = currentField.selected,
        type = currentField.type,
        updatableProperties = _objectWithoutProperties(currentField, ["name", "selected", "type"]);

    if (fieldName !== initialField.name) {
      deselectField(initialField.name);
      selectField(fieldName);
    }

    updateFieldProperties({
      fieldName: fieldName,
      fieldProperties: updatableProperties
    });
    setOpen(false);
  }

  function updateProp(name, value) {
    setCurrentField(_objectSpread({}, currentField, _defineProperty({}, name, value)));
  }

  function toggleDisabledState() {
    updateFieldProperties({
      fieldName: initialField.name,
      fieldProperties: {
        hopSize: isDisabled ? initialField.lastValidHopSize : 0,
        lastValidHopSize: isDisabled ? 0 : initialField.hopSize
      }
    });
    setOpen(false);
  }

  var badgeDescription = isDisabled ? _i18n.i18n.translate('xpack.graph.fieldManager.disabledFieldBadgeDescription', {
    defaultMessage: 'Disabled field {field}: Click to configure. Shift+click to enable',
    values: {
      field: fieldName
    }
  }) : _i18n.i18n.translate('xpack.graph.fieldManager.fieldBadgeDescription', {
    defaultMessage: 'Field {field}: Click to configure. Shift+click to disable',
    values: {
      field: fieldName
    }
  });
  return _react.default.createElement(_eui.EuiPopover, {
    id: "graphFieldEditor",
    anchorPosition: "downLeft",
    ownFocus: true,
    panelPaddingSize: "none",
    button: _react.default.createElement(_eui.EuiBadge, {
      color: initialField.color,
      iconSide: "right",
      className: (0, _classnames.default)('gphFieldEditor__badge', {
        'gphFieldEditor__badge--disabled': isDisabled
      }),
      onClickAriaLabel: badgeDescription,
      title: "",
      onClick: function onClick(e) {
        if (e.shiftKey) {
          toggleDisabledState();
        } else {
          setOpen(true);
        }
      }
    }, _react.default.createElement(_legacy_icon.LegacyIcon, {
      className: 'gphFieldEditor__badgeIcon',
      icon: initialField.icon
    }), initialField.name),
    isOpen: open,
    closePopover: function closePopover() {
      return setOpen(false);
    }
  }, _react.default.createElement(_eui.EuiContextMenu, {
    initialPanelId: "root",
    panels: [{
      id: 'root',
      items: [{
        name: _i18n.i18n.translate('xpack.graph.fieldManager.settingsLabel', {
          defaultMessage: 'Edit settings'
        }),
        icon: _react.default.createElement(_eui.EuiIcon, {
          type: "pencil",
          size: "m"
        }),
        panel: 'settings'
      }, {
        name: isDisabled ? _i18n.i18n.translate('xpack.graph.fieldManager.enableFieldLabel', {
          defaultMessage: 'Enable field'
        }) : _i18n.i18n.translate('xpack.graph.fieldManager.disableFieldLabel', {
          defaultMessage: 'Disable field'
        }),
        icon: _react.default.createElement(_eui.EuiIcon, {
          type: isDisabled ? 'eye' : 'eyeClosed',
          size: "m"
        }),
        onClick: toggleDisabledState,
        toolTipContent: isDisabled ? _i18n.i18n.translate('xpack.graph.fieldManager.enableFieldTooltipContent', {
          defaultMessage: 'Turn on discovery of vertices for this field. You can also Shift+click the field to enable it.'
        }) : _i18n.i18n.translate('xpack.graph.fieldManager.disableFieldTooltipContent', {
          defaultMessage: 'Turn off discovery of vertices for this field. You can also Shift+click the field to disable it.'
        })
      }, {
        name: _i18n.i18n.translate('xpack.graph.fieldManager.deleteFieldLabel', {
          defaultMessage: 'Deselect field'
        }),
        toolTipContent: _i18n.i18n.translate('xpack.graph.fieldManager.deleteFieldTooltipContent', {
          defaultMessage: 'No new vertices for this field will be discovered.  Existing vertices remain in the graph.'
        }),
        icon: _react.default.createElement(_eui.EuiIcon, {
          type: "trash",
          size: "m"
        }),
        onClick: function onClick() {
          deselectField(initialField.name);
          setOpen(false);
        }
      }]
    }, {
      id: 'settings',
      title: _i18n.i18n.translate('xpack.graph.fieldManager.settingsFormTitle', {
        defaultMessage: 'Edit'
      }),
      width: 380,
      content: _react.default.createElement(_eui.EuiForm, {
        className: "gphFieldEditor__displayForm"
      }, _react.default.createElement(_eui.EuiKeyboardAccessible, null, _react.default.createElement("span", {
        style: {
          opacity: 0
        },
        onClick: function onClick() {},
        onKeyPress: function onKeyPress() {}
      })), _react.default.createElement(_eui.EuiFormRow, {
        display: "columnCompressed",
        label: _i18n.i18n.translate('xpack.graph.fieldManager.fieldLabel', {
          defaultMessage: 'Field'
        })
      }, _react.default.createElement(_eui.EuiComboBox, {
        onChange: function onChange(choices) {
          // value is always defined because it's an unclearable single selection
          var newFieldName = choices[0].value;
          updateProp('name', newFieldName);
        },
        singleSelection: {
          asPlainText: true
        },
        isClearable: false,
        options: toOptions(allFields, initialField),
        selectedOptions: [{
          value: currentField.name,
          label: currentField.name,
          type: currentField.type
        }],
        renderOption: function renderOption(option, searchValue, contentClassName) {
          var type = option.type,
              label = option.label;
          return _react.default.createElement(_eui.EuiFlexGroup, {
            className: contentClassName,
            gutterSize: "s",
            alignItems: "center"
          }, _react.default.createElement(_eui.EuiFlexItem, {
            grow: null
          }, _react.default.createElement(_public.FieldIcon, {
            type: type,
            fill: "none"
          })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiHighlight, {
            search: searchValue
          }, label)));
        },
        compressed: true
      })), _react.default.createElement(_eui.EuiFormRow, {
        display: "columnCompressed",
        label: _i18n.i18n.translate('xpack.graph.fieldManager.colorLabel', {
          defaultMessage: 'Color'
        })
      }, _react.default.createElement(_eui.EuiColorPicker, {
        color: color,
        onChange: function onChange(newColor) {
          updateProp('color', newColor);
        },
        compressed: true
      })), _react.default.createElement(_eui.EuiFormRow, {
        display: "columnCompressed",
        label: _i18n.i18n.translate('xpack.graph.fieldManager.iconLabel', {
          defaultMessage: 'Icon'
        })
      }, _react.default.createElement(_eui.EuiComboBox, {
        fullWidth: true,
        singleSelection: {
          asPlainText: true
        },
        isClearable: false,
        renderOption: function renderOption(option, searchValue, contentClassName) {
          var label = option.label,
              value = option.value;
          return _react.default.createElement("span", {
            className: contentClassName
          }, _react.default.createElement(_legacy_icon.LegacyIcon, {
            icon: value
          }), ' ', _react.default.createElement(_eui.EuiHighlight, {
            search: searchValue
          }, label));
        },
        options: _style_choices.iconChoices.map(function (currentIcon) {
          return {
            label: currentIcon.label,
            value: currentIcon
          };
        }),
        selectedOptions: [{
          label: icon.label,
          value: icon
        }],
        onChange: function onChange(choices) {
          updateProp('icon', choices[0].value);
        },
        compressed: true
      })), _react.default.createElement(_eui.EuiFormRow, {
        display: "columnCompressed",
        label: _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.graph.fieldManager.maxTermsPerHopLabel', {
          defaultMessage: 'Terms per hop'
        }), ' ', _react.default.createElement(_eui.EuiIconTip, {
          content: _i18n.i18n.translate('xpack.graph.fieldManager.maxTermsPerHopDescription', {
            defaultMessage: 'Controls the maximum number of terms to return for each search step.'
          }),
          position: "right"
        }))
      }, _react.default.createElement(_eui.EuiFieldNumber, {
        step: 1,
        min: 1,
        value: isDisabled ? lastValidHopSize : hopSize,
        onChange: function onChange(_ref2) {
          var valueAsNumber = _ref2.target.valueAsNumber;
          var updatedHopSize = Number.isNaN(valueAsNumber) ? 1 : valueAsNumber;
          updateProp(isDisabled ? 'lastValidHopSize' : 'hopSize', updatedHopSize);
        },
        compressed: true
      })), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_eui.EuiFlexGroup, {
        direction: "row",
        justifyContent: "flexEnd"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        size: "s",
        onClick: function onClick() {
          setCurrentField(initialField);
          setOpen(false);
        }
      }, _i18n.i18n.translate('xpack.graph.fieldManager.cancelLabel', {
        defaultMessage: 'Cancel'
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        size: "s",
        fill: true,
        disabled: (0, _helpers.isEqual)(initialField, currentField),
        onClick: updateField
      }, _i18n.i18n.translate('xpack.graph.fieldManager.updateLabel', {
        defaultMessage: 'Save changes'
      })))))
    }]
  }));
}

function toOptions(fields, currentField) {
  return fields.filter(function (field) {
    return !field.selected || field === currentField;
  }).map(function (_ref3) {
    var name = _ref3.name,
        type = _ref3.type;
    return {
      label: name,
      value: name,
      type: type
    };
  });
}