"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.S3Settings = void 0;

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
var S3Settings = function S3Settings(_ref) {
  var repository = _ref.repository,
      updateRepositorySettings = _ref.updateRepositorySettings,
      settingErrors = _ref.settingErrors;
  var _repository$settings = repository.settings,
      bucket = _repository$settings.bucket,
      client = _repository$settings.client,
      basePath = _repository$settings.basePath,
      compress = _repository$settings.compress,
      chunkSize = _repository$settings.chunkSize,
      serverSideEncryption = _repository$settings.serverSideEncryption,
      bufferSize = _repository$settings.bufferSize,
      cannedAcl = _repository$settings.cannedAcl,
      storageClass = _repository$settings.storageClass,
      maxRestoreBytesPerSec = _repository$settings.maxRestoreBytesPerSec,
      maxSnapshotBytesPerSec = _repository$settings.maxSnapshotBytesPerSec,
      readonly = _repository$settings.readonly;
  var cannedAclOptions = ['private', 'public-read', 'public-read-write', 'authenticated-read', 'log-delivery-write', 'bucket-owner-read', 'bucket-owner-full-control'].map(function (option) {
    return {
      value: option,
      text: option
    };
  });
  var hasErrors = Boolean(Object.keys(settingErrors).length);
  var storageClassOptions = ['standard', 'reduced_redundancy', 'standard_ia'].map(function (option) {
    return {
      value: option,
      text: option
    };
  });
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.clientTitle",
      defaultMessage: "Client"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.clientDescription",
      defaultMessage: "The name of the AWS S3 client."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.clientLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeS3.bucketTitle",
      defaultMessage: "Bucket"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.bucketDescription",
      defaultMessage: "The name of the AWS S3 bucket to use for snapshots."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.bucketLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeS3.basePathTitle",
      defaultMessage: "Base path"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.basePathDescription",
      defaultMessage: "The bucket path to the repository data."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.basePathLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeS3.compressTitle",
      defaultMessage: "Snapshot compression"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.compressDescription",
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
      id: "xpack.snapshotRestore.repositoryForm.typeS3.compressLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeS3.chunkSizeTitle",
      defaultMessage: "Chunk size"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.chunkSizeDescription",
      defaultMessage: "Breaks files into smaller units when taking snapshots."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.chunkSizeLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeS3.serverSideEncryptionTitle",
      defaultMessage: "Server-side encryption"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.serverSideEncryptionDescription",
      defaultMessage: "Encrypts files on the server using AES256 algorithm."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true,
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.serverSideEncryption),
    error: settingErrors.serverSideEncryption
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.serverSideEncryptionLabel",
      defaultMessage: "Server-side encryption"
    }),
    checked: !!serverSideEncryption,
    onChange: function onChange(e) {
      updateRepositorySettings({
        serverSideEncryption: e.target.checked
      });
    },
    "data-test-subj": "serverSideEncryptionToggle"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.bufferSizeTitle",
      defaultMessage: "Buffer size"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.bufferSizeDescription",
      defaultMessage: "Beyond this minimum threshold, the S3 repository will use the AWS Multipart Upload API to split the chunk into several parts and upload each in its own request."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.bufferSizeLabel",
      defaultMessage: "Buffer size"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.bufferSize),
    error: settingErrors.bufferSize,
    helpText: _text.textService.getSizeNotationHelpText()
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: bufferSize || '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        bufferSize: e.target.value
      });
    },
    "data-test-subj": "bufferSizeInput"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.cannedAclTitle",
      defaultMessage: "Canned ACL"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.cannedAclDescription",
      defaultMessage: "The canned ACL to add to new S3 buckets and objects."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.cannedAclLabel",
      defaultMessage: "Canned ACL"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.cannedAcl),
    error: settingErrors.cannedAcl
  }, _react.default.createElement(_eui.EuiSelect, {
    options: cannedAclOptions,
    value: cannedAcl || cannedAclOptions[0].value,
    onChange: function onChange(e) {
      updateRepositorySettings({
        cannedAcl: e.target.value
      });
    },
    fullWidth: true,
    "data-test-subj": "cannedAclSelect"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.storageClassTitle",
      defaultMessage: "Storage class"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.storageClassDescription",
      defaultMessage: "The storage class for new objects in the S3 repository."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.storageClassLabel",
      defaultMessage: "Storage class"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.storageClass),
    error: settingErrors.storageClass
  }, _react.default.createElement(_eui.EuiSelect, {
    options: storageClassOptions,
    value: storageClass || storageClassOptions[0].value,
    onChange: function onChange(e) {
      updateRepositorySettings({
        storageClass: e.target.value
      });
    },
    fullWidth: true,
    "data-test-subj": "storageClassSelect"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.maxSnapshotBytesTitle",
      defaultMessage: "Max snapshot bytes per second"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.maxSnapshotBytesDescription",
      defaultMessage: "The rate for creating snapshots for each node."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.maxSnapshotBytesLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeS3.maxRestoreBytesTitle",
      defaultMessage: "Max restore bytes per second"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.maxRestoreBytesDescription",
      defaultMessage: "The snapshot restore rate for each node."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.maxRestoreBytesLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeS3.readonlyTitle",
      defaultMessage: "Read-only"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeS3.readonlyDescription",
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
      id: "xpack.snapshotRestore.repositoryForm.typeS3.readonlyLabel",
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

exports.S3Settings = S3Settings;