"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivilegeSummary = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _privilege_summary_table = require("./privilege_summary_table");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PrivilegeSummary = function PrivilegeSummary(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: function onClick() {
      return setIsOpen(true);
    },
    "data-test-subj": "viewPrivilegeSummaryButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.editRole.privilegeSummary.viewSummaryButtonText",
    defaultMessage: "View privilege summary"
  })), isOpen && _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    onClose: function onClose() {
      return setIsOpen(false);
    },
    maxWidth: false
  }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.editRole.privilegeSummary.modalHeaderTitle",
    defaultMessage: "Privilege summary"
  }))), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_privilege_summary_table.PrivilegeSummaryTable, {
    role: props.role,
    spaces: props.spaces,
    kibanaPrivileges: props.kibanaPrivileges,
    canCustomizeSubFeaturePrivileges: props.canCustomizeSubFeaturePrivileges
  })), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButton, {
    onClick: function onClick() {
      return setIsOpen(false);
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.editRole.privilegeSummary.closeSummaryButtonText",
    defaultMessage: "Close"
  }))))));
};

exports.PrivilegeSummary = PrivilegeSummary;