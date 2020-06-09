"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLIENT_GEO_COUNTRY_ISO_CODE = exports.POD_NAME = exports.CONTAINER_ID = exports.HOST_NAME = exports.LABEL_NAME = exports.METRIC_JAVA_GC_TIME = exports.METRIC_JAVA_GC_COUNT = exports.METRIC_JAVA_THREAD_COUNT = exports.METRIC_JAVA_NON_HEAP_MEMORY_USED = exports.METRIC_JAVA_NON_HEAP_MEMORY_COMMITTED = exports.METRIC_JAVA_NON_HEAP_MEMORY_MAX = exports.METRIC_JAVA_HEAP_MEMORY_USED = exports.METRIC_JAVA_HEAP_MEMORY_COMMITTED = exports.METRIC_JAVA_HEAP_MEMORY_MAX = exports.METRIC_PROCESS_CPU_PERCENT = exports.METRIC_SYSTEM_CPU_PERCENT = exports.METRIC_SYSTEM_TOTAL_MEMORY = exports.METRIC_SYSTEM_FREE_MEMORY = exports.ERROR_PAGE_URL = exports.ERROR_EXC_HANDLED = exports.ERROR_EXC_MESSAGE = exports.ERROR_LOG_MESSAGE = exports.ERROR_LOG_LEVEL = exports.ERROR_CULPRIT = exports.ERROR_GROUP_ID = exports.PARENT_ID = exports.SPAN_DESTINATION_SERVICE_RESOURCE = exports.SPAN_ID = exports.SPAN_NAME = exports.SPAN_ACTION = exports.SPAN_SELF_TIME_SUM = exports.SPAN_SUBTYPE = exports.SPAN_TYPE = exports.SPAN_DURATION = exports.TRACE_ID = exports.TRANSACTION_PAGE_URL = exports.TRANSACTION_BREAKDOWN_COUNT = exports.TRANSACTION_SAMPLED = exports.TRANSACTION_ID = exports.TRANSACTION_NAME = exports.TRANSACTION_RESULT = exports.TRANSACTION_TYPE = exports.TRANSACTION_DURATION = exports.PROCESSOR_EVENT = exports.OBSERVER_LISTENING = exports.OBSERVER_VERSION_MAJOR = exports.DESTINATION_ADDRESS = exports.USER_AGENT_NAME = exports.USER_AGENT_ORIGINAL = exports.USER_ID = exports.HTTP_REQUEST_METHOD = exports.URL_FULL = exports.AGENT_VERSION = exports.AGENT_NAME = exports.SERVICE_VERSION = exports.SERVICE_NODE_NAME = exports.SERVICE_RUNTIME_VERSION = exports.SERVICE_RUNTIME_NAME = exports.SERVICE_LANGUAGE_VERSION = exports.SERVICE_LANGUAGE_NAME = exports.SERVICE_FRAMEWORK_VERSION = exports.SERVICE_FRAMEWORK_NAME = exports.SERVICE_ENVIRONMENT = exports.SERVICE_NAME = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const SERVICE_NAME = 'service.name';
exports.SERVICE_NAME = SERVICE_NAME;
const SERVICE_ENVIRONMENT = 'service.environment';
exports.SERVICE_ENVIRONMENT = SERVICE_ENVIRONMENT;
const SERVICE_FRAMEWORK_NAME = 'service.framework.name';
exports.SERVICE_FRAMEWORK_NAME = SERVICE_FRAMEWORK_NAME;
const SERVICE_FRAMEWORK_VERSION = 'service.framework.version';
exports.SERVICE_FRAMEWORK_VERSION = SERVICE_FRAMEWORK_VERSION;
const SERVICE_LANGUAGE_NAME = 'service.language.name';
exports.SERVICE_LANGUAGE_NAME = SERVICE_LANGUAGE_NAME;
const SERVICE_LANGUAGE_VERSION = 'service.language.version';
exports.SERVICE_LANGUAGE_VERSION = SERVICE_LANGUAGE_VERSION;
const SERVICE_RUNTIME_NAME = 'service.runtime.name';
exports.SERVICE_RUNTIME_NAME = SERVICE_RUNTIME_NAME;
const SERVICE_RUNTIME_VERSION = 'service.runtime.version';
exports.SERVICE_RUNTIME_VERSION = SERVICE_RUNTIME_VERSION;
const SERVICE_NODE_NAME = 'service.node.name';
exports.SERVICE_NODE_NAME = SERVICE_NODE_NAME;
const SERVICE_VERSION = 'service.version';
exports.SERVICE_VERSION = SERVICE_VERSION;
const AGENT_NAME = 'agent.name';
exports.AGENT_NAME = AGENT_NAME;
const AGENT_VERSION = 'agent.version';
exports.AGENT_VERSION = AGENT_VERSION;
const URL_FULL = 'url.full';
exports.URL_FULL = URL_FULL;
const HTTP_REQUEST_METHOD = 'http.request.method';
exports.HTTP_REQUEST_METHOD = HTTP_REQUEST_METHOD;
const USER_ID = 'user.id';
exports.USER_ID = USER_ID;
const USER_AGENT_ORIGINAL = 'user_agent.original';
exports.USER_AGENT_ORIGINAL = USER_AGENT_ORIGINAL;
const USER_AGENT_NAME = 'user_agent.name';
exports.USER_AGENT_NAME = USER_AGENT_NAME;
const DESTINATION_ADDRESS = 'destination.address';
exports.DESTINATION_ADDRESS = DESTINATION_ADDRESS;
const OBSERVER_VERSION_MAJOR = 'observer.version_major';
exports.OBSERVER_VERSION_MAJOR = OBSERVER_VERSION_MAJOR;
const OBSERVER_LISTENING = 'observer.listening';
exports.OBSERVER_LISTENING = OBSERVER_LISTENING;
const PROCESSOR_EVENT = 'processor.event';
exports.PROCESSOR_EVENT = PROCESSOR_EVENT;
const TRANSACTION_DURATION = 'transaction.duration.us';
exports.TRANSACTION_DURATION = TRANSACTION_DURATION;
const TRANSACTION_TYPE = 'transaction.type';
exports.TRANSACTION_TYPE = TRANSACTION_TYPE;
const TRANSACTION_RESULT = 'transaction.result';
exports.TRANSACTION_RESULT = TRANSACTION_RESULT;
const TRANSACTION_NAME = 'transaction.name';
exports.TRANSACTION_NAME = TRANSACTION_NAME;
const TRANSACTION_ID = 'transaction.id';
exports.TRANSACTION_ID = TRANSACTION_ID;
const TRANSACTION_SAMPLED = 'transaction.sampled';
exports.TRANSACTION_SAMPLED = TRANSACTION_SAMPLED;
const TRANSACTION_BREAKDOWN_COUNT = 'transaction.breakdown.count';
exports.TRANSACTION_BREAKDOWN_COUNT = TRANSACTION_BREAKDOWN_COUNT;
const TRANSACTION_PAGE_URL = 'transaction.page.url';
exports.TRANSACTION_PAGE_URL = TRANSACTION_PAGE_URL;
const TRACE_ID = 'trace.id';
exports.TRACE_ID = TRACE_ID;
const SPAN_DURATION = 'span.duration.us';
exports.SPAN_DURATION = SPAN_DURATION;
const SPAN_TYPE = 'span.type';
exports.SPAN_TYPE = SPAN_TYPE;
const SPAN_SUBTYPE = 'span.subtype';
exports.SPAN_SUBTYPE = SPAN_SUBTYPE;
const SPAN_SELF_TIME_SUM = 'span.self_time.sum.us';
exports.SPAN_SELF_TIME_SUM = SPAN_SELF_TIME_SUM;
const SPAN_ACTION = 'span.action';
exports.SPAN_ACTION = SPAN_ACTION;
const SPAN_NAME = 'span.name';
exports.SPAN_NAME = SPAN_NAME;
const SPAN_ID = 'span.id';
exports.SPAN_ID = SPAN_ID;
const SPAN_DESTINATION_SERVICE_RESOURCE = 'span.destination.service.resource'; // Parent ID for a transaction or span

exports.SPAN_DESTINATION_SERVICE_RESOURCE = SPAN_DESTINATION_SERVICE_RESOURCE;
const PARENT_ID = 'parent.id';
exports.PARENT_ID = PARENT_ID;
const ERROR_GROUP_ID = 'error.grouping_key';
exports.ERROR_GROUP_ID = ERROR_GROUP_ID;
const ERROR_CULPRIT = 'error.culprit';
exports.ERROR_CULPRIT = ERROR_CULPRIT;
const ERROR_LOG_LEVEL = 'error.log.level';
exports.ERROR_LOG_LEVEL = ERROR_LOG_LEVEL;
const ERROR_LOG_MESSAGE = 'error.log.message';
exports.ERROR_LOG_MESSAGE = ERROR_LOG_MESSAGE;
const ERROR_EXC_MESSAGE = 'error.exception.message'; // only to be used in es queries, since error.exception is now an array

exports.ERROR_EXC_MESSAGE = ERROR_EXC_MESSAGE;
const ERROR_EXC_HANDLED = 'error.exception.handled'; // only to be used in es queries, since error.exception is now an array

exports.ERROR_EXC_HANDLED = ERROR_EXC_HANDLED;
const ERROR_PAGE_URL = 'error.page.url'; // METRICS

exports.ERROR_PAGE_URL = ERROR_PAGE_URL;
const METRIC_SYSTEM_FREE_MEMORY = 'system.memory.actual.free';
exports.METRIC_SYSTEM_FREE_MEMORY = METRIC_SYSTEM_FREE_MEMORY;
const METRIC_SYSTEM_TOTAL_MEMORY = 'system.memory.total';
exports.METRIC_SYSTEM_TOTAL_MEMORY = METRIC_SYSTEM_TOTAL_MEMORY;
const METRIC_SYSTEM_CPU_PERCENT = 'system.cpu.total.norm.pct';
exports.METRIC_SYSTEM_CPU_PERCENT = METRIC_SYSTEM_CPU_PERCENT;
const METRIC_PROCESS_CPU_PERCENT = 'system.process.cpu.total.norm.pct';
exports.METRIC_PROCESS_CPU_PERCENT = METRIC_PROCESS_CPU_PERCENT;
const METRIC_JAVA_HEAP_MEMORY_MAX = 'jvm.memory.heap.max';
exports.METRIC_JAVA_HEAP_MEMORY_MAX = METRIC_JAVA_HEAP_MEMORY_MAX;
const METRIC_JAVA_HEAP_MEMORY_COMMITTED = 'jvm.memory.heap.committed';
exports.METRIC_JAVA_HEAP_MEMORY_COMMITTED = METRIC_JAVA_HEAP_MEMORY_COMMITTED;
const METRIC_JAVA_HEAP_MEMORY_USED = 'jvm.memory.heap.used';
exports.METRIC_JAVA_HEAP_MEMORY_USED = METRIC_JAVA_HEAP_MEMORY_USED;
const METRIC_JAVA_NON_HEAP_MEMORY_MAX = 'jvm.memory.non_heap.max';
exports.METRIC_JAVA_NON_HEAP_MEMORY_MAX = METRIC_JAVA_NON_HEAP_MEMORY_MAX;
const METRIC_JAVA_NON_HEAP_MEMORY_COMMITTED = 'jvm.memory.non_heap.committed';
exports.METRIC_JAVA_NON_HEAP_MEMORY_COMMITTED = METRIC_JAVA_NON_HEAP_MEMORY_COMMITTED;
const METRIC_JAVA_NON_HEAP_MEMORY_USED = 'jvm.memory.non_heap.used';
exports.METRIC_JAVA_NON_HEAP_MEMORY_USED = METRIC_JAVA_NON_HEAP_MEMORY_USED;
const METRIC_JAVA_THREAD_COUNT = 'jvm.thread.count';
exports.METRIC_JAVA_THREAD_COUNT = METRIC_JAVA_THREAD_COUNT;
const METRIC_JAVA_GC_COUNT = 'jvm.gc.count';
exports.METRIC_JAVA_GC_COUNT = METRIC_JAVA_GC_COUNT;
const METRIC_JAVA_GC_TIME = 'jvm.gc.time';
exports.METRIC_JAVA_GC_TIME = METRIC_JAVA_GC_TIME;
const LABEL_NAME = 'labels.name';
exports.LABEL_NAME = LABEL_NAME;
const HOST_NAME = 'host.hostname';
exports.HOST_NAME = HOST_NAME;
const CONTAINER_ID = 'container.id';
exports.CONTAINER_ID = CONTAINER_ID;
const POD_NAME = 'kubernetes.pod.name';
exports.POD_NAME = POD_NAME;
const CLIENT_GEO_COUNTRY_ISO_CODE = 'client.geo.country_iso_code';
exports.CLIENT_GEO_COUNTRY_ISO_CODE = CLIENT_GEO_COUNTRY_ISO_CODE;