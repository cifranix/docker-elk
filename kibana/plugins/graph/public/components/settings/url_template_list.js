"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlTemplateList = UrlTemplateList;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _url_template_form = require("./url_template_form");

var _use_list_keys = require("./use_list_keys");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var generateId = (0, _eui.htmlIdGenerator)();

function UrlTemplateList(_ref) {
  var removeTemplate = _ref.removeTemplate,
      saveTemplate = _ref.saveTemplate,
      urlTemplates = _ref.urlTemplates;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      uncommittedForms = _useState2[0],
      setUncommittedForms = _useState2[1];

  var getListKey = (0, _use_list_keys.useListKeys)(urlTemplates);

  function removeUncommittedForm(id) {
    setUncommittedForms(uncommittedForms.filter(function (formId) {
      return formId !== id;
    }));
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _i18n.i18n.translate('xpack.graph.drilldowns.description', {
    defaultMessage: 'Use drilldowns to link to other applications. The selected vertices become part of the URL.'
  })), _react.default.createElement(_eui.EuiSpacer, null), urlTemplates.map(function (template, index) {
    return _react.default.createElement(_url_template_form.UrlTemplateForm, {
      key: getListKey(template),
      id: getListKey(template),
      initialTemplate: template,
      onSubmit: function onSubmit(newTemplate) {
        saveTemplate({
          index: index,
          template: newTemplate
        });
      },
      onRemove: function onRemove() {
        removeTemplate(template);
      }
    });
  }), uncommittedForms.map(function (id) {
    return _react.default.createElement(_url_template_form.UrlTemplateForm, {
      id: "accordion-new-".concat(id),
      key: id,
      onSubmit: function onSubmit(newTemplate) {
        saveTemplate({
          index: -1,
          template: newTemplate
        });
        removeUncommittedForm(id);
      },
      onRemove: removeUncommittedForm.bind(undefined, id)
    });
  }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiTextAlign, {
    textAlign: "center"
  }, _react.default.createElement(_eui.EuiButton, {
    size: "s",
    fill: true,
    iconType: "plusInCircle",
    "data-test-subj": "graphAddNewTemplate",
    onClick: function onClick() {
      setUncommittedForms([].concat(_toConsumableArray(uncommittedForms), [generateId()]));
    }
  }, _i18n.i18n.translate('xpack.graph.templates.newTemplateFormLabel', {
    defaultMessage: 'Add drilldown'
  }))));
}