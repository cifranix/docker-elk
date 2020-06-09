"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldRuleEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _model = require("../../model");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userFields = [{
  name: 'username'
}, {
  name: 'dn'
}, {
  name: 'groups'
}, {
  name: 'realm.name'
}];
var fieldOptions = userFields.map(function (f) {
  return {
    label: f.name
  };
});
var comparisonOptions = {
  text: {
    id: 'text',
    defaultValue: '*'
  },
  number: {
    id: 'number',
    defaultValue: 0
  },
  null: {
    id: 'null',
    defaultValue: null
  },
  boolean: {
    id: 'boolean',
    defaultValue: true
  }
};

var FieldRuleEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(FieldRuleEditor, _Component);

  function FieldRuleEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FieldRuleEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FieldRuleEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderFieldRow", function (field, ruleValue, valueIndex) {
      var isPrimaryRow = valueIndex === 0;
      var renderAddValueButton = true;
      var rowRuleValue = ruleValue;

      if (Array.isArray(ruleValue)) {
        renderAddValueButton = ruleValue.length - 1 === valueIndex;
        rowRuleValue = ruleValue[valueIndex];
      }

      var comparisonType = _this.getComparisonType(rowRuleValue);

      return _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: 1
      }, isPrimaryRow ? _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.security.management.editRoleMapping.fieldRuleEditor.userFieldLabel', {
          defaultMessage: 'User field'
        })
      }, _react.default.createElement(_eui.EuiComboBox, {
        isClearable: false,
        selectedOptions: [{
          label: field
        }],
        singleSelection: {
          asPlainText: true
        },
        onChange: _this.onFieldChange,
        onCreateOption: _this.onAddField,
        options: fieldOptions,
        "data-test-subj": "fieldRuleEditorField-".concat(valueIndex, " fieldRuleEditorField-").concat(valueIndex, "-combo")
      })) : _react.default.createElement(_eui.EuiFormRow, {
        hasEmptyLabelSpace: true
      }, _react.default.createElement(_eui.EuiExpression, {
        description: _i18n.i18n.translate('xpack.security.management.editRoleMapping.fieldRuleEditor.orLabel', {
          defaultMessage: 'or'
        }),
        value: field,
        "data-test-subj": "fieldRuleEditorField-".concat(valueIndex, " fieldRuleEditorField-").concat(valueIndex, "-expression")
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _this.renderFieldTypeInput(comparisonType.id, valueIndex)), _react.default.createElement(_eui.EuiFlexItem, {
        grow: 1
      }, _this.renderFieldValueInput(comparisonType.id, rowRuleValue, valueIndex)), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiFormRow, {
        hasEmptyLabelSpace: true
      }, renderAddValueButton ? _react.default.createElement(_eui.EuiButtonIcon, {
        iconSize: "s",
        iconType: "plusInCircle",
        onClick: _this.onAddAlternateValue,
        color: "primary",
        "data-test-subj": "addAlternateValueButton",
        "aria-label": _i18n.i18n.translate('xpack.security.management.editRoleMapping.fieldRuleEditor.addAlternateValueButton', {
          defaultMessage: 'Add alternate value'
        })
      }) : _react.default.createElement(_eui.EuiIcon, {
        size: "l",
        type: "empty",
        "aria-hidden": true
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: 1
      }, _react.default.createElement(_eui.EuiFormRow, {
        hasEmptyLabelSpace: true
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        iconType: "trash",
        color: "danger",
        iconSize: "s",
        "data-test-subj": "fieldRuleEditorDeleteValue fieldRuleEditorDeleteValue-".concat(valueIndex),
        "aria-label": _i18n.i18n.translate('xpack.security.management.editRoleMapping.fieldRuleEditor.deleteValueLabel', {
          defaultMessage: 'Delete value'
        }),
        onClick: function onClick() {
          return _this.onRemoveAlternateValue(valueIndex);
        }
      }))));
    });

    _defineProperty(_assertThisInitialized(_this), "renderFieldTypeInput", function (inputType, valueIndex) {
      return _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.security.management.editRoleMapping.fieldRuleEditor.typeFormRow', {
          defaultMessage: 'Type'
        }),
        key: valueIndex
      }, _react.default.createElement(_eui.EuiSelect, {
        options: [{
          value: 'text',
          text: 'text'
        }, {
          value: 'number',
          text: 'number'
        }, {
          value: 'null',
          text: 'is null'
        }, {
          value: 'boolean',
          text: 'boolean'
        }],
        "data-test-subj": "fieldRuleEditorValueType-".concat(valueIndex),
        value: inputType,
        onChange: function onChange(e) {
          return _this.onComparisonTypeChange(valueIndex, e.target.value);
        }
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderFieldValueInput", function (fieldType, rowRuleValue, valueIndex) {
      var inputField = _this.getInputFieldForType(fieldType, rowRuleValue, valueIndex);

      return _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.security.management.editRoleMapping.fieldRuleEditor.valueFormRow', {
          defaultMessage: 'Value'
        }),
        key: valueIndex
      }, inputField);
    });

    _defineProperty(_assertThisInitialized(_this), "getInputFieldForType", function (fieldType, rowRuleValue, valueIndex) {
      var isNullValue = rowRuleValue === null;
      var commonProps = {
        'data-test-subj': "fieldRuleEditorValue-".concat(valueIndex)
      };

      switch (fieldType) {
        case 'boolean':
          return _react.default.createElement(_eui.EuiSelect, _extends({}, commonProps, {
            value: rowRuleValue === null || rowRuleValue === void 0 ? void 0 : rowRuleValue.toString(),
            onChange: _this.onBooleanValueChange(valueIndex),
            options: [{
              value: 'true',
              text: 'true'
            }, {
              value: 'false',
              text: 'false'
            }]
          }));

        case 'text':
        case 'null':
          return _react.default.createElement(_eui.EuiFieldText, _extends({}, commonProps, {
            value: isNullValue ? '-- null --' : rowRuleValue,
            onChange: _this.onValueChange(valueIndex),
            disabled: isNullValue
          }));

        case 'number':
          return _react.default.createElement(_eui.EuiFieldNumber, {
            "data-test-subj": "fieldRuleEditorValue-".concat(valueIndex),
            value: rowRuleValue,
            onChange: _this.onNumericValueChange(valueIndex)
          });

        default:
          throw new Error("Unsupported input field type: ".concat(fieldType));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onAddAlternateValue", function () {
      var _this$props$rule = _this.props.rule,
          field = _this$props$rule.field,
          value = _this$props$rule.value;
      var nextValue = Array.isArray(value) ? _toConsumableArray(value) : [value];
      nextValue.push('*');

      _this.props.onChange(new _model.FieldRule(field, nextValue));
    });

    _defineProperty(_assertThisInitialized(_this), "onRemoveAlternateValue", function (index) {
      var _this$props$rule2 = _this.props.rule,
          field = _this$props$rule2.field,
          value = _this$props$rule2.value;

      if (!Array.isArray(value) || value.length === 1) {
        // Only one value left. Delete entire rule instead.
        _this.props.onDelete();

        return;
      }

      var nextValue = _toConsumableArray(value);

      nextValue.splice(index, 1);

      _this.props.onChange(new _model.FieldRule(field, nextValue));
    });

    _defineProperty(_assertThisInitialized(_this), "onFieldChange", function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          newField = _ref2[0];

      if (!newField) {
        return;
      }

      var value = _this.props.rule.value;

      _this.props.onChange(new _model.FieldRule(newField.label, value));
    });

    _defineProperty(_assertThisInitialized(_this), "onAddField", function (newField) {
      var value = _this.props.rule.value;

      _this.props.onChange(new _model.FieldRule(newField, value));
    });

    _defineProperty(_assertThisInitialized(_this), "onValueChange", function (index) {
      return function (e) {
        var _this$props$rule3 = _this.props.rule,
            field = _this$props$rule3.field,
            value = _this$props$rule3.value;
        var nextValue;

        if (Array.isArray(value)) {
          nextValue = _toConsumableArray(value);
          nextValue.splice(index, 1, e.target.value);
        } else {
          nextValue = e.target.value;
        }

        _this.props.onChange(new _model.FieldRule(field, nextValue));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onNumericValueChange", function (index) {
      return function (e) {
        var _this$props$rule4 = _this.props.rule,
            field = _this$props$rule4.field,
            value = _this$props$rule4.value;
        var nextValue;

        if (Array.isArray(value)) {
          nextValue = _toConsumableArray(value);
          nextValue.splice(index, 1, parseFloat(e.target.value));
        } else {
          nextValue = parseFloat(e.target.value);
        }

        _this.props.onChange(new _model.FieldRule(field, nextValue));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onBooleanValueChange", function (index) {
      return function (e) {
        var boolValue = e.target.value === 'true';
        var _this$props$rule5 = _this.props.rule,
            field = _this$props$rule5.field,
            value = _this$props$rule5.value;
        var nextValue;

        if (Array.isArray(value)) {
          nextValue = _toConsumableArray(value);
          nextValue.splice(index, 1, boolValue);
        } else {
          nextValue = boolValue;
        }

        _this.props.onChange(new _model.FieldRule(field, nextValue));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onComparisonTypeChange", function (index, newType) {
      var comparison = comparisonOptions[newType];

      if (!comparison) {
        throw new Error("Unexpected comparison type: ".concat(newType));
      }

      var _this$props$rule6 = _this.props.rule,
          field = _this$props$rule6.field,
          value = _this$props$rule6.value;
      var nextValue = value;

      if (Array.isArray(value)) {
        nextValue = _toConsumableArray(value);
        nextValue.splice(index, 1, comparison.defaultValue);
      } else {
        nextValue = comparison.defaultValue;
      }

      _this.props.onChange(new _model.FieldRule(field, nextValue));
    });

    return _this;
  }

  _createClass(FieldRuleEditor, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$rule7 = this.props.rule,
          field = _this$props$rule7.field,
          value = _this$props$rule7.value;
      var content = Array.isArray(value) ? value.map(function (v, index) {
        return _this2.renderFieldRow(field, value, index);
      }) : [this.renderFieldRow(field, value, 0)];
      return _react.default.createElement(_eui.EuiFlexGroup, {
        direction: "column"
      }, content.map(function (row, index) {
        return _react.default.createElement(_eui.EuiFlexItem, {
          key: index
        }, row);
      }));
    }
  }, {
    key: "getComparisonType",
    value: function getComparisonType(ruleValue) {
      var valueType = _typeof(ruleValue);

      if (valueType === 'string' || valueType === 'undefined') {
        return comparisonOptions.text;
      }

      if (valueType === 'number') {
        return comparisonOptions.number;
      }

      if (valueType === 'boolean') {
        return comparisonOptions.boolean;
      }

      if (ruleValue === null) {
        return comparisonOptions.null;
      }

      throw new Error("Unable to detect comparison type for rule value [".concat(ruleValue, "]"));
    }
  }]);

  return FieldRuleEditor;
}(_react.Component);

exports.FieldRuleEditor = FieldRuleEditor;