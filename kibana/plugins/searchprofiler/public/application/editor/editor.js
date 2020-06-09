"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Editor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _init_editor = require("./init_editor");

var _public = require("../../../../../../src/plugins/es_ui_shared/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createEditorShim = function createEditorShim(aceEditor) {
  return {
    getValue: function getValue() {
      return aceEditor.getValue();
    },
    focus: function focus() {
      aceEditor.focus();
    }
  };
};

var Editor = (0, _react.memo)(function (_ref) {
  var licenseEnabled = _ref.licenseEnabled,
      initialValue = _ref.initialValue,
      onEditorReady = _ref.onEditorReady;
  var containerRef = (0, _react.useRef)(null);
  var editorInstanceRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      textArea = _useState2[0],
      setTextArea = _useState2[1];

  (0, _public.useUIAceKeyboardMode)(textArea);
  (0, _react.useEffect)(function () {
    var divEl = containerRef.current;
    editorInstanceRef.current = (0, _init_editor.initializeEditor)({
      el: divEl,
      licenseEnabled: licenseEnabled
    });
    editorInstanceRef.current.setValue(initialValue, 1);
    setTextArea(licenseEnabled ? containerRef.current.querySelector('textarea') : null);
    onEditorReady(createEditorShim(editorInstanceRef.current));
  }, [initialValue, onEditorReady, licenseEnabled]);
  return _react.default.createElement("div", {
    "data-test-subj": "searchProfilerEditor",
    ref: containerRef
  });
});
exports.Editor = Editor;