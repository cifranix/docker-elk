"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestoreSnapshotStepReview = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _lib = require("../../../../../common/lib");

var _app_context = require("../../../app_context");

var _collapsible_indices_list = require("../../collapsible_indices_list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RestoreSnapshotStepReview = function RestoreSnapshotStepReview(_ref) {
  var restoreSettings = _ref.restoreSettings,
      updateCurrentStep = _ref.updateCurrentStep;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var restoreIndices = restoreSettings.indices,
      renamePattern = restoreSettings.renamePattern,
      renameReplacement = restoreSettings.renameReplacement,
      partial = restoreSettings.partial,
      includeGlobalState = restoreSettings.includeGlobalState,
      ignoreIndexSettings = restoreSettings.ignoreIndexSettings;
  var serializedRestoreSettings = (0, _lib.serializeRestoreSettings)(restoreSettings);
  var serializedIndexSettings = serializedRestoreSettings.index_settings;

  var renderSummaryTab = function renderSummaryTab() {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.sectionLogisticsTitle",
      defaultMessage: "Logistics"
    }), ' ', _react.default.createElement(_eui.EuiToolTip, {
      content: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.editStepTooltip",
        defaultMessage: "Edit"
      })
    }, _react.default.createElement(_eui.EuiLink, {
      onClick: function onClick() {
        return updateCurrentStep(1);
      }
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "pencil"
    }))))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.indicesLabel",
      defaultMessage: "Indices"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, _react.default.createElement(_collapsible_indices_list.CollapsibleIndicesList, {
      indices: restoreIndices
    }))))), renamePattern || renameReplacement ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiTitle, {
      size: "xs"
    }, _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.sectionRenameTitle",
      defaultMessage: "Rename indices"
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiFlexGroup, null, renamePattern ? _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.renamePatternLabel",
      defaultMessage: "Capture pattern"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, renamePattern))) : null, renameReplacement ? _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.renameReplacementLabel",
      defaultMessage: "Replacement pattern"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, renameReplacement))) : null)) : null, partial !== undefined || includeGlobalState !== undefined ? _react.default.createElement(_eui.EuiFlexGroup, null, partial !== undefined ? _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.partialLabel",
      defaultMessage: "Partial restore"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, partial ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.partialTrueValue",
      defaultMessage: "Yes"
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.partialFalseValue",
      defaultMessage: "No"
    })))) : null, includeGlobalState !== undefined ? _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.includeGlobalStateLabel",
      defaultMessage: "Restore global state"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, includeGlobalState ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.includeGlobalStateTrueValue",
      defaultMessage: "Yes"
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.includeGlobalStateFalseValue",
      defaultMessage: "No"
    })))) : null) : null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.sectionSettingsTitle",
      defaultMessage: "Index settings"
    }), ' ', _react.default.createElement(_eui.EuiToolTip, {
      content: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.editStepTooltip",
        defaultMessage: "Edit"
      })
    }, _react.default.createElement(_eui.EuiLink, {
      onClick: function onClick() {
        return updateCurrentStep(2);
      }
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "pencil"
    }))))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), serializedIndexSettings || ignoreIndexSettings ? _react.default.createElement(_eui.EuiFlexGroup, null, serializedIndexSettings ? _react.default.createElement(_eui.EuiFlexItem, {
      style: {
        maxWidth: '50%'
      }
    }, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.indexSettingsLabel",
      defaultMessage: "Modify"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, _react.default.createElement(_eui.EuiFlexGrid, {
      columns: 2,
      gutterSize: "none"
    }, Object.entries(serializedIndexSettings).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          setting = _ref3[0],
          value = _ref3[1];

      return _react.default.createElement(_react.Fragment, {
        key: setting
      }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react.default.createElement("strong", null, setting))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react.default.createElement("span", null, " ", value))));
    }))))) : null, ignoreIndexSettings ? _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.ignoreIndexSettingsLabel",
      defaultMessage: "Reset"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("ul", null, ignoreIndexSettings.map(function (setting) {
      return _react.default.createElement("li", {
        key: setting
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react.default.createElement("span", null, setting)));
    })))))) : null) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.restoreForm.stepReview.summaryTab.noSettingsValue",
      defaultMessage: "No index setting modifications"
    }));
  };

  var renderJsonTab = function renderJsonTab() {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiCodeEditor, {
      mode: "json",
      theme: "textmate",
      isReadOnly: true,
      setOptions: {
        maxLines: Infinity
      },
      value: JSON.stringify(serializedRestoreSettings, null, 2),
      editorProps: {
        $blockScrolling: Infinity
      },
      "aria-label": i18n.translate('xpack.snapshotRestore.restoreForm.stepReview.jsonTab.jsonAriaLabel', {
        defaultMessage: 'Restore settings to be executed'
      })
    }));
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.restoreForm.stepReviewTitle",
    defaultMessage: "Review restore details"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiTabbedContent, {
    tabs: [{
      id: 'summary',
      name: i18n.translate('xpack.snapshotRestore.restoreForm.stepReview.summaryTabTitle', {
        defaultMessage: 'Summary'
      }),
      content: renderSummaryTab()
    }, {
      id: 'json',
      name: i18n.translate('xpack.snapshotRestore.restoreForm.stepReview.jsonTabTitle', {
        defaultMessage: 'JSON'
      }),
      content: renderJsonTab()
    }]
  }));
};

exports.RestoreSnapshotStepReview = RestoreSnapshotStepReview;