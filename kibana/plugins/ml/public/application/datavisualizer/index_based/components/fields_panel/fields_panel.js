"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldsPanel = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _kibana = require("../../../../contexts/kibana");

var _field_data_card = require("../field_data_card");

var _field_types_select = require("../field_types_select");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FieldsPanel = function FieldsPanel(_ref) {
  var title = _ref.title,
      totalFieldCount = _ref.totalFieldCount,
      populatedFieldCount = _ref.populatedFieldCount,
      showAllFields = _ref.showAllFields,
      setShowAllFields = _ref.setShowAllFields,
      fieldTypes = _ref.fieldTypes,
      showFieldType = _ref.showFieldType,
      setShowFieldType = _ref.setShowFieldType,
      fieldSearchBarQuery = _ref.fieldSearchBarQuery,
      setFieldSearchBarQuery = _ref.setFieldSearchBarQuery,
      fieldVisConfigs = _ref.fieldVisConfigs;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      notifications = _useMlKibana.services.notifications;

  function onShowAllFieldsChange() {
    setShowAllFields(!showAllFields);
  }

  function onSearchBarChange(query) {
    if (query.error) {
      var toasts = notifications.toasts;
      toasts.addWarning(_i18n.i18n.translate('xpack.ml.datavisualizer.fieldsPanel.searchBarError', {
        defaultMessage: "An error occurred running the search. {message}.",
        values: {
          message: query.error.message
        }
      }));
    } else {
      setFieldSearchBarQuery(query.queryText);
    }
  }

  return _react.default.createElement("div", {
    "data-test-subj": "mlDataVisualizerFieldsPanel ".concat(fieldTypes)
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "m"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h2", null, title))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    position: "top",
    content: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.datavisualizer.fieldsPanel.countDescription",
      defaultMessage: "{cardsCount} {cardsCount, plural, one {field exists} other {fields exist}} in documents sampled",
      values: {
        cardsCount: populatedFieldCount
      }
    })
  }, _react.default.createElement(_eui.EuiBadge, {
    title: ""
  }, _react.default.createElement("b", null, populatedFieldCount)))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.datavisualizer.fieldsPanel.totalFieldLabel",
    defaultMessage: "Total fields: {wrappedTotalFields}",
    values: {
      wrappedTotalFields: _react.default.createElement("b", null, totalFieldCount)
    }
  }))), populatedFieldCount < totalFieldCount && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSwitch, {
    id: "".concat(title, "_show_empty_fields"),
    label: _i18n.i18n.translate('xpack.ml.datavisualizer.fieldsPanel.showEmptyFieldsLabel', {
      defaultMessage: 'Show empty fields'
    }),
    checked: showAllFields,
    onChange: onShowAllFieldsChange,
    "data-test-subj": "mlDataVisualizerShowEmptyFieldsCheckbox",
    compressed: true
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "m",
    direction: "rowReverse"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      maxWidth: '400px'
    },
    "data-test-subj": "mlDataVisualizerFieldsSearchBarDiv"
  }, _react.default.createElement(_eui.EuiSearchBar, {
    defaultQuery: "",
    query: fieldSearchBarQuery,
    box: {
      placeholder: _i18n.i18n.translate('xpack.ml.datavisualizer.fieldsPanel.filterFieldsPlaceholder', {
        defaultMessage: 'Filter {type}',
        values: {
          type: title
        }
      })
    },
    onChange: onSearchBarChange,
    "data-test-subj": "mlDataVisualizerFieldsSearchBar"
  })), typeof setShowFieldType === 'function' && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_field_types_select.FieldTypesSelect, {
    fieldTypes: fieldTypes,
    selectedFieldType: showFieldType,
    setSelectedFieldType: setShowFieldType
  }))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGrid, {
    gutterSize: "m"
  }, fieldVisConfigs.filter(function (_ref2) {
    var stats = _ref2.stats;
    return stats !== undefined;
  }).map(function (visConfig, i) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: "".concat(visConfig.fieldName, "_").concat(visConfig.stats.count),
      style: {
        minWidth: '360px'
      }
    }, _react.default.createElement(_field_data_card.FieldDataCard, {
      config: visConfig
    }));
  })));
};

exports.FieldsPanel = FieldsPanel;