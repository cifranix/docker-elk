"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlTemplateForm = UrlTemplateForm;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _classnames = _interopRequireDefault(require("classnames"));

var _legacy_icon = require("../legacy_icon");

var _outlink_encoders = require("../../helpers/outlink_encoders");

var _style_choices = require("../../helpers/style_choices");

var _url_template = require("../../helpers/url_template");

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isUpdateForm(props) {
  return 'initialTemplate' in props;
}

function UrlTemplateForm(props) {
  var _onSubmit = props.onSubmit;

  var getInitialTemplate = function getInitialTemplate() {
    return isUpdateForm(props) ? props.initialTemplate : {
      encoder: _outlink_encoders.outlinkEncoders[0],
      icon: null,
      description: '',
      url: ''
    };
  };

  var _useState = (0, _react.useState)(getInitialTemplate),
      _useState2 = _slicedToArray(_useState, 2),
      currentTemplate = _useState2[0],
      setCurrentTemplate = _useState2[1];

  var persistedTemplateState = isUpdateForm(props) && props.initialTemplate; // reset local form if template passed in from parent component changes

  (0, _react.useEffect)(function () {
    if (isUpdateForm(props) && currentTemplate !== props.initialTemplate) {
      setCurrentTemplate(props.initialTemplate);
    } // this hook only updates on change of the prop
    // it's meant to reset the internal state on changes outside of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [persistedTemplateState]);

  var _useState3 = (0, _react.useState)({
    description: false,
    url: false
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      touched = _useState4[0],
      setTouched = _useState4[1];

  var _useState5 = (0, _react.useState)(!isUpdateForm(props)),
      _useState6 = _slicedToArray(_useState5, 2),
      open = _useState6[0],
      setOpen = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      autoformatUrl = _useState8[0],
      setAutoformatUrl = _useState8[1];

  function setValue(key, value) {
    setCurrentTemplate(_objectSpread({}, currentTemplate, _defineProperty({}, key, value)));
  }

  function reset() {
    setTouched({
      description: false,
      url: false
    });
    setCurrentTemplate(getInitialTemplate());
    setAutoformatUrl(false);
  }

  function convertUrl() {
    setCurrentTemplate(_objectSpread({}, currentTemplate, {
      url: (0, _url_template.replaceKibanaUrlParam)(currentTemplate.url),
      // reset to kql encoder
      encoder: currentTemplate.encoder.type === 'kql' ? currentTemplate.encoder : _outlink_encoders.outlinkEncoders.find(function (enc) {
        return enc.type === 'kql';
      })
    }));
    setAutoformatUrl(false);
  }

  var urlPlaceholderMissing = Boolean(currentTemplate.url && !(0, _url_template.isUrlTemplateValid)(currentTemplate.url));
  var formIncomplete = !Boolean(currentTemplate.description && currentTemplate.url);
  var formUntouched = (0, _helpers.isEqual)(currentTemplate, getInitialTemplate());
  return _react.default.createElement(_eui.EuiAccordion, {
    id: props.id,
    initialIsOpen: !isUpdateForm(props),
    buttonContent: isUpdateForm(props) ? props.initialTemplate.description : _i18n.i18n.translate('xpack.graph.templates.addLabel', {
      defaultMessage: 'New drilldown'
    }),
    extraAction: isUpdateForm(props) && props.initialTemplate.icon && _react.default.createElement(_legacy_icon.LegacyIcon, {
      asListIcon: true,
      icon: props.initialTemplate.icon
    }),
    className: (0, _classnames.default)('gphUrlTemplateList__accordion', {
      'gphUrlTemplateList__accordion--isOpen': open
    }),
    buttonClassName: "gphUrlTemplateList__accordionbutton",
    onToggle: function onToggle(isOpen) {
      setOpen(isOpen);
    },
    paddingSize: "m"
  }, _react.default.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();

      _onSubmit(currentTemplate);

      if (!isUpdateForm(props)) {
        reset();
      }
    }
  }, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.graph.settings.drillDowns.urlDescriptionInputLabel', {
      defaultMessage: 'Title'
    }),
    isInvalid: touched.description && !currentTemplate.description,
    onBlur: function onBlur() {
      return setTouched(_objectSpread({}, touched, {
        description: true
      }));
    }
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    value: currentTemplate.description,
    isInvalid: touched.description && !currentTemplate.description,
    onChange: function onChange(e) {
      return setValue('description', e.target.value);
    },
    placeholder: _i18n.i18n.translate('xpack.graph.settings.drillDowns.urlDescriptionInputPlaceholder', {
      defaultMessage: 'Search on Google'
    })
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.graph.settings.drillDowns.urlInputLabel', {
      defaultMessage: 'URL'
    }),
    helpText: _react.default.createElement(_react.default.Fragment, null, autoformatUrl && _react.default.createElement("p", null, _react.default.createElement("strong", null, _i18n.i18n.translate('xpack.graph.settings.drillDowns.kibanaUrlWarningText', {
      defaultMessage: 'Possible Kibana URL pasted, '
    }), _react.default.createElement(_eui.EuiLink, {
      onClick: convertUrl
    }, _react.default.createElement("strong", null, _i18n.i18n.translate('xpack.graph.settings.drillDowns.kibanaUrlWarningConvertOptionLinkText', {
      defaultMessage: 'convert it.'
    }))))), _i18n.i18n.translate('xpack.graph.settings.drillDowns.urlInputHelpText', {
      defaultMessage: 'Define template URLs using {gquery} where the selected vertex terms are inserted.',
      values: {
        gquery: '{{gquery}}'
      }
    })),
    onBlur: function onBlur() {
      return setTouched(_objectSpread({}, touched, {
        url: true
      }));
    },
    isInvalid: urlPlaceholderMissing || touched.url && !currentTemplate.url,
    error: urlPlaceholderMissing ? [_i18n.i18n.translate('xpack.graph.settings.drillDowns.invalidUrlWarningText', {
      defaultMessage: 'The URL must contain a {placeholder} string.',
      values: {
        placeholder: '{{gquery}}'
      }
    })] : []
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    placeholder: "https://www.google.co.uk/#q={{gquery}}",
    value: currentTemplate.url,
    onChange: function onChange(e) {
      setValue('url', e.target.value);
      setAutoformatUrl(false);
    },
    onPaste: function onPaste(e) {
      e.preventDefault();
      var pastedUrl = e.clipboardData.getData('text/plain');

      if ((0, _url_template.isKibanaUrl)(pastedUrl)) {
        setAutoformatUrl(true);
      }

      setValue('url', pastedUrl);
    },
    isInvalid: urlPlaceholderMissing || touched.url && !currentTemplate.url
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    helpText: currentTemplate.encoder.description,
    label: _i18n.i18n.translate('xpack.graph.settings.drillDowns.urlEncoderInputLabel', {
      defaultMessage: 'URL parameter type'
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    fullWidth: true,
    singleSelection: {
      asPlainText: true
    },
    isClearable: false,
    options: _outlink_encoders.outlinkEncoders.map(function (encoder) {
      return {
        label: encoder.title,
        value: encoder
      };
    }),
    selectedOptions: [{
      label: currentTemplate.encoder.title,
      value: currentTemplate.encoder
    }],
    onChange: function onChange(choices) {
      // choices[0].value can't be null because `isClearable` is set to false above
      setValue('encoder', choices[0].value);
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.graph.settings.drillDowns.toolbarIconPickerLabel', {
      defaultMessage: 'Toolbar icon'
    })
  }, _react.default.createElement("div", {
    role: "listbox"
  }, _style_choices.urlTemplateIconChoices.map(function (icon) {
    return _react.default.createElement(_legacy_icon.LegacyIcon, {
      key: icon.class,
      selected: icon === currentTemplate.icon,
      icon: icon,
      onClick: function onClick() {
        if (currentTemplate.icon === icon) {
          setValue('icon', null);
        } else {
          setValue('icon', icon);
        }
      }
    });
  }))), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "danger",
    onClick: function onClick() {
      props.onRemove();
    },
    "data-test-subj": "graphRemoveUrlTemplate"
  }, isUpdateForm(props) ? _i18n.i18n.translate('xpack.graph.settings.drillDowns.removeButtonLabel', {
    defaultMessage: 'Remove'
  }) : _i18n.i18n.translate('xpack.graph.settings.drillDowns.cancelButtonLabel', {
    defaultMessage: 'Cancel'
  }))), _react.default.createElement(_eui.EuiFlexItem, null), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: reset,
    disabled: formUntouched
  }, _i18n.i18n.translate('xpack.graph.settings.drillDowns.resetButtonLabel', {
    defaultMessage: 'Reset'
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    type: "submit",
    fill: true,
    isDisabled: urlPlaceholderMissing || formIncomplete
  }, isUpdateForm(props) ? _i18n.i18n.translate('xpack.graph.settings.drillDowns.updateSaveButtonLabel', {
    defaultMessage: 'Update drilldown'
  }) : _i18n.i18n.translate('xpack.graph.settings.drillDowns.newSaveButtonLabel', {
    defaultMessage: 'Save drilldown'
  }))))));
}