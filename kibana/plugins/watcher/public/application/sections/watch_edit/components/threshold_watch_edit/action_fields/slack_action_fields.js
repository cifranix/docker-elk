"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlackActionFields = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var SlackActionFields = function SlackActionFields(_ref) {
  var action = _ref.action,
      editAction = _ref.editAction,
      children = _ref.children;
  var text = action.text,
      to = action.to;
  var toOptions = to ? to.map(function (label) {
    return {
      label: label
    };
  }) : [];
  return _react.default.createElement(_react.Fragment, null, children, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.slackAction.recipientTextFieldLabel', {
      defaultMessage: 'Recipient (optional)'
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    noSuggestions: true,
    fullWidth: true,
    selectedOptions: toOptions,
    "data-test-subj": "slackRecipientComboBox",
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
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.slackAction.messageTextAreaFieldLabel', {
      defaultMessage: 'Message (optional)'
    })
  }, _react.default.createElement(_eui.EuiTextArea, {
    fullWidth: true,
    name: "text",
    value: text,
    "data-test-subj": "slackMessageTextarea",
    onChange: function onChange(e) {
      editAction({
        key: 'text',
        value: e.target.value
      });
    }
  })));
};

exports.SlackActionFields = SlackActionFields;