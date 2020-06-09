"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MappingsEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _components = require("./components");

var _lib = require("./lib");

var _mappings_state = require("./mappings_state");

var _index_settings_context = require("./index_settings_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MappingsEditor = _react.default.memo(function (_ref) {
  var onUpdate = _ref.onUpdate,
      defaultValue = _ref.defaultValue,
      indexSettings = _ref.indexSettings;

  var _useState = (0, _react.useState)('fields'),
      _useState2 = _slicedToArray(_useState, 2),
      selectedTab = _useState2[0],
      selectTab = _useState2[1];

  var _useMemo = (0, _react.useMemo)(function () {
    var mappingsDefinition = (0, _lib.extractMappingsDefinition)(defaultValue);

    if (mappingsDefinition === null) {
      return {
        multipleMappingsDeclared: true
      };
    }

    var _mappingsDefinition$m = mappingsDefinition.mappings,
        _mappingsDefinition$m2 = _mappingsDefinition$m._source,
        _source = _mappingsDefinition$m2 === void 0 ? {} : _mappingsDefinition$m2,
        _mappingsDefinition$m3 = _mappingsDefinition$m._meta,
        _meta = _mappingsDefinition$m3 === void 0 ? {} : _mappingsDefinition$m3,
        _routing = _mappingsDefinition$m._routing,
        dynamic = _mappingsDefinition$m.dynamic,
        numeric_detection = _mappingsDefinition$m.numeric_detection,
        date_detection = _mappingsDefinition$m.date_detection,
        dynamic_date_formats = _mappingsDefinition$m.dynamic_date_formats,
        _mappingsDefinition$m4 = _mappingsDefinition$m.properties,
        properties = _mappingsDefinition$m4 === void 0 ? {} : _mappingsDefinition$m4,
        dynamic_templates = _mappingsDefinition$m.dynamic_templates;

    var parsed = {
      configuration: {
        _source: _source,
        _meta: _meta,
        _routing: _routing,
        dynamic: dynamic,
        numeric_detection: numeric_detection,
        date_detection: date_detection,
        dynamic_date_formats: dynamic_date_formats
      },
      fields: properties,
      templates: {
        dynamic_templates: dynamic_templates
      }
    };
    return {
      parsedDefaultValue: parsed,
      multipleMappingsDeclared: false,
      mappingsType: mappingsDefinition.type
    };
  }, [defaultValue]),
      parsedDefaultValue = _useMemo.parsedDefaultValue,
      multipleMappingsDeclared = _useMemo.multipleMappingsDeclared,
      mappingsType = _useMemo.mappingsType;

  (0, _react.useEffect)(function () {
    if (multipleMappingsDeclared) {
      // We set the data getter here as the user won't be able to make any changes
      onUpdate({
        getData: function getData() {
          return defaultValue;
        },
        validate: function validate() {
          return Promise.resolve(true);
        },
        isValid: true
      });
    }
  }, [multipleMappingsDeclared, onUpdate, defaultValue]);

  var changeTab =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(tab, state) {
      var _ref3, isConfigurationFormValid, _ref4, isTemplatesFormValid;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(selectedTab === 'advanced')) {
                _context.next = 9;
                break;
              }

              _context.next = 3;
              return state.configuration.submitForm();

            case 3:
              _ref3 = _context.sent;
              isConfigurationFormValid = _ref3.isValid;

              if (isConfigurationFormValid) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return");

            case 7:
              _context.next = 16;
              break;

            case 9:
              if (!(selectedTab === 'templates')) {
                _context.next = 16;
                break;
              }

              _context.next = 12;
              return state.templates.submitForm();

            case 12:
              _ref4 = _context.sent;
              isTemplatesFormValid = _ref4.isValid;

              if (isTemplatesFormValid) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return");

            case 16:
              selectTab(tab);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function changeTab(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  return _react.default.createElement("div", {
    "data-test-subj": "mappingsEditor"
  }, multipleMappingsDeclared ? _react.default.createElement(_components.MultipleMappingsWarning, null) : _react.default.createElement(_index_settings_context.IndexSettingsProvider, {
    indexSettings: indexSettings
  }, _react.default.createElement(_mappings_state.MappingsState, {
    onUpdate: onUpdate,
    defaultValue: parsedDefaultValue,
    mappingsType: mappingsType
  }, function (_ref5) {
    var state = _ref5.state;
    var tabToContentMap = {
      fields: _react.default.createElement(_components.DocumentFields, null),
      templates: _react.default.createElement(_components.TemplatesForm, {
        defaultValue: state.templates.defaultValue
      }),
      advanced: _react.default.createElement(_components.ConfigurationForm, {
        defaultValue: state.configuration.defaultValue
      })
    };
    return _react.default.createElement("div", {
      className: "mappingsEditor"
    }, _react.default.createElement(_eui.EuiTabs, null, _react.default.createElement(_eui.EuiTab, {
      onClick: function onClick() {
        return changeTab('fields', state);
      },
      isSelected: selectedTab === 'fields',
      "data-test-subj": "formTab"
    }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.fieldsTabLabel', {
      defaultMessage: 'Mapped fields'
    })), _react.default.createElement(_eui.EuiTab, {
      onClick: function onClick() {
        return changeTab('templates', state);
      },
      isSelected: selectedTab === 'templates',
      "data-test-subj": "formTab"
    }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.templatesTabLabel', {
      defaultMessage: 'Dynamic templates'
    })), _react.default.createElement(_eui.EuiTab, {
      onClick: function onClick() {
        return changeTab('advanced', state);
      },
      isSelected: selectedTab === 'advanced',
      "data-test-subj": "formTab"
    }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.advancedTabLabel', {
      defaultMessage: 'Advanced options'
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }), tabToContentMap[selectedTab]);
  })));
});

exports.MappingsEditor = MappingsEditor;