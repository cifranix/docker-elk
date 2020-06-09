"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HDFSSettings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _text = require("../../../services/text");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var HDFSSettings = function HDFSSettings(_ref) {
  var repository = _ref.repository,
      updateRepositorySettings = _ref.updateRepositorySettings,
      settingErrors = _ref.settingErrors;

  var _repository$settings = repository.settings,
      delegateType = _repository$settings.delegateType,
      uri = _repository$settings.uri,
      path = _repository$settings.path,
      loadDefaults = _repository$settings.loadDefaults,
      compress = _repository$settings.compress,
      chunkSize = _repository$settings.chunkSize,
      maxRestoreBytesPerSec = _repository$settings.maxRestoreBytesPerSec,
      maxSnapshotBytesPerSec = _repository$settings.maxSnapshotBytesPerSec,
      readonly = _repository$settings.readonly,
      securityPrincipal = _repository$settings['security.principal'],
      rest = _objectWithoutProperties(_repository$settings, ["delegateType", "uri", "path", "loadDefaults", "compress", "chunkSize", "maxRestoreBytesPerSec", "maxSnapshotBytesPerSec", "readonly", "security.principal"]);

  var hasErrors = Boolean(Object.keys(settingErrors).length);

  var _useState = (0, _react.useState)(JSON.stringify(rest, null, 2)),
      _useState2 = _slicedToArray(_useState, 2),
      additionalConf = _useState2[0],
      setAdditionalConf = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isConfInvalid = _useState4[0],
      setIsConfInvalid = _useState4[1];

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.uriTitle",
      defaultMessage: "URI"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.uriDescription",
      defaultMessage: "The URI address for HDFS."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.uriLabel",
      defaultMessage: "URI (required)"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.uri),
    error: settingErrors.uri
  }, _react.default.createElement(_eui.EuiFieldText, {
    prepend: _react.default.createElement(_eui.EuiText, {
      size: "s",
      id: "hdfsRepositoryUriProtocolDescription"
    }, 'hdfs://'),
    defaultValue: uri ? uri.split('hdfs://')[1] : '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        uri: e.target.value ? "hdfs://".concat(e.target.value) : ''
      });
    },
    "aria-describedby": "hdfsRepositoryUriProtocolDescription",
    "data-test-subj": "uriInput"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.pathTitle",
      defaultMessage: "Path"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.pathDescription",
      defaultMessage: "The file path where data is stored."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.pathLabel",
      defaultMessage: "Path (required)"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.path),
    error: settingErrors.path
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: path || '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        path: e.target.value
      });
    },
    "data-test-subj": "pathInput"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.loadDefaultsTitle",
      defaultMessage: "Load defaults"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.loadDefaultsDescription",
      defaultMessage: "Loads the default Hadoop configuration."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true,
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.loadDefaults),
    error: settingErrors.loadDefaults
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.loadDefaultsLabel",
      defaultMessage: "Load defaults"
    }),
    checked: !(loadDefaults === false),
    onChange: function onChange(e) {
      updateRepositorySettings({
        loadDefaults: e.target.checked
      });
    },
    "data-test-subj": "loadDefaultsToggle"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.compressTitle",
      defaultMessage: "Snapshot compression"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.compressDescription",
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
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.compressLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.chunkSizeTitle",
      defaultMessage: "Chunk size"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.chunkSizeDescription",
      defaultMessage: "Breaks files into smaller units when taking snapshots."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.chunkSizeLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.securityPrincipalTitle",
      defaultMessage: "Security principal"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.securityPrincipalDescription",
      defaultMessage: "The Kerberos principal to use when connecting to a secured HDFS cluster."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.securityPrincipalLabel",
      defaultMessage: "Security principal"
    }),
    fullWidth: true,
    isInvalid: Boolean(hasErrors && settingErrors.securityPrincipal),
    error: settingErrors.securityPrincipal
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: securityPrincipal || '',
    fullWidth: true,
    onChange: function onChange(e) {
      updateRepositorySettings({
        'security.principal': e.target.value
      });
    },
    "data-test-subj": "securityPrincipalInput"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.configurationTitle",
      defaultMessage: "Configuration"
    }))),
    description: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.configurationDescription",
      defaultMessage: "Additional JSON format configuration parameters to add to the Hadoop configuration. Only client-oriented properties from the Hadoop core and HDFS files are recognized."
    })),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.configurationLabel",
      defaultMessage: "Configuration"
    }),
    fullWidth: true,
    isInvalid: isConfInvalid,
    error: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.configurationFormatError",
      defaultMessage: "Invalid JSON format"
    }),
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.configurationKeyDescription",
      defaultMessage: "Keys should be in the format {confKeyFormat}.",
      values: {
        confKeyFormat: _react.default.createElement(_eui.EuiCode, null, 'conf.<key>')
      }
    })
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    mode: "json",
    theme: "textmate",
    width: "100%",
    value: additionalConf,
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
    "aria-label": _i18n.i18n.translate('xpack.snapshotRestore.repositoryForm.typeHDFS.configurationAriaLabel', {
      defaultMessage: "Additional configuration for HDFS repository '{name}'",
      values: {
        name: name
      }
    }),
    onChange: function onChange(value) {
      setAdditionalConf(value);

      try {
        var parsedConf = JSON.parse(value);
        setIsConfInvalid(false);
        updateRepositorySettings(_objectSpread({
          delegateType: delegateType,
          uri: uri,
          path: path,
          loadDefaults: loadDefaults,
          compress: compress,
          chunkSize: chunkSize,
          'security.principal': securityPrincipal
        }, parsedConf), true);
      } catch (e) {
        setIsConfInvalid(true);
      }
    },
    "data-test-subj": "codeEditor"
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.maxSnapshotBytesTitle",
      defaultMessage: "Max snapshot bytes per second"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.maxSnapshotBytesDescription",
      defaultMessage: "The rate for creating snapshots for each node."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.maxSnapshotBytesLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.maxRestoreBytesTitle",
      defaultMessage: "Max restore bytes per second"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.maxRestoreBytesDescription",
      defaultMessage: "The snapshot restore rate for each node."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.maxRestoreBytesLabel",
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
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.readonlyTitle",
      defaultMessage: "Read-only"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.readonlyDescription",
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
      id: "xpack.snapshotRestore.repositoryForm.typeHDFS.readonlyLabel",
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

exports.HDFSSettings = HDFSSettings;