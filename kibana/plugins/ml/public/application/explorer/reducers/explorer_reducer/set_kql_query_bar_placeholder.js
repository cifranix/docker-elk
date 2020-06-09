"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setKqlQueryBarPlaceholder = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Set the KQL query bar placeholder value
var setKqlQueryBarPlaceholder = function setKqlQueryBarPlaceholder(state) {
  var influencers = state.influencers,
      noInfluencersConfigured = state.noInfluencersConfigured;

  if (influencers !== undefined && !noInfluencersConfigured) {
    for (var influencerName in influencers) {
      if (influencers[influencerName][0] && influencers[influencerName][0].influencerFieldValue) {
        return {
          filterPlaceHolder: _i18n.i18n.translate('xpack.ml.explorer.kueryBar.filterPlaceholder', {
            defaultMessage: 'Filter by influencer fields… ({queryExample})',
            values: {
              queryExample: "".concat(influencerName, " : ").concat(influencers[influencerName][0].influencerFieldValue)
            }
          })
        };
      }
    }
  }

  return {};
};

exports.setKqlQueryBarPlaceholder = setKqlQueryBarPlaceholder;