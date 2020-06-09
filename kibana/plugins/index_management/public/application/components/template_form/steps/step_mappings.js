"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepMappings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _documentation = require("../../../services/documentation");

var _mappings_editor = require("../../mappings_editor");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var StepMappings = function StepMappings(_ref) {
  var template = _ref.template,
      setDataGetter = _ref.setDataGetter,
      onStepValidityChange = _ref.onStepValidityChange;

  var _useState = (0, _react.useState)(template.mappings),
      _useState2 = _slicedToArray(_useState, 2),
      mappings = _useState2[0],
      setMappings = _useState2[1];

  var onMappingsEditorUpdate = (0, _react.useCallback)(function (_ref2) {
    var isValid = _ref2.isValid,
        getData = _ref2.getData,
        validate = _ref2.validate;
    onStepValidityChange(isValid);
    setDataGetter(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var isMappingsValid, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(isValid === undefined)) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return validate();

            case 3:
              _context.t0 = _context.sent;
              _context.next = 7;
              break;

            case 6:
              _context.t0 = isValid;

            case 7:
              isMappingsValid = _context.t0;
              data = getData(isMappingsValid);
              return _context.abrupt("return", Promise.resolve({
                isValid: isMappingsValid,
                data: {
                  mappings: data
                }
              }));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  }, [setDataGetter, onStepValidityChange]);

  var onJsonLoaded = function onJsonLoaded(json) {
    setMappings(json);
  };

  return _react.default.createElement("div", {
    "data-test-subj": "stepMappings"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", {
    "data-test-subj": "stepTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepMappings.stepTitle",
    defaultMessage: "Mappings (optional)"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepMappings.mappingsDescription",
    defaultMessage: "Define how to store and index documents."
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_mappings_editor.LoadMappingsFromJsonButton, {
    onJson: onJsonLoaded
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "right",
    href: _documentation.documentationService.getMappingDocumentationLink(),
    target: "_blank",
    iconType: "help"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepMappings.docsButtonLabel",
    defaultMessage: "Mapping docs"
  })))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_mappings_editor.MappingsEditor, {
    defaultValue: mappings,
    onUpdate: onMappingsEditorUpdate,
    indexSettings: template.settings
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
};

exports.StepMappings = StepMappings;