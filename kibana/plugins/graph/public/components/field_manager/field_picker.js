"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldPicker = FieldPicker;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _classnames = _interopRequireDefault(require("classnames"));

var _public = require("../../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function FieldPicker(_ref) {
  var fieldMap = _ref.fieldMap,
      selectField = _ref.selectField,
      deselectField = _ref.deselectField,
      open = _ref.open,
      setOpen = _ref.setOpen;
  var allFields = Object.values(fieldMap);
  var hasFields = allFields.length > 0;

  var _useState = (0, _react.useState)(toOptions(allFields)),
      _useState2 = _slicedToArray(_useState, 2),
      fieldOptions = _useState2[0],
      setFieldOptions = _useState2[1];

  (0, _react.useEffect)(function () {
    if (!open) {
      // only update the field options if the popover is not open currently.
      // This is necessary because EuiSelectable assumes options don't change
      // on their own.
      setFieldOptions(toOptions(Object.values(fieldMap)));
    }
  }, [fieldMap, open]);

  var badgeDescription = _i18n.i18n.translate('xpack.graph.bar.pickFieldsLabel', {
    defaultMessage: 'Add fields'
  });

  return _react.default.createElement(_eui.EuiPopover, {
    id: "graphFieldPicker",
    anchorPosition: "downLeft",
    ownFocus: true,
    panelPaddingSize: "none",
    button: _react.default.createElement(_eui.EuiBadge, {
      "data-test-subj": "graph-add-field-button",
      className: (0, _classnames.default)('gphFieldPicker__button', {
        'gphFieldPicker__button--disabled': !hasFields
      }),
      color: "hollow",
      iconType: "plusInCircleFilled",
      "aria-disabled": !hasFields,
      onClick: function onClick() {
        if (hasFields) {
          setOpen(true);
        }
      },
      onClickAriaLabel: badgeDescription
    }, badgeDescription),
    isOpen: open,
    closePopover: function closePopover() {
      return setOpen(false);
    },
    panelClassName: "gphFieldPicker__popoverPanel"
  }, open && _react.default.createElement(_eui.EuiSelectable, {
    searchProps: {
      placeholder: _i18n.i18n.translate('xpack.graph.fieldManager.fieldSearchPlaceholder', {
        defaultMessage: 'Filter by'
      }),
      compressed: true,
      'data-test-subj': 'graph-field-search'
    },
    listProps: {
      className: 'gphFieldPicker__selectableList'
    },
    searchable: true,
    options: fieldOptions,
    onChange: function onChange(newOptions) {
      newOptions.forEach(function (option) {
        if (option.checked === 'on' && !fieldMap[option.label].selected) {
          selectField(option.label);
        } else if (option.checked !== 'on' && fieldMap[option.label].selected) {
          deselectField(option.label);
        }
      });
      setFieldOptions(newOptions);
    }
  }, function (list, search) {
    return _react.default.createElement(_react.default.Fragment, null, search, list);
  }));
}

function toOptions(fields) {
  return fields // don't show non-aggregatable fields, except for the case when they are already selected.
  // this is necessary to ensure backwards compatibility with existing workspaces that might
  // contain non-aggregatable fields.
  .filter(function (field) {
    return isExplorable(field) || field.selected;
  }).map(function (field) {
    return {
      label: field.name,
      prepend: _react.default.createElement(_public.FieldIcon, {
        className: "eui-alignMiddle",
        type: field.type,
        fill: "none"
      }),
      checked: field.selected ? 'on' : undefined
    };
  });
}

var explorableTypes = ['string', 'number', 'date', 'ip', 'boolean'];

function isExplorable(field) {
  if (!field.aggregatable) {
    return false;
  }

  return explorableTypes.includes(field.type);
}