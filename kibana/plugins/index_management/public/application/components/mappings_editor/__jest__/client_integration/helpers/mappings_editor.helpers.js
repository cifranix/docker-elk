"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = void 0;

var _react = _interopRequireDefault(require("react"));

var _test_utils = require("../../../../../../../../../test_utils");

var _mappings_editor = require("../../../mappings_editor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jest.mock('@elastic/eui', function () {
  return _objectSpread({}, jest.requireActual('@elastic/eui'), {
    // Mocking EuiComboBox, as it utilizes "react-virtualized" for rendering search suggestions,
    // which does not produce a valid component wrapper
    EuiComboBox: function EuiComboBox(props) {
      return _react.default.createElement("input", {
        "data-test-subj": props['data-test-subj'] || 'mockComboBox',
        onChange:
        /*#__PURE__*/
        function () {
          var _ref = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(syntheticEvent) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    props.onChange([syntheticEvent['0']]);

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }()
      });
    },
    // Mocking EuiCodeEditor, which uses React Ace under the hood
    EuiCodeEditor: function EuiCodeEditor(props) {
      return _react.default.createElement("input", {
        "data-test-subj": props['data-test-subj'] || 'mockCodeEditor',
        "data-currentvalue": props.value,
        onChange: function onChange(e) {
          props.onChange(e.jsonContent);
        }
      });
    }
  });
});

var createActions = function createActions(testBed) {
  var find = testBed.find,
      waitFor = testBed.waitFor,
      form = testBed.form,
      component = testBed.component;

  var addField =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(name, type) {
      var currentCount;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              currentCount = find('fieldsListItem').length;
              form.setInputValue('nameParameterInput', name);
              find('createFieldForm.fieldType').simulate('change', [{
                label: type,
                value: type
              }]);
              _context2.next = 5;
              return (0, _test_utils.nextTick)();

            case 5:
              component.update();
              find('createFieldForm.addButton').simulate('click'); // We wait until there is one more field in the DOM

              _context2.next = 9;
              return waitFor('fieldsListItem', currentCount + 1);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function addField(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  var selectTab =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(tab) {
      var index, tabIdToContentMap, tabElement;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              index = ['fields', 'templates', 'advanced'].indexOf(tab);
              tabIdToContentMap = {
                fields: 'documentFields',
                templates: 'dynamicTemplates',
                advanced: 'advancedConfiguration'
              };
              tabElement = find('formTab').at(index);

              if (!(tabElement.length === 0)) {
                _context3.next = 5;
                break;
              }

              throw new Error("Tab not found: \"".concat(tab, "\""));

            case 5:
              tabElement.simulate('click');
              _context3.next = 8;
              return waitFor(tabIdToContentMap[tab]);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function selectTab(_x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  var updateJsonEditor =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(testSubject, value) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              find(testSubject).simulate('change', {
                jsonContent: JSON.stringify(value)
              });

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function updateJsonEditor(_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();

  var getJsonEditorValue = function getJsonEditorValue(testSubject) {
    var value = find(testSubject).props()['data-currentvalue'];

    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (_unused) {
        return {
          errorParsingJson: true,
          props: find(testSubject).props()
        };
      }
    }

    return value;
  };

  return {
    selectTab: selectTab,
    addField: addField,
    updateJsonEditor: updateJsonEditor,
    getJsonEditorValue: getJsonEditorValue
  };
};

var setup =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var props,
        testBed,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            props = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {
              onUpdate: function onUpdate() {}
            };
            _context5.next = 3;
            return (0, _test_utils.registerTestBed)(_mappings_editor.MappingsEditor, {
              memoryRouter: {
                wrapComponent: false
              },
              defaultProps: props
            })();

          case 3:
            testBed = _context5.sent;
            return _context5.abrupt("return", _objectSpread({}, testBed, {
              actions: createActions(testBed)
            }));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function setup() {
    return _ref5.apply(this, arguments);
  };
}();

exports.setup = setup;