"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportingPDFPNGProvider = void 0;

var _i18n = require("@kbn/i18n");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _react = _interopRequireDefault(require("react"));

var _license_check = require("../lib/license_check");

var _screen_capture_panel_content = require("../components/screen_capture_panel_content");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reportingPDFPNGProvider = function reportingPDFPNGProvider(_ref) {
  var apiClient = _ref.apiClient,
      toasts = _ref.toasts,
      license$ = _ref.license$,
      uiSettings = _ref.uiSettings;
  var toolTipContent = '';
  var disabled = true;
  var hasPDFPNGReporting = false;
  license$.subscribe(function (license) {
    var _checkLicense = (0, _license_check.checkLicense)(license.check('reporting', 'gold')),
        enableLinks = _checkLicense.enableLinks,
        showLinks = _checkLicense.showLinks,
        message = _checkLicense.message;

    toolTipContent = message;
    hasPDFPNGReporting = showLinks;
    disabled = !enableLinks;
  });

  var getShareMenuItems = function getShareMenuItems(_ref2) {
    var objectType = _ref2.objectType,
        objectId = _ref2.objectId,
        sharingData = _ref2.sharingData,
        isDirty = _ref2.isDirty,
        onClose = _ref2.onClose,
        shareableUrl = _ref2.shareableUrl;

    if (!['dashboard', 'visualization'].includes(objectType)) {
      return [];
    } // Dashboard only mode does not currently support reporting
    // https://github.com/elastic/kibana/issues/18286
    // @TODO For NP


    if (objectType === 'dashboard' && false) {
      return [];
    }

    var getReportingJobParams = function getReportingJobParams() {
      // Relative URL must have URL prefix (Spaces ID prefix), but not server basePath
      // Replace hashes with original RISON values.
      var relativeUrl = shareableUrl.replace(window.location.origin + apiClient.getServerBasePath(), '');
      var browserTimezone = uiSettings.get('dateFormat:tz') === 'Browser' ? _momentTimezone.default.tz.guess() : uiSettings.get('dateFormat:tz');
      return _objectSpread({}, sharingData, {
        objectType: objectType,
        browserTimezone: browserTimezone,
        relativeUrls: [relativeUrl]
      });
    };

    var getPngJobParams = function getPngJobParams() {
      // Replace hashes with original RISON values.
      var relativeUrl = shareableUrl.replace(window.location.origin + apiClient.getServerBasePath(), '');
      var browserTimezone = uiSettings.get('dateFormat:tz') === 'Browser' ? _momentTimezone.default.tz.guess() : uiSettings.get('dateFormat:tz');
      return _objectSpread({}, sharingData, {
        objectType: objectType,
        browserTimezone: browserTimezone,
        relativeUrl: relativeUrl
      });
    };

    var shareActions = [];

    if (hasPDFPNGReporting) {
      var _shareMenuItem, _shareMenuItem2;

      var pngPanelTitle = _i18n.i18n.translate('xpack.reporting.shareContextMenu.pngReportsButtonLabel', {
        defaultMessage: 'PNG Reports'
      });

      var pdfPanelTitle = _i18n.i18n.translate('xpack.reporting.shareContextMenu.pdfReportsButtonLabel', {
        defaultMessage: 'PDF Reports'
      });

      shareActions.push({
        shareMenuItem: (_shareMenuItem = {
          name: pngPanelTitle,
          icon: 'document',
          toolTipContent: toolTipContent,
          disabled: disabled
        }, _defineProperty(_shareMenuItem, 'data-test-subj', 'pngReportMenuItem'), _defineProperty(_shareMenuItem, "sortOrder", 10), _shareMenuItem),
        panel: {
          id: 'reportingPngPanel',
          title: pngPanelTitle,
          content: _react.default.createElement(_screen_capture_panel_content.ScreenCapturePanelContent, {
            apiClient: apiClient,
            toasts: toasts,
            reportType: "png",
            objectType: objectType,
            objectId: objectId,
            getJobParams: getPngJobParams,
            isDirty: isDirty,
            onClose: onClose
          })
        }
      });
      shareActions.push({
        shareMenuItem: (_shareMenuItem2 = {
          name: pdfPanelTitle,
          icon: 'document',
          toolTipContent: toolTipContent,
          disabled: disabled
        }, _defineProperty(_shareMenuItem2, 'data-test-subj', 'pdfReportMenuItem'), _defineProperty(_shareMenuItem2, "sortOrder", 10), _shareMenuItem2),
        panel: {
          id: 'reportingPdfPanel',
          title: pdfPanelTitle,
          content: _react.default.createElement(_screen_capture_panel_content.ScreenCapturePanelContent, {
            apiClient: apiClient,
            toasts: toasts,
            reportType: "printablePdf",
            objectType: objectType,
            objectId: objectId,
            getJobParams: getReportingJobParams,
            isDirty: isDirty,
            onClose: onClose
          })
        }
      });
    }

    return shareActions;
  };

  return {
    id: 'screenCaptureReports',
    getShareMenuItems: getShareMenuItems
  };
};

exports.reportingPDFPNGProvider = reportingPDFPNGProvider;