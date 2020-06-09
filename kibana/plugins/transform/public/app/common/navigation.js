"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDiscoverUrl = getDiscoverUrl;
exports.RedirectToCreateTransform = exports.RedirectToTransformManagement = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _risonNode = _interopRequireDefault(require("rison-node"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Gets a url for navigating to Discover page.
 * @param indexPatternId Index pattern ID.
 * @param baseUrl Base url.
 */
function getDiscoverUrl(indexPatternId, baseUrl) {
  var _g = _risonNode.default.encode({}); // Add the index pattern ID to the appState part of the URL.


  var _a = _risonNode.default.encode({
    index: indexPatternId
  });

  var hash = "#/discover?_g=".concat(_g, "&_a=").concat(_a);
  return "".concat(baseUrl).concat(hash);
}

var RedirectToTransformManagement = function RedirectToTransformManagement() {
  return _react.default.createElement(_reactRouterDom.Redirect, {
    from: _constants.CLIENT_BASE_PATH,
    to: _constants.CLIENT_BASE_PATH + _constants.SECTION_SLUG.HOME
  });
};

exports.RedirectToTransformManagement = RedirectToTransformManagement;

var RedirectToCreateTransform = function RedirectToCreateTransform(_ref) {
  var savedObjectId = _ref.savedObjectId;
  return _react.default.createElement(_reactRouterDom.Redirect, {
    to: "".concat(_constants.CLIENT_BASE_PATH).concat(_constants.SECTION_SLUG.CREATE_TRANSFORM, "/").concat(savedObjectId)
  });
};

exports.RedirectToCreateTransform = RedirectToCreateTransform;