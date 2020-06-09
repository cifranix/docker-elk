"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceFieldSection = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _documentation = require("../../../../../services/documentation");

var _shared_imports = require("../../../shared_imports");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var SourceFieldSection = function SourceFieldSection() {
  var renderWarning = function renderWarning() {
    return _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.disabledSourceFieldCallOutTitle', {
        defaultMessage: 'Use caution when disabling the _source field'
      }),
      iconType: "alert",
      color: "warning"
    }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.disabledSourceFieldCallOutDescription1",
      defaultMessage: "Disabling {source} lowers storage overhead within the index, but this comes at a cost. It also disables important features, such as the ability to reindex or debug queries by viewing the original document.",
      values: {
        source: _react.default.createElement("code", null, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.disabledSourceFieldCallOutDescription1.sourceText', {
          defaultMessage: '_source'
        }))
      }
    })), _react.default.createElement("p", null, _react.default.createElement("a", {
      href: _documentation.documentationService.getDisablingMappingSourceFieldLink(),
      target: "_blank"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.disabledSourceFieldCallOutDescription2",
      defaultMessage: "Learn more about alternatives to disabling the {source} field.",
      values: {
        source: _react.default.createElement("code", null, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.disabledSourceFieldCallOutDescription2.sourceText', {
          defaultMessage: '_source'
        }))
      }
    }))));
  };

  var renderFormFields = function renderFormFields() {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_shared_imports.UseField, {
      path: "sourceField.includes"
    }, function (_ref) {
      var label = _ref.label,
          helpText = _ref.helpText,
          value = _ref.value,
          setValue = _ref.setValue;
      return _react.default.createElement(_eui.EuiFormRow, {
        label: label,
        helpText: helpText,
        fullWidth: true
      }, _react.default.createElement(_eui.EuiComboBox, {
        noSuggestions: true,
        placeholder: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.sourceIncludeField.placeholderLabel', {
          defaultMessage: 'path.to.field.*'
        }),
        selectedOptions: value,
        onChange: function onChange(newValue) {
          setValue(newValue);
        },
        onCreateOption: function onCreateOption(searchValue) {
          var newOption = {
            label: searchValue
          };
          setValue([].concat(_toConsumableArray(value), [newOption]));
        },
        fullWidth: true
      }));
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_shared_imports.UseField, {
      path: "sourceField.excludes"
    }, function (_ref2) {
      var label = _ref2.label,
          helpText = _ref2.helpText,
          value = _ref2.value,
          setValue = _ref2.setValue;
      return _react.default.createElement(_eui.EuiFormRow, {
        label: label,
        helpText: helpText,
        fullWidth: true
      }, _react.default.createElement(_eui.EuiComboBox, {
        noSuggestions: true,
        placeholder: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.sourceExcludeField.placeholderLabel', {
          defaultMessage: 'path.to.field.*'
        }),
        selectedOptions: value,
        onChange: function onChange(newValue) {
          setValue(newValue);
        },
        onCreateOption: function onCreateOption(searchValue) {
          var newOption = {
            label: searchValue
          };
          setValue([].concat(_toConsumableArray(value), [newOption]));
        },
        fullWidth: true
      }));
    }));
  };

  return _react.default.createElement(_shared_imports.FormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.sourceFieldTitle', {
      defaultMessage: '_source field'
    }),
    description: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.sourceFieldDescription",
      defaultMessage: "The _source field contains the original JSON document body that was provided at index time. Individual fields can be pruned by defining which ones to include or exclude from the _source field. {docsLink}",
      values: {
        docsLink: _react.default.createElement(_eui.EuiLink, {
          href: _documentation.documentationService.getMappingSourceFieldLink(),
          target: "_blank"
        }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.sourceFieldDocumentionLink', {
          defaultMessage: 'Learn more.'
        }))
      }
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_shared_imports.UseField, {
      path: "sourceField.enabled",
      component: _shared_imports.ToggleField
    }))
  }, _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: ['sourceField.enabled']
  }, function (formData) {
    var enabled = formData['sourceField.enabled'];

    if (enabled === undefined) {
      return null;
    }

    return enabled ? renderFormFields() : renderWarning();
  }));
};

exports.SourceFieldSection = SourceFieldSection;