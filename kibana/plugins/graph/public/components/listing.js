"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Listing = Listing;

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function Listing(props) {
  return _react2.default.createElement(_react.I18nProvider, null, _react2.default.createElement(_public.TableListView, {
    headingId: "graphListingHeading",
    createItem: props.capabilities.save ? props.createItem : undefined,
    findItems: props.findItems,
    deleteItems: props.capabilities.delete ? props.deleteItems : undefined,
    editItem: props.capabilities.save ? props.editItem : undefined,
    tableColumns: getTableColumns(props.getViewUrl),
    listingLimit: props.listingLimit,
    initialFilter: props.initialFilter,
    noItemsFragment: getNoItemsMessage(props.capabilities.save === false, props.createItem, props.coreStart.application),
    toastNotifications: props.coreStart.notifications.toasts,
    entityName: _i18n.i18n.translate('xpack.graph.listing.table.entityName', {
      defaultMessage: 'graph'
    }),
    entityNamePlural: _i18n.i18n.translate('xpack.graph.listing.table.entityNamePlural', {
      defaultMessage: 'graphs'
    }),
    tableListTitle: _i18n.i18n.translate('xpack.graph.listing.graphsTitle', {
      defaultMessage: 'Graphs'
    }),
    uiSettings: props.coreStart.uiSettings
  }));
}

function getNoItemsMessage(hideWriteControls, createItem, application) {
  if (hideWriteControls) {
    return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiEmptyPrompt, {
      iconType: "graphApp",
      title: _react2.default.createElement("h1", {
        id: "graphListingHeading"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.graph.listing.noItemsMessage",
        defaultMessage: "Looks like you don't have any graphs."
      }))
    }));
  }

  var sampleDataUrl = "".concat(application.getUrlForApp('kibana'), "#/home/tutorial_directory/sampleData");
  return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "graphApp",
    title: _react2.default.createElement("h1", {
      id: "graphListingHeading"
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.graph.listing.createNewGraph.title",
      defaultMessage: "Create your first graph"
    })),
    body: _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.graph.listing.createNewGraph.combineDataViewFromKibanaAppDescription",
      defaultMessage: "Discover patterns and relationships in your Elasticsearch indices."
    })), _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.graph.listing.createNewGraph.newToKibanaDescription",
      defaultMessage: "New to Kibana? Get started with {sampleDataInstallLink}.",
      values: {
        sampleDataInstallLink: _react2.default.createElement(_eui.EuiLink, {
          href: sampleDataUrl
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.graph.listing.createNewGraph.sampleDataInstallLinkText",
          defaultMessage: "sample data"
        }))
      }
    }))),
    actions: _react2.default.createElement(_eui.EuiButton, {
      onClick: createItem,
      fill: true,
      iconType: "plusInCircle",
      "data-test-subj": "graphCreateGraphPromptButton"
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.graph.listing.createNewGraph.createButtonLabel",
      defaultMessage: "Create graph"
    }))
  }));
} // TODO this is an EUI type but EUI doesn't provide this typing yet


function getTableColumns(getViewUrl) {
  return [{
    field: 'title',
    name: _i18n.i18n.translate('xpack.graph.listing.table.titleColumnName', {
      defaultMessage: 'Title'
    }),
    sortable: true,
    render: function render(field, record) {
      return _react2.default.createElement(_eui.EuiLink, {
        href: getViewUrl(record),
        "data-test-subj": "graphListingTitleLink-".concat(record.title.split(' ').join('-'))
      }, field);
    }
  }, {
    field: 'description',
    name: _i18n.i18n.translate('xpack.graph.listing.table.descriptionColumnName', {
      defaultMessage: 'Description'
    }),
    dataType: 'string',
    sortable: true
  }];
}