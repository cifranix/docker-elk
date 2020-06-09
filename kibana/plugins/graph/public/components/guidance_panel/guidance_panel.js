"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuidancePanel = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = require("@kbn/i18n/react");

var _reactRedux = require("react-redux");

var _state_management = require("../../state_management");

var _source_modal = require("../../services/source_modal");

var _public = require("../../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function ListItem(_ref) {
  var children = _ref.children,
      state = _ref.state;
  return _react.default.createElement("li", {
    className: (0, _classnames.default)('gphGuidancePanel__item', {
      'gphGuidancePanel__item--disabled': state === 'disabled'
    }),
    "aria-disabled": state === 'disabled',
    "aria-current": state === 'active' ? 'step' : undefined
  }, state !== 'disabled' && _react.default.createElement("span", {
    className: (0, _classnames.default)('gphGuidancePanel__itemIcon', {
      'gphGuidancePanel__itemIcon--done': state === 'done'
    }),
    "aria-hidden": true
  }, _react.default.createElement(_eui.EuiIcon, {
    type: state === 'active' ? 'sortRight' : 'check'
  })), _react.default.createElement(_eui.EuiText, null, children));
}

function GuidancePanelComponent(props) {
  var onFillWorkspace = props.onFillWorkspace,
      onOpenFieldPicker = props.onOpenFieldPicker,
      onIndexPatternSelected = props.onIndexPatternSelected,
      hasDatasource = props.hasDatasource,
      hasFields = props.hasFields,
      noIndexPatterns = props.noIndexPatterns;
  var kibana = (0, _public.useKibana)();
  var services = kibana.services,
      overlays = kibana.overlays;
  var savedObjects = services.savedObjects,
      uiSettings = services.uiSettings,
      chrome = services.chrome,
      application = services.application;
  if (!overlays || !chrome || !application) return null;

  var onOpenDatasourcePicker = function onOpenDatasourcePicker() {
    (0, _source_modal.openSourceModal)({
      overlays: overlays,
      savedObjects: savedObjects,
      uiSettings: uiSettings
    }, onIndexPatternSelected);
  };

  var content = _react.default.createElement(_eui.EuiPanel, {
    "data-test-subj": "graphGuidancePanel"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "graphApp",
    size: "xxl"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("h1", {
    id: "graphHeading"
  }, _i18n.i18n.translate('xpack.graph.guidancePanel.title', {
    defaultMessage: 'Three steps to your graph'
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("ol", {
    className: "gphGuidancePanel__list",
    "aria-labelledby": "graphHeading"
  }, _react.default.createElement(ListItem, {
    state: hasDatasource ? 'done' : 'active'
  }, _react.default.createElement(_eui.EuiLink, {
    onClick: onOpenDatasourcePicker
  }, _i18n.i18n.translate('xpack.graph.guidancePanel.datasourceItem.indexPatternButtonLabel', {
    defaultMessage: 'Select a data source.'
  }))), _react.default.createElement(ListItem, {
    state: hasFields ? 'done' : hasDatasource ? 'active' : 'disabled'
  }, _react.default.createElement(_eui.EuiLink, {
    onClick: onOpenFieldPicker,
    disabled: !hasFields && !hasDatasource
  }, _i18n.i18n.translate('xpack.graph.guidancePanel.fieldsItem.fieldsButtonLabel', {
    defaultMessage: 'Add fields.'
  }))), _react.default.createElement(ListItem, {
    state: hasFields ? 'active' : 'disabled'
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.graph.guidancePanel.nodesItem.description",
    defaultMessage: "Enter a query in the search bar to start exploring. Don't know where to start? {topTerms}.",
    values: {
      topTerms: _react.default.createElement(_eui.EuiLink, {
        onClick: onFillWorkspace,
        disabled: !hasFields
      }, _i18n.i18n.translate('xpack.graph.guidancePanel.nodesItem.topTermsButtonLabel', {
        defaultMessage: 'Graph the top terms'
      }))
    }
  }))))));

  if (noIndexPatterns) {
    var managementUrl = chrome.navLinks.get('kibana:stack_management').url;
    var indexPatternUrl = "".concat(managementUrl, "/kibana/index_patterns");
    var sampleDataUrl = "".concat(application.getUrlForApp('kibana'), "#/home/tutorial_directory/sampleData");
    content = _react.default.createElement(_eui.EuiPanel, {
      paddingSize: "none"
    }, _react.default.createElement(_eui.EuiCallOut, {
      color: "warning",
      iconType: "help",
      title: _i18n.i18n.translate('xpack.graph.noDataSourceNotificationMessageTitle', {
        defaultMessage: 'No data source'
      }),
      heading: "h1"
    }, _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("p", {
      id: "graphHeading"
    }, _i18n.i18n.translate('xpack.graph.noDataSourceNotificationMessageTitle', {
      defaultMessage: 'No data source'
    }))), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.graph.noDataSourceNotificationMessageText",
      defaultMessage: "No data sources found. Go to {managementIndexPatternsLink} and create an index pattern for your Elasticsearch indices.",
      values: {
        managementIndexPatternsLink: _react.default.createElement("a", {
          href: indexPatternUrl
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.graph.noDataSourceNotificationMessageText.managementIndexPatternLinkText",
          defaultMessage: "Management > Index Patterns"
        }))
      }
    })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.graph.listing.noDataSource.newToKibanaDescription",
      defaultMessage: "New to Kibana? You can also use our {sampleDataInstallLink}.",
      values: {
        sampleDataInstallLink: _react.default.createElement(_eui.EuiLink, {
          href: sampleDataUrl
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.graph.listing.noDataSource.sampleDataInstallLinkText",
          defaultMessage: "sample data"
        }))
      }
    }))));
  }

  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    className: "gphGuidancePanel"
  }, content));
}

var GuidancePanel = (0, _reactRedux.connect)(function (state) {
  return {
    hasDatasource: (0, _state_management.hasDatasourceSelector)(state),
    hasFields: (0, _state_management.hasFieldsSelector)(state)
  };
}, function (dispatch) {
  return {
    onIndexPatternSelected: function onIndexPatternSelected(indexPattern) {
      dispatch((0, _state_management.requestDatasource)({
        type: 'indexpattern',
        id: indexPattern.id,
        title: indexPattern.attributes.title
      }));
    },
    onFillWorkspace: function onFillWorkspace() {
      dispatch((0, _state_management.fillWorkspace)());
    }
  };
})(GuidancePanelComponent);
exports.GuidancePanel = GuidancePanel;