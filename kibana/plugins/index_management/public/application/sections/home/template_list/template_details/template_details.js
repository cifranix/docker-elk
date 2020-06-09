"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateDetails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _constants = require("../../../../../../common/constants");

var _components = require("../../../../components");

var _api = require("../../../../services/api");

var _routing = require("../../../../services/routing");

var _app_context = require("../../../../app_context");

var _tabs = require("./tabs");

var _tabToComponentMap, _tabToUiMetricMap;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SUMMARY_TAB_ID = 'summary';
var MAPPINGS_TAB_ID = 'mappings';
var ALIASES_TAB_ID = 'aliases';
var SETTINGS_TAB_ID = 'settings';
var TABS = [{
  id: SUMMARY_TAB_ID,
  name: _i18n.i18n.translate('xpack.idxMgmt.templateDetails.summaryTabTitle', {
    defaultMessage: 'Summary'
  })
}, {
  id: SETTINGS_TAB_ID,
  name: _i18n.i18n.translate('xpack.idxMgmt.templateDetails.settingsTabTitle', {
    defaultMessage: 'Settings'
  })
}, {
  id: MAPPINGS_TAB_ID,
  name: _i18n.i18n.translate('xpack.idxMgmt.templateDetails.mappingsTabTitle', {
    defaultMessage: 'Mappings'
  })
}, {
  id: ALIASES_TAB_ID,
  name: _i18n.i18n.translate('xpack.idxMgmt.templateDetails.aliasesTabTitle', {
    defaultMessage: 'Aliases'
  })
}];
var tabToComponentMap = (_tabToComponentMap = {}, _defineProperty(_tabToComponentMap, SUMMARY_TAB_ID, _tabs.TabSummary), _defineProperty(_tabToComponentMap, SETTINGS_TAB_ID, _tabs.TabSettings), _defineProperty(_tabToComponentMap, MAPPINGS_TAB_ID, _tabs.TabMappings), _defineProperty(_tabToComponentMap, ALIASES_TAB_ID, _tabs.TabAliases), _tabToComponentMap);
var tabToUiMetricMap = (_tabToUiMetricMap = {}, _defineProperty(_tabToUiMetricMap, SUMMARY_TAB_ID, _constants.UIM_TEMPLATE_DETAIL_PANEL_SUMMARY_TAB), _defineProperty(_tabToUiMetricMap, SETTINGS_TAB_ID, _constants.UIM_TEMPLATE_DETAIL_PANEL_SETTINGS_TAB), _defineProperty(_tabToUiMetricMap, MAPPINGS_TAB_ID, _constants.UIM_TEMPLATE_DETAIL_PANEL_MAPPINGS_TAB), _defineProperty(_tabToUiMetricMap, ALIASES_TAB_ID, _constants.UIM_TEMPLATE_DETAIL_PANEL_ALIASES_TAB), _tabToUiMetricMap);

var TemplateDetails = function TemplateDetails(_ref) {
  var templateName = _ref.templateName,
      onClose = _ref.onClose,
      editTemplate = _ref.editTemplate,
      cloneTemplate = _ref.cloneTemplate,
      reload = _ref.reload;

  var _useServices = (0, _app_context.useServices)(),
      uiMetricService = _useServices.uiMetricService;

  var decodedTemplateName = (0, _routing.decodePath)(templateName);

  var _useLoadIndexTemplate = (0, _api.useLoadIndexTemplate)(decodedTemplateName),
      error = _useLoadIndexTemplate.error,
      templateDetails = _useLoadIndexTemplate.data,
      isLoading = _useLoadIndexTemplate.isLoading; // TS complains if we use destructuring here. Fixed in 3.6.0 (https://github.com/microsoft/TypeScript/pull/31711).


  var isManaged = templateDetails ? templateDetails.isManaged : undefined;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      templateToDelete = _useState2[0],
      setTemplateToDelete = _useState2[1];

  var _useState3 = (0, _react.useState)(SUMMARY_TAB_ID),
      _useState4 = _slicedToArray(_useState3, 2),
      activeTab = _useState4[0],
      setActiveTab = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isPopoverOpen = _useState6[0],
      setIsPopOverOpen = _useState6[1];

  var content;

  if (isLoading) {
    content = _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateDetails.loadingIndexTemplateDescription",
      defaultMessage: "Loading template\u2026"
    }));
  } else if (error) {
    content = _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.templateDetails.loadingIndexTemplateErrorMessage",
        defaultMessage: "Error loading template"
      }),
      error: error,
      "data-test-subj": "sectionError"
    });
  } else if (templateDetails) {
    var Content = tabToComponentMap[activeTab];
    var managedTemplateCallout = isManaged ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.templateDetails.managedTemplateInfoTitle",
        defaultMessage: "Editing a managed template is not permitted"
      }),
      color: "primary",
      size: "s"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateDetails.managedTemplateInfoDescription",
      defaultMessage: "Managed templates are critical for internal operations."
    })), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    })) : null;
    content = _react.default.createElement(_react.Fragment, null, managedTemplateCallout, _react.default.createElement(_eui.EuiTabs, null, TABS.map(function (tab) {
      return _react.default.createElement(_eui.EuiTab, {
        onClick: function onClick() {
          uiMetricService.trackMetric('click', tabToUiMetricMap[tab.id]);
          setActiveTab(tab.id);
        },
        isSelected: tab.id === activeTab,
        key: tab.id,
        "data-test-subj": "tab"
      }, tab.name);
    })), _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }), _react.default.createElement(Content, {
      templateDetails: templateDetails
    }));
  }

  return _react.default.createElement(_react.Fragment, null, templateToDelete && templateToDelete.length > 0 ? _react.default.createElement(_components.TemplateDeleteModal, {
    callback: function callback(data) {
      if (data && data.hasDeletedTemplates) {
        reload();
      } else {
        setTemplateToDelete([]);
      }

      onClose();
    },
    templatesToDelete: templateToDelete
  }) : null, _react.default.createElement(_eui.EuiFlyout, {
    onClose: onClose,
    "data-test-subj": "templateDetails",
    "aria-labelledby": "templateDetailsFlyoutTitle",
    size: "m",
    maxWidth: 500
  }, _react.default.createElement(_eui.EuiFlyoutHeader, null, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h2", {
    id: "templateDetailsFlyoutTitle",
    "data-test-subj": "title"
  }, decodedTemplateName))), _react.default.createElement(_eui.EuiFlyoutBody, {
    "data-test-subj": "content"
  }, content), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "cross",
    flush: "left",
    onClick: onClose,
    "data-test-subj": "closeDetailsButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateDetails.closeButtonLabel",
    defaultMessage: "Close"
  }))), templateDetails && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "manageTemplatePanel",
    button: _react.default.createElement(_eui.EuiButton, {
      fill: true,
      "data-test-subj": "manageTemplateButton",
      iconType: "arrowDown",
      iconSide: "right",
      onClick: function onClick() {
        return setIsPopOverOpen(function (prev) {
          return !prev;
        });
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateDetails.manageButtonLabel",
      defaultMessage: "Manage"
    })),
    isOpen: isPopoverOpen,
    closePopover: function closePopover() {
      return setIsPopOverOpen(false);
    },
    panelPaddingSize: "none",
    withTitle: true,
    anchorPosition: "rightUp",
    repositionOnScroll: true
  }, _react.default.createElement(_eui.EuiContextMenu, {
    initialPanelId: 0,
    panels: [{
      id: 0,
      title: _i18n.i18n.translate('xpack.idxMgmt.templateDetails.manageContextMenuPanelTitle', {
        defaultMessage: 'Template options'
      }),
      items: [{
        name: _i18n.i18n.translate('xpack.idxMgmt.templateDetails.editButtonLabel', {
          defaultMessage: 'Edit'
        }),
        icon: 'pencil',
        onClick: function onClick() {
          return editTemplate(decodedTemplateName);
        },
        disabled: isManaged
      }, {
        name: _i18n.i18n.translate('xpack.idxMgmt.templateDetails.cloneButtonLabel', {
          defaultMessage: 'Clone'
        }),
        icon: 'copy',
        onClick: function onClick() {
          return cloneTemplate(decodedTemplateName);
        }
      }, {
        name: _i18n.i18n.translate('xpack.idxMgmt.templateDetails.deleteButtonLabel', {
          defaultMessage: 'Delete'
        }),
        icon: 'trash',
        onClick: function onClick() {
          return setTemplateToDelete([decodedTemplateName]);
        },
        disabled: isManaged
      }]
    }]
  })))))));
};

exports.TemplateDetails = TemplateDetails;