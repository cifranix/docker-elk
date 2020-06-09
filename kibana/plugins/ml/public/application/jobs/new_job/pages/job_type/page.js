"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _ml = require("../../../../contexts/ml");

var _kibana = require("../../../../../../common/types/kibana");

var _data_recognizer = require("../../../../components/data_recognizer");

var _recently_accessed = require("../../../../util/recently_accessed");

var _index_utils = require("../../../../util/index_utils");

var _create_job_link_card = require("../../../../components/create_job_link_card");

var _categorization_job_icon = require("./categorization_job_icon");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Page = function Page() {
  var mlContext = (0, _ml.useMlContext)();

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      recognizerResultsCount = _useState2[0],
      setRecognizerResultsCount = _useState2[1];

  var currentSavedSearch = mlContext.currentSavedSearch,
      currentIndexPattern = mlContext.currentIndexPattern;
  var isTimeBasedIndex = (0, _index_utils.timeBasedIndexCheck)(currentIndexPattern);
  var indexWarningTitle = !isTimeBasedIndex && (0, _kibana.isSavedSearchSavedObject)(currentSavedSearch) ? _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.indexPatternFromSavedSearchNotTimeBasedMessage', {
    defaultMessage: '{savedSearchTitle} uses index pattern {indexPatternTitle} which is not time based',
    values: {
      savedSearchTitle: currentSavedSearch.attributes.title,
      indexPatternTitle: currentIndexPattern.title
    }
  }) : _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.indexPatternNotTimeBasedMessage', {
    defaultMessage: 'Index pattern {indexPatternTitle} is not time based',
    values: {
      indexPatternTitle: currentIndexPattern.title
    }
  });
  var pageTitleLabel = (0, _kibana.isSavedSearchSavedObject)(currentSavedSearch) ? _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.savedSearchPageTitleLabel', {
    defaultMessage: 'saved search {savedSearchTitle}',
    values: {
      savedSearchTitle: currentSavedSearch.attributes.title
    }
  }) : _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.indexPatternPageTitleLabel', {
    defaultMessage: 'index pattern {indexPatternTitle}',
    values: {
      indexPatternTitle: currentIndexPattern.title
    }
  });
  var recognizerResults = {
    count: 0,
    onChange: function onChange() {
      setRecognizerResultsCount(recognizerResults.count);
    }
  };

  var getUrl = function getUrl(basePath) {
    return !(0, _kibana.isSavedSearchSavedObject)(currentSavedSearch) ? "".concat(basePath, "?index=").concat(currentIndexPattern.id) : "".concat(basePath, "?savedSearchId=").concat(currentSavedSearch.id);
  };

  var addSelectionToRecentlyAccessed = function addSelectionToRecentlyAccessed() {
    var title = !(0, _kibana.isSavedSearchSavedObject)(currentSavedSearch) ? currentIndexPattern.title : currentSavedSearch.attributes.title;
    var url = getUrl('');
    (0, _recently_accessed.addItemToRecentlyAccessed)('jobs/new_job/datavisualizer', title, url);
    window.location.href = getUrl('#jobs/new_job/datavisualizer');
  };

  var jobTypes = [{
    href: getUrl('#jobs/new_job/single_metric'),
    icon: {
      type: 'createSingleMetricJob',
      ariaLabel: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.singleMetricAriaLabel', {
        defaultMessage: 'Single metric job'
      })
    },
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.singleMetricTitle', {
      defaultMessage: 'Single metric'
    }),
    description: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.singleMetricDescription', {
      defaultMessage: 'Detect anomalies in a single time series.'
    }),
    id: 'mlJobTypeLinkSingleMetricJob'
  }, {
    href: getUrl('#jobs/new_job/multi_metric'),
    icon: {
      type: 'createMultiMetricJob',
      ariaLabel: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.multiMetricAriaLabel', {
        defaultMessage: 'Multi metric job'
      })
    },
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.multiMetricTitle', {
      defaultMessage: 'Multi metric'
    }),
    description: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.multiMetricDescription', {
      defaultMessage: 'Detect anomalies in multiple metrics by splitting a time series by a categorical field.'
    }),
    id: 'mlJobTypeLinkMultiMetricJob'
  }, {
    href: getUrl('#jobs/new_job/population'),
    icon: {
      type: 'createPopulationJob',
      ariaLabel: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.populationAriaLabel', {
        defaultMessage: 'Population job'
      })
    },
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.populationTitle', {
      defaultMessage: 'Population'
    }),
    description: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.populationDescription', {
      defaultMessage: 'Detect activity that is unusual compared to the behavior of the population.'
    }),
    id: 'mlJobTypeLinkPopulationJob'
  }, {
    href: getUrl('#jobs/new_job/advanced'),
    icon: {
      type: 'createAdvancedJob',
      ariaLabel: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.advancedAriaLabel', {
        defaultMessage: 'Advanced job'
      })
    },
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.advancedTitle', {
      defaultMessage: 'Advanced'
    }),
    description: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.advancedDescription', {
      defaultMessage: 'Use the full range of options to create a job for more advanced use cases.'
    }),
    id: 'mlJobTypeLinkAdvancedJob'
  }, {
    href: getUrl('#jobs/new_job/categorization'),
    icon: {
      type: _categorization_job_icon.CategorizationIcon,
      ariaLabel: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.categorizationAriaLabel', {
        defaultMessage: 'Categorization job'
      })
    },
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.categorizationTitle', {
      defaultMessage: 'Categorization'
    }),
    description: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.categorizationDescription', {
      defaultMessage: 'Group log messages into categories and detect anomalies within them.'
    }),
    id: 'mlJobTypeLinkCategorizationJob'
  }];
  return _react.default.createElement(_eui.EuiPage, {
    "data-test-subj": "mlPageJobTypeSelection"
  }, _react.default.createElement(_eui.EuiPageBody, {
    restrictWidth: 1200
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.jobType.createJobFromTitle",
    defaultMessage: "Create a job from the {pageTitleLabel}",
    values: {
      pageTitleLabel: pageTitleLabel
    }
  }))), _react.default.createElement(_eui.EuiSpacer, null), isTimeBasedIndex === false && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
    title: indexWarningTitle,
    color: "warning",
    iconType: "alert"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.jobType.howToRunAnomalyDetectionDescription",
    defaultMessage: "Anomaly detection can only be run over indices which are time based."
  }), _react.default.createElement("br", null), _react.default.createElement(_eui.EuiLink, {
    href: "#jobs/new_job"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.jobType.selectDifferentIndexLinkText",
    defaultMessage: "Select a different index"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "xxl"
  })), _react.default.createElement("div", {
    hidden: recognizerResultsCount === 0
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.jobType.useSuppliedConfigurationTitle",
    defaultMessage: "Use a supplied configuration"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.jobType.useSuppliedConfigurationDescription",
    defaultMessage: "The fields in your data have been recognized as matching known configurations. Select to create a set of machine learning jobs and associated dashboards."
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGrid, {
    gutterSize: "l",
    columns: 4
  }, _react.default.createElement(_data_recognizer.DataRecognizer, {
    indexPattern: currentIndexPattern,
    savedSearch: currentSavedSearch,
    results: recognizerResults
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "xxl"
  })), _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.jobType.useWizardTitle",
    defaultMessage: "Use a wizard"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.jobType.useWizardDescription",
    defaultMessage: "Use one of the wizards to create a machine learning job to find anomalies in your data."
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGrid, {
    gutterSize: "l",
    columns: 4
  }, jobTypes.map(function (_ref) {
    var href = _ref.href,
        icon = _ref.icon,
        title = _ref.title,
        description = _ref.description,
        id = _ref.id;
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: id
    }, _react.default.createElement(_create_job_link_card.CreateJobLinkCard, {
      "data-test-subj": id,
      href: href,
      icon: icon.type,
      iconAreaLabel: icon.ariaLabel,
      title: title,
      description: description,
      isDisabled: !isTimeBasedIndex
    }));
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "xxl"
  }), _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.jobType.learnMoreAboutDataTitle",
    defaultMessage: "Learn more about your data"
  }))), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.jobType.learnMoreAboutDataDescription",
    defaultMessage: "If you're not sure what type of job to create, first explore the fields and metrics in your data."
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGrid, {
    gutterSize: "l",
    columns: 4
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_create_job_link_card.CreateJobLinkCard, {
    icon: "dataVisualizer",
    iconAreaLabel: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobType.dataVisualizerAriaLabel', {
      defaultMessage: 'Data Visualizer'
    }),
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.jobType.dataVisualizerTitle",
      defaultMessage: "Data Visualizer"
    }),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.jobType.dataVisualizerDescription",
      defaultMessage: "Learn more about the characteristics of your data and identify the fields for analysis with machine learning."
    }),
    onClick: addSelectionToRecentlyAccessed,
    href: getUrl('#jobs/new_job/datavisualizer')
  })))));
};

exports.Page = Page;