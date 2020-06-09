"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyStepSettings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _documentation = require("../../../services/documentation");

var _app_context = require("../../../app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PolicyStepSettings = function PolicyStepSettings(_ref) {
  var policy = _ref.policy,
      indices = _ref.indices,
      updatePolicy = _ref.updatePolicy,
      errors = _ref.errors;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var _policy$config = policy.config,
      config = _policy$config === void 0 ? {} : _policy$config,
      isManagedPolicy = policy.isManagedPolicy;

  var updatePolicyConfig = function updatePolicyConfig(updatedFields) {
    var newConfig = _objectSpread({}, config, {}, updatedFields);

    updatePolicy({
      config: newConfig
    });
  }; // States for choosing all indices, or a subset, including caching previously chosen subset list


  var _useState = (0, _react.useState)(!Boolean(config.indices)),
      _useState2 = _slicedToArray(_useState, 2),
      isAllIndices = _useState2[0],
      setIsAllIndices = _useState2[1];

  var _useState3 = (0, _react.useState)(_toConsumableArray(indices)),
      _useState4 = _slicedToArray(_useState3, 2),
      indicesSelection = _useState4[0],
      setIndicesSelection = _useState4[1];

  var _useState5 = (0, _react.useState)(indices.map(function (index) {
    return {
      label: index,
      checked: isAllIndices || // If indices is a string, we default to custom input mode, so we mark individual indices
      // as selected if user goes back to list mode
      typeof config.indices === 'string' || Array.isArray(config.indices) && config.indices.includes(index) ? 'on' : undefined
    };
  })),
      _useState6 = _slicedToArray(_useState5, 2),
      indicesOptions = _useState6[0],
      setIndicesOptions = _useState6[1]; // State for using selectable indices list or custom patterns
  // Users with more than 100 indices will probably want to use an index pattern to select
  // them instead, so we'll default to showing them the index pattern input.


  var _useState7 = (0, _react.useState)(typeof config.indices === 'string' || Array.isArray(config.indices) && config.indices.length > 100 ? 'custom' : 'list'),
      _useState8 = _slicedToArray(_useState7, 2),
      selectIndicesMode = _useState8[0],
      setSelectIndicesMode = _useState8[1]; // State for custom patterns


  var _useState9 = (0, _react.useState)(typeof config.indices === 'string' ? config.indices.split(',') : []),
      _useState10 = _slicedToArray(_useState9, 2),
      indexPatterns = _useState10[0],
      setIndexPatterns = _useState10[1];

  var renderIndicesField = function renderIndicesField() {
    var indicesSwitch = _react.default.createElement(_eui.EuiSwitch, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.allIndicesLabel",
        defaultMessage: "All indices, including system indices"
      }),
      checked: isAllIndices,
      disabled: isManagedPolicy,
      "data-test-subj": "allIndicesToggle",
      onChange: function onChange(e) {
        var isChecked = e.target.checked;
        setIsAllIndices(isChecked);

        if (isChecked) {
          updatePolicyConfig({
            indices: undefined
          });
        } else {
          updatePolicyConfig({
            indices: selectIndicesMode === 'custom' ? indexPatterns.join(',') : _toConsumableArray(indicesSelection || [])
          });
        }
      }
    });

    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.indicesTitle",
        defaultMessage: "Indices"
      }))),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.indicesDescription",
        defaultMessage: "Indices to back up."
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFormRow, {
      hasEmptyLabelSpace: true,
      fullWidth: true
    }, _react.default.createElement(_react.Fragment, null, isManagedPolicy ? _react.default.createElement(_eui.EuiToolTip, {
      position: "left",
      content: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.indicesTooltip",
        defaultMessage: "Cloud-managed policies require all indices."
      }))
    }, indicesSwitch) : indicesSwitch, isAllIndices ? null : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiFormRow, {
      className: "snapshotRestore__policyForm__stepSettings__indicesFieldWrapper",
      label: selectIndicesMode === 'list' ? _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.selectIndicesLabel",
        defaultMessage: "Select indices"
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiLink, {
        onClick: function onClick() {
          setSelectIndicesMode('custom');
          updatePolicyConfig({
            indices: indexPatterns.join(',')
          });
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.indicesToggleCustomLink",
        defaultMessage: "Use index patterns"
      })))) : _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.indicesPatternLabel",
        defaultMessage: "Index patterns"
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiLink, {
        "data-test-subj": "selectIndicesLink",
        onClick: function onClick() {
          setSelectIndicesMode('list');
          updatePolicyConfig({
            indices: indicesSelection
          });
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.indicesToggleListLink",
        defaultMessage: "Select indices"
      })))),
      helpText: selectIndicesMode === 'list' ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.selectIndicesHelpText",
        defaultMessage: "{count} {count, plural, one {index} other {indices}} will be backed up. {selectOrDeselectAllLink}",
        values: {
          count: config.indices && config.indices.length,
          selectOrDeselectAllLink: config.indices && config.indices.length > 0 ? _react.default.createElement(_eui.EuiLink, {
            "data-test-subj": "deselectIndicesLink",
            onClick: function onClick() {
              // TODO: Change this to setIndicesOptions() when https://github.com/elastic/eui/issues/2071 is fixed
              indicesOptions.forEach(function (option) {
                option.checked = undefined;
              });
              updatePolicyConfig({
                indices: []
              });
              setIndicesSelection([]);
            }
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.snapshotRestore.policyForm.stepSettings.deselectAllIndicesLink",
            defaultMessage: "Deselect all"
          })) : _react.default.createElement(_eui.EuiLink, {
            onClick: function onClick() {
              // TODO: Change this to setIndicesOptions() when https://github.com/elastic/eui/issues/2071 is fixed
              indicesOptions.forEach(function (option) {
                option.checked = 'on';
              });
              updatePolicyConfig({
                indices: _toConsumableArray(indices)
              });
              setIndicesSelection(_toConsumableArray(indices));
            }
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.snapshotRestore.policyForm.stepSettings.selectAllIndicesLink",
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
        updatePolicyConfig({
          indices: newSelectedIndices
        });
        setIndicesSelection(newSelectedIndices);
      },
      searchable: true,
      height: 300
    }, function (list, search) {
      return _react.default.createElement(_eui.EuiPanel, {
        paddingSize: "s",
        hasShadow: false
      }, search, list);
    }) : _react.default.createElement(_eui.EuiComboBox, {
      options: indices.map(function (index) {
        return {
          label: index
        };
      }),
      placeholder: i18n.translate('xpack.snapshotRestore.policyForm.stepSettings.indicesPatternPlaceholder', {
        defaultMessage: 'Enter index patterns, i.e. logstash-*'
      }),
      selectedOptions: indexPatterns.map(function (pattern) {
        return {
          label: pattern
        };
      }),
      onCreateOption: function onCreateOption(pattern) {
        if (!pattern.trim().length) {
          return;
        }

        var newPatterns = [].concat(_toConsumableArray(indexPatterns), [pattern]);
        setIndexPatterns(newPatterns);
        updatePolicyConfig({
          indices: newPatterns.join(',')
        });
      },
      onChange: function onChange(patterns) {
        var newPatterns = patterns.map(function (_ref3) {
          var label = _ref3.label;
          return label;
        });
        setIndexPatterns(newPatterns);
        updatePolicyConfig({
          indices: newPatterns.join(',')
        });
      }
    }))))));
  };

  var renderIgnoreUnavailableField = function renderIgnoreUnavailableField() {
    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.ignoreUnavailableDescriptionTitle",
        defaultMessage: "Ignore unavailable indices"
      }))),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.ignoreUnavailableDescription",
        defaultMessage: "Ignores indices that are unavailable when taking the snapshot. Otherwise, the entire snapshot will fail."
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFormRow, {
      hasEmptyLabelSpace: true,
      fullWidth: true
    }, _react.default.createElement(_eui.EuiSwitch, {
      "data-test-subj": "ignoreUnavailableIndicesToggle",
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.ignoreUnavailableLabel",
        defaultMessage: "Ignore unavailable indices"
      }),
      checked: Boolean(config.ignoreUnavailable),
      onChange: function onChange(e) {
        updatePolicyConfig({
          ignoreUnavailable: e.target.checked
        });
      }
    })));
  };

  var renderPartialField = function renderPartialField() {
    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.partialDescriptionTitle",
        defaultMessage: "Allow partial indices"
      }))),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.partialDescription",
        defaultMessage: "Allows snapshots of indices with primary shards that are unavailable. Otherwise, the entire snapshot will fail."
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFormRow, {
      hasEmptyLabelSpace: true,
      fullWidth: true
    }, _react.default.createElement(_eui.EuiSwitch, {
      "data-test-subj": "partialIndicesToggle",
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.partialIndicesToggleSwitch",
        defaultMessage: "Allow partial indices"
      }),
      checked: Boolean(config.partial),
      onChange: function onChange(e) {
        updatePolicyConfig({
          partial: e.target.checked
        });
      }
    })));
  };

  var renderIncludeGlobalStateField = function renderIncludeGlobalStateField() {
    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.includeGlobalStateDescriptionTitle",
        defaultMessage: "Include global state"
      }))),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.includeGlobalStateDescription",
        defaultMessage: "Stores the global state of the cluster as part of the snapshot."
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFormRow, {
      hasEmptyLabelSpace: true,
      fullWidth: true
    }, _react.default.createElement(_eui.EuiSwitch, {
      "data-test-subj": "globalStateToggle",
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepSettings.policyIncludeGlobalStateLabel",
        defaultMessage: "Include global state"
      }),
      checked: config.includeGlobalState === undefined || config.includeGlobalState,
      onChange: function onChange(e) {
        updatePolicyConfig({
          includeGlobalState: e.target.checked
        });
      }
    })));
  };

  return _react.default.createElement("div", {
    className: "snapshotRestore__policyForm__stepSettings"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.stepSettingsTitle",
    defaultMessage: "Snapshot settings"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "right",
    href: _documentation.documentationLinksService.getSnapshotDocUrl(),
    target: "_blank",
    iconType: "help"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.stepSettings.docsButtonLabel",
    defaultMessage: "Snapshot settings docs"
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), renderIndicesField(), renderIgnoreUnavailableField(), renderPartialField(), renderIncludeGlobalStateField());
};

exports.PolicyStepSettings = PolicyStepSettings;