"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HDFSDetails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var HDFSDetails = function HDFSDetails(_ref) {
  var repository = _ref.repository;
  var settings = repository.settings;

  var uri = settings.uri,
      path = settings.path,
      loadDefaults = settings.loadDefaults,
      compress = settings.compress,
      chunkSize = settings.chunkSize,
      readonly = settings.readonly,
      maxSnapshotBytesPerSec = settings.maxSnapshotBytesPerSec,
      maxRestoreBytesPerSec = settings.maxRestoreBytesPerSec,
      securityPrincipal = settings['security.principal'],
      rest = _objectWithoutProperties(settings, ["uri", "path", "loadDefaults", "compress", "chunkSize", "readonly", "maxSnapshotBytesPerSec", "maxRestoreBytesPerSec", "security.principal"]);

  var listItems = [{
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.uriLabel",
      defaultMessage: "URI"
    }),
    description: uri || ''
  }, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.pathLabel",
      defaultMessage: "Path"
    }),
    description: path || ''
  }];

  if (loadDefaults !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.loadDefaultsLabel",
        defaultMessage: "Load defaults"
      }),
      description: String(loadDefaults)
    });
  }

  if (compress !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.compressLabel",
        defaultMessage: "Snapshot compression"
      }),
      description: String(compress)
    });
  }

  if (chunkSize !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.chunkSizeLabel",
        defaultMessage: "Chunk size"
      }),
      description: String(chunkSize)
    });
  }

  if (maxSnapshotBytesPerSec !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.maxSnapshotBytesLabel",
        defaultMessage: "Max snapshot bytes per second"
      }),
      description: maxSnapshotBytesPerSec
    });
  }

  if (maxRestoreBytesPerSec !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.maxRestoreBytesLabel",
        defaultMessage: "Max restore bytes per second"
      }),
      description: maxRestoreBytesPerSec
    });
  }

  if (readonly !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.readonlyLabel",
        defaultMessage: "Read-only"
      }),
      description: String(readonly)
    });
  }

  if (securityPrincipal !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.securityPrincipalLabel",
        defaultMessage: "Security principal"
      }),
      description: securityPrincipal
    });
  }

  Object.keys(rest).forEach(function (key) {
    listItems.push({
      title: _react.default.createElement(_react.Fragment, null, key),
      description: String(settings[key])
    });
  });
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.repositoryDetails.settingsTitle",
    defaultMessage: "Settings"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiDescriptionList, {
    textStyle: "reverse",
    listItems: listItems
  }));
};

exports.HDFSDetails = HDFSDetails;