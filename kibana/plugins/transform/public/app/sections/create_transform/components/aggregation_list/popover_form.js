"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoverForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../../../common/types/common");

var _common2 = require("../../../../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getDefaultPercents(defaultData) {
  if ((0, _common2.isPivotAggsConfigPercentiles)(defaultData)) {
    return defaultData.percents;
  }
}

function parsePercentsInput(inputValue) {
  if (inputValue !== undefined) {
    var strVals = inputValue.split(',');
    var percents = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = strVals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var str = _step.value;

        if (str.trim().length > 0 && isNaN(str) === false) {
          var val = Number(str);

          if (val >= 0 && val <= 100) {
            percents.push(val);
          } else {
            return [];
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return percents;
  }

  return [];
}

var PopoverForm = function PopoverForm(_ref) {
  var defaultData = _ref.defaultData,
      otherAggNames = _ref.otherAggNames,
      onChange = _ref.onChange,
      options = _ref.options;
  var isUnsupportedAgg = !(0, _common2.isPivotAggsConfigWithUiSupport)(defaultData);

  var _useState = (0, _react.useState)(defaultData.aggName),
      _useState2 = _slicedToArray(_useState, 2),
      aggName = _useState2[0],
      setAggName = _useState2[1];

  var _useState3 = (0, _react.useState)(defaultData.agg),
      _useState4 = _slicedToArray(_useState3, 2),
      agg = _useState4[0],
      setAgg = _useState4[1];

  var _useState5 = (0, _react.useState)((0, _common2.isPivotAggsConfigWithUiSupport)(defaultData) ? defaultData.field : ''),
      _useState6 = _slicedToArray(_useState5, 2),
      field = _useState6[0],
      setField = _useState6[1];

  var _useState7 = (0, _react.useState)(getDefaultPercents(defaultData)),
      _useState8 = _slicedToArray(_useState7, 2),
      percents = _useState8[0],
      setPercents = _useState8[1];

  var availableFields = [];
  var availableAggs = [];

  function updateAgg(aggVal) {
    setAgg(aggVal);

    if (aggVal === _common2.PIVOT_SUPPORTED_AGGS.PERCENTILES && percents === undefined) {
      setPercents(_common2.PERCENTILES_AGG_DEFAULT_PERCENTS);
    }
  }

  function updatePercents(inputValue) {
    setPercents(parsePercentsInput(inputValue));
  }

  function getUpdatedItem() {
    var updatedItem;

    if (agg !== _common2.PIVOT_SUPPORTED_AGGS.PERCENTILES) {
      updatedItem = {
        agg: agg,
        aggName: aggName,
        field: field,
        dropDownName: defaultData.dropDownName
      };
    } else {
      updatedItem = {
        agg: agg,
        aggName: aggName,
        field: field,
        dropDownName: defaultData.dropDownName,
        percents: percents
      };
    }

    return updatedItem;
  }

  if (!isUnsupportedAgg) {
    var optionsArr = (0, _common.dictionaryToArray)(options);
    optionsArr.filter(function (o) {
      return o.agg === defaultData.agg;
    }).forEach(function (o) {
      availableFields.push({
        text: o.field
      });
    });
    optionsArr.filter(function (o) {
      return (0, _common2.isPivotAggsConfigWithUiSupport)(defaultData) && o.field === defaultData.field;
    }).forEach(function (o) {
      availableAggs.push({
        text: o.agg
      });
    });
  }

  var aggNameError = '';
  var validAggName = (0, _common2.isAggName)(aggName);

  if (!validAggName) {
    aggNameError = _i18n.i18n.translate('xpack.transform.agg.popoverForm.aggNameInvalidCharError', {
      defaultMessage: 'Invalid name. The characters "[", "]", and ">" are not allowed and the name must not start or end with a space character.'
    });
  }

  if (validAggName) {
    validAggName = !otherAggNames.includes(aggName);
    aggNameError = _i18n.i18n.translate('xpack.transform.agg.popoverForm.aggNameAlreadyUsedError', {
      defaultMessage: 'Another aggregation already uses that name.'
    });
  }

  var percentsText;

  if (percents !== undefined) {
    percentsText = percents.toString();
  }

  var validPercents = agg === _common2.PIVOT_SUPPORTED_AGGS.PERCENTILES && parsePercentsInput(percentsText).length > 0;
  var formValid = validAggName;

  if (formValid && agg === _common2.PIVOT_SUPPORTED_AGGS.PERCENTILES) {
    formValid = validPercents;
  }

  return _react.default.createElement(_eui.EuiForm, {
    style: {
      width: '300px'
    }
  }, _react.default.createElement(_eui.EuiFormRow, {
    error: !validAggName && [aggNameError],
    isInvalid: !validAggName,
    helpText: isUnsupportedAgg ? _i18n.i18n.translate('xpack.transform.agg.popoverForm.unsupportedAggregationHelpText', {
      defaultMessage: 'Only the aggregation name can be edited in this form. Please use the advanced editor to edit the other parts of the aggregation.'
    }) : '',
    label: _i18n.i18n.translate('xpack.transform.agg.popoverForm.nameLabel', {
      defaultMessage: 'Aggregation name'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: aggName,
    isInvalid: !validAggName,
    onChange: function onChange(e) {
      return setAggName(e.target.value);
    }
  })), availableAggs.length > 0 && _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.agg.popoverForm.aggLabel', {
      defaultMessage: 'Aggregation'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    options: availableAggs,
    value: agg,
    onChange: function onChange(e) {
      return updateAgg(e.target.value);
    }
  })), availableFields.length > 0 && _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.agg.popoverForm.fieldLabel', {
      defaultMessage: 'Field'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    options: availableFields,
    value: field,
    onChange: function onChange(e) {
      return setField(e.target.value);
    }
  })), agg === _common2.PIVOT_SUPPORTED_AGGS.PERCENTILES && _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.agg.popoverForm.percentsLabel', {
      defaultMessage: 'Percents'
    }),
    error: !validPercents && [_i18n.i18n.translate('xpack.transform.groupBy.popoverForm.intervalPercents', {
      defaultMessage: 'Enter a comma-separated list of percentiles'
    })],
    isInvalid: !validPercents
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: percentsText,
    onChange: function onChange(e) {
      return updatePercents(e.target.value);
    }
  })), isUnsupportedAgg && _react.default.createElement(_eui.EuiCodeEditor, {
    mode: "json",
    theme: "textmate",
    width: "100%",
    height: "200px",
    value: JSON.stringify((0, _common2.getEsAggFromAggConfig)(defaultData), null, 2),
    setOptions: {
      fontSize: '12px',
      showLineNumbers: false
    },
    isReadOnly: true,
    "aria-label": "Read only code editor"
  }), _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true
  }, _react.default.createElement(_eui.EuiButton, {
    isDisabled: !formValid,
    onClick: function onClick() {
      return onChange(getUpdatedItem());
    }
  }, _i18n.i18n.translate('xpack.transform.agg.popoverForm.submitButtonLabel', {
    defaultMessage: 'Apply'
  }))));
};

exports.PopoverForm = PopoverForm;