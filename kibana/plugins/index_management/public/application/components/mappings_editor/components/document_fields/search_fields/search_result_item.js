"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchResultItem = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _constants = require("../../../constants");

var _mappings_state = require("../../../mappings_state");

var _lib = require("../../../lib");

var _delete_field_provider = require("../fields/delete_field_provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SearchResultItem = _react.default.memo(function FieldListItemFlatComponent(_ref) {
  var _ref$item = _ref.item,
      display = _ref$item.display,
      field = _ref$item.field,
      areActionButtonsVisible = _ref.areActionButtonsVisible,
      isHighlighted = _ref.isHighlighted,
      isDimmed = _ref.isDimmed;
  var dispatch = (0, _mappings_state.useDispatch)();
  var source = field.source,
      isMultiField = field.isMultiField,
      hasChildFields = field.hasChildFields,
      hasMultiFields = field.hasMultiFields;

  var editField = function editField() {
    dispatch({
      type: 'documentField.editField',
      value: field.id
    });
  };

  var renderActionButtons = function renderActionButtons() {
    if (!areActionButtonsVisible) {
      return null;
    }

    var editButtonLabel = _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.editFieldButtonLabel', {
      defaultMessage: 'Edit'
    });

    var deleteButtonLabel = _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.removeFieldButtonLabel', {
      defaultMessage: 'Remove'
    });

    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s",
      className: "mappingsEditor__fieldsListItem__actions"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: editButtonLabel
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      iconType: "pencil",
      onClick: editField,
      "data-test-subj": "editFieldButton",
      "aria-label": editButtonLabel
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_delete_field_provider.DeleteFieldProvider, null, function (deleteField) {
      return _react.default.createElement(_eui.EuiToolTip, {
        content: deleteButtonLabel
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        iconType: "trash",
        color: "danger",
        onClick: function onClick() {
          return deleteField(field);
        },
        "data-test-subj": "removeFieldButton",
        "aria-label": deleteButtonLabel
      }));
    })));
  };

  return _react.default.createElement("div", {
    className: (0, _classnames.default)('mappingsEditor__fieldsListItem'),
    "data-test-subj": "fieldsListItem"
  }, _react.default.createElement("div", {
    className: (0, _classnames.default)('mappingsEditor__fieldsListItem__field', {
      'mappingsEditor__fieldsListItem__field--enabled': areActionButtonsVisible,
      'mappingsEditor__fieldsListItem__field--selected': isHighlighted,
      'mappingsEditor__fieldsListItem__field--dim': isDimmed
    })
  }, _react.default.createElement("div", {
    className: (0, _classnames.default)('mappingsEditor__fieldsListItem__wrapper')
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    alignItems: "center",
    className: (0, _classnames.default)('mappingsEditor__fieldsListItem__content', {
      'mappingsEditor__fieldsListItem__content--toggle': hasChildFields || hasMultiFields,
      'mappingsEditor__fieldsListItem__content--multiField': isMultiField
    })
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "mappingsEditor__fieldsListItem__name"
  }, display), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiBadge, {
    color: "hollow"
  }, isMultiField ? _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.multiFieldBadgeLabel', {
    defaultMessage: '{dataType} multi-field',
    values: {
      dataType: _constants.TYPE_DEFINITION[source.type].label
    }
  }) : (0, _lib.getTypeLabelFromType)(source.type))), _react.default.createElement(_eui.EuiFlexItem, null, renderActionButtons())))));
});

exports.SearchResultItem = SearchResultItem;