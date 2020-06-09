"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadonlySettings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ReadonlySettings = function ReadonlySettings(_ref) {
  var repository = _ref.repository,
      updateRepositorySettings = _ref.updateRepositorySettings,
      settingErrors = _ref.settingErrors;
  var url = repository.settings.url;
  var hasErrors = Boolean(Object.keys(settingErrors).length);

  function getSchemeHelpText(scheme) {
    switch (scheme) {
      case 'http':
      case 'https':
      case 'ftp':
        return _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.repositoryForm.typeReadonly.urlWhitelistDescription",
          defaultMessage: "This URL must be registered in the {settingKey} setting.",
          values: {
            settingKey: _react.default.createElement(_eui.EuiCode, null, "repositories.url.allowed_urls")
          }
        });

      case 'file':
        return _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.repositoryForm.typeReadonly.urlFilePathDescription",
          defaultMessage: "This file location must be registered in the {settingKey} setting.",
          values: {
            settingKey: _react.default.createElement(_eui.EuiCode, null, "path.repo")
          }
        });

      default:
        return null;
    }
  }

  var schemeOptions = [{
    value: 'http',
    text: 'http://'
  }, {
    value: 'https',
    text: 'https://'
  }, {
    value: 'ftp',
    text: 'ftp://'
  }, {
    value: 'file',
    text: 'file://'
  }];

  var _useState = (0, _react.useState)(url ? url.split('://')[0] : 'http'),
      _useState2 = _slicedToArray(_useState, 2),
      selectedScheme = _useState2[0],
      selectScheme = _useState2[1];

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeReadonly.urlTitle",
      defaultMessage: "URL"
    }))),
    description: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeReadonly.urlDescription",
      defaultMessage: "The location of the snapshots."
    })),
    fullWidth: true
  }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeReadonly.urlSchemeLabel",
      defaultMessage: "Scheme"
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiSelect, {
    options: schemeOptions,
    value: selectedScheme,
    onChange: function onChange(e) {
      return selectScheme(e.target.value);
    },
    "aria-controls": "readonlyRepositoryUrlHelp",
    "data-test-subj": "schemeSelect"
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeReadonly.urlLabel",
      defaultMessage: "Path (required)"
    }),
    fullWidth: true,
    describedByIds: ['readonlyRepositoryUrlHelp'],
    isInvalid: Boolean(hasErrors && settingErrors.url),
    error: settingErrors.url
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: url ? url.split('://')[1] : '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        url: "".concat(selectedScheme, "://").concat(e.target.value)
      });
    },
    "data-test-subj": "urlInput"
  })))), _react.default.createElement(_eui.EuiFormHelpText, {
    id: "readonlyRepositoryUrlHelp",
    "aria-live": "polite"
  }, getSchemeHelpText(selectedScheme)))));
};

exports.ReadonlySettings = ReadonlySettings;