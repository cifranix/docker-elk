"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTemplateTypeSelect = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _role_template_type = require("../services/role_template_type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var templateTypeOptions = [{
  id: 'inline',
  label: _i18n.i18n.translate('xpack.security.management.editRoleMapping.roleTemplate.inlineTypeLabel', {
    defaultMessage: 'Role template'
  })
}, {
  id: 'stored',
  label: _i18n.i18n.translate('xpack.security.management.editRoleMapping.roleTemplate.storedTypeLabel', {
    defaultMessage: 'Stored script'
  })
}];

var RoleTemplateTypeSelect = function RoleTemplateTypeSelect(props) {
  var availableOptions = templateTypeOptions.filter(function (_ref) {
    var id = _ref.id;
    return id === 'inline' && props.canUseInlineScripts || id === 'stored' && props.canUseStoredScripts;
  });
  var selectedOptions = templateTypeOptions.filter(function (_ref2) {
    var id = _ref2.id;
    return id === 'inline' && (0, _role_template_type.isInlineRoleTemplate)(props.roleTemplate) || id === 'stored' && (0, _role_template_type.isStoredRoleTemplate)(props.roleTemplate);
  });
  return _react.default.createElement(_eui.EuiComboBox, {
    options: availableOptions,
    singleSelection: {
      asPlainText: true
    },
    selectedOptions: selectedOptions,
    "data-test-subj": "roleMappingsFormTemplateType",
    onChange: function onChange(selected) {
      var _selected = _slicedToArray(selected, 1),
          id = _selected[0].id;

      if (id === 'inline') {
        props.onChange(_objectSpread({}, props.roleTemplate, {
          template: {
            source: ''
          }
        }));
      } else {
        props.onChange(_objectSpread({}, props.roleTemplate, {
          template: {
            id: ''
          }
        }));
      }
    },
    isClearable: false
  });
};

exports.RoleTemplateTypeSelect = RoleTemplateTypeSelect;