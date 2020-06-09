"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldManagerComponent = FieldManagerComponent;
exports.FieldManager = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _field_picker = require("./field_picker");

var _field_editor = require("./field_editor");

var _state_management = require("../../state_management");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function FieldManagerComponent(props) {
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    className: "gphFieldManager",
    alignItems: "center"
  }, props.selectedFields.map(function (field) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: field.name,
      grow: false
    }, _react.default.createElement(_field_editor.FieldEditor, _extends({}, props, {
      field: field
    })));
  }), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_field_picker.FieldPicker, _extends({}, props, {
    open: props.pickerOpen,
    setOpen: props.setPickerOpen
  }))));
}

var FieldManager = (0, _reactRedux.connect)(function (state) {
  return {
    fieldMap: (0, _state_management.fieldMapSelector)(state),
    allFields: (0, _state_management.fieldsSelector)(state),
    selectedFields: (0, _state_management.selectedFieldsSelector)(state)
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({
    updateFieldProperties: _state_management.updateFieldProperties,
    selectField: _state_management.selectField,
    deselectField: _state_management.deselectField
  }, dispatch);
})(FieldManagerComponent);
exports.FieldManager = FieldManager;