"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectableSpacesControl = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _space_avatar = require("../../space_avatar");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SelectableSpacesControl = function SelectableSpacesControl(props) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      options = _useState2[0],
      setOptions = _useState2[1]; //  TODO: update once https://github.com/elastic/eui/issues/2071 is fixed


  if (options.length === 0) {
    setOptions(props.spaces.map(function (space) {
      var _ref;

      return _ref = {
        label: space.name,
        prepend: _react.default.createElement(_space_avatar.SpaceAvatar, {
          space: space,
          size: 's'
        }),
        checked: props.selectedSpaceIds.includes(space.id) ? 'on' : null
      }, _defineProperty(_ref, 'data-space-id', space.id), _defineProperty(_ref, 'data-test-subj', "cts-space-selector-row-".concat(space.id)), _ref;
    }));
  }

  function updateSelectedSpaces(selectedOptions) {
    if (props.disabled) return;
    var selectedSpaceIds = selectedOptions.filter(function (opt) {
      return opt.checked;
    }).map(function (opt) {
      return opt['data-space-id'];
    });
    props.onChange(selectedSpaceIds); // TODO: remove once https://github.com/elastic/eui/issues/2071 is fixed

    setOptions(selectedOptions);
  }

  if (options.length === 0) {
    return _react.default.createElement(_eui.EuiLoadingSpinner, null);
  }

  return _react.default.createElement(_eui.EuiSelectable, {
    options: options,
    onChange: function onChange(newOptions) {
      return updateSelectedSpaces(newOptions);
    },
    listProps: {
      bordered: true,
      rowHeight: 40,
      className: 'spcCopyToSpace__spacesList',
      'data-test-subj': 'cts-form-space-selector'
    },
    searchable: true
  }, function (list, search) {
    return _react.default.createElement(_react.Fragment, null, search, list);
  });
};

exports.SelectableSpacesControl = SelectableSpacesControl;