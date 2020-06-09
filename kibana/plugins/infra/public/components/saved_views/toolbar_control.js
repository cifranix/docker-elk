"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedViewsToolbarControls = SavedViewsToolbarControls;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _use_saved_view = require("../../hooks/use_saved_view");

var _create_modal = require("./create_modal");

var _view_list_flyout = require("./view_list_flyout");

var _public = require("../../../../../../src/plugins/kibana_react/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function SavedViewsToolbarControls(props) {
  var kibana = (0, _public.useKibana)();

  var _useSavedView = (0, _use_saved_view.useSavedView)(props.defaultViewState, props.viewType),
      views = _useSavedView.views,
      saveView = _useSavedView.saveView,
      loading = _useSavedView.loading,
      deletedId = _useSavedView.deletedId,
      deleteView = _useSavedView.deleteView,
      find = _useSavedView.find,
      errorOnFind = _useSavedView.errorOnFind,
      errorOnCreate = _useSavedView.errorOnCreate,
      createdId = _useSavedView.createdId;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      modalOpen = _useState2[0],
      setModalOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isInvalid = _useState4[0],
      setIsInvalid = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      createModalOpen = _useState6[0],
      setCreateModalOpen = _useState6[1];

  var openSaveModal = (0, _react.useCallback)(function () {
    setIsInvalid(false);
    setCreateModalOpen(true);
  }, []);
  var closeModal = (0, _react.useCallback)(function () {
    return setModalOpen(false);
  }, []);
  var closeCreateModal = (0, _react.useCallback)(function () {
    return setCreateModalOpen(false);
  }, []);
  var loadViews = (0, _react.useCallback)(function () {
    find();
    setModalOpen(true);
  }, [find]);
  var save = (0, _react.useCallback)(function (name) {
    var hasTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var currentState = _objectSpread({}, props.viewState, {}, !hasTime ? {
      time: undefined
    } : {});

    saveView(_objectSpread({
      name: name
    }, currentState));
  }, [props.viewState, saveView]);
  (0, _react.useEffect)(function () {
    if (errorOnCreate) {
      setIsInvalid(true);
    }
  }, [errorOnCreate]);
  (0, _react.useEffect)(function () {
    if (createdId !== undefined) {
      // INFO: Close the modal after the view is created.
      closeCreateModal();
    }
  }, [createdId, closeCreateModal]);
  (0, _react.useEffect)(function () {
    if (deletedId !== undefined) {
      // INFO: Refresh view list after an item is deleted
      find();
    }
  }, [deletedId, find]);
  (0, _react.useEffect)(function () {
    if (errorOnCreate) {
      kibana.notifications.toasts.warning(getErrorToast('create', errorOnCreate));
    } else if (errorOnFind) {
      kibana.notifications.toasts.warning(getErrorToast('find', errorOnFind));
    }
  }, [errorOnCreate, errorOnFind, kibana]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "save",
    onClick: openSaveModal,
    "data-test-subj": "openSaveViewModal"
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Save",
    id: "xpack.infra.waffle.savedViews.saveViewLabel"
  })), _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "importAction",
    onClick: loadViews,
    "data-test-subj": "loadViews"
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Load",
    id: "xpack.infra.waffle.savedViews.loadViewsLabel"
  }))), createModalOpen && _react.default.createElement(_create_modal.SavedViewCreateModal, {
    isInvalid: isInvalid,
    close: closeCreateModal,
    save: save
  }), modalOpen && _react.default.createElement(_view_list_flyout.SavedViewListFlyout, {
    loading: loading,
    views: views,
    deleteView: deleteView,
    close: closeModal,
    setView: props.onViewChange
  }));
}

var getErrorToast = function getErrorToast(type, msg) {
  if (type === 'create') {
    return {
      toastLifeTimeMs: 3000,
      title: msg || _i18n.i18n.translate('xpack.infra.savedView.errorOnCreate.title', {
        defaultMessage: "An error occured saving view."
      })
    };
  } else if (type === 'find') {
    return {
      toastLifeTimeMs: 3000,
      title: msg || _i18n.i18n.translate('xpack.infra.savedView.findError.title', {
        defaultMessage: "An error occurred while loading views."
      })
    };
  }
};