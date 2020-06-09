"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GCSDetails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var GCSDetails = function GCSDetails(_ref) {
  var repository = _ref.repository;
  var _repository$settings = repository.settings,
      bucket = _repository$settings.bucket,
      client = _repository$settings.client,
      basePath = _repository$settings.basePath,
      compress = _repository$settings.compress,
      chunkSize = _repository$settings.chunkSize,
      readonly = _repository$settings.readonly,
      maxRestoreBytesPerSec = _repository$settings.maxRestoreBytesPerSec,
      maxSnapshotBytesPerSec = _repository$settings.maxSnapshotBytesPerSec;
  var listItems = [{
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.typeGCS.bucketLabel",
      defaultMessage: "Bucket"
    }),
    description: bucket || ''
  }];

  if (client !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeGCS.clientLabel",
        defaultMessage: "Client"
      }),
      description: client
    });
  }

  if (basePath !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeGCS.basePathLabel",
        defaultMessage: "Base path"
      }),
      description: basePath
    });
  }

  if (compress !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeGCS.compressLabel",
        defaultMessage: "Snapshot compression"
      }),
      description: String(compress)
    });
  }

  if (chunkSize !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeGCS.chunkSizeLabel",
        defaultMessage: "Chunk size"
      }),
      description: String(chunkSize)
    });
  }

  if (maxSnapshotBytesPerSec !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeGCS.maxSnapshotBytesLabel",
        defaultMessage: "Max snapshot bytes per second"
      }),
      description: maxSnapshotBytesPerSec
    });
  }

  if (maxRestoreBytesPerSec !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeGCS.maxRestoreBytesLabel",
        defaultMessage: "Max restore bytes per second"
      }),
      description: maxRestoreBytesPerSec
    });
  }

  if (readonly !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeGCS.readonlyLabel",
        defaultMessage: "Read-only"
      }),
      description: String(readonly)
    });
  }

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

exports.GCSDetails = GCSDetails;