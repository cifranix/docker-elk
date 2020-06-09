"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorToggleControls = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _mappings_state = require("../../mappings_state");

var _lib = require("../../lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* TODO: Review toggle controls UI */
var EditorToggleControls = function EditorToggleControls(_ref) {
  var editor = _ref.editor;
  var dispatch = (0, _mappings_state.useDispatch)();

  var _useMappingsState = (0, _mappings_state.useMappingsState)(),
      fieldsJsonEditor = _useMappingsState.fieldsJsonEditor;

  var _React$useState = _react.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      showMaxDepthWarning = _React$useState2[0],
      setShowMaxDepthWarning = _React$useState2[1];

  var _React$useState3 = _react.default.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      showValidityWarning = _React$useState4[0],
      setShowValidityWarning = _React$useState4[1];

  var clearWarnings = function clearWarnings() {
    if (showMaxDepthWarning) {
      setShowMaxDepthWarning(false);
    }

    if (showValidityWarning) {
      setShowValidityWarning(false);
    }
  };

  if (editor === 'default') {
    clearWarnings();
    return _react.default.createElement(_eui.EuiButton, {
      onClick: function onClick() {
        dispatch({
          type: 'documentField.changeEditor',
          value: 'json'
        });
      }
    }, "Use JSON Editor");
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiButton, {
    onClick: function onClick() {
      clearWarnings();
      var isValid = fieldsJsonEditor.isValid;

      if (!isValid) {
        setShowValidityWarning(true);
      } else {
        var deNormalizedFields = fieldsJsonEditor.format();

        var _normalize = (0, _lib.normalize)(deNormalizedFields),
            maxNestedDepth = _normalize.maxNestedDepth;

        var canUseDefaultEditor = (0, _lib.canUseMappingsEditor)(maxNestedDepth);

        if (canUseDefaultEditor) {
          dispatch({
            type: 'documentField.changeEditor',
            value: 'default'
          });
        } else {
          setShowMaxDepthWarning(true);
        }
      }
    }
  }, "Use Mappings Editor"), showMaxDepthWarning ? _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "danger"
  }, "Max depth for Mappings Editor exceeded") : null, showValidityWarning && !fieldsJsonEditor.isValid ? _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "danger"
  }, "JSON is invalid") : null);
};

exports.EditorToggleControls = EditorToggleControls;