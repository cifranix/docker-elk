"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLinkProps = void 0;

var _react = require("react");

var _queryString = require("query-string");

var _url = _interopRequireDefault(require("url"));

var _public = require("../../../../../src/plugins/kibana_utils/public");

var _use_prefix_path_with_basepath = require("./use_prefix_path_with_basepath");

var _history_context = require("../utils/history_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useLinkProps = function useLinkProps(_ref) {
  var app = _ref.app,
      pathname = _ref.pathname,
      hash = _ref.hash,
      search = _ref.search;
  validateParams({
    app: app,
    pathname: pathname,
    hash: hash,
    search: search
  });
  var history = (0, _history_context.useHistory)();
  var prefixer = (0, _use_prefix_path_with_basepath.usePrefixPathWithBasepath)();
  var encodedSearch = (0, _react.useMemo)(function () {
    return search ? encodeSearch(search) : undefined;
  }, [search]);
  var internalLinkResult = (0, _react.useMemo)(function () {
    // When the logs / metrics apps are first mounted a history instance is setup with a 'basename' equal to the
    // 'appBasePath' received from Core's 'AppMountParams', e.g. /BASE_PATH/s/SPACE_ID/app/APP_ID. With internal
    // linking we are using 'createHref' and 'push' on top of this history instance. So a pathname of /inventory used within
    // the metrics app will ultimatey end up as /BASE_PATH/s/SPACE_ID/app/metrics/inventory. React-router responds to this
    // as it is instantiated with the same history instance.
    return history === null || history === void 0 ? void 0 : history.createHref({
      pathname: pathname ? formatPathname(pathname) : undefined,
      search: encodedSearch
    });
  }, [history, pathname, encodedSearch]);
  var externalLinkResult = (0, _react.useMemo)(function () {
    // The URI spec defines that the query should appear before the fragment
    // https://tools.ietf.org/html/rfc3986#section-3 (e.g. url.format()). However, in Kibana, apps that use
    // hash based routing expect the query to be part of the hash. This will handle that.
    var mergedHash = hash && encodedSearch ? "".concat(hash, "?").concat(encodedSearch) : hash;

    var link = _url.default.format({
      pathname: pathname,
      hash: mergedHash,
      search: !hash ? encodedSearch : undefined
    });

    return prefixer(app, link);
  }, [hash, encodedSearch, pathname, prefixer, app]);
  var onClick = (0, _react.useMemo)(function () {
    // If these results are equal we know we're trying to navigate within the same application
    // that the current history instance is representing
    if (internalLinkResult && linksAreEquivalent(externalLinkResult, internalLinkResult)) {
      return function (e) {
        e.preventDefault();

        if (history) {
          history.push({
            pathname: pathname ? formatPathname(pathname) : undefined,
            search: encodedSearch
          });
        }
      };
    } else {
      return undefined;
    }
  }, [internalLinkResult, externalLinkResult, history, pathname, encodedSearch]);
  return {
    href: externalLinkResult,
    onClick: onClick
  };
};

exports.useLinkProps = useLinkProps;

var encodeSearch = function encodeSearch(search) {
  return (0, _queryString.stringify)(_public.url.encodeQuery(search), {
    sort: false,
    encode: false
  });
};

var formatPathname = function formatPathname(pathname) {
  return pathname[0] === '/' ? pathname : "/".concat(pathname);
};

var validateParams = function validateParams(_ref2) {
  var app = _ref2.app,
      pathname = _ref2.pathname,
      hash = _ref2.hash,
      search = _ref2.search;

  if (!app && hash) {
    throw new Error('The metrics and logs apps use browserHistory. Please provide a pathname rather than a hash.');
  }
};

var linksAreEquivalent = function linksAreEquivalent(externalLink, internalLink) {
  // Compares with trailing slashes removed. This handles the case where the pathname is '/'
  // and 'createHref' will include the '/' but Kibana's 'getUrlForApp' will remove it.
  return externalLink.replace(/\/$/, '') === internalLink.replace(/\/$/, '');
};