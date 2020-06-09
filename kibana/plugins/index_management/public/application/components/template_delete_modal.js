"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateDeleteModal = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _api = require("../services/api");

var _notification = require("../services/notification");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TemplateDeleteModal = function TemplateDeleteModal(_ref) {
  var templatesToDelete = _ref.templatesToDelete,
      callback = _ref.callback;

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isDeleteConfirmed = _useState2[0],
      setIsDeleteConfirmed = _useState2[1];

  var numTemplatesToDelete = templatesToDelete.length;
  var hasSystemTemplate = Boolean(templatesToDelete.find(function (templateName) {
    return templateName.startsWith('.');
  }));

  var handleDeleteTemplates = function handleDeleteTemplates() {
    (0, _api.deleteTemplates)(templatesToDelete).then(function (_ref2) {
      var _ref2$data = _ref2.data,
          templatesDeleted = _ref2$data.templatesDeleted,
          errors = _ref2$data.errors,
          error = _ref2.error;
      var hasDeletedTemplates = templatesDeleted && templatesDeleted.length;

      if (hasDeletedTemplates) {
        var successMessage = templatesDeleted.length === 1 ? _i18n.i18n.translate('xpack.idxMgmt.deleteTemplatesModal.successDeleteSingleNotificationMessageText', {
          defaultMessage: "Deleted template '{templateName}'",
          values: {
            templateName: templatesToDelete[0]
          }
        }) : _i18n.i18n.translate('xpack.idxMgmt.deleteTemplatesModal.successDeleteMultipleNotificationMessageText', {
          defaultMessage: 'Deleted {numSuccesses, plural, one {# template} other {# templates}}',
          values: {
            numSuccesses: templatesDeleted.length
          }
        });
        callback({
          hasDeletedTemplates: hasDeletedTemplates
        });

        _notification.notificationService.showSuccessToast(successMessage);
      }

      if (error || errors && errors.length) {
        var hasMultipleErrors = errors && errors.length > 1 || error && templatesToDelete.length > 1;
        var errorMessage = hasMultipleErrors ? _i18n.i18n.translate('xpack.idxMgmt.deleteTemplatesModal.multipleErrorsNotificationMessageText', {
          defaultMessage: 'Error deleting {count} templates',
          values: {
            count: errors && errors.length || templatesToDelete.length
          }
        }) : _i18n.i18n.translate('xpack.idxMgmt.deleteTemplatesModal.errorNotificationMessageText', {
          defaultMessage: "Error deleting template '{name}'",
          values: {
            name: errors && errors[0].name || templatesToDelete[0]
          }
        });

        _notification.notificationService.showDangerToast(errorMessage);
      }
    });
  };

  var handleOnCancel = function handleOnCancel() {
    setIsDeleteConfirmed(false);
    callback();
  };

  return _react2.default.createElement(_eui.EuiOverlayMask, null, _react2.default.createElement(_eui.EuiConfirmModal, {
    buttonColor: "danger",
    "data-test-subj": "deleteTemplatesConfirmation",
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.idxMgmt.deleteTemplatesModal.modalTitleText",
      defaultMessage: "Delete {numTemplatesToDelete, plural, one {template} other {# templates}}",
      values: {
        numTemplatesToDelete: numTemplatesToDelete
      }
    }),
    onCancel: handleOnCancel,
    onConfirm: handleDeleteTemplates,
    cancelButtonText: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.idxMgmt.deleteTemplatesModal.cancelButtonLabel",
      defaultMessage: "Cancel"
    }),
    confirmButtonText: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.idxMgmt.deleteTemplatesModal.confirmButtonLabel",
      defaultMessage: "Delete {numTemplatesToDelete, plural, one {template} other {templates} }",
      values: {
        numTemplatesToDelete: numTemplatesToDelete
      }
    }),
    confirmButtonDisabled: hasSystemTemplate ? !isDeleteConfirmed : false
  }, _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.idxMgmt.deleteTemplatesModal.deleteDescription",
    defaultMessage: "You are about to delete {numTemplatesToDelete, plural, one {this template} other {these templates} }:",
    values: {
      numTemplatesToDelete: numTemplatesToDelete
    }
  })), _react2.default.createElement("ul", null, templatesToDelete.map(function (template) {
    return _react2.default.createElement("li", {
      key: template
    }, template, template.startsWith('.') ? _react2.default.createElement(_react2.Fragment, null, ' ', _react2.default.createElement(_eui.EuiBadge, {
      iconType: "alert",
      color: "hollow"
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.idxMgmt.deleteTemplatesModal.systemTemplateLabel",
      defaultMessage: "System template"
    }))) : null);
  })), hasSystemTemplate && _react2.default.createElement(_eui.EuiCallOut, {
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.idxMgmt.deleteTemplatesModal.proceedWithCautionCallOutTitle",
      defaultMessage: "Deleting a system template can break Kibana"
    }),
    color: "danger",
    iconType: "alert",
    "data-test-subj": "deleteSystemTemplateCallOut"
  }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.idxMgmt.deleteTemplatesModal.proceedWithCautionCallOutDescription",
    defaultMessage: "System templates are critical for internal operations. If you delete this template, you can\u2019t recover it."
  })), _react2.default.createElement(_eui.EuiCheckbox, {
    id: "confirmDeleteTemplatesCheckbox",
    label: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.idxMgmt.deleteTemplatesModal.confirmDeleteCheckboxLabel",
      defaultMessage: "I understand the consequences of deleting a system template"
    }),
    checked: isDeleteConfirmed,
    onChange: function onChange(e) {
      return setIsDeleteConfirmed(e.target.checked);
    }
  })))));
};

exports.TemplateDeleteModal = TemplateDeleteModal;