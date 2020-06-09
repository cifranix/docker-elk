"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomUrlsSelection = void 0;

var _react = _interopRequireWildcard(require("react"));

var _custom_urls = require("../../../../../../../../jobs_list/components/edit_job_flyout/tabs/custom_urls");

var _job_creator_context = require("../../../../../job_creator_context");

var _description = require("./description");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CustomUrlsSelection = function CustomUrlsSelection() {
  var _jobCreator$customUrl;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate;

  var setCustomUrls = function setCustomUrls(customUrls) {
    jobCreator.customUrls = customUrls;
    jobCreatorUpdate();
  };

  var combinedJob = _objectSpread({}, jobCreator.jobConfig, {
    datafeed_config: jobCreator.datafeedConfig
  });

  return _react.default.createElement(_description.Description, null, _react.default.createElement(_custom_urls.CustomUrls, {
    job: combinedJob,
    jobCustomUrls: (_jobCreator$customUrl = jobCreator.customUrls) !== null && _jobCreator$customUrl !== void 0 ? _jobCreator$customUrl : [],
    setCustomUrls: setCustomUrls,
    editMode: "modal"
  }));
};

exports.CustomUrlsSelection = CustomUrlsSelection;