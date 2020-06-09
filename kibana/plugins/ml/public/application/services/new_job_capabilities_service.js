"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadNewJobCapabilities = loadNewJobCapabilities;
exports.newJobCapsService = void 0;

var _fields = require("../../../common/types/fields");

var _public = require("../../../../../../src/plugins/data/public");

var _ml_api_service = require("./ml_api_service");

var _index_utils = require("../util/index_utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// called in the angular routing resolve block to initialize the
// newJobCapsService with the currently selected index pattern
function loadNewJobCapabilities(indexPatternId, savedSearchId, indexPatterns) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var indexPattern, _ref2, _indexPattern;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(indexPatternId !== undefined)) {
                _context.next = 9;
                break;
              }

              _context.next = 3;
              return indexPatterns.get(indexPatternId);

            case 3:
              indexPattern = _context.sent;
              _context.next = 6;
              return newJobCapsService.initializeFromIndexPattern(indexPattern);

            case 6:
              resolve(newJobCapsService.newJobCaps);
              _context.next = 24;
              break;

            case 9:
              if (!(savedSearchId !== undefined)) {
                _context.next = 23;
                break;
              }

              _context.next = 12;
              return (0, _index_utils.getIndexPatternAndSavedSearch)(savedSearchId);

            case 12:
              _ref2 = _context.sent;
              _indexPattern = _ref2.indexPattern;

              if (!(_indexPattern === null)) {
                _context.next = 18;
                break;
              }

              // eslint-disable-next-line no-console
              console.error('Cannot retrieve index pattern from saved search');
              reject();
              return _context.abrupt("return");

            case 18:
              _context.next = 20;
              return newJobCapsService.initializeFromIndexPattern(_indexPattern);

            case 20:
              resolve(newJobCapsService.newJobCaps);
              _context.next = 24;
              break;

            case 23:
              reject();

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

var categoryFieldTypes = [_public.ES_FIELD_TYPES.TEXT, _public.ES_FIELD_TYPES.KEYWORD, _public.ES_FIELD_TYPES.IP];

var NewJobCapsService =
/*#__PURE__*/
function () {
  function NewJobCapsService() {
    _classCallCheck(this, NewJobCapsService);

    _defineProperty(this, "_fields", []);

    _defineProperty(this, "_catFields", []);

    _defineProperty(this, "_dateFields", []);

    _defineProperty(this, "_aggs", []);

    _defineProperty(this, "_includeEventRateField", true);

    _defineProperty(this, "_removeTextFields", true);
  }

  _createClass(NewJobCapsService, [{
    key: "initializeFromIndexPattern",
    value: function () {
      var _initializeFromIndexPattern = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(indexPattern) {
        var includeEventRateField,
            removeTextFields,
            resp,
            _createObjects,
            allFields,
            aggs,
            _processTextAndKeywor,
            fieldsPreferringKeyword,
            fieldsPreferringText,
            catFields,
            dateFields,
            fields,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                includeEventRateField = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;
                removeTextFields = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : true;
                _context2.prev = 2;
                this._includeEventRateField = includeEventRateField;
                this._removeTextFields = removeTextFields;
                _context2.next = 7;
                return _ml_api_service.ml.jobs.newJobCaps(indexPattern.title, indexPattern.type === 'rollup');

              case 7:
                resp = _context2.sent;
                _createObjects = createObjects(resp, indexPattern.title), allFields = _createObjects.fields, aggs = _createObjects.aggs;

                if (this._includeEventRateField === true) {
                  addEventRateField(aggs, allFields);
                }

                _processTextAndKeywor = processTextAndKeywordFields(allFields), fieldsPreferringKeyword = _processTextAndKeywor.fieldsPreferringKeyword, fieldsPreferringText = _processTextAndKeywor.fieldsPreferringText;
                catFields = fieldsPreferringText.filter(function (f) {
                  return f.type === _public.ES_FIELD_TYPES.KEYWORD || f.type === _public.ES_FIELD_TYPES.TEXT;
                });
                dateFields = fieldsPreferringText.filter(function (f) {
                  return f.type === _public.ES_FIELD_TYPES.DATE;
                });
                fields = this._removeTextFields ? fieldsPreferringKeyword : allFields; // set the main fields list to contain fields which have been filtered to prefer
                // keyword fields over text fields.
                // e.g. if foo.keyword and foo exist, don't add foo to the list.

                this._fields = fields; // set the category fields to contain fields which have been filtered to prefer text fields.

                this._catFields = catFields;
                this._dateFields = dateFields;
                this._aggs = aggs;
                _context2.next = 23;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](2);
                console.error('Unable to load new job capabilities', _context2.t0); // eslint-disable-line no-console

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 20]]);
      }));

      function initializeFromIndexPattern(_x3) {
        return _initializeFromIndexPattern.apply(this, arguments);
      }

      return initializeFromIndexPattern;
    }()
  }, {
    key: "getFieldById",
    value: function getFieldById(id) {
      var field = this._fields.find(function (f) {
        return f.id === id;
      });

      return field === undefined ? null : field;
    }
  }, {
    key: "getAggById",
    value: function getAggById(id) {
      var agg = this._aggs.find(function (f) {
        return f.id === id;
      });

      return agg === undefined ? null : agg;
    }
  }, {
    key: "fields",
    get: function get() {
      return this._fields;
    }
  }, {
    key: "catFields",
    get: function get() {
      return this._catFields;
    }
  }, {
    key: "dateFields",
    get: function get() {
      return this._dateFields;
    }
  }, {
    key: "aggs",
    get: function get() {
      return this._aggs;
    }
  }, {
    key: "newJobCaps",
    get: function get() {
      return {
        fields: this._fields,
        aggs: this._aggs
      };
    }
  }, {
    key: "categoryFields",
    get: function get() {
      return this._fields.filter(function (f) {
        return categoryFieldTypes.includes(f.type);
      });
    }
  }]);

  return NewJobCapsService;
}(); // using the response from the endpoint, create the field and aggs objects
// when transported over the endpoint, the fields and aggs contain lists of ids of the
// fields and aggs they are related to.
// this function creates lists of real Fields and Aggregations and cross references them.
// the list if ids are then deleted.


function createObjects(resp, indexPatternTitle) {
  var results = resp[indexPatternTitle];
  var fields = [];
  var aggs = []; // for speed, a map of aggregations, keyed on their id
  // create a AggMap type to allow an enum (AggId) to be used as a Record key and then initialized with {}

  var aggMap = {}; // for speed, a map of aggregation id lists from a field, keyed on the field id

  var aggIdMap = {};

  if (results !== undefined) {
    results.aggs.forEach(function (a) {
      // create the aggs list
      // only adding a fields list if there is a fieldIds list
      var agg = _objectSpread({}, a, {}, a.fieldIds !== undefined ? {
        fields: []
      } : {});

      aggMap[agg.id] = agg;
      aggs.push(agg);
    });
    results.fields.forEach(function (f) {
      // create the fields list
      var field = _objectSpread({}, f, {
        aggs: []
      });

      if (field.aggIds !== undefined) {
        aggIdMap[field.id] = field.aggIds;
      }

      fields.push(field);
    }); // loop through the fields and populate their aggs lists.
    // for each agg added to a field, also add that field to the agg's field list

    fields.forEach(function (field) {
      aggIdMap[field.id].forEach(function (aggId) {
        mix(field, aggMap[aggId]);
      });
    });
  } // the aggIds and fieldIds lists are no longer needed as we've created
  // lists of real fields and aggs


  fields.forEach(function (f) {
    return delete f.aggIds;
  });
  aggs.forEach(function (a) {
    return delete a.fieldIds;
  });
  return {
    fields: fields,
    aggs: aggs
  };
}

function mix(field, agg) {
  if (agg.fields === undefined) {
    agg.fields = [];
  }

  if (field.aggs === undefined) {
    field.aggs = [];
  }

  agg.fields.push(field);
  field.aggs.push(agg);
}

function addEventRateField(aggs, fields) {
  var eventRateField = {
    id: _fields.EVENT_RATE_FIELD_ID,
    name: 'Event rate',
    type: _public.ES_FIELD_TYPES.INTEGER,
    aggregatable: true,
    aggs: []
  };
  aggs.forEach(function (a) {
    if (eventRateField.aggs !== undefined && a.fields === undefined) {
      // if the agg's field list is undefined, it is a fieldless aggregation and
      // so can only be used with the event rate field.
      a.fields = [eventRateField];
      eventRateField.aggs.push(a);
    }
  });
  fields.splice(0, 0, eventRateField);
} // create two lists, one removing text fields if there are keyword equivalents and vice versa


function processTextAndKeywordFields(fields) {
  var keywordIds = fields.filter(function (f) {
    return f.type === _public.ES_FIELD_TYPES.KEYWORD;
  }).map(function (f) {
    return f.id;
  });
  var textIds = fields.filter(function (f) {
    return f.type === _public.ES_FIELD_TYPES.TEXT;
  }).map(function (f) {
    return f.id;
  });
  var fieldsPreferringKeyword = fields.filter(function (f) {
    return f.type !== _public.ES_FIELD_TYPES.TEXT || f.type === _public.ES_FIELD_TYPES.TEXT && keywordIds.includes("".concat(f.id, ".keyword")) === false;
  });
  var fieldsPreferringText = fields.filter(function (f) {
    return f.type !== _public.ES_FIELD_TYPES.KEYWORD || f.type === _public.ES_FIELD_TYPES.KEYWORD && textIds.includes(f.id.replace(/\.keyword$/, '')) === false;
  });
  return {
    fieldsPreferringKeyword: fieldsPreferringKeyword,
    fieldsPreferringText: fieldsPreferringText
  };
}

var newJobCapsService = new NewJobCapsService();
exports.newJobCapsService = newJobCapsService;