"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestoreSnapshotStepLogistics = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _documentation = require("../../../services/documentation");

var _app_context = require("../../../app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RestoreSnapshotStepLogistics = function RestoreSnapshotStepLogistics(_ref) {
  var snapshotDetails = _ref.snapshotDetails,
      restoreSettings = _ref.restoreSettings,
      updateRestoreSettings = _ref.updateRestoreSettings,
      errors = _ref.errors;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var snapshotIndices = snapshotDetails.indices,
      snapshotIncludeGlobalState = snapshotDetails.includeGlobalState;
  var restoreIndices = restoreSettings.indices,
      renamePattern = restoreSettings.renamePattern,
      renameReplacement = restoreSettings.renameReplacement,
      partial = restoreSettings.partial,
      includeGlobalState = restoreSettings.includeGlobalState; // States for choosing all indices, or a subset, including caching previously chosen subset list

  var _useState = (0, _react.useState)(!Boolean(restoreIndices)),
      _useState2 = _slicedToArray(_useState, 2),
      isAllIndices = _useState2[0],
      setIsAllIndices = _useState2[1];

  var _useState3 = (0, _react.useState)(snapshotIndices.map(function (index) {
    return {
      label: index,
      checked: isAllIndices || // If indices is a string, we default to custom input mode, so we mark individual indices
      // as selected if user goes back to list mode
      typeof restoreIndices === 'string' || Array.isArray(restoreIndices) && restoreIndices.includes(index) ? 'on' : undefined
    };
  })),
      _useState4 = _slicedToArray(_useState3, 2),
      indicesOptions = _useState4[0],
      setIndicesOptions = _useState4[1]; // State for using selectable indices list or custom patterns
  // Users with more than 100 indices will probably want to use an index pattern to select
  // them instead, so we'll default to showing them the index pattern input.


  var _useState5 = (0, _react.useState)(typeof restoreIndices === 'string' || snapshotIndices.length > 100 ? 'custom' : 'list'),
      _useState6 = _slicedToArray(_useState5, 2),
      selectIndicesMode = _useState6[0],
      setSelectIndicesMode = _useState6[1]; // State for custom patterns


  var _useState7 = (0, _react.useState)(typeof restoreIndices === 'string' ? restoreIndices.split(',') : []),
      _useState8 = _slicedToArray(_useState7, 2),
      restoreIndexPatterns = _useState8[0],
      setRestoreIndexPatterns = _useState8[1]; // State for setting renaming indices patterns


  var _useState9 = (0, _react.useState)(Boolean(renamePattern || renameReplacement)),
      _useState10 = _slicedToArray(_useState9, 2),
      isRenamingIndices = _useState10[0],
      setIsRenamingIndices = _useState10[1]; // Caching state for togglable settings


  var _useState11 = (0, _react.useState)({
    indices: _toConsumableArray(snapshotIndices),
    renamePattern: '',
    renameReplacement: ''
  }),
      _useState12 = _slicedToArray(_useState11, 2),
      cachedRestoreSettings = _useState12[0],
      setCachedRestoreSettings = _useState12[1];

  return _react.default.createElement("div", {
    className: "snapshotRestore__restoreForm__stepLogistics"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.restoreForm.stepLogisticsTitle",
    defaultMessage: "Restore details"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "right",
    href: _documentation.documentationLinksService.getRestoreDocUrl(),
    target: "_blank",
    iconType: "help"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.restoreForm.stepLogistics.docsButtonLabel",
    defaultMessage: "Snapshot and Restore docs"
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.indicesTitle",
      defaultMessage: "Indices"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.indicesDescription",
      defaultMessage: "Creates new indices if they don\u2019t exist. Restores existing indices if they are closed and have the same number of shards as the snapshot index."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true,
    fullWidth: true
  }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSwitch, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.allIndicesLabel",
      defaultMessage: "All indices, including system indices"
    }),
    checked: isAllIndices,
    onChange: function onChange(e) {
      var isChecked = e.target.checked;
      setIsAllIndices(isChecked);

      if (isChecked) {
        updateRestoreSettings({
          indices: undefined
        });
      } else {
        updateRestoreSettings({
          indices: selectIndicesMode === 'custom' ? restoreIndexPatterns.join(',') : _toConsumableArray(cachedRestoreSettings.indices || [])
        });
      }
    }
  }), isAllIndices ? null : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFormRow, {
    className: "snapshotRestore__restoreForm__stepLogistics__indicesFieldWrapper",
    label: selectIndicesMode === 'list' ? _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "spaceBetween"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.selectIndicesLabel",
      defaultMessage: "Select indices"
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiLink, {
      onClick: function onClick() {
        setSelectIndicesMode('custom');
        updateRestoreSettings({
          indices: restoreIndexPatterns.join(',')
        });
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.indicesToggleCustomLink",
      defaultMessage: "Use index patterns"
    })))) : _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "spaceBetween"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.indicesPatternLabel",
      defaultMessage: "Index patterns"
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiLink, {
      onClick: function onClick() {
        setSelectIndicesMode('list');
        updateRestoreSettings({
          indices: cachedRestoreSettings.indices
        });
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.indicesToggleListLink",
      defaultMessage: "Select indices"
    })))),
    helpText: selectIndicesMode === 'list' ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.selectIndicesHelpText",
      defaultMessage: "{count} {count, plural, one {index} other {indices}} will be restored. {selectOrDeselectAllLink}",
      values: {
        count: restoreIndices && restoreIndices.length,
        selectOrDeselectAllLink: restoreIndices && restoreIndices.length > 0 ? _react.default.createElement(_eui.EuiLink, {
          onClick: function onClick() {
            // TODO: Change this to setIndicesOptions() when https://github.com/elastic/eui/issues/2071 is fixed
            indicesOptions.forEach(function (option) {
              option.checked = undefined;
            });
            updateRestoreSettings({
              indices: []
            });
            setCachedRestoreSettings(_objectSpread({}, cachedRestoreSettings, {
              indices: []
            }));
          }
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.restoreForm.stepLogistics.deselectAllIndicesLink",
          defaultMessage: "Deselect all"
        })) : _react.default.createElement(_eui.EuiLink, {
          onClick: function onClick() {
            // TODO: Change this to setIndicesOptions() when https://github.com/elastic/eui/issues/2071 is fixed
            indicesOptions.forEach(function (option) {
              option.checked = 'on';
            });
            updateRestoreSettings({
              indices: _toConsumableArray(snapshotIndices)
            });
            setCachedRestoreSettings(_objectSpread({}, cachedRestoreSettings, {
              indices: _toConsumableArray(snapshotIndices)
            }));
          }
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.restoreForm.stepLogistics.selectAllIndicesLink",
          defaultMessage: "Select all"
        }))
      }
    }) : null,
    isInvalid: Boolean(errors.indices),
    error: errors.indices
  }, selectIndicesMode === 'list' ? _react.default.createElement(_eui.EuiSelectable, {
    allowExclusions: false,
    options: indicesOptions,
    onChange: function onChange(options) {
      var newSelectedIndices = [];
      options.forEach(function (_ref2) {
        var label = _ref2.label,
            checked = _ref2.checked;

        if (checked === 'on') {
          newSelectedIndices.push(label);
        }
      });
      setIndicesOptions(options);
      updateRestoreSettings({
        indices: [].concat(newSelectedIndices)
      });
      setCachedRestoreSettings(_objectSpread({}, cachedRestoreSettings, {
        indices: [].concat(newSelectedIndices)
      }));
    },
    searchable: true,
    height: 300
  }, function (list, search) {
    return _react.default.createElement(_eui.EuiPanel, {
      paddingSize: "s",
      hasShadow: false
    }, search, list);
  }) : _react.default.createElement(_eui.EuiComboBox, {
    options: snapshotIndices.map(function (index) {
      return {
        label: index
      };
    }),
    placeholder: i18n.translate('xpack.snapshotRestore.restoreForm.stepLogistics.indicesPatternPlaceholder', {
      defaultMessage: 'Enter index patterns, i.e. logstash-*'
    }),
    selectedOptions: restoreIndexPatterns.map(function (pattern) {
      return {
        label: pattern
      };
    }),
    onCreateOption: function onCreateOption(pattern) {
      if (!pattern.trim().length) {
        return;
      }

      var newPatterns = [].concat(_toConsumableArray(restoreIndexPatterns), [pattern]);
      setRestoreIndexPatterns(newPatterns);
      updateRestoreSettings({
        indices: newPatterns.join(',')
      });
    },
    onChange: function onChange(patterns) {
      var newPatterns = patterns.map(function (_ref3) {
        var label = _ref3.label;
        return label;
      });
      setRestoreIndexPatterns(newPatterns);
      updateRestoreSettings({
        indices: newPatterns.join(',')
      });
    }
  })))))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.renameIndicesTitle",
      defaultMessage: "Rename indices"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.renameIndicesDescription",
      defaultMessage: "Renames indices on restore."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true,
    fullWidth: true
  }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSwitch, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.renameIndicesLabel",
      defaultMessage: "Rename indices"
    }),
    checked: isRenamingIndices,
    onChange: function onChange(e) {
      var isChecked = e.target.checked;
      setIsRenamingIndices(isChecked);

      if (isChecked) {
        updateRestoreSettings({
          renamePattern: cachedRestoreSettings.renamePattern,
          renameReplacement: cachedRestoreSettings.renameReplacement
        });
      } else {
        updateRestoreSettings({
          renamePattern: undefined,
          renameReplacement: undefined
        });
      }
    }
  }), !isRenamingIndices ? null : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.renamePatternLabel",
      defaultMessage: "Capture pattern"
    }),
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.renamePatternHelpText",
      defaultMessage: "Use regular expressions"
    }),
    isInvalid: Boolean(errors.renamePattern),
    error: errors.renamePattern
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: renamePattern,
    placeholder: "index_(.+)",
    onChange: function onChange(e) {
      setCachedRestoreSettings(_objectSpread({}, cachedRestoreSettings, {
        renamePattern: e.target.value
      }));
      updateRestoreSettings({
        renamePattern: e.target.value
      });
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.renameReplacementLabel",
      defaultMessage: "Replacement pattern"
    }),
    isInvalid: Boolean(errors.renameReplacement),
    error: errors.renameReplacement
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: renameReplacement,
    placeholder: "restored_index_$1",
    onChange: function onChange(e) {
      setCachedRestoreSettings(_objectSpread({}, cachedRestoreSettings, {
        renameReplacement: e.target.value
      }));
      updateRestoreSettings({
        renameReplacement: e.target.value
      });
    }
  })))))))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.partialTitle",
      defaultMessage: "Partial restore"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.partialDescription",
      defaultMessage: "Allows restore of indices that don\u2019t have snapshots of all shards."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true,
    fullWidth: true
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.partialLabel",
      defaultMessage: "Partial restore"
    }),
    checked: partial === undefined ? false : partial,
    onChange: function onChange(e) {
      return updateRestoreSettings({
        partial: e.target.checked
      });
    }
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.includeGlobalStateTitle",
      defaultMessage: "Restore global state"
    }))),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.includeGlobalStateDescription",
      defaultMessage: "Restores templates that don\u2019t currently exist in the cluster and overrides templates with the same name. Also restores persistent settings."
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true,
    fullWidth: true,
    helpText: snapshotIncludeGlobalState ? null : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.includeGlobalStateDisabledDescription",
      defaultMessage: "Not available for this snapshot."
    })
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepLogistics.includeGlobalStateLabel",
      defaultMessage: "Restore global state"
    }),
    checked: includeGlobalState === undefined ? false : includeGlobalState,
    onChange: function onChange(e) {
      return updateRestoreSettings({
        includeGlobalState: e.target.checked
      });
    },
    disabled: !snapshotIncludeGlobalState
  }))));
};

exports.RestoreSnapshotStepLogistics = RestoreSnapshotStepLogistics;