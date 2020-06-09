"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _public = require("../../../../../../../../../src/plugins/saved_objects/public");

var _kibana = require("../../../../contexts/kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Page = function Page(_ref) {
  var nextStepPath = _ref.nextStepPath;
  var RESULTS_PER_PAGE = 20;
  var _useMlKibana$services = (0, _kibana.useMlKibana)().services,
      uiSettings = _useMlKibana$services.uiSettings,
      savedObjects = _useMlKibana$services.savedObjects;

  var onObjectSelection = function onObjectSelection(id, type) {
    window.location.href = "".concat(nextStepPath, "?").concat(type === 'index-pattern' ? 'index' : 'savedSearchId', "=").concat(encodeURIComponent(id));
  };

  return _react.default.createElement(_eui.EuiPage, {
    "data-test-subj": "mlPageSourceSelection"
  }, _react.default.createElement(_eui.EuiPageBody, {
    restrictWidth: 1200
  }, _react.default.createElement(_eui.EuiPageHeader, null, _react.default.createElement(_eui.EuiPageHeaderSection, null, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.selectIndexPatternOrSavedSearch",
    defaultMessage: "Select index pattern or saved search"
  }))))), _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_public.SavedObjectFinderUi, {
    key: "searchSavedObjectFinder",
    onChoose: onObjectSelection,
    showFilter: true,
    noItemsMessage: _i18n.i18n.translate('xpack.ml.newJob.wizard.searchSelection.notFoundLabel', {
      defaultMessage: 'No matching indices or saved searches found.'
    }),
    savedObjectMetaData: [{
      type: 'search',
      getIconForSavedObject: function getIconForSavedObject() {
        return 'search';
      },
      name: _i18n.i18n.translate('xpack.ml.newJob.wizard.searchSelection.savedObjectType.search', {
        defaultMessage: 'Saved search'
      })
    }, {
      type: 'index-pattern',
      getIconForSavedObject: function getIconForSavedObject() {
        return 'indexPatternApp';
      },
      name: _i18n.i18n.translate('xpack.ml.newJob.wizard.searchSelection.savedObjectType.indexPattern', {
        defaultMessage: 'Index pattern'
      })
    }],
    fixedPageSize: RESULTS_PER_PAGE,
    uiSettings: uiSettings,
    savedObjects: savedObjects
  }))));
};

exports.Page = Page;