"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateFieldProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _mappings_state = require("../../../../mappings_state");

var _lib = require("../../../../lib");

var _constants = require("../../../../constants");

var _modal_confirmation_delete_fields = require("../modal_confirmation_delete_fields");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var UpdateFieldProvider = function UpdateFieldProvider(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)({
    isModalOpen: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var dispatch = (0, _mappings_state.useDispatch)();

  var _useMappingsState = (0, _mappings_state.useMappingsState)(),
      fields = _useMappingsState.fields;

  var byId = fields.byId,
      aliases = fields.aliases;

  var confirmButtonText = _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.updateField.confirmationModal.confirmDescription', {
    defaultMessage: 'Confirm type change'
  });

  var modalTitle;

  if (state.field) {
    var source = state.field.source;
    modalTitle = _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.updateField.confirmationModal.title', {
      defaultMessage: "Confirm change '{fieldName}' type to '{fieldType}'.",
      values: {
        fieldName: source.name,
        fieldType: source.type
      }
    });
  }

  var closeModal = function closeModal() {
    setState({
      isModalOpen: false
    });
  };

  var updateField = function updateField(field) {
    var previousField = byId[field.id];

    var willDeleteChildFields = function willDeleteChildFields(oldType, newType) {
      var hasChildFields = field.hasChildFields,
          hasMultiFields = field.hasMultiFields;

      if (!hasChildFields && !hasMultiFields) {
        // No child or multi-fields will be deleted, no confirmation needed.
        return false;
      }

      return (0, _lib.shouldDeleteChildFieldsAfterTypeChange)(oldType, newType);
    };

    if (field.source.type !== previousField.source.type) {
      // Array of all the aliases pointing to the current field beeing updated
      var aliasesOnField = aliases[field.id] || []; // Array of all the aliases pointing to the current field + all its possible children

      var aliasesOnFieldAndDescendants = (0, _lib.getAllDescendantAliases)(field, fields);
      var isReferencedByAlias = aliasesOnField && Boolean(aliasesOnField.length);
      var nextTypeCanHaveAlias = !_constants.PARAMETERS_DEFINITION.path.targetTypesNotAllowed.includes(field.source.type); // We need to check if, by changing the type, we will also
      // delete possible child properties ("fields" or "properties").
      // If we will, we need to warn the user about it.

      var requiresConfirmation;
      var aliasesToDelete = [];

      if (isReferencedByAlias && !nextTypeCanHaveAlias) {
        aliasesToDelete = aliasesOnFieldAndDescendants;
        requiresConfirmation = true;
      } else {
        requiresConfirmation = willDeleteChildFields(previousField.source.type, field.source.type);

        if (requiresConfirmation) {
          aliasesToDelete = aliasesOnFieldAndDescendants.filter( // We will only delete aliases that points to possible children, *NOT* the field itself
          function (id) {
            return aliasesOnField.includes(id) === false;
          });
        }
      }

      if (requiresConfirmation) {
        setState({
          isModalOpen: true,
          field: field,
          aliases: Boolean(aliasesToDelete.length) ? aliasesToDelete.map(function (id) {
            return byId[id].path.join(' > ');
          }).sort() : undefined
        });
        return;
      }
    }

    dispatch({
      type: 'field.edit',
      value: field.source
    });
  };

  var confirmTypeUpdate = function confirmTypeUpdate() {
    dispatch({
      type: 'field.edit',
      value: state.field.source
    });
    closeModal();
  };

  return _react.default.createElement(_react.default.Fragment, null, children(updateField), state.isModalOpen && _react.default.createElement(_modal_confirmation_delete_fields.ModalConfirmationDeleteFields, {
    title: modalTitle,
    childFields: state.field && state.field.childFields,
    aliases: state.aliases,
    byId: byId,
    confirmButtonText: confirmButtonText,
    onConfirm: confirmTypeUpdate,
    onCancel: closeModal
  }));
};

exports.UpdateFieldProvider = UpdateFieldProvider;