"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewSideBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _kibana = require("../../contexts/kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createJobLink = '#/jobs/new_job/step/index_or_search';
var feedbackLink = 'https://www.elastic.co/community/';
var whatIsMachineLearningLink = 'https://www.elastic.co/what-is/elasticsearch-machine-learning';

function getCreateJobLink(createAnomalyDetectionJobDisabled) {
  return createAnomalyDetectionJobDisabled === true ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.overview.gettingStartedSectionCreateJob",
    defaultMessage: "creating a new job"
  }) : _react.default.createElement(_eui.EuiLink, {
    href: createJobLink,
    target: "blank"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.overview.gettingStartedSectionCreateJob",
    defaultMessage: "creating a new job"
  }));
}

var OverviewSideBar = function OverviewSideBar(_ref) {
  var createAnomalyDetectionJobDisabled = _ref.createAnomalyDetectionJobDisabled;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      _useMlKibana$services = _useMlKibana.services,
      docLinks = _useMlKibana$services.docLinks,
      basePath = _useMlKibana$services.http.basePath;

  var ELASTIC_WEBSITE_URL = docLinks.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = docLinks.DOC_LINK_VERSION;
  var docsLink = "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/xpack-ml.html");
  var transformsLink = "".concat(basePath.get(), "/app/kibana#/management/elasticsearch/transform");
  return _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.overview.gettingStartedSectionTitle",
    defaultMessage: "Getting started"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, {
    className: "mlOverview__sidebar"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.overview.gettingStartedSectionText",
    defaultMessage: "Welcome to Machine Learning. Get started by reviewing our {docs} or {createJob}. For more information about machine learning in the Elastic stack please see {whatIsMachineLearning}. We recommend using {transforms} to create feature indices for analytics jobs.",
    values: {
      docs: _react.default.createElement(_eui.EuiLink, {
        href: docsLink,
        target: "blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.overview.gettingStartedSectionDocs",
        defaultMessage: "documentation"
      })),
      createJob: getCreateJobLink(createAnomalyDetectionJobDisabled),
      transforms: _react.default.createElement(_eui.EuiLink, {
        href: transformsLink,
        target: "blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.overview.gettingStartedSectionTransforms",
        defaultMessage: "Elasticsearch's transforms"
      })),
      whatIsMachineLearning: _react.default.createElement(_eui.EuiLink, {
        href: whatIsMachineLearningLink,
        target: "blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.overview.gettingStartedSectionWhatIsMachineLearning",
        defaultMessage: "here"
      }))
    }
  })), _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.overview.feedbackSectionTitle",
    defaultMessage: "Feedback"
  })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.overview.feedbackSectionText",
    defaultMessage: "If you have input or suggestions regarding your experience with Machine Learning please feel free to submit {feedbackLink}.",
    values: {
      feedbackLink: _react.default.createElement(_eui.EuiLink, {
        href: feedbackLink,
        target: "blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.overview.feedbackSectionLink",
        defaultMessage: "feedback online"
      }))
    }
  }))));
};

exports.OverviewSideBar = OverviewSideBar;