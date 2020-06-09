"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _components = require("../../../components");

var _template_table = require("./template_table");

var _api = require("../../../services/api");

var _app_context = require("../../../app_context");

var _routing = require("../../../services/routing");

var _constants = require("../../../../../common/constants");

var _template_details = require("./template_details");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TemplateList = function TemplateList(_ref) {
  var templateName = _ref.match.params.templateName,
      history = _ref.history;

  var _useServices = (0, _app_context.useServices)(),
      uiMetricService = _useServices.uiMetricService;

  var _useLoadIndexTemplate = (0, _api.useLoadIndexTemplates)(),
      error = _useLoadIndexTemplate.error,
      isLoading = _useLoadIndexTemplate.isLoading,
      templates = _useLoadIndexTemplate.data,
      reload = _useLoadIndexTemplate.sendRequest;

  var content;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showSystemTemplates = _useState2[0],
      setShowSystemTemplates = _useState2[1]; // Filter out system index templates


  var filteredTemplates = (0, _react.useMemo)(function () {
    return templates ? templates.filter(function (template) {
      return !template.name.startsWith('.');
    }) : [];
  }, [templates]);

  var closeTemplateDetails = function closeTemplateDetails() {
    history.push((0, _routing.getTemplateListLink)());
  };

  var editTemplate = function editTemplate(name) {
    history.push((0, _routing.getTemplateEditLink)(name));
  };

  var cloneTemplate = function cloneTemplate(name) {
    history.push((0, _routing.getTemplateCloneLink)(name));
  }; // Track component loaded


  (0, _react.useEffect)(function () {
    uiMetricService.trackMetric('loaded', _constants.UIM_TEMPLATE_LIST_LOAD);
  }, [uiMetricService]);

  if (isLoading) {
    content = _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.indexTemplatesList.loadingIndexTemplatesDescription",
      defaultMessage: "Loading templates\u2026"
    }));
  } else if (error) {
    content = _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.indexTemplatesList.loadingIndexTemplatesErrorMessage",
        defaultMessage: "Error loading templates"
      }),
      error: error
    });
  } else if (Array.isArray(templates) && templates.length === 0) {
    content = _react.default.createElement(_eui.EuiEmptyPrompt, {
      iconType: "managementApp",
      title: _react.default.createElement("h1", {
        "data-test-subj": "title"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.indexTemplatesList.emptyPrompt.noIndexTemplatesTitle",
        defaultMessage: "You don't have any templates yet"
      })),
      "data-test-subj": "emptyPrompt"
    });
  } else if (Array.isArray(templates) && templates.length > 0) {
    content = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: true
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement(_eui.EuiText, {
      color: "subdued"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.home.indexTemplatesDescription",
      defaultMessage: "Use index templates to automatically apply settings, mappings, and aliases to indices."
    })))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiSwitch, {
      id: "checkboxShowSystemIndexTemplates",
      "data-test-subj": "systemTemplatesSwitch",
      checked: showSystemTemplates,
      onChange: function onChange(event) {
        return setShowSystemTemplates(event.target.checked);
      },
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.indexTemplatesTable.systemIndexTemplatesSwitchLabel",
        defaultMessage: "Include system templates"
      })
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }), _react.default.createElement(_template_table.TemplateTable, {
      templates: showSystemTemplates ? templates : filteredTemplates,
      reload: reload,
      editTemplate: editTemplate,
      cloneTemplate: cloneTemplate
    }));
  }

  return _react.default.createElement("div", {
    "data-test-subj": "templateList"
  }, content, templateName && _react.default.createElement(_template_details.TemplateDetails, {
    templateName: templateName,
    onClose: closeTemplateDetails,
    editTemplate: editTemplate,
    cloneTemplate: cloneTemplate,
    reload: reload
  }));
};

exports.TemplateList = TemplateList;