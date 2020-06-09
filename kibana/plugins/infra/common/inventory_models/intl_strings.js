"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldToName = exports.Load = exports.LogRate = exports.OutboundTraffic = exports.InboundTraffic = exports.MemoryUsage = exports.CPUUsage = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const CPUUsage = _i18n.i18n.translate('xpack.infra.waffle.metricOptions.cpuUsageText', {
  defaultMessage: 'CPU usage'
});

exports.CPUUsage = CPUUsage;

const MemoryUsage = _i18n.i18n.translate('xpack.infra.waffle.metricOptions.memoryUsageText', {
  defaultMessage: 'Memory usage'
});

exports.MemoryUsage = MemoryUsage;

const InboundTraffic = _i18n.i18n.translate('xpack.infra.waffle.metricOptions.inboundTrafficText', {
  defaultMessage: 'Inbound traffic'
});

exports.InboundTraffic = InboundTraffic;

const OutboundTraffic = _i18n.i18n.translate('xpack.infra.waffle.metricOptions.outboundTrafficText', {
  defaultMessage: 'Outbound traffic'
});

exports.OutboundTraffic = OutboundTraffic;

const LogRate = _i18n.i18n.translate('xpack.infra.waffle.metricOptions.hostLogRateText', {
  defaultMessage: 'Log rate'
});

exports.LogRate = LogRate;

const Load = _i18n.i18n.translate('xpack.infra.waffle.metricOptions.loadText', {
  defaultMessage: 'Load'
});

exports.Load = Load;

const fieldToName = field => {
  const LOOKUP = {
    'kubernetes.namespace': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.kubernetesNamespace', {
      defaultMessage: 'Namespace'
    }),
    'kubernetes.node.name': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.kubernetesNodeName', {
      defaultMessage: 'Node'
    }),
    'host.name': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.hostName', {
      defaultMessage: 'Host'
    }),
    'cloud.availability_zone': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.availabilityZone', {
      defaultMessage: 'Availability zone'
    }),
    'cloud.machine.type': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.machineType', {
      defaultMessage: 'Machine type'
    }),
    'cloud.project.id': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.projectID', {
      defaultMessage: 'Project ID'
    }),
    'cloud.provider': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.provider', {
      defaultMessage: 'Cloud provider'
    }),
    'service.type': _i18n.i18n.translate('xpack.infra.groupByDisplayNames.serviceType', {
      defaultMessage: 'Service type'
    })
  };
  return LOOKUP[field] || field;
};

exports.fieldToName = fieldToName;