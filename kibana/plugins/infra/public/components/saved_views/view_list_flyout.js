"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedViewListFlyout = SavedViewListFlyout;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DeleteConfimation = function DeleteConfimation(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      confirmVisible = _useState2[0],
      setConfirmVisible = _useState2[1];

  var showConfirm = (0, _react.useCallback)(function () {
    return setConfirmVisible(true);
  }, []);
  var hideConfirm = (0, _react.useCallback)(function () {
    return setConfirmVisible(false);
  }, []);
  return _react.default.createElement(_react.default.Fragment, null, confirmVisible && _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: hideConfirm,
    "data-test-subj": "hideConfirm"
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "cancel",
    id: "xpack.infra.waffle.savedViews.cancel"
  })), _react.default.createElement(_eui.EuiButton, {
    fill: true,
    iconType: "trash",
    color: "danger",
    onClick: props.confirmedAction,
    "data-test-subj": "showConfirm"
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Delete view?",
    id: "xpack.infra.openView.actionNames.deleteConfirmation"
  }))), !confirmVisible && _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "trash",
    color: "danger",
    onClick: showConfirm
  }));
};

function SavedViewListFlyout(_ref) {
  var close = _ref.close,
      views = _ref.views,
      setView = _ref.setView,
      deleteView = _ref.deleteView,
      loading = _ref.loading;
  var renderName = (0, _react.useCallback)(function (name, item) {
    return _react.default.createElement(_eui.EuiButtonEmpty, {
      onClick: function onClick() {
        setView(item);
        close();
      }
    }, name);
  }, [setView, close]);
  var renderDeleteAction = (0, _react.useCallback)(function (item) {
    return _react.default.createElement(DeleteConfimation, {
      confirmedAction: function confirmedAction() {
        deleteView(item.id);
      }
    });
  }, [deleteView]);
  var columns = [{
    field: 'name',
    name: _i18n.i18n.translate('xpack.infra.openView.columnNames.name', {
      defaultMessage: 'Name'
    }),
    sortable: true,
    truncateText: true,
    render: renderName
  }, {
    name: _i18n.i18n.translate('xpack.infra.openView.columnNames.actions', {
      defaultMessage: 'Actions'
    }),
    actions: [{
      available: function available(item) {
        return !item.isDefault;
      },
      render: renderDeleteAction
    }]
  }];
  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: close,
    "data-test-subj": "loadViewsFlyout"
  }, _react.default.createElement(_eui.EuiFlyoutHeader, null, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Load views",
    id: "xpack.infra.openView.flyoutHeader"
  })))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiInMemoryTable, {
    items: views,
    columns: columns,
    loading: loading,
    search: true,
    pagination: true,
    sorting: true
  })), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "cancelSavedViewModal",
    onClick: close
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Cancel",
    id: "xpack.infra.openView.cancelButton"
  }))));
}