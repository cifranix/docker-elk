"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _section = require("../../../../public/pages/metrics/components/section");

var _sub_section = require("../../../../public/pages/metrics/components/sub_section");

var _chart_section_vis = require("../../../../public/pages/metrics/components/chart_section_vis");

var _public = require("../../../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
const Layout = (0, _public.withTheme)(({
  metrics,
  theme
}) => _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_section.Section, {
  navLabel: "Nginx",
  sectionLabel: "Nginx",
  metrics: metrics
}, _react.default.createElement(_sub_section.SubSection, {
  id: "nginxHits",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.nginxMetricsLayout.hitsSection.sectionLabel', {
    defaultMessage: 'Hits'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  stacked: true,
  type: "bar",
  formatter: "abbreviatedNumber",
  seriesOverrides: {
    '200s': {
      color: theme.eui.euiColorVis1
    },
    '300s': {
      color: theme.eui.euiColorVis5
    },
    '400s': {
      color: theme.eui.euiColorVis2
    },
    '500s': {
      color: theme.eui.euiColorVis9
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "nginxRequestRate",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.nginxMetricsLayout.requestRateSection.sectionLabel', {
    defaultMessage: 'Request Rate'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "area",
  formatter: "abbreviatedNumber",
  formatterTemplate: "{{value}}/s",
  seriesOverrides: {
    rate: {
      color: theme.eui.euiColorVis1
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "nginxActiveConnections",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.nginxMetricsLayout.activeConnectionsSection.sectionLabel', {
    defaultMessage: 'Active Connections'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "area",
  formatter: "abbreviatedNumber",
  seriesOverrides: {
    connections: {
      color: theme.eui.euiColorVis1,
      type: 'bar'
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "nginxRequestsPerConnection",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.nginxMetricsLayout.requestsPerConnectionsSection.sectionLabel', {
    defaultMessage: 'Requests per Connections'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "bar",
  formatter: "abbreviatedNumber",
  seriesOverrides: {
    reqPerConns: {
      color: theme.eui.euiColorVis1,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.nginxMetricsLayout.requestsPerConnectionsSection.reqsPerConnSeriesLabel', {
        defaultMessage: 'reqs per conn'
      })
    }
  }
})))));
exports.Layout = Layout;