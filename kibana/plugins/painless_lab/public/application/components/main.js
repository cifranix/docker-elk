"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Main = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _format = require("../lib/format");

var _constants = require("../constants");

var _types = require("../types");

var _hooks = require("../hooks");

var _context = require("../context");

var _output_pane = require("./output_pane");

var _main_controls = require("./main_controls");

var _editor = require("./editor");

var _request_flyout = require("./request_flyout");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Main = function Main() {
  var _useAppContext = (0, _context.useAppContext)(),
      _useAppContext$store = _useAppContext.store,
      payload = _useAppContext$store.payload,
      validation = _useAppContext$store.validation,
      updatePayload = _useAppContext.updatePayload,
      _useAppContext$servic = _useAppContext.services,
      http = _useAppContext$servic.http,
      getIsNavDrawerLocked$ = _useAppContext$servic.chrome.getIsNavDrawerLocked$,
      links = _useAppContext.links;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isRequestFlyoutOpen = _useState2[0],
      setRequestFlyoutOpen = _useState2[1];

  var _useSubmitCode = (0, _hooks.useSubmitCode)(http),
      inProgress = _useSubmitCode.inProgress,
      response = _useSubmitCode.response,
      submit = _useSubmitCode.submit; // Live-update the output and persist payload state as the user changes it.


  (0, _react.useEffect)(function () {
    if (validation.isValid) {
      submit(payload);
    }
  }, [payload, submit, validation.isValid]);

  var toggleRequestFlyout = function toggleRequestFlyout() {
    setRequestFlyoutOpen(!isRequestFlyoutOpen);
  };

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isNavDrawerLocked = _useState4[0],
      setIsNavDrawerLocked = _useState4[1];

  (0, _react.useEffect)(function () {
    var subscription = getIsNavDrawerLocked$().subscribe(function (newIsNavDrawerLocked) {
      setIsNavDrawerLocked(newIsNavDrawerLocked);
    });
    return function () {
      return subscription.unsubscribe();
    };
  });
  return _react.default.createElement("div", {
    className: "painlessLabMainContainer"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    className: "painlessLabPanelsContainer",
    responsive: false,
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    className: "painlessLabLeftPane"
  }, _react.default.createElement(_eui.EuiTitle, {
    className: "euiScreenReaderOnly"
  }, _react.default.createElement("h1", null, _i18n.i18n.translate('xpack.painlessLab.title', {
    defaultMessage: 'Painless Lab'
  }))), _react.default.createElement(_editor.Editor, {
    code: payload.code,
    onChange: function onChange(nextCode) {
      return updatePayload({
        code: nextCode
      });
    }
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_output_pane.OutputPane, {
    isLoading: inProgress,
    response: response
  }))), _react.default.createElement(_main_controls.MainControls, {
    links: links,
    isLoading: inProgress,
    toggleRequestFlyout: toggleRequestFlyout,
    isRequestFlyoutOpen: isRequestFlyoutOpen,
    isNavDrawerLocked: isNavDrawerLocked,
    reset: function reset() {
      return updatePayload({
        code: _constants.exampleScript
      });
    }
  }), isRequestFlyoutOpen && _react.default.createElement(_request_flyout.RequestFlyout, {
    links: links,
    onClose: function onClose() {
      return setRequestFlyoutOpen(false);
    },
    requestBody: (0, _format.formatRequestPayload)(payload, _types.PayloadFormat.PRETTY),
    response: response ? (0, _format.formatJson)(response.result || response.error) : ''
  }));
};

exports.Main = Main;