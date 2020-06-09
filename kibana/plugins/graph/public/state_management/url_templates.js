"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncTemplatesSaga = exports.templatesSelector = exports.urlTemplatesReducer = exports.removeTemplate = exports.saveTemplate = exports.loadTemplates = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

var _dist = require("typescript-fsa-reducers/dist");

var _i18n = require("@kbn/i18n");

var _risonNode = _interopRequireDefault(require("rison-node"));

var _effects = require("redux-saga/effects");

var _url = require("url");

var _global = require("./global");

var _datasource = require("./datasource");

var _outlink_encoders = require("../helpers/outlink_encoders");

var _url_template = require("../helpers/url_template");

var _helpers = require("./helpers");

var _utils = require("../../../../../src/core/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var actionCreator = (0, _typescriptFsa.default)('x-pack/graph/urlTemplates');
var loadTemplates = actionCreator('LOAD_TEMPLATES');
exports.loadTemplates = loadTemplates;
var saveTemplate = actionCreator('SAVE_TEMPLATE');
exports.saveTemplate = saveTemplate;
var removeTemplate = actionCreator('REMOVE_TEMPLATE');
exports.removeTemplate = removeTemplate;
var initialTemplates = [];

function generateDefaultTemplate(datasource, addBasePath) {
  var appPath = (0, _utils.modifyUrl)('/discover', function (parsed) {
    parsed.query._a = _risonNode.default.encode({
      columns: ['_source'],
      index: datasource.id,
      interval: 'auto',
      query: {
        language: 'kuery',
        query: _url_template.urlTemplatePlaceholder
      },
      sort: ['_score', 'desc']
    });
  });
  var parsedAppPath = (0, _url.parse)("/app/kibana#".concat(appPath), true, true);
  var formattedAppPath = (0, _url.format)({
    protocol: parsedAppPath.protocol,
    host: parsedAppPath.host,
    pathname: parsedAppPath.pathname,
    query: parsedAppPath.query,
    hash: parsedAppPath.hash
  }); // replace the URI encoded version of the tag with the unescaped version
  // so it can be found with String.replace, regexp, etc.

  var discoverUrl = addBasePath(formattedAppPath).replace(encodeURIComponent(_url_template.urlTemplatePlaceholder), _url_template.urlTemplatePlaceholder);
  return {
    url: discoverUrl,
    description: _i18n.i18n.translate('xpack.graph.settings.drillDowns.defaultUrlTemplateTitle', {
      defaultMessage: 'Raw documents'
    }),
    encoder: _outlink_encoders.outlinkEncoders[0],
    isDefault: true,
    icon: null
  };
}

var urlTemplatesReducer = function urlTemplatesReducer(addBasePath) {
  return (0, _dist.reducerWithInitialState)(initialTemplates).case(_global.reset, function () {
    return initialTemplates;
  }).cases([_datasource.requestDatasource, _datasource.setDatasource], function (templates, datasource) {
    if (datasource.type === 'none') {
      return initialTemplates;
    }

    var customTemplates = templates.filter(function (template) {
      return !template.isDefault;
    });
    return [].concat(_toConsumableArray(customTemplates), [generateDefaultTemplate(datasource, addBasePath)]);
  }).case(loadTemplates, function (_currentTemplates, newTemplates) {
    return newTemplates;
  }).case(saveTemplate, function (templates, _ref) {
    var indexToUpdate = _ref.index,
        updatedTemplate = _ref.template;

    // set default flag to false as soon as template is overwritten.
    var newTemplate = _objectSpread({}, updatedTemplate, {
      isDefault: false
    });

    return indexToUpdate === -1 ? [].concat(_toConsumableArray(templates), [newTemplate]) : templates.map(function (template, index) {
      return index === indexToUpdate ? newTemplate : template;
    });
  }).case(removeTemplate, function (templates, templateToDelete) {
    return templates.filter(function (template) {
      return template !== templateToDelete;
    });
  }).build();
};

exports.urlTemplatesReducer = urlTemplatesReducer;

var templatesSelector = function templatesSelector(state) {
  return state.urlTemplates;
};
/**
 * Saga making sure the templates are always synced up to the scope.
 *
 * Won't be necessary once the side bar is moved to redux
 */


exports.templatesSelector = templatesSelector;

var syncTemplatesSaga = function syncTemplatesSaga(_ref2) {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(syncTemplates);

  var setUrlTemplates = _ref2.setUrlTemplates,
      notifyAngular = _ref2.notifyAngular;

  function syncTemplates() {
    var templates;
    return regeneratorRuntime.wrap(function syncTemplates$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = templatesSelector;
            _context.next = 3;
            return (0, _effects.select)();

          case 3:
            _context.t1 = _context.sent;
            templates = (0, _context.t0)(_context.t1);
            setUrlTemplates(templates);
            notifyAngular();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _marked);
  }

  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _effects.takeEvery)((0, _helpers.matchesOne)(loadTemplates, saveTemplate, removeTemplate, _datasource.requestDatasource, _datasource.setDatasource), syncTemplates);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    })
  );
};

exports.syncTemplatesSaga = syncTemplatesSaga;