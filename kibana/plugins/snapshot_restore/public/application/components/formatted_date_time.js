"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormattedDateTime = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FormattedDateTime = function FormattedDateTime(_ref) {
  var epochMs = _ref.epochMs,
      type = _ref.type;
  var date = new Date(epochMs);

  var formattedDate = _react.default.createElement(_react2.FormattedDate, {
    value: date,
    year: "numeric",
    month: "short",
    day: "2-digit"
  });

  var formattedTime = _react.default.createElement(_react2.FormattedTime, {
    value: date,
    timeZoneName: "short"
  });

  if (type) {
    return type === 'date' ? formattedDate : formattedTime;
  }

  return _react.default.createElement(_react.Fragment, null, formattedDate, " ", formattedTime);
};

exports.FormattedDateTime = FormattedDateTime;