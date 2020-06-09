"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _section = require("../../../public/pages/metrics/components/section");

var _sub_section = require("../../../public/pages/metrics/components/sub_section");

var _gauges_section_vis = require("../../../public/pages/metrics/components/gauges_section_vis");

var _chart_section_vis = require("../../../public/pages/metrics/components/chart_section_vis");

var _public = require("../../../../observability/public");

var Nginx = _interopRequireWildcard(require("../shared/layouts/nginx"));

var _metadata_details = require("../../../public/pages/metrics/components/metadata_details");

var _layout_content = require("../../../public/pages/metrics/components/layout_content");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
const Layout = (0, _public.withTheme)(({
  metrics,
  theme
}) => _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_metadata_details.MetadataDetails, null), _react.default.createElement(_layout_content.LayoutContent, null, _react.default.createElement(_section.Section, {
  navLabel: _i18n.i18n.translate('xpack.infra.metricDetailPage.podMetricsLayout.layoutLabel', {
    defaultMessage: 'Pod'
  }),
  sectionLabel: _i18n.i18n.translate('xpack.infra.metricDetailPage.podMetricsLayout.overviewSection.sectionLabel', {
    defaultMessage: 'Pod Overview'
  }),
  metrics: metrics
}, _react.default.createElement(_sub_section.SubSection, {
  id: "podOverview"
}, _react.default.createElement(_gauges_section_vis.GaugesSectionVis, {
  seriesOverrides: {
    cpu: {
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.podMetricsLayout.overviewSection.cpuUsageSeriesLabel', {
        defaultMessage: 'CPU Usage'
      }),
      color: theme.eui.euiColorFullShade,
      formatter: 'percent',
      gaugeMax: 1
    },
    memory: {
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.podMetricsLayout.overviewSection.memoryUsageSeriesLabel', {
        defaultMessage: 'Memory Usage'
      }),
      color: theme.eui.euiColorFullShade,
      formatter: 'percent',
      gaugeMax: 1
    },
    rx: {
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.podMetricsLayout.overviewSection.inboundRXSeriesLabel', {
        defaultMessage: 'Inbound (RX)'
      }),
      color: theme.eui.euiColorFullShade,
      formatter: 'bits',
      formatterTemplate: '{{value}}/s'
    },
    tx: {
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.podMetricsLayout.overviewSection.outboundTXSeriesLabel', {
        defaultMessage: 'Outbound (TX)'
      }),
      color: theme.eui.euiColorFullShade,
      formatter: 'bits',
      formatterTemplate: '{{value}}/s'
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "podCpuUsage",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.podMetricsLayout.cpuUsageSection.sectionLabel', {
    defaultMessage: 'CPU Usage'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  formatter: "percent",
  type: "area",
  seriesOverrides: {
    cpu: {
      color: theme.eui.euiColorVis1
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "podMemoryUsage",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.podMetricsLayout.memoryUsageSection.sectionLabel', {
    defaultMessage: 'Memory Usage'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  type: "area",
  formatter: "percent",
  seriesOverrides: {
    memory: {
      color: theme.eui.euiColorVis1
    }
  }
})), _react.default.createElement(_sub_section.SubSection, {
  id: "podNetworkTraffic",
  label: _i18n.i18n.translate('xpack.infra.metricDetailPage.podMetricsLayout.networkTrafficSection.sectionLabel', {
    defaultMessage: 'Network Traffic'
  })
}, _react.default.createElement(_chart_section_vis.ChartSectionVis, {
  formatter: "bits",
  formatterTemplate: "{{value}}/s",
  type: "area",
  seriesOverrides: {
    rx: {
      color: theme.eui.euiColorVis1,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.podMetricsLayout.networkTrafficSection.networkRxRateSeriesLabel', {
        defaultMessage: 'in'
      })
    },
    tx: {
      color: theme.eui.euiColorVis2,
      name: _i18n.i18n.translate('xpack.infra.metricDetailPage.podMetricsLayout.networkTrafficSection.networkTxRateSeriesLabel', {
        defaultMessage: 'out'
      })
    }
  }
}))), _react.default.createElement(Nginx.Layout, {
  metrics: metrics
}))));
exports.Layout = Layout;