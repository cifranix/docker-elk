"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csvReportingProvider = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _reporting_panel_content = require("../components/reporting_panel_content");

var _license_check = require("../lib/license_check");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var csvReportingProvider = function csvReportingProvider(_ref) {
  var apiClient = _ref.apiClient,
      toasts = _ref.toasts,
      license$ = _ref.license$;
  var toolTipContent = '';
  var disabled = true;
  var hasCSVReporting = false;
  license$.subscribe(function (license) {
    var _checkLicense = (0, _license_check.checkLicense)(license.check('reporting', 'basic')),
        enableLinks = _checkLicense.enableLinks,
        showLinks = _checkLicense.showLinks,
        message = _checkLicense.message;

    toolTipContent = message;
    hasCSVReporting = showLinks;
    disabled = !enableLinks;
  });

  var getShareMenuItems = function getShareMenuItems(_ref2) {
    var objectType = _ref2.objectType,
        objectId = _ref2.objectId,
        sharingData = _ref2.sharingData,
        isDirty = _ref2.isDirty,
        onClose = _ref2.onClose;

    if ('search' !== objectType) {
      return [];
    }

    var getJobParams = function getJobParams() {
      return _objectSpread({}, sharingData, {
        type: objectType
      });
    };

    var shareActions = [];

    if (hasCSVReporting) {
      var _shareMenuItem;

      var panelTitle = _i18n.i18n.translate('xpack.reporting.shareContextMenu.csvReportsButtonLabel', {
        defaultMessage: 'CSV Reports'
      });

      shareActions.push({
        shareMenuItem: (_shareMenuItem = {
          name: panelTitle,
          icon: 'document',
          toolTipContent: toolTipContent,
          disabled: disabled
        }, _defineProperty(_shareMenuItem, 'data-test-subj', 'csvReportMenuItem'), _defineProperty(_shareMenuItem, "sortOrder", 1), _shareMenuItem),
        panel: {
          id: 'csvReportingPanel',
          title: panelTitle,
          content: _react.default.createElement(_reporting_panel_content.ReportingPanelContent, {
            apiClient: apiClient,
            toasts: toasts,
            reportType: "csv",
            layoutId: undefined,
            objectType: objectType,
            objectId: objectId,
            getJobParams: getJobParams,
            isDirty: isDirty,
            onClose: onClose
          })
        }
      });
    }

    return shareActions;
  };

  return {
    id: 'csvReports',
    getShareMenuItems: getShareMenuItems
  };
};

exports.csvReportingProvider = csvReportingProvider;