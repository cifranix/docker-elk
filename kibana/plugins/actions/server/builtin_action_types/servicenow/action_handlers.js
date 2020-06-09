"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleIncident = exports.handleUpdateIncident = exports.handleCreateIncident = exports.createComments = void 0;

var _lodash = require("lodash");

var _helpers = require("./helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createComments = async (serviceNow, incidentId, key, comments) => {
  const createdComments = await serviceNow.batchCreateComments(incidentId, comments, key);
  return (0, _lodash.zipWith)(comments, createdComments, (a, b) => ({
    commentId: a.commentId,
    pushedDate: b.pushedDate
  }));
};

exports.createComments = createComments;

const handleCreateIncident = async ({
  serviceNow,
  params,
  comments,
  mapping
}) => {
  const fields = (0, _helpers.prepareFieldsForTransformation)({
    params,
    mapping
  });
  const incident = (0, _helpers.transformFields)({
    params,
    fields
  });
  const createdIncident = await serviceNow.createIncident({ ...incident
  });
  const res = { ...createdIncident
  };

  if (comments && Array.isArray(comments) && comments.length > 0 && mapping.get('comments').actionType !== 'nothing') {
    comments = (0, _helpers.transformComments)(comments, params, ['informationAdded']);
    res.comments = [...(await createComments(serviceNow, res.incidentId, mapping.get('comments').target, comments))];
  }

  return { ...res
  };
};

exports.handleCreateIncident = handleCreateIncident;

const handleUpdateIncident = async ({
  incidentId,
  serviceNow,
  params,
  comments,
  mapping
}) => {
  const currentIncident = await serviceNow.getIncident(incidentId);
  const fields = (0, _helpers.prepareFieldsForTransformation)({
    params,
    mapping,
    defaultPipes: ['informationUpdated']
  });
  const incident = (0, _helpers.transformFields)({
    params,
    fields,
    currentIncident
  });
  const updatedIncident = await serviceNow.updateIncident(incidentId, { ...incident
  });
  const res = { ...updatedIncident
  };

  if (comments && Array.isArray(comments) && comments.length > 0 && mapping.get('comments').actionType !== 'nothing') {
    comments = (0, _helpers.transformComments)(comments, params, ['informationAdded']);
    res.comments = [...(await createComments(serviceNow, incidentId, mapping.get('comments').target, comments))];
  }

  return { ...res
  };
};

exports.handleUpdateIncident = handleUpdateIncident;

const handleIncident = async ({
  incidentId,
  serviceNow,
  params,
  comments,
  mapping
}) => {
  if (!incidentId) {
    return await handleCreateIncident({
      serviceNow,
      params,
      comments,
      mapping
    });
  } else {
    return await handleUpdateIncident({
      incidentId,
      serviceNow,
      params,
      comments,
      mapping
    });
  }
};

exports.handleIncident = handleIncident;