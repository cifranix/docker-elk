"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileQueryEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _editor = require("../editor");

var _hooks = require("../hooks");

var _app_context = require("../contexts/app_context");

var _profiler_context = require("../contexts/profiler_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DEFAULT_INDEX_VALUE = '_all';
var INITIAL_EDITOR_VALUE = "{\n  \"query\":{\n    \"match_all\" : {}\n  }\n}";
/**
 * This component should only need to render once.
 *
 * Drives state changes for mine via profiler action context.
 */

var ProfileQueryEditor = (0, _react.memo)(function () {
  var editorRef = (0, _react.useRef)(null);
  var indexInputRef = (0, _react.useRef)(null);
  var dispatch = (0, _profiler_context.useProfilerActionContext)();

  var _useAppContext = (0, _app_context.useAppContext)(),
      getLicenseStatus = _useAppContext.getLicenseStatus,
      notifications = _useAppContext.notifications;

  var requestProfile = (0, _hooks.useRequestProfile)();

  var handleProfileClick =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var editor, _ref2, result, error;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch({
                type: 'setProfiling',
                value: true
              });
              _context.prev = 1;
              editor = editorRef.current;
              _context.next = 5;
              return requestProfile({
                query: editorRef.current.getValue(),
                index: indexInputRef.current.value
              });

            case 5:
              _ref2 = _context.sent;
              result = _ref2.data;
              error = _ref2.error;

              if (!error) {
                _context.next = 12;
                break;
              }

              notifications.addDanger(error);
              editor.focus();
              return _context.abrupt("return");

            case 12:
              if (!(result === null)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return");

            case 14:
              dispatch({
                type: 'setCurrentResponse',
                value: result
              });

            case 15:
              _context.prev = 15;
              dispatch({
                type: 'setProfiling',
                value: false
              });
              return _context.finish(15);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1,, 15, 18]]);
    }));

    return function handleProfileClick() {
      return _ref.apply(this, arguments);
    };
  }();

  var onEditorReady = (0, _react.useCallback)(function (editorInstance) {
    return editorRef.current = editorInstance;
  }, []);
  var licenseEnabled = getLicenseStatus().valid;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    responsive: false,
    className: "prfDevTool__sense",
    gutterSize: "none",
    direction: "column"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "row",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.searchProfiler.formIndexLabel', {
      defaultMessage: 'Index'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    disabled: !licenseEnabled,
    inputRef: function inputRef(ref) {
      if (ref) {
        indexInputRef.current = ref;
        ref.value = DEFAULT_INDEX_VALUE;
      }
    }
  })))))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 10
  }, _react.default.createElement(_editor.Editor, {
    onEditorReady: onEditorReady,
    licenseEnabled: licenseEnabled,
    initialValue: INITIAL_EDITOR_VALUE
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    className: "prfDevTool__profileButtonContainer",
    gutterSize: "none",
    direction: "row"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 5
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 5
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    disabled: !licenseEnabled,
    onClick: function onClick() {
      return handleProfileClick();
    }
  }, _react.default.createElement(_eui.EuiText, null, _i18n.i18n.translate('xpack.searchProfiler.formProfileButtonLabel', {
    defaultMessage: 'Profile'
  })))))));
});
exports.ProfileQueryEditor = ProfileQueryEditor;