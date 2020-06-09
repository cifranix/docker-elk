"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedViewCreateModal = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SavedViewCreateModal = function SavedViewCreateModal(_ref) {
  var close = _ref.close,
      save = _ref.save,
      isInvalid = _ref.isInvalid;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      viewName = _useState2[0],
      setViewName = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      includeTime = _useState4[0],
      setIncludeTime = _useState4[1];

  var onCheckChange = (0, _react.useCallback)(function (e) {
    return setIncludeTime(e.target.checked);
  }, []);
  var textChange = (0, _react.useCallback)(function (e) {
    return setViewName(e.target.value);
  }, []);
  var saveView = (0, _react.useCallback)(function () {
    save(viewName, includeTime);
  }, [includeTime, save, viewName]);
  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    onClose: close
  }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Save View",
    id: "xpack.infra.waffle.savedView.createHeader"
  }))), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiFieldText, {
    isInvalid: isInvalid,
    placeholder: _i18n.i18n.translate('xpack.infra.waffle.savedViews.viewNamePlaceholder', {
      defaultMessage: 'Name'
    }),
    "data-test-subj": "savedViewViweName",
    value: viewName,
    onChange: textChange,
    "aria-label": _i18n.i18n.translate('xpack.infra.waffle.savedViews.viewNamePlaceholder', {
      defaultMessage: 'Name'
    })
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }), _react.default.createElement(_eui.EuiSwitch, {
    id: 'saved-view-save-time-checkbox',
    label: _react.default.createElement(_react2.FormattedMessage, {
      defaultMessage: "Store time with view",
      id: "xpack.infra.waffle.savedViews.includeTimeFilterLabel"
    }),
    checked: includeTime,
    onChange: onCheckChange
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, {
    size: 'xs',
    grow: false,
    style: {
      maxWidth: 400
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "This changes the time filter to the currently selected time each time the view is loaded",
    id: "xpack.infra.waffle.savedViews.includeTimeHelpText"
  }))), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: close
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Cancel",
    id: "xpack.infra.waffle.savedViews.cancelButton"
  })), _react.default.createElement(_eui.EuiButton, {
    color: "primary",
    disabled: !viewName,
    fill: true,
    onClick: saveView,
    "data-test-subj": "createSavedViewButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Save",
    id: "xpack.infra.waffle.savedViews.saveButton"
  })))));
};

exports.SavedViewCreateModal = SavedViewCreateModal;