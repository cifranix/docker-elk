"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailActionFields = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _form_errors = require("../../../../../components/form_errors");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var EmailActionFields = function EmailActionFields(_ref) {
  var action = _ref.action,
      editAction = _ref.editAction,
      errors = _ref.errors,
      hasErrors = _ref.hasErrors;
  var to = action.to,
      subject = action.subject,
      body = action.body;
  var toOptions = to ? to.map(function (label) {
    return {
      label: label
    };
  }) : [];
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "emailRecipient",
    errorKey: "to",
    fullWidth: true,
    errors: errors,
    isShowingErrors: hasErrors && to !== null,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.emailAction.recipientTextFieldLabel', {
      defaultMessage: 'To email address'
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    noSuggestions: true,
    fullWidth: true,
    "data-test-subj": "toEmailAddressInput",
    selectedOptions: toOptions,
    onCreateOption: function onCreateOption(searchValue) {
      var newOptions = [].concat(_toConsumableArray(toOptions), [{
        label: searchValue
      }]);
      editAction({
        key: 'to',
        value: newOptions.map(function (newOption) {
          return newOption.label;
        })
      });
    },
    onChange: function onChange(selectedOptions) {
      editAction({
        key: 'to',
        value: selectedOptions.map(function (selectedOption) {
          return selectedOption.label;
        })
      });
    },
    onBlur: function onBlur() {
      if (!to) {
        editAction({
          key: 'to',
          value: []
        });
      }
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.emailAction.subjectTextFieldLabel', {
      defaultMessage: 'Subject (optional)'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "subject",
    "data-test-subj": "emailSubjectInput",
    value: subject || '',
    onChange: function onChange(e) {
      editAction({
        key: 'subject',
        value: e.target.value
      });
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.emailAction.bodyTextAreaFieldLabel', {
      defaultMessage: 'Body'
    })
  }, _react.default.createElement(_eui.EuiTextArea, {
    fullWidth: true,
    value: body || '',
    name: "body",
    "data-test-subj": "emailBodyInput",
    onChange: function onChange(e) {
      editAction({
        key: 'body',
        value: e.target.value
      });
    }
  })));
};

exports.EmailActionFields = EmailActionFields;