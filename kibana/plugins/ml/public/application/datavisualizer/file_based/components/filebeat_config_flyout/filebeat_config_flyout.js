"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilebeatConfigFlyout = exports.EDITOR_MODE = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _filebeat_config = require("./filebeat_config");

var _kibana = require("../../../../contexts/kibana");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EDITOR_MODE;
exports.EDITOR_MODE = EDITOR_MODE;

(function (EDITOR_MODE) {
  EDITOR_MODE[EDITOR_MODE["HIDDEN"] = 0] = "HIDDEN";
  EDITOR_MODE[EDITOR_MODE["READONLY"] = 1] = "READONLY";
  EDITOR_MODE[EDITOR_MODE["EDITABLE"] = 2] = "EDITABLE";
})(EDITOR_MODE || (exports.EDITOR_MODE = EDITOR_MODE = {}));

var FilebeatConfigFlyout = function FilebeatConfigFlyout(_ref) {
  var index = _ref.index,
      results = _ref.results,
      indexPatternId = _ref.indexPatternId,
      ingestPipelineId = _ref.ingestPipelineId,
      closeFlyout = _ref.closeFlyout;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      fileBeatConfig = _useState2[0],
      setFileBeatConfig = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      username = _useState4[0],
      setUsername = _useState4[1];

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      security = _useMlKibana.services.security;

  (0, _react.useEffect)(function () {
    if (security !== undefined) {
      security.authc.getCurrentUser().then(function (user) {
        setUsername(user.username === undefined ? null : user.username);
      });
    }
  }, []);
  (0, _react.useEffect)(function () {
    var config = (0, _filebeat_config.createFilebeatConfig)(index, results, ingestPipelineId, username);
    setFileBeatConfig(config);
  }, [username]);
  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: closeFlyout,
    hideCloseButton: true,
    size: 'm'
  }, _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(Contents, {
    value: fileBeatConfig,
    username: username,
    index: index
  }))), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "cross",
    onClick: closeFlyout,
    flush: "left"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fileDatavisualizer.fileBeatConfigFlyout.closeButton",
    defaultMessage: "Close"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiCopy, {
    textToCopy: fileBeatConfig
  }, function (copy) {
    return _react.default.createElement(_eui.EuiButton, {
      onClick: copy
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.fileDatavisualizer.fileBeatConfigFlyout.copyButton",
      defaultMessage: "Copy to clipboard"
    }));
  })))));
};

exports.FilebeatConfigFlyout = FilebeatConfigFlyout;

var Contents = function Contents(_ref2) {
  var value = _ref2.value,
      index = _ref2.index,
      username = _ref2.username;
  return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h5", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fileDatavisualizer.resultsLinks.fileBeatConfigTitle",
    defaultMessage: "Filebeat configuration"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fileDatavisualizer.resultsLinks.fileBeatConfigTopText1",
    defaultMessage: "Additional data can be uploaded to the {index} index using Filebeat.",
    values: {
      index: _react.default.createElement(_eui.EuiCode, null, index)
    }
  })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fileDatavisualizer.resultsLinks.fileBeatConfigTopText2",
    defaultMessage: "Modify {filebeatYml} to set the connection information:",
    values: {
      filebeatYml: _react.default.createElement(_eui.EuiCode, null, "filebeat.yml")
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiCodeBlock, {
    language: "bash"
  }, value), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement("p", null, username === null ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fileDatavisualizer.resultsLinks.fileBeatConfigBottomTextNoUsername",
    defaultMessage: "Where {esUrl} is the URL of Elasticsearch.",
    values: {
      esUrl: _react.default.createElement(_eui.EuiCode, null, '<es_url>')
    }
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fileDatavisualizer.resultsLinks.fileBeatConfigBottomText",
    defaultMessage: "Where {password} is the password of the {user} user, {esUrl} is the URL of Elasticsearch.",
    values: {
      user: _react.default.createElement(_eui.EuiCode, null, username),
      password: _react.default.createElement(_eui.EuiCode, null, '<password>'),
      esUrl: _react.default.createElement(_eui.EuiCode, null, '<es_url>')
    }
  })));
};