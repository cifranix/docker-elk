"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchIndices = void 0;

var _fetch_aliases = require("./fetch_aliases");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function formatHits(hits, aliases) {
  return hits.map(hit => {
    return {
      health: hit.health,
      status: hit.status,
      name: hit.index,
      uuid: hit.uuid,
      primary: hit.pri,
      replica: hit.rep,
      documents: hit['docs.count'],
      size: hit['store.size'],
      isFrozen: hit.sth === 'true',
      // sth value coming back as a string from ES
      aliases: aliases.hasOwnProperty(hit.index) ? aliases[hit.index] : 'none'
    };
  });
}

async function fetchIndicesCall(callAsCurrentUser, indexNames) {
  const params = {
    format: 'json',
    h: 'health,status,index,uuid,pri,rep,docs.count,sth,store.size'
  };

  if (indexNames) {
    params.index = indexNames;
  }

  return await callAsCurrentUser('cat.indices', params);
}

const fetchIndices = async (callAsCurrentUser, indexDataEnricher, indexNames) => {
  const aliases = await (0, _fetch_aliases.fetchAliases)(callAsCurrentUser);
  const hits = await fetchIndicesCall(callAsCurrentUser, indexNames);
  const indices = formatHits(hits, aliases);
  return await indexDataEnricher.enrichIndices(indices, callAsCurrentUser);
};

exports.fetchIndices = fetchIndices;