"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AzureSettings = void 0;

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
var AzureSettings = function AzureSettings(_ref) {
  var repository = _ref.repository,
      updateRepositorySettings = _ref.updateRepositorySettings,
      settingErrors = _ref.settingErrors;
  var _repository$settings = repository.settings,
      client = _repository$settings.client,
      container = _repository$settings.container,
      basePath = _repository$settings.basePath,
      compress = _repository$settings.compress,
      chunkSize = _repository$settings.chunkSize,
      readonly = _repository$settings.readonly,
      locationMode = _repository$settings.locationMode,
      maxRestoreBytesPerSec = _repository$settings.maxRestoreBytesPerSec,
      maxSnapshotBytesPerSec = _repository$settings.maxSnapshotBytesPerSec;
  var hasErrors = Boolean(Object.keys(settingErrors).length);
  var locationModeOptions = ['primary_only', 'secondary_only'].map(function (option) {
    return {
      value: option,
      text: option
    };
  });
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.clientTitle",
      defaultMessage: "Client"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.clientDescription",
      defaultMessage: "The name of the Azure client."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.clientLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.containerTitle",
      defaultMessage: "Container"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.containerDescription",
      defaultMessage: "The name of the Azure container to use for snapshots."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.containerLabel",
      defaultMessage: "Container"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.container),
    error: settingErrors.container
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: container || '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        container: e.target.value
      });
    },
    "data-test-subj": "containerInput"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.basePathTitle",
      defaultMessage: "Base path"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.basePathDescription",
      defaultMessage: "The container path to the repository data."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.basePathLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.compressTitle",
      defaultMessage: "Snapshot compression"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.compressDescription",
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
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.compressLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.chunkSizeTitle",
      defaultMessage: "Chunk size"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.chunkSizeDescription",
      defaultMessage: "Breaks files into smaller units when taking snapshots."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.chunkSizeLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.maxSnapshotBytesTitle",
      defaultMessage: "Max snapshot bytes per second"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.maxSnapshotBytesDescription",
      defaultMessage: "The rate for creating snapshots for each node."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.maxSnapshotBytesLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.maxRestoreBytesTitle",
      defaultMessage: "Max restore bytes per second"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.maxRestoreBytesDescription",
      defaultMessage: "The snapshot restore rate for each node."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.maxRestoreBytesLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.locationModeTitle",
      defaultMessage: "Location mode"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.locationModeDescription",
      defaultMessage: "The primary or secondary location. If secondary, read-only is true."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.locationModeLabel",
      defaultMessage: "Location mode"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.locationMode),
    error: settingErrors.locationMode
  }, _react.default.createElement(_eui.EuiSelect, {
    options: locationModeOptions,
    value: locationMode || locationModeOptions[0].value,
    onChange: function onChange(e) {
      updateRepositorySettings({
        locationMode: e.target.value,
        readonly: e.target.value === locationModeOptions[1].value ? true : readonly
      });
    },
    fullWidth: true,
    "data-test-subj": "locationModeSelect"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.readonlyTitle",
      defaultMessage: "Read-only"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.readonlyDescription",
      defaultMessage: "Only one cluster should have write access to this repository. All other clusters should be read-only."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true,
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.readonly),
    error: settingErrors.readonly
  }, _react.default.createElement(_eui.EuiSwitch, {
    disabled: locationMode === locationModeOptions[1].value,
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeAzure.readonlyLabel",
      defaultMessage: "Read-only repository"
    }),
    checked: !!readonly,
    onChange: function onChange(e) {
      updateRepositorySettings({
        readonly: locationMode === locationModeOptions[1].value ? true : e.target.checked
      });
    },
    "data-test-subj": "readOnlyToggle"
  }))));
};

exports.AzureSettings = AzureSettings;