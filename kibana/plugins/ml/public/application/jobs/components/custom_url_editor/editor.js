"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomUrlEditor = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _utils = require("./utils");

var _custom_url_utils = require("../../../util/custom_url_utils");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getLinkToOptions() {
  return [{
    id: _constants.URL_TYPE.KIBANA_DASHBOARD,
    label: _i18n.i18n.translate('xpack.ml.customUrlEditor.kibanaDashboardLabel', {
      defaultMessage: 'Kibana dashboard'
    })
  }, {
    id: _constants.URL_TYPE.KIBANA_DISCOVER,
    label: _i18n.i18n.translate('xpack.ml.customUrlEditor.discoverLabel', {
      defaultMessage: 'Discover'
    })
  }, {
    id: _constants.URL_TYPE.OTHER,
    label: _i18n.i18n.translate('xpack.ml.customUrlEditor.otherLabel', {
      defaultMessage: 'Other'
    })
  }];
}

/*
 * React component for the form for editing a custom URL.
 */
var CustomUrlEditor = function CustomUrlEditor(_ref) {
  var customUrl = _ref.customUrl,
      setEditCustomUrl = _ref.setEditCustomUrl,
      savedCustomUrls = _ref.savedCustomUrls,
      dashboards = _ref.dashboards,
      indexPatterns = _ref.indexPatterns,
      queryEntityFieldNames = _ref.queryEntityFieldNames;

  if (customUrl === undefined) {
    return null;
  }

  var onLabelChange = function onLabelChange(e) {
    setEditCustomUrl(_objectSpread({}, customUrl, {
      label: e.target.value
    }));
  };

  var onTypeChange = function onTypeChange(linkType) {
    setEditCustomUrl(_objectSpread({}, customUrl, {
      type: linkType
    }));
  };

  var onDashboardChange = function onDashboardChange(e) {
    var kibanaSettings = customUrl.kibanaSettings;
    setEditCustomUrl(_objectSpread({}, customUrl, {
      kibanaSettings: _objectSpread({}, kibanaSettings, {
        dashboardId: e.target.value
      })
    }));
  };

  var onDiscoverIndexPatternChange = function onDiscoverIndexPatternChange(e) {
    var kibanaSettings = customUrl.kibanaSettings;
    setEditCustomUrl(_objectSpread({}, customUrl, {
      kibanaSettings: _objectSpread({}, kibanaSettings, {
        discoverIndexPatternId: e.target.value
      })
    }));
  };

  var onQueryEntitiesChange = function onQueryEntitiesChange(selectedOptions) {
    var selectedFieldNames = selectedOptions.map(function (option) {
      return option.label;
    });
    var kibanaSettings = customUrl.kibanaSettings;
    setEditCustomUrl(_objectSpread({}, customUrl, {
      kibanaSettings: _objectSpread({}, kibanaSettings, {
        queryFieldNames: selectedFieldNames
      })
    }));
  };

  var onOtherUrlValueChange = function onOtherUrlValueChange(e) {
    setEditCustomUrl(_objectSpread({}, customUrl, {
      otherUrlSettings: {
        urlValue: e.target.value
      }
    }));
  };

  var onTimeRangeTypeChange = function onTimeRangeTypeChange(e) {
    var timeRange = customUrl.timeRange;
    setEditCustomUrl(_objectSpread({}, customUrl, {
      timeRange: _objectSpread({}, timeRange, {
        type: e.target.value
      })
    }));
  };

  var onTimeRangeIntervalChange = function onTimeRangeIntervalChange(e) {
    var timeRange = customUrl.timeRange;
    setEditCustomUrl(_objectSpread({}, customUrl, {
      timeRange: _objectSpread({}, timeRange, {
        interval: e.target.value
      })
    }));
  };

  var label = customUrl.label,
      type = customUrl.type,
      timeRange = customUrl.timeRange,
      kibanaSettings = customUrl.kibanaSettings,
      otherUrlSettings = customUrl.otherUrlSettings;
  var dashboardOptions = dashboards.map(function (dashboard) {
    return {
      value: dashboard.id,
      text: dashboard.title
    };
  });
  var indexPatternOptions = indexPatterns.map(function (indexPattern) {
    return {
      value: indexPattern.id,
      text: indexPattern.title
    };
  });
  var entityOptions = queryEntityFieldNames.map(function (fieldName) {
    return {
      label: fieldName
    };
  });
  var selectedEntityOptions = [];

  if (kibanaSettings !== undefined && kibanaSettings.queryFieldNames !== undefined) {
    var queryFieldNames = kibanaSettings.queryFieldNames;
    selectedEntityOptions = queryFieldNames.map(function (fieldName) {
      return {
        label: fieldName
      };
    });
  }

  var timeRangeOptions = Object.values(_constants.TIME_RANGE_TYPE).map(function (timeRangeType) {
    return {
      value: timeRangeType,
      text: timeRangeType
    };
  });
  var isInvalidLabel = !(0, _custom_url_utils.isValidLabel)(label, savedCustomUrls);
  var invalidLabelError = isInvalidLabel ? [_i18n.i18n.translate('xpack.ml.customUrlsEditor.invalidLabelErrorMessage', {
    defaultMessage: 'A unique label must be supplied'
  })] : [];
  var isInvalidTimeRange = !(0, _utils.isValidCustomUrlSettingsTimeRange)(timeRange);
  var invalidIntervalError = isInvalidTimeRange ? [_i18n.i18n.translate('xpack.ml.customUrlsList.invalidIntervalFormatErrorMessage', {
    defaultMessage: 'Invalid interval format'
  })] : [];
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.customUrlsEditor.createNewCustomUrlTitle",
    defaultMessage: "Create new custom URL"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiForm, {
    className: "ml-edit-url-form"
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.customUrlsEditor.labelLabel",
      defaultMessage: "Label"
    }),
    className: "url-label",
    error: invalidLabelError,
    isInvalid: isInvalidLabel,
    compressed: true
  }, _react.default.createElement(_eui.EuiFieldText, {
    name: "label",
    value: label,
    onChange: onLabelChange,
    isInvalid: isInvalidLabel,
    compressed: true,
    "data-test-subj": "mlJobCustomUrlLabelInput"
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.customUrlsEditor.linkToLabel",
      defaultMessage: "Link to"
    }),
    compressed: true
  }, _react.default.createElement(_eui.EuiRadioGroup, {
    options: getLinkToOptions(),
    idSelected: type,
    onChange: onTypeChange,
    className: "url-link-to-radio"
  })), type === _constants.URL_TYPE.KIBANA_DASHBOARD && _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.customUrlsEditor.dashboardNameLabel",
      defaultMessage: "Dashboard name"
    }),
    compressed: true
  }, _react.default.createElement(_eui.EuiSelect, {
    options: dashboardOptions,
    value: kibanaSettings.dashboardId,
    onChange: onDashboardChange,
    compressed: true
  })), type === _constants.URL_TYPE.KIBANA_DISCOVER && _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.customUrlsEditor.indexPatternLabel",
      defaultMessage: "Index pattern"
    }),
    compressed: true
  }, _react.default.createElement(_eui.EuiSelect, {
    options: indexPatternOptions,
    value: kibanaSettings.discoverIndexPatternId,
    onChange: onDiscoverIndexPatternChange,
    compressed: true
  })), (type === _constants.URL_TYPE.KIBANA_DASHBOARD || type === _constants.URL_TYPE.KIBANA_DISCOVER) && entityOptions.length > 0 && _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.customUrlsEditor.queryEntitiesLabel",
      defaultMessage: "Query entities"
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    placeholder: _i18n.i18n.translate('xpack.ml.customUrlsEditor.selectEntitiesPlaceholder', {
      defaultMessage: 'Select entities'
    }),
    options: entityOptions,
    selectedOptions: selectedEntityOptions,
    onChange: onQueryEntitiesChange,
    isClearable: true
  })), (type === _constants.URL_TYPE.KIBANA_DASHBOARD || type === _constants.URL_TYPE.KIBANA_DISCOVER) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.customUrlsEditor.timeRangeLabel",
      defaultMessage: "Time range"
    }),
    className: "url-time-range",
    compressed: true
  }, _react.default.createElement(_eui.EuiSelect, {
    options: timeRangeOptions,
    value: timeRange.type,
    onChange: onTimeRangeTypeChange,
    compressed: true
  }))), timeRange.type === _constants.TIME_RANGE_TYPE.INTERVAL && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.customUrlsEditor.intervalLabel",
      defaultMessage: "Interval"
    }),
    className: "url-time-range",
    error: invalidIntervalError,
    isInvalid: isInvalidTimeRange,
    compressed: true
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: timeRange.interval,
    onChange: onTimeRangeIntervalChange,
    isInvalid: isInvalidTimeRange,
    compressed: true
  }))))), type === _constants.URL_TYPE.OTHER && _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.customUrlsEditor.urlLabel",
      defaultMessage: "URL"
    }),
    compressed: true,
    fullWidth: true
  }, _react.default.createElement(_eui.EuiTextArea, {
    fullWidth: true,
    rows: 2,
    value: otherUrlSettings.urlValue,
    onChange: onOtherUrlValueChange,
    compressed: true
  }))));
};

exports.CustomUrlEditor = CustomUrlEditor;