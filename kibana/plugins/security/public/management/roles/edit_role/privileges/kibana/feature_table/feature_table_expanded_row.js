"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureTableExpandedRow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _sub_feature_form = require("./sub_feature_form");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FeatureTableExpandedRow = function FeatureTableExpandedRow(_ref) {
  var feature = _ref.feature,
      _onChange = _ref.onChange,
      privilegeIndex = _ref.privilegeIndex,
      privilegeCalculator = _ref.privilegeCalculator,
      selectedFeaturePrivileges = _ref.selectedFeaturePrivileges,
      disabled = _ref.disabled;

  var _useState = (0, _react.useState)(function () {
    return feature.getMinimalFeaturePrivileges().some(function (p) {
      return selectedFeaturePrivileges.includes(p.id);
    });
  }),
      _useState2 = _slicedToArray(_useState, 2),
      isCustomizing = _useState2[0],
      setIsCustomizing = _useState2[1];

  (0, _react.useEffect)(function () {
    var hasMinimalFeaturePrivilegeSelected = feature.getMinimalFeaturePrivileges().some(function (p) {
      return selectedFeaturePrivileges.includes(p.id);
    });

    if (!hasMinimalFeaturePrivilegeSelected && isCustomizing) {
      setIsCustomizing(false);
    }
  }, [feature, isCustomizing, selectedFeaturePrivileges]);

  var onCustomizeSubFeatureChange = function onCustomizeSubFeatureChange(e) {
    _onChange(feature.id, privilegeCalculator.updateSelectedFeaturePrivilegesForCustomization(feature.id, privilegeIndex, e.target.checked));

    setIsCustomizing(e.target.checked);
  };

  return _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSwitch, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.editRole.featureTable.customizeSubFeaturePrivilegesSwitchLabel",
      defaultMessage: "Customize sub-feature privileges"
    }),
    checked: isCustomizing,
    onChange: onCustomizeSubFeatureChange,
    "data-test-subj": "customizeSubFeaturePrivileges",
    disabled: disabled || !privilegeCalculator.canCustomizeSubFeaturePrivileges(feature.id, privilegeIndex)
  })), feature.getSubFeatures().map(function (subFeature) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: subFeature.name
    }, _react.default.createElement(_sub_feature_form.SubFeatureForm, {
      privilegeCalculator: privilegeCalculator,
      privilegeIndex: privilegeIndex,
      featureId: feature.id,
      subFeature: subFeature,
      onChange: function onChange(updatedPrivileges) {
        return _onChange(feature.id, updatedPrivileges);
      },
      selectedFeaturePrivileges: selectedFeaturePrivileges,
      disabled: disabled || !isCustomizing
    }));
  }));
};

exports.FeatureTableExpandedRow = FeatureTableExpandedRow;