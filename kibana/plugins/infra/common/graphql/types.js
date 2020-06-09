"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraLogEntryHighlightFields = exports.InfraLogEntryFields = exports.InfraSourceFields = exports.InfraTimeKeyFields = exports.SourceStatusFields = exports.SourceConfigurationFields = exports.LogEntries = exports.WaffleNodesQuery = exports.UpdateSourceMutation = exports.SourceQuery = exports.CreateSourceConfigurationMutation = exports.MetricsQuery = exports.LogEntryHighlightsQuery = exports.InfraMetric = exports.InfraSnapshotMetricType = exports.InfraNodeType = exports.InfraIndexType = void 0;

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
// Documents
// ====================================================
let LogEntryHighlightsQuery;
exports.LogEntryHighlightsQuery = LogEntryHighlightsQuery;

(function (_LogEntryHighlightsQuery) {})(LogEntryHighlightsQuery || (exports.LogEntryHighlightsQuery = LogEntryHighlightsQuery = {}));

let MetricsQuery;
exports.MetricsQuery = MetricsQuery;

(function (_MetricsQuery) {})(MetricsQuery || (exports.MetricsQuery = MetricsQuery = {}));

let CreateSourceConfigurationMutation;
exports.CreateSourceConfigurationMutation = CreateSourceConfigurationMutation;

(function (_CreateSourceConfigurationMutation) {})(CreateSourceConfigurationMutation || (exports.CreateSourceConfigurationMutation = CreateSourceConfigurationMutation = {}));

let SourceQuery;
exports.SourceQuery = SourceQuery;

(function (_SourceQuery) {})(SourceQuery || (exports.SourceQuery = SourceQuery = {}));

let UpdateSourceMutation;
exports.UpdateSourceMutation = UpdateSourceMutation;

(function (_UpdateSourceMutation) {})(UpdateSourceMutation || (exports.UpdateSourceMutation = UpdateSourceMutation = {}));

let WaffleNodesQuery;
exports.WaffleNodesQuery = WaffleNodesQuery;

(function (_WaffleNodesQuery) {})(WaffleNodesQuery || (exports.WaffleNodesQuery = WaffleNodesQuery = {}));

let LogEntries;
exports.LogEntries = LogEntries;

(function (_LogEntries) {})(LogEntries || (exports.LogEntries = LogEntries = {}));

let SourceConfigurationFields;
exports.SourceConfigurationFields = SourceConfigurationFields;

(function (_SourceConfigurationFields) {})(SourceConfigurationFields || (exports.SourceConfigurationFields = SourceConfigurationFields = {}));

let SourceStatusFields;
exports.SourceStatusFields = SourceStatusFields;

(function (_SourceStatusFields) {})(SourceStatusFields || (exports.SourceStatusFields = SourceStatusFields = {}));

let InfraTimeKeyFields;
exports.InfraTimeKeyFields = InfraTimeKeyFields;

(function (_InfraTimeKeyFields) {})(InfraTimeKeyFields || (exports.InfraTimeKeyFields = InfraTimeKeyFields = {}));

let InfraSourceFields;
exports.InfraSourceFields = InfraSourceFields;

(function (_InfraSourceFields) {})(InfraSourceFields || (exports.InfraSourceFields = InfraSourceFields = {}));

let InfraLogEntryFields;
exports.InfraLogEntryFields = InfraLogEntryFields;

(function (_InfraLogEntryFields) {})(InfraLogEntryFields || (exports.InfraLogEntryFields = InfraLogEntryFields = {}));

let InfraLogEntryHighlightFields;
exports.InfraLogEntryHighlightFields = InfraLogEntryHighlightFields;

(function (_InfraLogEntryHighlightFields) {})(InfraLogEntryHighlightFields || (exports.InfraLogEntryHighlightFields = InfraLogEntryHighlightFields = {}));