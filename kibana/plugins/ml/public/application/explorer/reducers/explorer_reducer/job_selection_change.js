"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobSelectionChange = void 0;

var _explorer_utils = require("../../explorer_utils");

var _get_index_pattern = require("./get_index_pattern");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var jobSelectionChange = function jobSelectionChange(state, payload) {
  var selectedJobs = payload.selectedJobs;

  var stateUpdate = _objectSpread({}, state, {
    noInfluencersConfigured: (0, _explorer_utils.getInfluencers)(selectedJobs).length === 0,
    overallSwimlaneData: (0, _explorer_utils.getDefaultSwimlaneData)(),
    selectedJobs: selectedJobs
  }); // clear filter if selected jobs have no influencers


  if (stateUpdate.noInfluencersConfigured === true) {
    var noFilterState = {
      filterActive: false,
      filteredFields: [],
      influencersFilterQuery: undefined,
      maskAll: false,
      queryString: '',
      tableQueryString: ''
    };
    Object.assign(stateUpdate, noFilterState);
  } else {
    // indexPattern will not be used if there are no influencers so set up can be skipped
    // indexPattern is passed to KqlFilterBar which is only shown if (noInfluencersConfigured === false)
    stateUpdate.indexPattern = (0, _get_index_pattern.getIndexPattern)(selectedJobs);
  }

  stateUpdate.loading = true;
  return stateUpdate;
};

exports.jobSelectionChange = jobSelectionChange;