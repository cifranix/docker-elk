"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatavisualizerSelector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _license = require("../license");

var _kibana = require("../contexts/kibana");

var _navigation_menu = require("../components/navigation_menu");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function startTrialDescription() {
  return _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.datavisualizer.startTrial.fullMLFeaturesDescription",
    defaultMessage: "To experience the full Machine Learning features that a {subscriptionsLink} offers, start a 30-day trial.",
    values: {
      subscriptionsLink: _react.default.createElement(_eui.EuiLink, {
        href: "https://www.elastic.co/subscriptions",
        target: "_blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.datavisualizer.startTrial.subscriptionsLinkText",
        defaultMessage: "Platinum or Enterprise subscription"
      }))
    }
  }));
}

var DatavisualizerSelector = function DatavisualizerSelector() {
  (0, _kibana.useTimefilter)({
    timeRangeSelector: false,
    autoRefreshSelector: false
  });

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      licenseManagement = _useMlKibana.services.licenseManagement;

  var startTrialVisible = licenseManagement !== undefined && licenseManagement.enabled === true && (0, _license.isFullLicense)() === false;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_navigation_menu.NavigationMenu, {
    tabId: "datavisualizer"
  }), _react.default.createElement(_eui.EuiPage, {
    restrictWidth: 1000,
    "data-test-subj": "mlPageDataVisualizerSelector"
  }, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.datavisualizer.selector.dataVisualizerTitle",
    defaultMessage: "Data Visualizer"
  }))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.datavisualizer.selector.dataVisualizerDescription",
    defaultMessage: "The Machine Learning Data Visualizer tool helps you understand your data, by analyzing the metrics and fields in a log file or an existing Elasticsearch index."
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround",
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCard, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      size: "xxl",
      type: "addDataApp"
    }),
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.datavisualizer.selector.importDataTitle",
      defaultMessage: "Import data"
    }),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.datavisualizer.selector.importDataDescription",
      defaultMessage: "Import data from a log file. You can upload files up to 100 MB."
    }),
    betaBadgeLabel: _i18n.i18n.translate('xpack.ml.datavisualizer.selector.experimentalBadgeLabel', {
      defaultMessage: 'Experimental'
    }),
    betaBadgeTooltipContent: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.datavisualizer.selector.experimentalBadgeTooltipLabel",
      defaultMessage: "Experimental feature. We'd love to hear your feedback."
    }),
    footer: _react.default.createElement(_eui.EuiButton, {
      target: "_self",
      href: "#/filedatavisualizer",
      "data-test-subj": "mlDataVisualizerUploadFileButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.datavisualizer.selector.uploadFileButtonLabel",
      defaultMessage: "Upload file"
    })),
    "data-test-subj": "mlDataVisualizerCardImportData"
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCard, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      size: "xxl",
      type: "dataVisualizer"
    }),
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.datavisualizer.selector.selectIndexPatternTitle",
      defaultMessage: "Select an index pattern"
    }),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.datavisualizer.selector.selectIndexPatternDescription",
      defaultMessage: "Visualize the data in an existing Elasticsearch index."
    }),
    footer: _react.default.createElement(_eui.EuiButton, {
      target: "_self",
      href: "#/datavisualizer_index_select",
      "data-test-subj": "mlDataVisualizerSelectIndexButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.datavisualizer.selector.selectIndexButtonLabel",
      defaultMessage: "Select index"
    })),
    "data-test-subj": "mlDataVisualizerCardIndexData"
  }))), startTrialVisible === true && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "xxl"
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "xxl"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround",
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      width: '600px'
    }
  }, _react.default.createElement(_eui.EuiCard, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.datavisualizer.selector.startTrialTitle",
      defaultMessage: "Start trial"
    }),
    description: startTrialDescription(),
    footer: _react.default.createElement(_eui.EuiButton, {
      target: "_blank",
      href: "kibana#/management/elasticsearch/license_management/home"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.datavisualizer.selector.startTrialButtonLabel",
      defaultMessage: "Start trial"
    }))
  })))))));
};

exports.DatavisualizerSelector = DatavisualizerSelector;