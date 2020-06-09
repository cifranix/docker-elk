"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceTokensInUrlValue = replaceTokensInUrlValue;
exports.getUrlForRecord = getUrlForRecord;
exports.openCustomUrlWindow = openCustomUrlWindow;
exports.isValidLabel = isValidLabel;
exports.isValidTimeRange = isValidTimeRange;

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _parse_interval = require("../../../common/util/parse_interval");

var _string_utils = require("./string_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Value of custom_url time_range property indicating drilldown time range is calculated automatically
// depending on the context in which the URL is being opened.
var TIME_RANGE_AUTO = 'auto'; // Replaces the $ delimited tokens in the url_value of the custom URL configuration
// with values from the supplied document.

function replaceTokensInUrlValue(customUrlConfig, jobBucketSpanSecs, doc, timeFieldName) {
  // If urlValue contains $earliest$ and $latest$ tokens, add in times to the test doc.
  var urlValue = customUrlConfig.url_value;
  var timestamp = doc[timeFieldName];
  var timeRangeInterval = 'time_range' in customUrlConfig ? (0, _parse_interval.parseInterval)(customUrlConfig.time_range) : null;

  var record = _objectSpread({}, doc);

  if (urlValue.includes('$earliest$')) {
    var earliestMoment = (0, _moment.default)(timestamp);

    if (timeRangeInterval !== null) {
      earliestMoment.subtract(timeRangeInterval);
    } else {
      earliestMoment.subtract(jobBucketSpanSecs, 's');
    }

    record.earliest = earliestMoment.toISOString();
  }

  if (urlValue.includes('$latest$')) {
    var latestMoment = (0, _moment.default)(timestamp).add(jobBucketSpanSecs, 's');

    if (timeRangeInterval !== null) {
      latestMoment.add(timeRangeInterval);
    } else {
      latestMoment.add(jobBucketSpanSecs, 's');
    }

    record.latest = latestMoment.toISOString();
  }

  return getUrlForRecord(customUrlConfig, record);
} // Returns the URL to open from the supplied config, with any dollar delimited tokens
// substituted from the supplied anomaly record.


function getUrlForRecord(urlConfig, record) {
  if (isKibanaUrl(urlConfig) === true) {
    return buildKibanaUrl(urlConfig, record);
  } else {
    var urlPath = (0, _string_utils.replaceStringTokens)(urlConfig.url_value, record, false);
    return urlPath;
  }
} // Opens the specified URL in a new window. The behaviour (for example whether
// it opens in a new tab or window) is determined from the original configuration
// object which indicates whether it is opening a Kibana page running on the same server.
// fullUrl is the complete URL, including the base path, with any dollar delimited tokens
// from the urlConfig having been substituted with values from an anomaly record.


function openCustomUrlWindow(fullUrl, urlConfig) {
  // Run through a regex to test whether the url_value starts with a protocol scheme.
  if (/^(?:[a-z]+:)?\/\//i.test(urlConfig.url_value) === false) {
    window.open(fullUrl, '_blank');
  } else {
    // Add noopener and noreferrr properties for external URLs.
    var newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer'); // Expect newWindow to be null, but just in case if not, reset the opener link.

    if (newWindow !== undefined && newWindow !== null) {
      newWindow.opener = null;
    }
  }
} // Returns whether the url_value of the supplied config is for
// a Kibana Discover or Dashboard page running on the same server as this ML plugin.


function isKibanaUrl(urlConfig) {
  var urlValue = urlConfig.url_value;
  return urlValue.startsWith('kibana#/discover') || urlValue.startsWith('kibana#/dashboard') || urlValue.startsWith('apm#/');
}
/**
 * Escape any double quotes in the value for correct use in KQL.
 */


function escapeForKQL(value) {
  return String(value).replace(/\"/g, '\\"');
}

/**
 * Builds a Kibana dashboard or Discover URL from the supplied config, with any
 * dollar delimited tokens substituted from the supplied anomaly record.
 */
function buildKibanaUrl(urlConfig, record) {
  var urlValue = urlConfig.url_value;
  var URL_LENGTH_LIMIT = 2000;
  var isLuceneQueryLanguage = urlValue.includes('language:lucene');
  var queryLanguageEscapeCallback = isLuceneQueryLanguage ? _string_utils.escapeForElasticsearchQuery : escapeForKQL;
  var commonEscapeCallback = (0, _lodash.flow)( // Kibana URLs used rison encoding, so escape with ! any ! or ' characters
  function (v) {
    return v.replace(/[!']/g, '!$&');
  }, encodeURIComponent);

  var replaceSingleTokenValues = function replaceSingleTokenValues(str) {
    var getResultTokenValue = (0, _lodash.flow)( // Special characters inside of the filter should not be escaped for Lucene query language.
    isLuceneQueryLanguage ? function (v) {
      return v;
    } : queryLanguageEscapeCallback, commonEscapeCallback); // Looking for a $token$ with an optional trailing slash

    return str.replace(/\$([^?&$\'"]+)\$(\/)?/g, function (match, name) {
      var slash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      // Use lodash get to allow nested JSON fields to be retrieved.
      var tokenValue = (0, _lodash.get)(record, name);
      tokenValue = Array.isArray(tokenValue) ? tokenValue[0] : tokenValue; // If property not found token is replaced with an empty string.

      return tokenValue === undefined ? '' : getResultTokenValue(tokenValue) + slash;
    });
  };

  return (0, _lodash.flow)(function (str) {
    return str.replace('$earliest$', record.earliest).replace('$latest$', record.latest);
  }, // Process query string content of the URL
  function (str) {
    var getResultTokenValue = (0, _lodash.flow)(queryLanguageEscapeCallback, commonEscapeCallback);
    return str.replace(/(.+query:'|.+&kuery=)([^']*)(['&].+)/, function (fullMatch, prefix, queryString, postfix) {
      var _map = [prefix, postfix].map(replaceSingleTokenValues),
          _map2 = _slicedToArray(_map, 2),
          resultPrefix = _map2[0],
          resultPostfix = _map2[1];

      var availableCharactersLeft = URL_LENGTH_LIMIT - resultPrefix.length - resultPostfix.length;
      var queryFields = queryString // Split query string by AND operator.
      .split(/\sand\s/i) // Get property name from `influencerField:$influencerField$` string.
      .map(function (v) {
        return v.split(':')[0];
      });
      var queryParts = [];
      var joinOperator = ' AND ';

      fieldsLoop: for (var i = 0; i < queryFields.length; i++) {
        var field = queryFields[i]; // Use lodash get to allow nested JSON fields to be retrieved.

        var tokenValues = (0, _lodash.get)(record, field) || null;

        if (tokenValues === null) {
          continue;
        }

        tokenValues = Array.isArray(tokenValues) ? tokenValues : [tokenValues]; // Create a pair `influencerField:value`.
        // In cases where there are multiple influencer field values for an anomaly
        // combine values with OR operator e.g. `(influencerField:value or influencerField:another_value)`.

        var result = '';

        for (var j = 0; j < tokenValues.length; j++) {
          var part = "".concat(j > 0 ? ' OR ' : '').concat(field, ":\"").concat(getResultTokenValue(tokenValues[j]), "\""); // Build up a URL string which is not longer than the allowed length and isn't corrupted by invalid query.

          if (availableCharactersLeft < part.length) {
            if (result.length > 0) {
              queryParts.push(j > 0 ? "(".concat(result, ")") : result);
            }

            break fieldsLoop;
          }

          result += part;
          availableCharactersLeft -= result.length;
        }

        if (result.length > 0) {
          queryParts.push(tokenValues.length > 1 ? "(".concat(result, ")") : result);
        }
      }

      var resultQuery = queryParts.join(joinOperator);
      return "".concat(resultPrefix).concat(resultQuery).concat(resultPostfix);
    });
  }, replaceSingleTokenValues)(urlValue);
} // Returns whether the supplied label is valid for a custom URL.


function isValidLabel(label, savedCustomUrls) {
  var isValid = label !== undefined && label.trim().length > 0;

  if (isValid === true && savedCustomUrls !== undefined) {
    // Check the label is unique.
    var existingLabels = savedCustomUrls.map(function (customUrl) {
      return customUrl.url_name;
    });
    isValid = !existingLabels.includes(label);
  }

  return isValid;
}

function isValidTimeRange(timeRange) {
  // Allow empty timeRange string, which gives the 'auto' behaviour.
  if (timeRange === undefined || timeRange.length === 0 || timeRange === TIME_RANGE_AUTO) {
    return true;
  }

  var interval = (0, _parse_interval.parseInterval)(timeRange);
  return interval !== null;
}