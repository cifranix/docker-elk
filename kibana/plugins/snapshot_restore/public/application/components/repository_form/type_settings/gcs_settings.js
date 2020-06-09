"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GCSSettings = void 0;

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
var GCSSettings = function GCSSettings(_ref) {
  var repository = _ref.repository,
      updateRepositorySettings = _ref.updateRepositorySettings,
      settingErrors = _ref.settingErrors;
  var _repository$settings = repository.settings,
      bucket = _repository$settings.bucket,
      client = _repository$settings.client,
      basePath = _repository$settings.basePath,
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
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.clientTitle",
      defaultMessage: "Client"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.clientDescription",
      defaultMessage: "The name of the Google Cloud Storage client."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.clientLabel",
      defaultMessage: "Client"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.client),
    error: settingErrors.client
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: client || '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        client: e.target.value
      });
    },
    "data-test-subj": "clientInput"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.bucketTitle",
      defaultMessage: "Bucket"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.bucketDescription",
      defaultMessage: "The name of the Google Cloud Storage bucket to use for snapshots."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.bucketLabel",
      defaultMessage: "Bucket (required)"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.bucket),
    error: settingErrors.bucket
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: bucket || '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        bucket: e.target.value
      });
    },
    "data-test-subj": "bucketInput"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.basePathTitle",
      defaultMessage: "Base path"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.basePathDescription",
      defaultMessage: "The bucket path to the repository data."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.basePathLabel",
      defaultMessage: "Base path"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.basePath),
    error: settingErrors.basePath
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: basePath || '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        basePath: e.target.value
      });
    },
    "data-test-subj": "basePathInput"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.compressTitle",
      defaultMessage: "Compress snapshots"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.compressDescription",
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
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.compressLabel",
      defaultMessage: "Compress snapshots"
    }),
    checked: !(compress === false),
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
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.chunkSizeTitle",
      defaultMessage: "Chunk size"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.chunkSizeDescription",
      defaultMessage: "Breaks files into smaller units when taking snapshots."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.chunkSizeLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.maxSnapshotBytesTitle",
      defaultMessage: "Max snapshot bytes per second"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.maxSnapshotBytesDescription",
      defaultMessage: "The rate for creating snapshots for each node."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.maxSnapshotBytesLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.maxRestoreBytesTitle",
      defaultMessage: "Max restore bytes per second"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.maxRestoreBytesDescription",
      defaultMessage: "The snapshot restore rate for each node."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.maxRestoreBytesLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.readonlyTitle",
      defaultMessage: "Read-only"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.readonlyDescription",
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
      id: "xpack.snapshotRestore.repositoryForm.typeGCS.readonlyLabel",
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

exports.GCSSettings = GCSSettings;