"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomUrlList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _kibana = require("../../../contexts/kibana");

var _custom_url_utils = require("../../../util/custom_url_utils");

var _utils = require("./utils");

var _parse_interval = require("../../../../../common/util/parse_interval");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isValidTimeRange(timeRange) {
  // Allow empty timeRange string, which gives the 'auto' behaviour.
  if (timeRange === undefined || timeRange.length === 0 || timeRange === _constants.TIME_RANGE_TYPE.AUTO) {
    return true;
  }

  var interval = (0, _parse_interval.parseInterval)(timeRange);
  return interval !== null;
}

/*
 * React component for listing the custom URLs added to a job,
 * with buttons for testing and deleting each custom URL.
 */
var CustomUrlList = function CustomUrlList(_ref) {
  var job = _ref.job,
      customUrls = _ref.customUrls,
      setCustomUrls = _ref.setCustomUrls;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      notifications = _useMlKibana.services.notifications;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      expandedUrlIndex = _useState2[0],
      setExpandedUrlIndex = _useState2[1];

  var onLabelChange = function onLabelChange(e, index) {
    if (index < customUrls.length) {
      customUrls[index] = _objectSpread({}, customUrls[index], {
        url_name: e.target.value
      });
      setCustomUrls(customUrls);
    }
  };

  var onUrlValueChange = function onUrlValueChange(e, index) {
    if (index < customUrls.length) {
      customUrls[index] = _objectSpread({}, customUrls[index], {
        url_value: e.target.value
      });
      setCustomUrls(customUrls);
    }
  };

  var onTimeRangeChange = function onTimeRangeChange(e, index) {
    if (index < customUrls.length) {
      customUrls[index] = _objectSpread({}, customUrls[index]);
      var timeRange = e.target.value;

      if (timeRange !== undefined && timeRange.length > 0) {
        customUrls[index].time_range = timeRange;
      } else {
        delete customUrls[index].time_range;
      }

      setCustomUrls(customUrls);
    }
  };

  var onDeleteButtonClick = function onDeleteButtonClick(index) {
    if (index < customUrls.length) {
      customUrls.splice(index, 1);
      setCustomUrls(customUrls);
    }
  };

  var onTestButtonClick = function onTestButtonClick(index) {
    if (index < customUrls.length) {
      (0, _utils.getTestUrl)(job, customUrls[index]).then(function (testUrl) {
        (0, _custom_url_utils.openCustomUrlWindow)(testUrl, customUrls[index]);
      }).catch(function (resp) {
        // eslint-disable-next-line no-console
        console.error('Error obtaining URL for test:', resp);
        var toasts = notifications.toasts;
        toasts.addDanger(_i18n.i18n.translate('xpack.ml.customUrlEditorList.obtainingUrlToTestConfigurationErrorMessage', {
          defaultMessage: 'An error occurred obtaining the URL to test the configuration'
        }));
      });
    }
  };

  var customUrlRows = customUrls.map(function (customUrl, index) {
    // Validate the label.
    var label = customUrl.url_name;

    var otherUrls = _toConsumableArray(customUrls);

    otherUrls.splice(index, 1); // Don't compare label with itself.

    var isInvalidLabel = !(0, _custom_url_utils.isValidLabel)(label, otherUrls);
    var invalidLabelError = isInvalidLabel ? [_i18n.i18n.translate('xpack.ml.customUrlEditorList.labelIsNotUniqueErrorMessage', {
      defaultMessage: 'A unique label must be supplied'
    })] : []; // Validate the time range.

    var timeRange = customUrl.time_range;
    var isInvalidTimeRange = !isValidTimeRange(timeRange);
    var invalidIntervalError = isInvalidTimeRange ? [_i18n.i18n.translate('xpack.ml.customUrlEditorList.invalidTimeRangeFormatErrorMessage', {
      defaultMessage: 'Invalid format'
    })] : [];
    return _react.default.createElement(_eui.EuiFlexGroup, {
      key: "url_".concat(index),
      "data-test-subj": "mlJobEditCustomUrlItem_".concat(index)
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFormRow, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.customUrlEditorList.labelLabel",
        defaultMessage: "Label"
      }),
      isInvalid: isInvalidLabel,
      error: invalidLabelError
    }, _react.default.createElement(_eui.EuiFieldText, {
      value: label,
      isInvalid: isInvalidLabel,
      onChange: function onChange(e) {
        return onLabelChange(e, index);
      },
      "data-test-subj": "mlJobEditCustomUrlLabelInput_".concat(index)
    }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.customUrlEditorList.urlLabel",
        defaultMessage: "URL"
      })
    }, index === expandedUrlIndex ? _react.default.createElement(_eui.EuiTextArea, {
      inputRef: function inputRef(input) {
        if (input) {
          input.focus();
        }
      },
      fullWidth: true,
      value: customUrl.url_value,
      onChange: function onChange(e) {
        return onUrlValueChange(e, index);
      },
      onBlur: function onBlur() {
        setExpandedUrlIndex(null);
      },
      "data-test-subj": "mlJobEditCustomUrlTextarea_".concat(index)
    }) : _react.default.createElement(_eui.EuiFieldText, {
      fullWidth: true,
      value: customUrl.url_value,
      readOnly: true,
      onFocus: function onFocus() {
        return setExpandedUrlIndex(index);
      },
      "data-test-subj": "mlJobEditCustomUrlInput_".concat(index)
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFormRow, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.customUrlEditorList.timeRangeLabel",
        defaultMessage: "Time range"
      }),
      error: invalidIntervalError,
      isInvalid: isInvalidTimeRange
    }, _react.default.createElement(_eui.EuiFieldText, {
      value: customUrl.time_range || '',
      isInvalid: isInvalidTimeRange,
      placeholder: _constants.TIME_RANGE_TYPE.AUTO,
      onChange: function onChange(e) {
        return onTimeRangeChange(e, index);
      }
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFormRow, {
      hasEmptyLabelSpace: true
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.customUrlEditorList.testCustomUrlTooltip",
        defaultMessage: "Test custom URL"
      })
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      size: "s",
      color: "primary",
      onClick: function onClick() {
        return onTestButtonClick(index);
      },
      iconType: "popout",
      "aria-label": _i18n.i18n.translate('xpack.ml.customUrlEditorList.testCustomUrlAriaLabel', {
        defaultMessage: 'Test custom URL'
      })
    })))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFormRow, {
      hasEmptyLabelSpace: true
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.customUrlEditorList.deleteCustomUrlTooltip",
        defaultMessage: "Delete custom URL"
      })
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      size: "s",
      color: "danger",
      onClick: function onClick() {
        return onDeleteButtonClick(index);
      },
      iconType: "trash",
      "aria-label": _i18n.i18n.translate('xpack.ml.customUrlEditorList.deleteCustomUrlAriaLabel', {
        defaultMessage: 'Delete custom URL'
      })
    })))));
  });
  return _react.default.createElement("div", {
    "data-test-subj": "mlJobEditCustomUrlsList"
  }, customUrlRows);
};

exports.CustomUrlList = CustomUrlList;