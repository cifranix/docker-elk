"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTypeFilter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ActionTypeFilter = function ActionTypeFilter(_ref) {
  var actionTypes = _ref.actionTypes,
      onChange = _ref.onChange;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedValues = _useState2[0],
      setSelectedValues = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isPopoverOpen = _useState4[0],
      setIsPopoverOpen = _useState4[1];

  (0, _react.useEffect)(function () {
    if (onChange) {
      onChange(selectedValues);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [selectedValues]);
  return _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_eui.EuiPopover, {
    isOpen: isPopoverOpen,
    closePopover: function closePopover() {
      return setIsPopoverOpen(false);
    },
    button: _react.default.createElement(_eui.EuiFilterButton, {
      iconType: "arrowDown",
      hasActiveFilters: selectedValues.length > 0,
      numActiveFilters: selectedValues.length,
      numFilters: selectedValues.length,
      onClick: function onClick() {
        return setIsPopoverOpen(!isPopoverOpen);
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertsList.actionTypeFilterLabel",
      defaultMessage: "Action type"
    }))
  }, _react.default.createElement("div", {
    className: "euiFilterSelect__items"
  }, actionTypes.map(function (item) {
    return _react.default.createElement(_eui.EuiFilterSelectItem, {
      key: item.id,
      onClick: function onClick() {
        var isPreviouslyChecked = selectedValues.includes(item.id);

        if (isPreviouslyChecked) {
          setSelectedValues(selectedValues.filter(function (val) {
            return val !== item.id;
          }));
        } else {
          setSelectedValues(selectedValues.concat(item.id));
        }
      },
      checked: selectedValues.includes(item.id) ? 'on' : undefined
    }, item.name);
  }))));
};

exports.ActionTypeFilter = ActionTypeFilter;