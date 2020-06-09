"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JSONRuleEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

require("brace/mode/json");

require("brace/theme/github");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _model = require("../../model");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var JSONRuleEditor = function JSONRuleEditor(props) {
  var _useState = (0, _react.useState)(JSON.stringify(props.rules ? props.rules.toRaw() : {}, null, 2)),
      _useState2 = _slicedToArray(_useState, 2),
      rawRules = _useState2[0],
      setRawRules = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      ruleBuilderError = _useState4[0],
      setRuleBuilderError = _useState4[1];

  function onRulesChange(updatedRules) {
    setRawRules(updatedRules); // Fire onChange only if rules are valid

    try {
      var ruleJSON = JSON.parse(updatedRules);
      props.onChange((0, _model.generateRulesFromRaw)(ruleJSON).rules);
      props.onValidityChange(true);
      setRuleBuilderError(null);
    } catch (e) {
      if (e instanceof _model.RuleBuilderError) {
        setRuleBuilderError(e);
      } else {
        setRuleBuilderError(null);
      }

      props.onValidityChange(false);
    }
  }

  function reformatRules() {
    try {
      var ruleJSON = JSON.parse(rawRules);
      setRawRules(JSON.stringify(ruleJSON, null, 2));
    } catch (ignore) {// ignore
    }
  }

  return _react.default.createElement(_eui.EuiFormRow, {
    isInvalid: Boolean(ruleBuilderError),
    error: ruleBuilderError && _i18n.i18n.translate('xpack.security.management.editRoleMapping.JSONEditorRuleError', {
      defaultMessage: 'Invalid rule definition at {ruleLocation}: {errorMessage}',
      values: {
        ruleLocation: ruleBuilderError.ruleTrace.join('.'),
        errorMessage: ruleBuilderError.message
      }
    }),
    fullWidth: true,
    "data-test-subj": "roleMappingsJSONEditor"
  }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCodeEditor, {
    "aria-label": '',
    mode: 'json',
    theme: "github",
    value: rawRules,
    onChange: onRulesChange,
    width: "100%",
    height: "auto",
    minLines: 6,
    maxLines: 30,
    isReadOnly: false,
    setOptions: {
      showLineNumbers: true,
      tabSize: 2
    },
    editorProps: {
      $blockScrolling: Infinity
    },
    showGutter: true
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiButton, {
    iconType: "broom",
    onClick: reformatRules,
    size: "s"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.editRoleMapping.autoFormatRuleText",
    defaultMessage: "Reformat"
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.editRoleMapping.JSONEditorHelpText",
    defaultMessage: "Specify your rules in JSON format consistent with the {roleMappingAPI}",
    values: {
      roleMappingAPI: _react.default.createElement(_eui.EuiLink, {
        href: props.docLinks.getRoleMappingAPIDocUrl(),
        external: true,
        target: "_blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.JSONEditorEsApi",
        defaultMessage: "Elasticsearch role mapping API."
      }))
    }
  })))));
};

exports.JSONRuleEditor = JSONRuleEditor;