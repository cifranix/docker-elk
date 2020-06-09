"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _section = require("../../../public/pages/metrics/components/section");

var _sub_section = require("../../../public/pages/metrics/components/sub_section");

var _chart_section_vis = require("../../../public/pages/metrics/components/chart_section_vis");

var _public = require("../../../../observability/public");

var _layout_content = require("../../../public/pages/metrics/components/layout_content");

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
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
const Layout = (0, _public.withTheme)(({
  metrics,
  theme
}) => _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_layout_content.LayoutContent, null, _react.default.createElement(_section.Section, {
  navLabel: "AWS RDS",
  sectionLabel: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.overviewSection.sectionLabel', {
    defaultMessage: 'Aws RDS Overview'
  }),
  metrics: metrics
}, _react.default.createElement(_sub_section.SubSection, {
  id: "awsRDSCpuTotal",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.cpuTotal.sectionLabel', {
    defaultMessage: 'Total CPU Usage'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "area",
  formatter: "percent",
  seriesOverrides: {
    cpu: {
      color: theme.eui.euiColorVis1,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.cpuTotal.chartLabel', {
        defaultMessage: 'Total'
      })
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "awsRDSConnections",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.connections.sectionLabel', {
    defaultMessage: 'Connections'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "bar",
  formatter: "number",
  seriesOverrides: {
    connections: {
      color: theme.eui.euiColorVis1,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.connections.chartLabel', {
        defaultMessage: 'Connections'
      })
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "awsRDSQueriesExecuted",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.queriesExecuted.sectionLabel', {
    defaultMessage: 'Queries Executed'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "bar",
  formatter: "number",
  seriesOverrides: {
    queries: {
      color: theme.eui.euiColorVis1,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.queriesExecuted.chartLabel', {
        defaultMessage: 'Queries'
      })
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "awsRDSActiveTransactions",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.activeTransactions.sectionLabel', {
    defaultMessage: 'Transactions'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "bar",
  formatter: "number",
  seriesOverrides: {
    active: {
      color: theme.eui.euiColorVis1,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.active.chartLabel', {
        defaultMessage: 'Active'
      })
    },
    blocked: {
      color: theme.eui.euiColorVis2,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.blocked.chartLabel', {
        defaultMessage: 'Blocked'
      })
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "awsRDSLatency",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.latency.sectionLabel', {
    defaultMessage: 'Latency'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "bar",
  stacked: true,
  formatter: "highPercision",
  formatterTemplate: '{{value}} ms',
  seriesOverrides: {
    read: {
      color: theme.eui.euiColorVis1,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.latency.read.chartLabel', {
        defaultMessage: 'Read'
      })
    },
    write: {
      color: theme.eui.euiColorVis2,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.latency.write.chartLabel', {
        defaultMessage: 'Write'
      })
    },
    insert: {
      color: theme.eui.euiColorVis0,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.latency.insert.chartLabel', {
        defaultMessage: 'Insert'
      })
    },
    update: {
      color: theme.eui.euiColorVis7,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.latency.update.chartLabel', {
        defaultMessage: 'Update'
      })
    },
    commit: {
      color: theme.eui.euiColorVis3,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.rdsMetricsLayout.latency.commit.chartLabel', {
        defaultMessage: 'Commit'
      })
    }
  }
}))))));
exports.Layout = Layout;