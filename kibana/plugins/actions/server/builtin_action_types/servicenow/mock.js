"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incident = exports.instance = exports.axiosResponse = exports.userIdResponse = exports.userId = exports.incidentAxiosResponse = exports.incidentResponse = exports.params = exports.finalMapping = exports.mapping = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const mapping = [{
  source: 'title',
  target: 'short_description',
  actionType: 'overwrite'
}, {
  source: 'description',
  target: 'description',
  actionType: 'append'
}, {
  source: 'comments',
  target: 'comments',
  actionType: 'append'
}];
exports.mapping = mapping;
const finalMapping = new Map();
exports.finalMapping = finalMapping;
finalMapping.set('title', {
  target: 'short_description',
  actionType: 'overwrite'
});
finalMapping.set('description', {
  target: 'description',
  actionType: 'append'
});
finalMapping.set('comments', {
  target: 'comments',
  actionType: 'append'
});
finalMapping.set('short_description', {
  target: 'title',
  actionType: 'overwrite'
});
const params = {
  caseId: 'd4387ac5-0899-4dc2-bbfa-0dd605c934aa',
  incidentId: 'ceb5986e079f00100e48fbbf7c1ed06d',
  createdAt: '2020-03-13T08:34:53.450Z',
  createdBy: {
    fullName: 'Elastic User',
    username: 'elastic'
  },
  updatedAt: '2020-03-13T08:34:53.450Z',
  updatedBy: {
    fullName: 'Elastic User',
    username: 'elastic'
  },
  title: 'Incident title',
  description: 'Incident description',
  comments: [{
    commentId: 'b5b4c4d0-574e-11ea-9e2e-21b90f8a9631',
    version: 'WzU3LDFd',
    comment: 'A comment',
    createdAt: '2020-03-13T08:34:53.450Z',
    createdBy: {
      fullName: 'Elastic User',
      username: 'elastic'
    },
    updatedAt: '2020-03-13T08:34:53.450Z',
    updatedBy: {
      fullName: 'Elastic User',
      username: 'elastic'
    }
  }, {
    commentId: 'e3db587f-ca27-4ae9-ad2e-31f2dcc9bd0d',
    version: 'WlK3LDFd',
    comment: 'Another comment',
    createdAt: '2020-03-13T08:34:53.450Z',
    createdBy: {
      fullName: 'Elastic User',
      username: 'elastic'
    },
    updatedAt: '2020-03-13T08:34:53.450Z',
    updatedBy: {
      fullName: 'Elastic User',
      username: 'elastic'
    }
  }]
};
exports.params = params;
const incidentResponse = {
  incidentId: 'c816f79cc0a8016401c5a33be04be441',
  number: 'INC0010001',
  pushedDate: '2020-03-13T08:34:53.450Z',
  url: 'https://instance.service-now.com/nav_to.do?uri=incident.do?sys_id=123'
};
exports.incidentResponse = incidentResponse;
const userId = '2e9a0a5e2f79001016ab51172799b670';
exports.userId = userId;
const axiosResponse = {
  status: 200,
  headers: {
    'content-type': 'application/json'
  }
};
exports.axiosResponse = axiosResponse;
const userIdResponse = {
  result: [{
    sys_id: userId
  }]
};
exports.userIdResponse = userIdResponse;
const incidentAxiosResponse = {
  result: {
    sys_id: incidentResponse.incidentId,
    number: incidentResponse.number
  }
};
exports.incidentAxiosResponse = incidentAxiosResponse;
const instance = {
  url: 'https://instance.service-now.com',
  username: 'username',
  password: 'password'
};
exports.instance = instance;
const incident = {
  short_description: params.title,
  description: params.description,
  caller_id: userId
};
exports.incident = incident;