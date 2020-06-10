"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateCreate = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _components = require("../../components");

var _breadcrumbs = require("../../services/breadcrumbs");

var _api = require("../../services/api");

var _routing = require("../../services/routing");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TemplateCreate = function TemplateCreate(_ref) {
  var history = _ref.history;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSaving = _useState2[0],
      setIsSaving = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      saveError = _useState4[0],
      setSaveError = _useState4[1];

  var onSave =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(template) {
      var name, _ref3, error;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              name = template.name;
              setIsSaving(true);
              setSaveError(null);
              _context.next = 5;
              return (0, _api.saveTemplate)(template);

            case 5:
              _ref3 = _context.sent;
              error = _ref3.error;
              setIsSaving(false);

              if (!error) {
                _context.next = 11;
                break;
              }

              setSaveError(error);
              return _context.abrupt("return");

            case 11:
              history.push((0, _routing.getTemplateDetailsLink)(name));

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

  (0, _react.useEffect)(function () {
    _breadcrumbs.breadcrumbService.setBreadcrumbs('templateCreate');
  }, []);
  return _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", {
    "data-test-subj": "pageTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.createTemplate.createTemplatePageTitle",
    defaultMessage: "Create template"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_components.TemplateForm, {
    onSave: onSave,
    isSaving: isSaving,
    saveError: saveError,
    clearSaveError: clearSaveError
  })));
};

exports.TemplateCreate = TemplateCreate;