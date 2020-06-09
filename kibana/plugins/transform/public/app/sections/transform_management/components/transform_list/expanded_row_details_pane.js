"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandedRowDetailsPane = exports.Section = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Section = function Section(_ref) {
  var section = _ref.section;

  if (section.items.length === 0) {
    return null;
  }

  return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("span", null, section.title)), _react.default.createElement(_eui.EuiDescriptionList, {
    compressed: true,
    type: "column",
    listItems: section.items
  }));
};

exports.Section = Section;

var ExpandedRowDetailsPane = function ExpandedRowDetailsPane(_ref2) {
  var sections = _ref2.sections;
  return _react.default.createElement("div", {
    "data-test-subj": "transformDetailsTabContent"
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      width: '50%'
    }
  }, sections.filter(function (s) {
    return s.position === 'left';
  }).map(function (s) {
    return _react.default.createElement(_react.Fragment, {
      key: s.title
    }, _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(Section, {
      section: s
    }));
  })), _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      width: '50%'
    }
  }, sections.filter(function (s) {
    return s.position === 'right';
  }).map(function (s) {
    return _react.default.createElement(_react.Fragment, {
      key: s.title
    }, _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(Section, {
      section: s
    }));
  }))));
};

exports.ExpandedRowDetailsPane = ExpandedRowDetailsPane;