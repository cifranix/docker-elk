"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogsPageNoIndicesContent = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _no_indices = require("../../../components/empty_states/no_indices");

var _source_configuration = require("../../../components/source_configuration");

var _public = require("../../../../../../../src/plugins/kibana_react/public");

var _use_link_props = require("../../../hooks/use_link_props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var LogsPageNoIndicesContent = function LogsPageNoIndicesContent() {
  var _application$capabili, _application$capabili2;

  var _useKibana = (0, _public.useKibana)(),
      application = _useKibana.services.application;

  var canConfigureSource = (application === null || application === void 0 ? void 0 : (_application$capabili = application.capabilities) === null || _application$capabili === void 0 ? void 0 : (_application$capabili2 = _application$capabili.logs) === null || _application$capabili2 === void 0 ? void 0 : _application$capabili2.configureSource) ? true : false;
  var tutorialLinkProps = (0, _use_link_props.useLinkProps)({
    app: 'kibana',
    hash: '/home/tutorial_directory/logging'
  });
  return _react.default.createElement(_no_indices.NoIndices, {
    "data-test-subj": "noLogsIndicesPrompt",
    title: _i18n.i18n.translate('xpack.infra.logsPage.noLoggingIndicesTitle', {
      defaultMessage: "Looks like you don't have any logging indices."
    }),
    message: _i18n.i18n.translate('xpack.infra.logsPage.noLoggingIndicesDescription', {
      defaultMessage: "Let's add some!"
    }),
    actions: _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButton, _extends({}, tutorialLinkProps, {
      color: "primary",
      fill: true,
      "data-test-subj": "logsViewSetupInstructionsButton"
    }), _i18n.i18n.translate('xpack.infra.logsPage.noLoggingIndicesInstructionsActionLabel', {
      defaultMessage: 'View setup instructions'
    }))), canConfigureSource ? _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_source_configuration.ViewSourceConfigurationButton, {
      app: "logs",
      "data-test-subj": "configureSourceButton"
    }, _i18n.i18n.translate('xpack.infra.configureSourceActionLabel', {
      defaultMessage: 'Change source configuration'
    }))) : null)
  });
};

exports.LogsPageNoIndicesContent = LogsPageNoIndicesContent;