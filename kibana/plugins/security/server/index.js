"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SecurityPluginSetup", {
  enumerable: true,
  get: function () {
    return _plugin.SecurityPluginSetup;
  }
});
Object.defineProperty(exports, "Authentication", {
  enumerable: true,
  get: function () {
    return _authentication.Authentication;
  }
});
Object.defineProperty(exports, "AuthenticationResult", {
  enumerable: true,
  get: function () {
    return _authentication.AuthenticationResult;
  }
});
Object.defineProperty(exports, "DeauthenticationResult", {
  enumerable: true,
  get: function () {
    return _authentication.DeauthenticationResult;
  }
});
Object.defineProperty(exports, "CreateAPIKeyResult", {
  enumerable: true,
  get: function () {
    return _authentication.CreateAPIKeyResult;
  }
});
Object.defineProperty(exports, "InvalidateAPIKeyParams", {
  enumerable: true,
  get: function () {
    return _authentication.InvalidateAPIKeyParams;
  }
});
Object.defineProperty(exports, "InvalidateAPIKeyResult", {
  enumerable: true,
  get: function () {
    return _authentication.InvalidateAPIKeyResult;
  }
});
Object.defineProperty(exports, "GrantAPIKeyResult", {
  enumerable: true,
  get: function () {
    return _authentication.GrantAPIKeyResult;
  }
});
Object.defineProperty(exports, "SAMLLogin", {
  enumerable: true,
  get: function () {
    return _authentication.SAMLLogin;
  }
});
Object.defineProperty(exports, "OIDCLogin", {
  enumerable: true,
  get: function () {
    return _authentication.OIDCLogin;
  }
});
Object.defineProperty(exports, "AuthenticatedUser", {
  enumerable: true,
  get: function () {
    return _model.AuthenticatedUser;
  }
});
exports.plugin = exports.config = void 0;

var _config = require("./config");

var _plugin = require("./plugin");

var _authentication = require("./authentication");

var _model = require("../common/model");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// These exports are part of public Security plugin contract, any change in signature of exported
// functions or removal of exports should be considered as a breaking change.
const config = {
  schema: _config.ConfigSchema,
  deprecations: ({
    rename,
    unused
  }) => [rename('sessionTimeout', 'session.idleTimeout'), rename('authProviders', 'authc.providers'), unused('authorization.legacyFallback.enabled'), // Deprecation warning for the old array-based format of `xpack.security.authc.providers`.
  (settings, fromPath, log) => {
    var _settings$xpack, _settings$xpack$secur, _settings$xpack$secur2;

    if (Array.isArray(settings === null || settings === void 0 ? void 0 : (_settings$xpack = settings.xpack) === null || _settings$xpack === void 0 ? void 0 : (_settings$xpack$secur = _settings$xpack.security) === null || _settings$xpack$secur === void 0 ? void 0 : (_settings$xpack$secur2 = _settings$xpack$secur.authc) === null || _settings$xpack$secur2 === void 0 ? void 0 : _settings$xpack$secur2.providers)) {
      log('Defining `xpack.security.authc.providers` as an array of provider types is deprecated. Use extended `object` format instead.');
    }

    return settings;
  }, (settings, fromPath, log) => {
    var _settings$xpack3, _settings$xpack3$secu;

    const hasProviderType = providerType => {
      var _settings$xpack2, _settings$xpack2$secu, _settings$xpack2$secu2;

      const providers = settings === null || settings === void 0 ? void 0 : (_settings$xpack2 = settings.xpack) === null || _settings$xpack2 === void 0 ? void 0 : (_settings$xpack2$secu = _settings$xpack2.security) === null || _settings$xpack2$secu === void 0 ? void 0 : (_settings$xpack2$secu2 = _settings$xpack2$secu.authc) === null || _settings$xpack2$secu2 === void 0 ? void 0 : _settings$xpack2$secu2.providers;

      if (Array.isArray(providers)) {
        return providers.includes(providerType);
      }

      return Object.values((providers === null || providers === void 0 ? void 0 : providers[providerType]) || {}).some(provider => {
        var _ref;

        return ((_ref = provider) === null || _ref === void 0 ? void 0 : _ref.enabled) !== false;
      });
    };

    if (hasProviderType('basic') && hasProviderType('token')) {
      log('Enabling both `basic` and `token` authentication providers in `xpack.security.authc.providers` is deprecated. Login page will only use `token` provider.');
    }

    if (settings === null || settings === void 0 ? void 0 : (_settings$xpack3 = settings.xpack) === null || _settings$xpack3 === void 0 ? void 0 : (_settings$xpack3$secu = _settings$xpack3.security) === null || _settings$xpack3$secu === void 0 ? void 0 : _settings$xpack3$secu.public) {
      log('Config key "xpack.security.public" is deprecated and will be removed in the next major version. ' + 'Specify SAML authentication provider and its realm in "xpack.security.authc.providers.saml.*" instead.');
    }

    return settings;
  }],
  exposeToBrowser: {
    loginAssistanceMessage: true
  }
};
exports.config = config;

const plugin = initializerContext => new _plugin.Plugin(initializerContext);

exports.plugin = plugin;