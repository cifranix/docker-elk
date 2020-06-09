"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FSSettings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _text = require("../../../services/text");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FSSettings = function FSSettings(_ref) {
  var repository = _ref.repository,
      updateRepositorySettings = _ref.updateRepositorySettings,
      settingErrors = _ref.settingErrors;
  var _repository$settings = repository.settings,
      location = _repository$settings.location,
      compress = _repository$settings.compress,
      chunkSize = _repository$settings.chunkSize,
      maxRestoreBytesPerSec = _repository$settings.maxRestoreBytesPerSec,
      maxSnapshotBytesPerSec = _repository$settings.maxSnapshotBytesPerSec,
      readonly = _repository$settings.readonly;
  var hasErrors = Boolean(Object.keys(settingErrors).length);
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.locationTitle",
      defaultMessage: "File system location"
    }))),
    description: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryFor.typeFS.locationDescription",
      defaultMessage: "The location must be registered in the {settingKey} setting on all master and data nodes.",
      values: {
        settingKey: _react.default.createElement(_eui.EuiCode, null, "path.repo")
      }
    })),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.locationLabel",
      defaultMessage: "Location (required)"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.location),
    error: settingErrors.location
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: location || '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        location: e.target.value
      });
    },
    "data-test-subj": "locationInput"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.compressTitle",
      defaultMessage: "Snapshot compression"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.compressDescription",
      defaultMessage: "Compresses the index mapping and setting files for snapshots. Data files are not compressed."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true,
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.compress),
    error: settingErrors.compress
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.compressLabel",
      defaultMessage: "Compress snapshots"
    }),
    checked: !!compress,
    onChange: function onChange(e) {
      updateRepositorySettings({
        compress: e.target.checked
      });
    },
    "data-test-subj": "compressToggle"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.chunkSizeTitle",
      defaultMessage: "Chunk size"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.chunkSizeDescription",
      defaultMessage: "Breaks files into smaller units when taking snapshots."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.chunkSizeLabel",
      defaultMessage: "Chunk size"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.chunkSize),
    error: settingErrors.chunkSize,
    helpText: _text.textService.getSizeNotationHelpText()
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: chunkSize || '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        chunkSize: e.target.value
      });
    },
    "data-test-subj": "chunkSizeInput"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.maxSnapshotBytesTitle",
      defaultMessage: "Max snapshot bytes per second"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.maxSnapshotBytesDescription",
      defaultMessage: "The rate for creating snapshots for each node."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.maxSnapshotBytesLabel",
      defaultMessage: "Max snapshot bytes per second"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.maxSnapshotBytesPerSec),
    error: settingErrors.maxSnapshotBytesPerSec,
    helpText: _text.textService.getSizeNotationHelpText()
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: maxSnapshotBytesPerSec || '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        maxSnapshotBytesPerSec: e.target.value
      });
    },
    "data-test-subj": "maxSnapshotBytesInput"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.maxRestoreBytesTitle",
      defaultMessage: "Max restore bytes per second"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.maxRestoreBytesDescription",
      defaultMessage: "The snapshot restore rate for each node."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.maxRestoreBytesLabel",
      defaultMessage: "Max restore bytes per second"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.maxRestoreBytesPerSec),
    error: settingErrors.maxRestoreBytesPerSec,
    helpText: _text.textService.getSizeNotationHelpText()
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: maxRestoreBytesPerSec || '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        maxRestoreBytesPerSec: e.target.value
      });
    },
    "data-test-subj": "maxRestoreBytesInput"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.readonlyTitle",
      defaultMessage: "Read-only"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.readonlyDescription",
      defaultMessage: "Only one cluster should have write access to this repository. All other clusters should be read-only."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true,
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.readonly),
    error: settingErrors.readonly
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeFS.readonlyLabel",
      defaultMessage: "Read-only repository"
    }),
    checked: !!readonly,
    onChange: function onChange(e) {
      updateRepositorySettings({
        readonly: e.target.checked
      });
    },
    "data-test-subj": "readOnlyToggle"
  }))));
};

exports.FSSettings = FSSettings;