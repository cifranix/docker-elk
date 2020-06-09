"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelationsParameter = exports.relationsDeserializer = exports.relationsSerializer = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _shared_imports = require("../../../shared_imports");

var _documentation = require("../../../../../services/documentation");

var _edit_field = require("../fields/edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Export custom serializer to be used when we need to serialize the form data to be sent to ES
 * @param field The field to be serialized
 */
var relationsSerializer = function relationsSerializer(field) {
  if (field.relations === undefined) {
    return field;
  }

  var relations = field.relations;
  var relationsSerialized = relations.reduce(function (acc, item) {
    return _objectSpread({}, acc, _defineProperty({}, item.parent, item.children.length === 1 ? item.children[0] : item.children));
  }, {});
  return _objectSpread({}, field, {
    relations: relationsSerialized
  });
};
/**
 * Export custom deserializer to be used when we need to deserialize the data coming from ES
 * @param field The field to be serialized
 */


exports.relationsSerializer = relationsSerializer;

var relationsDeserializer = function relationsDeserializer(field) {
  if (field.relations === undefined) {
    return field;
  }

  var relations = field.relations;
  var relationsDeserialized = Object.entries(relations).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        parent = _ref2[0],
        children = _ref2[1];

    return {
      parent: parent,
      children: typeof children === 'string' ? [children] : children
    };
  });
  return _objectSpread({}, field, {
    relations: relationsDeserialized
  });
};

exports.relationsDeserializer = relationsDeserializer;
var childConfig = {
  defaultValue: []
};

var RelationsParameter = function RelationsParameter() {
  var renderWarning = function renderWarning() {
    return _react.default.createElement(_eui.EuiCallOut, {
      color: "warning",
      iconType: "alert",
      size: "s",
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.join.multiLevelsParentJoinWarningTitle",
        defaultMessage: "Avoid using multiple levels to replicate a relational model. Each relation level increases computation time and memory consumption at query time. For best performance, {docsLink}",
        values: {
          docsLink: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationService.getJoinMultiLevelsPerformanceLink(),
            target: "_blank"
          }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.join.multiLevelsPerformanceDocumentationLink', {
            defaultMessage: 'denormalize your data.'
          }))
        }
      })
    });
  };

  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.relationshipsTitle', {
      defaultMessage: 'Relationships'
    }),
    withToggle: false
  }, _react.default.createElement(_shared_imports.UseArray, {
    path: "relations",
    initialNumberOfItems: 0
  }, function (_ref3) {
    var items = _ref3.items,
        addItem = _ref3.addItem,
        removeItem = _ref3.removeItem;
    var columns = [// Parent column
    {
      name: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.joinType.relationshipTable.parentColumnTitle', {
        defaultMessage: 'Parent'
      }),
      render: function render(item) {
        // By adding ".parent" to the path, we are saying that we want an **object**
        // to be created for each array item.
        // This object will have a "parent" property with the field value.
        return _react.default.createElement("div", {
          style: {
            width: '100%'
          }
        }, _react.default.createElement(_shared_imports.UseField, {
          path: "".concat(item.path, ".parent"),
          component: _shared_imports.TextField,
          componentProps: {
            euiFieldProps: {
              'aria-label': _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.joinType.relationshipTable.parentFieldAriaLabel', {
                defaultMessage: 'Parent field'
              })
            }
          } // For a newly created relation, we don't want to read
          // its default value provided to the form because... it is new! :)
          ,
          readDefaultValueOnForm: !item.isNew
        }));
      }
    }, // Children column (ComboBox)
    {
      name: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.joinType.relationshipTable.childrenColumnTitle', {
        defaultMessage: 'Children'
      }),
      render: function render(item) {
        return _react.default.createElement("div", {
          style: {
            width: '100%'
          }
        }, _react.default.createElement(_shared_imports.UseField, {
          path: "".concat(item.path, ".children"),
          config: childConfig,
          component: _shared_imports.ComboBoxField,
          componentProps: {
            euiFieldProps: {
              'aria-label': _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.joinType.relationshipTable.childrenFieldAriaLabel', {
                defaultMessage: 'Children field'
              })
            }
          },
          readDefaultValueOnForm: !item.isNew
        }));
      }
    }, // Actions column
    {
      width: '48px',
      actions: [{
        render: function render(_ref4) {
          var id = _ref4.id;

          var label = _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.joinType.relationshipTable.removeRelationshipTooltipLabel', {
            defaultMessage: 'Remove relationship'
          });

          return _react.default.createElement(_eui.EuiToolTip, {
            content: label,
            delay: "long"
          }, _react.default.createElement(_eui.EuiButtonIcon, {
            "data-test-subj": "removeRelationshipButton",
            "aria-label": label,
            iconType: "minusInCircle",
            color: "danger",
            onClick: function onClick() {
              return removeItem(id);
            }
          }));
        }
      }]
    }];
    return _react.default.createElement(_react.default.Fragment, null, items.length > 1 && _react.default.createElement(_react.default.Fragment, null, renderWarning(), _react.default.createElement(_eui.EuiSpacer, null)), _react.default.createElement(_eui.EuiBasicTable, {
      items: items,
      itemId: "id",
      columns: columns,
      noItemsMessage: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.joinType.relationshipTable.emptyTableMessage', {
        defaultMessage: 'No relationship defined'
      }),
      hasActions: true
    }), _react.default.createElement(_eui.EuiButtonEmpty, {
      onClick: addItem,
      iconType: "plusInCircleFilled",
      "data-test-subj": "addRelationButton"
    }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.joinType.addRelationshipButtonLabel', {
      defaultMessage: 'Add relationship'
    })));
  }));
};

exports.RelationsParameter = RelationsParameter;