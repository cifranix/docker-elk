"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findSavedWorkspace = findSavedWorkspace;
exports.getSavedWorkspace = getSavedWorkspace;
exports.deleteSavedWorkspace = deleteSavedWorkspace;
exports.saveSavedWorkspace = saveSavedWorkspace;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../src/plugins/saved_objects/public");

var _saved_workspace_references = require("../services/persistence/saved_workspace_references");

var _public2 = require("../../../../../src/plugins/kibana_utils/public");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var savedWorkspaceType = 'graph-workspace';
var mapping = {
  title: 'text',
  description: 'text',
  numLinks: 'integer',
  numVertices: 'integer',
  version: 'integer',
  wsState: 'json'
};
var defaultsProps = {
  title: _i18n.i18n.translate('xpack.graph.savedWorkspace.workspaceNameTitle', {
    defaultMessage: 'New Graph Workspace'
  }),
  numLinks: 0,
  numVertices: 0,
  wsState: '{}',
  version: 1
};

var urlFor = function urlFor(basePath, id) {
  return basePath.prepend("/app/graph#/workspace/".concat(encodeURIComponent(id)));
};

function mapHits(hit, url) {
  var source = hit.attributes;
  source.id = hit.id;
  source.url = url;
  source.icon = 'fa-share-alt'; // looks like a graph

  return source;
}

function findSavedWorkspace(_ref, searchString) {
  var savedObjectsClient = _ref.savedObjectsClient,
      basePath = _ref.basePath;
  var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  return savedObjectsClient.find({
    type: savedWorkspaceType,
    search: searchString ? "".concat(searchString, "*") : undefined,
    perPage: size,
    searchFields: ['title^3', 'description']
  }).then(function (resp) {
    return {
      total: resp.total,
      hits: resp.savedObjects.map(function (hit) {
        return mapHits(hit, urlFor(basePath, hit.id));
      })
    };
  });
}

function getSavedWorkspace(_x, _x2) {
  return _getSavedWorkspace.apply(this, arguments);
}

function _getSavedWorkspace() {
  _getSavedWorkspace = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(savedObjectsClient, id) {
    var savedObject, resp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            savedObject = {
              id: id,
              displayName: 'graph workspace',
              getEsType: function getEsType() {
                return savedWorkspaceType;
              }
            };

            if (id) {
              _context.next = 4;
              break;
            }

            (0, _lodash.assign)(savedObject, defaultsProps);
            return _context.abrupt("return", Promise.resolve(savedObject));

          case 4:
            _context.next = 6;
            return savedObjectsClient.get(savedWorkspaceType, id);

          case 6:
            resp = _context.sent;
            savedObject._source = (0, _lodash.cloneDeep)(resp.attributes);

            if (resp._version) {
              _context.next = 10;
              break;
            }

            throw new _public2.SavedObjectNotFound(savedWorkspaceType, id || '');

          case 10:
            // assign the defaults to the response
            (0, _lodash.defaults)(savedObject._source, defaultsProps); // transform the source using JSON.parse

            if (savedObject._source.wsState) {
              savedObject._source.wsState = JSON.parse(savedObject._source.wsState);
            } // Give obj all of the values in _source.fields


            (0, _lodash.assign)(savedObject, savedObject._source);
            savedObject.lastSavedTitle = savedObject.title;

            if (resp.references && resp.references.length > 0) {
              (0, _saved_workspace_references.injectReferences)(savedObject, resp.references);
            }

            return _context.abrupt("return", savedObject);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getSavedWorkspace.apply(this, arguments);
}

function deleteSavedWorkspace(savedObjectsClient, ids) {
  return Promise.all(ids.map(function (id) {
    return savedObjectsClient.delete(savedWorkspaceType, id);
  }));
}

function saveSavedWorkspace(_x3) {
  return _saveSavedWorkspace.apply(this, arguments);
}

function _saveSavedWorkspace() {
  _saveSavedWorkspace = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(savedObject) {
    var _ref2,
        _ref2$confirmOverwrit,
        confirmOverwrite,
        _ref2$isTitleDuplicat,
        isTitleDuplicateConfirmed,
        onTitleDuplicate,
        services,
        originalId,
        attributes,
        extractedRefs,
        references,
        createOpt,
        resp,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref2 = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {}, _ref2$confirmOverwrit = _ref2.confirmOverwrite, confirmOverwrite = _ref2$confirmOverwrit === void 0 ? false : _ref2$confirmOverwrit, _ref2$isTitleDuplicat = _ref2.isTitleDuplicateConfirmed, isTitleDuplicateConfirmed = _ref2$isTitleDuplicat === void 0 ? false : _ref2$isTitleDuplicat, onTitleDuplicate = _ref2.onTitleDuplicate;
            services = _args2.length > 2 ? _args2[2] : undefined;
            // Save the original id in case the save fails.
            originalId = savedObject.id; // Read https://github.com/elastic/kibana/issues/9056 and
            // https://github.com/elastic/kibana/issues/9012 for some background into why this copyOnSave variable
            // exists.
            // The goal is to move towards a better rename flow, but since our users have been conditioned
            // to expect a 'save as' flow during a rename, we are keeping the logic the same until a better
            // UI/UX can be worked out.

            if (savedObject.copyOnSave) {
              delete savedObject.id;
            }

            attributes = {};
            (0, _lodash.forOwn)(mapping, function (fieldType, fieldName) {
              var savedObjectFieldVal = savedObject[fieldName];

              if (savedObjectFieldVal != null) {
                attributes[fieldName] = fieldName === 'wsState' ? JSON.stringify(savedObjectFieldVal) : savedObjectFieldVal;
              }
            });
            extractedRefs = (0, _saved_workspace_references.extractReferences)({
              attributes: attributes,
              references: []
            });
            references = extractedRefs.references;
            attributes = extractedRefs.attributes;

            if (references) {
              _context2.next = 11;
              break;
            }

            throw new Error('References not returned from extractReferences');

          case 11:
            _context2.prev = 11;
            _context2.next = 14;
            return (0, _public.checkForDuplicateTitle)(savedObject, isTitleDuplicateConfirmed, onTitleDuplicate, services);

          case 14:
            savedObject.isSaving = true;
            createOpt = {
              id: savedObject.id,
              migrationVersion: savedObject.migrationVersion,
              references: references
            };

            if (!confirmOverwrite) {
              _context2.next = 22;
              break;
            }

            _context2.next = 19;
            return (0, _public.saveWithConfirmation)(attributes, savedObject, createOpt, services);

          case 19:
            _context2.t0 = _context2.sent;
            _context2.next = 25;
            break;

          case 22:
            _context2.next = 24;
            return services.savedObjectsClient.create(savedObject.getEsType(), attributes, _objectSpread({}, createOpt, {
              overwrite: true
            }));

          case 24:
            _context2.t0 = _context2.sent;

          case 25:
            resp = _context2.t0;
            savedObject.id = resp.id;
            savedObject.isSaving = false;
            savedObject.lastSavedTitle = savedObject.title;
            return _context2.abrupt("return", savedObject.id);

          case 32:
            _context2.prev = 32;
            _context2.t1 = _context2["catch"](11);
            savedObject.isSaving = false;
            savedObject.id = originalId;

            if (!(0, _public.isErrorNonFatal)(_context2.t1)) {
              _context2.next = 38;
              break;
            }

            return _context2.abrupt("return", '');

          case 38:
            return _context2.abrupt("return", Promise.reject(_context2.t1));

          case 39:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[11, 32]]);
  }));
  return _saveSavedWorkspace.apply(this, arguments);
}