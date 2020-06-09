"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaffleRegionControls = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WaffleRegionControls = function WaffleRegionControls(props) {
  var region = props.region,
      options = props.options;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var showPopover = (0, _react.useCallback)(function () {
    setIsOpen(true);
  }, [setIsOpen]);
  var closePopover = (0, _react.useCallback)(function () {
    setIsOpen(false);
  }, [setIsOpen]);
  var currentLabel = options.find(function (o) {
    return region === o;
  });
  var changeRegion = (0, _react.useCallback)(function (val) {
    if (region === val) {
      props.changeRegion('');
    } else {
      props.changeRegion(val);
    }

    closePopover();
  }, [region, closePopover, props]);
  var panels = (0, _react.useMemo)(function () {
    return [{
      id: 0,
      title: '',
      items: options.map(function (o) {
        var icon = o === region ? 'check' : 'empty';
        var panel = {
          name: o,
          onClick: function onClick() {
            return changeRegion(o);
          },
          icon: icon
        };
        return panel;
      })
    }];
  }, [changeRegion, options, region]);
  return _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_eui.EuiPopover, {
    isOpen: isOpen,
    id: "regionPanel",
    button: _react.default.createElement(_eui.EuiFilterButton, {
      iconType: "arrowDown",
      onClick: showPopover
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.infra.waffle.regionLabel",
      defaultMessage: "Region: {selectedRegion}",
      values: {
        selectedRegion: currentLabel || _i18n.i18n.translate('xpack.infra.waffle.region', {
          defaultMessage: 'All'
        })
      }
    })),
    anchorPosition: "downLeft",
    panelPaddingSize: "none",
    closePopover: closePopover
  }, _react.default.createElement(_eui.EuiContextMenu, {
    initialPanelId: 0,
    panels: panels
  })));
};

exports.WaffleRegionControls = WaffleRegionControls;