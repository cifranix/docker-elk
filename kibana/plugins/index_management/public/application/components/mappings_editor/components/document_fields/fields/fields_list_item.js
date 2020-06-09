"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldsListItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lib = require("../../../lib");

var _constants = require("../../../constants");

var _chained_multifields_warning = require("../../chained_multifields_warning");

var _fields_list = require("./fields_list");

var _create_field = require("./create_field");

var _delete_field_provider = require("./delete_field_provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function FieldListItemComponent(_ref, ref) {
  var field = _ref.field,
      allFields = _ref.allFields,
      isHighlighted = _ref.isHighlighted,
      isDimmed = _ref.isDimmed,
      isCreateFieldFormVisible = _ref.isCreateFieldFormVisible,
      areActionButtonsVisible = _ref.areActionButtonsVisible,
      isChainedMultifieldsWarningVisible = _ref.isChainedMultifieldsWarningVisible,
      isLastItem = _ref.isLastItem,
      childFieldsArray = _ref.childFieldsArray,
      maxNestedDepth = _ref.maxNestedDepth,
      addField = _ref.addField,
      editField = _ref.editField,
      toggleExpand = _ref.toggleExpand,
      treeDepth = _ref.treeDepth;
  var source = field.source,
      isMultiField = field.isMultiField,
      canHaveChildFields = field.canHaveChildFields,
      hasChildFields = field.hasChildFields,
      canHaveMultiFields = field.canHaveMultiFields,
      hasMultiFields = field.hasMultiFields,
      isExpanded = field.isExpanded; // When there aren't any "child" fields (the maxNestedDepth === 0), there is no toggle icon on the left of any field.
  // For that reason, we need to compensate and substract some indent to left align on the page.

  var substractIndentAmount = maxNestedDepth === 0 ? _constants.CHILD_FIELD_INDENT_SIZE * 0.5 : 0;
  var indent = treeDepth * _constants.CHILD_FIELD_INDENT_SIZE - substractIndentAmount;
  var indentCreateField = (treeDepth + 1) * _constants.CHILD_FIELD_INDENT_SIZE + _constants.LEFT_PADDING_SIZE_FIELD_ITEM_WRAPPER - substractIndentAmount;
  var hasDottedLine = isMultiField ? isLastItem ? false : true : canHaveMultiFields && isExpanded;

  var renderCreateField = function renderCreateField() {
    if (!isCreateFieldFormVisible) {
      return null;
    }

    return _react.default.createElement(_create_field.CreateField, {
      allFields: allFields,
      isRootLevelField: false,
      isMultiField: canHaveMultiFields,
      paddingLeft: indentCreateField,
      maxNestedDepth: maxNestedDepth
    });
  };

  var renderActionButtons = function renderActionButtons() {
    if (!areActionButtonsVisible) {
      return null;
    }

    var addMultiFieldButtonLabel = _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.addMultiFieldTooltipLabel', {
      defaultMessage: 'Add a multi-field to index the same field in different ways.'
    });

    var addPropertyButtonLabel = _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.addPropertyButtonLabel', {
      defaultMessage: 'Add property'
    });

    var editButtonLabel = _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.editFieldButtonLabel', {
      defaultMessage: 'Edit'
    });

    var deleteButtonLabel = _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.removeFieldButtonLabel', {
      defaultMessage: 'Remove'
    });

    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s",
      className: "mappingsEditor__fieldsListItem__actions"
    }, canHaveMultiFields && _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: addMultiFieldButtonLabel
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      iconType: "documents",
      onClick: addField,
      "data-test-subj": "addMultiFieldButton",
      "aria-label": addMultiFieldButtonLabel
    }))), canHaveChildFields && _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: addPropertyButtonLabel
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      iconType: "plusInCircle",
      onClick: addField,
      "data-test-subj": "addPropertyButton",
      "aria-label": addPropertyButtonLabel
    }))), _react.default.createElement(_eui.EuiFlexItem, {
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

  return _react.default.createElement("li", {
    className: (0, _classnames.default)('mappingsEditor__fieldsListItem', {
      'mappingsEditor__fieldsListItem--dottedLine': hasDottedLine
    }),
    "data-test-subj": "fieldsListItem",
    ref: ref
  }, _react.default.createElement("div", {
    style: {
      paddingLeft: "".concat(indent, "px")
    },
    className: (0, _classnames.default)('mappingsEditor__fieldsListItem__field', {
      'mappingsEditor__fieldsListItem__field--enabled': areActionButtonsVisible,
      'mappingsEditor__fieldsListItem__field--highlighted': isHighlighted,
      'mappingsEditor__fieldsListItem__field--dim': isDimmed
    })
  }, _react.default.createElement("div", {
    className: (0, _classnames.default)('mappingsEditor__fieldsListItem__wrapper', {
      'mappingsEditor__fieldsListItem__wrapper--indent': treeDepth === 0 && maxNestedDepth === 0
    })
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    alignItems: "center",
    className: (0, _classnames.default)('mappingsEditor__fieldsListItem__content', {
      'mappingsEditor__fieldsListItem__content--toggle': hasChildFields || hasMultiFields,
      'mappingsEditor__fieldsListItem__content--multiField': isMultiField,
      'mappingsEditor__fieldsListItem__content--indent': !hasChildFields && !hasMultiFields && maxNestedDepth > treeDepth
    })
  }, (hasChildFields || hasMultiFields) && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "mappingsEditor__fieldsListItem__toggle"
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    color: "text",
    onClick: toggleExpand,
    iconType: isExpanded ? 'arrowDown' : 'arrowRight',
    "aria-label": isExpanded ? _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.collapseFieldButtonLabel', {
      defaultMessage: 'Collapse field {name}',
      values: {
        name: source.name
      }
    }) : _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.expandFieldButtonLabel', {
      defaultMessage: 'Expand field {name}',
      values: {
        name: source.name
      }
    })
  })), isMultiField && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "mappingsEditor__fieldsListItem__icon"
  }, _react.default.createElement(_eui.EuiIcon, {
    color: "subdued",
    type: "documents"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "mappingsEditor__fieldsListItem__name",
    "data-test-subj": "fieldName"
  }, source.name), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiBadge, {
    color: "hollow"
  }, isMultiField ? _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.multiFieldBadgeLabel', {
    defaultMessage: '{dataType} multi-field',
    values: {
      dataType: _constants.TYPE_DEFINITION[source.type].label
    }
  }) : (0, _lib.getTypeLabelFromType)(source.type))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, renderActionButtons())))), isExpanded && isChainedMultifieldsWarningVisible && _react.default.createElement(_chained_multifields_warning.ChainedMultifieldsWarning, null), Boolean(childFieldsArray.length) && isExpanded && _react.default.createElement(_fields_list.FieldsList, {
    fields: childFieldsArray,
    treeDepth: treeDepth + 1
  }), renderCreateField());
}

var FieldsListItem = _react.default.memo((0, _react.forwardRef)(FieldListItemComponent));

exports.FieldsListItem = FieldsListItem;