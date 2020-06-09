"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourcePicker = SourcePicker;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../src/plugins/saved_objects/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var fixedPageSize = 8;

function SourcePicker(_ref) {
  var savedObjects = _ref.savedObjects,
      uiSettings = _ref.uiSettings,
      onIndexPatternSelected = _ref.onIndexPatternSelected;
  return _react.default.createElement(_public.SavedObjectFinderUi, {
    savedObjects: savedObjects,
    uiSettings: uiSettings,
    onChoose: function onChoose(_id, _type, _name, indexPattern) {
      onIndexPatternSelected(indexPattern);
    },
    showFilter: false,
    noItemsMessage: _i18n.i18n.translate('xpack.graph.sourceModal.notFoundLabel', {
      defaultMessage: 'No data sources found.'
    }),
    savedObjectMetaData: [{
      type: 'index-pattern',
      getIconForSavedObject: function getIconForSavedObject() {
        return 'indexPatternApp';
      },
      name: _i18n.i18n.translate('xpack.graph.sourceModal.savedObjectType.indexPattern', {
        defaultMessage: 'Index pattern'
      }),
      showSavedObject: function showSavedObject(indexPattern) {
        return !indexPattern.attributes.type;
      },
      includeFields: ['type']
    }],
    fixedPageSize: fixedPageSize
  });
}