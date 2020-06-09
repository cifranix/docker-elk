"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulkOperationPopover = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var BulkOperationPopover = function BulkOperationPopover(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  return _react.default.createElement(_eui.EuiPopover, {
    isOpen: isPopoverOpen,
    closePopover: function closePopover() {
      return setIsPopoverOpen(false);
    },
    "data-test-subj": "bulkAction",
    button: _react.default.createElement(_eui.EuiButton, {
      iconType: "arrowDown",
      iconSide: "right",
      onClick: function onClick() {
        return setIsPopoverOpen(!isPopoverOpen);
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertsList.bulkActionPopover.buttonTitle",
      defaultMessage: "Manage alerts"
    }))
  }, children && _react.default.Children.map(children, function (child) {
    return _react.default.isValidElement(child) ? _react.default.createElement(_eui.EuiFormRow, null, _react.default.cloneElement(child, {})) : child;
  }));
};

exports.BulkOperationPopover = BulkOperationPopover;