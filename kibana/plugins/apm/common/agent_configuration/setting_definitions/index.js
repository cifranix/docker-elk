"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByAgent = filterByAgent;
exports.isValid = isValid;
exports.settingDefinitions = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _lodash = require("lodash");

var _Either = require("fp-ts/lib/Either");

var _i18n = require("@kbn/i18n");

var _boolean_rt = require("../runtime_types/boolean_rt");

var _integer_rt = require("../runtime_types/integer_rt");

var _agent_name = require("../../agent_name");

var _number_float_rt = require("../runtime_types/number_float_rt");

var _bytes_rt = require("../runtime_types/bytes_rt");

var _duration_rt = require("../runtime_types/duration_rt");

var _general_settings = require("./general_settings");

var _java_settings = require("./java_settings");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getDefaultsByType(settingDefinition) {
  switch (settingDefinition.type) {
    case 'boolean':
      return {
        validation: _boolean_rt.booleanRt
      };

    case 'text':
      return {
        validation: t.string
      };

    case 'integer':
      return {
        validation: _integer_rt.integerRt,
        validationError: _i18n.i18n.translate('xpack.apm.agentConfig.integer.errorText', {
          defaultMessage: 'Must be an integer'
        })
      };

    case 'float':
      return {
        validation: _number_float_rt.numberFloatRt,
        validationError: _i18n.i18n.translate('xpack.apm.agentConfig.float.errorText', {
          defaultMessage: 'Must be a number between 0.000 and 1'
        })
      };

    case 'bytes':
      return {
        validation: _bytes_rt.bytesRt,
        units: _bytes_rt.BYTE_UNITS,
        validationError: _i18n.i18n.translate('xpack.apm.agentConfig.bytes.errorText', {
          defaultMessage: 'Please specify an integer and a unit'
        })
      };

    case 'duration':
      return {
        validation: _duration_rt.durationRt,
        units: _duration_rt.DURATION_UNITS,
        validationError: _i18n.i18n.translate('xpack.apm.agentConfig.bytes.errorText', {
          defaultMessage: 'Please specify an integer and a unit'
        })
      };
  }
}

function filterByAgent(agentName) {
  return setting => {
    // agentName is missing if "All" was selected
    if (!agentName) {
      // options that only apply to certain agents will be filtered out
      if (setting.includeAgents) {
        return false;
      } // only options that apply to every agent (ignoring RUM) should be returned


      if (setting.excludeAgents) {
        return setting.excludeAgents.every(_agent_name.isRumAgentName);
      }

      return true;
    }

    if (setting.includeAgents) {
      return setting.includeAgents.includes(agentName);
    }

    if (setting.excludeAgents) {
      return !setting.excludeAgents.includes(agentName);
    }

    return true;
  };
}

function isValid(setting, value) {
  return (0, _Either.isRight)(setting.validation.decode(value));
}

const settingDefinitions = (0, _lodash.sortBy)([..._general_settings.generalSettings, ..._java_settings.javaSettings].map(def => {
  const defWithDefaults = { ...getDefaultsByType(def),
    ...def
  }; // ensure every option has validation

  if (!defWithDefaults.validation) {
    throw new Error(`Missing validation for ${def.key}`);
  }

  return defWithDefaults;
}), 'key');
exports.settingDefinitions = settingDefinitions;