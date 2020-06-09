"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorChoices = exports.urlTemplateIconChoicesByClass = exports.urlTemplateIconChoices = exports.iconChoicesByClass = exports.getSuitableIcon = exports.iconChoices = void 0;

var _i18n = require("@kbn/i18n");

var _services = require("@elastic/eui/lib/services");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var iconChoices = [// Patterns are used to help default icon choices for common field names
{
  class: 'fa-folder-open-o',
  code: "\uF115",
  patterns: [/category/i, /folder/i, /group/i],
  label: _i18n.i18n.translate('xpack.graph.icon.folderOpen', {
    defaultMessage: 'Folder open'
  })
}, {
  class: 'fa-cube',
  code: "\uF1B2",
  patterns: [/prod/i, /sku/i],
  label: _i18n.i18n.translate('xpack.graph.icon.cube', {
    defaultMessage: 'Cube'
  })
}, {
  class: 'fa-key',
  code: "\uF084",
  patterns: [/key/i],
  label: _i18n.i18n.translate('xpack.graph.icon.key', {
    defaultMessage: 'Key'
  })
}, {
  class: 'fa-bank',
  code: "\uF19C",
  patterns: [/bank/i, /account/i],
  label: _i18n.i18n.translate('xpack.graph.icon.bank', {
    defaultMessage: 'Bank'
  })
}, {
  class: 'fa-automobile',
  code: "\uF1B9",
  patterns: [/car/i, /veh/i],
  label: _i18n.i18n.translate('xpack.graph.icon.automobile', {
    defaultMessage: 'Automobile'
  })
}, {
  class: 'fa-home',
  code: "\uF015",
  patterns: [/address/i, /home/i],
  label: _i18n.i18n.translate('xpack.graph.icon.home', {
    defaultMessage: 'Home'
  })
}, {
  class: 'fa-question',
  code: "\uF128",
  patterns: [/query/i, /search/i],
  label: _i18n.i18n.translate('xpack.graph.icon.question', {
    defaultMessage: 'Question'
  })
}, {
  class: 'fa-plane',
  code: "\uF072",
  patterns: [/flight/i, /plane/i],
  label: _i18n.i18n.translate('xpack.graph.icon.plane', {
    defaultMessage: 'Plane'
  })
}, {
  class: 'fa-file-o',
  code: "\uF016",
  patterns: [/file/i, /doc/i],
  label: _i18n.i18n.translate('xpack.graph.icon.file', {
    defaultMessage: 'File open'
  })
}, {
  class: 'fa-user',
  code: "\uF007",
  patterns: [/user/i, /person/i, /people/i, /owner/i, /cust/i, /participant/i, /party/i, /member/i],
  label: _i18n.i18n.translate('xpack.graph.icon.user', {
    defaultMessage: 'User'
  })
}, {
  class: 'fa-users',
  code: "\uF0C0",
  patterns: [/group/i, /team/i, /meeting/i],
  label: _i18n.i18n.translate('xpack.graph.icon.users', {
    defaultMessage: 'Users'
  })
}, {
  class: 'fa-music',
  code: "\uF001",
  patterns: [/artist/i, /sound/i, /music/i],
  label: _i18n.i18n.translate('xpack.graph.icon.music', {
    defaultMessage: 'Music'
  })
}, {
  class: 'fa-flag',
  code: "\uF024",
  patterns: [/country/i, /warn/i, /flag/i],
  label: _i18n.i18n.translate('xpack.graph.icon.flag', {
    defaultMessage: 'Flag'
  })
}, {
  class: 'fa-tag',
  code: "\uF02B",
  patterns: [/tag/i, /label/i],
  label: 'Tag'
}, {
  class: 'fa-phone',
  code: "\uF095",
  patterns: [/phone/i],
  label: _i18n.i18n.translate('xpack.graph.icon.phone', {
    defaultMessage: 'Phone'
  })
}, {
  class: 'fa-desktop',
  code: "\uF108",
  patterns: [/host/i, /server/i],
  label: _i18n.i18n.translate('xpack.graph.icon.desktop', {
    defaultMessage: 'Desktop'
  })
}, {
  class: 'fa-font',
  code: "\uF031",
  patterns: [/text/i, /title/i, /body/i, /desc/i],
  label: _i18n.i18n.translate('xpack.graph.icon.font', {
    defaultMessage: 'Font'
  })
}, {
  class: 'fa-at',
  code: "\uF1FA",
  patterns: [/account/i, /email/i],
  label: _i18n.i18n.translate('xpack.graph.icon.at', {
    defaultMessage: 'At'
  })
}, {
  class: 'fa-heart',
  code: "\uF004",
  patterns: [/like/i, /favourite/i, /favorite/i],
  label: _i18n.i18n.translate('xpack.graph.icon.heart', {
    defaultMessage: 'Heart'
  })
}, {
  class: 'fa-bolt',
  code: "\uF0E7",
  patterns: [/action/i],
  label: _i18n.i18n.translate('xpack.graph.icon.bolt', {
    defaultMessage: 'Bolt'
  })
}, {
  class: 'fa-map-marker',
  code: "\uF041",
  patterns: [/location/i, /geo/i, /position/i],
  label: _i18n.i18n.translate('xpack.graph.icon.mapMarker', {
    defaultMessage: 'Map marker'
  })
}, {
  class: 'fa-exclamation',
  code: "\uF12A",
  patterns: [/risk/i, /error/i, /warn/i],
  label: _i18n.i18n.translate('xpack.graph.icon.exclamation', {
    defaultMessage: 'Exclamation'
  })
}, {
  class: 'fa-industry',
  code: "\uF275",
  patterns: [/business/i, /company/i, /industry/i, /organisation/i],
  label: _i18n.i18n.translate('xpack.graph.icon.industry', {
    defaultMessage: 'Industry'
  })
}];
exports.iconChoices = iconChoices;

var getSuitableIcon = function getSuitableIcon(fieldName) {
  return iconChoices.find(function (choice) {
    return choice.patterns.some(function (pattern) {
      return pattern.test(fieldName);
    });
  }) || iconChoices[0];
};

exports.getSuitableIcon = getSuitableIcon;
var iconChoicesByClass = {};
exports.iconChoicesByClass = iconChoicesByClass;
iconChoices.forEach(function (icon) {
  iconChoicesByClass[icon.class] = icon;
});
var urlTemplateIconChoices = [// Patterns are used to help default icon choices for common field names
{
  class: 'fa-line-chart',
  code: "\uF201",
  label: _i18n.i18n.translate('xpack.graph.icon.lineChart', {
    defaultMessage: 'Line chart'
  })
}, {
  class: 'fa-pie-chart',
  code: "\uF200",
  label: _i18n.i18n.translate('xpack.graph.icon.pieChart', {
    defaultMessage: 'Pie chart'
  })
}, {
  class: 'fa-area-chart',
  code: "\uF1FE",
  label: _i18n.i18n.translate('xpack.graph.icon.areaChart', {
    defaultMessage: 'Area chart'
  })
}, {
  class: 'fa-bar-chart',
  code: "\uF080",
  label: _i18n.i18n.translate('xpack.graph.icon.barChart', {
    defaultMessage: 'Bar chart'
  })
}, {
  class: 'fa-globe',
  code: "\uF0AC",
  label: _i18n.i18n.translate('xpack.graph.icon.globe', {
    defaultMessage: 'Globe'
  })
}, {
  class: 'fa-file-text-o',
  code: "\uF0F6",
  label: _i18n.i18n.translate('xpack.graph.icon.fileText', {
    defaultMessage: 'File'
  })
}, {
  class: 'fa-google',
  code: "\uF1A0",
  label: _i18n.i18n.translate('xpack.graph.icon.google', {
    defaultMessage: 'Google'
  })
}, {
  class: 'fa-eye',
  code: "\uF06E",
  label: _i18n.i18n.translate('xpack.graph.icon.eye', {
    defaultMessage: 'Eye'
  })
}, {
  class: 'fa-tachometer',
  code: "\uF0E4",
  label: _i18n.i18n.translate('xpack.graph.icon.tachometer', {
    defaultMessage: 'Tachometer'
  })
}, {
  class: 'fa-info',
  code: "\uF129",
  label: _i18n.i18n.translate('xpack.graph.icon.info', {
    defaultMessage: 'Info'
  })
}, {
  class: 'fa-external-link',
  code: "\uF08E",
  label: _i18n.i18n.translate('xpack.graph.icon.externalLink', {
    defaultMessage: 'External link'
  })
}, {
  class: 'fa-table',
  code: "\uF0CE",
  label: _i18n.i18n.translate('xpack.graph.icon.table', {
    defaultMessage: 'Table'
  })
}, {
  class: 'fa-list',
  code: "\uF03A",
  label: _i18n.i18n.translate('xpack.graph.icon.list', {
    defaultMessage: 'List'
  })
}, {
  class: 'fa-share-alt',
  code: "\uF1E0",
  label: _i18n.i18n.translate('xpack.graph.icon.shareAlt', {
    defaultMessage: 'Share alt'
  })
}];
exports.urlTemplateIconChoices = urlTemplateIconChoices;
var urlTemplateIconChoicesByClass = {};
exports.urlTemplateIconChoicesByClass = urlTemplateIconChoicesByClass;
urlTemplateIconChoices.forEach(function (icon) {
  urlTemplateIconChoicesByClass[icon.class] = icon;
});
var colorChoices = (0, _services.euiPaletteColorBlind)();
exports.colorChoices = colorChoices;