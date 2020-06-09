"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildOSSFeatures = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildOSSFeatures = ({
  savedObjectTypes,
  includeTimelion
}) => {
  return [{
    id: 'discover',
    name: _i18n.i18n.translate('xpack.features.discoverFeatureName', {
      defaultMessage: 'Discover'
    }),
    order: 100,
    icon: 'discoverApp',
    navLinkId: 'kibana:discover',
    app: ['kibana'],
    catalogue: ['discover'],
    privileges: {
      all: {
        app: ['kibana'],
        catalogue: ['discover'],
        savedObject: {
          all: ['search', 'query'],
          read: ['index-pattern']
        },
        ui: ['show', 'save', 'saveQuery']
      },
      read: {
        app: ['kibana'],
        catalogue: ['discover'],
        savedObject: {
          all: [],
          read: ['index-pattern', 'search', 'query']
        },
        ui: ['show']
      }
    },
    subFeatures: [{
      name: _i18n.i18n.translate('xpack.features.ossFeatures.discoverShortUrlSubFeatureName', {
        defaultMessage: 'Short URLs'
      }),
      privilegeGroups: [{
        groupType: 'independent',
        privileges: [{
          id: 'url_create',
          name: _i18n.i18n.translate('xpack.features.ossFeatures.discoverCreateShortUrlPrivilegeName', {
            defaultMessage: 'Create Short URLs'
          }),
          includeIn: 'all',
          savedObject: {
            all: ['url'],
            read: []
          },
          ui: ['createShortUrl']
        }]
      }]
    }]
  }, {
    id: 'visualize',
    name: _i18n.i18n.translate('xpack.features.visualizeFeatureName', {
      defaultMessage: 'Visualize'
    }),
    order: 200,
    icon: 'visualizeApp',
    navLinkId: 'kibana:visualize',
    app: ['kibana', 'lens'],
    catalogue: ['visualize'],
    privileges: {
      all: {
        app: ['kibana', 'lens'],
        catalogue: ['visualize'],
        savedObject: {
          all: ['visualization', 'query', 'lens'],
          read: ['index-pattern', 'search']
        },
        ui: ['show', 'delete', 'save', 'saveQuery']
      },
      read: {
        app: ['kibana', 'lens'],
        catalogue: ['visualize'],
        savedObject: {
          all: [],
          read: ['index-pattern', 'search', 'visualization', 'query', 'lens']
        },
        ui: ['show']
      }
    },
    subFeatures: [{
      name: _i18n.i18n.translate('xpack.features.ossFeatures.visualizeShortUrlSubFeatureName', {
        defaultMessage: 'Short URLs'
      }),
      privilegeGroups: [{
        groupType: 'independent',
        privileges: [{
          id: 'url_create',
          name: _i18n.i18n.translate('xpack.features.ossFeatures.visualizeCreateShortUrlPrivilegeName', {
            defaultMessage: 'Create Short URLs'
          }),
          includeIn: 'all',
          savedObject: {
            all: ['url'],
            read: []
          },
          ui: ['createShortUrl']
        }]
      }]
    }]
  }, {
    id: 'dashboard',
    name: _i18n.i18n.translate('xpack.features.dashboardFeatureName', {
      defaultMessage: 'Dashboard'
    }),
    order: 300,
    icon: 'dashboardApp',
    navLinkId: 'kibana:dashboard',
    app: ['kibana'],
    catalogue: ['dashboard'],
    privileges: {
      all: {
        app: ['kibana'],
        catalogue: ['dashboard'],
        savedObject: {
          all: ['dashboard', 'url', 'query'],
          read: ['index-pattern', 'search', 'visualization', 'timelion-sheet', 'canvas-workpad', 'lens', 'map']
        },
        ui: ['createNew', 'show', 'showWriteControls', 'saveQuery']
      },
      read: {
        app: ['kibana'],
        catalogue: ['dashboard'],
        savedObject: {
          all: [],
          read: ['index-pattern', 'search', 'visualization', 'timelion-sheet', 'canvas-workpad', 'map', 'dashboard', 'query']
        },
        ui: ['show']
      }
    },
    subFeatures: [{
      name: _i18n.i18n.translate('xpack.features.ossFeatures.dashboardShortUrlSubFeatureName', {
        defaultMessage: 'Short URLs'
      }),
      privilegeGroups: [{
        groupType: 'independent',
        privileges: [{
          id: 'url_create',
          name: _i18n.i18n.translate('xpack.features.ossFeatures.dashboardCreateShortUrlPrivilegeName', {
            defaultMessage: 'Create Short URLs'
          }),
          includeIn: 'all',
          savedObject: {
            all: ['url'],
            read: []
          },
          ui: ['createShortUrl']
        }]
      }]
    }]
  }, {
    id: 'dev_tools',
    name: _i18n.i18n.translate('xpack.features.devToolsFeatureName', {
      defaultMessage: 'Dev Tools'
    }),
    order: 1300,
    icon: 'devToolsApp',
    navLinkId: 'kibana:dev_tools',
    app: ['kibana'],
    catalogue: ['console', 'searchprofiler', 'grokdebugger'],
    privileges: {
      all: {
        app: ['kibana'],
        catalogue: ['console', 'searchprofiler', 'grokdebugger'],
        api: ['console'],
        savedObject: {
          all: [],
          read: []
        },
        ui: ['show', 'save']
      },
      read: {
        app: ['kibana'],
        catalogue: ['console', 'searchprofiler', 'grokdebugger'],
        api: ['console'],
        savedObject: {
          all: [],
          read: []
        },
        ui: ['show']
      }
    },
    privilegesTooltip: _i18n.i18n.translate('xpack.features.devToolsPrivilegesTooltip', {
      defaultMessage: 'User should also be granted the appropriate Elasticsearch cluster and index privileges'
    })
  }, {
    id: 'advancedSettings',
    name: _i18n.i18n.translate('xpack.features.advancedSettingsFeatureName', {
      defaultMessage: 'Advanced Settings'
    }),
    order: 1500,
    icon: 'advancedSettingsApp',
    app: ['kibana'],
    catalogue: ['advanced_settings'],
    management: {
      kibana: ['settings']
    },
    privileges: {
      all: {
        app: ['kibana'],
        catalogue: ['advanced_settings'],
        management: {
          kibana: ['settings']
        },
        savedObject: {
          all: ['config'],
          read: []
        },
        ui: ['save']
      },
      read: {
        app: ['kibana'],
        catalogue: ['advanced_settings'],
        management: {
          kibana: ['settings']
        },
        savedObject: {
          all: [],
          read: []
        },
        ui: []
      }
    }
  }, {
    id: 'indexPatterns',
    name: _i18n.i18n.translate('xpack.features.indexPatternFeatureName', {
      defaultMessage: 'Index Pattern Management'
    }),
    order: 1600,
    icon: 'indexPatternApp',
    app: ['kibana'],
    catalogue: ['index_patterns'],
    management: {
      kibana: ['index_patterns']
    },
    privileges: {
      all: {
        app: ['kibana'],
        catalogue: ['index_patterns'],
        management: {
          kibana: ['index_patterns']
        },
        savedObject: {
          all: ['index-pattern'],
          read: []
        },
        ui: ['save']
      },
      read: {
        app: ['kibana'],
        catalogue: ['index_patterns'],
        management: {
          kibana: ['index_patterns']
        },
        savedObject: {
          all: [],
          read: ['index-pattern']
        },
        ui: []
      }
    }
  }, {
    id: 'savedObjectsManagement',
    name: _i18n.i18n.translate('xpack.features.savedObjectsManagementFeatureName', {
      defaultMessage: 'Saved Objects Management'
    }),
    order: 1700,
    icon: 'savedObjectsApp',
    app: ['kibana'],
    catalogue: ['saved_objects'],
    management: {
      kibana: ['objects']
    },
    privileges: {
      all: {
        app: ['kibana'],
        catalogue: ['saved_objects'],
        management: {
          kibana: ['objects']
        },
        api: ['copySavedObjectsToSpaces'],
        savedObject: {
          all: [...savedObjectTypes],
          read: []
        },
        ui: ['read', 'edit', 'delete', 'copyIntoSpace']
      },
      read: {
        app: ['kibana'],
        catalogue: ['saved_objects'],
        management: {
          kibana: ['objects']
        },
        api: ['copySavedObjectsToSpaces'],
        savedObject: {
          all: [],
          read: [...savedObjectTypes]
        },
        ui: ['read']
      }
    }
  }, ...(includeTimelion ? [timelionFeature] : [])];
};

exports.buildOSSFeatures = buildOSSFeatures;
const timelionFeature = {
  id: 'timelion',
  name: 'Timelion',
  order: 350,
  icon: 'timelionApp',
  navLinkId: 'timelion',
  app: ['timelion', 'kibana'],
  catalogue: ['timelion'],
  privileges: {
    all: {
      app: ['timelion', 'kibana'],
      catalogue: ['timelion'],
      savedObject: {
        all: ['timelion-sheet'],
        read: ['index-pattern']
      },
      ui: ['save']
    },
    read: {
      app: ['timelion', 'kibana'],
      catalogue: ['timelion'],
      savedObject: {
        all: [],
        read: ['index-pattern', 'timelion-sheet']
      },
      ui: []
    }
  }
};