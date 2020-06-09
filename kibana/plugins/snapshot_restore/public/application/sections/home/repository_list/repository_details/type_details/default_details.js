"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultDetails = void 0;

require("brace/theme/textmate");

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DefaultDetails = function DefaultDetails(_ref) {
  var _ref$repository = _ref.repository,
      name = _ref$repository.name,
      settings = _ref$repository.settings;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.repositoryDetails.settingsTitle",
    defaultMessage: "Settings"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiCodeEditor, {
    mode: "json",
    theme: "textmate",
    width: "100%",
    isReadOnly: true,
    value: JSON.stringify(settings, null, 2),
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
    "aria-label": _i18n.i18n.translate('xpack.snapshotRestore.repositoryDetails.genericSettingsDescription', {
      defaultMessage: "Readonly settings for repository '{name}'",
      values: {
        name: name
      }
    })
  }));
};

exports.DefaultDetails = DefaultDetails;