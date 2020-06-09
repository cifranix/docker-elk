"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertSavedObjectToSavedSourceConfiguration = exports.InfraSources = void 0;

var runtimeTypes = _interopRequireWildcard(require("io-ts"));

var _PathReporter = require("io-ts/lib/PathReporter");

var _function = require("fp-ts/lib/function");

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _defaults = require("./defaults");

var _errors = require("./errors");

var _saved_object_mappings = require("./saved_object_mappings");

var _source_api = require("../../../common/http_api/source_api");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class InfraSources {
  constructor(libs) {
    _defineProperty(this, "internalSourceConfigurations", new Map());

    _defineProperty(this, "libs", void 0);

    this.libs = libs;
  }

  async getSourceConfiguration(requestContext, sourceId) {
    const staticDefaultSourceConfiguration = await this.getStaticDefaultSourceConfiguration();
    const savedSourceConfiguration = await this.getInternalSourceConfiguration(sourceId).then(internalSourceConfiguration => ({
      id: sourceId,
      version: undefined,
      updatedAt: undefined,
      origin: 'internal',
      configuration: mergeSourceConfiguration(staticDefaultSourceConfiguration, internalSourceConfiguration)
    })).catch(err => err instanceof _errors.NotFoundError ? this.getSavedSourceConfiguration(requestContext, sourceId).then(result => ({ ...result,
      configuration: mergeSourceConfiguration(staticDefaultSourceConfiguration, result.configuration)
    })) : Promise.reject(err)).catch(err => requestContext.core.savedObjects.client.errors.isNotFoundError(err) ? Promise.resolve({
      id: sourceId,
      version: undefined,
      updatedAt: undefined,
      origin: 'fallback',
      configuration: staticDefaultSourceConfiguration
    }) : Promise.reject(err));
    return savedSourceConfiguration;
  }

  async getAllSourceConfigurations(requestContext) {
    const staticDefaultSourceConfiguration = await this.getStaticDefaultSourceConfiguration();
    const savedSourceConfigurations = await this.getAllSavedSourceConfigurations(requestContext);
    return savedSourceConfigurations.map(savedSourceConfiguration => ({ ...savedSourceConfiguration,
      configuration: mergeSourceConfiguration(staticDefaultSourceConfiguration, savedSourceConfiguration.configuration)
    }));
  }

  async createSourceConfiguration(requestContext, sourceId, source) {
    const staticDefaultSourceConfiguration = await this.getStaticDefaultSourceConfiguration();
    const newSourceConfiguration = mergeSourceConfiguration(staticDefaultSourceConfiguration, source);
    const createdSourceConfiguration = convertSavedObjectToSavedSourceConfiguration((await requestContext.core.savedObjects.client.create(_saved_object_mappings.infraSourceConfigurationSavedObjectType, (0, _source_api.pickSavedSourceConfiguration)(newSourceConfiguration), {
      id: sourceId
    })));
    return { ...createdSourceConfiguration,
      configuration: mergeSourceConfiguration(staticDefaultSourceConfiguration, createdSourceConfiguration.configuration)
    };
  }

  async deleteSourceConfiguration(requestContext, sourceId) {
    await requestContext.core.savedObjects.client.delete(_saved_object_mappings.infraSourceConfigurationSavedObjectType, sourceId);
  }

  async updateSourceConfiguration(requestContext, sourceId, sourceProperties) {
    const staticDefaultSourceConfiguration = await this.getStaticDefaultSourceConfiguration();
    const {
      configuration,
      version
    } = await this.getSourceConfiguration(requestContext, sourceId);
    const updatedSourceConfigurationAttributes = mergeSourceConfiguration(configuration, sourceProperties);
    const updatedSourceConfiguration = convertSavedObjectToSavedSourceConfiguration((await requestContext.core.savedObjects.client.update(_saved_object_mappings.infraSourceConfigurationSavedObjectType, sourceId, (0, _source_api.pickSavedSourceConfiguration)(updatedSourceConfigurationAttributes), {
      version
    })));
    return { ...updatedSourceConfiguration,
      configuration: mergeSourceConfiguration(staticDefaultSourceConfiguration, updatedSourceConfiguration.configuration)
    };
  }

  async defineInternalSourceConfiguration(sourceId, sourceProperties) {
    this.internalSourceConfigurations.set(sourceId, sourceProperties);
  }

  async getInternalSourceConfiguration(sourceId) {
    const internalSourceConfiguration = this.internalSourceConfigurations.get(sourceId);

    if (!internalSourceConfiguration) {
      throw new _errors.NotFoundError(`Failed to load internal source configuration: no configuration "${sourceId}" found.`);
    }

    return internalSourceConfiguration;
  }

  async getStaticDefaultSourceConfiguration() {
    const staticSourceConfiguration = (0, _pipeable.pipe)(runtimeTypes.type({
      sources: runtimeTypes.type({
        default: _source_api.StaticSourceConfigurationRuntimeType
      })
    }).decode(this.libs.config), (0, _Either.map)(({
      sources: {
        default: defaultConfiguration
      }
    }) => defaultConfiguration), (0, _Either.fold)((0, _function.constant)({}), _function.identity));
    return mergeSourceConfiguration(_defaults.defaultSourceConfiguration, staticSourceConfiguration);
  }

  async getSavedSourceConfiguration(requestContext, sourceId) {
    const savedObject = await requestContext.core.savedObjects.client.get(_saved_object_mappings.infraSourceConfigurationSavedObjectType, sourceId);
    return convertSavedObjectToSavedSourceConfiguration(savedObject);
  }

  async getAllSavedSourceConfigurations(requestContext) {
    const savedObjects = await requestContext.core.savedObjects.client.find({
      type: _saved_object_mappings.infraSourceConfigurationSavedObjectType
    });
    return savedObjects.saved_objects.map(convertSavedObjectToSavedSourceConfiguration);
  }

}

exports.InfraSources = InfraSources;

const mergeSourceConfiguration = (first, ...others) => others.reduce((previousSourceConfiguration, currentSourceConfiguration) => ({ ...previousSourceConfiguration,
  ...currentSourceConfiguration,
  fields: { ...previousSourceConfiguration.fields,
    ...currentSourceConfiguration.fields
  }
}), first);

const convertSavedObjectToSavedSourceConfiguration = savedObject => (0, _pipeable.pipe)(_source_api.SourceConfigurationSavedObjectRuntimeType.decode(savedObject), (0, _Either.map)(savedSourceConfiguration => ({
  id: savedSourceConfiguration.id,
  version: savedSourceConfiguration.version,
  updatedAt: savedSourceConfiguration.updated_at,
  origin: 'stored',
  configuration: savedSourceConfiguration.attributes
})), (0, _Either.fold)(errors => {
  throw new Error((0, _PathReporter.failure)(errors).join('\n'));
}, _function.identity));

exports.convertSavedObjectToSavedSourceConfiguration = convertSavedObjectToSavedSourceConfiguration;