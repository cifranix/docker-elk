"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchSelection = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _public = require("../../../../../../../../../src/plugins/saved_objects/public");

var _app_dependencies = require("../../../../app_dependencies");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var fixedPageSize = 8;

var SearchSelection = function SearchSelection(_ref) {
  var onSearchSelected = _ref.onSearchSelected;

  var _useAppDependencies = (0, _app_dependencies.useAppDependencies)(),
      uiSettings = _useAppDependencies.uiSettings,
      savedObjects = _useAppDependencies.savedObjects;

  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiModalHeader, null, _react2.default.createElement(_eui.EuiModalHeaderTitle, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.transform.newTransform.newTransformTitle",
    defaultMessage: "New transform"
  }), ' ', "/", ' ', _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.transform.newTransform.chooseSourceTitle",
    defaultMessage: "Choose a source"
  }))), _react2.default.createElement(_eui.EuiModalBody, null, _react2.default.createElement(_public.SavedObjectFinderUi, {
    key: "searchSavedObjectFinder",
    onChoose: onSearchSelected,
    showFilter: true,
    noItemsMessage: _i18n.i18n.translate('xpack.transform.newTransform.searchSelection.notFoundLabel', {
      defaultMessage: 'No matching indices or saved searches found.'
    }),
    savedObjectMetaData: [{
      type: 'search',
      getIconForSavedObject: function getIconForSavedObject() {
        return 'search';
      },
      name: _i18n.i18n.translate('xpack.transform.newTransform.searchSelection.savedObjectType.search', {
        defaultMessage: 'Saved search'
      })
    }, {
      type: 'index-pattern',
      getIconForSavedObject: function getIconForSavedObject() {
        return 'indexPatternApp';
      },
      name: _i18n.i18n.translate('xpack.transform.newTransform.searchSelection.savedObjectType.indexPattern', {
        defaultMessage: 'Index pattern'
      })
    }],
    fixedPageSize: fixedPageSize,
    uiSettings: uiSettings,
    savedObjects: savedObjects
  })));
};

exports.SearchSelection = SearchSelection;