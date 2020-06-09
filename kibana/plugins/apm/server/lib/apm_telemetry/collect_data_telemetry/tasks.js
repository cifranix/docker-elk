"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tasks = void 0;

var _lodash = require("lodash");

var _agent_name = require("../../../../common/agent_name");

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const TIME_RANGES = ['1d', 'all'];
const tasks = [{
  name: 'processor_events',
  executor: async ({
    indices,
    search
  }) => {
    const indicesByProcessorEvent = {
      error: indices['apm_oss.errorIndices'],
      metric: indices['apm_oss.metricsIndices'],
      span: indices['apm_oss.spanIndices'],
      transaction: indices['apm_oss.transactionIndices'],
      onboarding: indices['apm_oss.onboardingIndices'],
      sourcemap: indices['apm_oss.sourcemapIndices']
    };
    const jobs = (0, _lodash.flatten)(Object.keys(indicesByProcessorEvent).map(processorEvent => TIME_RANGES.map(timeRange => ({
      processorEvent,
      timeRange
    }))));
    const allData = await jobs.reduce((prevJob, current) => {
      return prevJob.then(async data => {
        var _retainmentResponse$h;

        const {
          processorEvent,
          timeRange
        } = current;
        const totalHitsResponse = await search({
          index: indicesByProcessorEvent[processorEvent],
          body: {
            size: 0,
            query: {
              bool: {
                filter: [{
                  term: {
                    [_elasticsearch_fieldnames.PROCESSOR_EVENT]: processorEvent
                  }
                }, ...(timeRange !== 'all' ? [{
                  range: {
                    '@timestamp': {
                      gte: `now-${timeRange}`
                    }
                  }
                }] : [])]
              }
            },
            track_total_hits: true
          }
        });
        const retainmentResponse = timeRange === 'all' ? await search({
          index: indicesByProcessorEvent[processorEvent],
          body: {
            query: {
              bool: {
                filter: [{
                  term: {
                    [_elasticsearch_fieldnames.PROCESSOR_EVENT]: processorEvent
                  }
                }]
              }
            },
            sort: {
              '@timestamp': 'asc'
            },
            _source: ['@timestamp']
          }
        }) : null;
        const event = retainmentResponse === null || retainmentResponse === void 0 ? void 0 : (_retainmentResponse$h = retainmentResponse.hits.hits[0]) === null || _retainmentResponse$h === void 0 ? void 0 : _retainmentResponse$h._source;
        return (0, _lodash.merge)({}, data, {
          counts: {
            [processorEvent]: {
              [timeRange]: totalHitsResponse.hits.total.value
            }
          },
          ...(event ? {
            retainment: {
              [processorEvent]: {
                ms: new Date().getTime() - new Date(event['@timestamp']).getTime()
              }
            }
          } : {})
        });
      });
    }, Promise.resolve({}));
    return allData;
  }
}, {
  name: 'agent_configuration',
  executor: async ({
    indices,
    search
  }) => {
    const agentConfigurationCount = (await search({
      index: indices.apmAgentConfigurationIndex,
      body: {
        size: 0,
        track_total_hits: true
      }
    })).hits.total.value;
    return {
      counts: {
        agent_configuration: {
          all: agentConfigurationCount
        }
      }
    };
  }
}, {
  name: 'services',
  executor: async ({
    indices,
    search
  }) => {
    const servicesPerAgent = await _agent_name.AGENT_NAMES.reduce((prevJob, agentName) => {
      return prevJob.then(async data => {
        var _response$aggregation;

        const response = await search({
          index: [indices['apm_oss.errorIndices'], indices['apm_oss.spanIndices'], indices['apm_oss.metricsIndices'], indices['apm_oss.transactionIndices']],
          body: {
            size: 0,
            query: {
              bool: {
                filter: [{
                  term: {
                    [_elasticsearch_fieldnames.AGENT_NAME]: agentName
                  }
                }, {
                  range: {
                    '@timestamp': {
                      gte: 'now-1d'
                    }
                  }
                }]
              }
            },
            aggs: {
              services: {
                cardinality: {
                  field: _elasticsearch_fieldnames.SERVICE_NAME
                }
              }
            }
          }
        });
        return { ...data,
          [agentName]: ((_response$aggregation = response.aggregations) === null || _response$aggregation === void 0 ? void 0 : _response$aggregation.services.value) || 0
        };
      });
    }, Promise.resolve({}));
    return {
      has_any_services: (0, _lodash.sum)(Object.values(servicesPerAgent)) > 0,
      services_per_agent: servicesPerAgent
    };
  }
}, {
  name: 'versions',
  executor: async ({
    search,
    indices
  }) => {
    var _response$hits$hits$, _hit$observer;

    const response = await search({
      index: [indices['apm_oss.transactionIndices'], indices['apm_oss.spanIndices'], indices['apm_oss.errorIndices']],
      terminateAfter: 1,
      body: {
        query: {
          exists: {
            field: 'observer.version'
          }
        },
        size: 1,
        sort: {
          '@timestamp': 'desc'
        }
      }
    });
    const hit = (_response$hits$hits$ = response.hits.hits[0]) === null || _response$hits$hits$ === void 0 ? void 0 : _response$hits$hits$._source;

    if (!hit || !((_hit$observer = hit.observer) === null || _hit$observer === void 0 ? void 0 : _hit$observer.version)) {
      return {};
    }

    const [major, minor, patch] = hit.observer.version.split('.').map(part => Number(part));
    return {
      version: {
        apm_server: {
          major,
          minor,
          patch
        }
      }
    };
  }
}, {
  name: 'groupings',
  executor: async ({
    search,
    indices
  }) => {
    var _aggregations, _aggregations$top_ser, _aggregations2, _aggregations2$top_se, _aggregations3;

    const range1d = {
      range: {
        '@timestamp': {
          gte: 'now-1d'
        }
      }
    };
    const errorGroupsCount = (_aggregations = (await search({
      index: indices['apm_oss.errorIndices'],
      body: {
        size: 0,
        query: {
          bool: {
            filter: [{
              term: {
                [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'error'
              }
            }, range1d]
          }
        },
        aggs: {
          top_service: {
            terms: {
              field: _elasticsearch_fieldnames.SERVICE_NAME,
              order: {
                error_groups: 'desc'
              },
              size: 1
            },
            aggs: {
              error_groups: {
                cardinality: {
                  field: _elasticsearch_fieldnames.ERROR_GROUP_ID
                }
              }
            }
          }
        }
      }
    })).aggregations) === null || _aggregations === void 0 ? void 0 : (_aggregations$top_ser = _aggregations.top_service.buckets[0]) === null || _aggregations$top_ser === void 0 ? void 0 : _aggregations$top_ser.error_groups.value;
    const transactionGroupsCount = (_aggregations2 = (await search({
      index: indices['apm_oss.transactionIndices'],
      body: {
        size: 0,
        query: {
          bool: {
            filter: [{
              term: {
                [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'transaction'
              }
            }, range1d]
          }
        },
        aggs: {
          top_service: {
            terms: {
              field: _elasticsearch_fieldnames.SERVICE_NAME,
              order: {
                transaction_groups: 'desc'
              },
              size: 1
            },
            aggs: {
              transaction_groups: {
                cardinality: {
                  field: _elasticsearch_fieldnames.TRANSACTION_NAME
                }
              }
            }
          }
        }
      }
    })).aggregations) === null || _aggregations2 === void 0 ? void 0 : (_aggregations2$top_se = _aggregations2.top_service.buckets[0]) === null || _aggregations2$top_se === void 0 ? void 0 : _aggregations2$top_se.transaction_groups.value;
    const tracesPerDayCount = (await search({
      index: indices['apm_oss.transactionIndices'],
      body: {
        query: {
          bool: {
            filter: [{
              term: {
                [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'transaction'
              }
            }, range1d],
            must_not: {
              exists: {
                field: _elasticsearch_fieldnames.PARENT_ID
              }
            }
          }
        },
        track_total_hits: true,
        size: 0
      }
    })).hits.total.value;
    const servicesCount = (_aggregations3 = (await search({
      index: [indices['apm_oss.transactionIndices'], indices['apm_oss.errorIndices'], indices['apm_oss.metricsIndices']],
      body: {
        size: 0,
        query: {
          bool: {
            filter: [range1d]
          }
        },
        aggs: {
          service_name: {
            cardinality: {
              field: _elasticsearch_fieldnames.SERVICE_NAME
            }
          }
        }
      }
    })).aggregations) === null || _aggregations3 === void 0 ? void 0 : _aggregations3.service_name.value;
    return {
      counts: {
        max_error_groups_per_service: {
          '1d': errorGroupsCount || 0
        },
        max_transaction_groups_per_service: {
          '1d': transactionGroupsCount || 0
        },
        traces: {
          '1d': tracesPerDayCount || 0
        },
        services: {
          '1d': servicesCount || 0
        }
      }
    };
  }
}, {
  name: 'integrations',
  executor: async ({
    transportRequest
  }) => {
    var _ref, _response$data;

    const apmJobs = ['*-high_mean_response_time'];
    const response = await transportRequest({
      method: 'get',
      path: `/_ml/anomaly_detectors/${apmJobs.join(',')}`
    });
    return {
      integrations: {
        ml: {
          all_jobs_count: (_ref = (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.count) !== null && _ref !== void 0 ? _ref : 0
        }
      }
    };
  }
}, {
  name: 'agents',
  executor: async ({
    search,
    indices
  }) => {
    const size = 3;
    const agentData = await _agent_name.AGENT_NAMES.reduce(async (prevJob, agentName) => {
      const data = await prevJob;
      const response = await search({
        index: [indices['apm_oss.errorIndices'], indices['apm_oss.metricsIndices'], indices['apm_oss.transactionIndices']],
        body: {
          size: 0,
          query: {
            bool: {
              filter: [{
                term: {
                  [_elasticsearch_fieldnames.AGENT_NAME]: agentName
                }
              }, {
                range: {
                  '@timestamp': {
                    gte: 'now-1d'
                  }
                }
              }]
            }
          },
          sort: {
            '@timestamp': 'desc'
          },
          aggs: {
            [_elasticsearch_fieldnames.AGENT_VERSION]: {
              terms: {
                field: _elasticsearch_fieldnames.AGENT_VERSION,
                size
              }
            },
            [_elasticsearch_fieldnames.SERVICE_FRAMEWORK_NAME]: {
              terms: {
                field: _elasticsearch_fieldnames.SERVICE_FRAMEWORK_NAME,
                size
              },
              aggs: {
                [_elasticsearch_fieldnames.SERVICE_FRAMEWORK_VERSION]: {
                  terms: {
                    field: _elasticsearch_fieldnames.SERVICE_FRAMEWORK_VERSION,
                    size
                  }
                }
              }
            },
            [_elasticsearch_fieldnames.SERVICE_FRAMEWORK_VERSION]: {
              terms: {
                field: _elasticsearch_fieldnames.SERVICE_FRAMEWORK_VERSION,
                size
              }
            },
            [_elasticsearch_fieldnames.SERVICE_LANGUAGE_NAME]: {
              terms: {
                field: _elasticsearch_fieldnames.SERVICE_LANGUAGE_NAME,
                size
              },
              aggs: {
                [_elasticsearch_fieldnames.SERVICE_LANGUAGE_VERSION]: {
                  terms: {
                    field: _elasticsearch_fieldnames.SERVICE_LANGUAGE_VERSION,
                    size
                  }
                }
              }
            },
            [_elasticsearch_fieldnames.SERVICE_LANGUAGE_VERSION]: {
              terms: {
                field: _elasticsearch_fieldnames.SERVICE_LANGUAGE_VERSION,
                size
              }
            },
            [_elasticsearch_fieldnames.SERVICE_RUNTIME_NAME]: {
              terms: {
                field: _elasticsearch_fieldnames.SERVICE_RUNTIME_NAME,
                size
              },
              aggs: {
                [_elasticsearch_fieldnames.SERVICE_RUNTIME_VERSION]: {
                  terms: {
                    field: _elasticsearch_fieldnames.SERVICE_RUNTIME_VERSION,
                    size
                  }
                }
              }
            },
            [_elasticsearch_fieldnames.SERVICE_RUNTIME_VERSION]: {
              terms: {
                field: _elasticsearch_fieldnames.SERVICE_RUNTIME_VERSION,
                size
              }
            }
          }
        }
      });
      const {
        aggregations
      } = response;

      if (!aggregations) {
        return data;
      }

      const toComposite = (outerKey, innerKey) => `${outerKey}/${innerKey}`;

      return { ...data,
        [agentName]: {
          agent: {
            version: aggregations[_elasticsearch_fieldnames.AGENT_VERSION].buckets.map(bucket => bucket.key)
          },
          service: {
            framework: {
              name: aggregations[_elasticsearch_fieldnames.SERVICE_FRAMEWORK_NAME].buckets.map(bucket => bucket.key).slice(0, size),
              version: aggregations[_elasticsearch_fieldnames.SERVICE_FRAMEWORK_VERSION].buckets.map(bucket => bucket.key).slice(0, size),
              composite: (0, _lodash.sortBy)((0, _lodash.flatten)(aggregations[_elasticsearch_fieldnames.SERVICE_FRAMEWORK_NAME].buckets.map(bucket => bucket[_elasticsearch_fieldnames.SERVICE_FRAMEWORK_VERSION].buckets.map(versionBucket => ({
                doc_count: versionBucket.doc_count,
                name: toComposite(bucket.key, versionBucket.key)
              })))), 'doc_count').reverse().slice(0, size).map(composite => composite.name)
            },
            language: {
              name: aggregations[_elasticsearch_fieldnames.SERVICE_LANGUAGE_NAME].buckets.map(bucket => bucket.key).slice(0, size),
              version: aggregations[_elasticsearch_fieldnames.SERVICE_LANGUAGE_VERSION].buckets.map(bucket => bucket.key).slice(0, size),
              composite: (0, _lodash.sortBy)((0, _lodash.flatten)(aggregations[_elasticsearch_fieldnames.SERVICE_LANGUAGE_NAME].buckets.map(bucket => bucket[_elasticsearch_fieldnames.SERVICE_LANGUAGE_VERSION].buckets.map(versionBucket => ({
                doc_count: versionBucket.doc_count,
                name: toComposite(bucket.key, versionBucket.key)
              })))), 'doc_count').reverse().slice(0, size).map(composite => composite.name)
            },
            runtime: {
              name: aggregations[_elasticsearch_fieldnames.SERVICE_RUNTIME_NAME].buckets.map(bucket => bucket.key).slice(0, size),
              version: aggregations[_elasticsearch_fieldnames.SERVICE_RUNTIME_VERSION].buckets.map(bucket => bucket.key).slice(0, size),
              composite: (0, _lodash.sortBy)((0, _lodash.flatten)(aggregations[_elasticsearch_fieldnames.SERVICE_RUNTIME_NAME].buckets.map(bucket => bucket[_elasticsearch_fieldnames.SERVICE_RUNTIME_VERSION].buckets.map(versionBucket => ({
                doc_count: versionBucket.doc_count,
                name: toComposite(bucket.key, versionBucket.key)
              })))), 'doc_count').reverse().slice(0, size).map(composite => composite.name)
            }
          }
        }
      };
    }, Promise.resolve({}));
    return {
      agents: agentData
    };
  }
}, {
  name: 'indices_stats',
  executor: async ({
    indicesStats,
    indices
  }) => {
    const response = await indicesStats({
      index: [indices.apmAgentConfigurationIndex, indices['apm_oss.errorIndices'], indices['apm_oss.metricsIndices'], indices['apm_oss.onboardingIndices'], indices['apm_oss.sourcemapIndices'], indices['apm_oss.spanIndices'], indices['apm_oss.transactionIndices']]
    });
    return {
      indices: {
        shards: {
          total: response._shards.total
        },
        all: {
          total: {
            docs: {
              count: response._all.total.docs.count
            },
            store: {
              size_in_bytes: response._all.total.store.size_in_bytes
            }
          }
        }
      }
    };
  }
}, {
  name: 'cardinality',
  executor: async ({
    search
  }) => {
    var _allAgentsCardinality, _rumAgentCardinalityR, _allAgentsCardinality2, _rumAgentCardinalityR2;

    const allAgentsCardinalityResponse = await search({
      body: {
        size: 0,
        query: {
          bool: {
            filter: [{
              range: {
                '@timestamp': {
                  gte: 'now-1d'
                }
              }
            }]
          }
        },
        aggs: {
          [_elasticsearch_fieldnames.TRANSACTION_NAME]: {
            cardinality: {
              field: _elasticsearch_fieldnames.TRANSACTION_NAME
            }
          },
          [_elasticsearch_fieldnames.USER_AGENT_ORIGINAL]: {
            cardinality: {
              field: _elasticsearch_fieldnames.USER_AGENT_ORIGINAL
            }
          }
        }
      }
    });
    const rumAgentCardinalityResponse = await search({
      body: {
        size: 0,
        query: {
          bool: {
            filter: [{
              range: {
                '@timestamp': {
                  gte: 'now-1d'
                }
              }
            }, {
              terms: {
                [_elasticsearch_fieldnames.AGENT_NAME]: ['rum-js', 'js-base']
              }
            }]
          }
        },
        aggs: {
          [_elasticsearch_fieldnames.TRANSACTION_NAME]: {
            cardinality: {
              field: _elasticsearch_fieldnames.TRANSACTION_NAME
            }
          },
          [_elasticsearch_fieldnames.USER_AGENT_ORIGINAL]: {
            cardinality: {
              field: _elasticsearch_fieldnames.USER_AGENT_ORIGINAL
            }
          }
        }
      }
    });
    return {
      cardinality: {
        transaction: {
          name: {
            all_agents: {
              '1d': (_allAgentsCardinality = allAgentsCardinalityResponse.aggregations) === null || _allAgentsCardinality === void 0 ? void 0 : _allAgentsCardinality[_elasticsearch_fieldnames.TRANSACTION_NAME].value
            },
            rum: {
              '1d': (_rumAgentCardinalityR = rumAgentCardinalityResponse.aggregations) === null || _rumAgentCardinalityR === void 0 ? void 0 : _rumAgentCardinalityR[_elasticsearch_fieldnames.TRANSACTION_NAME].value
            }
          }
        },
        user_agent: {
          original: {
            all_agents: {
              '1d': (_allAgentsCardinality2 = allAgentsCardinalityResponse.aggregations) === null || _allAgentsCardinality2 === void 0 ? void 0 : _allAgentsCardinality2[_elasticsearch_fieldnames.USER_AGENT_ORIGINAL].value
            },
            rum: {
              '1d': (_rumAgentCardinalityR2 = rumAgentCardinalityResponse.aggregations) === null || _rumAgentCardinalityR2 === void 0 ? void 0 : _rumAgentCardinalityR2[_elasticsearch_fieldnames.USER_AGENT_ORIGINAL].value
            }
          }
        }
      }
    };
  }
}];
exports.tasks = tasks;