"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateClone = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _components = require("../../components");

var _breadcrumbs = require("../../services/breadcrumbs");

var _routing = require("../../services/routing");

var _api = require("../../services/api");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TemplateClone = function TemplateClone(_ref) {
  var name = _ref.match.params.name,
      history = _ref.history;
  var decodedTemplateName = (0, _routing.decodePath)(name);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSaving = _useState2[0],
      setIsSaving = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      saveError = _useState4[0],
      setSaveError = _useState4[1];

  var _useLoadIndexTemplate = (0, _api.useLoadIndexTemplate)(decodedTemplateName),
      templateToCloneError = _useLoadIndexTemplate.error,
      templateToClone = _useLoadIndexTemplate.data,
      isLoading = _useLoadIndexTemplate.isLoading;

  var onSave =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(template) {
      var _ref3, error, newTemplateName;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsSaving(true);
              setSaveError(null);
              _context.next = 4;
              return (0, _api.saveTemplate)(template, true);

            case 4:
              _ref3 = _context.sent;
              error = _ref3.error;
              newTemplateName = template.name;
              setIsSaving(false);

              if (!error) {
                _context.next = 11;
                break;
              }

              setSaveError(error);
              return _context.abrupt("return");

            case 11:
              history.push((0, _routing.getTemplateDetailsLink)(newTemplateName));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onSave(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var clearSaveError = function clearSaveError() {
    setSaveError(null);
  };

  var content;
  (0, _react.useEffect)(function () {
    _breadcrumbs.breadcrumbService.setBreadcrumbs('templateClone');
  }, []);

  if (isLoading) {
    content = _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateCreate.loadingTemplateToCloneDescription",
      defaultMessage: "Loading template to clone\u2026"
    }));
  } else if (templateToCloneError) {
    content = _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.templateCreate.loadingTemplateToCloneErrorMessage",
        defaultMessage: "Error loading template to clone"
      }),
      error: templateToCloneError,
      "data-test-subj": "sectionError"
    });
  } else if (templateToClone) {
    var templateData = _objectSpread({}, templateToClone, {
      name: "".concat(decodedTemplateName, "-copy")
    });

    content = _react.default.createElement(_components.TemplateForm, {
      defaultValue: templateData,
      onSave: onSave,
      isSaving: isSaving,
      saveError: saveError,
      clearSaveError: clearSaveError
    });
  }

  return _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", {
    "data-test-subj": "pageTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.createTemplate.cloneTemplatePageTitle",
    defaultMessage: "Clone template '{name}'",
    values: {
      name: decodedTemplateName
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), content));
};

exports.TemplateClone = TemplateClone;