"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowExpansionButton = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RowExpansionButton = function RowExpansionButton(_ref) {
  var isExpanded = _ref.isExpanded,
      item = _ref.item,
      onCollapse = _ref.onCollapse,
      onExpand = _ref.onExpand;
  var handleClick = (0, _react.useCallback)(function () {
    return isExpanded ? onCollapse(item) : onExpand(item);
  }, [isExpanded, item, onCollapse, onExpand]);
  return _react.default.createElement(_eui.EuiButtonIcon, {
    onClick: handleClick,
    "aria-label": isExpanded ? collapseAriaLabel : expandAriaLabel,
    iconType: isExpanded ? 'arrowUp' : 'arrowDown'
  });
};

exports.RowExpansionButton = RowExpansionButton;

var collapseAriaLabel = _i18n.i18n.translate('xpack.infra.table.collapseRowLabel', {
  defaultMessage: 'Collapse'
});

var expandAriaLabel = _i18n.i18n.translate('xpack.infra.table.expandRowLabel', {
  defaultMessage: 'Expand'
});