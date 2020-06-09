"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConfig = createConfig;
exports.ConfigSchema = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _configSchema = require("@kbn/config-schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const providerOptionsSchema = (providerType, optionsSchema) => _configSchema.schema.conditional(_configSchema.schema.siblingRef('providers'), _configSchema.schema.arrayOf(_configSchema.schema.string(), {
  validate: providers => !providers.includes(providerType) ? 'error' : undefined
}), optionsSchema, _configSchema.schema.never());

function getCommonProviderSchemaProperties(overrides = {}) {
  return {
    enabled: _configSchema.schema.boolean({
      defaultValue: true
    }),
    showInSelector: _configSchema.schema.boolean({
      defaultValue: true
    }),
    order: _configSchema.schema.number({
      min: 0
    }),
    description: _configSchema.schema.maybe(_configSchema.schema.string()),
    ...overrides
  };
}

function getUniqueProviderSchema(providerType, overrides) {
  return _configSchema.schema.maybe(_configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.object(getCommonProviderSchemaProperties(overrides)), {
    validate(config) {
      if (Object.values(config).filter(provider => provider.enabled).length > 1) {
        return `Only one "${providerType}" provider can be configured.`;
      }
    }

  }));
}

const providersConfigSchema = _configSchema.schema.object({
  basic: getUniqueProviderSchema('basic', {
    description: _configSchema.schema.maybe(_configSchema.schema.any({
      validate: () => '`basic` provider does not support custom description.'
    })),
    showInSelector: _configSchema.schema.boolean({
      defaultValue: true,
      validate: value => {
        if (!value) {
          return '`basic` provider only supports `true` in `showInSelector`.';
        }
      }
    })
  }),
  token: getUniqueProviderSchema('token', {
    description: _configSchema.schema.maybe(_configSchema.schema.any({
      validate: () => '`token` provider does not support custom description.'
    })),
    showInSelector: _configSchema.schema.boolean({
      defaultValue: true,
      validate: value => {
        if (!value) {
          return '`token` provider only supports `true` in `showInSelector`.';
        }
      }
    })
  }),
  kerberos: getUniqueProviderSchema('kerberos'),
  pki: getUniqueProviderSchema('pki'),
  saml: _configSchema.schema.maybe(_configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.object({ ...getCommonProviderSchemaProperties(),
    realm: _configSchema.schema.string(),
    maxRedirectURLSize: _configSchema.schema.byteSize({
      defaultValue: '2kb'
    })
  }))),
  oidc: _configSchema.schema.maybe(_configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.object({ ...getCommonProviderSchemaProperties(),
    realm: _configSchema.schema.string()
  })))
}, {
  validate(config) {
    const checks = {
      sameOrder: new Map(),
      sameName: new Map()
    };

    for (const [providerType, providerGroup] of Object.entries(config)) {
      for (const [providerName, {
        enabled,
        order
      }] of Object.entries(providerGroup !== null && providerGroup !== void 0 ? providerGroup : {})) {
        if (!enabled) {
          continue;
        }

        const providerPath = `xpack.security.authc.providers.${providerType}.${providerName}`;
        const providerWithSameOrderPath = checks.sameOrder.get(order);

        if (providerWithSameOrderPath) {
          return `Found multiple providers configured with the same order "${order}": [${providerWithSameOrderPath}, ${providerPath}]`;
        }

        checks.sameOrder.set(order, providerPath);
        const providerWithSameName = checks.sameName.get(providerName);

        if (providerWithSameName) {
          return `Found multiple providers configured with the same name "${providerName}": [${providerWithSameName}, ${providerPath}]`;
        }

        checks.sameName.set(providerName, providerPath);
      }
    }
  }

});

const ConfigSchema = _configSchema.schema.object({
  enabled: _configSchema.schema.boolean({
    defaultValue: true
  }),
  loginAssistanceMessage: _configSchema.schema.string({
    defaultValue: ''
  }),
  cookieName: _configSchema.schema.string({
    defaultValue: 'sid'
  }),
  encryptionKey: _configSchema.schema.conditional(_configSchema.schema.contextRef('dist'), true, _configSchema.schema.maybe(_configSchema.schema.string({
    minLength: 32
  })), _configSchema.schema.string({
    minLength: 32,
    defaultValue: 'a'.repeat(32)
  })),
  session: _configSchema.schema.object({
    idleTimeout: _configSchema.schema.nullable(_configSchema.schema.duration()),
    lifespan: _configSchema.schema.nullable(_configSchema.schema.duration())
  }),
  secureCookies: _configSchema.schema.boolean({
    defaultValue: false
  }),
  public: _configSchema.schema.object({
    protocol: _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.literal('http'), _configSchema.schema.literal('https')])),
    hostname: _configSchema.schema.maybe(_configSchema.schema.string({
      hostname: true
    })),
    port: _configSchema.schema.maybe(_configSchema.schema.number({
      min: 0,
      max: 65535
    }))
  }),
  authc: _configSchema.schema.object({
    selector: _configSchema.schema.object({
      enabled: _configSchema.schema.maybe(_configSchema.schema.boolean())
    }),
    providers: _configSchema.schema.oneOf([_configSchema.schema.arrayOf(_configSchema.schema.string()), providersConfigSchema], {
      defaultValue: {
        basic: {
          basic: {
            enabled: true,
            showInSelector: true,
            order: 0,
            description: undefined
          }
        },
        token: undefined,
        saml: undefined,
        oidc: undefined,
        pki: undefined,
        kerberos: undefined
      }
    }),
    oidc: providerOptionsSchema('oidc', _configSchema.schema.object({
      realm: _configSchema.schema.string()
    })),
    saml: providerOptionsSchema('saml', _configSchema.schema.object({
      realm: _configSchema.schema.maybe(_configSchema.schema.string()),
      maxRedirectURLSize: _configSchema.schema.byteSize({
        defaultValue: '2kb'
      })
    })),
    http: _configSchema.schema.object({
      enabled: _configSchema.schema.boolean({
        defaultValue: true
      }),
      autoSchemesEnabled: _configSchema.schema.boolean({
        defaultValue: true
      }),
      schemes: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
        defaultValue: ['apikey']
      })
    })
  }),
  audit: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: false
    })
  })
});

exports.ConfigSchema = ConfigSchema;

function createConfig(config, logger, {
  isTLSEnabled
}) {
  let encryptionKey = config.encryptionKey;

  if (encryptionKey === undefined) {
    logger.warn('Generating a random key for xpack.security.encryptionKey. To prevent sessions from being invalidated on ' + 'restart, please set xpack.security.encryptionKey in kibana.yml');
    encryptionKey = _crypto.default.randomBytes(16).toString('hex');
  }

  let secureCookies = config.secureCookies;

  if (!isTLSEnabled) {
    if (secureCookies) {
      logger.warn('Using secure cookies, but SSL is not enabled inside Kibana. SSL must be configured outside of Kibana to ' + 'function properly.');
    } else {
      logger.warn('Session cookies will be transmitted over insecure connections. This is not recommended.');
    }
  } else if (!secureCookies) {
    secureCookies = true;
  }

  const isUsingLegacyProvidersFormat = Array.isArray(config.authc.providers);
  const providers = isUsingLegacyProvidersFormat ? [...new Set(config.authc.providers)].reduce((legacyProviders, providerType, order) => {
    legacyProviders[providerType] = {
      [providerType]: providerType === 'saml' || providerType === 'oidc' ? {
        enabled: true,
        showInSelector: true,
        order,
        ...config.authc[providerType]
      } : {
        enabled: true,
        showInSelector: true,
        order
      }
    };
    return legacyProviders;
  }, {}) : config.authc.providers; // Remove disabled providers and sort the rest.

  const sortedProviders = [];

  for (const [type, providerGroup] of Object.entries(providers)) {
    for (const [name, {
      enabled,
      showInSelector,
      order,
      description
    }] of Object.entries(providerGroup !== null && providerGroup !== void 0 ? providerGroup : {})) {
      if (!enabled) {
        delete providerGroup[name];
      } else {
        sortedProviders.push({
          type: type,
          name,
          options: {
            order,
            showInSelector,
            description
          }
        });
      }
    }
  }

  sortedProviders.sort(({
    options: {
      order: orderA
    }
  }, {
    options: {
      order: orderB
    }
  }) => orderA < orderB ? -1 : orderA > orderB ? 1 : 0); // We enable Login Selector by default if a) it's not explicitly disabled, b) new config
  // format of providers is used and c) we have more than one provider enabled.

  const isLoginSelectorEnabled = typeof config.authc.selector.enabled === 'boolean' ? config.authc.selector.enabled : !isUsingLegacyProvidersFormat && sortedProviders.filter(provider => provider.options.showInSelector).length > 1;
  return { ...config,
    authc: {
      selector: { ...config.authc.selector,
        enabled: isLoginSelectorEnabled
      },
      providers,
      sortedProviders: Object.freeze(sortedProviders),
      http: config.authc.http
    },
    encryptionKey,
    secureCookies
  };
}