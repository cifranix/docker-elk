"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDispatch = exports.useMappingsState = exports.MappingsState = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reducer = require("./reducer");

var _lib = require("./lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var StateContext = (0, _react.createContext)(undefined);
var DispatchContext = (0, _react.createContext)(undefined);

var MappingsState = _react.default.memo(function (_ref) {
  var children = _ref.children,
      onUpdate = _ref.onUpdate,
      defaultValue = _ref.defaultValue,
      mappingsType = _ref.mappingsType;
  var didMountRef = (0, _react.useRef)(false);
  var parsedFieldsDefaultValue = (0, _react.useMemo)(function () {
    return (0, _lib.normalize)(defaultValue.fields);
  }, [defaultValue.fields]);
  var initialState = {
    isValid: undefined,
    configuration: {
      defaultValue: defaultValue.configuration,
      data: {
        raw: defaultValue.configuration,
        format: function format() {
          return defaultValue.configuration;
        }
      },
      validate: function validate() {
        return Promise.resolve(true);
      }
    },
    templates: {
      defaultValue: defaultValue.templates,
      data: {
        raw: defaultValue.templates,
        format: function format() {
          return defaultValue.templates;
        }
      },
      validate: function validate() {
        return Promise.resolve(true);
      }
    },
    fields: parsedFieldsDefaultValue,
    documentFields: {
      status: 'idle',
      editor: 'default'
    },
    fieldsJsonEditor: {
      format: function format() {
        return {};
      },
      isValid: true
    },
    search: {
      term: '',
      result: []
    }
  };

  var _useReducer = (0, _react.useReducer)(_reducer.reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    // If we are creating a new field, but haven't entered any name
    // it is valid and we can byPass its form validation (that requires a "name" to be defined)
    var isFieldFormVisible = state.fieldForm !== undefined;
    var emptyNameValue = isFieldFormVisible && state.fieldForm.data.raw.name !== undefined && state.fieldForm.data.raw.name.trim() === '';
    var bypassFieldFormValidation = state.documentFields.status === 'creatingField' && emptyNameValue;
    onUpdate({
      // Output a mappings object from the user's input.
      getData: function getData(isValid) {
        var nextState = state;

        if (state.documentFields.status === 'creatingField' && isValid && !bypassFieldFormValidation) {
          // If the form field is valid and we are creating a new field that has some data
          // we automatically add the field to our state.
          var fieldFormData = state.fieldForm.data.format();

          if (Object.keys(fieldFormData).length !== 0) {
            nextState = (0, _reducer.addFieldToState)(fieldFormData, state);
            dispatch({
              type: 'field.add',
              value: fieldFormData
            });
          }
        } // Pull the mappings properties from the current editor


        var fields = nextState.documentFields.editor === 'json' ? nextState.fieldsJsonEditor.format() : (0, _lib.deNormalize)(nextState.fields);
        var configurationData = nextState.configuration.data.format();
        var templatesData = nextState.templates.data.format();

        var mappings = _objectSpread({}, configurationData, {}, templatesData, {
          properties: fields
        });

        return mappingsType === undefined ? mappings : _defineProperty({}, mappingsType, mappings);
      },
      validate: function () {
        var _validate = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3() {
          var configurationFormValidator, templatesFormValidator, promisesToValidate;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  configurationFormValidator = state.configuration.submitForm !== undefined ? new Promise(
                  /*#__PURE__*/
                  function () {
                    var _ref3 = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee(resolve) {
                      var _ref4, isValid;

                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return state.configuration.submitForm();

                            case 2:
                              _ref4 = _context.sent;
                              isValid = _ref4.isValid;
                              resolve(isValid);

                            case 5:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x) {
                      return _ref3.apply(this, arguments);
                    };
                  }()) : Promise.resolve(true);
                  templatesFormValidator = state.templates.submitForm !== undefined ? new Promise(
                  /*#__PURE__*/
                  function () {
                    var _ref5 = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee2(resolve) {
                      var _ref6, isValid;

                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return state.templates.submitForm();

                            case 2:
                              _ref6 = _context2.sent;
                              isValid = _ref6.isValid;
                              resolve(isValid);

                            case 5:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    }));

                    return function (_x2) {
                      return _ref5.apply(this, arguments);
                    };
                  }()) : Promise.resolve(true);
                  promisesToValidate = [configurationFormValidator, templatesFormValidator];

                  if (state.fieldForm !== undefined && !bypassFieldFormValidation) {
                    promisesToValidate.push(state.fieldForm.validate());
                  }

                  return _context3.abrupt("return", Promise.all(promisesToValidate).then(function (validationArray) {
                    return validationArray.every(Boolean) && state.fieldsJsonEditor.isValid;
                  }));

                case 5:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function validate() {
          return _validate.apply(this, arguments);
        }

        return validate;
      }(),
      isValid: state.isValid
    });
  }, [mappingsType, onUpdate, state]);
  (0, _react.useEffect)(function () {
    /**
     * If the defaultValue has changed that probably means that we have loaded
     * new data from JSON. We need to update our state with the new mappings.
     */
    if (didMountRef.current) {
      dispatch({
        type: 'editor.replaceMappings',
        value: {
          configuration: defaultValue.configuration,
          templates: defaultValue.templates,
          fields: parsedFieldsDefaultValue
        }
      });
    } else {
      didMountRef.current = true;
    }
  }, [defaultValue, parsedFieldsDefaultValue]);
  return _react.default.createElement(StateContext.Provider, {
    value: state
  }, _react.default.createElement(DispatchContext.Provider, {
    value: dispatch
  }, children({
    state: state
  })));
});

exports.MappingsState = MappingsState;

var useMappingsState = function useMappingsState() {
  var ctx = (0, _react.useContext)(StateContext);

  if (ctx === undefined) {
    throw new Error('useMappingsState must be used within a <MappingsState>');
  }

  return ctx;
};

exports.useMappingsState = useMappingsState;

var useDispatch = function useDispatch() {
  var ctx = (0, _react.useContext)(DispatchContext);

  if (ctx === undefined) {
    throw new Error('useDispatch must be used within a <MappingsState>');
  }

  return ctx;
};

exports.useDispatch = useDispatch;