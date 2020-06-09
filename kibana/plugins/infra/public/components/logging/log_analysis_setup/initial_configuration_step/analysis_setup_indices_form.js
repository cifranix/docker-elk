"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalysisSetupIndicesForm = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _loading_overlay_wrapper = require("../../../loading_overlay_wrapper");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AnalysisSetupIndicesForm = function AnalysisSetupIndicesForm(_ref) {
  var _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      indices = _ref.indices,
      isValidating = _ref.isValidating,
      onChangeSelectedIndices = _ref.onChangeSelectedIndices,
      valid = _ref.valid;
  var handleCheckboxChange = (0, _react2.useCallback)(function (event) {
    onChangeSelectedIndices(indices.map(function (index) {
      var checkbox = event.currentTarget;
      return index.name === checkbox.id ? _objectSpread({}, index, {
        isSelected: checkbox.checked
      }) : index;
    }));
  }, [indices, onChangeSelectedIndices]);
  var choices = (0, _react2.useMemo)(function () {
    return indices.map(function (index) {
      var checkbox = _react2.default.createElement(_eui.EuiCheckbox, {
        key: index.name,
        id: index.name,
        label: _react2.default.createElement(_eui.EuiCode, null, index.name),
        onChange: handleCheckboxChange,
        checked: index.validity === 'valid' && index.isSelected,
        disabled: disabled || index.validity === 'invalid'
      });

      return index.validity === 'valid' ? checkbox : _react2.default.createElement("div", {
        key: index.name
      }, _react2.default.createElement(_eui.EuiToolTip, {
        content: formatValidationError(index.errors)
      }, checkbox));
    });
  }, [disabled, handleCheckboxChange, indices]);
  return _react2.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.analysisSetup.indicesSelectionTitle",
      defaultMessage: "Choose indices"
    })),
    description: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.analysisSetup.indicesSelectionDescription",
      defaultMessage: "By default, Machine Learning analyzes log messages in all log indices configured for the source. You can choose to only analyze a subset of the index names. Every selected index name must match at least one index with log entries."
    })
  }, _react2.default.createElement(_loading_overlay_wrapper.LoadingOverlayWrapper, {
    isLoading: isValidating
  }, _react2.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    isInvalid: !valid,
    label: indicesSelectionLabel,
    labelType: "legend"
  }, _react2.default.createElement(_react2.default.Fragment, null, choices))));
};

exports.AnalysisSetupIndicesForm = AnalysisSetupIndicesForm;

var indicesSelectionLabel = _i18n.i18n.translate('xpack.infra.analysisSetup.indicesSelectionLabel', {
  defaultMessage: 'Indices'
});

var formatValidationError = function formatValidationError(errors) {
  return errors.map(function (error) {
    switch (error.error) {
      case 'INDEX_NOT_FOUND':
        return _react2.default.createElement("p", {
          key: "".concat(error.error, "-").concat(error.index)
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.infra.analysisSetup.indicesSelectionIndexNotFound",
          defaultMessage: "No indices match the pattern {index}",
          values: {
            index: _react2.default.createElement(_eui.EuiCode, null, error.index)
          }
        }));

      case 'FIELD_NOT_FOUND':
        return _react2.default.createElement("p", {
          key: "".concat(error.error, "-").concat(error.index, "-").concat(error.field)
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.infra.analysisSetup.indicesSelectionNoTimestampField",
          defaultMessage: "At least one index matching {index} lacks a required field {field}.",
          values: {
            index: _react2.default.createElement(_eui.EuiCode, null, error.index),
            field: _react2.default.createElement(_eui.EuiCode, null, error.field)
          }
        }));

      case 'FIELD_NOT_VALID':
        return _react2.default.createElement("p", {
          key: "".concat(error.error, "-").concat(error.index, "-").concat(error.field)
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.infra.analysisSetup.indicesSelectionTimestampNotValid",
          defaultMessage: "At least one index matching {index} has a field called {field} without the correct type.",
          values: {
            index: _react2.default.createElement(_eui.EuiCode, null, error.index),
            field: _react2.default.createElement(_eui.EuiCode, null, error.field)
          }
        }));

      default:
        return '';
    }
  });
};