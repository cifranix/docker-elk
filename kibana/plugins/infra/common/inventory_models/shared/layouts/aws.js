"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _section = require("../../../../public/pages/metrics/components/section");

var _sub_section = require("../../../../public/pages/metrics/components/sub_section");

var _gauges_section_vis = require("../../../../public/pages/metrics/components/gauges_section_vis");

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
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
const Layout = (0, _public.withTheme)(({
  metrics,
  theme
}) => _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_section.Section, {
  navLabel: "AWS",
  sectionLabel: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.overviewSection.sectionLabel', {
    defaultMessage: 'AWS Overview'
  }),
  metrics: metrics
}, _react.default.createElement(_sub_section.SubSection, {
  id: "awsOverview"
}, _react.default.createElement(_gauges_section_vis.GaugesSectionVis, {
  seriesOverrides: {
    'cpu-util': {
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.overviewSection.cpuUtilizationSeriesLabel', {
        defaultMessage: 'CPU Utilization'
      }),
      color: theme.eui.euiColorFullShade,
      formatter: 'percent',
      gaugeMax: 1
    },
    'status-check-failed': {
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.overviewSection.statusCheckFailedLabel', {
        defaultMessage: 'Status check failed'
      }),
      color: theme.eui.euiColorFullShade
    },
    'packets-in': {
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.overviewSection.networkPacketsInLabel', {
        defaultMessage: 'Packets (in)'
      }),
      color: theme.eui.euiColorFullShade,
      formatter: 'number'
    },
    'packets-out': {
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.overviewSection.networkPacketsOutLabel', {
        defaultMessage: 'Packets (out)'
      }),
      color: theme.eui.euiColorFullShade,
      formatter: 'number'
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "awsCpuUtilization",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.cpuUtilSection.sectionLabel', {
    defaultMessage: 'CPU Utilization'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "area",
  formatter: "number",
  seriesOverrides: {
    'cpu-util': {
      color: theme.eui.euiColorVis1,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.cpuUtilSection.percentSeriesLabel', {
        defaultMessage: 'percent'
      })
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "awsNetworkBytes",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.networkBytesSection.sectionLabel', {
    defaultMessage: 'Network Traffic'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "area",
  formatter: "bits",
  formatterTemplate: "{{value}}/s",
  seriesOverrides: {
    tx: {
      color: theme.eui.euiColorVis1,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.networkBytesSection.txSeriesLabel', {
        defaultMessage: 'out'
      })
    },
    rx: {
      color: theme.eui.euiColorVis2,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.networkBytesSection.rxSeriesLabel', {
        defaultMessage: 'in'
      })
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "awsNetworkPackets",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.networkPacketsSection.sectionLabel', {
    defaultMessage: 'Network Packets (Average)'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "area",
  formatter: "number",
  seriesOverrides: {
    'packets-out': {
      color: theme.eui.euiColorVis1,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.networkPacketsSection.packetsOutSeriesLabel', {
        defaultMessage: 'out'
      })
    },
    'packets-in': {
      color: theme.eui.euiColorVis2,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.networkPacketsSection.packetsInSeriesLabel', {
        defaultMessage: 'in'
      })
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "awsDiskioOps",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.diskioOperationsSection.sectionLabel', {
    defaultMessage: 'Disk I/O Operations'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "area",
  formatter: "number",
  seriesOverrides: {
    writes: {
      color: theme.eui.euiColorVis1,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.diskioOperationsSection.writesSeriesLabel', {
        defaultMessage: 'writes'
      })
    },
    reads: {
      color: theme.eui.euiColorVis2,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.diskioOperationsSection.readsSeriesLabel', {
        defaultMessage: 'reads'
      })
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "awsDiskioBytes",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.diskioBytesSection.sectionLabel', {
    defaultMessage: 'Disk I/O Bytes'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "area",
  formatter: "number",
  seriesOverrides: {
    writes: {
      color: theme.eui.euiColorVis1,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.diskioBytesSection.writesSeriesLabel', {
        defaultMessage: 'writes'
      })
    },
    reads: {
      color: theme.eui.euiColorVis2,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.awsMetricsLayout.diskioBytesSection.readsSeriesLabel', {
        defaultMessage: 'reads'
      })
    }
  }
})))));
exports.Layout = Layout;