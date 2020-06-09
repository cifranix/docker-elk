"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changedSourceIdResponse = exports.compositeEndResponse = exports.alternateCompositeResponse = exports.basicCompositeResponse = exports.alternateMetricResponse = exports.basicMetricResponse = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const bucketsA = [{
  doc_count: 2,
  aggregatedValue: {
    value: 0.5
  }
}, {
  doc_count: 3,
  aggregatedValue: {
    value: 1.0
  }
}];
const bucketsB = [{
  doc_count: 4,
  aggregatedValue: {
    value: 2.5
  }
}, {
  doc_count: 5,
  aggregatedValue: {
    value: 3.5
  }
}];
const bucketsC = [{
  doc_count: 2,
  aggregatedValue: {
    value: 0.5
  }
}, {
  doc_count: 3,
  aggregatedValue: {
    value: 16.0
  }
}];
const basicMetricResponse = {
  aggregations: {
    aggregatedIntervals: {
      buckets: bucketsA
    }
  }
};
exports.basicMetricResponse = basicMetricResponse;
const alternateMetricResponse = {
  aggregations: {
    aggregatedIntervals: {
      buckets: bucketsB
    }
  }
};
exports.alternateMetricResponse = alternateMetricResponse;
const basicCompositeResponse = {
  aggregations: {
    groupings: {
      after_key: 'foo',
      buckets: [{
        key: {
          groupBy: 'a'
        },
        aggregatedIntervals: {
          buckets: bucketsA
        }
      }, {
        key: {
          groupBy: 'b'
        },
        aggregatedIntervals: {
          buckets: bucketsB
        }
      }]
    }
  },
  hits: {
    total: {
      value: 2
    }
  }
};
exports.basicCompositeResponse = basicCompositeResponse;
const alternateCompositeResponse = {
  aggregations: {
    groupings: {
      after_key: 'foo',
      buckets: [{
        key: {
          groupBy: 'a'
        },
        aggregatedIntervals: {
          buckets: bucketsB
        }
      }, {
        key: {
          groupBy: 'b'
        },
        aggregatedIntervals: {
          buckets: bucketsA
        }
      }]
    }
  },
  hits: {
    total: {
      value: 2
    }
  }
};
exports.alternateCompositeResponse = alternateCompositeResponse;
const compositeEndResponse = {
  aggregations: {},
  hits: {
    total: {
      value: 0
    }
  }
};
exports.compositeEndResponse = compositeEndResponse;
const changedSourceIdResponse = {
  aggregations: {
    aggregatedIntervals: {
      buckets: bucketsC
    }
  }
};
exports.changedSourceIdResponse = changedSourceIdResponse;