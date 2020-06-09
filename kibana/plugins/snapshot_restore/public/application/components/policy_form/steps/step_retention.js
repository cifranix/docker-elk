"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyStepRetention = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../../common/constants");

var _documentation = require("../../../services/documentation");

var _text = require("../../../services/text");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getExpirationTimeOptions = function getExpirationTimeOptions() {
  var unitSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';
  return Object.entries(_constants.TIME_UNITS).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        _key = _ref2[0],
        value = _ref2[1];

    return {
      text: _text.textService.getTimeUnitLabel(value, unitSize),
      value: value
    };
  });
};

var PolicyStepRetention = function PolicyStepRetention(_ref3) {
  var policy = _ref3.policy,
      updatePolicy = _ref3.updatePolicy,
      errors = _ref3.errors;
  var _policy$retention = policy.retention,
      retention = _policy$retention === void 0 ? {} : _policy$retention;

  var updatePolicyRetention = function updatePolicyRetention(updatedFields) {
    var newRetention = _objectSpread({}, retention, {}, updatedFields);

    updatePolicy({
      retention: newRetention
    });
  }; // State for touched inputs


  var _useState = (0, _react.useState)({
    expireAfterValue: false,
    minCount: false,
    maxCount: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      touched = _useState2[0],
      setTouched = _useState2[1];

  var renderExpireAfterField = function renderExpireAfterField() {
    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepRetention.expirationTitle",
        defaultMessage: "Expiration"
      }))),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepRetention.expirationDescription",
        defaultMessage: "The time to wait before deleting snapshots."
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFormRow, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepRetention.expireAfterLabel",
        defaultMessage: "Delete after"
      }),
      isInvalid: touched.expireAfterValue && Boolean(errors.expireAfterValue),
      error: errors.expireAfterValue,
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
      value: retention.expireAfterValue || '',
      onBlur: function onBlur() {
        return setTouched(_objectSpread({}, touched, {
          expireAfterValue: true
        }));
      },
      onChange: function onChange(e) {
        var value = e.target.value;
        updatePolicyRetention({
          expireAfterValue: value !== '' ? Number(value) : value
        });
      },
      "data-test-subj": "expireAfterValueInput",
      min: 0
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSelect, {
      value: retention.expireAfterUnit,
      options: getExpirationTimeOptions(retention.expireAfterValue ? retention.expireAfterValue.toString() : undefined),
      onChange: function onChange(e) {
        updatePolicyRetention({
          expireAfterUnit: e.target.value
        });
      },
      "data-test-subj": "expireAfterUnitSelect"
    })))));
  };

  var renderCountFields = function renderCountFields() {
    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepRetention.countTitle",
        defaultMessage: "Snapshots to retain"
      }))),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepRetention.countDescription",
        defaultMessage: "The minimum and maximum number of snapshots to store in your cluster."
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepRetention.minCountLabel",
        defaultMessage: "Mininum count"
      }),
      isInvalid: touched.minCount && Boolean(errors.minCount),
      error: errors.minCount,
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFieldNumber, {
      fullWidth: true,
      value: retention.minCount || '',
      onBlur: function onBlur() {
        return setTouched(_objectSpread({}, touched, {
          minCount: true
        }));
      },
      onChange: function onChange(e) {
        var value = e.target.value;
        updatePolicyRetention({
          minCount: value !== '' ? Number(value) : value
        });
      },
      "data-test-subj": "minCountInput",
      min: 0
    }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepRetention.maxCountLabel",
        defaultMessage: "Maximum count"
      }),
      isInvalid: touched.maxCount && Boolean(errors.maxCount),
      error: errors.maxCount,
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFieldNumber, {
      fullWidth: true,
      value: retention.maxCount || '',
      onBlur: function onBlur() {
        return setTouched(_objectSpread({}, touched, {
          maxCount: true
        }));
      },
      onChange: function onChange(e) {
        var value = e.target.value;
        updatePolicyRetention({
          maxCount: value !== '' ? Number(value) : value
        });
      },
      "data-test-subj": "maxCountInput",
      min: 0
    })))));
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.stepRetentionTitle",
    defaultMessage: "Snapshot retention (optional)"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "right",
    href: _documentation.documentationLinksService.getSlmUrl(),
    target: "_blank",
    iconType: "help"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.stepRetention.docsButtonLabel",
    defaultMessage: "Snapshot retention docs"
  })))), renderExpireAfterField(), renderCountFields());
};

exports.PolicyStepRetention = PolicyStepRetention;