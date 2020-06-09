"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteSourceResultResolvers = exports.UpdateSourceResultResolvers = exports.MutationResolvers = exports.InfraDataPointResolvers = exports.InfraDataSeriesResolvers = exports.InfraMetricDataResolvers = exports.InfraSnapshotNodeMetricResolvers = exports.InfraSnapshotNodePathResolvers = exports.InfraSnapshotNodeResolvers = exports.InfraSnapshotResponseResolvers = exports.InfraLogEntryFieldColumnResolvers = exports.InfraLogMessageConstantSegmentResolvers = exports.InfraLogMessageFieldSegmentResolvers = exports.InfraLogEntryMessageColumnResolvers = exports.InfraLogEntryTimestampColumnResolvers = exports.InfraLogEntryResolvers = exports.InfraTimeKeyResolvers = exports.InfraLogEntryIntervalResolvers = exports.InfraIndexFieldResolvers = exports.InfraSourceStatusResolvers = exports.InfraSourceFieldLogColumnAttributesResolvers = exports.InfraSourceFieldLogColumnResolvers = exports.InfraSourceMessageLogColumnAttributesResolvers = exports.InfraSourceMessageLogColumnResolvers = exports.InfraSourceTimestampLogColumnAttributesResolvers = exports.InfraSourceTimestampLogColumnResolvers = exports.InfraSourceFieldsResolvers = exports.InfraSourceConfigurationResolvers = exports.InfraSourceResolvers = exports.QueryResolvers = exports.InfraMetric = exports.InfraSnapshotMetricType = exports.InfraNodeType = exports.InfraIndexType = void 0;

/* tslint:disable */
// ====================================================
// START: Typescript template
// ====================================================
// ====================================================
// Types
// ====================================================

/** A source of infrastructure data */

/** A set of configuration options for an infrastructure data source */

/** A mapping of semantic fields to their document counterparts */

/** The built-in timestamp log column */

/** The built-in message log column */

/** A log column containing a field value */

/** The status of an infrastructure data source */

/** A descriptor of a field in an index */

/** A consecutive sequence of log entries */

/** A representation of the log entry's position in the event stream */

/** A log entry */

/** A special built-in column that contains the log entry's timestamp */

/** A special built-in column that contains the log entry's constructed message */

/** A segment of the log entry message that was derived from a field */

/** A segment of the log entry message that was derived from a string literal */

/** A column that contains the value of a field of the log entry */

/** The result of a successful source update */

/** The result of a source deletion operations */
// ====================================================
// InputTypes
// ====================================================

/** A highlighting definition */

/** The properties to update the source with */

/** The mapping of semantic fields of the source to be created */

/** One of the log column types to display for this source */
// ====================================================
// Arguments
// ====================================================
// ====================================================
// Enums
// ====================================================
let InfraIndexType;
exports.InfraIndexType = InfraIndexType;

(function (InfraIndexType) {
  InfraIndexType["ANY"] = "ANY";
  InfraIndexType["LOGS"] = "LOGS";
  InfraIndexType["METRICS"] = "METRICS";
})(InfraIndexType || (exports.InfraIndexType = InfraIndexType = {}));

let InfraNodeType;
exports.InfraNodeType = InfraNodeType;

(function (InfraNodeType) {
  InfraNodeType["pod"] = "pod";
  InfraNodeType["container"] = "container";
  InfraNodeType["host"] = "host";
  InfraNodeType["awsEC2"] = "awsEC2";
  InfraNodeType["awsS3"] = "awsS3";
  InfraNodeType["awsRDS"] = "awsRDS";
  InfraNodeType["awsSQS"] = "awsSQS";
})(InfraNodeType || (exports.InfraNodeType = InfraNodeType = {}));

let InfraSnapshotMetricType;
exports.InfraSnapshotMetricType = InfraSnapshotMetricType;

(function (InfraSnapshotMetricType) {
  InfraSnapshotMetricType["count"] = "count";
  InfraSnapshotMetricType["cpu"] = "cpu";
  InfraSnapshotMetricType["load"] = "load";
  InfraSnapshotMetricType["memory"] = "memory";
  InfraSnapshotMetricType["tx"] = "tx";
  InfraSnapshotMetricType["rx"] = "rx";
  InfraSnapshotMetricType["logRate"] = "logRate";
  InfraSnapshotMetricType["diskIOReadBytes"] = "diskIOReadBytes";
  InfraSnapshotMetricType["diskIOWriteBytes"] = "diskIOWriteBytes";
  InfraSnapshotMetricType["s3TotalRequests"] = "s3TotalRequests";
  InfraSnapshotMetricType["s3NumberOfObjects"] = "s3NumberOfObjects";
  InfraSnapshotMetricType["s3BucketSize"] = "s3BucketSize";
  InfraSnapshotMetricType["s3DownloadBytes"] = "s3DownloadBytes";
  InfraSnapshotMetricType["s3UploadBytes"] = "s3UploadBytes";
  InfraSnapshotMetricType["rdsConnections"] = "rdsConnections";
  InfraSnapshotMetricType["rdsQueriesExecuted"] = "rdsQueriesExecuted";
  InfraSnapshotMetricType["rdsActiveTransactions"] = "rdsActiveTransactions";
  InfraSnapshotMetricType["rdsLatency"] = "rdsLatency";
  InfraSnapshotMetricType["sqsMessagesVisible"] = "sqsMessagesVisible";
  InfraSnapshotMetricType["sqsMessagesDelayed"] = "sqsMessagesDelayed";
  InfraSnapshotMetricType["sqsMessagesSent"] = "sqsMessagesSent";
  InfraSnapshotMetricType["sqsMessagesEmpty"] = "sqsMessagesEmpty";
  InfraSnapshotMetricType["sqsOldestMessage"] = "sqsOldestMessage";
})(InfraSnapshotMetricType || (exports.InfraSnapshotMetricType = InfraSnapshotMetricType = {}));

let InfraMetric; // ====================================================
// Unions
// ====================================================

/** All known log column types */

exports.InfraMetric = InfraMetric;

(function (InfraMetric) {
  InfraMetric["hostSystemOverview"] = "hostSystemOverview";
  InfraMetric["hostCpuUsage"] = "hostCpuUsage";
  InfraMetric["hostFilesystem"] = "hostFilesystem";
  InfraMetric["hostK8sOverview"] = "hostK8sOverview";
  InfraMetric["hostK8sCpuCap"] = "hostK8sCpuCap";
  InfraMetric["hostK8sDiskCap"] = "hostK8sDiskCap";
  InfraMetric["hostK8sMemoryCap"] = "hostK8sMemoryCap";
  InfraMetric["hostK8sPodCap"] = "hostK8sPodCap";
  InfraMetric["hostLoad"] = "hostLoad";
  InfraMetric["hostMemoryUsage"] = "hostMemoryUsage";
  InfraMetric["hostNetworkTraffic"] = "hostNetworkTraffic";
  InfraMetric["hostDockerOverview"] = "hostDockerOverview";
  InfraMetric["hostDockerInfo"] = "hostDockerInfo";
  InfraMetric["hostDockerTop5ByCpu"] = "hostDockerTop5ByCpu";
  InfraMetric["hostDockerTop5ByMemory"] = "hostDockerTop5ByMemory";
  InfraMetric["podOverview"] = "podOverview";
  InfraMetric["podCpuUsage"] = "podCpuUsage";
  InfraMetric["podMemoryUsage"] = "podMemoryUsage";
  InfraMetric["podLogUsage"] = "podLogUsage";
  InfraMetric["podNetworkTraffic"] = "podNetworkTraffic";
  InfraMetric["containerOverview"] = "containerOverview";
  InfraMetric["containerCpuKernel"] = "containerCpuKernel";
  InfraMetric["containerCpuUsage"] = "containerCpuUsage";
  InfraMetric["containerDiskIOOps"] = "containerDiskIOOps";
  InfraMetric["containerDiskIOBytes"] = "containerDiskIOBytes";
  InfraMetric["containerMemory"] = "containerMemory";
  InfraMetric["containerNetworkTraffic"] = "containerNetworkTraffic";
  InfraMetric["nginxHits"] = "nginxHits";
  InfraMetric["nginxRequestRate"] = "nginxRequestRate";
  InfraMetric["nginxActiveConnections"] = "nginxActiveConnections";
  InfraMetric["nginxRequestsPerConnection"] = "nginxRequestsPerConnection";
  InfraMetric["awsOverview"] = "awsOverview";
  InfraMetric["awsCpuUtilization"] = "awsCpuUtilization";
  InfraMetric["awsNetworkBytes"] = "awsNetworkBytes";
  InfraMetric["awsNetworkPackets"] = "awsNetworkPackets";
  InfraMetric["awsDiskioBytes"] = "awsDiskioBytes";
  InfraMetric["awsDiskioOps"] = "awsDiskioOps";
  InfraMetric["awsEC2CpuUtilization"] = "awsEC2CpuUtilization";
  InfraMetric["awsEC2DiskIOBytes"] = "awsEC2DiskIOBytes";
  InfraMetric["awsEC2NetworkTraffic"] = "awsEC2NetworkTraffic";
  InfraMetric["awsS3TotalRequests"] = "awsS3TotalRequests";
  InfraMetric["awsS3NumberOfObjects"] = "awsS3NumberOfObjects";
  InfraMetric["awsS3BucketSize"] = "awsS3BucketSize";
  InfraMetric["awsS3DownloadBytes"] = "awsS3DownloadBytes";
  InfraMetric["awsS3UploadBytes"] = "awsS3UploadBytes";
  InfraMetric["awsRDSCpuTotal"] = "awsRDSCpuTotal";
  InfraMetric["awsRDSConnections"] = "awsRDSConnections";
  InfraMetric["awsRDSQueriesExecuted"] = "awsRDSQueriesExecuted";
  InfraMetric["awsRDSActiveTransactions"] = "awsRDSActiveTransactions";
  InfraMetric["awsRDSLatency"] = "awsRDSLatency";
  InfraMetric["awsSQSMessagesVisible"] = "awsSQSMessagesVisible";
  InfraMetric["awsSQSMessagesDelayed"] = "awsSQSMessagesDelayed";
  InfraMetric["awsSQSMessagesSent"] = "awsSQSMessagesSent";
  InfraMetric["awsSQSMessagesEmpty"] = "awsSQSMessagesEmpty";
  InfraMetric["awsSQSOldestMessage"] = "awsSQSOldestMessage";
  InfraMetric["custom"] = "custom";
})(InfraMetric || (exports.InfraMetric = InfraMetric = {}));

// ====================================================
// END: Typescript template
// ====================================================
// ====================================================
// Resolvers
// ====================================================
let QueryResolvers;
/** A source of infrastructure data */

exports.QueryResolvers = QueryResolvers;

(function (_QueryResolvers) {})(QueryResolvers || (exports.QueryResolvers = QueryResolvers = {}));

let InfraSourceResolvers;
/** A set of configuration options for an infrastructure data source */

exports.InfraSourceResolvers = InfraSourceResolvers;

(function (_InfraSourceResolvers) {})(InfraSourceResolvers || (exports.InfraSourceResolvers = InfraSourceResolvers = {}));

let InfraSourceConfigurationResolvers;
/** A mapping of semantic fields to their document counterparts */

exports.InfraSourceConfigurationResolvers = InfraSourceConfigurationResolvers;

(function (_InfraSourceConfigurationResolvers) {})(InfraSourceConfigurationResolvers || (exports.InfraSourceConfigurationResolvers = InfraSourceConfigurationResolvers = {}));

let InfraSourceFieldsResolvers;
/** The built-in timestamp log column */

exports.InfraSourceFieldsResolvers = InfraSourceFieldsResolvers;

(function (_InfraSourceFieldsResolvers) {})(InfraSourceFieldsResolvers || (exports.InfraSourceFieldsResolvers = InfraSourceFieldsResolvers = {}));

let InfraSourceTimestampLogColumnResolvers;
exports.InfraSourceTimestampLogColumnResolvers = InfraSourceTimestampLogColumnResolvers;

(function (_InfraSourceTimestampLogColumnResolvers) {})(InfraSourceTimestampLogColumnResolvers || (exports.InfraSourceTimestampLogColumnResolvers = InfraSourceTimestampLogColumnResolvers = {}));

let InfraSourceTimestampLogColumnAttributesResolvers;
/** The built-in message log column */

exports.InfraSourceTimestampLogColumnAttributesResolvers = InfraSourceTimestampLogColumnAttributesResolvers;

(function (_InfraSourceTimestampLogColumnAttributesResolvers) {})(InfraSourceTimestampLogColumnAttributesResolvers || (exports.InfraSourceTimestampLogColumnAttributesResolvers = InfraSourceTimestampLogColumnAttributesResolvers = {}));

let InfraSourceMessageLogColumnResolvers;
exports.InfraSourceMessageLogColumnResolvers = InfraSourceMessageLogColumnResolvers;

(function (_InfraSourceMessageLogColumnResolvers) {})(InfraSourceMessageLogColumnResolvers || (exports.InfraSourceMessageLogColumnResolvers = InfraSourceMessageLogColumnResolvers = {}));

let InfraSourceMessageLogColumnAttributesResolvers;
/** A log column containing a field value */

exports.InfraSourceMessageLogColumnAttributesResolvers = InfraSourceMessageLogColumnAttributesResolvers;

(function (_InfraSourceMessageLogColumnAttributesResolvers) {})(InfraSourceMessageLogColumnAttributesResolvers || (exports.InfraSourceMessageLogColumnAttributesResolvers = InfraSourceMessageLogColumnAttributesResolvers = {}));

let InfraSourceFieldLogColumnResolvers;
exports.InfraSourceFieldLogColumnResolvers = InfraSourceFieldLogColumnResolvers;

(function (_InfraSourceFieldLogColumnResolvers) {})(InfraSourceFieldLogColumnResolvers || (exports.InfraSourceFieldLogColumnResolvers = InfraSourceFieldLogColumnResolvers = {}));

let InfraSourceFieldLogColumnAttributesResolvers;
/** The status of an infrastructure data source */

exports.InfraSourceFieldLogColumnAttributesResolvers = InfraSourceFieldLogColumnAttributesResolvers;

(function (_InfraSourceFieldLogColumnAttributesResolvers) {})(InfraSourceFieldLogColumnAttributesResolvers || (exports.InfraSourceFieldLogColumnAttributesResolvers = InfraSourceFieldLogColumnAttributesResolvers = {}));

let InfraSourceStatusResolvers;
/** A descriptor of a field in an index */

exports.InfraSourceStatusResolvers = InfraSourceStatusResolvers;

(function (_InfraSourceStatusResolvers) {})(InfraSourceStatusResolvers || (exports.InfraSourceStatusResolvers = InfraSourceStatusResolvers = {}));

let InfraIndexFieldResolvers;
/** A consecutive sequence of log entries */

exports.InfraIndexFieldResolvers = InfraIndexFieldResolvers;

(function (_InfraIndexFieldResolvers) {})(InfraIndexFieldResolvers || (exports.InfraIndexFieldResolvers = InfraIndexFieldResolvers = {}));

let InfraLogEntryIntervalResolvers;
/** A representation of the log entry's position in the event stream */

exports.InfraLogEntryIntervalResolvers = InfraLogEntryIntervalResolvers;

(function (_InfraLogEntryIntervalResolvers) {})(InfraLogEntryIntervalResolvers || (exports.InfraLogEntryIntervalResolvers = InfraLogEntryIntervalResolvers = {}));

let InfraTimeKeyResolvers;
/** A log entry */

exports.InfraTimeKeyResolvers = InfraTimeKeyResolvers;

(function (_InfraTimeKeyResolvers) {})(InfraTimeKeyResolvers || (exports.InfraTimeKeyResolvers = InfraTimeKeyResolvers = {}));

let InfraLogEntryResolvers;
/** A special built-in column that contains the log entry's timestamp */

exports.InfraLogEntryResolvers = InfraLogEntryResolvers;

(function (_InfraLogEntryResolvers) {})(InfraLogEntryResolvers || (exports.InfraLogEntryResolvers = InfraLogEntryResolvers = {}));

let InfraLogEntryTimestampColumnResolvers;
/** A special built-in column that contains the log entry's constructed message */

exports.InfraLogEntryTimestampColumnResolvers = InfraLogEntryTimestampColumnResolvers;

(function (_InfraLogEntryTimestampColumnResolvers) {})(InfraLogEntryTimestampColumnResolvers || (exports.InfraLogEntryTimestampColumnResolvers = InfraLogEntryTimestampColumnResolvers = {}));

let InfraLogEntryMessageColumnResolvers;
/** A segment of the log entry message that was derived from a field */

exports.InfraLogEntryMessageColumnResolvers = InfraLogEntryMessageColumnResolvers;

(function (_InfraLogEntryMessageColumnResolvers) {})(InfraLogEntryMessageColumnResolvers || (exports.InfraLogEntryMessageColumnResolvers = InfraLogEntryMessageColumnResolvers = {}));

let InfraLogMessageFieldSegmentResolvers;
/** A segment of the log entry message that was derived from a string literal */

exports.InfraLogMessageFieldSegmentResolvers = InfraLogMessageFieldSegmentResolvers;

(function (_InfraLogMessageFieldSegmentResolvers) {})(InfraLogMessageFieldSegmentResolvers || (exports.InfraLogMessageFieldSegmentResolvers = InfraLogMessageFieldSegmentResolvers = {}));

let InfraLogMessageConstantSegmentResolvers;
/** A column that contains the value of a field of the log entry */

exports.InfraLogMessageConstantSegmentResolvers = InfraLogMessageConstantSegmentResolvers;

(function (_InfraLogMessageConstantSegmentResolvers) {})(InfraLogMessageConstantSegmentResolvers || (exports.InfraLogMessageConstantSegmentResolvers = InfraLogMessageConstantSegmentResolvers = {}));

let InfraLogEntryFieldColumnResolvers;
exports.InfraLogEntryFieldColumnResolvers = InfraLogEntryFieldColumnResolvers;

(function (_InfraLogEntryFieldColumnResolvers) {})(InfraLogEntryFieldColumnResolvers || (exports.InfraLogEntryFieldColumnResolvers = InfraLogEntryFieldColumnResolvers = {}));

let InfraSnapshotResponseResolvers;
exports.InfraSnapshotResponseResolvers = InfraSnapshotResponseResolvers;

(function (_InfraSnapshotResponseResolvers) {})(InfraSnapshotResponseResolvers || (exports.InfraSnapshotResponseResolvers = InfraSnapshotResponseResolvers = {}));

let InfraSnapshotNodeResolvers;
exports.InfraSnapshotNodeResolvers = InfraSnapshotNodeResolvers;

(function (_InfraSnapshotNodeResolvers) {})(InfraSnapshotNodeResolvers || (exports.InfraSnapshotNodeResolvers = InfraSnapshotNodeResolvers = {}));

let InfraSnapshotNodePathResolvers;
exports.InfraSnapshotNodePathResolvers = InfraSnapshotNodePathResolvers;

(function (_InfraSnapshotNodePathResolvers) {})(InfraSnapshotNodePathResolvers || (exports.InfraSnapshotNodePathResolvers = InfraSnapshotNodePathResolvers = {}));

let InfraSnapshotNodeMetricResolvers;
exports.InfraSnapshotNodeMetricResolvers = InfraSnapshotNodeMetricResolvers;

(function (_InfraSnapshotNodeMetricResolvers) {})(InfraSnapshotNodeMetricResolvers || (exports.InfraSnapshotNodeMetricResolvers = InfraSnapshotNodeMetricResolvers = {}));

let InfraMetricDataResolvers;
exports.InfraMetricDataResolvers = InfraMetricDataResolvers;

(function (_InfraMetricDataResolvers) {})(InfraMetricDataResolvers || (exports.InfraMetricDataResolvers = InfraMetricDataResolvers = {}));

let InfraDataSeriesResolvers;
exports.InfraDataSeriesResolvers = InfraDataSeriesResolvers;

(function (_InfraDataSeriesResolvers) {})(InfraDataSeriesResolvers || (exports.InfraDataSeriesResolvers = InfraDataSeriesResolvers = {}));

let InfraDataPointResolvers;
exports.InfraDataPointResolvers = InfraDataPointResolvers;

(function (_InfraDataPointResolvers) {})(InfraDataPointResolvers || (exports.InfraDataPointResolvers = InfraDataPointResolvers = {}));

let MutationResolvers;
/** The result of a successful source update */

exports.MutationResolvers = MutationResolvers;

(function (_MutationResolvers) {})(MutationResolvers || (exports.MutationResolvers = MutationResolvers = {}));

let UpdateSourceResultResolvers;
/** The result of a source deletion operations */

exports.UpdateSourceResultResolvers = UpdateSourceResultResolvers;

(function (_UpdateSourceResultResolvers) {})(UpdateSourceResultResolvers || (exports.UpdateSourceResultResolvers = UpdateSourceResultResolvers = {}));

let DeleteSourceResultResolvers;
exports.DeleteSourceResultResolvers = DeleteSourceResultResolvers;

(function (_DeleteSourceResultResolvers) {})(DeleteSourceResultResolvers || (exports.DeleteSourceResultResolvers = DeleteSourceResultResolvers = {}));