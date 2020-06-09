"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilebeatConfig = createFilebeatConfig;

var _i18n = require("@kbn/i18n");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function createFilebeatConfig(index, results, ingestPipelineId, username) {
  return ['filebeat.inputs:', '- type: log'].concat(_toConsumableArray(getPaths()), _toConsumableArray(getEncoding(results)), _toConsumableArray(getExcludeLines(results)), _toConsumableArray(getMultiline(results)), [''], _toConsumableArray(getProcessors(results)), ['output.elasticsearch:', '  hosts: ["<es_url>"]'], _toConsumableArray(getUserDetails(username)), ["  index: \"".concat(index, "\""), "  pipeline: \"".concat(ingestPipelineId, "\""), '', 'setup:', '  template.enabled: false', '  ilm.enabled: false']).join('\n');
}

function getPaths() {
  var txt = _i18n.i18n.translate('xpack.ml.fileDatavisualizer.fileBeatConfig.paths', {
    defaultMessage: 'add path to your files here'
  });

  return ['  paths:', "  - '<".concat(txt, ">'")];
}

function getEncoding(results) {
  return results.charset !== 'UTF-8' ? ["  encoding: ".concat(results.charset)] : [];
}

function getExcludeLines(results) {
  return results.exclude_lines_pattern !== undefined ? ["  exclude_lines: ['".concat(results.exclude_lines_pattern.replace(/'/g, "''"), "']")] : [];
}

function getMultiline(results) {
  return results.multiline_start_pattern !== undefined ? ['  multiline:', "    pattern: '".concat(results.multiline_start_pattern.replace(/'/g, "''"), "'"), '    match: after', '    negate: true'] : [];
}

function getProcessors(results) {
  return results.need_client_timezone === true ? ['processors:', '- add_locale: ~', ''] : [];
}

function getUserDetails(username) {
  return username !== null ? ["  username: \"".concat(username, "\""), '  password: "<password>"'] : [];
}