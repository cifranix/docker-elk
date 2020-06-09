"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FSDetails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FSDetails = function FSDetails(_ref) {
  var repository = _ref.repository;
  var _repository$settings = repository.settings,
      location = _repository$settings.location,
      compress = _repository$settings.compress,
      chunkSize = _repository$settings.chunkSize,
      maxRestoreBytesPerSec = _repository$settings.maxRestoreBytesPerSec,
      maxSnapshotBytesPerSec = _repository$settings.maxSnapshotBytesPerSec,
      readonly = _repository$settings.readonly;
  var listItems = [{
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryDetails.typeFS.locationLabel",
      defaultMessage: "Location"
    }),
    description: location
  }];

  if (compress !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeFS.compressLabel",
        defaultMessage: "Snapshot compression"
      }),
      description: String(compress)
    });
  }

  if (chunkSize !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeFS.chunkSizeLabel",
        defaultMessage: "Chunk size"
      }),
      description: String(chunkSize)
    });
  }

  if (maxSnapshotBytesPerSec !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeFS.maxSnapshotBytesLabel",
        defaultMessage: "Max snapshot bytes per second"
      }),
      description: maxSnapshotBytesPerSec
    });
  }

  if (maxRestoreBytesPerSec !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeFS.maxRestoreBytesLabel",
        defaultMessage: "Max restore bytes per second"
      }),
      description: maxRestoreBytesPerSec
    });
  }

  if (readonly !== undefined) {
    listItems.push({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryDetails.typeFS.readonlyLabel",
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

exports.FSDetails = FSDetails;